import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { useState } from "react";
import IconsGuard from "../Guard/IconsGuard";
import LoggedOutGuard from "../Guard/LoggedOutGuard";
import axios from "axios";
import { toast } from "react-toastify";
import { ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CardComponent = ({
  _id,
  title,
  subTitle,
  phone,
  likes,
  address,
  email,
  description,
  date,
  bizNumber,
  img,
  alt,
  like,
  cardNumber,
  onDeleteCard,
  onLikeCard,
  onEditCard,
  onLikeSuccess,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [thisOP, setOP] = useState("1");
  const handlePhoneClick = () => {
    toast.info(`Phone Num:${phone}. `, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  const handleDeleteCardClick = () => {
    onDeleteCard(_id);
  };
  const handleClickEditCard = () => {
    onEditCard(_id);
  };
  const handleLikeCard = async () => {
    try {
      const { data } = await axios.patch("/cards/" + _id);

      onLikeSuccess(_id);
    } catch (err) {}
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (thisOP === "0.6") {
      setOP("1");
    } else {
      setOP("0.6");
    }
  };
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" image={img} alt={alt} />
      </CardActionArea>
      <CardContent>
        <CardHeader
          title={title}
          subheader={subTitle}
          sx={{ p: 0, mb: 1, textTransform: "capitalize" }}
        />
        <Divider />
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Phone:{" "}
            </Typography>
            {phone}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Address:{" "}
            </Typography>
            {address}
          </Typography>
        </Box>
        <Divider />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph sx={{ fontWeight: "bold" }}>
              Email: <br />
              <span style={{ fontWeight: "300" }}>{email} </span>
            </Typography>
            <Typography paragraph sx={{ fontWeight: "bold" }}>
              Business Number: <br />
              <span style={{ fontWeight: "300" }}>{bizNumber} </span>
            </Typography>
            <Typography paragraph sx={{ fontWeight: "bold" }}>
              description: <br />
              <span style={{ fontWeight: "300" }}>{description} </span>
            </Typography>
            <Typography paragraph sx={{ fontWeight: "bold" }}>
              Card Date Created: <br />
              <span style={{ fontWeight: "300" }}>{date}</span>
            </Typography>
          </CardContent>
        </Collapse>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <IconButton
              sx={{
                padding: { xs: "4px" },
                paddingTop: { xs: "12px" },
              }}
              onClick={handlePhoneClick}
            >
              <PhoneIcon />
            </IconButton>
            <IconsGuard>
              <IconButton
                sx={{ padding: { xs: "4px" }, paddingTop: { xs: "12px" } }}
                onClick={handleClickEditCard}
              >
                <CreateIcon />
              </IconButton>
            </IconsGuard>
          </Box>
          <ExpandMore
            onClick={handleExpandClick}
            aria-label="show more"
            sx={{
              marginTop: "12px",
              bgcolor: "primary",
              border: "2px solid gray",
              borderRadius: "20px",
              width: "20%",
            }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
          <Box>
            <LoggedOutGuard>
              <IconsGuard>
                <IconButton
                  sx={{ padding: { xs: "4px" }, paddingTop: { xs: "12px" } }}
                  onClick={handleDeleteCardClick}
                >
                  <DeleteIcon />
                </IconButton>
              </IconsGuard>
            </LoggedOutGuard>
            <LoggedOutGuard>
              <IconButton
                sx={{ padding: { xs: "4px" }, paddingTop: { xs: "12px" } }}
                onClick={handleLikeCard}
              >
                <FavoriteIcon color={like ? "favActive" : ""} />
              </IconButton>
            </LoggedOutGuard>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
CardComponent.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  img: PropTypes.string,
  alt: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  email: PropTypes.string,
  bizNumber: PropTypes.number,
  like: PropTypes.bool,
  cardNumber: PropTypes.number,
  onDeleteCard: PropTypes.func.isRequired,
  onEditCard: PropTypes.func.isRequired,
  onLikeCard: PropTypes.func.isRequired,
  onLikeSuccess: PropTypes.func.isRequired,
};
CardComponent.defaultProps = {
  img: "https://www.livemint.com/lm-img/img/2023/08/14/1600x900/garena_free_fire_max_1688877791610_1691982307589.jpg",
  alt: "running",
};
export default CardComponent;
