
export enum TypeProcessFilterEnum {
    set = "set",
    appends = "appends"
}

export type ProcessFilterType = `${TypeProcessFilterEnum}`

export interface ProcessFilterI {
    [key: string]: {
        key: string
        type: ProcessFilterType
    }
}

export const processFilter: ProcessFilterI = {
    versionSlug: {
        "key": "version",
        "type": "set"
    },
    priceGte: {
        "key": "price__gte",
        "type": "set"
    },
    priceLte: {
        "key": "price__lte",
        "type": "set"
    },
    yearGte: {
        "key": "year__gte",
        "type": "set"
    },
    yearLte: {
        "key": "year__lte",
        "type": "set"
    },
    search: {
        "key": "keyword",
        "type": "set"
    },
    autonomies: {
        "key": "autonomies",
        "type": "appends"
    },
    batteryCapacities: {
        "key": "battery__capacities",
        "type": "appends"
    },
    bodies: {
        "key": "bodies",
        "type": "appends"
    },
    chargingTime: {
        "key": "charging__time",
        "type": "appends"
    },
    colorsExterior: {
        "key": "colors_exterior",
        "type": "appends"
    },
    colorsInterior: {
        "key": "colors__interior",
        "type": "appends"
    },
    cylinders: {
        "key": "cylinders",
        "type": "appends"
    },
    drivetrains: {
        "key": "drivetrains",
        "type": "appends"
    },
    fuels: {
        "key": "fuels",
        "type": "appends"
    },
    doors: {
        "key": "doors",
        "type": "appends"
    },
    horsepowers: {
        "key": "horsepowers",
        "type": "appends"
    },
    seatings: {
        "key": "seatings",
        "type": "appends"
    },
    typeCar: {
        "key": "type__car",
        "type": "appends"
    },
    transmissions: {
        "key": "transmissions",
        "type": "appends"
    },
    statusCar: {
        "key": "status__car",
        "type": "appends"
    },
    softTopType: {
        "key": "soft_top_type",
        "type": "appends"
    },
    cabinType: {
        "key": "cabin_type",
        "type": "appends"
    },
    typeUse: {
        "key": "type_use",
        "type": "appends"
    },
    heavyVehicles: {
        "key": "heavy__vehicles",
        "type": "appends"
    },
    truckTypes: {
        "key": "truck__types",
        "type": "appends"
    },
    extras: {
        "key": "extras",
        "type": "appends"
    },
    seller: {
        "key": "seller",
        "type": "appends"
    },
    date: {
        "key": "date",
        "type": "appends"
    }
}
