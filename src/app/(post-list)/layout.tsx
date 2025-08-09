'use client'

import ModalAuth from '@components/app/auth/modal';
import ModalSignUpAuth from '@components/app/auth/modal/signup';
import Banner from '@components/app/banner';
import BradcrumbCustom from '@components/app/breadcrumb';
import Filter from '@components/app/filter';
import GetVerifiedModal from '@components/app/get-verified-modal';
import Layout from '@components/layouts';
import MessageActiveAccount from '@components/pages/commun/message-active-account';
import { Grid } from '@mui/material';
import { useLazyGetUserInfoV1Query } from '@redux/rtk/server/v1/me';
import Tippy from '@tippyjs/react';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

import { SortTableType } from '@interfaces/common/petition.interface';
import { clearFilter, updateFilter } from '@redux/slices/filter';
import { KeySortEnum } from '@redux/slices/filter/filter.interface';
import { useAppDispatch, useAppSelector } from '@redux/store';
import style from "./layout.module.css";

import ListFilter from '@components/app/filter/list';
import { useDebounce } from '@hooks/useDebounce';
import { useLazyCountPostListFilterQuery, useLazyGetPostsQuery } from '@redux/rtk/server/v1/post';
import { updateListPost } from '@redux/slices/post';
import Save from "@svg/saveIcon.svg";
import Sort from "@svg/sortIcon.svg";
import { RangeDateNotDinamyc } from '@utils/date/date.util';
import { insertByCondition } from '@utils/object/object.util';
import { useRouter } from 'next/navigation';

// Mock data interfaces
interface MockPost {
  id: number;
  title: string;
  price: number;
  car: {
    mileage: number;
    brand: string;
    model: string;
    year: number;
  };
  createdAt: string;
}

interface MockUser {
  id: number;
  name: string;
  email: string;
  verify: boolean;
}

interface MockCountPost {
  brandName: string;
  brandSlug: string;
  modelName: string;
  modelSlug: string;
  year: number;
  totalPost: number;
}

// Mock data
const MOCK_POSTS: MockPost[] = [
  {
    id: 1,
    title: 'Toyota Corolla 2020',
    price: 18000,
    car: {
      mileage: 25000,
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020
    },
    createdAt: '2023-05-15T10:30:00Z'
  },
  {
    id: 2,
    title: 'Honda Civic 2018',
    price: 15000,
    car: {
      mileage: 35000,
      brand: 'Honda',
      model: 'Civic',
      year: 2018
    },
    createdAt: '2023-04-20T14:15:00Z'
  },
  {
    id: 3,
    title: 'Ford Mustang 2021',
    price: 32000,
    car: {
      mileage: 12000,
      brand: 'Ford',
      model: 'Mustang',
      year: 2021
    },
    createdAt: '2023-06-10T09:45:00Z'
  }
];

const MOCK_USER: MockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  verify: true
};

const MOCK_COUNT_POSTS: MockCountPost[] = [
  {
    brandName: 'Toyota',
    brandSlug: 'toyota',
    modelName: 'Corolla',
    modelSlug: 'corolla',
    year: 2020,
    totalPost: 15
  },
  {
    brandName: 'Honda',
    brandSlug: 'honda',
    modelName: 'Civic',
    modelSlug: 'civic',
    year: 2018,
    totalPost: 12
  },
  {
    brandName: 'Ford',
    brandSlug: 'ford',
    modelName: 'Mustang',
    modelSlug: 'mustang',
    year: 2021,
    totalPost: 8
  }
];

// Mock API responses
const useMockApi = () => {
  const [mockUser] = useState<MockUser | null>(MOCK_USER);
  const [mockPosts] = useState<MockPost[]>(MOCK_POSTS);
  const [mockCountPosts] = useState<MockCountPost[]>(MOCK_COUNT_POSTS);

  const mockGetUserInfo = async () => {
    return { data: mockUser, isLoading: false };
  };

  const mockGetPosts = async () => {
    return { 
      data: { 
        data: mockPosts, 
        count: mockPosts.length 
      } 
    };
  };

  const mockGetCountPostListFilter = async () => {
    return { data: mockCountPosts };
  };

  return {
    mockGetUserInfo,
    mockGetPosts,
    mockGetCountPostListFilter
  };
};

interface ItemSortI {
    label: string;
    key: string;
    format: () => [string, SortTableType | null] | [];
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const tippySortInstance = useRef<any>(null);

    // Use mock API hooks
    const { 
      mockGetUserInfo, 
      mockGetPosts, 
      mockGetCountPostListFilter 
    } = useMockApi();

    const ref = useRef<LoadingBarRef>(null)
    const [sorting, setSorting] = useState<boolean>(false);

