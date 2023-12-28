import { DatePicker, Select } from "antd/lib/index";
import { Option } from "antd/es/mentions";
import { Form, Input } from "antd/lib/index";
import { FormInstance } from "antd";
import { RegisterCustomer } from "#/app/types/typeRegisCstr";

type Props = {
  setData: any;
  dataInput: RegisterCustomer;
  formStep1: FormInstance<any>;
};
function CustomerStep1({ setData, dataInput, formStep1 }: Props) {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <div>
        <div>
          <p className="text-teks text-2xl font-bold text-white">
            Nama Lengkap
          </p>
        </div>
        <div className="w-full regis">
          <Form.Item
            name="full_name"
            rules={[
              { required: true, message: "Harap masukan nama lengkap anda!" },
            ]}
          >
            <Input
              onChange={(e) => {
                setData({ ...dataInput, fullName: e.target.value });
              }}
              size="large"
              placeholder="Masukan nama lengkap"
              className=" p-[10px] rounded-[10px] border border-rstroke regis bg-transparent"
            />
          </Form.Item>
        </div>
      </div>
      <div className="flex gap-x-5 grid-cols-1">
        <div className="w-1/2">
          <div>
            <p className="text-teks text-2xl font-bold text-white">
              Jenis Kelamin
            </p>
          </div>
          <div className="w-full regis">
            <Form.Item
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Harap masukan jenis kelamin anda!",
                },
              ]}
            >
              <Select
                onChange={(e) => {
                  setData({ ...dataInput, gender: e });
                }}
                placeholder="Pilih jenis kelamin"
                className="w-full regis text-white"
              >
                <Option value="pria">Pria</Option>
                <Option value="wanita">Wanita</Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="w-1/2">
          <div>
            <p className="text-teks text-2xl font-bold text-white">Agama</p>
          </div>
          <div className="w-full regis">
            <Form.Item
              name="religion"
              rules={[
                { required: true, message: "Harap masukan nama agama anda!" },
              ]}
            >
              <Select
                onChange={(e) => {
                  setData({ ...dataInput, Religion: e });
                }}
                placeholder="Pilih Agama"
                className="w-full regis"
              >
                <Option value="islam">Islam</Option>
                <Option value="katolik">Katolik</Option>
                <Option value="protestan">Prostestan</Option>
                <Option value="budha">Budha</Option>
                <Option value="hindu">Hindu</Option>
                <Option value="konghucu">Konghucu</Option>
              </Select>
            </Form.Item>
          </div>
        </div>
      </div>
      <div>
        <div>
          <p className="text-teks text-2xl font-bold text-white">
            Tanggal Lahir
          </p>
        </div>
        <div className="w-full regis">
          <Form.Item
            name="birth_date"
            rules={[
              { required: true, message: "Harap masukan tanggal lahir anda!" },
            ]}
          >
            <DatePicker
              onChange={(e) => {
                setData({ ...dataInput, birthDate: e });
              }}
              placeholder="Pilih tanggal"
              className="w-full regis text-white"
            />
          </Form.Item>
        </div>
      </div>
      <div>
        <div>
          <p className="text-teks text-2xl font-bold text-white">
            Pendidikan Terakhir
          </p>
        </div>
        <div className="w-full regis">
          <Form.Item
            name="last_education"
            rules={[
              {
                required: true,
                message: "Harap masukan pendidikan terakhir anda!",
              },
            ]}
          >
            <Input
			  onChange={(e) => {
                setData({ ...dataInput, lastEducation: e });
              }}
              placeholder="Masukan Pendidikan Terakhir"
              className=" p-[10px] rounded-[10px] border border-rstroke regis text-white"
            />
          </Form.Item>
        </div>
      </div>
    </div>
  );
}
export default CustomerStep1;