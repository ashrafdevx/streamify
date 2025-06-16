import { InstanceAxios } from "./axios";

export const register = async (registerUser) => {
  const res = await InstanceAxios.post("/auth/register", registerUser);
  return res.data;
};

export const login = async (loginUser) => {
  const response = await InstanceAxios.post("/auth/login", loginUser);
  return response.data;
};

// AuthCheck Function
export const authCheck = async () => {
  const res = await InstanceAxios.get("/auth/me");
  return res.data;
};

// Onboard User
export const completeOnboarding = async (formState) => {
  const respnse = await InstanceAxios.put("/auth/onboarding", formState);
  return respnse.data;
};
