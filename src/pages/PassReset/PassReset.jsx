import { Link } from "react-router-dom";

export default function PassReset() {
  return (
    <div className="flex justify-center max-w-xl mx-auto font-title min-h-screen  items-center ">
 <div className="bg-white shadow-xl p-12 py-36">
         <h2 className="text-lg font-semibold text-center mb-2">Password Reset</h2>
      <p className="text-center text-lg text-gray-600 mb-6">
        Your password has been successfully reset. click confirm to set a new
        password
      </p>

      <Link to={"/setPass"}>
        <button className="bg-blue-600 w-1/2 text-white text-sm rounded-md px-5 py-2  mx-auto justify-center flex mb-4">
          Confirm
        </button>
      </Link>
 </div>
    </div>
  );
}
