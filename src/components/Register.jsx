import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const navigate =    useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {

    console.log()

    try {
     const response = await axios.post("https://blog-backend-qvjh.onrender.com/api/auth/register-user",{
      name:data.name,
      email: data.email,
      password: data.password,
    },{ withCredentials: true });

    toast.success('Registered SuccessFully', {
  duration: 4000,
  position: 'top-left'})

navigate("/editor")

    console.log(response)
    console.log(data);
    } catch (error) {
      console.log("something went wrong in login user")
          toast.error('Registration Failed', {
  duration: 4000,
  position: 'top-left'})
    }
    
  };
  return (
    <div className="h-screen w-screen bg-stone-800 flex justify-center items-center flex-col gap-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="h-[60%] w-1/3 bg-gray-400 flex justify-center relative flex-col gap-3 items-center rounded-xl">
        <h1 className="font-extrabold absolute text-4xl top-10 text-black">
          Register
        </h1>
         {errors.name && (
          <p className="text-red-500 text-xl">{errors.name.message}</p>
        )}
        <input
          {...register("name", {
            required: "Name is required",
           
          })}
          type="text"
          placeholder="Enter Your FullName"
          className=" pl-5 font-bold h-12 w-[60%] rounded-xl text-black"
        />
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

      <div> already registerd? click to <Link className="text-blue-800" to={"/login"}>Login</Link> </div>  
      </form>
    </div>
  );
}

export default Register;
