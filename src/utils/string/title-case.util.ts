export const toTitleCase = (input?: string): string => {
    if (!input) return ''
	return input.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
}
