import { Table, Modal, ConfigProvider } from "antd";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { useState } from "react";
import EditAdiQuesForm from "./EditAdiQuesForm";


const AdiQuestionTable = ({ question }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const showModal = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };

    const [isEditModalOpen, setEditModalOpen] = useState(false);

  const showEditModal = (id) => {
    console.log("id",id);
    setEditModalOpen(true);
  };
  const handleEditCancel = () => {
    setEditModalOpen(false);
  };

  const columns = [
    {
      title: "SL",
      dataIndex: "id",
      key: "sl",
      align: "center",
      render: (_, __, index) => index + 1,
      width: 60,
    },
    {
      title: "Questions",
      dataIndex: "question",
      key: "question",
      align: "left",
      width: "40%",
    },
    {
      title: "Answer",
      dataIndex: "answere",
      key: "answere",
      align: "left",
      width: "50%",
      render: (answere) => {
        const circleStyle = (filled) => ({
          display: "inline-block",
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: filled ? "none" : "1.5px solid #3F5EAB",
          backgroundColor: filled ? "#3F5EAB" : "transparent",
          color: filled ? "#fff" : "#3F5EAB",
          fontWeight: "600",
          textAlign: "center",
          lineHeight: "24px",
          marginRight: 8,
          userSelect: "none",
        });

        // Split options into pairs of 2 for two per row
        const chunkedOptions = [];
        for (let i = 0; i < answere.options.length; i += 2) {
          chunkedOptions.push(answere.options.slice(i, i + 2));
        }

        return (
          <div>
            {chunkedOptions.map((optionPair, index) => (
              <div
                key={index}
                style={{ display: "flex", gap: 40, marginBottom: 16 }}
              >
                {optionPair.map(({ label, text }) => {
                  const isCorrect = answere.correctOptions.includes(label);
                  return (
                    <div
                      key={label}
                      style={{ display: "flex", alignItems: "center", flex: 1 }}
                    >
                      <span style={circleStyle(isCorrect)}>{label}</span>
                      <span>{text}</span>
                    </div>
                  );
                })}
              </div>
            ))}

            <div
              style={{
                marginTop: 8,
                fontSize: 16,
                color: "#444",
                paddingLeft: 16,
                lineHeight: 1.3,
              }}
            >
              <strong>Explanation: </strong>
              {answere.explanation}
            </div>
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
          <button onClick={()=>showEditModal(record)}
            style={{ border: "none", background: "none", cursor: "pointer" }}
          >
            <RiEdit2Line size={20} color="#000" />
          </button>
          <button
            style={{ border: "none", background: "none", cursor: "pointer" }}
            onClick={() => showModal(record.id)}
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
        dataSource={question}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="id"
        scroll={{ x: "max-content" }}
        bordered
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

                {/* edit modal */}
          <Modal
          open={isEditModalOpen}
          centered
          onCancel={handleEditCancel}
          footer={null}
        >
          <div >
            <h1 className="text-3xl text-center text-[#333333]">Edit Question</h1>
 <EditAdiQuesForm/>
          </div>
        </Modal>

    </ConfigProvider>
  );
};

export default AdiQuestionTable;
