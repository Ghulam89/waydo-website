export interface BreadcrumbI{
    link: string
    label: string
}

export interface BradcrumbCustomPropsI{
    items: Array<string | BreadcrumbI>
    withoutHome?: boolean
} 