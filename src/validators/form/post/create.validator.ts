export const CreatePostFirstFormValidationSchema = {
    brandUUID: {
        isRequired: { message: "La marca es requerida" }
    },
    modelUUID: {
        isRequired: { message: "El model es requerido" }
    },
    yearUUID: {
        isRequired: { message: "El año es requerido" }
    },
    currencyUUID: {
        isRequired: { message: "La moneda es requerida" }
    }
}

export const CreatePostFirstPayloadEmpty = {
    brandUUID: "",
    currencyUUID: "",
    yearUUID: "",
    modelUUID: "",
    versionUUID: "",
    mileage: 0,
    price: 0
}

export interface RulesCreatePostLastFormValidationI {
    isElectric: boolean
    isConvertible: boolean
    isMinivan: boolean
    isTruck: boolean
    isVan: boolean
    isTruckHeavyVehicle: boolean
    isHeavyVehicle: boolean
}

export const CreatePostLastFormValidationSchema = ({ isElectric, isMinivan, isTruck, isVan, isConvertible, isHeavyVehicle, isTruckHeavyVehicle }: RulesCreatePostLastFormValidationI) => ({
    title: {
        isRequired: { message: "El titulo es requerido" }
    },
    description: {
        isRequired: { message: "La description es requerida" }
    },
    bodyUUID: {
        isRequired: { message: "(Es requerido)" }
    },
    carStatusUUID: {
        isRequired: { message: "(Es requerido)" }
    },
    exteriorColorUUID: {
        isRequired: { message: "(Es requerido)" }
    },
    interiorColorUUID: {
        isRequired: { message: "(Es requerido)" }
    },
    fuelTypeUUID: {
        isRequired: { message: "(Es requerido)" }
    },
    transmissionUUID: {
        isRequired: { message: "(Es requerido)" }
    },
    drivetrainUUID: {
        isRequired: { message: "(Es requerido)" }
    },
    doorUUID: {
        isRequired: { message: "(Es requerido)" }
    },
    seatingUUID: {
        isRequired: { message: "(Es requerido)" }
    },
    ...(!isElectric ? {
        cyliderUUID: {
            isRequired: { message: "(Es requerido)" }
        },
        horsepowerUUID: {
            isRequired: { message: "(Es requerido)" }
        }
    } : {
        batteryCapacityUUID: {
            isRequired: { message: "(Es requerido)" }
        },
        chargingTimeUUID: {
            isRequired: { message: "(Es requerido)" }
        },
        autonomyUUID: {
            isRequired: { message: "(Es requerido)" }
        }
    }),
    ...(isMinivan || isVan ? {
        typeUseUUID: {
            isRequired: { message: "(Es requerido)" }
        }
    } : {}),
    ...(isTruck ? {
        cabinTypeUUID: {
            isRequired: { message: "(Es requerido)" }
        }
    } : {}),
    ...(isConvertible ? {
        softTopTypeUUID: {
            isRequired: { message: "(Es requerido)" }
        }
    } : {}),
    ...(isHeavyVehicle ? {
        heavyVehicleUUID: {
            isRequired: { message: "(Es requerido)" }
        }
    } : {}),
    ...(isTruckHeavyVehicle ? {
        truckTypeUUID: {
            isRequired: { message: "(Es requerido)" }
        }
    } : {})
})

export const CreatePostLastPayloadEmpty = ({ isElectric, isMinivan, isTruck, isVan, isConvertible, isHeavyVehicle, isTruckHeavyVehicle }: RulesCreatePostLastFormValidationI) => ({
    title: "",
    description: "",
    bodyUUID: "",
    carStatusUUID: "",
    exteriorColorUUID: "",
    interiorColorUUID: "",
    fuelTypeUUID: "",
    transmissionUUID: "",
    drivetrainUUID: "",
    doorUUID: "",
    seatingUUID: "",
    pictures: [],
    ...(!isElectric ? {
        cyliderUUID: "",
        horsepowerUUID: "",
    } : {
        batteryCapacityUUID: "",
        chargingTimeUUID: "",
        autonomyUUID: ""
    }),
    ...(isMinivan || isVan ? {
        typeUseUUID: ""
    } : {}),
    ...(isTruck ? {
        cabinTypeUUID: ""
    } : {}),
    ...(isConvertible ? {
        softTopTypeUUID: ""
    } : {}),
    ...(isHeavyVehicle ? {
        heavyVehicleUUID: ""
    } : {}),
    ...(isTruckHeavyVehicle ? {
        truckTypeUUID: ""
    } : {})
})
