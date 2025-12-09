import axiosInstance from "./axiosInstance";

export async function loginApi({ username, password }) {
  const body = new URLSearchParams();
  body.append("grant_type", "password");
  body.append("username", username);
  body.append("password", password);
  body.append("scope", "");
  body.append("client_id", "string");
  body.append("client_secret", "string");

  const response = await axiosInstance.post(
    "/auth/login",
    body.toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
}
