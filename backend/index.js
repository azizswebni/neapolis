const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); 
const app = express();
const cors = require('cors');

app.use(express.json());



app.use(cors({origin:"*"}));

//Connect to mongo
mongoose
  .connect( process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected.."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Started at ${port}`));




app.use("/api/auth", require("./apis/auth"));
app.use("/api/ev", require("./apis/events"));