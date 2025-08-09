import { ItemRequirementListPasswordI, KeyItemRequirementListPasswordEnum } from "./password.interface";

export const requirementListPasswordSetting: ItemRequirementListPasswordI[] = [
    {
        label: "Al menos 7 caracteres",
        regex: /^.{7,}$/,
        name: "password",
        key: KeyItemRequirementListPasswordEnum.minimunLetter
    },
    {
        label: "Una letra mayúscula y una minúscula",
        regex: /^(?=.*[a-z])(?=.*[A-Z])/,
        name: "password",
        key: KeyItemRequirementListPasswordEnum.minimunLetter
    },
    {
        label: "Debe contaner un número",
        regex: /^(?=.*\d)/,
        name: "password",
        key: KeyItemRequirementListPasswordEnum.minimunLetter
    },
    {
        label: "Al menos un carácter especial",
        regex: /^(?=.*[\W_])/,
        name: "password",
        key: KeyItemRequirementListPasswordEnum.minimunLetter
    },
    {
        label: "No debe incluir su nombre",
        name: "firstName",
        regex: (name) => {
            return new RegExp(`^(?!.*${name})`)
        },
        key: KeyItemRequirementListPasswordEnum.minimunLetter
    }
]