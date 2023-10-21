import React, { useEffect, useState } from "react";
import FormAddress from "../components/FormAddress";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function EditAddress() {
  const addressList = useSelector((state) => state?.address?.addressList);

  const [addressCurrent, setAddressCurrent] = useState(null);
  const params = useParams();

  // lọc để lấy ra địa chỉ hiện tại dựa theo param trên url
  useEffect(() => {
    const address =
      addressList &&
      addressList.filter((address) => address.xid === params.addressId);
    setAddressCurrent(address);
  }, [addressList]);

  return (
    <div className="w-full ">
      <div className="relative mt-6 mx-auto w-full max-w-[28rem] p-3 bg-white rounded-lg ">
        {addressCurrent && addressCurrent?.length > 0 ? (
          <FormAddress addressCurrent={addressCurrent[0]} />
        ) : (
          <p>không tìm thấy địa chỉ</p>
        )}
      </div>
    </div>
  );
}

export default EditAddress;
