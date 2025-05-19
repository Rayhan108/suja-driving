
import { useForm } from 'react-hook-form';

const EditSubscription = () => {
      const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm ();
    
      const onSubmit = (data) => {
        console.log("Form Data:", data);
        reset();
      };
    
      const onCancel = () => {
        reset();
      };
    return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-6 space-y-6 font-title"
        noValidate
      >
        <div>
          <label className="block mb-1 font-medium text-gray-700">
        Subscription Name
          </label>
          <input
            {...register("name", { required: true })}
            placeholder="Subscription Name..."
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
            Subscription Name is required
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
         Subscription Fee
          </label>
          <input
            {...register("fee", { required: true })}
            
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.fee && (
            <p className="text-red-500 text-sm mt-1">
              Fee is required
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
        Description
          </label>
          <input
            {...register("description", { required: true })}
            placeholder='50'
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              Description is required
            </p>
          )}
        </div>


     
        <div className="flex gap-12  mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="w-full px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100 "
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </form>
    </div>
    );
};

export default EditSubscription;