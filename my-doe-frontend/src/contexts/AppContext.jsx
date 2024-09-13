import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import * as apiClient from "../api-client.js";
import { useQuery } from "react-query";
import LottieAnimation from "../components/Load.jsx";

/**
 * @typedef {Object} AppContext
 * @property {boolean} isLoggedIn
 */

const AppContext = createContext({ isLoggedIn: false });

export const AppContextProvider = ({ children }) => {
  const { isError, isLoading } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });
  if (isLoading) {
    return <LottieAnimation />;
  }
  return (
    <AppContext.Provider value={{ isLoggedIn: !isError }}>
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  /**
   * Handle form submission
   * @param {AppContext} context
   */
  return context;
};

