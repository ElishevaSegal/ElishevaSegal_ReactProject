import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import ROUTES from "../../routes/ROUTES";
import logo from "../../images/logo.png";
import { Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
const AboutPage = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        paddingBottom: "60px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 3,
          backgroundColor: "paper.dark",
          textAlign: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <img src={logo} alt="logo" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            mb: "10px",
          }}
        >
          <Typography variant="h5">ES BCards App{"  "}</Typography>
          <Typography>The SpringBoard For Your Business!</Typography>
        </Box>
        <Typography variant="h4" gutterBottom>
          Welcome to Our Business Networking Platform
        </Typography>

        <Typography variant="body1">
          At "Elisheva Segal Business Cards App", we provide a powerful platform
          for professionals to connect, network, and grow their business.
          Whether you're an individual looking for opportunities or a business
          seeking to expand your reach, we've got you covered!
        </Typography>

        <Typography variant="h5" mt={3}>
          Key Features
        </Typography>

        <Typography variant="body1">
          <strong>Create Your Profile:</strong> Join our community by creating a
          user account. It's free and easy!
        </Typography>

        <Typography variant="body1">
          <strong>Business or Personal:</strong> Define your account as a
          business or a personal account, depending on your needs.
        </Typography>

        <Typography variant="body1">
          <strong>Explore Business Cards:</strong> Browse through a vast
          collection of business cards created by our users. Find potential
          clients, partners, or simply get inspired.
        </Typography>

        <Typography variant="body1">
          <strong>Interact with Cards:</strong> When you log in, you can like
          cards to show your interest. You'll also get access to the contact
          details of businesses.
        </Typography>

        <Typography variant="body1">
          <strong>Create, Edit, Delete Cards:</strong> Business account holders
          can create, edit, and delete their own cards. Showcase your services
          or products effortlessly.
        </Typography>

        <Typography variant="body1">
          <strong>Favorite Cards:</strong> Keep track of the cards you've liked
          in your "Favorite Cards" page.
        </Typography>

        <Typography variant="body1">
          <strong>Manage Your Cards:</strong> Business account holders can view,
          edit, and delete their own cards in the "My Cards" section.
        </Typography>

        <Typography variant="h5" mt={3}>
          Get Started Today
        </Typography>

        <Typography variant="body1">
          Join "Elisheva Segal Business Cards App" now and start connecting with
          professionals, exploring business opportunities, and growing your
          network. It's time to make your mark in the business world!
        </Typography>

        <RouterLink to={ROUTES.REGISTER} mt={3}>
          Create Your New Account
        </RouterLink>
      </Paper>
    </Container>
  );
};

export default AboutPage;
