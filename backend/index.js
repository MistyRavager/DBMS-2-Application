import db from "./conn.js";
import express from "express";
import cors from "cors";
import productRoutes from "./routes/index.js";
import { authenticateUser } from "./controllers/auth.js";

const app = express();

try {
    await db.authenticate();
    console.log("Database connected...");
  } catch (error) {
    console.error("Connection error:", error);
  }

  const auth = async (req, res, next) => {
    let pass = req.headers.authorization;
    console.log(pass);
    
    if (pass == undefined) {
      res.json({ message: "no header" });
      return;
    }

    // let authCode = pass.split(" ")[1];
    // console.log(authCode);
    let usrname = pass.split(":")[0];
    let pswd = pass.split(":")[1];

    let result = await authenticateUser(usrname, pswd);

    if (result) {
      next();
    } else {
      res.json({ message: "No Auth" });
    }
  };
  
  //TEMPORARILY COMMENTED OUT AUTH
  app.use(auth);
  app.use(cors());
  app.use(express.json());
  app.use("/", productRoutes);

  app.listen(5002, () => {
    console.log("Running on PORT 5002");
});
  