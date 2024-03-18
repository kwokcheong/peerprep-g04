import "./styles/input.css";
import { NavBar } from "./components/common/NavBar";
import { Outlet } from "react-router-dom";
import { CustomFooter } from "./components/common/Footer";
import { AuthProvider } from "./components/common/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ToastContainer />
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex flex-grow justify-center">
              <Outlet />
            </div>
            <div className="mt-5">
              <CustomFooter />
            </div>
          </div>
        </AuthProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
