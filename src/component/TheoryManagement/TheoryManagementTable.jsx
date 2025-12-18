import { ConfigProvider, Input, message, Modal, Table } from "antd";
import { useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import EditCategoryForm from "./EditCategoryForm";
import { useDeleteCategoryMutation } from "../../redux/feature/theoryManagement/theoryApi";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";

const TheoryManagementTable = ({ category, refetch,meta,page,handlePageChange }) => {
  const [singleData, setSingleData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [deleteCategory] = useDeleteCategoryMutation();
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
  console.log("category---->", category);

  const currentPage = Number(page ?? 1);
  const pageSize = Number(meta?.limit ?? 10);
  const total = Number(meta?.total ?? 0);


  const handleDelete = async (id) => {
    console.log("delete id-->",id);
    try {
      const res = await deleteCategory(id).unwrap();
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
    
    render: (text, record, index) => {
    // Calculate SL number considering pagination
    return (currentPage - 1) * pageSize + index + 1;
    },
  },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      align: "center", // Center-aligned Category Name column
    },
    {
      title: "Category Icon",
      dataIndex: "category_image",
      key: "category_image",
      align: "center", // Center-aligned Category Icon column
      render: (text) => (
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
      align: "center", // Center-aligned Action column
      render: (_, record) => (
        <div className="flex items-center justify-center gap-5">
          <button onClick={() => showEditModal(record)}>
            <RiEdit2Line className="text-black  w-5 h-5" />
          </button>

          <button onClick={() => showModal(record)}>
            <RiDeleteBin6Line className="text-red-500   w-5 h-5" />
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
        itemActiveBg: "transparent", // Remove active background
        itemActiveBorderColor: "transparent", // Remove active border color
        itemBg: "transparent", // Make all items' background transparent
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
                  // handle delete logic here
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
            <h1 className="text-3xl text-center text-[#333333]">
              Edit Category
            </h1>
            <EditCategoryForm refetch={refetch} singleData={singleData} setEditModalOpen={setEditModalOpen}/>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default TheoryManagementTable;
