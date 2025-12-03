import { Checkbox, ConfigProvider, Input, Modal, Table } from "antd";

import { useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";

import { FiEye } from "react-icons/fi";
import UpdateTestScore from "./UpdateTestScore";

const TestScoreTable = ({ testData, page, meta, handlePageChange }) => {
  console.log("testData--->", testData);
  const currentPage = Number(page ?? 1);
  const pageSize = Number(meta?.limit ?? 10);
  const total = Number(meta?.total ?? 0);
  const [singleData, setSingleData] = useState({});
  console.log("single  data------>", singleData);
  const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showDescriptionModal = (testData) => {
    // console.log("id-->>>", testData);
    setSingleData(testData);
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
      // ✅ Formula: (currentPage - 1) * pageSize + index + 1
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "User Name",
      dataIndex: ["user", "name"], // directly point to user.name
      key: "userName",
      align: "center",
      render: (text) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: "Topic Name",
      dataIndex: ["topic", "name"], // directly point to user.name
      key: "TopicName",
      align: "center",
      render: (text) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: "Test Type",
      dataIndex: "testType",
      key: "testType",
      align: "center", // Center-aligned Category Name column
    },

    {
      title: "Current Value",
      dataIndex: "accuracy",
      key: "accuracy",
      align: "center",
      render: (text) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p>{text}% </p>
        </div>
      ),
    },

    {
      title: "View",
      dataIndex: "description",
      key: "description",
      align: "center", // Center-aligned Category Icon column
      render: (_, record) => (
        <FiEye
          size={24}
          className=" mx-auto"
          onClick={() => showDescriptionModal(record)}
        />
      ),
    },
  ];

  return (
    <div className="font-title">
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
          dataSource={testData}
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
        <Modal
          open={isDescriptionModalOpen}
          centered
          onCancel={handleDescriptionCancel}
          footer={null}
        >
          <div>
            <div class=" mx-auto text-center p-6   rounded">
              <div class="text-3xl font-bold text-blue-600 mb-2">
                {singleData?.correctAnswers} of {singleData?.totalQuestions}
              </div>

              <div class=" pt-2 text-gray-800 font-semibold">
                ADI Theory Test
              </div>
              <div class="text-gray-600 mt-1">{singleData?.createdAt?.split("T")[0]}
</div>
              {/* <div class="text-gray-600 mt-1">
                {new Date(singleData?.createdAt).toISOString().split("T")[0]}
              </div> */}
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default TestScoreTable;
