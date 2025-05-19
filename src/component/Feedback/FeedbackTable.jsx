import { Checkbox, ConfigProvider, Input, Modal, Table } from "antd";

import { useState } from "react";

import { FiEye } from "react-icons/fi";

import EditFeedback from "./EditFeedback";
import { LuReply } from "react-icons/lu";


const FeedbackTable = ({ feedbackData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showDescriptionModal = (testData) => {
    console.log("id", data);
    setData(data);
    setDescriptionModalOpen(true);
  };
  const handleDescriptionCancel = () => {
    setDescriptionModalOpen(false);
  };
  const showEditModal = (id) => {
    console.log("id", id);
    setEditModalOpen(true);
  };
  const handleEditCancel = () => {
    setEditModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
      align: "center",
      render: (text, record, index) => index + 1, // Use the index + 1 as serial number
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center", // Center-aligned Category Name column
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center", // Center-aligned Category Name column
    },
    {
      title: "Last Update",
      dataIndex: "lastUpdate",
      key: "lastUpdate",
      align: "center",
    },
      {
      title: "View",
     key:"view",
      align: "center", // Center-aligned Category Icon column
      render: (_, record) => (
        <FiEye
          size={24}
          className=" mx-auto"
          onClick={() => showDescriptionModal(record)}
        />
      ),
    },
 
    {
      title: "Reply",
      key: "reply",
      align: "center", // Center-aligned Action column
      render: (_, record) => (
        <div className="flex items-center justify-center gap-5">
          <button onClick={() => showEditModal(record)}>
            <LuReply className="text-black  w-5 h-5" />
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
              headerBg: "#3F5EAB",
              headerColor: "rgb(255,255,255)",
              cellFontSize: 16,
              headerSplitColor: "#ffffff",

            },
          },
        }}
      >
        <Table
          dataSource={feedbackData}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
        />
        <Modal
          open={isModalOpen}
          centered
          onCancel={handleCancel}
          footer={null}
          destroyOnClose
        >
          <div className="flex flex-col justify-center items-center py-10">
            <h1 className="text-3xl text-center text-red-500">Are you sure!</h1>
            <p className="text-xl text-center mt-5">
              Do you really want to delete? Please confirm.
            </p>
            <div className="text-center py-5 w-full">
              <button
                onClick={() => {
                  // handle delete logic here
                  setIsModalOpen(false);
                }}
                className="bg-red-500 text-white font-semibold w-1/3 py-3 px-5 rounded-lg"
              >
                CONFIRM
              </button>
            </div>
          </div>
        </Modal>

        {/* description modal */}
        <Modal
          open={isDescriptionModalOpen}
          centered
          onCancel={handleDescriptionCancel}
          footer={null}
        >
            <h1 className="text-center text-2xl mb-3">Details</h1>
<div class="max-w-md p-4  rounded-md space-y-3 text-sm font-medium text-gray-700">
  <div class="flex justify-between">
    <span>ID No:</span>
    <span class="text-gray-500">#325345636</span>
  </div>
  <div class="flex justify-between">
    <span>Date:</span>
    <span class="text-gray-500">12/08/24</span>
  </div>
  <div class="flex justify-between">
    <span>User Name:</span>
    <span class="text-gray-500">Devon Lane</span>
  </div>
  <div>
    <p class="font-semibold">Description of the issue:</p>
    <p class="text-gray-600">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </p>
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
          <div>
            <h1 className="text-3xl text-center text-[#333333]">Reply</h1>
            <EditFeedback/>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default FeedbackTable;
