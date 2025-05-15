import { SlArrowLeft } from "react-icons/sl";
import SubscriptionTable from "../../component/Subscription/SubscriptionTable";

const Subscription = () => {
  const subscriptionData = [
    {
      name: "Adi Theory",
      user: "Israa khan",
      date: "02/08/25",
      method: "stripe",
      expDate: "02/08/25",
    },
    {
      name: "Adi Theory",
      user: "Israa khan",
      date: "02/08/25",
      method: "stripe",
      expDate: "02/08/25",
    },
    {
      name: "Adi Theory",
      user: "Israa khan",
      date: "02/08/25",
      method: "stripe",
      expDate: "02/08/25",
    },
    {
      name: "Adi Theory",
      user: "Israa khan",
      date: "02/08/25",
      method: "stripe",
      expDate: "02/08/25",
    },
    {
      name: "Adi Theory",
      user: "Israa khan",
      date: "02/08/25",
      method: "stripe",
      expDate: "02/08/25",
    },
    {
      name: "Adi Theory",
      user: "Israa khan",
      date: "02/08/25",
      method: "stripe",
      expDate: "02/08/25",
    },
    {
      name: "Adi Theory",
      user: "Israa khan",
      date: "02/08/25",
      method: "stripe",
      expDate: "02/08/25",
    },
    {
      name: "Adi Theory",
      user: "Israa khan",
      date: "02/08/25",
      method: "stripe",
      expDate: "02/08/25",
    },
    {
      name: "Adi Theory",
      user: "Israa khan",
      date: "02/08/25",
      method: "stripe",
      expDate: "02/08/25",
    },
    {
      name: "Adi Theory",
      user: "Israa khan",
      date: "02/08/25",
      method: "stripe",
      expDate: "02/08/25",
    },
    {
      name: "Adi Theory",
      user: "Israa khan",
      date: "02/08/25",
      method: "stripe",
      expDate: "02/08/25",
    },
    {
      name: "Adi Theory",
      user: "Israa khan",
      date: "02/08/25",
      method: "stripe",
      expDate: "02/08/25",
    },
    {
      name: "Adi Theory",
      user: "Israa khan",
      date: "02/08/25",
      method: "stripe",
      expDate: "02/08/25",
    },
    {
      name: "Adi Theory",
      user: "Israa khan",
      date: "02/08/25",
      method: "stripe",
      expDate: "02/08/25",
    },
    {
      name: "Adi Theory",
      user: "Israa khan",
      date: "02/08/25",
      method: "stripe",
      expDate: "02/08/25",
    },
  ];
  return (
    <div>
      <div className="flex  items-center gap-5 my-3">
        <SlArrowLeft className="w-5 h-5 text-right text-[#3564d3]" />
        <p className="text-[#3564d3] font-title text-3xl font-bold">
          Subscriptions & Payment
        </p>
      </div>
      <SubscriptionTable subscriptionData={subscriptionData} />
    </div>
  );
};

export default Subscription;
