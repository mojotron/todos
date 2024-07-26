import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="w-24">
      <Link to="/">
        <h1>
          <span className="font-mono text-sm text-white relative top-2">
            task tracker
          </span>
          <span className="uppercase font-display text-3xl bg-gradient-to-r from-green to-blue inline-block text-transparent bg-clip-text hover:from-blue hover:to-green transition-all ease-in-out duration-300">
            todos
          </span>
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
