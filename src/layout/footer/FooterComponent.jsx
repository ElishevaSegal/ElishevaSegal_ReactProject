import { Fragment, useState } from "react";
import { BottomNavigation, Divider } from "@mui/material";
import Links from "../header/ui/Links";

const FooterComponent = () => {
  const [value, setValue] = useState(0);
  return (
    <Fragment>
      <Divider></Divider>
      <BottomNavigation
        showLabels
        value={value}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "myblue.main",
          display: { xs: "none", md: "flex" },
        }}
        elevation={3}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      >
        <div
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Links />
        </div>
      </BottomNavigation>
    </Fragment>
  );
};

export default FooterComponent;
