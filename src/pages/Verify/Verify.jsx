import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function Verify() {
  const navigate = useNavigate()
  const { register, handleSubmit, watch } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log(data);
    // handle code verification here
    navigate("/passReset")
  };

  // Get the entered code values for visual feedback if needed
  const code = watch(['digit1', 'digit2', 'digit3', 'digit4', 'digit5']);

  return (
    <div className="flex flex-col justify-center p-6 max-w-md mx-auto font-title min-h-screen items-center">
      <h2 className="text-lg font-semibold mb-2">Check Your Email</h2>
      <p className="text-center text-lg text-gray-600 mb-6">
        We sent a reset link to  contact@dscode..com
        enter 5 digit code that mentioned in the email
      </p>

      <form className="flex justify-between w-full mb-6" onSubmit={handleSubmit(onSubmit)}>
        {[...Array(5)].map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            {...register(`digit${i + 1}`, { required: true, pattern: /^[0-9]$/ })}
            className="w-10 h-10 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:border-blue-600"
            inputMode="numeric"
          />
        ))}
      </form>

      <button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        className="bg-blue-600 text-white text-sm rounded-md px-5 py-2 w-full mb-4"
      >
        Verify Code
      </button>

      <p className="text-xs text-gray-500">
        You have not received the email?{' '}
        <button
          type="button"
          className="text-blue-600 underline"
          onClick={() => alert('Resend email clicked')}
        >
          Resend
        </button>
      </p>
    </div>
  );
}
