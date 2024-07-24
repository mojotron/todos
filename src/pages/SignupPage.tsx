import { ChangeEvent, FormEvent, useState } from "react";

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-full md:max-w-[600px] md:border border-neutral-400 px-8 py-12">
      <h2>create new account</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="username">username</label>
          <input
            className="border border-neutral-300"
            type="text"
            id="username"
            required
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="username">email</label>
          <input
            className="border border-neutral-300"
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="username">password</label>
          <input
            className="border border-neutral-300"
            type="password"
            id="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmPassword">confirm password</label>
          <input
            className="border border-neutral-300"
            type="password"
            id="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          type="submit"
        >
          Signup
        </button>
      </form>
      <div className="flex items-center gap-1">
        <p>Already have an account?</p>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Login
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
