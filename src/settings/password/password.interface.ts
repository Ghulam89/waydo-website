export enum KeyItemRequirementListPasswordEnum{
    minimunLetter = "minimun-letter",
    upperAndLowerCase = "upper-and-lower-case",
    hasNumber = "has-number",
    specialCharacter = "special-character",
    noName = "no-name"
}

export type KeyItemRequirementListPasswordType = `${KeyItemRequirementListPasswordEnum}`

export interface FuntionRegExpI{
    (value: string): RegExp
}

export interface ItemRequirementListPasswordI{
    label: string
    valid?: boolean
    name: string
    regex: RegExp | FuntionRegExpI
    key: KeyItemRequirementListPasswordType
}