import { useState } from "react";
import { Input, Form, message } from "antd";
import gallery from "../../assets/gallery.png";
import profile from "../../assets/profileImg.png";
import { SlArrowLeft } from "react-icons/sl";
import ChangePass from "./ChangePass";

const UpdateProfile = () => {
  const [activeTab, setActiveTab] = useState("edit");
  const [profileImg, setProfileImg] = useState(profile); // initial profile image
  const onFinish = (values) => {
    console.log("Form values:", values);
    message.success("Profile updated successfully!");
  };

  // file input change handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // read file as data URL to preview
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-5 my-3">
        <SlArrowLeft className="w-5 h-5 text-right text-[#3564d3]" />
        <p className="text-[#3564d3] font-title text-3xl font-bold">Profile</p>
      </div>

      <div style={{ maxWidth: 400, margin: "auto" }}>
        <div>
          <div className="relative text-center items-center justify-center flex">
            <div>
              <img src={profileImg} alt="Profile" className="w-36" />
            </div>
            <div className="absolute top-20 left-[224px]">
              {/* label for hidden input */}
              <label htmlFor="fileInput" className="bg-[#3564d3] w-12 h-12 rounded-full relative cursor-pointer flex items-center justify-center">
                <img
                  src={gallery}
                  alt=""
                  className="text-white text-3xl w-7"
                />
              </label>
              {/* hidden file input */}
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
          <p className="text-[#3564d3] text-center font-title my-3">
            Israa Khan
          </p>

          <div className="flex gap-12 justify-center mt-12">
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

        {activeTab === "edit" && (
          <Form
            name="profile-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
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
            <ChangePass />
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
