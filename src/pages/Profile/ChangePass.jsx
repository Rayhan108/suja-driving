import { Input, Form, message } from "antd";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react";

const ChangePass = () => {
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const onFinish = (values) => {
    console.log("Form values:", values);
    message.success("Profile updated successfully!");
  };

  return (
    <div>
      <h1 className="text-xl mb-5">Change Password</h1>

      <Form
        name="profile-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        {/* Old Password */}
        <Form.Item
          name="old-password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <div className="relative text-left">
            <label className="px-1 text-lg">Old Password</label>
            <Input
              type={oldPasswordVisible ? "text" : "password"}
              placeholder="••••••••••••••••••"
              className="w-full px-3 py-3 border border-[#3564d3] rounded-xl focus:outline-none focus:ring-2"
            />
            <button
              type="button"
              onClick={() => setOldPasswordVisible(!oldPasswordVisible)}
              className="absolute inset-y-0 right-0 top-8 pr-3 flex items-center"
            >
              {oldPasswordVisible ? (
                   <IoEyeOutline className="h-5 w-5 text-gray-400" />
            
              ) : (
                 <FaRegEyeSlash className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </Form.Item>

        {/* New Password */}
        <Form.Item
          name="new-password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <div className="relative text-left">
            <label className="px-1 text-lg">New Password</label>
            <Input
              type={newPasswordVisible ? "text" : "password"}
              placeholder="••••••••••••••••••"
              className="w-full px-3 py-3 border border-[#3564d3] rounded-xl focus:outline-none focus:ring-2"
            />
            <button
              type="button"
              onClick={() => setNewPasswordVisible(!newPasswordVisible)}
              className="absolute inset-y-0 right-0 top-8 pr-3 flex items-center"
            >
              {newPasswordVisible ? (
                   <IoEyeOutline className="h-5 w-5 text-gray-400" />
            
              ) : (
                 <FaRegEyeSlash className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          name="confirm-password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <div className="relative text-left">
            <label className="px-1 text-lg">Confirm Password</label>
            <Input
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="••••••••••••••••••"
              className="w-full px-3 py-3 border border-[#3564d3] rounded-xl focus:outline-none focus:ring-2"
            />
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="absolute inset-y-0 right-0 top-8 pr-3 flex items-center"
            >
              {confirmPasswordVisible ? (
                   <IoEyeOutline className="h-5 w-5 text-gray-400" />
            
              ) : (
                 <FaRegEyeSlash className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </Form.Item>

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
  );
};

export default ChangePass;
