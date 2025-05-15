
import { Checkbox, ConfigProvider, Input, Modal, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import EditTopicForm from "./EditTopicForm";
const TheoryManagementTopicTable = ({topic}) => {
    // console.log(topic);
      const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

    const [isEditModalOpen, setEditModalOpen] = useState(false);

  const showEditModal = (id) => {
    console.log("id",id);
    setEditModalOpen(true);
  };
  const handleEditCancel = () => {
    setEditModalOpen(false);
  };
  const columns = [
    {
    title: "SL",
    dataIndex: "sl",
    key: "sl",
    align: "center",
    render: (text, record, index) => index + 1,  // Use the index + 1 as serial number
  },
    {
      title: "Topic Name",
      dataIndex: "topicName",
      key: "topicName",
      align: "center", 
    },
    {
      title: "Topic  Icon",
      dataIndex: "topicIcon",
      key: "categoryIcon",
      align: "center", 
      render: (text) => <img src={text} alt="Category Icon" style={{ width: 70, height: 40 }} />,
    },
    {
      title: "Action",
      key: "action",
      align: "center", // Center-aligned Action column
      render: (_, record) => (
        <div className="flex items-center justify-center gap-5">
    
            <button onClick={()=>showEditModal(record)}>
              <RiEdit2Line className="text-black  w-5 h-5" />
            </button>
  
          <button onClick={showModal}>
            <RiDeleteBin6Line className="text-red-500   w-5 h-5" />
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
          dataSource={topic}
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
                {/* edit modal */}
          <Modal
          open={isEditModalOpen}
          centered
          onCancel={handleEditCancel}
          footer={null}
        >
          <div >
            <h1 className="text-3xl text-center text-[#333333]">Edit Topic</h1>
 <EditTopicForm/>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
    );
};

export default TheoryManagementTopicTable;