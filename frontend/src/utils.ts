export function arrayHasValue<T>(array: Array<T>, value: T): boolean {
    return array.filter((item) => item === value).length > 0;
}

export function orderByString(array: any[], property?: any) {
    array = array.sort((a, b) => {
        const nameA = property ? a[property].toUpperCase() : a; // ignore upper and lowercase
        const nameB = property ? b[property].toUpperCase() : b; // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });
}

export function orderByFloat(array: any[], property?: any) {
    array = array.sort((a, b) => {
        const nameA = property ? parseFloat(a[property]) : a; // ignore upper and lowercase
        const nameB = property ? parseFloat(b[property]) : b; // ignore upper and lowercase
        return nameA - nameB;
    });
}

export function orderByNumber(array: any[], property?: any) {
    array = array.sort((a, b) => {
        const nameA = property ? parseInt(a[property]) : a; // ignore upper and lowercase
        const nameB = property ? parseInt(b[property]) : b; // ignore upper and lowercase
        return nameA - nameB;
    });
}
