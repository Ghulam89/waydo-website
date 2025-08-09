import { UserV1I } from "../me/me.interfaces"


export interface SignUpPayloadV1I {
	firstName: string
	lastName: string
	phoneNumber?: string
	birthDate?: string
	email: string
	password: string
}

export interface SignInPayloadV1I {
	email: string
	password: string
}

export interface SIgnUpResponseV1I {
	token: string
	user: UserV1I
}

export interface SIgnInResponseV1I {
	token: string
	user: UserV1I
}

export interface AuthSocialPayloadV1I {
	token: string
}
