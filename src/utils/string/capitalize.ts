export const capitalize = (text: string) => {
    return text.replace(/^\w/, c => c.toUpperCase());
}