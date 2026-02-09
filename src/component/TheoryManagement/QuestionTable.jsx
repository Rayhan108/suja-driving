// import { Table, Modal, ConfigProvider, message } from "antd";
// import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
// import { useState } from "react";
// import EditQuesForm from "./EditQuestionForm";
// import { useDeleteQuesMutation } from "../../redux/feature/theoryManagement/theoryApi";
// import { circleStyle, normalizeOptions } from "../AdiTheoryManagement/AdiQuestionTable";

// const QuestionTable = ({ question,refetch,handlePageChange,meta,page }) => {
//   const [deleteQues] =useDeleteQuesMutation()
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [isEditModalOpen, setEditModalOpen] = useState(false);
//    const [singleData, setSingleData] = useState({});
//   const showModal = (id) => { setDeleteId(id);     setSingleData(id); setIsModalOpen(true); };
//   const handleCancel = () => { setIsModalOpen(false); setDeleteId(null); };

//   const showEditModal = (id) => {
//     console.log("id", id);
//     setSingleData(id);
//     setEditModalOpen(true);
//   };
//   const currentPage = Number(page ?? 1);
//   const pageSize = Number(meta?.limit ?? 10);
//   const total = Number(meta?.total ?? 0);
//   const handleEditCancel = () => { setEditModalOpen(false); };
//   const handleDelete = async (id) => {
//     console.log("delete id-->",id);
//     try {
//       const res = await deleteQues(id).unwrap();
//       console.log("response-->", res);
//       if (res?.success) {
//         message.success(res?.message);
//         refetch();
//       } else {
//         message.error(res?.data?.message);
//       }
//     } catch (error) {
//       message.error(error?.data?.message);
//     }
//     setIsModalOpen(false);
//   };
//   const columns = [
//     { title: "SL", dataIndex: "id", key: "sl", align: "center", render: (_, __, i) => i + 1, width: 60 },
//     {
//       title: "Question",
//       dataIndex: "question",
//       key: "question",
//       align: "left",
//       width: "40%",
//       render: (q) => <span style={{ whiteSpace: "pre-wrap" }}>{q}</span>,
//     },
 
//     {
//       title: "Answer",
//       dataIndex: "answer",
//       key: "answer",
//       align: "left",
//       width: "35%",
//       render: (answer, record) => {
//         const opts = normalizeOptions(record?.options);
//         console.log("options are--------->",opts);
//         console.log("singleData--->",singleData);
//         return (
//           <div>
//             {/* options: 2 per row, read-only visual */}
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(2, minmax(0,1fr))",
//                 gap: 16,
//               }}
//             >
//               {opts.map((o,idx) => {
//                 const isCorrect =
//                   o.value === record.answer ||
//                   (Array.isArray(record.correctOptions) &&
//                     record.correctOptions.includes(o.value));
//                 return (
//                   <div
//                     key={o.value}
//                     style={{ display: "flex", alignItems: "center" }}
//                   >
//                     {/* show label inside circle */}
//               <span style={circleStyle(isCorrect)}>
//   {String.fromCharCode(65 + idx)} {/* A=65, B=66 ... */}
// </span>
//                     <span style={{ fontWeight: 600, marginRight: 6 }}>
//                       {o.label}
//                     </span>
//                     {o.text && o.text !== o.label && (
//                       <span style={{ color: "#444" }}>{o.text}</span>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>

