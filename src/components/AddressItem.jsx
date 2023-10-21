import { CiLocationOn } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AddressItem = ({ address }) => {
  return (
    <div className=" mx-auto card w-full sm:w-80 bg-base-100 shadow-xl transition duration-500 cursor-pointer">
      <div className="card-body p-0">
        <h3 className="card-title pb-2 font-semibold">
          Họ và tên: {address?.name}
        </h3>
        <div className="flex flex-col gap-1">
          <div className="text-gray-400 text-xl  flex items-center">
            <CiLocationOn fontWeight={600} />
            <span className="text-xs font-normal ml-1">Địa chỉ</span>
          </div>
          <p className=" font-normal text-[14px]  ">
            {address?.address}, {address?.state}, {address?.city}, ,{" "}
            {address?.country}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-gray-400 text-xl  flex items-center">
            <FiPhone fontWeight={600} />
            <span className="text-xs font-normal ml-1">Số điện thoại</span>
          </div>
          <p className=" font-normal text-[14px]  ">{address?.phone}</p>
        </div>{" "}
        <div className="flex flex-col gap-1">
          <div className="text-gray-400 text-xl  flex items-center">
            <AiOutlineMail fontWeight={600} />
            <span className="text-xs font-normal ml-1">Địa chỉ email</span>
          </div>
          <p className=" font-normal text-[14px]  ">{address?.email}</p>
        </div>
        <Link
          to={`/address/${address?.xid}`}
          className="pt-2 text-blue-500 font-medium text-[14px] hover:underline "
        >
          Chỉnh sửa
        </Link>
      </div>
    </div>
  );
};
AddressItem.propTypes = {
  address: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    xid: PropTypes.string,
  }).isRequired,
};

export default AddressItem;
