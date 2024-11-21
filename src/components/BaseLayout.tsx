import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import { css } from "@emotion/css";
import AppBar from "./AppBar";
import AppFooter from "./AppFooter";
import RouteHome from "../routes/home";
import RouteSetting from "../routes/setting";
import useAuthStore from "../store/AuthStore";

const BaseLayoutStyle = css`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const MainStyle = css`
  height: 100%;
  display: flex;
  flex-direction: column;

  section {
    flex: 1;
    padding: 16px;
    box-sizing: border-box;
  }
`;

const BaseLayout = () => {
  const authStore = useAuthStore();

  if (!authStore?.userInfo?.displayName) 

  return (
    <div className={BaseLayoutStyle}>
      <AppBar />
      <main className={MainStyle}>
        { authStore?.userInfo && <div>
          <Link to="/">Home</Link>
          <Link to="/setting">Setting</Link>
        </div> }
        <Routes>
          <Route path="/" element={<RouteHome />} />
          <Route path="/setting" element={<RouteSetting />} />
        </Routes>
      </main>
      <AppFooter />
      <div id="modal" />
    </div>
  );
};
export default BaseLayout;