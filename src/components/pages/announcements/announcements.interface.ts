export interface ItemFilterAnnouncementI{
    label: string
    count: number
    active?: boolean
}

export interface FilterAnnouncementI{
    [key: string]: ItemFilterAnnouncementI
}