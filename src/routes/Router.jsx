import { Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../pages/home/HomePage";
import RegisterPage from "../pages/register/RegisterPage";
import Error404Page from "../pages/404/ErrorPage";
import LoginPage from "../pages/login/LoginPage";
import EditCardPage from "../pages/EditCardPage/EditCardPage";
import CreateCard from "../pages/CreateCardPage/CreateComponent";
import AuthGuard from "../Guard/AuthGuard";
import BizGuard from "../Guard/BizGuard";
import FavoritePage from "../pages/FavoritePage/FavoritePage";
import Logout from "../pages/logout/Logout";
import MyCardPage from "../pages/myCard/MyCardPage";
import ProfilePage from "../pages/profilePage/ProfilePage";
import AllUsersPage from "../pages/Sandbox/AllUsersPage";
import AdminGuard from "../Guard/AdminGuard";
import EditUsersPage from "../pages/Sandbox/EditUsersPage";
import AboutPage from "../pages/AboutPage/AboutePage";
import EditProfile from "../pages/profilePage/EditProfile";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.LOGOUT} element={<Logout />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route
        path={`${ROUTES.EDITCARD}/:_id`}
        element={
          <BizGuard>
            <EditCardPage />
          </BizGuard>
        }
      />
      <Route
        path={ROUTES.MYCARD}
        element={
          <BizGuard>
            <MyCardPage />
          </BizGuard>
        }
      />
      <Route
        path={ROUTES.CREATECARD}
        element={
          <BizGuard>
            <CreateCard />
          </BizGuard>
        }
      />

      <Route
        path={ROUTES.USERS}
        element={
          <AdminGuard>
            <AllUsersPage />
          </AdminGuard>
        }
      />
      <Route path={`${ROUTES.EDITUSERS}/:userId`} element={<EditUsersPage />} />
      <Route
        path={ROUTES.FAVORITE}
        element={
          <AuthGuard>
            <FavoritePage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.EDITPROFILE}
        element={
          <AuthGuard>
            <EditProfile />
          </AuthGuard>
        }
      />

      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
};
export default Router;
