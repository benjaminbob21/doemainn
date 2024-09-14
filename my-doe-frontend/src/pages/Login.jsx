import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client.js";
import { toast } from "sonner";

/**
 * @typedef {Object} SignInFormData
 * @property {string} email
 * @property {string} password
 */

/**
 * Register component
 * @returns {JSX.Element}
 */

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      console.log("User has been signed");
      toast.success("Signed In!");
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });

  /**
   * Handle form submission
   * @param {SignInFormData} data
   */

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className="flex flex-col gap-5 px-32 py-32" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Login</h2>
      <label className="text-gray-700 text-sm font-bold">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.firstName.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.firstName.message}</span>
        )}
      </label>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <span>Not yet registered? </span>
          <span>
            <Link to="/sign-up">
              <u>Sign up here</u>
            </Link>
          </span>
        </div>
        <button
          type="submit"
          className="bg-blue-600 p-2 text-white font-bold hover:bg-blue-400 text-xl"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default Login;
