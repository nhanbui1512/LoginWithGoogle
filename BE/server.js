const express = require("express");
const axios = require("axios");
const app = express();
const port = 5000;

app.use(express.json());

app.post("/api/auth/google", async (req, res) => {
  const { token } = req.body;
  console.log(token);

  try {
    const response = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    );
    const { email, name, picture } = response.data;

    res.json({
      message: "Google login successful",
      user: { email, name, picture },
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Google token verification failed", error });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
