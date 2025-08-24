import { Table, Modal, ConfigProvider, message } from "antd";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { useState } from "react";
import EditAdiQuesForm from "./EditAdiQuesForm";
import { useDeleteQuesMutation } from "../../redux/feature/theoryManagement/theoryApi";

export const normalizeOptions = (options = []) =>
  options.map((opt) => {
    if (typeof opt === "string") return { label: opt, value: opt };
    const value = opt?.value ?? opt?.label ?? opt?.text ?? "";
    const label = opt?.label ?? String(value);
    return { label, value, text: opt?.text };
  });

export const circleStyle = (filled) => ({
  display: "inline-block",
  width: 22,
  height: 22,
  borderRadius: "50%",
  border: filled ? "none" : "1.5px solid #3F5EAB",
  backgroundColor: filled ? "#3F5EAB" : "transparent",
  color: filled ? "#fff" : "#3F5EAB",
  fontWeight: 600,
  textAlign: "center",
  lineHeight: "22px",
  marginRight: 8,
  userSelect: "none",
});

const AdiQuestionTable = ({ question,refetch,page,meta,handlePageChange}) => {
  const [deleteQues] =useDeleteQuesMutation()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
   const [singleData, setSingleData] = useState({});
  const showModal = (id) => { setDeleteId(id);     setSingleData(id); setIsModalOpen(true); };
  const handleCancel = () => { setIsModalOpen(false); setDeleteId(null); };
  const currentPage = Number(page ?? 1);
  const pageSize = Number(meta?.limit ?? 10);
  const total = Number(meta?.total ?? 0);
  const showEditModal = (id) => {
    console.log("id", id);
    setSingleData(id);
    setEditModalOpen(true);
  };

  const handleEditCancel = () => { setEditModalOpen(false); };
  const handleDelete = async (id) => {
    console.log("delete id-->",id);
    try {
      const res = await deleteQues(id).unwrap();
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
    { title: "SL", dataIndex: "id", key: "sl", align: "center", render: (_, __, i) => i + 1, width: 60 },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      align: "left",
      width: "40%",
      render: (q) => <span style={{ whiteSpace: "pre-wrap" }}>{q}</span>,
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
      align: "left",
      width: "35%",
      render: (answer, record) => {
        const opts = normalizeOptions(record?.options);
        console.log("options are--------->",opts);
        console.log("singleData--->",singleData);
        return (
          <div>
            {/* options: 2 per row, read-only visual */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0,1fr))",
                gap: 16,
              }}
            >
              {opts.map((o,idx) => {
                const isCorrect =
                  o.value === record.answer ||
                  (Array.isArray(record.correctOptions) &&
                    record.correctOptions.includes(o.value));
                return (
                  <div
                    key={o.value}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {/* show label inside circle */}
              <span style={circleStyle(isCorrect)}>
  {String.fromCharCode(65 + idx)} {/* A=65, B=66 ... */}
</span>
                    <span style={{ fontWeight: 600, marginRight: 6 }}>
                      {o.label}
                    </span>
                    {o.text && o.text !== o.label && (
                      <span style={{ color: "#444" }}>{o.text}</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 8, fontSize: 16, color: "#444" }}>
              <strong>Answer: </strong>{String(answer)}
            </div>
            {record.explanation && (
              <div style={{ marginTop: 4, fontSize: 16, color: "#444" }}>
                <strong>Explanation: </strong>
                <span style={{ whiteSpace: "pre-wrap" }}>
                  {record.explanation}
                </span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 80,
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          <button
            onClick={() => showEditModal(record)}
            style={{ border: "none", background: "none", cursor: "pointer" }}
            aria-label="Edit"
          >
            <RiEdit2Line size={20} color="#000" />
          </button>
          <button
            onClick={() => showModal(record)}
            style={{ border: "none", background: "none", cursor: "pointer" }}
            aria-label="Delete"
          >
            <RiDeleteBin6Line size={20} color="red" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
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
            headerColor: "#fff",
            cellFontSize: 16,
            headerSplitColor: "#ffffff",
          },
        },
      }}
    >
      <Table
          rowKey="_id"
          dataSource={question}
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
      <Modal open={isModalOpen} centered onCancel={handleCancel} footer={null} destroyOnClose>
        <div className="flex flex-col justify-center items-center py-10">
          <h1 className="text-3xl text-center text-red-500">Are you sure!</h1>
          <p className="text-xl text-center mt-5">
            Do you really want to delete? Please confirm.
          </p>
          <div className="text-center py-5 w-full">
            <button
              onClick={() => { /* TODO: call delete API with deleteId */ handleDelete(singleData?._id);; }}
              className="bg-red-500 text-white font-semibold w-1/3 py-3 px-5 rounded-lg"
            >
              CONFIRM
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit modal */}
      <Modal open={isEditModalOpen} centered onCancel={handleEditCancel} footer={null} destroyOnClose>
        <div>
          <h1 className="text-3xl text-center text-[#333333]">Edit Question</h1>
          <EditAdiQuesForm  refetch={refetch} singleData={singleData} handleEditCancel={handleEditCancel}/>  
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default AdiQuestionTable;
