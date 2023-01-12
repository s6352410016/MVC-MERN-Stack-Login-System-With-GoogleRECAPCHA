const express = require('express');
const router = require('./routes/router');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.use(express.static(path.join(__dirname , './client/build')));
app.get('*' , (req , res) => {
    res.sendFile(path.join(__dirname , './client/build/index.html'));
});

app.listen(process.env.PORT || 5000 , () => {
    console.log('Starting server...');
});