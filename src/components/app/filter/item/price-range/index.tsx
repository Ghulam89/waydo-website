import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PriceRangeFilterI, PriceRangeFilterPropsI } from "./price-range.interface";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, InputAdornment, TextField } from "@mui/material";
import Tippy from "@tippyjs/react";
import classNames from "classnames";

import { useDebounce } from "@hooks/useDebounce";
import { useLazyCountPostsQuery } from "@redux/rtk/server/v1/post";
import { updateFilter } from "@redux/slices/filter";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { generateUrlPost, MAX_PRICE_FILER, MIN_PRICE_FILTER } from "@utils/filter";
import { abbreviateNumber } from "@utils/number/number.util";
import { insertByCondition } from "@utils/object/object.util";
import { useRouter } from "next/navigation";

import styleFilter from "../../filter.module.css";
import styleItem from "../item.module.css";
import style from "./price-range.module.css";

export default function PriceRangeFilter({ allowSearch }: PriceRangeFilterPropsI) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [countPosts, { isLoading, data: count, isFetching }] = useLazyCountPostsQuery();
    const [initial, setInitial] = useState(true)
    const [range, setRange] = useState<PriceRangeFilterI>({
        from: MIN_PRICE_FILTER,
        to: MAX_PRICE_FILER
    } as PriceRangeFilterI)
    const tippyInstance = useRef<any>();
    const filters = useAppSelector((s) => s.filters)
    const { priceLte, priceGte } = filters
    const dataFilter = useMemo(() => ({
        ...filters.filterFormatted,
        ranges: {
            ...(filters?.filterFormatted?.ranges || {}),
            ...insertByCondition(range.from && range.to, {
                price: range
            })
        }
    }), [filters, range])
    const _filters = useDebounce(dataFilter, 200)

    const handleUpdate = useCallback((key: keyof PriceRangeFilterI, range: string) => {
        setInitial(false)
        setRange((prev) => ({
            ...prev,
            [key]: parseFloat(range)
        }))
    }, [])

    const handleCloseFilter = useCallback(() => {
        if (!tippyInstance) return;

        setInitial(true)
        tippyInstance.current.hide();
    }, [tippyInstance])

    const handleClear = useCallback(() => {
        dispatch(updateFilter({
            priceLte: 0,
            priceGte: 0
        }))

        setRange({
            from: 0,
            to: 0
        })

        if (!allowSearch) {
            router.push(generateUrlPost({
                ...filters,
                priceLte: 0,
                priceGte: 0
            }))
        }

        handleCloseFilter()
    }, [allowSearch, filters])

    const handleApplyFilter = useCallback(() => {
        if (isLoading) return;

        dispatch(updateFilter({
            priceLte: range.from,
            priceGte: range.to
        }))
        handleCloseFilter()

        if (!allowSearch) {
            router.push(generateUrlPost({
                ...filters,
                priceLte: range.from ? range.from : MIN_PRICE_FILTER,
                priceGte: range.to ? range.to : MAX_PRICE_FILER
            }))
        }
    }, [tippyInstance, range, allowSearch, isLoading]);

    const getCount = useCallback(() => {
        countPosts(_filters);
    }, [_filters])

    useEffect(() => {
        if (!initial) {
            getCount()
        }
    }, [_filters, initial])

    useEffect(() => {
        if (!range.from && !range.to && filters.priceLte && filters.priceGte) {
            setRange({
                from: filters.priceLte,
                to: filters.priceGte
            })
        }
    }, [range, filters.priceLte, filters.priceGte])

    return (
        <Tippy
            key={`model-filter`}
            interactive
            arrow={false}
            trigger="click"
            placement="bottom-end"
            animation="shift-away"
            onCreate={(intance) => tippyInstance.current = intance}
            onClickOutside={() => {
                setInitial(true)
            }}
            content={
                <div className={style.container}>
                    <div className={style.boxList}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Desde"
                                    variant="outlined"
                                    type="number"
                                    value={range.from}
                                    onChange={(e) => handleUpdate("from", e.currentTarget.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        inputProps: { min: 0 }
                                    }}
                                    sx={{
                                        width: "100%"
                                    }}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Hasta"
                                    variant="outlined"
                                    type="number"
                                    value={range.to}
                                    onChange={(e) => handleUpdate("to", e.currentTarget.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        inputProps: { min: 0 }
                                    }}
                                    sx={{
                                        width: "100%"
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classNames(styleFilter.boxButton)}>
                        <div className={styleFilter.boxClear}>
                            <button onClick={() => handleClear()}>Limpiar</button>
                        </div>
                        <div className={styleFilter.boxApply}>
                            <button onClick={() => handleApplyFilter()}>
                                {isFetching || isLoading ? "Cargando..." : (
                                    initial ? "Aplicar filtros" : `Mostrar ${count || 0} ${(count || 0) > 1 ? "resultados" : "resultado"}`
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            }
        >
            <div className={classNames(styleItem.item)}>
                <div className={styleItem.contentItem}>
                    <strong>Rango de Precios</strong>
                    <div className={styleItem.boxSearch}>


                        {priceLte && priceGte ? (
                            <span>{abbreviateNumber(priceLte)} - {abbreviateNumber(priceGte)}</span>
                        ) : (
                            <span>Escoge</span>
                        )}


                    </div>
                </div>
                <div className={styleItem.boxIcon}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>
        </Tippy>


    )
}