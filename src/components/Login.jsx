import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {

    console.log()

    try {
     const response = await axios.post("http://localhost:8000/api/auth/login-user",{
      email: data.email,
      password: data.password,
    },{ withCredentials: true });

        toast.success('Login SuccessFully', {
  duration: 4000,
  position: 'top-left'})

    navigate("/editor")

    console.log(response)
    console.log(data);
    } catch (error) {

          toast.error('Login Failed', {
  duration: 4000,
  position: 'top-left'})

      console.log("something went wrong in login user")
    }
    
  };
  return (
    <div className="h-screen w-screen bg-gray-300 flex justify-center items-center flex-col gap-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="h-[60%] w-1/3 bg-gray-700 flex justify-center relative flex-col gap-3 items-center rounded-xl">
        <h1 className="font-extrabold absolute text-4xl top-10 text-black">
          Login
        </h1>
        {errors.email && (
          <p className="text-red-500 text-xl">{errors.email.message}</p>
        )}
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
          type="text"
          placeholder="Enter Your Email"
          className=" pl-5 font-bold h-12 w-[60%] rounded-xl text-black"
        />
        {errors.password && (
          <p className="text-red-500 text-xl">{errors.password.message}</p>
        )}
        <input
          {...register("password", { required: "Password is Required" })}
          type="password"
          placeholder="Enter Your Password"
          
        
          className="h-12 w-[60%] rounded-xl text-black pl-5 font-bold"
        />
        <button
          type="submit"
          className="bg-black text-white h-16 active:scale-95 w-56 rounded-xl">
          Submit
        </button>

      <div> not registerd? click to <Link className="text-blue-400" to={"/register"}>Register</Link> </div>  
      </form>
    </div>
  );
}

export default Login;
