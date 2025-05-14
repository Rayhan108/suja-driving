
import {
    createBrowserRouter,
  } from "react-router-dom";






import Main from "../layout/Main";
import Signin from "../pages/SignIn/SignIn";
import Verify from "../pages/Verify/Verify";
import ForgotPass from "../pages/ForgotPass/ForgotPass";
import SetPass from "../pages/SetPass/SetPass";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import UserManagement from "../pages/UserManagement/UserManagement";
import TheoryManagement from "../pages/TheoryManagement/TheoryManagement";
import TheoryManagementTopic from "../pages/TheoryManagement/TheoryManagementTopic";

  
  const router = createBrowserRouter([
    {
      path: "/sign-in",
      element: <Signin />,
    },
    {
      path: "/validation",
      element: <Verify />,
    },
    {
      path: "/forget-password",
      element: <ForgotPass/>,
    },
    {
      path: "/setPass",
      element: <SetPass/>,
    },
    {
        path: "/",
        element: <Main></Main>,
        // errorElement: <ErrorPage></ErrorPage>,
        children: [
          {
            path: "/",
            element: <DashboardPage/>,
          },
          {
            path: "/userManagement",
            element: <UserManagement/>,
          },
          {
            path: "/theoryManagement/category",
            element: <TheoryManagement/>,
          },
          {
            path: "/theoryManagement/topic",
            element: <TheoryManagementTopic/>,
          },
         
        ]
    },

  ]);
  export default router;