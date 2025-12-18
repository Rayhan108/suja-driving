import { ConfigProvider, Modal, Table, message } from "antd";
import { useState, useMemo } from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { FiEye } from "react-icons/fi";
import HighwayEdit from "./HighwayEdit";
import { useDeleteHighwayTopicMutation } from "../../redux/feature/highway/highwayApi";
import { Link } from "react-router-dom";

const HighTable = ({ category, refetch, meta, handlePageChange, page }) => {
  const [singleData, setSingleData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const [deleteHighTopic] = useDeleteHighwayTopicMutation();

  const currentPage = Number(page ?? 1);
  const pageSize = Number(meta?.limit ?? 10);
  const total = Number(meta?.total ?? 0);
  const showModal = (row) => {
    setSingleData(row);
    setIsModalOpen(true);
  };
  const showDescriptionModal = (row) => {
    setData(row);
    setDescriptionModalOpen(true);
  };
  const handleDescriptionCancel = () => setDescriptionModalOpen(false);
  const showEditModal = (row) => {
    setSingleData(row);
    setEditModalOpen(true);
  };
  const handleEditCancel = () => setEditModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  const handleDelete = async (id) => {
    console.log("delete id-->", id);
    try {
      const res = await deleteHighTopic(id).unwrap();
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

  const columns = useMemo(
    () => [
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
        title: "Topics Name",
        dataIndex: "name",
        key: "name",
        align: "center",
      },
      {
        title: "Images",
        dataIndex: "icon",
        key: "icon",
        align: "center",
        render: (src) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={src}
              alt="Category Icon"
              style={{ width: 70, height: 40, objectFit: "cover" }}
            />
          </div>
        ),
      },
      {
        title: "Description",
        key: "description",
        align: "center",
        render: (_text, record) => (
          <Link to={`/highway/details/${record?._id}`}>
            <FiEye
              size={24}
              className="mx-auto cursor-pointer"
              onClick={() => showDescriptionModal(record)}
              title="View description"
            />
          </Link>
        ),
      },
      {
        title: "Action",
        key: "action",
        align: "center",
        render: (_text, record) => (
          <div className="flex items-center justify-center gap-5">
            <button onClick={() => showEditModal(record)} title="Edit">
              <RiEdit2Line className="text-black w-5 h-5" />
            </button>
            <button onClick={() => showModal(record)} title="Delete">
              <RiDeleteBin6Line className="text-red-500 w-5 h-5" />
            </button>
          </div>
        ),
      },
    ],
    [currentPage, pageSize]
  );

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              colorPrimary: "#00c0b5",
              colorPrimaryHover: "#00c0b5",
              colorPrimaryBorder: "#00c0b5",
              colorBorder: "#00c0b5",
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
          dataSource={category}
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

        {/* Delete modal */}
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
                onClick={() => handleDelete(singleData?._id)}
                className="bg-red-500 text-white font-semibold w-1/3 py-3 px-5 rounded-lg"
              >
                CONFIRM
              </button>
            </div>
          </div>
        </Modal>

        {/* Description modal */}
        <Modal
          open={isDescriptionModalOpen}
          centered
          onCancel={handleDescriptionCancel}
          footer={null}
        >
          <div>
            <h1 className="text-3xl text-center text-[#333333]">Description</h1>
            <p className="mt-5 p-2">{data?.description}</p>
          </div>
        </Modal>

        {/* Edit modal */}
        <Modal
          open={isEditModalOpen}
          centered
          onCancel={handleEditCancel}
          footer={null}
        >
          <div>
            <h1 className="text-3xl text-center text-[#333333]">Edit Code</h1>
            <HighwayEdit singleData={singleData} refetch={refetch} setEditModalOpen={setEditModalOpen}/>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default HighTable;
