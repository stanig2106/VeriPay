import {defineStore} from "pinia";
import {onMounted, ref, watch} from "vue";
import {useAccount, useReadContract} from "@wagmi/vue";
import BaseVeriPayContractAbi
    from "@/contracts/baseSepolia/VeriPayContract.abi";
import BaseVeriPayContractAddress
    from "@/contracts/baseSepolia/VeriPayContract.address";
import OpVeriPayContractAbi
    from "@/contracts/optimismSepolia/VeriPayContract.abi";
import OpVeriPayContractAddress
    from "@/contracts/optimismSepolia/VeriPayContract.address";
import {baseSepolia, optimismSepolia} from "@wagmi/vue/chains";

export const useIdentityStore = defineStore("identity", () => {

    const isVerified = ref(false)
    const fetching = ref(false)

    const refetchFunction = ref<() => Promise<any>>(async () => {
    })
    const refetch = async () => {
        await refetchFunction.value()
    }

    onMounted(() => {
        const {address} = useAccount()
        watch(address, async () => {
            if (!address.value) return
            const readBase =
                useReadContract({
                    abi: BaseVeriPayContractAbi,
                    address: BaseVeriPayContractAddress,
                    chainId: baseSepolia.id,
                    functionName: 'isUserVerified',
                    args: [address.value]
                })
            const readOp =
                useReadContract({
                    abi: OpVeriPayContractAbi,
                    address: OpVeriPayContractAddress,
                    chainId: optimismSepolia.id,
                    functionName: 'isUserVerified',
                    args: [address.value]
                })

            watch([readBase.data, readOp.data], () => {
                console.log(readBase.data.value, readOp.data.value)
                isVerified.value = readBase.data.value as boolean || readOp.data.value as boolean || false
            })

            watch([readBase.isFetching, readOp.isFetching], () => {
                fetching.value = readBase.isFetching.value && readOp.isFetching.value
            })
            refetchFunction.value = async () => {
                await readBase.refetch()
                await readOp.refetch()
            }
        }, {immediate: true})
    })


    return {
        isVerified,
        fetching,
        refetch
    }
})
