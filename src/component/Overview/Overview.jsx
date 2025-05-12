import client from "../../assets/client.png"
import vendor from "../../assets/completed.png"
import order from "../../assets/revenue.png"


const Overview = () => {
    return (
        <div className="grid grid-cols-3 gap-5 mb-2">
            <div className=" text-white bg-[#3F5EAB] px-16 rounded-xl flex flex-col justify-center items-center py-5">
               <div >
               <img src={client} alt="" />
               </div>
                <p className="font-title  text-xl pb-2 text-[#07163D]">Total User</p>
                <p className="font-title  text-xl text-[#07163D] pt-2">852,650</p>
            </div>
            <div className=" text-white bg-[#3F5EAB] px-16 rounded-xl flex flex-col justify-center items-center py-5">
               <div >
               <img src={vendor} alt="" />
               </div>
                <p className="font-title  text-xl pb-2 text-[#07163D]">Total Completed</p>
                <p className="font-title  text-xl text-[#07163D] pt-2">2,500</p>
            </div>
            <div className=" text-white bg-[#3F5EAB] px-16 rounded-xl flex flex-col justify-center items-center py-5">
               <div >
               <img src={order} alt="" />
               </div>
                <p className="font-title  text-xl pb-2 text-[#07163D]">Total Revenue</p>
                <p className="font-title  text-xl text-[#07163D] pt-2">2,500</p>
            </div>
    
        </div>
    );
};

export default Overview;