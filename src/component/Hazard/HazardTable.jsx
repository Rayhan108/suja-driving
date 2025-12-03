import { Checkbox, ConfigProvider, Input, message, Modal, Table } from "antd";

import { useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import EditHazard from "./EditHazard";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { useDeleteHazardTopicMutation } from "../../redux/feature/hazard/hazardApi";

const HazardTable = ({hazardData,refetch,handlePageChange,page,meta}) => {
    const [singleData, setSingleData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const currentPage = Number(page ?? 1);
  const pageSize = Number(meta?.limit ?? 10);
  const total = Number(meta?.total ?? 0);
    const [deleteHazardTopic]=useDeleteHazardTopicMutation()
  const showModal = (id) => {
    setSingleData(id);
    setIsModalOpen(true);
  };
  const showEditModal = (id) => {
    console.log("id", id);
    setSingleData(id);
    setEditModalOpen(true);
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
    const handleDelete = async (id) => {
    console.log("delete id-->",id);
  
    try {
      const res = await deleteHazardTopic(id).unwrap();
      console.log("response-->", res);
      if (res?.success) {
        message.success(res?.message);
        refetch();
      } else {
        message.error(res?.data?.message);
      }
    } catch (error) {
      message.error(error?.data?.message);
    }
    setIsModalOpen(false);
  };




const columns = [
  {
    title: "SL",
    dataIndex: "sl",
    key: "sl",
    align: "center",
    render: (text, record, index) => index + 1, // Use index + 1 as serial number
  },
  {
    title: "Topic Name",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
{
  title: "Icon",
  dataIndex: "topic_icon",
  key: "icon",
  align: "center",
  render: (text) => (
    // <div style={{ display: "flex", justifyContent: "center" }}>
    //   <video
    //     src={videoUrl}
    //     width={100}
    //     height={60}
    //     muted
    //     controls={false}
    //     preload="metadata"
    //     style={{ objectFit: "cover", borderRadius: 5 }}
    //   />
    // </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {" "}
          <img
            src={text}
            alt="Category Icon"
            style={{ width: 70, height: 40 }}
          />
        </div>
      
  ),
},
  {
    title: "Action",
    key: "action",
    align: "center",
    render: (_, record) => (
            <div className="flex items-center justify-center gap-5">
    
            <button onClick={()=>showEditModal(record)}>
              <RiEdit2Line className="text-black  w-5 h-5" />
            </button>
  
          <button onClick={()=>showModal(record)}>
            <RiDeleteBin6Line className="text-red-500   w-5 h-5" />
          </button>
                    <Link to={`/hazard/vedios/${record?._id}`}>
          <button >
            <BsEye className="text-black   w-5 h-5" />
          </button>
          </Link>
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
          dataSource={hazardData}
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
                handleDelete(singleData?._id);
              }}
                className="bg-red-500 text-white font-semibold w-1/3 py-3 px-5 rounded-lg"
              >
                CONFIRM
              </button>
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
         
            <EditHazard singleData={singleData} refetch={refetch} setEditModalOpen={setEditModalOpen} />
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default HazardTable;
