import { DeepPartial } from "@interfaces/common";
import { ReactNode } from "react";

export interface GeoMetadataI{
    placename: string
    position: string
    region: string
}

export interface TwitterMetadataI{
    card: string
    site: string
    creator: string
}

export interface FacebookMetadataI{
    admins: string
}

export interface OgMetadataI{
    url: string
    title: string
    description: string
    image: string
    type: string
    site_name: string
}

export interface ArticleMetadataI{
    published_time: string
    modified_time: string
    section: string
    tag: string
}

export interface GooglePlusMetadataI{
    name: string
    description: string
    image: string
}

export interface AlexaMetadataI{
    alexaVerifyID: string
}

export interface CanonicalMetadataI{
    canonical: string
}

export interface MetadataI{
    geo?: DeepPartial<GeoMetadataI>
    twitter?: DeepPartial<TwitterMetadataI>
    og?: DeepPartial<OgMetadataI>
    article?: DeepPartial<ArticleMetadataI>
    google_plus?: DeepPartial<ArticleMetadataI>
    alexa?: DeepPartial<AlexaMetadataI>
    canonical?: DeepPartial<CanonicalMetadataI>
}

export interface LayoutPropsI{
    children: ReactNode
    metadata?: DeepPartial<MetadataI>
}
