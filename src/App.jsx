import { Box, LinearProgress } from "@mui/material";
import LayoutComponent from "./layout/LayoutComponent";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Routes from "./routes/Router";
import { useEffect, useState } from "react";
import useAutoLogin from "./hooks/useAutoLogin";

const App = () => {
  const [doneAuth, setDoneAuth] = useState(false);
  const autoLogin = useAutoLogin();
  useEffect(() => {
    (async () => {
      try {
        await autoLogin();
      } catch (err) {
        console.log(err);
      } finally {
        setDoneAuth(true);
      }
    })();
  }, []);

  return (
    <Box>
      <LayoutComponent>
        <ToastContainer />
        {doneAuth ? <Routes /> : <LinearProgress />}
      </LayoutComponent>
    </Box>
  );
};

export default App;
