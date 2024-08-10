import {defineStore} from "pinia";
import {MaybeRefOrGetter, reactive, ref, toRef, toValue} from "vue";
import {signMessage} from '@wagmi/core'
import {config} from "@/plugins/wagmi";
import {verifyMessage} from 'ethers';
import {ec as EC} from 'elliptic';


const asked = ref(false)
export const useSignatureStore = defineStore("signature", () => {
    const message = "Please sign this message to prove your identity."
    const signatures = reactive({} as Record<string, string>)

    async function updateSignature(address: MaybeRefOrGetter) {
        if (!toValue(address)) return false
        const sign = await (async () => {
            await new Promise(resolve => setTimeout(resolve, 1000))
            let s = signatures[toValue(address)]
            if (!s) {
                try {
                    if (asked.value) return
                    asked.value = true
                    s = await signMessage(config, {
                        message,
                        account: toValue(address),
                    })
                } catch (e) {
                    return
                } finally {
                    asked.value = false
                }
            }
            return s
        })()

        if (!sign) return false

        const result = verifyMessage(message, sign) === toValue(address);

        if (result) {
            signatures[toValue(address)] = sign
            return true
        } else {
            delete signatures[toValue(address)]
            return await updateSignature(address)
        }
    }

    function getSignature(address: MaybeRefOrGetter) {
        return toRef(() => signatures[toValue(address)] as string | null)
    }

    function getKeys(signature: MaybeRefOrGetter) {
        return toRef(() => {
            if (!toValue(signature)) return null
            const ec = new EC('secp256k1');

            const hash = ec.hash().update(toValue(signature)).digest();

            const keyPair = ec.genKeyPair({entropy: hash});

            const publicKey = keyPair.getPublic('hex');
            const privateKey = keyPair.getPrivate('hex');

            return {publicKey, privateKey};
        })
    }

    return {
        getSignature,
        getKeys,
        signatures,
        updateSignature,
    }
})
