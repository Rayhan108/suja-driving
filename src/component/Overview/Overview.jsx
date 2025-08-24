import client from "../../assets/client.png"
import vendor from "../../assets/completed.png"
import order from "../../assets/revenue.png"
import { useGetStatsQuery } from "../../redux/feature/others/othersApi";


const Overview = () => {
    const {data:stats}=useGetStatsQuery(undefined)
    
    return (
        <div className="grid grid-cols-4 gap-5 mb-2">
            <div className=" text-white bg-[#3F5EAB] px-16 rounded-xl flex flex-col justify-center items-center py-5">
               <div >
               <img src={client} alt="" />
               </div>
                <p className="font-title  text-xl pb-2 ">Total User</p>
                <p className="font-title  text-xl  pt-2">{stats?.data?.totalUser}</p>
            </div>
            <div className=" text-white bg-[#3F5EAB] px-16 rounded-xl flex flex-col justify-center items-center py-5">
               <div >
               <img src={vendor} alt="" />
               </div>
                <p className="font-title  text-xl pb-2 ">Total Topic</p>
                <p className="font-title  text-xl  pt-2">{stats?.data?.totalTopic}</p>
            </div>
            <div className=" text-white bg-[#3F5EAB] px-16 rounded-xl flex flex-col justify-center items-center py-5">
               <div >
               <img src={vendor} alt="" />
               </div>
                <p className="font-title  text-xl pb-2 ">Total Hazard Vedio</p>
                <p className="font-title  text-xl  pt-2">{stats?.data?.totalHazardVideo}</p>
            </div>
            <div className=" text-white bg-[#3F5EAB] px-16 rounded-xl flex flex-col justify-center items-center py-5">
               <div >
               <img src={order} alt="" />
               </div>
                <p className="font-title  text-xl pb-2 ">Total Revenue</p>
                <p className="font-title  text-xl  pt-2">{stats?.data?.totalIncome}</p>
            </div>
    
        </div>
    );
};

export default Overview;