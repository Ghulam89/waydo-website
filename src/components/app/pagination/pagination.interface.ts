export interface OnChangePagePaginationI{
    (page: number): void
}

export interface PaginationPropsI{
    total: number
    page: number
    onChangePage: OnChangePagePaginationI
}