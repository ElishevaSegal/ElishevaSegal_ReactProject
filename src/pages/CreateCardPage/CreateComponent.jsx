import { useState } from "react";
import {
  Container,
  TextField,
  Grid,
  Typography,
  Divider,
  Button,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { createCardClick } from "./createCardClick";
import { inputsValueObj } from "./inputsValueObj";
const CreateCard = () => {
  const [errorsState, setErrorsState] = useState(null);
  const navigate = useNavigate();
  const [inputsValue, setInputValue] = useState(inputsValueObj());

  const handleInputChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleCreateCardClick = () => {
    createCardClick(inputsValue, setErrorsState, navigate);
  };
  return (
    <Container sx={{ paddingBottom: "60px" }}>
      <Typography
        variant="h2"
        sx={{
          mb: 1,
          padding: "10px",
          textAlign: "center",
          fontSize: { xs: "2.5rem", md: "4rem" },
        }}
      >
        Create New Card
      </Typography>
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: "3%" }}>
        Craft your professional identity in seconds. Create and customize your
        business card with ease, making a lasting impression effortlessly.
      </Typography>

      <Divider sx={{ mb: 3 }} />
      <Grid container flexDirection={"column"}>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.title}
          required
        />
        {errorsState && errorsState.title && (
          <Alert severity="warning">{errorsState.title}</Alert>
        )}
        <TextField
          id="subtitle"
          label="SubTitle"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.subtitle}
          required
        />
        {errorsState && errorsState.subtitle && (
          <Alert severity="warning">{errorsState.subtitle}</Alert>
        )}
        <TextField
          id="phone"
          label="Phone Number"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.phone}
          required
        />
        {errorsState && errorsState.phone && (
          <Alert severity="warning">{errorsState.phone}</Alert>
        )}
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.description}
          required
        />
        {errorsState && errorsState.description && (
          <Alert severity="warning">{errorsState.description}</Alert>
        )}
        <TextField
          id="web"
          label="Web"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.web}
        />
        {errorsState && errorsState.web && (
          <Alert severity="warning">{errorsState.web}</Alert>
        )}
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.email}
          required
        />
        {errorsState && errorsState.email && (
          <Alert severity="warning">{errorsState.email}</Alert>
        )}
        <TextField
          id="url"
          label="Url"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.url}
        />
        {errorsState && errorsState.url && (
          <Alert severity="warning">{errorsState.url}</Alert>
        )}
        <TextField
          id="alt"
          label="Alt"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.alt}
        />
        {errorsState && errorsState.alt && (
          <Alert severity="warning">{errorsState.alt}</Alert>
        )}
        <TextField
          id="state"
          label="State"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.state}
        />
        {errorsState && errorsState.state && (
          <Alert severity="warning">{errorsState.state}</Alert>
        )}
        <TextField
          id="country"
          label="Country"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.country}
          required
        />
        {errorsState && errorsState.country && (
          <Alert severity="warning">{errorsState.country}</Alert>
        )}
        <TextField
          id="city"
          label="City"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.city}
          required
        />
        {errorsState && errorsState.city && (
          <Alert severity="warning">{errorsState.city}</Alert>
        )}
        <TextField
          id="street"
          label="Street"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.street}
          required
        />
        {errorsState && errorsState.street && (
          <Alert severity="warning">{errorsState.street}</Alert>
        )}
        <TextField
          id="houseNumber"
          label="House Number"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.houseNumber}
          required
        />
        {errorsState && errorsState.houseNumber && (
          <Alert severity="warning">{errorsState.houseNumber}</Alert>
        )}
        <TextField
          id="zip"
          label="Zip"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.zip}
        />
        {errorsState && errorsState.zip && (
          <Alert severity="warning">{errorsState.zip}</Alert>
        )}
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={8} md={8} sm={8} xs={12}>
          <Button
            variant="outlined"
            sx={{
              mt: 2,
              width: "100%",
              ml: "0%",
              bgcolor: "primary.main",
              color: "myblue.main",
            }}
            onClick={handleCreateCardClick}
          >
            Create Card
          </Button>
        </Grid>
        <Grid item xs>
          <Link to={ROUTES.HOME}>
            <Button
              variant="outlined"
              sx={{
                mt: { xs: 0, sm: 2 },
                width: "100%",
                ml: "0%",
              }}
            >
              Discrad
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};
export default CreateCard;
