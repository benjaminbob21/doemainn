import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ children }) => {
  return (
    <div className=" bg-blue-600">
      <div className="container mx-auto flex justify-between text-white py-3">
        <h1 className="text-3xl font-bold">
          <Link to="/" className="tracking-tighter">AquaTrack.com</Link>
        </h1>
        {children}
      </div>
    </div>
  );
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
