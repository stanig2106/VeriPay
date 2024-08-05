import {Ref, watch} from "vue";

type seconds = number | "infinite"

// wait a ref to be not null
// if it is already not null, return it
export async function waitRef<T, U extends boolean = boolean>(
    ref: Ref<T | null>,
    timeout: seconds = "infinite",
    allowUndefined: U = true as U
): Promise<U extends false ? NonNullable<T> : T> {
    if (ref.value !== null && (allowUndefined || ref.value !== undefined)) return ref.value as any
    return new Promise((resolve, reject) => {
        let timeoutId: NodeJS.Timeout | undefined
        if (timeout !== "infinite")
            timeoutId = setTimeout(() => {
                unwatch()
                reject("timeout")
            }, timeout * 1000)

        const unwatch = watch(ref, (newVal) => {
            if (newVal !== null && (allowUndefined || newVal !== undefined)) {
                unwatch()
                if (timeoutId !== undefined) clearTimeout(timeoutId)
                resolve(newVal as any)
            }
        }, {immediate: true})
    })
}
