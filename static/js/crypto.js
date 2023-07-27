// this code is taken from https://8gwifi.org/docs/window-crypto-rsaoaep.jsp and modified
// Generate RSA key pair
async function generateRSAKeyPair() {
    return window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: { name: "SHA-256" },
        },
        true,
        ["encrypt", "decrypt"]
    );
}

// Export the public key in JWK format
async function exportPublicKey(key) {
    const exportedKeyData = await window.crypto.subtle.exportKey("jwk", key);
    return JSON.stringify({
        kty: exportedKeyData.kty,
        e: exportedKeyData.e,
        n: exportedKeyData.n,
    });
}

// Encrypt the data with the public key using RSA-OAEP
async function encryptWithPublicKey(publicKey, data) {
    const encodedData = new TextEncoder().encode(data);
    const encryptedData = await window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP",
        },
        publicKey,
        encodedData
    );
    return bufferToBase64(encryptedData);
}

// Decrypt the data with the private key using RSA-OAEP
async function decryptWithPrivateKey(privateKey, encryptedData) {
    console.log('in crypto.js')
    console.log('in crypto.js', privateKey)
    console.log('in crypto.js', encryptedData)
    const encodedEncryptedData = base64ToBuffer(encryptedData);
    const decryptedData = await window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP",
        },
        privateKey,
        encodedEncryptedData
    );
   
    console.log( new TextDecoder().decode(decryptedData))
    return new TextDecoder().decode(decryptedData);
}

// Utility function to convert buffer to base64
function bufferToBase64(buffer) {
    const binary = String.fromCharCode.apply(null, new Uint8Array(buffer));
    return window.btoa(binary);
}

// Utility function to convert base64 to buffer
function base64ToBuffer(base64) {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}


// Event listener for the "Encrypt" button
async function encryptMessage(publicKeyData, message) {
    // const publicKeyData = JSON.parse(document.getElementById("receiver-public-key").value);
    // const message = document.getElementById("message").value;

    const publicKey = await window.crypto.subtle.importKey(
        "jwk",
        publicKeyData,
        {
            name: "RSA-OAEP",
            hash: { name: "SHA-256" },
        },
        true,
        ["encrypt"]
    );

    const encryptedMessage = await encryptWithPublicKey(publicKey, message);
    return encryptMessage
    // document.getElementById("encrypted-message").value = encryptedMessage;
}


// Event listener for the "Decrypt" button
async function decryptMessage(encryptedMessage) {
    try {
        const privateKeyData = localStorage.getItem("privateKey");
        const privateKey = await window.crypto.subtle.importKey(
            "jwk",
            JSON.parse(privateKeyData),
            {
                name: "RSA-OAEP",
                hash: { name: "SHA-256" },
            },
            true,
            ["decrypt"]
        );

        // const encryptedMessage = document.getElementById("encrypted-message").value;
        const decryptedMessage = await decryptWithPrivateKey(privateKey, encryptedMessage);
        return decryptedMessage
        // document.getElementById("decrypted-message").value = decryptedMessage;
    } catch (error) {
        console.error(error.message);

    }
}
