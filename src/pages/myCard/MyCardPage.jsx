import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent";
import nextKey from "generate-my-key";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import homePageNormalization from "../home/homePageNormalization";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const MyCardPage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/cards/my-cards").then(({ data }) => {
      if (userData) data = homePageNormalization(data, userData._id);
      setDataFromServer(data);
    });
  }, []);
  const handleEditCard = (_id) => {
    navigate(`${ROUTES.EDITCARD}/${_id}`);
  };
  const handleDeleteCard = async (_id) => {
    try {
      const { data } = await axios.delete("/cards/" + _id);
      setDataFromServer((dataFromServerCopy) =>
        dataFromServerCopy.filter((card) => card._id != _id)
      );
    } catch (err) {
      toast("There's a problem at deleting the card from server", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleLikeCard = async (_id) => {
    try {
      const { data } = await axios.patch("/cards/" + _id);
    } catch (err) {
      toast("There's a problem at liking the card from server", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleLikeSuccess = (_id) => {
    setDataFromServer(
      dataFromServer.map((card) =>
        card._id == _id ? { ...card, likes: !card.likes } : card
      )
    );
  };
  return (
    <Container sx={{ paddingBottom: "60px" }}>
      <Typography
        variant="h2"
        sx={{
          mb: 1,
          padding: "10px",
          pb: "0px",
          textAlign: "center",
          fontSize: { xs: "2.5rem", md: "4rem" },
        }}
      >
        My Cards
      </Typography>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", marginBottom: "10%" }}
      >
        Effortlessly manage, like, edit, or delete your business cards. Elevate
        your professional presence and connections with ease.
      </Typography>
      <Grid container spacing={2}>
        {dataFromServer.map((card) => (
          <Grid item key={nextKey()} xs={12} sm={6} md={4} lg={3}>
            <CardComponent
              _id={card._id}
              title={card.title}
              subTitle={card.subtitle}
              phone={card.phone}
              address={`${card.address.city}, ${card.address.street} ${card.address.houseNumber}`}
              img={card.image.url}
              alt={card.image.alt}
              description={card.description}
              email={card.email}
              date={card.createdAt}
              bizNumber={card.bizNumber}
              like={card.likes}
              cardNumber={card.cardNumber}
              onDeleteCard={handleDeleteCard}
              onEditCard={handleEditCard}
              onLikeCard={handleLikeCard}
              onLikeSuccess={handleLikeSuccess}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyCardPage;
