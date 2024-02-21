import { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import nextKey from "generate-my-key";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { useSelector } from "react-redux";
import homePageNormalization from "./homePageNormalization";
import useQueryParams from "../../hooks/useQueryParams";
import { toast } from "react-toastify";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { motion } from "framer-motion"; // Import motion from framer-motion for animations

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [initialDataFromServer, setInitialDataFromServer] = useState([]);
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const query = useQueryParams();
  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        setInitialDataFromServer(data);
        setDataFromServer(
          homePageNormalization(data, userData && userData._id)
        );
      })
      .catch((err) => {
        toast("Can't get the cards from server", {
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
  useEffect(() => {
    if (!initialDataFromServer.length) return;
    const filter = query.filter ? query.filter : "";
    setDataFromServer(
      initialDataFromServer.filter((card) => card.title.startsWith(filter))
    );
  }, [query, initialDataFromServer]);

  const handleDeleteCard = async (_id) => {
    try {
      const { data } = await axios.delete("/cards/" + _id);
      setDataFromServer((dataFromServerCopy) =>
        dataFromServerCopy.filter((card) => card._id !== _id)
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
      if (data.user_id === userData._id || userData.isAdmin) {
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
  const handleLikeCard = async (_id) => {
    try {
      const { data } = await axios.patch("/cards/" + _id);
      setInitialDataFromServer(
        initialDataFromServer.map((card) =>
          card._id === _id ? { ...card, likes: !card.likes } : card
        )
      );
    } catch (err) {
      toast("There's a problem with the likes request from server", {
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
    setInitialDataFromServer(
      initialDataFromServer.map((card) =>
        card._id === _id ? { ...card, likes: !card.likes } : card
      )
    );
  };

  return (
    <Container sx={{ paddingBottom: "60px" }}>
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        initial={{ y: -100, opacity: 0 }} // Initial animation state
        animate={{ y: 0, opacity: 1 }} // Animation when component mounts
        transition={{ type: "spring", stiffness: 120, damping: 10 }} // Animation configuration
      >
        <div>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              textAlign: "center",
              marginTop: "10%",
              fontFamily: "Arial, sans-serif", // Change font
            }}
          >
            <motion.span
              animate={{ rotate: [0, 20, 0] }} // Animation for rotation
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }} // Animation configuration
            >
              Connect,{" "}
            </motion.span>
            <motion.span
              animate={{ x: [0, -20, 0] }} // Animation for horizontal movement
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }} // Animation configuration
            >
              Network,{" "}
            </motion.span>
            <motion.span
              animate={{ y: [0, 20, 0] }} // Animation for vertical movement
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }} // Animation configuration
            >
              Grow
            </motion.span>
          </Typography>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              marginBottom: "7%",
              fontSize: "1.2rem", // Decrease font size
              fontFamily: "Arial, sans-serif", // Change font
            }}
          >
            Welcome to "ES BCards App, The SpringBoard For Your Business", where
            professionals and businesses come together to connect, network, and
            grow. Explore a diverse array of business cards, interact with
            others, and create your own presence in our thriving community. Join
            now and start making meaningful connections.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <ArrowDownwardIcon fontSize="large" style={{ fontSize: "2rem" }} />
          </Box>
        </div>
      </motion.div>

      <Typography
        variant="h2"
        gutterBottom
        sx={{
          textAlign: "center",
          marginBottom: "3%",
          fontFamily: "Arial, sans-serif",
        }} // Change font
      >
        Our Business Cards
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
export default HomePage;