    // Replace real API calls with mock functions for testing
    const [getPosts, { data: resPosts }] = useLazyGetPostsQuery();
    const [getCountPostListFilter, { data: resCountPostListFilter }] = useLazyCountPostListFilterQuery({});
    const [getUserInfo, { isLoading: isLoadingUserInfo, data: user }] = useLazyGetUserInfoV1Query({})

    // For testing, override with mock data
    const mockDataEnabled = true; // Set to false to use real data
    const testResPosts = mockDataEnabled ? { data: MOCK_POSTS, count: MOCK_POSTS.length } : resPosts;
    const testResCountPostListFilter = mockDataEnabled ? MOCK_COUNT_POSTS : resCountPostListFilter;
    const testUser = mockDataEnabled ? MOCK_USER : user;
    const testIsLoadingUserInfo = mockDataEnabled ? false : isLoadingUserInfo;

    const { filters, post: _post } = useAppSelector((s) => (s));
    const isLoading = useMemo(() => (testIsLoadingUserInfo || _post.list.loading), [testIsLoadingUserInfo, _post.list.loading])

    const post = useAppSelector((s) => (s.post));
    const _search = useMemo(() => (filters.search), [filters.search])
    const search = useDebounce(_search, 500)
    const pagination = useMemo(() => (post.list.pagination), [post])

    const itemSort = useMemo(
        () =>
            [
                {
                    label: "Predeterminado",
                    key: KeySortEnum.default,
                    format: () => ["createdAt", "DESC"],
                },
                {
                    label: "De lo más nuevo a lo más antiguo",
                    key: KeySortEnum.newest_to_oldest,
                    format: () => ["createdAt", "DESC"],
                },
                {
                    label: "De lo más antiguo a lo más nuevo",
                    key: KeySortEnum.oldest_to_newest,
                    format: () => ["createdAt", "ASC"],
                },
                {
                    label: "Kilómetros de mayor a menor",
                    key: KeySortEnum.kilometers_highest_to_lowest,
                    format: () => ["car.mileage", "DESC"],
                },
                {
                    label: "Kilómetros de menor a mayor",
                    key: KeySortEnum.kilometers_lowest_to_highest,
                    format: () => ["car.mileage", "ASC"],
                },
                {
                    label: "Precio de mayor a menor",
                    key: KeySortEnum.price_highest_to_lowest,
                    format: () => ["price", "DESC"],
                },
                {
                    label: "Precio de menor a mayor",
                    key: KeySortEnum.price_lowest_to_highest,
                    format: () => ["price", "ASC"],
                },
            ] as ItemSortI[],
        [KeySortEnum]
    );

    const handleGetData = useCallback(async () => {
        if (!ref?.current) return;

        ref.current.continuousStart()

        // Use mock function for testing
        if (mockDataEnabled) {
          const result = await mockGetUserInfo();
          dispatch(updateListPost({
            data: MOCK_POSTS,
            total: MOCK_POSTS.length
          }));
          ref.current.complete();
          return;
        }

        await getUserInfo({})
        ref.current.complete()
    }, [ref, mockDataEnabled])

    const filterList = useMemo(() => {
        return Array.from(testResCountPostListFilter || []).map((item) => {
            return {
                label: (!filters.brandSlug ? item.brandName : filters.brandSlug && filters.modelSlug ? `${filters.brandName} ${filters.modelName}` : item.modelName) as string,
                subLabel: `(${filters.brandSlug && filters.modelSlug ? item.year : item.totalPost})`,
                value: (!filters.brandSlug ? item.brandSlug : filters.brandSlug && filters.modelSlug ? item.year : item.modelSlug) as string
            }
        })
    }, [testResCountPostListFilter, filters])

    const linkListFilte = useMemo(() => {
        if (!filters.brandSlug) {
            return "/motors/all"
        } else if (filters.brandSlug) {
            return `/motors/all/${filters.brandSlug}`
        } else if (filters.brandSlug && filters.brandSlug) {
            return `/motors/all/${filters.brandSlug}/${filters.modelSlug}`
        }
    }, [filters])

    const handleUpdateSort = useCallback(() => {
        setSorting((prev) => !prev);
    }, []);

    const handleUpdateFilter = useCallback(
        (item: ItemSortI) => {
            if (!tippySortInstance.current) return;
            tippySortInstance.current.hide();

            dispatch(
                updateFilter({
                    sort: {
                        key: item.key,
                        data: item.format(),
                        label: item.label,
                    },
                })
            );
        },
        [tippySortInstance]
    );

    const handleClearFilter = useCallback(() => {
        dispatch(clearFilter())
        router.push("/motors")
    }, [])

    useEffect(() => {
        handleGetData()
    }, [ref])

