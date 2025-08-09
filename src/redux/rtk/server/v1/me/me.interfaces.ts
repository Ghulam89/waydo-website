
export interface UserInfoV1I {
	firstName: string;
	lastName: string;
	phoneNumber: string | null;
	birthDate: string | null;
	uuid: string;
	createdAt: string;
	gender?: UserGenderI;
}

export type UserGenderI = "male" | "female" | "other";

export interface UserV1I {
	email: string;
	emailVerifyAt: string | null;
	uuid: string;
	createdAt: string;
	active: boolean;
	verify: boolean;
	info: UserInfoV1I;
	profileSrc: string;
}

export interface UpdateUserPayloadV1I {
	firstName?: string;
	lastName?: string;
	phoneNumber?: string;
	birthDate?: string;
	gender?: UserGenderI;
}

export interface UpdateUserResponseV1I {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	birthDate: string;
}

export interface UpdateUserPicturePayloadV1I {
	data: FormData;
}

export interface UpdatePasswordPayloadV1I {
	oldPassword: string;
	newPassword: string;
}

export interface CreateAddressResponseV1I {
	name: string;
	province: string;
	municipality: string;
	lat: number;
	lng: number;
	address: string;
	isDefaultAddress?: boolean;
	country?: string;
	neighborhood: string;
	location: Record<string, number>;
	addressReference: string;
	uuid: string;
	createdAt: string;
}

export interface CreateAddressPayloadV1I {
	name: string;
	province: string;
	municipality: string;
	lat: number;
	lng: number;
	address: string;
	isDefaultAddress?: boolean;
}

export interface UpdateAddressPayloadV1I {
	name: string;
	province: string;
	municipality: string;
	lat: number;
	lng: number;
	address: string;
	isDefaultAddress?: boolean;
	addressUUID?: string;
}

export interface UserAddressV1I {
	name: string;
	province: string;
	municipality: string;
	lat: number;
	lng: number;
	address: string;
	uuid: string;
	isDefaultAddress?: boolean;
}

export interface UserPhoneV1I {
	phone: string;
	countryCode?: string;
	isDefault: boolean;
	uuid: string;
}

export interface PayloadUserPhoneV1I {
	phone: string;
	countryCode?: string;
}

export interface PayloadUpdateUserPhoneV1I {
	phone: string;
	uuid?: string;
}