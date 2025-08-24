import { ConfigProvider, Modal, Table } from "antd";
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetAllHighwaySignQuery } from "../../redux/feature/highway/highwayApi";

const SignTypeDetails = () => {
    const {id}=useParams()
    console.log("id from params in sign type details--->",id);
    const {data:getAllSign}=useGetAllHighwaySignQuery(id)
        console.log("get Al Sign from params in sign type details--->",getAllSign);
        const result = getAllSign?.data?.result
  const [page, setPage] = useState(1);

  const meta = getAllSign?.data?.meta;

  const currentPage = Number(page ?? 1);
  const pageSize = Number(meta?.limit ?? 10);
  const total = Number(meta?.total ?? 0);

  // ---- pass this to the table ----
  const handlePageChange = (nextPage /*, pageSize */) => {
    console.log("calling functon........", nextPage);
    setPage(nextPage); // triggers RTK Query refetch because query args changed
  };

  const columns = useMemo(
    () => [
      {
        title: "SL",
        key: "sl",
        align: "center",
        render: (_text, _record, index) =>
          (currentPage - 1) * pageSize + (index + 1),
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        align: "center",
      },
      {
        title: "Images",
        dataIndex: "sign_image",
        key: "sign_image",
        align: "center",
        render: (src) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={src}
              alt="Sign Icon"
              style={{ width: 70, height: 40, objectFit: "cover" }}
            />
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
          dataSource={result}
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
      </ConfigProvider>
    </div>
  );
};

export default SignTypeDetails;
