export function abbreviateNumber(number: number): string {
    const units = [
        { value: 1, suffix: '' },
        { value: 1e3, suffix: 'K' },
        { value: 1e6, suffix: 'M' },
        { value: 1e9, suffix: 'B' },
        { value: 1e12, suffix: 'T' }
    ];

    for (let i = units.length - 1; i >= 0; i--) {
        if (number >= units[i].value) {
            const abbreviatedValue = (number / units[i].value).toFixed(1);
            return `${abbreviatedValue.endsWith('.0') ? Math.round(number / units[i].value) : abbreviatedValue}${units[i].suffix}`;
        }
    }

    return number.toString();
}