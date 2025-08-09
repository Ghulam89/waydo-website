import { PostI } from "@redux/rtk/server/v1/post/post.interfaces";

export interface ItemPageFilterPropsI {
    item: PostI
    loading?: boolean
}