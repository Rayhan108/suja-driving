import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")).render(
  <StrictMode>
           <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>

    <ToastContainer/>
      <ConfigProvider>

    <RouterProvider router={router} />
      </ConfigProvider>
       </PersistGate>
       </Provider>
  </StrictMode>
);
