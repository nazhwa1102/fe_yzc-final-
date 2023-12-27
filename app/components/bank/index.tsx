"use client";

import { Button, Menu, Modal, QRCode, Radio } from "antd";
import { useState } from "react";
import Layout2 from "../layout";
import { CreateTransaksi } from "#/app/type/typeCreateTransaksi";

interface DummyDataItem {
  id: string;
  bank: string;
  number: string;
  image: string; // Assuming image is a string here, update accordingly
}
type Props ={
  setData: any,
  dataInput: CreateTransaksi,
}
const Bank = ({setData, dataInput}: Props) => {
  const data: DummyDataItem[] = [
    {
      id: "9ca3de37-9fb9-47d6-8d52-61f2a4601926",
      bank: "BCA",
      number: "5781062961",
      image:
        "00020101021240530013ID.CO.BCA.WWW0118936000141578106296021057810629615204482953033605802ID5921REYNER WILLIAMS LIONG6013Jakarta Pusat61051031062470804DMCT993500020001255781062961202312261259022630460F0",
    },
    {
      id: "2",
      bank: "BNI",
      number: "009085695679128",
      image: "009085695679128",
    },
    { id: "3", bank: "Dana", number: "085695679128", image: "085695679128" },
    { id: "4", bank: "Gopay", number: "085695679128", image: "085695679128" },
  ];

  const [selectedOption, setSelectedOption] = useState<DummyDataItem | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = (option: DummyDataItem) => {
    setSelectedOption(option);
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = data.find((item) => item.id === e.target.value);
    setSelectedOption(selected || null);
  };

  return (
    <div className="pt-3 pb-1">
      <Radio.Group
        onChange={handleRadioChange}
        value={selectedOption ? selectedOption.id : undefined}
      >
        {data.map((item) => (
          <div className="pt-5">
          <Radio.Button key={item.id} value={item.id} onClick={() => {showModal(item)
          }} className="w-[250px] h-[35px] text-lg text-white font-semibold flex items-center bg-yzc hover:bg-green-500 hover:text-white" onChange={(e) => {
            setData({...dataInput, bank: e.target.value})
          }}>
            {item.bank}
          </Radio.Button> 
          </div>
        ))}
      </Radio.Group>

      <div>
        <Modal
          className="pt-[150px]"
          visible={modalVisible}
          footer={(_) => (
            <>
              <Button
                type="default"
                onClick={handleCancel}
                className=" text-white hover:bg-red-700"
              >
                Tutup
              </Button>
              <Button type="text" onClick={handleOk}>
                Ok
              </Button>
            </>
          )}
        >
          {selectedOption && (
            <div>
              <div className="flex justify-center">
                <QRCode value={selectedOption.image} />
              </div>
              <div className="pt-10">
                <div className="flex justify-center font-bold text-2xl">
                  {selectedOption.bank}
                </div>
                <div className="flex justify-center font-semibold text-xl">
                  {selectedOption.number}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};
export default Bank;
