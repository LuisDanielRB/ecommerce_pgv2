const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require('passport-github2').Strategy

const {UserGoogle} = require("../db");

const GOOGLE_CALLBACK_URL = "http://localhost:3000/google/callback";
const GITHUB_CALLBACK_URL = "http://localhost:3000/auth/github/callback"
passport.use(
  new GoogleStrategy(
    {
      clientID: "275596479317-80mgtpci0b2gvt0hr48uieh57uvvh2e9.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id,
      };

      const user = await UserGoogle.findOrCreate({
        where: { googleId: profile.id },
        defaults: defaultUser,
      }).catch((err) => {
        console.log("Error signing up", err);
        cb(err, null);
      });

      if (user && user[0]) return cb(null, user && user[0]);
    }
  )
);


passport.use(new GitHubStrategy({
  clientID: "8fb5600f62baf43736ee",
  clientSecret: 'f1f6945961b7f679220849820ac84c9ae25e1946',
  callbackURL: GITHUB_CALLBACK_URL
},
function (accessToken, refreshToken, profile, done) {
  done(null, profile);
}
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});