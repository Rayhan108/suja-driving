import { useState } from "react";
import { Form, Input, Checkbox, Divider, Typography, message } from "antd";

import { Link, useNavigate } from "react-router-dom";
import { useSendOtpMutation } from "../../redux/feature/auth/authApi";



const ForgotPass = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
const [sendOtp] =useSendOtpMutation()
  const onFinish = async(values) => {
    console.log("Form submitted:", values); // Display form values in the console
    setLoading(true);
    try {
      const res = await sendOtp(values).unwrap()

      console.log("response------->",res);
 
      if(res?.success){
        message.success(res?.message)
        setLoading(false)
        navigate('/verify')
      }else{
        message.error(res?.message)
        setLoading(false)
      }
    } catch (error) {
      console.log("login error",error)
         message.error(error?.data?.message)
           setLoading(false)
    }
 

  };
  return (
    <div  className="flex flex-col justify-center min-h-screen">
      <div className=" py-36 max-w-md mx-auto font-title  items-center bg-white shadow-xl p-12">
        {/* Left Section - Form */}
        <div className="flex-1 p-10 flex flex-col">
     
          {/* Form Container */}
          <div className="max-w-md mx-auto">
            <h1 className="text-gray-800 text-2xl mb-2 text-center">
            Forget Password?
            </h1>
            <p className="text-gray-600 mb-8 text-center">
           Please enter your email to continue
            </p>

            <Form
              name="forgotPass"
              onFinish={onFinish}
              className="space-y-6"
              initialValues={{ remember: true }}
            >
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
                Send a Code
                </button>
              </Form.Item>
            </Form>

  
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
