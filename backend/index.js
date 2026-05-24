const connectToMongo = require('./db');
const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
var cors = require('cors');
const bookmarkRoutes=require('./routes/bookmark')
const path = require("path");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
// app.use(upload);
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/bookmark',bookmarkRoutes);
app.use('/api/v1/user/',require("./routes/user"))

app.get("/", (req, res) => {
  res.send("NewsNerd Backend is running");
});

app.get("/api/v1/news",async(req,res)=>{
  try{
    const query=new URLSearchParams(req.query);
    query.set("apiKey",process.env.NEWS_API_KEY);

    const response=await fetch(
      `https://newsapi.org/v2/top-headlines?${query.toString()}`
    );
    const data=await response.json();
    res.json(data);
  }catch(error){
    res.status(500).json({error:"Failed to fetch news"})
  }
  }
)

const port = process.env.PORT || 6969;

app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server is running on port http://localhost:${port}`);
});

connectToMongo();
