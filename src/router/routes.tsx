import IndexPage from "../pages";
import AppPage from "../pages/app";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";

export const authRoutes = [
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/app",
    element: <AppPage />,
  }
]

export const appRoutes = [...authRoutes]