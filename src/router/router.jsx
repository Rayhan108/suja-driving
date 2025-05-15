
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
import QuestionManagement from "../pages/TheoryManagement/QuestionManagement";
import AdiTheoryManagement from "../pages/AdiTheoryManagement/AdiTheoryManagement";
import AdiTheoryManagementTopic from "../pages/AdiTheoryManagement/AdiTheoryMangementTopic";
import AdiQuestionManagement from "../pages/AdiTheoryManagement/AdiQuestionManagement";
import HazardPage from "../pages/Hazard/HazardPage";
import HighwayPage from "../pages/Highway/HighwayPage";
import TestScore from "../pages/TestScore/TestScore";

  
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
            path: "/theoryManagement",
            element: <TheoryManagement/>,
          },
          {
            path: "/theoryManagement/category",
            element: <TheoryManagement/>,
          },
          {
            path: "/theoryManagement/topic",
            element: <TheoryManagementTopic/>,
          },
          {
            path: "/theoryManagement/question",
            element: <QuestionManagement/>,
          },
          {
            path: "/adiTheoryManagement",
            element: <AdiTheoryManagement/>,
          },
          {
            path: "/adiTheoryManagement/category",
            element: <AdiTheoryManagement/>,
          },
          {
            path: "/adiTheoryManagement/topic",
            element: <AdiTheoryManagementTopic/>,
          },
          {
            path: "/adiTheoryManagement/question",
            element: <AdiQuestionManagement/>,
          },
          {
            path: "/hazard",
            element: <HazardPage/>,
          },
          {
            path: "/highway",
            element: <HighwayPage/>,
          },
          {
            path: "/testScore",
            element: <TestScore/>,
          },
         
        ]
    },

  ]);
  export default router;