import Hero from "../components/Hero";
import Header from "../components/Header";
import PropTypes from "prop-types";
import Footer from "../components/Footer";
import { SignIn, SignUp } from "../components/LogSign";
import Whero from "../components/Whero";

const Layout = ({ showHero, Home, children }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {Home ? (
        <Header>
          <SignIn />
        </Header>
      ) : (
        <Header>
          <SignUp />
        </Header>
      )}
      {showHero && (
        <>
          <Hero />
          <Whero />
        </>
      )}
      <div className="container mx-auto py-5 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
