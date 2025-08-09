import { ObjectI } from "."

export interface PaginationParamsPetitionCommonI {
    skip: number
    take: number
}

export type SortTableType = "DESC" | "ASC"

interface SortI {

}

export interface ParamsPetitionCommonI {
    pagination: PaginationParamsPetitionCommonI
    filters: ObjectI
    include: ObjectI
    noInclude: ObjectI
    search: string
    sort: [string, SortTableType | null] | []
    ranges: ObjectI
}