
const OutletHeader = () => {
    return (
            <div className="flex justify-between my-2"> 
      <div className="flex  justify-center items-center gap-5">
          <SlArrowLeft className="w-5 h-5 text-right  text-[#3564d3]" />
          <p className="text-[#3564d3] font-title text-3xl font-bold">
            Dashboard Overview
          </p>
        </div>
        <div>
          <div className="relative w-full sm:w-[300px] ">
            <Input
              type="text"
              placeholder="Search anything here..."
              className="border border-[#e5eaf2] py-3   outline-none w-full rounded-full px-3"
            />
            <span className=" text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center  cursor-pointer">
              <IoSearch className="text-[1.3rem]" />
            </span>
          </div>
        </div>
        </div>
    );
};

export default OutletHeader;