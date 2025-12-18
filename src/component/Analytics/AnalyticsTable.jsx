import { Checkbox, ConfigProvider, Input, Modal, Table } from "antd";

import { useState } from "react";

import { FiEye } from "react-icons/fi";


const AnalyticsTable = ({ reports }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const showDescriptionModal = (testData) => {
    console.log("id", data);
    setData(data);
    setDescriptionModalOpen(true);
  };
  const handleDescriptionCancel = () => {
    setDescriptionModalOpen(false);
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
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      align: "center", // Center-aligned Category Name column
    },
    {
      title: "Test Name",
      dataIndex: "testName",
      key: "testName",
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
          dataSource={reports}
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
          <div>
            <div class=" mx-auto text-center p-6   rounded">
              <div class="text-3xl font-bold text-blue-600 mb-2">44 of 50</div>
              <button class="bg-green-500 text-white px-6 py-2 rounded mb-3">
                Passed
              </button>
              <div class=" pt-2 text-gray-800 font-semibold">
                ADI Theory Test
              </div>
              <div class="text-gray-600 mt-1">April 21, 2025</div>
            </div>
          </div>
        </Modal>

      </ConfigProvider>
    </div>
  );
};

export default AnalyticsTable;
