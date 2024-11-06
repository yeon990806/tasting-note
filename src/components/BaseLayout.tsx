import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import AppBar from "./AppBar";
import RouteHome from "../routes/home";
import RouteSetting from "../routes/setting";
import { css } from "@emotion/css";
import AppFooter from "./AppFooter";

const BaseLayoutStyle = css`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const MainStyle = css`
  height: 100%;
`;

const BaseLayout = () => {
  return (
    <div className={BaseLayoutStyle}>
      <AppBar />
      <main className={MainStyle}>
        <Link to="/">Home</Link>
        <Link to="/setting">Setting</Link>
        <Routes>
          <Route path="/" element={<RouteHome />} />
          <Route path="/setting" element={<RouteSetting />} />
        </Routes>
      </main>
      <AppFooter />
    </div>
  );
};
export default BaseLayout;