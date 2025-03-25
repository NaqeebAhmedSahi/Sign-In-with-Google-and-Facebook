const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.redirect('http://localhost:3000/dashboard')
);

// @desc    Auth with Facebook
// @route   GET /auth/facebook
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email'], // Must include public_profile
    authType: 'rerequest' // Forces re-request of declined permissions
  }));

// @desc    Facebook auth callback
// @route   GET /auth/facebook/callback
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => res.redirect('http://localhost:3000/dashboard')
);

// @desc    Get current user
// @route   GET /auth/user
router.get('/user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// @desc    Logout user
// @route   GET /auth/logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:3000');
  });
});

module.exports = router;