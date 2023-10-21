import axiosClient from "../axiosClient";

const addressApi = {
  // lấy tất cả danh sách địa chỉ
  getAllAddress() {
    const url = `/self/address?fields=id,xid,name,email,phone,address,shipping_address,city,state,country`;
    return axiosClient.get(url);
  },
  // thêm địa chỉ mới
  addAddress(address) {
    const url = `/self/address`;
    return axiosClient.post(url, address);
  },
  // chỉnh sửa địa chỉ
  editAddress(id, address) {
    const url = `/self/address/${id}`;
    return axiosClient.put(url, address);
  },
};
export default addressApi;
