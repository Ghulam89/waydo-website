import FormInput from "@components/app/form-input";
import { updateDataCreatePostForm, updateStepCreatePostForm } from "@redux/slices/post";
import { DataCreateFormPostI } from "@redux/slices/post/post.interface";
import { useAppDispatch, useAppSelector } from "@redux/store";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useLazyGetBrandsCarQuery, useLazyGetModelsByBrandCarQuery, useLazyGetVersionsCarQuery, useLazyGetYearsCarQuery } from "@redux/rtk/server/v1/car";
import { useLazyGetCurrenciesQuery } from "@redux/rtk/server/v1/currency";
import { ErrorFormatterIntoObject } from "@utils/validation/errorFormatter";
import formValidation from "@utils/validation/formValidation";
import { CreatePostFirstFormValidationSchema, CreatePostFirstPayloadEmpty } from "@validators/form/post/create.validator";
import classNames from "classnames";
import { toast } from "react-toastify";
import style from "./first-form.module.css";

export default function FirstFormPost({ show = false }: { show: boolean }) {
    const dispatch = useAppDispatch()
    const { data } = useAppSelector((s) => s.post.createForm)
    const [errors, setErrors] = useState<Record<keyof DataCreateFormPostI, any> | null>()

    const [getBrands, { isLoading: isLoadingBrands, data: responseBrand }] = useLazyGetBrandsCarQuery()
    const [getModels, { isLoading: isLoadingModels, data: responseModel }] = useLazyGetModelsByBrandCarQuery()
    const [getYears, { isLoading: isLoadingYears, data: responseYear }] = useLazyGetYearsCarQuery()
    const [getCurrencies, { isLoading: isLoadingCurrencies, data: responseCurrency }] = useLazyGetCurrenciesQuery()
    const [getVersions, { isLoading: isLoadingVersion, data: responseVersion }] = useLazyGetVersionsCarQuery()

    const optionsBrand = useMemo(() => (Array.from(responseBrand?.data || []).map(data => ({
        label: data.name,
        value: data.uuid
    }))), [responseBrand?.data])

    const optionsModel = useMemo(() => (Array.from(responseModel?.data || []).map(data => ({
        label: data.name,
        value: data.uuid
    }))), [responseModel?.data])

    const optionsYear = useMemo(() => (Array.from(responseYear?.data || []).map(data => ({
        label: `${data.year}`,
        value: data.uuid
    }))), [responseYear?.data])

    const optionsCurrency = useMemo(() => (Array.from(responseCurrency?.data || []).map(data => ({
        label: `${data.name}`,
        value: data.uuid
    }))), [responseCurrency?.data])

    const optionsVersion = useMemo(() => (Array.from(responseVersion?.data || []).map(data => ({
        label: `${data.name}`,
        value: data.uuid
    }))), [responseVersion?.data])

    const sourceInputStandardization = useMemo(() => ({
        "& label": {
            fontSize: "1em"
        },
        "& input": {
            fontSize: "1em"
        }
    }), [])

    const handleUpdateForm = useCallback((data: DataCreateFormPostI) => {
        dispatch(updateDataCreatePostForm(data))
    }, [])

    const handleFormValidation = useCallback((dataForm: DataCreateFormPostI) => {
        dataForm =
            (JSON.stringify(dataForm) === '{}'
                ? CreatePostFirstPayloadEmpty
                : { ...CreatePostFirstPayloadEmpty, ...dataForm }) as DataCreateFormPostI
        const { isValid, errors } = formValidation(dataForm, CreatePostFirstFormValidationSchema)
        setErrors((prev) => ({
            ...(prev || {}),
            ...ErrorFormatterIntoObject(errors) as Record<keyof DataCreateFormPostI, any>
        }))
        return isValid
    }, [])

    const handleNext = useCallback(() => {
        const isRequiredMileage = data.mileage !== 0 && !data.mileage
        const isRequiredPrice = data.price !== 0 && !data.price

        setErrors({
            ...(isRequiredMileage ? { mileage: "El kilometraje es requerido" } : {}),
            ...(isRequiredPrice ? { price: "El precio es requerido" } : {})
        } as Record<keyof DataCreateFormPostI, any> | null)
        if (!handleFormValidation(data) || isRequiredMileage || isRequiredPrice) return

        dispatch(updateStepCreatePostForm(2))
    }, [data])

    const handleGetBrands = useCallback(async () => {
        await getBrands({}).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get brands`, {
                type: "error"
            })
        })
    }, [])

    const handleGetModels = useCallback(async () => {
        if (!data.brandUUID) return;

        await getModels({
            brandUUID: data.brandUUID
        }).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get models`, {
                type: "error"
            })
        })
    }, [data])

    const handleGetYears = useCallback(async () => {
        if (!data.brandUUID || !data.modelUUID) return;

        await getYears({
            brandUUID: data.brandUUID,
            modelUUID: data.modelUUID
        }).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get years`, {
                type: "error"
            })
        })
    }, [data])

    const handleGetCurrencies = useCallback(async () => {
        await getCurrencies({ filters: { isDigital: false } }).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get currencies`, {
                type: "error"
            })
        })
    }, [])

    const handleGetVersions = useCallback(async () => {
        if (!data.brandUUID || !data.modelUUID) return;

        await getVersions({
            brandUUID: data.brandUUID || "-",
            modelUUID: data.modelUUID || "-"
        }).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get versions`, {
                type: "error"
            })
        })
    }, [data])

    useEffect(() => {
        if (!show) return;
        handleGetBrands()
        handleGetCurrencies()
    }, [show])

    useEffect(() => {
        if (!show) return;
        handleGetModels()
    }, [data.brandUUID, show])

    useEffect(() => {
        if (!show) return;
        handleGetYears()
        handleGetVersions()
    }, [data.brandUUID, data.modelUUID, show])

    return (
        <div className={classNames(style.container, !show ? style.none : "")}>
            <div className={style.box}>
                <div>
                    <h1 className={style.title}>Cuéntanos de tu vehículo</h1>
                </div>
                <div>
                    <FormInput<DataCreateFormPostI>
                        isEditMode
                        spacing={3}
                        form={data}
                        setForm={(data) => handleUpdateForm(data as DataCreateFormPostI)}
                        fields={[
                            {
                                label: "Marca",
                                name: "brandUUID",
                                type: "autocomplete",
                                required: true,
                                options: optionsBrand,
                                loading: isLoadingBrands,
                                disabled: isLoadingBrands,
                                responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                sx: sourceInputStandardization
                            },
                            {
                                label: "Modelo",
                                name: "modelUUID",
                                required: true,
                                type: "autocomplete",
                                options: optionsModel,
                                loading: isLoadingModels,
                                disabled: !data.brandUUID || isLoadingModels,
                                responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                sx: sourceInputStandardization
                            },
                            {
                                label: "Version",
                                name: "versionUUID",
                                type: "autocomplete",
                                loading: isLoadingVersion,
                                disabled: isLoadingModels,
                                options: optionsVersion,
                                responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                sx: sourceInputStandardization
                            },
                            {
                                label: "Año",
                                name: "yearUUID",
                                required: true,
                                type: "autocomplete",
                                options: optionsYear,
                                loading: isLoadingYears,
                                disabled: !data.brandUUID || !data.modelUUID || isLoadingYears,
                                responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                sx: sourceInputStandardization
                            },
                            {
                                label: "Kilometraje",
                                name: "mileage",
                                required: true,
                                disabledDecimal: true,
                                min: 10,
                                type: "number",
                                responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                sx: sourceInputStandardization
                            },
                            {
                                label: "Moneda",
                                name: "currencyUUID",
                                required: true,
                                type: "autocomplete",
                                options: optionsCurrency,
                                loading: isLoadingCurrencies,
                                disabled: isLoadingCurrencies,
                                responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                sx: sourceInputStandardization
                            },
                            {
                                label: "Precio",
                                name: "price",
                                required: true,
                                type: "number",
                                disabledDecimal: true,
                                responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                sx: sourceInputStandardization
                            }
                        ]}
                        errors={errors}
                    />
                </div>
                <div className={style.contentButton}>
                    <button className={style.button} onClick={handleNext}>
                        Siguiente
                    </button>

                    <p className={style.doubt}>
                        <Link href="#">¿Tienes preguntas? Llama a Waydo</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}