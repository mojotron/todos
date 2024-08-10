import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
// components
import Button from "../ui/Button";
import InputError from "../ui/InputError";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { error, signupUser } = useSignup();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((oldValue) => ({ ...oldValue, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signupUser(formData);
  };

  return (
    <div className="w-full sm:w-[400px] mx-auto text-white px-4 py-6 rounded-md">
      <h2 className="font-display text-2xl">create new account</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex flex-col">
          <label htmlFor="username">username</label>
          <div className="p-[2px] rounded-md bg-gradient-to-r from-green to-blue">
            <input
              className="w-full rounded-md focus:outline-none bg-white text-gray-700 px-2 py-[3px]"
              type="text"
              id="username"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          {error && error.inputFieldsErrors.username && (
            <InputError message={error.inputFieldsErrors.username} />
          )}
        </div>

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
          {error && error.inputFieldsErrors.email && (
            <InputError message={error.inputFieldsErrors.email} />
          )}
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
          {error && error.inputFieldsErrors.password && (
            <InputError message={error.inputFieldsErrors.password} />
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmPassword">confirm password</label>
          <div className="p-[2px] rounded-md bg-gradient-to-r from-green to-blue">
            <input
              className="w-full rounded-md focus:outline-none bg-white text-gray-700 px-2 py-[3px]"
              type="password"
              id="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {error && error.inputFieldsErrors.confirmPassword && (
            <InputError message={error.inputFieldsErrors.confirmPassword} />
          )}
        </div>
        {error && error.errorName !== "form-validation" && (
          <InputError message={error.errorMessage} />
        )}

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
