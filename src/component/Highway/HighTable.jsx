import { Checkbox, ConfigProvider, Input, Modal, Table } from "antd";

import { useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";

import HighwayEdit from "./HighwayEdit";
import { FiEye } from "react-icons/fi";

const HighTable = ({ category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [data,setData]=useState([])
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showDescriptionModal = (data) => {
    console.log("id",data);
    setData(data)
    setDescriptionModalOpen(true);
  };
  const handleDescriptionCancel = () => {
    setDescriptionModalOpen(false);
  };
  const showEditModal = (id) => {
    console.log("id",id);
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
    render: (text, record, index) => index + 1,  // Use the index + 1 as serial number
  },
    {
      title: "Topics Name",
      dataIndex: "topicsName",
      key: "topicsName",
      align: "center", // Center-aligned Category Name column
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      align: "center", // Center-aligned Category Icon column
      render: (text) => <div style={{ display: "flex", justifyContent: "center" }}> <img src={text} alt="Category Icon" style={{ width: 70, height: 40 }} /></div>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center", // Center-aligned Category Icon column
      render: (_,record) => <FiEye size={24} className=" mx-auto"  onClick={()=>showDescriptionModal(record)}/>,
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
          <div >
            <h1 className="text-3xl text-center text-[#333333]">Description</h1>
<p className="mt-5 p-2">{data.description}</p>
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
            <h1 className="text-3xl text-center text-[#333333]">Edit Code</h1>
 <HighwayEdit/>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default HighTable;
