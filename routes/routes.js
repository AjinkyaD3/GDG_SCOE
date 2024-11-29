const express = require("express");
const router = express.Router();

// Home Page
router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// About Us
router.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});

// Events
router.get("/events", (req, res) => {
  res.render("events", { title: "Events" });
});

// Blog
router.get("/blog", (req, res) => {
  res.render("blog", { title: "Blog" });
});

// Join Us
router.get("/join", (req, res) => {
  res.render("join", { title: "Join Us" });
});

// Contact Us
router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us" });
});

// Partners & Sponsors
router.get("/partners", (req, res) => {
  res.render("partners", { title: "Partners & Sponsors" });
});

module.exports = router;
