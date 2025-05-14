import { Checkbox, ConfigProvider, Input, Modal, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const TheoryManagementTable = ({ category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
      align: "center", // Center-aligned SL column
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      align: "center", // Center-aligned Category Name column
    },
    {
      title: "Category Icon",
      dataIndex: "categoryIcon",
      key: "categoryIcon",
      align: "center", // Center-aligned Category Icon column
      render: (text) => <img src={text} alt="Category Icon" style={{ width: 70, height: 40 }} />,
    },
    {
      title: "Action",
      key: "action",
      align: "center", // Center-aligned Action column
      render: (_, record) => (
        <div className="flex items-center justify-center gap-5">
          <Link to={`/order/${record.orderId}`}>
            <button>
              <RiEdit2Line className="text-[#C8CAD8] w-5 h-5" />
            </button>
          </Link>
          <button onClick={showModal}>
            <RiDeleteBin6Line className="text-[#C8CAD8] w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              activeBorderColor: "#00c0b5",
            },
            Pagination: {
              colorPrimaryBorder: "#00c0b5",
              colorBorder: "#00c0b5",
              colorPrimaryHover: "#00c0b5",
              colorTextPlaceholder: "#00c0b5",
              itemActiveBgDisabled: "#00c0b5",
              colorPrimary: "#00c0b5",
            },
          },
        }}
      >
        <Table
          dataSource={category}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
        />
        <Modal
          open={isModalOpen}
          centered
          onCancel={handleCancel}
          footer={null}
        >
          <div className="flex flex-col p-5 w-full">
            <h1 className="text-3xl text-center text-[#333333]">Message</h1>
            <div className="">
              <p className="text-xl text-start mt-5 mb-3">Send To</p>
              <Input type="text" placeholder="Only to user" />
            </div>
            <div className="">
              <p className="text-xl text-start mt-5 mb-3">Message</p>
              <TextArea type="text" placeholder="Message here..." />
            </div>
            <div className="flex gap-14 mt-3">
              <div>
                <h1>Send:</h1>
              </div>
              <div className="flex gap-5">
                <Checkbox />
                <p>Email</p>
              </div>
            </div>
            <div className="text-center py-5 w-full flex ">
              <div className="w-[100%]">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className=" text-[#3F5EAB] border-2 border-[#FFE2D4] font-semibold py-3 rounded-lg px-16"
                >
                  Cancel
                </button>
              </div>
              <div className="w-[100%]">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-[#00c0b5] text-white font-semibold py-3 rounded-lg px-16"
                >
                  CONFIRM
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default TheoryManagementTable;
