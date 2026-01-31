import React, { useState } from "react";
// import { useGetAllNotificationQuery } from "../../redux/feature/others/othersApi";
import {useGetAllNotificationQuery} from "../../redux/feature/others/othersApi"
import { Pagination, Spin } from "antd";
import moment from "moment";

const NotificationPage = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; 


  const { data: notifications, isLoading, isFetching } = useGetAllNotificationQuery({
    page: currentPage,
    limit: pageSize,
  });

  const notificationList = notifications?.data?.result || [];
  const totalItems = notifications?.data?.meta?.total || 0;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <h1 className="text-start text-3xl font-bold mb-5 text-[#3564d3] font-title">
        Notification
      </h1>

      <div className="flex flex-col gap-3 min-h-[400px]">
       
        {isLoading || isFetching ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" />
          </div>
        ) : notificationList.length > 0 ? (
          notificationList.map((item) => (
            <div
              key={item._id}
              className="flex justify-between p-4 bg-[#d7ddeb] text-black font-title rounded-md shadow-sm border-l-4 border-[#3564d3]"
            >
              <div>
                <div className="flex gap-5 items-center">
                  <p className="font-semibold text-lg">{item.title}</p>
                  <p className="text-[#737476] text-xs">
                
                    {item.createdAt ? moment(item.createdAt).format("LT") : "10:00 AM"}
                  </p>
                </div>
                <div className="mt-1">
                  <p className="text-[#555658]">{item.message}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">No notifications found.</p>
        )}
      </div>

      {/* ৪. Ant Design Pagination Component */}
      <div className="flex justify-end mt-8">
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false} 
          className="font-title"
        />
      </div>
    </div>
  );
};

export default NotificationPage;