const express = require("express");
const router = express.Router();
const passport = require("passport");
const { paymentStripe } = require("../controllers/payments-controller");
const {
  register,
  login,
  getUsers,
  logout,
  upDateUser,
} = require("../controllers/users-controller");
const {
  createEvent,
  getEvents,
  getEventDetail,
  getEventsDetailDb,
} = require("../controllers/events-controller");
const { fileUpload } = require("../helpers/fileUpload");
const { isUserAuthenticated } = require("../middleware/isAuthenticate");
const successLoginUrl = "/login/success";
const errorLoginUrl = "/login/error";

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.put("/user/:id/profile", fileUpload, upDateUser);
router.post("/createEvent", createEvent);
router.get("/users", getUsers);
router.get("/events", getEvents);
router.get("/eventsCreate/:id", getEventDetail);
router.post("/api/checkout", paymentStripe);
router.get("/eventsDB/:id", getEventsDetailDb);
router.get("/auth/user", (req, res) => {
  res.json(req.user);
});
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later!",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  }),
  (req, res) => {
    res.send("Thank you for signing in!");
  }
);
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect(successLoginUrl);
  }
);

module.exports = router;
