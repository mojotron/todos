import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((oldValue) => ({ ...oldValue, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" bg-gray-700 text-white px-4 py-6 rounded-md">
      <h2 className="font-display text-2xl">create new account</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex flex-col">
          <label htmlFor="username">username</label>
          <div className="p-[2px] rounded-md max-w-sm bg-gradient-to-r from-green to-blue">
            <input
              className="w-full rounded-md focus:outline-none bg-white text-gray-700 px-2 py-[3px]"
              type="text"
              id="username"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="username">email</label>
          <div className="p-[2px] rounded-md max-w-sm bg-gradient-to-r from-green to-blue">
            <input
              className="w-full rounded-md focus:outline-none bg-white text-gray-700 px-2 py-[3px]"
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="username">password</label>
          <div className="p-[2px] rounded-md max-w-sm bg-gradient-to-r from-green to-blue">
            <input
              className="w-full rounded-md focus:outline-none bg-white text-gray-700 px-2 py-[3px]"
              type="password"
              id="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmPassword">confirm password</label>
          <div className="p-[2px] rounded-md max-w-sm bg-gradient-to-r from-green to-blue">
            <input
              className="w-full rounded-md focus:outline-none bg-white text-gray-700 px-2 py-[3px]"
              type="password"
              id="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button type="submit">Signup</Button>
        </div>
      </form>
      <div className="space-x-1">
        <span>Already have an account?</span>
        <Link
          to="/login"
          className="text-green hover:text-blue hover:underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
