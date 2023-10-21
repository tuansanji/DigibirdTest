import axiosClient from "../axiosClient";

const addressApi = {
  // lấy tất cả danh sách địa chỉ. 10 địa chỉ đầu tiên
  getAllAddress() {
    const url = `/self/address?fields=id,xid,name,email,phone,address,shipping_address,city,state,country`;
    return axiosClient.get(url);
  },
  // lấy tất cả danh sách địa chỉ theo trang
  getAddressPagination(page) {
    const url = `/self/address?fields=id%2Cxid%2Cname%2Cemail%2Cphone%2Caddress%2Cshipping_address%2Ccity%2Cstate%2Ccountry&offset=${page}`;
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
