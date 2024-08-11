# VeriPay

## A proof that the web can be decentralized!

VeriPay, a revolutionary platform that demonstrates the
power and potential of decentralized web applications. VeriPay is a
marketplace for buying and selling second-hand items, designed without
the need for a centralized backend or server, illustrating the
capabilities of modern decentralized technologies.

### Deploy VeriPay frontend

1. Clone the repository

```bash
git clone git@github.com:stanig2106/VeriPay.git
```

2. Install dependencies

```bash
yarn install
```

3. Run the development server

```bash
yarn start
```

4. Open the browser and navigate to `http://localhost:3000`

### Deploy Smart Contracts

1. Deploy

```bash
yarn deploy:op && yarn deploy:base
```

2. Addresses and abi of the frontend will be automatically updated

### Deploy on Vercel

1. Set the build command to `yarn build` and the output directory to `build`

### Note for deployment

You have to check Gun JS server url in `src/plugins/gun.ts`
