import { PostI } from "@redux/rtk/server/v1/post/post.interfaces"

export interface ItemFeaturedPropsI {
    pictureSrc: string
    item: PostI
    objectContain?: boolean
}