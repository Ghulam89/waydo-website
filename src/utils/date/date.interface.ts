export interface RangeDateResponseI {
    from: string
    to: string
}

export interface PayloadRangeDateNotDinamycI {
    [key: string]: RangeDateResponseI
}

export interface RangeDateNotDinamycI {
    (): PayloadRangeDateNotDinamycI
}