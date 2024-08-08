<script lang="ts" setup>
import { fs } from "@/plugins/ipfs";

async function uploadImage() {
  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  const file = fileInput.files![0];

  if (!file) {
    alert('Please select a file to upload');
    return;
  }

  try {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target!.result as ArrayBuffer);
      const cid = await fs.addBytes(data);
      console.log('Image uploaded to IPFS with CID:', cid.toString());
      alert(`Image uploaded to IPFS. CID: ${cid.toString()}`);

      const url = `https://ipfs.io/ipfs/${cid.toString()}`;
      console.log('Access the image via:', url);
    };
    reader.readAsArrayBuffer(file);
  } catch (error) {
    console.error('Error uploading image:', error);
    alert('Error uploading image to IPFS');
  }
}
</script>

<template>
  <input type="file" id="fileInput" accept="image/*">
  <button @click="uploadImage()">Upload</button>
</template>
