import "reflect-metadata";
import express from "express";
import { databaseConnector } from "./configs/database/data-source";
import { routesInicializer } from "./src/routers";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";

const app = express();

const PORT = 3000;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
  secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JwtStrategy(opts, function(jwt_payload, done) {
    return done(null, {});
});

passport.use(strategy);

databaseConnector();

routesInicializer(app);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
