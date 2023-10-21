import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import axios from "axios";
import PropTypes from "prop-types";
import { BiUser } from "react-icons/bi";
import { FiPhone } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

import addressApi from "../services/api/addressApi";
import Loader from "./Loader";
import useMessageApi from "./Message";

const FormAddress = ({ addressCurrent, register }) => {
  const [provinceAPI, setProvinceAPI] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showMessage, contextHolder } = useMessageApi();

  const navigate = useNavigate();

  // validation các field với YUP
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(6, "Quá ngắn!")
      .max(50, "Quá dài!")
      .required("Vui lòng nhập"),
    phone: yup
      .string()
      .required("Số điện thoại là bắt buộc")
      .test(
        "is-valid-phone",
        "Số điện thoại không hợp lệ. Hãy nhập đúng 10 số và bắt đầu bằng số 0.",
        (value) => {
          if (!value) return false; // Kiểm tra nếu giá trị là null hoặc undefined.
          const stringValue = value.toLocaleString("en-US", {
            useGrouping: false, // Tắt sử dụng dấu phân cách hàng nghìn
          });
          return !value.startsWith("0")
            ? stringValue.length === 9
            : stringValue.length === 10;
        }
      ),
    email: yup.string().email("Vui lòng nhập đúng định dạng email"),
    city: yup.string().required("Vui lòng chọn"),
    district: yup.string().required("Vui lòng chọn"),
    detailAddress: yup.string().max(100, "Quá dài!").required("Vui lòng nhập"),
  });

  // phần quản lì FORM
  const formik = useFormik({
    initialValues: addressCurrent
      ? {
          username: addressCurrent.name,
          phone: addressCurrent.phone,
          email: addressCurrent.email,
          city: addressCurrent.city,
          district: addressCurrent.state,
          detailAddress: addressCurrent.address,
          xid: addressCurrent.xid,
        }
      : {
          username: "",
          phone: "",
          email: "",
          city: "",
          district: "",
          detailAddress: "",
        },
    onSubmit: (data) => {
      showMessage("loading", "Loading", 2);
      // Dựa theo trang thái của form để xác định đang đăng kí hay là chỉnh sửa
      register
        ? addressApi
            .addAddress({
              name: data.username,
              phone: data.phone.toString().startsWith("0")
                ? data.phone
                : `0${data.phone}`,
              email: data.email,
              city: data.city,
              state: data.district,
              shipping_address: "set default",
              address: data.detailAddress,
              country: "VN",
              zipcode: "1",
            })
            .then((res) => {
              showMessage("success", res?.message || "Thành công", 2);
              setTimeout(() => {
                navigate("/address");
              }, 1500);
            })
            .catch((err) => {
              showMessage(
                "error",
                err.response.data?.error?.message || "Thất bại",
                2
              );
            })
        : addressApi
            .editAddress(data.xid, {
              name: data.username,
              phone: data.phone.toString().startsWith("0")
                ? data.phone
                : `0${data.phone}`,
              email: data.email,
              city: data.city,
              state: data.district,
              shipping_address: "set default",
              address: data.detailAddress,
              country: "VN",
              zipcode: "1",
            })
            .then((res) => {
              showMessage("success", res?.message || "Thành công", 2);
            })
            .catch((err) => {
              showMessage(
                "error",
                err.response.data?.error?.message || "Thất bại",
                2
              );
            });
    },
    validationSchema: validationSchema,
  });

  //lấy danh sách tỉnh thành
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://provinces.open-api.vn/api/?depth=2")
      .then((res) => {
        setProvinceAPI(res?.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-col justify-center ">
      {loading && <Loader />}
      {contextHolder}
      <div className=" sm:mx-auto sm:w-full">
        <div className="bg-white py-3 px-4 shadow  sm:px-10">
          <h3 className=" font-bold">
            {register ? "Thêm mới địa chị" : "Chỉnh sửa thông tin"}
          </h3>
        </div>
        <div className="bg-white py-8 px-4 shadow  sm:px-10">
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            {/* USERNAME */}
            <div>
              <label
                className=" text-sm font-medium text-gray-700 flex gap-2 items-center"
                htmlFor="username"
              >
                <BiUser /> Họ Và tên
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => {
                    const value = e.target.value;
                    if (
                      !value.startsWith(" ") &&
                      !value.endsWith("  ") &&
                      /^.{0,50}$/.test(value)
                    ) {
                      formik.handleChange(e);
                    }
                  }}
                  value={formik.values.username}
                  id="username"
                  type="text"
                  placeholder="Hoàng Minh Tuấn"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
                {formik.errors.username && formik.touched.username && (
                  <p className="error text-[red]">{formik.errors.username}</p>
                )}
              </div>
            </div>
            {/* PHONE NUMBER */}
            <div className="mt-1">
              <label
                className=" text-sm font-medium text-gray-700 flex items-center gap-2"
                htmlFor="phone"
              >
                <FiPhone /> Số điện thoại
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => {
                    const value = e.target.value;

                    if (!value.startsWith(" ")) {
                      formik.handleChange(e);
                    }
                  }}
                  value={formik.values.phone}
                  id="phone"
                  type="number"
                  placeholder="0 xxx xxx xxx"
                  inputMode="none"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
                {formik.errors.phone && formik.touched.phone && (
                  <p className="error text-[red]">{formik.errors.phone}</p>
                )}
              </div>
            </div>
            {/*EMAIL  */}
            <div className="mt-1">
              <label
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                <AiOutlineMail /> Địa chỉ email
              </label>
              <div className="mt-1">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  id="email"
                  type="text"
                  placeholder="example@gmail.com"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="error text-[red]">{formik.errors.email}</p>
                )}
              </div>
            </div>
            {/* CITY */}
            <div className="mt-1">
              <label
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
                htmlFor="city"
              >
                <CiLocationOn /> Tỉnh, thành phố
              </label>
              <div className="mt-1">
                <select
                  value={formik.values.city}
                  onChange={(e) => {
                    formik.handleChange(e); // Xử lý sự kiện onChange của trường city
                    formik.setFieldValue("district", ""); // Đặt giá trị rỗng cho trường district
                  }}
                  name="city"
                  className="select !h-[2.5rem] min-h-[2rem] appearance-none block w-full pt-[0.3rem] pb-3  py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                >
                  <option value="" disabled>
                    Chọn tỉnh/ thành phố
                  </option>
                  {provinceAPI &&
                    provinceAPI.map((province) => (
                      <option value={province.name} key={province.codename}>
                        {province.name}
                      </option>
                    ))}
                </select>
                {formik.errors.city && formik.touched.city && (
                  <p className="error text-[red]">{formik.errors.city}</p>
                )}
              </div>
            </div>

            {/* DISTRICT */}
            <div className="mt-1">
              <label
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
                htmlFor="district"
              >
                <CiLocationOn /> Quận, huyện
              </label>
              <div className="mt-1">
                <select
                  value={formik.values.district}
                  disabled={!formik.values.city}
                  onChange={formik.handleChange}
                  name="district"
                  className="select !h-[2.5rem] min-h-[2rem] appearance-none block w-full pt-[0.3rem] pb-3  py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                >
                  <option value="" disabled>
                    Chọn quận/ huyện
                  </option>
                  {provinceAPI &&
                    provinceAPI
                      .filter((city) => city.name === formik.values.city)[0]
                      ?.districts?.map((province) => (
                        <option value={province.name} key={province.codename}>
                          {province.name}
                        </option>
                      ))}
                </select>
                {formik.errors.district && formik.touched.district && (
                  <p className="error text-[red]">{formik.errors.district}</p>
                )}
              </div>
            </div>
            {/* DETAIL ADDRESS */}
            <div className="mt-1">
              <label
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
                htmlFor="detailAddress"
              >
                <CiLocationOn /> Địa chỉ cụ thể
              </label>
              <div className="mt-2">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.detailAddress}
                  name="detailAddress"
                  type="text"
                  placeholder="337 Nguyễn Duy Trinh,..."
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
                {formik.errors.detailAddress &&
                  formik.touched.detailAddress && (
                    <p className="error text-[red]">
                      {formik.errors.detailAddress}
                    </p>
                  )}
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                type="submit"
                className="btn  btn-warning  min-h-[2.5rem] h-[2rem] outline-none"
              >
                Lưu thông tin
              </button>
              <Link to="/address">
                <button className="btn btn-info min-h-[2.5rem] h-[2rem] outline-none">
                  Quay lại
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
FormAddress.propTypes = {
  addressCurrent: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string || PropTypes.number,
    email: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    xid: PropTypes.string,
  }),
  register: PropTypes.bool,
};

export default FormAddress;
