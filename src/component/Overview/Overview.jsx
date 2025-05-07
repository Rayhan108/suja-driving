import client from "../../assets/client.png"
import vendor from "../../assets/vendor.png"
import order from "../../assets/order.png"
import earning from "../../assets/earning.png"

const Overview = () => {
    return (
        <div className="grid grid-cols-4 gap-5 mb-2">
            <div className=" text-black bg-white px-16 rounded-xl flex flex-col justify-center items-center py-1">
                <p className="font-title  text-xl pb-2 text-[#07163D]">Total Client</p>
               <div >
               <img src={client} alt="" />
               </div>
                <p className="font-title  text-xl text-[#07163D] pt-2">852,650</p>
            </div>
            <div className=" text-black bg-white px-16 rounded-xl flex flex-col justify-center items-center py15">
                <p className="font-title  text-xl pb-2 text-[#07163D]">Total Vandor</p>
               <div >
               <img src={vendor} alt="" />
               </div>
                <p className="font-title  text-xl text-[#07163D] pt-2">2,500</p>
            </div>
            <div className=" text-black bg-white px-16 rounded-xl flex flex-col justify-center items-center py-1">
                <p className="font-title  text-xl pb-2 text-[#07163D]">Total Order</p>
               <div >
               <img src={order} alt="" />
               </div>
                <p className="font-title  text-xl text-[#07163D] pt-2">2,500</p>
            </div>
            <div className=" text-black bg-white px-16 rounded-xl flex flex-col justify-center items-center py-1">
                <p className="font-title  text-xl pb-2 text-[#07163D]">Total Earning</p>
               <div >
               <img src={earning} alt="" />
               </div>
                <p className="font-title  text-xl text-[#07163D] pt-2">4,782</p>
            </div>
        </div>
    );
};

export default Overview;