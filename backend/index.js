const connectToMongo = require('./db');
const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
var cors = require('cors');
const bookmarkRoutes=require('./routes/bookmark')

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/bookmark',bookmarkRoutes);

const port = process.env.PORT || 6969;

app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server is running on port http://localhost:${port}`);
});

connectToMongo();
