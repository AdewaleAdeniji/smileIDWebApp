import config from "../config";
import server from "../server";

export const upload_smile_images = async (images: any[]) => {
  const response = await server.post(
    `${config.BACKEND_SERVICE_BASE_URL}/user/smileid/upload-smiles`,
    {
      images,
    }
  );

  return response.data;
};
export const upload_selfie = async (formData: any) => {
  const response = await server.post(
    `${config.BACKEND_SERVICE_BASE_URL}/user/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
