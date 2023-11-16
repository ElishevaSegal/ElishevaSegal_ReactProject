import { useSelector } from "react-redux";

const IconsGuard = ({ children }) => {
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  if (userData && (userData.isBusiness || userData.isAdmin)) {
    return children;
  } else {
    return;
  }
};

export default IconsGuard;
