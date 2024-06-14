import config from "../config";
import server from "../server";


export const login_with_password = async (email: string, password: string) => {
  const response = await server.post(
    `${config.BACKEND_SERVICE_BASE_URL}/user/login`,
    {
      email,
      password,
    }
  );

  return response.data;
};
export const register_with_email = async (email: string, password: string) => {
  const response = await server.post(
    `${config.BACKEND_SERVICE_BASE_URL}/user/signup`,
    {
      email,
      password
    }
  );

  return response.data;
};
export const upload_image = async (email: string, password: string) => {
  const response = await server.post(
    `${config.BACKEND_SERVICE_BASE_URL}/user/signup`,
    {
      email,
      password
    }
  );

  return response.data;
};

