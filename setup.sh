#!/bin/bash

# Create project directory structure
mkdir -p gdg-website/{public/{css,images},views/partials,routes}

# Navigate to the project folder
cd gdg-website

# Create the package.json file
echo '{
  "name": "gdg-website",
  "version": "1.0.0",
  "description": "GDG SCOE Website",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "ejs": "^3.1.8",
    "body-parser": "^1.19.0",
    "nodemon": "^2.0.22"
  }
}' > package.json

# Create the app.js file
echo "const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
const routes = require('./routes/routes');
app.use('/', routes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});
" > app.js

# Create the routes.js file
echo "const express = require('express');
const router = express.Router();

// Home Page
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// About Us
router.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

// Events
router.get('/events', (req, res) => {
  res.render('events', { title: 'Events' });
});

// Blog
router.get('/blog', (req, res) => {
  res.render('blog', { title: 'Blog' });
});

// Join Us
router.get('/join', (req, res) => {
  res.render('join', { title: 'Join Us' });
});

// Contact Us
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

// Partners & Sponsors
router.get('/partners', (req, res) => {
  res.render('partners', { title: 'Partners & Sponsors' });
});

module.exports = router;
" > routes/routes.js

# Create EJS templates in the views folder
echo "<%- include('partials/header.ejs') %>
<main>
  <h2>Upcoming Events</h2>
  <p>Check out our latest events!</p>
  <a href='/events'>View Events</a>
</main>
<%- include('partials/footer.ejs') %>" > views/index.ejs

echo "<%- include('partials/header.ejs') %>
<main>
  <h2>About Us</h2>
  <p>Learn about our mission, vision, and team!</p>
</main>
<%- include('partials/footer.ejs') %>" > views/about.ejs

echo "<%- include('partials/header.ejs') %>
<main>
  <h2>Upcoming Events</h2>
  <p>Details of past and future events will be displayed here.</p>
</main>
<%- include('partials/footer.ejs') %>" > views/events.ejs

echo "<%- include('partials/header.ejs') %>
<main>
  <h2>Tech Blog</h2>
  <p>Check out the latest tech blogs and articles!</p>
</main>
<%- include('partials/footer.ejs') %>" > views/blog.ejs

echo "<%- include('partials/header.ejs') %>
<main>
  <h2>Join Us</h2>
  <p>Become a part of GDG [Your Chapter Name]!</p>
  <p>Follow us on social media: [Links]</p>
</main>
<%- include('partials/footer.ejs') %>" > views/join.ejs

echo "<%- include('partials/header.ejs') %>
<main>
  <h2>Contact Us</h2>
  <p>For inquiries, email us at: <a href='mailto:contact@gdg.com'>contact@gdg.com</a></p>
</main>
<%- include('partials/footer.ejs') %>" > views/contact.ejs

echo "<%- include('partials/header.ejs') %>
<main>
  <h2>Partners & Sponsors</h2>
  <p>Our partners and sponsors are key to our success. Check them out here!</p>
</main>
<%- include('partials/footer.ejs') %>" > views/partners.ejs

# Create partial header and footer
echo "<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title><%= title %></title>
  <link rel='stylesheet' href='/css/style.css'>
</head>
<body>
  <header>
    <img src='/images/gdg-logo.png' alt='GDG Logo'>
    <h1>Welcome to GDG [Your Chapter Name]</h1>
    <p>Your gateway to tech innovation and learning</p>
  </header>
  <nav>
    <a href='/'>Home</a>
    <a href='/about'>About Us</a>
    <a href='/events'>Events</a>
    <a href='/blog'>Blog</a>
    <a href='/join'>Join Us</a>
    <a href='/contact'>Contact Us</a>
    <a href='/partners'>Partners & Sponsors</a>
  </nav>" > views/partials/header.ejs

echo "<footer>
  <p>GDG [Your Chapter Name] - Connect with us!</p>
</footer>
</body>
</html>" > views/partials/footer.ejs

# Create the style.css file
echo "body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

header {
  text-align: center;
  background: #4285F4;
  color: white;
  padding: 20px;
}

nav {
  display: flex;
  justify-content: center;
  background: #333;
}

nav a {
  color: white;
  padding: 10px 20px;
  text-decoration: none;
}

nav a:hover {
  background: #555;
}

footer {
  text-align: center;
  background: #4285F4;
  color: white;
  padding: 10px;
}" > public/css/style.css

# Create the GDG logo image (or you can replace it manually)
touch public/images/gdg-logo.png

echo "All files have been created successfully!"
