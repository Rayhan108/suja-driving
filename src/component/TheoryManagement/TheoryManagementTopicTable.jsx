
import { Checkbox, ConfigProvider, Input, message, Modal, Table } from "antd";
import { useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import EditTopicForm from "./EditTopicForm";
import { useDeleteTopicMutation } from "../../redux/feature/theoryManagement/theoryApi";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
const TheoryManagementTopicTable = ({topic,refetch}) => {
    // console.log(topic);
      const [singleData, setSingleData] = useState({});
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [deleteTopic]=useDeleteTopicMutation()
  const showModal = (id) => {
    setSingleData(id)
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

    const [isEditModalOpen, setEditModalOpen] = useState(false);

  const showEditModal = (id) => {
    console.log("id",id);
        setSingleData(id);
    setEditModalOpen(true);
  };
  const handleEditCancel = () => {
    setEditModalOpen(false);
  };


    const handleDelete = async (id) => {
    console.log("delete id-->",id);
    try {
      const res = await deleteTopic(id).unwrap();
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
    render: (text, record, index) => index + 1,  // Use the index + 1 as serial number
  },
    {
      title: "Topic Name",
      dataIndex: "name",
      key: "name",
      align: "center", 
    },
    {
      title: "Topic  Icon",
      dataIndex: "topic_icon",
      key: "topic_icon",
      align: "center", 
      render: (text) => <div style={{ display: "flex", justifyContent: "center" }}><img src={text} alt="Category Icon" style={{ width: 70, height: 40 }} /> </div> ,
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
  
          <button onClick={()=>showModal(record)}>
            <RiDeleteBin6Line className="text-red-500   w-5 h-5" />
          </button>
                    <Link to={`/theoryManagement/question/${record?._id}`}>
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
        destroyOnClose
      >
        <div className="flex flex-col justify-center items-center py-10 font-title">
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
          <div >
            <h1 className="text-3xl text-center text-[#333333]">Edit Topic</h1>
 <EditTopicForm refetch={refetch} singleData={singleData}/>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
    );
};

export default TheoryManagementTopicTable;