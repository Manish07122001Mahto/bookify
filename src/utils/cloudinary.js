import axios from "axios";

export const uploadToCloudinary = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("folder", "my_uploaded_books");
  formData.append("upload_preset", "bookify");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dp6zx3smu/image/upload`,
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};
