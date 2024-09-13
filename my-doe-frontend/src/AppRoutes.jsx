import Layout from "./layouts/Layout";
import { Navigate, Routes, Route } from "react-router-dom";
import App from "./App";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAppContext } from "./contexts/AppContext";
import LayoutIn from "./layouts/LayoutIn";
import Banner from "./components/Banner";
import RectangleVisualization from "./components/RectangleVisualization";
import DateTimePHVisualization from "./components/firstvisuals/DateTimePHVisualization";
import DateTimePHMVVisualization from "./components/firstvisuals/DateTimePHMVVisualization";
import PhPhmvTemperatureVisualization from "./components/firstvisuals/PhPhmvTemperatureVisualization";
import PhTemperatureVisualization from "./components/firstvisuals/pHTemperatureVisualization";
import PhPhmvVisualization from "./components/firstvisuals/PhPhmvVisualization";
import ProtectedRoute from "./contexts/ProtectedRoute";
import Notprotected from "./contexts/Notprotected";
import RectangleVisualization2 from "./components/RectangleVisualization2";
import RectangleVisualization3 from "./components/RectangleVisualization3";

const AppRoutes = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <LayoutIn showHero>
              <App />
            </LayoutIn>
          ) : (
            <Layout showHero Home>
              <Banner />
            </Layout>
          )
        }
      ></Route>
      <Route element={<Notprotected />}>
        <Route
          path="sign-in"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        ></Route>
        <Route
          path="sign-up"
          element={
            <Layout Home>
              <Register />
            </Layout>
          }
        ></Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />}></Route>

      <Route element={<ProtectedRoute />}>
        <Route
          path="/prev1"
          element={
            <LayoutIn showHero>
              <RectangleVisualization />
            </LayoutIn>
          }
        ></Route>
        <Route
          path="/prev2"
          element={
            <LayoutIn showHero>
              <RectangleVisualization2 />
            </LayoutIn>
          }
        ></Route>
        <Route
          path="/prev3"
          element={
            <LayoutIn showHero>
              <RectangleVisualization3 />
            </LayoutIn>
          }
        ></Route>
        <Route
          path="/datetime-ph1"
          element={
            <LayoutIn showHero>
              <DateTimePHVisualization />
            </LayoutIn>
          }
        ></Route>
        <Route
          path="/datetime-phmv1"
          element={
            <LayoutIn showHero>
              <DateTimePHMVVisualization />
            </LayoutIn>
          }
        ></Route>
        <Route
          path="/pHmvTemperature-visualization1"
          element={
            <LayoutIn showHero>
              <PhPhmvTemperatureVisualization />
            </LayoutIn>
          }
        ></Route>
        <Route
          path="/pHmv-visualization1"
          element={
            <LayoutIn showHero>
              <PhPhmvVisualization />
            </LayoutIn>
          }
        ></Route>
        <Route
          path="/pHTemperature-visualization1"
          element={
            <LayoutIn showHero>
              <PhTemperatureVisualization />
            </LayoutIn>
          }
        ></Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
