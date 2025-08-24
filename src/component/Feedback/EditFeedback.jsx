import { useForm } from "react-hook-form";
import { useSendFeedbackMutation } from "../../redux/feature/feedback/feedbackApi";
import { message } from "antd";

const EditFeedback = ({singleData}) => {
  const id = singleData?._id
    // console.log("single  data------>", singleData);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
const [sendFeedback] = useSendFeedbackMutation()
  const onSubmit = async (formValues) => {
console.log("form values------>",formValues);


    try {
      const res = await sendFeedback({args:formValues,id}).unwrap();
      console.log("response--->", res);
      if (res?.success) {
        message.success(res?.message);
      
        reset();
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      message.error(error?.data?.message);
    }
  };



  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-6 space-y-6"
        noValidate
      >
        <div>
          <label className="block mb-1 font-medium text-gray-700">Reply</label>
          <textarea
            {...register("replyMessage", { required: true })}
            placeholder="Type here"
            className="w-full border border-gray-300 rounded-md px-3 py-4"
          />
          {errors.replyMessage && (
            <p className="text-red-500 text-sm mt-1">reply is required</p>
          )}
        </div>

        <div className="  mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFeedback;