    useEffect(() => {
        dispatch(updateListPost({
            loading: true
        }))

        // Use mock function for testing
        if (mockDataEnabled) {
          setTimeout(() => {
            dispatch(updateListPost({
              data: MOCK_POSTS,
              total: MOCK_POSTS.length,
              loading: false
            }));
          }, 500);
          return;
        }

        const request = getPosts({
            ...(search ? { search } : {}),
            ...(filters.filterFormatted || {}),
            pagination,
            sort: filters.sort.data.length ? filters.sort.data : ["createdAt", "DESC"],
        })

        request.then((resp) => {
            dispatch(updateListPost({
                data: resp.data?.data || [],
                total: resp.data?.count || 0
            }))
        }).catch(() => { })
            .finally(() => {
                dispatch(updateListPost({
                    loading: false
                }))
            })

        return () => {
            request.abort()
        }
    }, [
        pagination,
        filters.sort,
        search,
        JSON.stringify(filters.filterFormatted),
        mockDataEnabled
    ]);

    useEffect(() => {
        // Use mock function for testing
        if (mockDataEnabled) {
          mockGetCountPostListFilter().then(() => {});
          return;
        }

        getCountPostListFilter({
            ...(insertByCondition(filters.brandSlug ? true : false, {
                brandSlug: filters.brandSlug
            })),
            ...(insertByCondition(filters.modelSlug ? true : false, {
                modelSlug: filters.modelSlug
            })),
            // ... (rest of your existing code)
        }).then(() => { }).catch(() => { })
    }, [
        // ... (your existing dependencies)
        mockDataEnabled
    ])

    useEffect(() => {
        return () => {
            dispatch(clearFilter())
        }
    }, [])

    return (
        <React.Fragment>
            <LoadingBar color='var(--primary-color)' ref={ref} />
            <Layout>
                {testUser && !testUser.verify && !isLoading ? (
                    <MessageActiveAccount />
                ) : null}
                {!isLoading || (testUser && testUser.verify) ? (

                    <Grid container>
                        <Grid item xs={12}>
                            <Banner />
                        </Grid>

                        <Grid item xs={12} className={style.filterWrapper}>
                            <div className={style.containerFilter}>
                                <Filter />
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <BradcrumbCustom
                                        items={[
                                            {
                                                label: "Motores",
                                                link: "/motors",
                                            },
                                            "Carros",
                                        ]}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <div className={style.header}>
                                        <div className={style.boxTitle}>
                                            <h1 data-testid="page-title" className={style.title}>
                                                Compra y vende {filters.search ? filters.search : ""} en Republica Dominicana
                                                <span className={style.titleSeparator}>•</span>
                                                <span className={style.spanAds}>{testResPosts?.count || 0} Anuncios</span>
                                            </h1>
                                        </div>
                                        <div className={style.headerFilter}>
                                            <button className={style.buttonClearFilter} onClick={handleClearFilter}>
                                                Limpiar filtros
                                            </button>
                                            <Tippy
                                                interactive
                                                arrow={false}
                                                trigger="click"
                                                placement="bottom-start"
                                                animation="shift-away"
                                                maxWidth={"auto"}
                                                onShow={handleUpdateSort}
                                                onHide={handleUpdateSort}
                                                onCreate={(instance) => {
                                                    tippySortInstance.current = instance;
                                                }}
                                                content={
                                                    <div className={style.boxSort}>
                                                        <ul>
                                                            {itemSort.map((item, i) => (
                                                                <li
                                                                    key={i}
                                                                    className={style.liSort}
                                                                    onClick={() => handleUpdateFilter(item)}
                                                                >
                                                                    <span
                                                                        className={classNames(
                                                                            filters.sort.key === item.key
                                                                                ? style.sortActive
                                                                                : ""
                                                                        )}
                                                                    >
                                                                        {item.label}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                }
                                            >
                                                <button className={style.button}>
                                                    <div
                                                        className={classNames(
                                                            style.boxButtonIcon,
                                                            sorting ? style.boxButtonIconActive : ""
                                                        )}
                                                    >
                                                        <Sort />
                                                    </div>
                                                    <span>
                                                        Sortear: <strong>{filters.sort.label}</strong>
                                                    </span>
                                                </button>
                                            </Tippy>

                                            <button className={style.button}>
                                                <div className={style.boxButtonIcon}>
                                                    <Save />
                                                </div>
                                                <span>Save Search</span>
                                            </button>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>

                        {linkListFilte && filterList.length ? (
                            <Grid item xs={12}>
                                <ListFilter
                                    noAddLink={filters.brandSlug && filters.modelSlug ? true : false}
                                    link={linkListFilte}
                                    items={filterList}
                                    keysQuery={["yearGte", "yearLte"]}
                                />
                            </Grid>
                        ) : null}

                        {children}
                    </Grid>
                ) : null}
            </Layout>

            {!isLoading && !testUser && (
                <React.Fragment>
                    <ModalAuth />
                    <ModalSignUpAuth />
                </React.Fragment>
            )}

            <GetVerifiedModal />
        </React.Fragment>
    )
}