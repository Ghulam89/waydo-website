import config from '@config'
import { DeepPartial } from '@interfaces/common'
import { DataCreateFormPostI } from '@redux/slices/post/post.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import paramsSerializerUtils from '@utils/paramsSerializer.utils'
import {
    CountPostListBrandParamsI,
    CountPostListBrandResponseI,
    CreatePostResponseI,
    GetPostBySlugParamsI,
    GetPostBySlugResponseI,
    GetPostsParamsI,
    GetPostsResponseI,
    PayloadCreatePostI,
    PayloadGetInfoPostByImageI,
    PayloadGetInfoPostByTextI
} from './post.interfaces'

export const postV1RTKProvider = createApi({
    reducerPath: 'postV1',
    baseQuery: fetchBaseQuery({
        baseUrl: `${config.server.api}/v1/posts`,
        credentials: 'include',
        paramsSerializer(params) {
            return paramsSerializerUtils(params)
        }
    }),
    endpoints: (builder) => ({
        createPost: builder.mutation<CreatePostResponseI, PayloadCreatePostI>({
            query: (data) => {
                const { pictures, extras, ...body } = data
                const formData = new FormData()

                Object.keys(body).forEach(key => {
                    //@ts-ignore
                    formData.append(key, typeof body[key] == "object" ? JSON.stringify(body[key]) : body[key])
                })

                pictures.forEach(picture => {
                    formData.append("pictures", picture)
                })

                extras.forEach(extra => {
                    formData.append("extras", extra)
                })

                return {
                    url: '/',
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                }
            },
            transformResponse: (res: CreatePostResponseI) => {
                return res
            }
        }),
        getPostBySlug: builder.query<GetPostBySlugResponseI, GetPostBySlugParamsI>({
            query: (data) => {
                const { slug, ...params } = data
                return {
                    url: `/${slug}`,
                    method: 'GET',
                    params
                }
            }
        }),
        getPosts: builder.query<GetPostsResponseI, GetPostsParamsI>({
            query: (data) => {
                return {
                    url: '/',
                    method: 'GET',
                    params: data
                }
            }
        }),
        countPosts: builder.query<number, GetPostsParamsI>({
            query: (data) => {
                return {
                    url: '/count',
                    method: 'GET',
                    params: data
                }
            }
        }),
        getInfoPostByImage: builder.mutation<DataCreateFormPostI, PayloadGetInfoPostByImageI>({
            query: (data) => {
                const { file, type } = data
                const formData = new FormData()

                formData.append("type", type)
                formData.append("picture", file)

                return {
                    url: '/picture',
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                }
            }
        }),
        getInfoPostByText: builder.mutation<DataCreateFormPostI, PayloadGetInfoPostByTextI>({
            query: (body) => {
                return {
                    url: '/text',
                    method: 'POST',
                    body
                }
            }
        }),
        countPostListFilter: builder.query<CountPostListBrandResponseI[], DeepPartial<CountPostListBrandParamsI>>({
            query: (data) => {
                return {
                    url: '/list/filters/count',
                    method: 'GET',
                    params: data
                }
            }
        })
    })
})

export const {
    useCreatePostMutation,
    useGetPostBySlugQuery,
    useLazyGetPostBySlugQuery,
    useGetPostsQuery,
    useLazyGetPostsQuery,
    useGetInfoPostByImageMutation,
    useGetInfoPostByTextMutation,
    useCountPostsQuery,
    useLazyCountPostsQuery,
    useCountPostListFilterQuery,
    useLazyCountPostListFilterQuery
} = postV1RTKProvider
