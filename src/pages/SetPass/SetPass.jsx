import { useState } from "react";
import { Form, Input, Checkbox, Divider, Typography, message } from "antd";
import { FaApple, FaGoogle, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline } from "react-icons/io5";

import logo from "../../assets/Logo.png";
import login from "../../assets/login.png";
import {useNavigate } from "react-router-dom";
import {

  useResetPassMutation,
} from "../../redux/feature/auth/authApi";

const { Title, Text } = Typography;

const Signin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [resetPassword] = useResetPassMutation();

  const onFinish = async (values) => {
    // console.log("Form submitted:", values); // Display form values in the console
    setLoading(true);
    try {
      setEmail(values?.email);
      const res = await resetPassword(values).unwrap();
      // console.log("reset pass response--->", res);
      if (res?.success) {
        message.success(res?.message);
        setLoading(false);
        navigate("/sign-in");
      } else {
        message.error(res?.message);
        setLoading(false);
      }
    } catch (error) {
      message.error(error?.data?.message);
      setLoading(false);
    }
  };


  return (
    <div className="max-w-7xl mx-auto w-full flex md:flex-row flex-col justify-center items-center gap-8 md:ml-16 lg:ml-96 min-h-screen">
      <div className="flex w-1/2 bg-white] rounded-lg overflow-hidden font-title shadow-2xl ">
        {/* Left Section - Form */}
        <div className="flex-1 p-10 flex flex-col">
          {/* Form Container */}
          <div className="max-w-md mx-auto">
            <h1 className="text-gray-800 text-2xl mb-2 text-center">
              Set a New Password
            </h1>
            <p className="text-gray-600 mb-8 text-center">
              Create a new password. Ensure it differs from previous ones for
              security
            </p>

            <Form
              name="setPass"
              onFinish={onFinish}
              className="space-y-6"
              initialValues={{ remember: true }}
            >
              {" "}
              {/* Email Field */}
              <div className="">
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <div>
                    <label className={` px-1 text-lg bg-white transition-all`}>
                      Email
                    </label>
                    <Input
                      placeholder="john.doe@gmail.com"
                      type="email"
                      className="w-full px-3 py-5 border border-[#3F5EAB] rounded-md focus:outline-none focus:ring-2 "
                    />
                  </div>
                </Form.Item>
              </div>
              {/* Password Field */}
              <div className=" pt-2">
                <Form.Item
                  name="password" // This binds the input to form state
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <div className="relative">
                    <label className=" px-1 text-lg bg-white">
                      New Password
                    </label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••••••••"
                      className="w-full px-3 py-5 border border-[#3F5EAB] rounded-md focus:outline-none focus:ring-2 "
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-16 right-0 pr-3 flex items-center -translate-y-1/2"
                    >
                      {showPassword ? (
                        <FaRegEyeSlash className="h-5 w-5 text-gray-400" />
                      ) : (
                        <IoEyeOutline className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </Form.Item>
              </div>
              {/*confirm Password Field */}
              <div className=" pt-2">
                <Form.Item
                  name="confirmPassword" // This binds the input to form state
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <div className="relative">
                    <label className=" px-1 text-lg bg-white">
                      Confirm Password
                    </label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••••••••"
                      className="w-full px-3 py-5 border border-[#3F5EAB] rounded-md focus:outline-none focus:ring-2 "
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-16 right-0 pr-3 flex items-center -translate-y-1/2"
                    >
                      {showPassword ? (
                        <FaRegEyeSlash className="h-5 w-5 text-gray-400" />
                      ) : (
                        <IoEyeOutline className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </Form.Item>
              </div>
              {/* Login Button */}
              <Form.Item>
                <button
                  type="submit"
                  className="w-full flex text-xl items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#3F5EAB] hover:bg-[#4a62a0] focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors"
                >
                  {loading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : null}
                  Update PassWord
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
