const path = require("path");
const express = require("express");
const connnectDB = require('./config/db');

require("dotenv").config({ path : './config/config.env' });
const sendEmail = require("./routes/sendEmail");

connnectDB();
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post("/sendEmail", (req, res) => {
  const { from, to, subject, message } = req.body;
  console.log(from + " " + to + " " + subject + " " + message);
  //Change domain to To
  sendEmail(from, to, subject, message, function (error, data) {
    if (error) {
      res.status(500).json({ message: "Ooop something happends" });
      console.log(error);
    } else {
      res.json({ message: "Email sent Successfully" });
      console.log(JSON.parse(data));
    }
  });
});

const port = 5000 || process.env.PORT;
app.listen(`${port}`, () => {
  console.log(`Server is runing on ${port}`);
});
