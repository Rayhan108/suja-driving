import { useParams } from "react-router-dom";

const NotificationDetails = () => {
  const { id } = useParams();
  return (
    <div>
      <h1 className="text-start text-3xl font-bold mb-5 text-[#3564d3] font-title ">
        Notification
      </h1>
      <div className="bg-[#EDEDED] p-5">
        <p className="font-title text-lg text-[#737476] my-5" >Thanks for your interest in U Tee Hub  We couldn’t approve your request right now — feel free to reach out or reapply later! </p>
      </div>
    </div>
  );
};

export default NotificationDetails;

