export interface CollaboratorI {
    firstName: string
}

export interface ItemNavFavoritePropsI {
    isDefault?: boolean
    title: string
    total: number
    collaborators?: CollaboratorI[]
}