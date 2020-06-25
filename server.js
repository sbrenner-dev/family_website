const express = require("express");
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;

const cookieparser = require("cookie-parser");

const db = require("./db/db");

let LoginPage = require("./routes/Login");
let CreateUser = require("./routes/CreateUser");
let CreateUserPage = require("./routes/Create");
let LoginUser = require("./routes/LoginUser");
let HomePage = require("./routes/Home");
let PostMessage = require("./routes/PutPostMessage");
let GetPostMessages = require("./routes/GetPostMessages");
let DeletePostMessage = require("./routes/DeletePost");
let AddNewInfoPage = require("./routes/AddNewInfo");
let UpdateEmail = require("./routes/UpdateUserEmail");
let SettingsPage = require("./routes/Settings");

app.listen(PORT, () => console.info("Server has started on", PORT));

app.use(express.static("public"));

app.use(cookieparser());

app.use("/", LoginPage);
app.use("/", CreateUserPage);
app.use("/", LoginUser);
app.use("/", HomePage);
app.use("/", SettingsPage);

app.use("/create", CreateUser);
app.use("/create", AddNewInfoPage);
app.use("/update", UpdateEmail);

app.use("/post", PostMessage);
app.use("/post", GetPostMessages);
app.use("/post", DeletePostMessage);