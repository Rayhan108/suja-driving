import { Input, Form, message } from "antd";
import { useState } from "react";
import gallery from "../../assets/gallery.png";
import profile from "../../assets/profileImg.png";
import { SlArrowLeft } from "react-icons/sl";
import ChangePass from "./ChangePass";

const UpdateProfile = () => {
  const [activeTab, setActiveTab] = useState("edit"); 
console.log(activeTab);
  const onFinish = (values) => {
    console.log("Form values:", values);
    message.success("Profile updated successfully!");
  };

  return (
    <div>
      <div className="flex items-center gap-5 my-3">
        <SlArrowLeft className="w-5 h-5 text-right text-[#3564d3]" />
        <p className="text-[#3564d3] font-title text-3xl font-bold">Profile</p>
      </div>

      <div style={{ maxWidth: 400, margin: "auto" }}>
        {/* Profile Picture Section */}
        <div>
          <div className="relative text-center items-center justify-center flex">
            <div>
              <img src={profile} alt="Profile" className="w-36" />
            </div>
            <div className="absolute top-20 left-[224px]">
              <div className="bg-[#3564d3] w-12 h-12 rounded-full relative">
                <img
                  src={gallery}
                  alt=""
                  className="text-white text-3xl left-2.5 top-2.5 absolute w-7"
                />
              </div>
            </div>
          </div>
          <p className="text-[#3564d3] text-center font-title my-3">
            Israa Khan
          </p>

          {/* Tabs */}
          <div className="flex gap-12 justify-center">
            <button
              onClick={() => setActiveTab("edit")}
              className={`text-center font-title my-3 underline text-lg ${
                activeTab === "edit" ? "text-blue-600 font-bold" : "text-[#313131]"
              }`}
            >
              Edit Profile
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`text-center font-title my-3 underline text-lg ${
                activeTab === "password" ? "text-blue-600 font-bold" : "text-[#313131]"
              }`}
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Conditionally Rendered Forms */}
        {activeTab === "edit" && (
          <Form
            name="profile-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            {/* Name Input */}
            <div className="mt-3">
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Please input your Name!" },
                ]}
              >
                <div>
                  <label className="px-1 text-lg">Name</label>
                  <Input
                    placeholder="Name..."
                    type="text"
                    className="w-full px-3 py-3 rounded-xl border border-[#3564d3] focus:outline-none focus:ring-2"
                  />
                </div>
              </Form.Item>
            </div>

            {/* Email Input */}
            <div className="mt-3">
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <div>
                  <label className="px-1 text-lg">Email</label>
                  <Input
                    placeholder="israakhan@gmail.com"
                    type="email"
                    className="w-full px-3 py-5 border border-[#3564d3] rounded-xl focus:outline-none focus:ring-2"
                  />
                </div>
              </Form.Item>
            </div>

            {/* Save Button */}
            <Form.Item>
              <button
                type="submit"
                className="w-full text-xl py-3 px-4 rounded-xl text-white bg-[#3564d3] hover:bg-[#5780df] transition-colors"
              >
                Save Changes
              </button>
            </Form.Item>
          </Form>
        )}

        {activeTab === "password" && (
          <div className="mt-5 text-center text-[#313131] font-title">
          <ChangePass/>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
