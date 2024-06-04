export const newE = document.createElement.bind(document)
export const newT = document.createTextNode.bind(document)

export function floatEq(a, b) {
    return (isNaN(a) || isNaN(b))
        ? (isNaN(a) && isNaN(b))
        : ((a === b) || Math.abs(a - b) < (((a > 1) || (b > 1)) ? (Math.max(a, b) * Number.EPSILON) : Number.EPSILON))
}

// deepEq only covers the JSON subset of the JS/TS type-scape
export function deepEq(val1, val2) {
    if ((val1 === val2) || ((val1 === null) && (val2 === (void 0))) || ((val1 === (void 0)) && (val2 === null)))
        return true

    if (((typeof val1) !== (typeof val2)) || (val1['catch'] && val1['finally'] && val1['then'] && val2['catch'] && val2['finally'] && val2['then']))
        return false

    if (((typeof val1) === 'number') && ((typeof val2) === 'number'))
        return floatEq(val1, val2)

    if (((typeof val1) === 'object') && ((typeof val2) === 'object')) {
        const is_arr_1 = Array.isArray(val1), is_arr_2 = Array.isArray(val2)
        const is_arr = (is_arr_1 && is_arr_2)

        if ((is_arr_1 != is_arr_2) || (is_arr && val1.length != val2.length))
            return false

        // 2 non-array objects
        if (!is_arr) {
            let len1 = 0, len2 = 0
            for (const _ in val2)
                len2++
            for (const k in val1)
                if (((++len1) > len2) || !deepEq(val1[k], val2[k]))
                    return false
            if (len1 !== len2)
                return false
            return true
        }

        // 2 arrays
        for (let i = 0; i < val1.length; i++)
            if (!deepEq(val1[i], val2[i]))
                return false

        return true
    }

    return false
}

export class ZuiElement extends HTMLElement {
    #subs = new Map()

    zuiSub(name, fn) {
        let arr = this.#subs.get(name)
        if (!arr)
            arr = [fn]
        else
            arr.push(fn)
        this.#subs.set(name, arr)
    }

    zuiOnPropChanged(name) {
        for (const fn of ((this.#subs.get(name)) ?? []))
            fn()
    }
}
