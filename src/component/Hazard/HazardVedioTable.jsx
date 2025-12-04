import { ConfigProvider,message, Modal, Table } from "antd";
import { useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line} from "react-icons/ri";

import { useParams } from "react-router-dom";

import {
  useDeleteHazardTopicMutation,
  useDeleteHazardVedioMutation,
  useGetAllVediosQuery,
} from "../../redux/feature/hazard/hazardApi";

import VedioModal from "./VedioModal";
import HazardForm from "./AddHazardForm";
import EditHazVedio from "./EditHazVedio";
import { FaRegEye } from "react-icons/fa";
const HazardVedioTable = () => {
  const [page, setPage] = useState(1);
  const [singleData, setSingleData] = useState({});
  const { id } = useParams();
  console.log("singleData--------------->", singleData);
  const { data: allVedios,refetch } = useGetAllVediosQuery({id,page});
  console.log("all Vedios->", allVedios?.data?.result);
const meta = allVedios?.data?.meta

  const vediosData = allVedios?.data?.result;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVedioModalOpen, setVedioModalOpen] = useState(false);
  const [vedioData, setVedioData] = useState([]);
  const [deleteHazardVedio] =useDeleteHazardVedioMutation();
  const currentPage = Number(page ?? 1);
  const pageSize = Number(meta?.limit ?? 10);
  const total = Number(meta?.total ?? 0);
  const showModal = (id) => {
    setSingleData(id);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isAddVedioModalOpen, setAddVedioModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const showEditModal = (id) => {
    console.log("id", id);
    setSingleData(id);
    setEditModalOpen(true);
  };
  const handleEditCancel = () => {
    setEditModalOpen(false);
  };
  // ---- pass this to the table ----
  const handlePageChange = (nextPage /*, pageSize */) => {
    console.log("calling functon........",nextPage);
    setPage(nextPage); // triggers RTK Query refetch because query args changed
  }
  const handleDelete = async (id) => {
    console.log("delete id-->", id);

    try {
      const res = await deleteHazardVedio(id).unwrap();
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

  const addVedioModal = () => {
    // console.log("data", data);
    // setVedioData(data);
    setAddVedioModalOpen(true);
  };
  const showVedioModal = (data) => {
    console.log("data", data);
    setVedioData(data);
    setVedioModalOpen(true);
  };
  const handleVedioCancel = () => {
    setVedioModalOpen(false);
    // Clear video data after modal animation completes
    setTimeout(() => {
      setVedioData(null);
    }, 300);
  }
  const handleAddVedioCancel = () => {
    setAddVedioModalOpen(false);
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
  dataIndex: "hazardTopic",
  key: "hazardTopic",
  align: "center",
  render: (hazardTopic, record, index) =>`${hazardTopic?.name}`,
},
    {
      title: "Thumbnail",
      dataIndex: "thumbnail_url",
      key: "video_url",
      align: "center",
  render: (record) => {
    console.log("record-->", record); // Log the record to the console
    
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* <video
          src={record}
          width={100}
          height={60}
          muted
          controls={false}
          preload="metadata"
          style={{ objectFit: "cover", borderRadius: 5 }}
        /> */}
        <img src={record} style={{ width: 70, height: 40 }}alt="" />
      </div>
    );
  },
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
            onClick={() => showEditModal(record)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RiEdit2Line className="text-black w-5 h-5" />
          </button>
          <button
            // onClick={() => showEditModal(record)}
              onClick={() => showVedioModal(record)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaRegEye  className="text-black w-5 h-5" />
          </button>

          <button
            onClick={()=>showModal(record)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RiDeleteBin6Line className="text-red-500 w-5 h-5" />
          </button>
      
        </div>
      ),
    },
  ];

  return (
    <>
      <nav className="flex justify-end mb-3">
        <div>
          <button
            className="bg-[#3F5EAB] text-white p-3 rounded-xl"
            onClick={() => addVedioModal()}
          >
            +Add Video
          </button>
        </div>
      </nav>
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
          dataSource={vediosData}
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
            <div className="flex flex-col justify-center items-center py-10 font-title">
              <h1 className="text-3xl text-center text-red-500">
                Are you sure!
              </h1>
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
            open={isAddVedioModalOpen}
            centered
            onCancel={handleAddVedioCancel}
            footer={null}
          >
            <div>
              <HazardForm refetch={refetch} setAddVedioModalOpen={setAddVedioModalOpen} isAddVedioModalOpen={isAddVedioModalOpen}/>
            </div>
          </Modal>
          {/*display vedio modal */}
          <Modal
            open={isVedioModalOpen}
            centered
            onCancel={handleVedioCancel}
            footer={null}
              destroyOnClose
            afterClose={() => setVedioData(null)}
          >
            <div>
              <VedioModal  vedioData={vedioData} />
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
              <h1 className="text-3xl text-center text-[#333333] mb-3">
                Edit Video
              </h1>
              {/* <VedioModal refetch={refetch} singleData={singleData} /> */}
              <EditHazVedio refetch={refetch} singleData={singleData} setEditModalOpen={setEditModalOpen} isEditModalOpen={isEditModalOpen} />
            </div>
          </Modal>
        </ConfigProvider>
      </div>
    </>
  );
};

export default HazardVedioTable;
