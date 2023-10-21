import axiosClient from "../axiosClient";

const addressApi = {
  getAllAddress() {
    const url = `/self/address?fields=id,xid,name,email,phone,address,shipping_address,city,state,country`;
    return axiosClient.get(url);
  },
  addAddress(address) {
    const url = `/self/address`;
    return axiosClient.post(url, address);
  },
  editAddress(id, address) {
    const url = `/self/address/${id}`;
    return axiosClient.put(url, address);
  },
};
export default addressApi;
