import { ObjectArrayI, ObjectI } from "@interfaces/common";

export const objectToParams = (params: ObjectI) => {
    return Object.keys(params).map((key) => {
        let value = params[key];
        value = typeof value == typeof {} ? JSON.stringify(value) : value;
        return `${key}=${value}`;
    }).join("&");
}

export const objectToParamsArray = (params: ObjectArrayI) => {
    return Object.keys(params).map((key) => {
        let value = params[key];
        let _value = Array.isArray(value) ? value.join(",") : typeof value == typeof {} ? JSON.stringify(value) : value;
        return `${key}=${_value}`;
    }).join("&");
}

export const orderArray = (key: string, data: ObjectI[], orderedKeys: string[]): ObjectI[] => {
    return orderedKeys.map(value => data.find(d => d[key] === value)).filter((d) => (d)) as ObjectI[];
}

export const insertByCondition = (condition: any, data: ObjectI): ObjectI => {
    return Boolean(condition) ? data : {}
}

export function removeKeys<T extends Record<string, any>>(payload: T, keysToRemove: Array<keyof T>): Partial<T> {
    const result = { ...payload };

    keysToRemove.forEach((key) => {
        delete result[key];
    });

    return result;
}