//             <div style={{ marginTop: 8, fontSize: 16, color: "#444" }}>
//               <strong>Answer: </strong>{String(answer)}
//             </div>
//             {record.explanation && (
//               <div style={{ marginTop: 4, fontSize: 16, color: "#444" }}>
//                 <strong>Explanation: </strong>
//                 <span style={{ whiteSpace: "pre-wrap" }}>
//                   {record.explanation}
//                 </span>
//               </div>
//             )}
//           </div>
//         );
//       },
//     },
//     {
//       title: "Action",
//       key: "action",
//       align: "center",
//       width: 80,
//       render: (_, record) => (
//         <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
//           <button
//             onClick={() => showEditModal(record)}
//             style={{ border: "none", background: "none", cursor: "pointer" }}
//             aria-label="Edit"
//           >
//             <RiEdit2Line size={20} color="#000" />
//           </button>
//           <button
//             onClick={() => showModal(record)}
//             style={{ border: "none", background: "none", cursor: "pointer" }}
//             aria-label="Delete"
//           >
//             <RiDeleteBin6Line size={20} color="red" />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <ConfigProvider
//       theme={{
//         components: {
//           InputNumber: {
//             activeBorderColor: "#00c0b5",
//           },
//           Pagination: {
//             colorPrimaryBorder: "#00c0b5",
//             colorBorder: "#00c0b5",
//             colorPrimaryHover: "#00c0b5",
//             colorTextPlaceholder: "#00c0b5",
//             itemActiveBgDisabled: "#00c0b5",
//             colorPrimary: "#00c0b5",
//           },
//           Table: {
//             headerBg: "#3F5EAB",
//             headerColor: "rgb(255,255,255)",
//             cellFontSize: 14,
//             headerSplitColor: "#ffffff",
//           },
//         },
//       }}
//     >
//          <Table
//           rowKey="_id"
//           dataSource={question}
//           columns={columns}
//           pagination={{
//             current: currentPage,
//             pageSize,
//             total,
//             showSizeChanger: false,
//           }}
//           // IMPORTANT: handle page change here (Table's onChange)
//           onChange={(pagination) => {
//             const next = pagination?.current ?? 1;
//             const size = pagination?.pageSize ?? pageSize;
//             if (
//               typeof handlePageChange === "function" &&
//               (next !== currentPage || size !== pageSize)
//             ) {
//               handlePageChange(next, size);
//             }
//           }}
//           scroll={{ x: "max-content" }}
//         />
//       <Modal
//         open={isModalOpen}
//         centered
//         onCancel={handleCancel}
//         footer={null}
//         destroyOnClose
//       >
//         <div className="flex flex-col justify-center items-center py-10 font-title">
//           <h1 className="text-3xl text-center text-red-500">Are you sure!</h1>
//           <p className="text-xl text-center mt-5">
//             Do you really want to delete? Please confirm.
//           </p>
//           <div className="text-center py-5 w-full">
//             <button
//                 onClick={() => { /* TODO: call delete API with deleteId */ handleDelete(singleData?._id);; }}
//               className="bg-red-500 text-white font-semibold w-1/3 py-3 px-5 rounded-lg"
//             >
//               CONFIRM
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* edit modal */}
//       <Modal
//         open={isEditModalOpen}
//         centered
//         onCancel={handleEditCancel}
//         footer={null}
//       >
//         <div>
//           <h1 className="text-3xl text-center text-[#333333]">Edit Question</h1>
//           <EditQuesForm  refetch={refetch} singleData={singleData} handleEditCancel={handleEditCancel}/>
//         </div>
//       </Modal>
//     </ConfigProvider>
//   );
// };

// export default QuestionTable;


import { Table, Modal, ConfigProvider, message, Image, Tag } from "antd";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { useState } from "react";
import EditQuesForm from "./EditQuestionForm";
import { useDeleteQuesMutation } from "../../redux/feature/theoryManagement/theoryApi";
import { circleStyle, normalizeOptions } from "../AdiTheoryManagement/AdiQuestionTable";

