import Hero from "../components/Hero";
import Header from "../components/Header";
import PropTypes from "prop-types";
import Footer from "../components/Footer";
import SignOutButton from "../components/SignOutButton";

const LayoutIn = ({ showHero, children }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {
        <Header>
          <SignOutButton />
        </Header>
      }
      {showHero && <Hero />}
      <div className="container mx-auto py-5 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

LayoutIn.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutIn;
