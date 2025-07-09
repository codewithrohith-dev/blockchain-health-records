import axios from "axios";

const PINATA_API_KEY = "c4e3b05e723713098dec";
const PINATA_SECRET_API_KEY = "5c7b018be0b902b9826447cba73acbe1f1f994690a17b480f070b2cb469ee96b";
const PINATA_ENDPOINT = "https://api.pinata.cloud/pinning/pinFileToIPFS";

export const uploadToPinata = async (file) => {
    try {
        // 🔹 Ensure file is provided
        if (!file) throw new Error("❌ No file provided for upload.");

        // 🔹 Ensure file is an instance of File or Blob
        if (!(file instanceof File || file instanceof Blob)) {
            throw new Error("❌ Invalid file: Ensure you are passing a File or Blob object.");
        }

        // 🔹 Log File Details
        console.log("📂 Preparing File for Upload:", {
            name: file.name || "Unnamed file",
            type: file.type,
            size: file.size + " bytes",
        });

        // 🔹 Create FormData
        const formData = new FormData();
        formData.append("file", file);

        // 🔹 Send request to Pinata
        const response = await axios.post(PINATA_ENDPOINT, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                pinata_api_key: PINATA_API_KEY,
                pinata_secret_api_key: PINATA_SECRET_API_KEY,
            },
        });

        console.log("✅ File uploaded to Pinata IPFS:", response.data);
        return response.data.IpfsHash;
    } catch (error) {
        console.error("❌ Error uploading file to Pinata:", error.response?.data || error.message);
        return null;
    }
};
