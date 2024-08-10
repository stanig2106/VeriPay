import Gun from "gun";
import 'gun/sea';

export const gunDB = Gun({
    peers: ['http://localhost:8765/gun'],
})

export function gunAuth(address: `0x${string}`, signature: string) {
    return new Promise((resolve, reject) => {
        gunDB.user().auth(address, signature, async (ack) => {
            if ('err' in ack) {
                if (ack.err.includes('Wrong user or password')) {
                    gunDB.user().create(address, signature, (createAck) => {
                        if ('err' in createAck)
                            reject(createAck.err);
                        else
                            gunDB.user().auth(address, signature, (authAck) => {
                                if ('err' in authAck)
                                    reject(authAck.err);
                                else
                                    resolve({ok: true});
                            });
                    });
                } else
                    reject(ack.err);
            } else
                resolve({ok: true});
        });
    });
}
