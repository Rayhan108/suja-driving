import { useGetAllNotificationQuery } from "../../redux/feature/others/othersApi";

const NotificationPage = () => {
  const {data:notifications}=useGetAllNotificationQuery(undefined)
  console.log("all notification---->",notifications);
    return (
  <div>
      <h1 className="text-start text-3xl font-bold mb-5 text-[#3564d3] font-title ">
        Notification
      </h1>
      <div>

 <div className="flex justify-between p-3 bg-[#d7ddeb] text-black font-title">
          <div>
            <div className="flex gap-5">
              <p>New message received</p>
              <p className="text-[#737476]">10:00 AM</p>
            </div>
            <div className="">
              <p className="text-[#737476]">
                A new content has been uploaded to Car Study.
              </p>
            </div>
          </div>
          <div>
          {/* <Link  to={`/notification/${1}`}>

            <button className="bg-[#3564d3]  text-white font-semibold py-2 px-6  mx-auto block rounded-xl">
              View
            </button>
          </Link> */}
          </div>
        </div>

      </div>
    </div>
    );
};

export default NotificationPage;