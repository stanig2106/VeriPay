import {defineStore} from "pinia";
import {onMounted, ref, watch} from "vue";
import {gunDB} from "@/plugins/gun";
import {useAccount} from "@wagmi/vue";

type Encrypted<T> = T;


export type User = {
    publicKey: string
    address: `0x${string}`
    username: string
    location: Encrypted<string>
}

export const useUserStore = defineStore("user", () => {
    const user = ref<User | null>(null);

    onMounted(() => {
        const {address} = useAccount()
        watch(address, async () => {
            if (!address.value) return
            gunDB.get('user').get(address.value)
                .on((data: User | null) => {
                    user.value = data
                })
        })
    })

    function saveUser(user: User) {
        gunDB.get('user').get(user.address).put(user)
    }

    return {
        user,
        saveUser
    }
})
