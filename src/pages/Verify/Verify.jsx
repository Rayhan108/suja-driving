import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useResendOtpMutation, useVerifyOtpMutation } from "../../redux/feature/auth/authApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/feature/auth/authSlice";
import { message } from "antd";

export default function Verify() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm({
    mode: "onChange",
  });
    const [email, setEmail] = useState("");
      const [resendOtp] = useResendOtpMutation();
  const user = useAppSelector(selectCurrentUser);
  // console.log("user----->", user);
  const [verifyOtp] = useVerifyOtpMutation();

  const onSubmit = async (data) => {
    const verifyCode = `${data.digit1}${data.digit2}${data.digit3}${data.digit4}${data.digit5}${data.digit6}`;

    // console.log(data);
    const modifiedData = {
      email: data?.email,
      verifyCode: parseInt(verifyCode),
    };
    // console.log("verify otp data--->", modifiedData);
    // handle code verification here
    try {
  
      const res = await verifyOtp(modifiedData).unwrap();
      // console.log("verify otp response--->", res);
      if (res?.success) {
        message.success(res?.message);
        navigate("/passReset");
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  // Get the entered code values for visual feedback if needed
  const code = watch(["digit1", "digit2", "digit3", "digit4", "digit5"]);

  const handleResendPass = async () => {
        if (!email) {
      message.error("Please enter your email before requesting a resend.");
      return;
    }
    const data = {
      email: email,
    };
    try {
      const res = await resendOtp(data).unwrap();
      if (res?.success) {
        message.success(res?.message);
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      message.error(error?.data?.message);
    }
  };


  return (
    <div className="flex flex-col justify-center p-6 max-w-md mx-auto font-title min-h-screen items-center">
      <h2 className="text-lg font-semibold mb-2">Check Your Email</h2>
      <p className="text-center text-lg text-gray-600 mb-6">
        We sent a reset link to contact@dscode..com enter 6 digit code that
        mentioned in the email
      </p>

      <form
        className="flex flex-col w-full mb-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Email input */}
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: /^[^@]+@[^@]+\.[^@]+$/,
          })}
     onChange={(e) => setEmail(e.target.value)} 
          className="w-full h-10 mb-4 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
        />

        {/* OTP input */}
        <div className="flex justify-between w-full mb-6">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              {...register(`digit${i + 1}`, {
                required: true,
                pattern: /^[0-9]$/,
              })}
              className="w-10 h-10 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:border-blue-600"
              inputMode="numeric"
            />
          ))}
        </div>

        {/* Submit button */}

        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="bg-blue-600 text-white text-sm rounded-md px-5 py-2 w-full mb-4"
        >
          Verify Code
        </button>
      </form>

      <p className="text-xs text-gray-500">
        You have not received the email?{" "}
        <button
          type="button"
          className="text-blue-600 underline"
          onClick={() => handleResendPass()}
        >
          Resend
        </button>
      </p>
    </div>
  );
}
