import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { Link, useSearchParams } from "react-router-dom";

import AddressItem from "../components/AddressItem";
import userApi from "../services/api/userApi";
import { loginUser } from "../redux/slice/userSlice";
import addressApi from "../services/api/addressApi";
import { getAllAddress } from "../redux/slice/addressSlice";
import Loader from "../components/Loader";
import { Pagination } from "antd";

function Address() {
  const addressList = useSelector((state) => state?.address?.addressList);
  const user = useSelector((state) => state?.auth?.userInfo);

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPagination, setCurrentPagination] = useState({
    page: Number(searchParams.get("offset")) || 1,
    total: 1,
  });

  // gọi api khi thay đổi Pagination
  const onChangePagination = (page) => {
    setLoading(true);
    setCurrentPagination({
      ...currentPagination,
      page: page,
    });
    setSearchParams({ ...searchParams, offset: page });
    user &&
      addressApi.getAddressPagination(page * 10 - 10).then((res) => {
        dispatch(getAllAddress(res.data));
        setCurrentPagination({
          ...currentPagination,
          page: page,
        });
        setLoading(false);
      });
  };

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
    // vì lấy user set default nên dẫn đến lỗi rerender thêm
    setLoading(true);

    if (user && currentPagination?.page) {
      addressApi
        .getAddressPagination(currentPagination.page * 10 - 10)
        .then((res) => {
          dispatch(getAllAddress(res.data));
          setCurrentPagination(res.meta.paging);
          setLoading(false);
        });
    } else if (user && !currentPagination?.page) {
      addressApi.getAllAddress().then((res) => {
        dispatch(getAllAddress(res.data));
        setCurrentPagination(res.meta.paging);
        setLoading(false);
      });
    }
  }, [user]);

  return (
    <div className="cards max-w-[600px] mx-auto my-6 flex flex-col gap-7">
      {loading && <Loader />}
      <div className=" mx-auto card w-full sm:w-80 h-60 bg-base-100  shadow-xl transition duration-500 cursor-pointer">
        <Link
          to="/add-address"
          className="card-body p-0 border-4 border-dotted border-gray-300 flex items-center justify-center"
        >
          <div className="w-16 h-16 relative mb-1">
            <div className="h-full w-full rounded-full border-4 border-dotted border-gray-500 relative">
              <div className="absolute w-full h-full flex items-center justify-center">
                <div className="text-gray-500 text-[3rem] flex items-center justify-center ">
                  <BiPlus />
                </div>
              </div>
            </div>
          </div>
          <button className="btn  sm:w-[50%] sm:!h-[2.3rem] !min-h-[2rem] w-[60%] md:btn-md ">
            Thêm mới
          </button>
        </Link>
      </div>
      {addressList &&
        addressList.map((address) => (
          <AddressItem key={address.xid} address={address} />
        ))}
      {addressList && (
        <Pagination
          current={Number(searchParams.get("offset")) || 1}
          onChange={onChangePagination}
          total={currentPagination.total}
          showSizeChanger={false}
          pageSizeOptions={["10"]}
        />
      )}
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
