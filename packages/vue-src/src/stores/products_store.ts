import {defineStore} from "pinia";
import {computed, onMounted, ref} from "vue";
import {gunDB} from "@/plugins/gun";
import SEA from 'gun/sea';

export type Product = {
    id: string;
    name: string;
    price: number; // in ETH
    description: string;
    // image: string[];
    seller: `0x${string}`;
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
    });

    async function addProduct(product: Omit<Product, 'id'>): Promise<string> {
        console.log('Adding product', product);
        const user = gunDB.user();
        if (!user.is) {
            throw new Error("User is not authenticated");
        }

        const SEAPair = await SEA.pair();

        const productSignature = await SEA.sign(product, SEAPair);

        const certificate = await SEA.certify(
            user.is.pub,
            {'*': `products/${product.name}`},
            SEAPair,
            undefined, // No callback needed
            {expiry: Gun.state() + (1000 * 60 * 60 * 24)} // 24 hours
        );

        const productRef = gunDB
            .get('products').set({
                ...product,
                owner: user.is.pub,
                signature: productSignature,
                certificate: certificate // Store the certificate with the product
            });

        return new Promise((resolve, reject) => {
            productRef.once((node, id) => {
                if (node === null) reject();
                else resolve(id);
            });
        });
    }

    async function removeProduct(id: string) {
        // const user = gunDB.user();
        // if (!user.is) {
        //     throw new Error("User is not authenticated");
        // }

        // const product = products.value.find(p => p.id === id);
        // if (!product) {
        //     throw new Error("Product not found");
        // }
        // if (product.owner !== user.is.pub) {
        //     throw new Error("You are not the owner of this product");
        // }

        // Verify the certificate before deleting the product
        // const certificate = product.certificate;
        // const valid = await SEA.verify(certificate, user._.sea);
        //
        // if (!valid) {
        //     throw new Error("Invalid certificate, cannot delete product");
        // }

        gunDB.get('products').get(id).put(null);

        products.value = products.value.filter(product => product.id !== id);
    }

    return {
        products: computed(() => products.value),
        addProduct,
        removeProduct,
        getProduct: (id: string) => computed(() => products.value.find(p => p.id === id)),
    }
});
