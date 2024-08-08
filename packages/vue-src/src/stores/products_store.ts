import {defineStore} from "pinia";
import {gunDB} from "@/plugins/gun";
import {computed, onMounted, ref} from "vue";

export type Product = {
    id: string;
    name: string;
    price: number; // in wei
    description: string;
    image: string[];
    seller: `0x${string}`;
    category: string;
}

export const useProductsStore = defineStore("products", () => {
    const products = ref([] as Product[]);

    onMounted(() => {
        gunDB.get('products').map().once((product: Omit<Product, 'id'> | null, id) => {
            if (product === null)
                return;
            products.value.push({
                ...product, id
            });
        });
    })

    async function addProduct(product: Omit<Product, 'id'>) {
        const productRef = gunDB.get('products').set(product);
        return new Promise((resolve, reject) => {
            productRef.once((node, id) => {
                if (node === null)
                    reject();
                else
                    resolve(id);
            });
        })
    }

    function removeProduct(id: string) {
        gunDB.get('products').get(id).put(null);
        products.value = products.value
            .filter(product => product.id !== id);
    }

    return {
        products: computed(() => products.value),
        addProduct,
        removeProduct,
    }
})
