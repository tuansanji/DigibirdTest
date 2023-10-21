import axiosClient from "../axiosClient";

// Em thử đăng nhập bằng sdt zalo mình nhưng không được
const demoUser = {
  id: "0869017747",
  name: "Phát",
  company_id: "9",
};

const userApi = {
  loginUser() {
    const url = `/sign-up-zalo`;
    return axiosClient.post(url, demoUser);
  },
};
export default userApi;
