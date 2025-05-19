
import { Link, useNavigate } from "react-router-dom";
import anita from "../../assets/Anita.png"
import { IoIosNotificationsOutline } from "react-icons/io";
import { Badge } from "antd";
const MainHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <div className="relative font-title">
      <header className=" bg-[#3F5EAB] shadow-sm">
        <div className="flex justify-end items-center px-5 md:px-10 h-[80px]">
   
          <div className="flex gap-5 items-center">
            <div>
        <Link to={"/notification"}> 
           <Badge count={5}>
     <IoIosNotificationsOutline className="text-[#35BEBD] bg-white rounded-full w-8 p-1 text-3xl"/>
    </Badge>
        </Link>
            </div>
            <div
              onClick={() => navigate("/setting/updateProfile")}
              className="flex items-center gap-2 cursor-default  px-5 py-2 rounded-2xl"
            >
              <img
                src={anita}
                className="w-8 md:w-12 h-8 md:h-12 object-cover rounded-full"
                alt="User Avatar"
              />
             <div>
             <h3 className="hidden md:block text-white text-lg font-semibold">
             Israa
              </h3>
             
             </div>
   
            </div>
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MainHeader;
