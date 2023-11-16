import axios from "axios";
import { useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent";
import { Container, Grid, Typography } from "@mui/material";
import nextKey from "generate-my-key";
import { useSelector } from "react-redux";
import homePageNormalization from "../home/homePageNormalization";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const FavoritePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        if (userData) data = homePageNormalization(data, userData._id);
        setDataFromServer(data.filter((card) => card.likes == true));
      })
      .catch((err) => {
        toast("Looks like there is problem with the server..", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }, []);
  const handleDeleteCard = async (_id) => {
    try {
      const { data } = await axios.delete("/cards/" + _id);
      setDataFromServer((dataFromServerCopy) =>
        dataFromServerCopy.filter((card) => card._id != _id)
      );
    } catch (err) {
      toast("You can only delete your cards", {
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

  const handleEditCard = async (_id) => {
    try {
      const { data } = await axios.get("/cards/" + _id);
      if (data.user_id == userData._id || userData.isAdmin) {
        navigate(`${ROUTES.EDITCARD}/${_id}`);
      } else {
        toast("You can only edit your cards", {
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
    } catch (err) {
      toast("There's a problem with the edit request from server", {
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
    setDataFromServer((current) => {
      const newData = current.filter((x) => x._id !== _id);
      return newData;
    });
  };

  return (
    <Container sx={{ paddingBottom: "60px" }}>
      <Typography
        variant="h2"
        sx={{ textAlign: "center", mb: 1, padding: "10px", pb: "0px" }}
      >
        Your Favorites Cards
      </Typography>
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: "3%" }}>
        Curate a collection of your favorite business cards. Easily access and
        stay connected with the profiles that matter most to you. Streamline
        your networking experience.
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
              cardNumber={card.cardNumber}
              like={card.likes}
              onLikeSuccess={handleLikeSuccess}
              onDeleteCard={handleDeleteCard}
              onEditCard={handleEditCard}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default FavoritePage;
