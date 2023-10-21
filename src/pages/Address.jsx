import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { Link } from "react-router-dom";

import AddressItem from "../components/AddressItem";
import userApi from "../services/api/userApi";
import { loginUser } from "../redux/slice/userSlice";
import addressApi from "../services/api/addressApi";
import { getAllAddress } from "../redux/slice/addressSlice";

function Address() {
  const dispatch = useDispatch();
  const addressList = useSelector((state) => state?.address?.addressList);
  const user = useSelector((state) => state?.auth?.userInfo);

  const [showButton, setShowButton] = useState(false);

  // Phần xử lí hiện thị và action của nút back to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // scroll 400px
  const handleScroll = () => {
    if (window.scrollY > 400) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

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
      <button
        className={`fixed bottom-[3rem] right-10 sm:bottom-8 sm:right-6 rounded-[50%] z-[7777] ${
          showButton ? "block" : "hidden"
        }`}
        id="btn_BackToTop"
        onClick={scrollToTop}
      >
        <IoIosArrowDropupCircle
          style={{ fontSize: "40px", color: "#f1b009" }}
        />
      </button>
    </div>
  );
}

export default Address;