const QuestionTable = ({ question, refetch, handlePageChange, meta, page }) => {
  const [deleteQues] = useDeleteQuesMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [singleData, setSingleData] = useState({});

  const showModal = (record) => {
    setSingleData(record);
    setIsModalOpen(true);
  };

  const showEditModal = (record) => {
    setSingleData(record);
    setEditModalOpen(true);
  };

  const handleCancel = () => setIsModalOpen(false);
  const handleEditCancel = () => setEditModalOpen(false);

  const handleDelete = async (id) => {
    try {
      const res = await deleteQues(id).unwrap();
      if (res?.success) {
        message.success(res?.message || "Deleted successfully");
        refetch();
      }
    } catch (error) {
      message.error(error?.data?.message || "Delete failed");
    }
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "SL",
      key: "sl",
      align: "center",
      width: 60,
      render: (_, __, i) => (page - 1) * meta?.limit + (i + 1),
    },
    {
      title: "Image",
      dataIndex: "question_image",
      key: "question_image",
      align: "center",
      width: 120,
      render: (img) =>
        img ? (
          <Image
            src={img}
            alt="question"
            width={80}
            height={60}
            className="rounded-md object-cover border border-gray-200 shadow-sm"
            fallback="https://via.placeholder.com/80x60?text=No+Image"
          />
        ) : (
          <span className="text-gray-400 italic text-xs">No Image</span>
        ),
    },
    {
      title: "Question Content",
      dataIndex: "question",
      key: "question",
      align: "center",
      width: "30%",
      render: (q) => (
        <div className="font-medium text-gray-800 text-sm leading-relaxed max-w-[400px] mx-auto">
          {q}
        </div>
      ),
    },
    {
      title: "Options & Answer",
      key: "options_answer",
      align: "center",
      width: "40%",
      render: (_, record) => {
        const opts = normalizeOptions(record?.options);
        return (
          <div className="flex flex-col items-center py-2">
            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-3">
              {opts.map((o, idx) => {
                const isCorrect = String(o.value) === String(record.answer);
                return (
                  <div key={idx} className="flex items-center space-x-2 text-xs">
                    <span style={circleStyle(isCorrect)}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className={`${isCorrect ? "font-bold text-green-600" : "text-gray-600"}`}>
                      {o.label}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* Explanation Preview */}
            {record.explanation && (
              <div className="mt-2 p-2 bg-blue-50 rounded-md border border-blue-100 max-w-[350px]">
                <p className="text-[11px] text-blue-700 leading-snug">
                  <strong>Explanation:</strong> {record.explanation}
                </p>
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
      width: 100,
      render: (_, record) => (
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => showEditModal(record)}
            className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            title="Edit"
          >
            <RiEdit2Line size={18} />
          </button>
          <button
            onClick={() => showModal(record)}
            className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-sm"
            title="Delete"
          >
            <RiDeleteBin6Line size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#3F5EAB",
            headerColor: "#ffffff",
            headerBorderRadius: 8,
            cellPaddingInline: 16,
            cellPaddingBlock: 12,
          },
        },
      }}
    >
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <Table
          rowKey="_id"
          dataSource={question}
          columns={columns}
          pagination={{
            current: Number(page || 1),
            pageSize: Number(meta?.limit || 10),
            total: Number(meta?.total || 0),
            showSizeChanger: false,
            position: ["bottomCenter"],
          }}
          onChange={(pagination) => {
            handlePageChange(pagination.current, pagination.pageSize);
          }}
          scroll={{ x: 1000 }}
          bordered={false}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isModalOpen}
        centered
        onCancel={handleCancel}
        footer={null}
        width={400}
      >
        <div className="text-center py-6 px-4">
          <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <RiDeleteBin6Line size={30} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Are you sure?</h2>
          <p className="text-gray-500 mt-2 text-sm leading-relaxed">
            This action cannot be undone. All data associated with this question will be removed.
          </p>
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleCancel}
              className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(singleData?._id)}
              className="flex-1 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors shadow-md shadow-red-100"
            >
              Delete Now
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={isEditModalOpen}
        centered
        onCancel={handleEditCancel}
        footer={null}
        width={650}
        title={<span className="text-xl font-bold text-gray-800 px-4 pt-4 block">Update Question Information</span>}
        destroyOnClose
      >
        <div className="p-4">
          <EditQuesForm 
            refetch={refetch} 
            singleData={singleData} 
            handleEditCancel={handleEditCancel}
          />
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default QuestionTable;