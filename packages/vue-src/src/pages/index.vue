<script lang="ts" setup>
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 mt-4">
    <h1 class="text-3xl font-bold text-center text-blue-600 mb-8">
      VeriPay, a proof that the web can be decentralized!
    </h1>
    <div class="space-y-6">
      <p class="text-lg text-gray-700">
        Welcome to VeriPay, a revolutionary platform that demonstrates the
        power and potential of decentralized web applications. VeriPay is a
        marketplace for buying and selling second-hand items, designed without
        the need for a centralized backend or server, illustrating the
        capabilities of modern decentralized technologies.
      </p>
      <p class="text-lg text-gray-700">
        <strong class="text-blue-600">Frontend:</strong> Our user interface is
        built with Vue.js, a versatile JavaScript framework that allows us to
        create dynamic and responsive user experiences. While the frontend is
        currently hosted on a centralized server, we are exploring
        peer-to-peer solutions to eliminate even this last trace of
        centralization.
      </p>
      <p class="text-lg text-gray-700">
        <strong class="text-blue-600">Data Management:</strong> We use Gun JS,
        a decentralized database system that functions without the need for a
        traditional PostgreSQL database. Gun JS allows our data to be
        distributed across multiple nodes, ensuring data resilience and
        security through its built-in SEA (Security, Encryption, and
        Authorization) capabilities.
      </p>
      <p class="text-lg text-gray-700">
        <strong class="text-blue-600">Image Storage:</strong> Instead of
        relying on traditional cloud services like Amazon S3 for storing
        images, VeriPay utilizes IPFS (InterPlanetary File System). IPFS is a
        peer-to-peer hypermedia protocol designed to make the web faster,
        safer, and more open. By storing images on IPFS, we ensure that all
        files are distributed across a network, reducing dependency on a
        single server and improving data availability.
      </p>
      <p class="text-lg text-gray-700">
        <strong class="text-blue-600">Payments:</strong> Transactions on
        VeriPay are handled through blockchain technology and smart contracts.
        This approach replaces traditional payment gateways like Stripe,
        ensuring secure, transparent, and decentralized financial transactions
        without the need for intermediaries.
      </p>
      <p class="text-lg text-gray-700">
        <strong class="text-blue-600">Moderation:</strong> We've implemented a
        robust system using World ID to verify user identities and ensure
        accountability. If a transaction goes awry, the situation is judged by
        a smart contract engaging anonymous oracles as moderators. These
        oracles are compensated through the smart contract, maintaining a fair
        and unbiased moderation system.
      </p>
      <h2 class="text-2xl font-semibold text-blue-600 mt-8">Example Use Case</h2>
      <p class="text-lg text-gray-700">
        Paul wants to sell a phone. He logs into VeriPay with his MetaMask
        wallet, verifies his identity with World ID, and creates a post with
        a description and photos of the product. To post, he deposits $15,
        which he can recover if he deletes the post or the product is sold
        correctly.
      </p>
      <p class="text-lg text-gray-700">
        Alice, who also has a verified account, sees Paul's post. She uses
        the integrated E2E encrypted messaging to get more information about
        the product and purchases it by making a transaction to the smart
        contract, also depositing $15. She provides Paul with the shipping
        details.
      </p>
      <p class="text-lg text-gray-700">
        Paul ships the package, and Alice receives it. Satisfied with the
        product, she confirms the transaction on the smart contract, and the
        amount plus the $15 deposit is transferred to Paul's wallet. Alice also
        recovers her $15.
      </p>
      <p class="text-lg text-gray-700">
        In another scenario, Paul sends the phone, but the camera doesn't work.
        Alice notices this and attempts to negotiate, but they can't reach an
        agreement. She opens a dispute, and five random individuals are chosen
        to judge the situation. They can communicate with both Alice and Paul
        to determine who is right. In this case, the judges agree with Alice,
        and they instruct that the phone be returned to Paul (at his expense)
        for a refund. Once Paul receives the phone, the judges cancel the smart
        contract transaction, and Alice recovers her money and her $15
        deposit. Paul's $15 deposit is distributed among the five judges.
      </p>
      <p class="text-lg text-gray-700">
        In the final possible scenario, Paul had accurately noted the camera
        as broken in the post, but Alice missed this detail. The judges declare
        Alice responsible; she agrees to keep the phone despite this. The money
        and deposit are transferred to Paul, but Alice does not recover her
        $15, which is distributed among the judges.
      </p>
      <p class="text-lg text-gray-700">
        Judges can also decide to ban a user if they determine the behavior of
        one party severely violates the site's code of conduct.
      </p>
      <p class="text-lg text-gray-700">
        VeriPay showcases how traditional web applications can be reimagined
        with decentralization at their core. By integrating cutting-edge
        technologies, we provide a glimpse into a future where web
        applications are more resilient, secure, and user-centric. Join us in
        this journey towards a truly decentralized web!
      </p>
      <h2 class="text-2xl font-semibold text-blue-600 mt-8">To-Do List</h2>
      <ul class="list-disc list-inside text-lg text-gray-700">
        <li>✅ Create the frontend</li>
        <li>✅ Connect with MetaMask</li>
        <li>✅ Generate a public/private key pair from a wallet signature for E2E encryption and private data encryption</li>
        <li>✅ Implement GUN JS to share post information and keys</li>
        <li>✅ E2E encrypted chat</li>
        <li>✅ Verification with World ID</li>
        <li>🕒 File and photo sharing in posts with IPFS</li>
        <li>🕒 Create the smart contract (transaction and World ID check)</li>
        <li>🕒 Manage disputes and deposits with the smart contract</li>
        <li>🕒 User banning</li>
        <li>🕒 Decentralized frontend</li>
      </ul>
    </div>
  </div>
</template>
