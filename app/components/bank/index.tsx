"use client";

import { Button, Menu, Modal } from "antd";
import { useState } from "react";
import Layout2 from "../layout";

const data =[
    {bank: 'BCA', no: "230934092309", image: "9-3293-923"},
    {bank: 'BNI', no: "230934092309", image: "9-3293-923"},
    {bank: 'Dana', no: "230934092309", image: "nebfjknvd"},
    {bank: 'Gopay', no: "230934092309", image: "rgvhjoweouh"},
]

export default function Bank() {
 
 const renderBank = () =>{
   const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


   return data.map((item) =>(
    <div className="pt-3 pb-1">
    <Button type="text" onClick={showModal} className="w-[350px] h-[50px] border-[#016255] flex justify-start items-center">
      {item.bank}
    </Button>
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div className="flex justify-center">
       {item.image}
      </div>
      <div>
       {item.bank}
       {item.no}
      </div>
    </Modal>
    </div>
   ))
 }

 return(
   <div>
   {renderBank()}
   </div>
 )
}