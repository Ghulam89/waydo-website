"use client";

import Pagination from "@components/app/pagination";
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { PostI } from "@redux/rtk/server/v1/post/post.interfaces";
import { updateListPost } from "@redux/slices/post";
import React, {
    useMemo
} from "react";
import ItemPageFilter from "./item";
import style from "./page-filter.module.css";

const dataLoading = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]

export default function PageFilter() {
    const dispatch = useAppDispatch();
    const { data, total, pagination, loading } = useAppSelector((s) => (s.post.list));
    const _total = useMemo(
        () => Math.ceil((total || 0) / (pagination.take || 0)),
        [total, pagination.take]
    );

    return (
        <React.Fragment>
            <Grid item xs={9}>
                <Grid container>
                    <Grid item xs={12}>
                        {loading ? dataLoading.map((_item, i) => (
                            <React.Fragment key={`loading-${i}`}>
                                <ItemPageFilter item={{} as PostI} loading={loading} />
                            </React.Fragment>
                        )) : (
                            Array.from(data || []).map((item, i) => (
                                <React.Fragment key={`post-${i}`}>
                                    <ItemPageFilter item={item} loading={loading} />
                                </React.Fragment>
                            ))
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <div className={style.boxPagination}>
                            <Pagination
                                page={pagination.skip || 0}
                                total={_total}
                                onChangePage={(skip) => {

                                    dispatch(updateListPost({
                                        pagination: {
                                            ...(pagination || {}),
                                            skip
                                        }
                                    }))
                                }}
                            />
                        </div>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={3}></Grid>
        </React.Fragment>
    );
}
