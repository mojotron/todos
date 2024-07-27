import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import InputError from "../ui/InputError";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { error, loginUser } = useLogin();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((oldValue) => ({ ...oldValue, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginUser(formData);
  };

  return (
    <div className="w-full sm:w-[400px] text-white px-4 py-6 rounded-md">
      <h2 className="font-display text-2xl">create new account</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex flex-col">
          <label htmlFor="username">email</label>
          <div className="p-[2px] rounded-md bg-gradient-to-r from-green to-blue">
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
          <div className="p-[2px] rounded-md bg-gradient-to-r from-green to-blue">
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

        {error && <InputError message={error?.errorMessage} />}

        <div className="flex justify-center">
          <Button type="submit">Login</Button>
        </div>
      </form>
      <div className="space-x-1">
        <span>Don't have an account?</span>
        <Link
          to="/signup"
          className="text-green hover:text-blue hover:underline"
        >
          Signup
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
