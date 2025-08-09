'use client'

import classNames from "classnames";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import style from "./recent.module.css";

import Banner3 from "@components/app/banner/banner-3";
import Pagination from "@components/app/pagination";
import { PaginationParamsPetitionCommonI } from "@interfaces/common/petition.interface";
import { useLazyGetBrandsCarQuery, useLazyGetModelsByBrandCarQuery, useLazyGetYearsCarQuery } from "@redux/rtk/server/v1/car";
import { useLazyGetPostsQuery } from "@redux/rtk/server/v1/post";
import Arrow from "@svg/Arrow.svg";
import UndrawElectricCar from "@svg/illustration/UndrawElectricCar.svg";
import React from "react";
import ItemCar from "./item-car";

const FILTERING = ["brand", "model", "year"]

// Mock data for testing
const MOCK_BRANDS = [
  { uuid: "1", name: "Toyota" },
  { uuid: "2", name: "Honda" },
  { uuid: "3", name: "Ford" },
  { uuid: "4", name: "Chevrolet" },
  { uuid: "5", name: "BMW" },
  { uuid: "6", name: "Mercedes" },
  { uuid: "7", name: "Audi" },
  { uuid: "8", name: "Tesla" },
  { uuid: "9", name: "Nissan" },
  { uuid: "10", name: "Hyundai" },
];

const MOCK_MODELS = [
  { uuid: "m1", name: "Corolla" },
  { uuid: "m2", name: "Camry" },
  { uuid: "m3", name: "RAV4" },
  { uuid: "m4", name: "Prius" },
  { uuid: "m5", name: "Highlander" },
];

const MOCK_YEARS = [
  { year: 2023 },
  { year: 2022 },
  { year: 2021 },
  { year: 2020 },
  { year: 2019 },
];

const MOCK_POSTS = Array.from({ length: 15 }, (_, i) => ({
 id: `post-${i}`,
  title: `Car ${i + 1}`,
  slug: `car-${i + 1}`,
  url: `/posts/car-${i + 1}`,
  currency: {
    iso3: "USD",
    symbol: "$"
  },
  price: 10000 + (i * 2000),
  description: `This is a description for car ${i + 1}`,
  uuid: `post-${i}-uuid`,
  createdAt: new Date().toISOString(),
  thumbnail: {
    src: "/assets/img/no-car-photo.png",
    alt: `Car ${i + 1}`
  },
  pictures: [],
  car: {
    brand: { uuid: "1", name: "Toyota" },
    model: { uuid: "m1", name: "Corolla" },
    year: 2023 - (i % 5),
    images: [],
    mileage: 10000 + (i * 5000)
  },
  geolocation: {
    city: "Sample City",
    state: "Sample State",
    country: "Sample Country"
  },
  creator: {
    uuid: "user-1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    avatar: "/assets/img/user-avatar.png"
  },
}));

