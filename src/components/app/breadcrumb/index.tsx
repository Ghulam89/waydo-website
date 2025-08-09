import { Breadcrumbs, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { BradcrumbCustomPropsI } from './breadcrumb.interface';
import React, { useCallback, useMemo } from 'react';
import config from '@config';

import style from "./breadcrumb.module.css"

export default function BradcrumbCustom({ items, withoutHome }: BradcrumbCustomPropsI) {
    const _items = useMemo(() => !withoutHome ? [
        { label: config.app.name, link: "/" },
        ...items
    ] : items, [items, withoutHome])

    const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
    }, [])

    return (
        <Breadcrumbs separator="›" aria-label="breadcrumb" className={style.container}>
            {_items.map((item, i) => (
                <React.Fragment key={i}>
                    {typeof item == "string" ? (
                        <Typography color="text.primary" className={style.text}>
                            {item}
                        </Typography>
                    ) : (
                        <Link
                            underline="hover"
                            key="2"
                            color="inherit"
                            href={item.link}
                            className={style.link}
                            onClick={handleClick}
                        >
                            {item.label}
                        </Link>
                    )}
                </React.Fragment>
            ))}
        </Breadcrumbs>
    )
}