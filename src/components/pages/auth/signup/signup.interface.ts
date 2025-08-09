import { SignUpPayloadV1I } from "@redux/rtk/server/v1/auth/auth.interfaces";


export interface FormSignUpI extends SignUpPayloadV1I{

}

export interface SignUpComponentPropsI{
    isModal?: boolean
}