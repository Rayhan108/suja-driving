import { Checkbox, ConfigProvider, Input, Modal, Table } from "antd";

import { useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";

import { FiEye } from "react-icons/fi";
import EditSubscription from "./EditSubscription";


const SubscriptionTable = ({ subscriptionData }) => {
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
      title: "Plane Name",
      dataIndex: "name",
      key: "name",
      align: "center", // Center-aligned Category Name column
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      align: "center", // Center-aligned Category Name column
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Payment Method",
      dataIndex: "method",
      key: "method",
      align: "center",
    },
     {
      title: " Expire Date",
      dataIndex: "expDate",
      key: "expDate",
      align: "center",
    },
 
    {
      title: "Action",
      key: "action",
      align: "center", // Center-aligned Action column
      render: (_, record) => (
        <div className="flex items-center justify-center gap-5">
          <button onClick={() => showEditModal(record)}>
            <RiEdit2Line className="text-black  w-5 h-5" />
          </button>

          <button >
            <FiEye
          size={24}
          className=" mx-auto"
          onClick={() => showDescriptionModal(record)}
        />
          </button>
        </div>
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
          },
        }}
      >
        <Table
          dataSource={subscriptionData}
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
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md ">
  <p className="mb-4 text-gray-800 font-semibold">
    Everything in the Listener package, plus:
  </p>
  <ul className="list-disc list-inside space-y-2 text-gray-700">
    <li>More Matches: Meet three matches instead of two.</li>
    <li>Extended Chat: Access chat with your match for up to one week.</li>
    <li>Second Chance: Users can be matched again if their first match doesn't work out, providing another chance at connection.</li>
    <li>Exclusive Content: Access to curated dating tips, insights, and advice not available to free-tier users.</li>
  </ul>
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
            <h1 className="text-3xl text-center text-[#333333]">Edit</h1>
            <EditSubscription/>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default SubscriptionTable;
