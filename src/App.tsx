import { BrowserRouter } from "react-router-dom";
import BaseLayout from "./components/BaseLayout";
import useAuthStore from "./store/AuthStore";
import RouteSignIn from "./routes/signin";

declare global {
  interface Window {
    __TAURI__: unknown;
  }
}

function App() {
  const authStore = useAuthStore();

  if (!authStore?.userInfo) {
    return (
      <RouteSignIn />
    )
  }

  return (
    <BrowserRouter>
      <BaseLayout />
    </BrowserRouter>
  );
}

export default App;