export default function RecentHome() {
    const navRef = useRef<HTMLDivElement>(null);
    const [scrollLeft, setScrollLeft] = useState<number>(0)
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [indexFiltering, setIndexFiltering] = useState<number>(0)
    const [filters, setFilters] = useState({
        brand: "",
        model: "",
        year: 0
    })

    // For testing, we'll use mock data instead of API calls
    const [isLoadingBrands, setIsLoadingBrands] = useState(false);
    const [isLoadingModels, setIsLoadingModels] = useState(false);
    const [isLoadingYears, setIsLoadingYears] = useState(false);
    const [isLoadingPosts, setIsLoadingPosts] = useState(false);
    
    const [responseBrand, setResponseBrand] = useState<any>(null);
    const [responseModel, setResponseModel] = useState<any>(null);
    const [responseYear, setResponseYear] = useState<any>(null);
    const [resPosts, setResPosts] = useState<any>(null);

    const [pagination, setPagination] = useState<PaginationParamsPetitionCommonI>({
        take: 15,
        skip: 0
    })

    const total = useMemo(() => (Math.ceil((resPosts?.count || MOCK_POSTS.length) / pagination.take)), [resPosts?.count, pagination.take])

    const navs = useMemo(() => {
        if (!filters.brand) {
            return MOCK_BRANDS.map(item => ({
                label: item.name,
                value: item.uuid
            }))
        } else if (!filters.model) {
            return MOCK_MODELS.map(item => ({
                label: item.name,
                value: item.uuid
            }))
        } else {
            return MOCK_YEARS.map(item => ({
                label: item.year,
                value: item.year
            }))
        }
    }, [filters])

    const checkScrollPosition = useCallback(() => {
        if (navRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
        }
    }, [])

    const scroll = useCallback((scrollOffset: number) => {
        if (!navRef.current) return;
        navRef.current.scrollBy({
            top: 0,
            left: scrollOffset,
            behavior: 'smooth'
        });

        setScrollLeft(scrollLeft + scrollOffset)
    }, [scrollLeft])

    const handleFilter = useCallback((value: any) => {
        const _filterin = FILTERING[indexFiltering]
        if (!_filterin) return;

        setFilters((prev) => ({
            ...prev,
            [_filterin]: value
        }))

        if ((indexFiltering + 1) === FILTERING.length) return;

        setIndexFiltering((prev) => (prev + 1))
    }, [FILTERING, indexFiltering])

    useEffect(() => {
        checkScrollPosition()
    }, [responseBrand]);

    useEffect(() => {
        // Mock API call for posts
        setIsLoadingPosts(true);
        setTimeout(() => {
            setResPosts({
                data: MOCK_POSTS,
                count: MOCK_POSTS.length
            });
            setIsLoadingPosts(false);
        }, 500);
    }, [pagination, filters])

    useEffect(() => {
        // Mock API call for brands
        setIsLoadingBrands(true);
        setTimeout(() => {
            setResponseBrand({
                data: MOCK_BRANDS
            });
            setIsLoadingBrands(false);
        }, 500);
    }, [])

    useEffect(() => {
        if (!filters.brand) return;

        // Mock API call for models
        setIsLoadingModels(true);
        setTimeout(() => {
            setResponseModel({
                data: MOCK_MODELS
            });
            setIsLoadingModels(false);
        }, 500);
    }, [filters.brand])

    useEffect(() => {
        if (!filters.brand || !filters.model) return;

        // Mock API call for years
        setIsLoadingYears(true);
        setTimeout(() => {
            setResponseYear({
                data: MOCK_YEARS
            });
            setIsLoadingYears(false);
        }, 500);
    }, [filters])

    return (
        <div className={style.container}>
            <div className={style.boxTitle}>
                <h3>Recientes</h3>
            </div>
            <div className={style.box}>
                <div className={style.scrollableNavContainer}>
                    {navs.length ? (
                        <button
                            onClick={() => {
                                if (!canScrollLeft) return;
                                scroll(-300);
                                setTimeout(checkScrollPosition, 300);
                            }}
                            style={{ opacity: canScrollLeft ? 1 : 0 }}
                            className={classNames(style.scrollButton, style.scrollButtonBack)}
                        >
                            <Arrow />
                        </button>

                    ) : null}
                    <div className={style.scrollableNav} ref={navRef}>
                        {navs.map((nav, i) => (
                            <div key={`scrollabel-nav-home-${i}`} className={classNames(style.navItem, nav.value == `${filters.year}` ? style.active : "")} onClick={() => handleFilter(nav.value)}>{nav.label}</div>
                        ))}
                    </div>
                    {navs.length ? (
                        <button
                            onClick={() => {
                                if (!canScrollRight) return;
                                scroll(300);
                                setTimeout(checkScrollPosition, 300)
                            }}
                            style={{ opacity: canScrollRight ? 1 : 0 }}
                            className={style.scrollButton}
                        >
                            <Arrow />
                        </button>

                    ) : null}
                </div>
                <div className={style.boxTable}>
                    <div className={style.contentTable}>
                        {!Array.from(resPosts?.data || []).length ? (
                            <div className={style.boxEmpty}>
                                <div className={style.boxEmptySvg}>
                                    <UndrawElectricCar />
                                </div>
                                <div className={style.textEmptySvg}>
                                    <p>No tenemos carros para mostrar</p>
                                </div>
                            </div>
                        ) : (
                            <div className={style.boxItems}>
                                {/* {Array.from(resPosts?.data || []).map((item, i) => (
                                    <React.Fragment key={i}>
                                        <ItemCar item={item} />
                                    </React.Fragment>
                                ))} */}
                            </div>
                        )}
                        <div>
                            <Banner3 />
                        </div>
                    </div>
                    <div>
                        <Pagination page={pagination.skip} total={total} onChangePage={(skip) => {
                            setPagination((prev) => ({
                                ...prev,
                                skip
                            }))
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}