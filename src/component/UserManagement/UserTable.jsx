import { ConfigProvider, Input, Modal, Table } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { MdBlockFlipped, MdOutlineMessage } from "react-icons/md";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const UserTable = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (userdata) => {

    console.log("userData",userdata);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    // {
    //   title: "User ID",
    //   dataIndex: "userId",
    //   key: "userId",
    // },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Test Type",
      dataIndex: "test-type",
      key: "test-type",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        let color = "";
        if (text === "Active") color = "bg-green-500 p-2 rounded-xl ";
        else if (text === "Deactive") color = "bg-[#CFC9DD] p-2 rounded-xl ";

        return <div className={`font-semibold ${color} `}>{text}</div>;
      },
    },

   {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (text, record) => (
        <div className=" ">
          <button onClick={() => showModal(record)}>
            <MdOutlineMessage className="text-[#3F5EAB] w-5 h-5" />
          </button>
        </div>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="  ">
          {/* <Link to={`/user/${record.userId}`}>
              
                </Link> */}
          <button>
            <MdBlockFlipped className="text-[#3F5EAB] w-5 h-5" />
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
      Table: {
        colorFillAlter: "#3F5EAB", // usually header row background
      },
    },
  }}
>


        <Table
          dataSource={user}
         columns={columns.map((column) => ({
    ...column,
    align: 'center', // Center align content for every column
  }))}
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
              <div  className="w-[100%]">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className=" text-[#3F5EAB] border-2 border-[#FFE2D4] font-semibold  py-3 rounded-lg px-16"
                >
                  Cancel
                </button>
              </div>
              <div className="w-[100%]">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-[#3F5EAB] text-white font-semibold  py-3 rounded-lg px-16"
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

export default UserTable;
