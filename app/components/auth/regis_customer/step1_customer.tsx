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
      <Form style={{maxWidth: '800px'}} size="large" className="pl-10 pr-10">
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
                className="w-full regis text-white bg-transparent"
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
                  setData({ ...dataInput, religion: e });
                }}
                placeholder="Pilih Agama"
                className="w-full regis bg-transparent"
              >
                <Option value="Islam">Islam</Option>
                <Option value="Katolik">Katolik</Option>
                <Option value="Protestan">Prostestan</Option>
                <Option value="Budha">Budha</Option>
                <Option value="Hindu">Hindu</Option>
                <Option value="Konghucu">Konghucu</Option>
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
                setData({ ...dataInput, birth_date: e });
              }}
              placeholder="Pilih tanggal"
              className="w-full regis text-white bg-transparent text-putih"
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
                setData({ ...dataInput, last_education: e.target.value });
              }}
              placeholder="Masukan Pendidikan Terakhir"
              className=" p-[10px] rounded-[10px] border border-rstroke regis text-white bg-transparent"
            />
          </Form.Item>
        </div>
      </div>
      </Form>
    </div>
  );
}
export default CustomerStep1;