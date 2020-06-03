export const reallyEmpty = (value: any): boolean => {
    if (!value && [false, 0].indexOf(value) < 0) {
        return true
    }

    return !value.toString().trim();
}