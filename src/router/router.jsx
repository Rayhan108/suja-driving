import { createBrowserRouter } from "react-router-dom";

import Main from "../layout/Main";
import Signin from "../pages/SignIn/Signin";
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
import Subscription from "../pages/Subscription/Subscription";
import Feedback from "../pages/Feedback/Feedback";
import Analytics from "../pages/Analytics/Analytics";
import UpdateProfile from "../pages/Profile/UpdateProfile";
import Terms from "../pages/Terms/Terms";
import Privacy from "../pages/Privacy/Privacy";
import PassReset from "../pages/PassReset/PassReset";
import NotificationPage from "../pages/Notification/NotificationPage";
import NotificationDetails from "../pages/Notification/NotificationDetails";

const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <Signin />,
  },
  {
    path: "/verify",
    element: <Verify />,
  },
  {
    path: "/passReset",
    element: <PassReset />,
  },
  {
    path: "/forget-password",
    element: <ForgotPass />,
  },
  {
    path: "/setPass",
    element: <SetPass />,
  },
  {
    path: "/",
    element: <Main></Main>,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/userManagement",
        element: <UserManagement />,
      },
      {
        path: "/theoryManagement",
        element: <TheoryManagement />,
      },
      {
        path: "/theoryManagement/category",
        element: <TheoryManagement />,
      },
      {
        path: "/theoryManagement/topic/:id",
        element: <TheoryManagementTopic />,
      },
      {
        path: "/theoryManagement/question",
        element: <QuestionManagement />,
      },
      {
        path: "/adiTheoryManagement",
        element: <AdiTheoryManagement />,
      },
      {
        path: "/adiTheoryManagement/category",
        element: <AdiTheoryManagement />,
      },
      {
        path: "/adiTheoryManagement/topic/:id",
        element: <AdiTheoryManagementTopic />,
      },
      {
        path: "/adiTheoryManagement/question",
        element: <AdiQuestionManagement />,
      },
      {
        path: "/hazard",
        element: <HazardPage />,
      },
      {
        path: "/highway",
        element: <HighwayPage />,
      },
      {
        path: "/testScore",
        element: <TestScore />,
      },
      {
        path: "/subscription",
        element: <Subscription />,
      },
      {
        path: "/feedback",
        element: <Feedback />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
      {
        path: "/setting/updateProfile",
        element: <UpdateProfile />,
      },
      {
        path: "/setting/terms",
        element: <Terms />,
      },
      {
        path: "/setting/privacy",
        element: <Privacy />,
      },
            {
            path: "/notification",
            element: <NotificationPage/>,
          },
         {
            // Dynamic route for client details
            path: "/notification/:id",
            element: <NotificationDetails />, 
          },
    ],
  },
]);
export default router;
