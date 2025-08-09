
export interface TwoFactorOptionsResponseV1I {
	login: boolean;
	changePassword: boolean;
	payment: boolean;
	updateProfile: boolean;
}

export interface UpdateTwoFactorOptionsPayloadV1I {
	login?: boolean;
	changePassword?: boolean;
	payment?: boolean;
	updateProfile?: boolean;
}

export interface TwoFactorResponseV1I {
	secretKey: string;
	otpAuthUrl: string;
	mnemonic: string[];
}

