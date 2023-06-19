export function arrayHasValue<T>(array: Array<T>, value: T): boolean {
    return array.filter(item => item === value).length > 0;
}

export function orderByStringNested(array: any[], desc: boolean, properties: any[]) {
    console.log("orderByStringNested");
    array = array.sort((a, b) => {
        function getPropertyValue(obj: any, property: string) {
            if (!obj.hasOwnProperty(property)) throw new Error(`Property ${property} not found!`);

            return obj[property];
        }

        let left = desc ? a : a;
        let right = desc ? b : b;

        properties.map((property, index) => {
            const _obj = left;
            if (Array.isArray(_obj)) {
                orderByStringNested(_obj, property.desc, properties.splice(index + 1));
                left = _obj[0];
            } else {
                left = getPropertyValue(left, property.name);
            }
        });

        properties.map((property, index) => {
            const _obj = right;
            if (Array.isArray(_obj)) {
                orderByStringNested(_obj, property.desc, properties.splice(index + 1));
                right = _obj[0];
            } else {
                right = getPropertyValue(right, property.name);
            }
        });

        console.log(left, right);
        if (left < right) {
            return -1;
        }
        if (left > right) {
            return 1;
        }

        return 0;
    });
}

export function orderByString(array: any[], desc = false, property?: any) {
    array = array.sort((a, b) => {
        const nameA = property ? a[property].toUpperCase() : a; // ignore upper and lowercase
        const nameB = property ? b[property].toUpperCase() : b; // ignore upper and lowercase

        const left = desc ? nameB : nameA;
        const right = desc ? nameA : nameB;

        if (left < right) {
            return -1;
        }
        if (left > right) {
            return 1;
        }

        // names must be equal
        return 0;
    });
}

export function orderByFloat(array: any[], desc = false, property?: any) {
    array = array.sort((a, b) => {
        const nameA = property ? parseFloat(a[property]) : a; // ignore upper and lowercase
        const nameB = property ? parseFloat(b[property]) : b; // ignore upper and lowercase
        return desc ? nameB - nameA : nameA - nameB;
    });
}

export function orderByNumber(array: any[], desc = false, property?: any) {
    array = array.sort((a, b) => {
        const nameA = property ? parseInt(a[property]) : a; // ignore upper and lowercase
        const nameB = property ? parseInt(b[property]) : b; // ignore upper and lowercase
        return desc ? nameB - nameA : nameA - nameB;
    });
}

export function generateArray(quantity: number): Array<number> {
    return [...Array(quantity).keys()];
}
