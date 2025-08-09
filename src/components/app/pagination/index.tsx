import { PaginationPropsI } from "./pagination.interface";
import { Pagination as PaginationMui, PaginationItem, styled } from '@mui/material';
import style from "./pagination.module.css"

const StyledPaginationItem = styled(PaginationItem)(({ theme }) => ({
    '&': {
        borderRadius: "4px"
    },
    '&.Mui-selected': {
        backgroundColor: "#afb1b5",
        color: theme.palette.common.white,

    },
    '&.Mui-selected:hover': {
        backgroundColor: "#565657",
    },
}));


export default function Pagination({ onChangePage, page, total }: PaginationPropsI) {

    return (
        <div className={style.container}>
            <PaginationMui
                page={page + 1}
                count={total}
                onChange={(_, skip) => {
                    onChangePage(skip - 1)
                }}
                renderItem={(item) => (
                    <StyledPaginationItem
                        {...item}
                    />
                )}
            />
        </div>
    )
}