import { Link } from "react-router-dom";

export const SignIn = () => {
  return (
    <span className="flex space-x-2">
      <Link
        to="/sign-in"
        className="flex items-center text-blue-600 bg-white px-3 font-bold tracking-tight hover:bg-gray-100"
      >
        Sign In
      </Link>
    </span>
  );
}

export const SignUp = () => {
  return(<span className="flex space-x-2">
          <Link
            to="/sign-up"
            className="flex items-center text-blue-600 bg-white px-3 font-bold hover:bg-gray-100"
          >
            Sign Up
          </Link>
        </span>)
}
