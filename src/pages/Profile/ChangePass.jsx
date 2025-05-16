import {  Input, Form, message } from "antd";

import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react";

const ChangePass = () => {
  const [showPassword, setShowPassword] = useState(false);
  const onFinish = (values) => {
    console.log("Form values:", values);
    message.success("Profile updated successfully!");
  };
  return (
    <div>
  <h1 className="text-xl">Change Password</h1>
      <div >


        {/* Form */}
        <Form
          name="profile-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          {/* old pass Input */}
          <div className=" pt-2 text-start">
            <Form.Item
              name="old-password" // This binds the input to form state
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <div className="">
                <label className=" px-1 text-lg "> Old Password</label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••••••••"
                  className="w-full px-3 py-3 border border-[#3564d3] rounded-xl focus:outline-none focus:ring-2 "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 top-8 pr-3 flex items-center"
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
          {/* new pass Input */}
          <div className=" pt-2 text-start">
            <Form.Item
              name="new-password" // This binds the input to form state
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <div className="">
                <label className=" px-1 text-lg">New Password</label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••••••••"
                  className="w-full px-3 py-3 border border-[#3564d3] rounded-xl focus:outline-none focus:ring-2 "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 top-8 pr-3 flex items-center"
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
          {/* confirm password */}
          <div className="text-start pt-2">
            <Form.Item
              name="confirm-password" // This binds the input to form state
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <div className="">
                <label className=" px-1 text-lg">Confirm Password</label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••••••••"
                  className="w-full px-3 py-3 border border-[#3564d3] rounded-xl focus:outline-none focus:ring-2 "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 top-8 pr-3 flex items-center"
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
          {/* Save Button */}
          <Form.Item>
            <button
              type="submit"
              className="w-full flex text-xl items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-white bg-[#3564d3] hover:bg-[#5272bb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
            >
              Save Changes
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePass;
