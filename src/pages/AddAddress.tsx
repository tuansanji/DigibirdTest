import React from "react";
import FormAddress from "../components/FormAddress";

function AddAddress() {
  return (
    <div className="relative mt-6 mx-auto w-full max-w-[28rem] p-3 bg-white rounded-lg ">
      <FormAddress register={true} />
    </div>
  );
}

export default AddAddress;
