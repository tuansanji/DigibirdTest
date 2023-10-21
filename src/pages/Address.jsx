import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BiPlus } from "react-icons/bi";

import AddressItem from "../components/AddressItem";
import userApi from "../services/api/userApi";
import { loginUser } from "../redux/slice/userSlice";
import addressApi from "../services/api/addressApi";
import { getAllAddress } from "../redux/slice/addressSlice";
import { Link } from "react-router-dom";

function Address() {
  const dispatch = useDispatch();
  const addressList = useSelector((state) => state?.address?.addressList);
  const user = useSelector((state) => state?.auth?.userInfo);

  // tự động đăng nhập với thông tin người dùng cho trước
  useEffect(() => {
    userApi.loginUser().then((res) => {
      dispatch(loginUser(res.data));
    });
  }, []);

  // lấy danh sách địa chỉ
  useEffect(() => {
    user &&
      addressApi.getAllAddress().then((res) => {
        dispatch(getAllAddress(res.data));
      });
  }, [user]);

  return (
    <div className="cards max-w-[600px] mx-auto my-6 flex flex-col gap-5">
      <div className=" mx-auto card w-full sm:w-80 h-60 bg-base-100  shadow-xl transition duration-500 cursor-pointer">
        <Link
          to="/add-address"
          className="card-body p-0 border-4 border-dotted border-gray-300 flex items-center justify-center"
        >
          <div className="w-16 h-16 relative">
            <div className="h-full w-full rounded-full border-4 border-dotted border-gray-500 relative">
              <div className="absolute w-full h-full flex items-center justify-center">
                <div className="text-gray-500 text-[3rem] flex items-center justify-center ">
                  <BiPlus />
                </div>
              </div>
            </div>
          </div>

          <button className="btn  sm:w-[50%] w-[60%] md:btn-md ">
            Thêm mới
          </button>
        </Link>
      </div>
      {addressList &&
        addressList.map((address) => (
          <AddressItem key={address.xid} address={address} />
        ))}
    </div>
  );
}

export default Address;
