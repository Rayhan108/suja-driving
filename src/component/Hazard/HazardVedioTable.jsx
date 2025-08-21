
import { Checkbox, ConfigProvider, Input, message, Modal, Table } from "antd";
import { useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";


import { Link, useParams } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { useDeleteHazardTopicMutation } from "../../redux/feature/hazard/hazardApi";
const HazardVedioTable = () => {
    const {id} =useParams()
    console.log("id--------------->",id);
      const [singleData, setSingleData] = useState({});
      const [isModalOpen, setIsModalOpen] = useState(false);
        const [isVedioModalOpen, setVedioModalOpen] = useState(false);
  const [vedioData,setVedioData]=useState([])
   const [deleteHazardTopic]=useDeleteHazardTopicMutation()

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



  const showVedioModal = (data) => {
    console.log("data", data);
    setVedioData(data)
    setVedioModalOpen(true);
  };
  const handleVedioCancel = () => {
    setVedioModalOpen(false);
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
    dataIndex: "topicName",
    key: "topicName",
    align: "center",
  },
{
  title: "Videos",
  dataIndex: "vedio",
  key: "vedio",
  align: "center",
  render: (videoUrl) => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <video
        src={videoUrl}
        width={100}
        height={60}
        muted
        controls={false}
        preload="metadata"
        style={{ objectFit: "cover", borderRadius: 5 }}
      />
    </div>
  ),
},

  // {
  //   title: "Danger Zone",
  //   dataIndex: "dangerZone",
  //   key: "dangerZone",
  //   align: "center",
  //   render: (_, record) => (
  //     <button
  //       className="text-[#3A3A3A] bg-[#CFC9DD] p-2 rounded-xl"
  //       style={{ display: "inline-block", textAlign: "center" }}
  //       onClick={() => showVedioModal(record)}
  //     >
  //       View
  //     </button>
  //   ),
  // },
  {
    title: "Action",
    key: "action",
    align: "center",
    render: (_, record) => (
      <div className="flex items-center justify-center gap-5">
        <button
          // onClick={() => showEditModal(record)}
          onClick={() => showVedioModal(record)}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <RiEdit2Line className="text-black w-5 h-5" />
        </button>

        <button
          onClick={showModal}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <RiDeleteBin6Line className="text-red-500 w-5 h-5" />
        </button>
                         <Link to={`/theoryManagement/topic/${record?._id}`}>
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

        {/*vedio modal */}
        <Modal
          open={isVedioModalOpen}
          centered
          onCancel={handleVedioCancel}
          footer={null}
        >
          <div>
        
            <VedioModal vedioData={vedioData}/>
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

export default HazardVedioTable;