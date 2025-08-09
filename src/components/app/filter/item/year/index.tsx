import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, TextField } from "@mui/material";
import Tippy from "@tippyjs/react";
import classNames from "classnames";

import { useDebounce } from "@hooks/useDebounce";
import { useLazyCountPostsQuery } from "@redux/rtk/server/v1/post";
import { updateFilter } from "@redux/slices/filter";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { generateUrlPost, MAX_YEAR_FILER, MIN_YEAR_FILTER } from "@utils/filter";
import { insertByCondition } from "@utils/object/object.util";
import { useRouter } from "next/navigation";
import { YearFilterPropsI, YearRangeFilterI } from "./year.interface";

import styleFilter from "../../filter.module.css";
import styleItem from "../item.module.css";
import style from "./year.module.css";

export default function YearFilter({ allowSearch }: YearFilterPropsI) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [initial, setInitial] = useState(true)
    const tippyInstance = useRef<any>();
    const [range, setRange] = useState<YearRangeFilterI>({
        from: 0,
        to: 0
    })

    const filters = useAppSelector((s) => (s.filters))
    const { yearLte, yearGte } = filters
    const [countPosts, { isLoading, data: count, isFetching }] = useLazyCountPostsQuery();

    const dataFilter = useMemo(() => ({
        ...filters.filterFormatted,
        ranges: {
            ...(filters?.filterFormatted?.ranges || {}),
            ...insertByCondition(range.from && range.to, {
                "car.year": range
            })
        }
    }), [filters, range])
    const _filters = useDebounce(dataFilter, 200)

    const handleUpdate = useCallback((key: keyof YearRangeFilterI, range: string) => {
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
            yearLte: 0,
            yearGte: 0
        }))

        setRange({
            from: 0,
            to: 0
        })

        if (!allowSearch) {
            router.push(generateUrlPost({
                ...filters,
                yearLte: 0,
                yearGte: 0
            }))
        }

        handleCloseFilter()
    }, [allowSearch, filters])

    const handleApplyFilter = useCallback(() => {
        if (isLoading) return;

        dispatch(updateFilter({
            yearLte: range.from,
            yearGte: range.to
        }))

        handleCloseFilter()

        if (!allowSearch) {
            const now = new Date()
            router.push(generateUrlPost({
                ...filters,
                yearLte: range.from ? range.from : 1920,
                yearGte: range.to ? range.to : now.getFullYear()
            }))
        }
    }, [tippyInstance, range, isLoading, filters]);

    const getCount = useCallback(() => {
        countPosts(_filters);
    }, [_filters])

    useEffect(() => {
        const now = new Date()

        setRange({
            from: MIN_YEAR_FILTER,
            to: MAX_YEAR_FILER
        })
    }, [])

    useEffect(() => {
        if (!initial) {
            getCount()
        }
    }, [_filters, initial])

    useEffect(() => {
        if (!range.from && !range.to && filters.yearLte && filters.yearGte) {
            setRange({
                from: filters.yearLte,
                to: filters.yearGte
            })
        }
    }, [range, filters.yearLte, filters.yearGte])

    return (
        <Tippy
            key={`model-filter`}
            interactive
            arrow={false}
            trigger="click"
            placement="bottom-start"
            animation="shift-away"
            maxWidth={"auto"}
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
                    <strong>Año</strong>
                    <div className={styleItem.boxSearch}>
                        {yearGte && yearLte ? (
                            <span>{yearLte} - {yearGte}</span>
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