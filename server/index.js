const express = require("express");
const admin = require("./firebase/firebase");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/auth/google", async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: Missing or invalid Firebase ID token",
      });
    }

    const idToken = authorizationHeader.split("Bearer ")[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, name, picture } = decodedToken;
    const userInfo = {
      email,
      name,
      picture,
    };

    return res.status(200).json({
      status: "success",
      user: userInfo,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`🚀 server: started ${PORT}`);
});
