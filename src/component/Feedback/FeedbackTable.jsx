import { Checkbox, ConfigProvider, Input, Modal, Table } from "antd";

import { useState } from "react";

import { FiEye } from "react-icons/fi";

import EditFeedback from "./EditFeedback";
import { LuReply } from "react-icons/lu";


const FeedbackTable = ({ feedbackData,meta,page,handlePageChange }) => {
    const currentPage = Number(page ?? 1);
  const pageSize = Number(meta?.limit ?? 10);
  const total = Number(meta?.total ?? 0);
  const [singleData, setSingleData] = useState({});
  // console.log("single  data------>", singleData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showDescriptionModal = (data) => {
    // console.log("data--->", data);
    setSingleData(data)
    setDescriptionModalOpen(true);
  };
  const handleDescriptionCancel = () => {
    setDescriptionModalOpen(false);
  };
  const showEditModal = (id) => {
    // console.log("id", id);
    setSingleData(id)
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
    
    render: (text, record, index) => {
    // Calculate SL number considering pagination
    return (currentPage - 1) * pageSize + index + 1;
    },
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
      dataIndex: "updatedAt",
      key: "lastUpdate",
      align: "center",
      render:(text)=>(
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p>{text?.split("T")[0]}</p>
        </div>
      )
    },
    //   {
    //   title: "View",
    //  key:"view",
    //   align: "center", // Center-aligned Category Icon column
    //   render: (_, record) => (
    //     <FiEye
    //       size={24}
    //       className=" mx-auto"
    //       onClick={() => showDescriptionModal(record)}
    //     />
    //   ),
    // },
 
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
          rowKey="_id"
          dataSource={feedbackData}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize,
            total,
            showSizeChanger: false,
          }}
          // IMPORTANT: handle page change here (Table's onChange)
          onChange={(pagination) => {
            const next = pagination?.current ?? 1;
            const size = pagination?.pageSize ?? pageSize;
            if (
              typeof handlePageChange === "function" &&
              (next !== currentPage || size !== pageSize)
            ) {
              handlePageChange(next, size);
            }
          }}
          scroll={{ x: "max-content" }}
        />

        {/* description modal */}
        {/* <Modal
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


        </Modal> */}

        {/* edit modal */}
        <Modal
          open={isEditModalOpen}
          centered
          onCancel={handleEditCancel}
          footer={null}
        >
          <div>
            <h1 className="text-3xl text-center text-[#333333]">Reply</h1>
            <EditFeedback singleData={singleData}/>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default FeedbackTable;
