import { MetadataI } from "@components/layouts/layout.interface"
import { DeepPartial } from "@interfaces/common"

export interface LayoutSliceSliceI {
	//@ts-ignore
    jsonLd?: WithContext<T>
    metadata?: DeepPartial<MetadataI>,
    showModalAuth: boolean
    showModalSignUp: boolean
    title: string
}
