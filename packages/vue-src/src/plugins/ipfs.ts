import {createHelia} from 'helia';
import {unixfs} from '@helia/unixfs';

export async function createHeliaNode() {
    const helia = await createHelia();
    return unixfs(helia);
}

export const fs = createHeliaNode();

