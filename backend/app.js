
const express = require('express');
const app = express();
const cors = require('cors');

//needed to parse correctly the incoming requests
app.use(express.json());

// handling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin",
               "http://localhost:4200");
    res.header("Access-Control-Allow-Headers",
               "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// CORS alternative method that allows all request
// app.use(cors());


const birds = require('./routes/birds.routes')
app.use('/birds', birds);

const message = require('./routes/message.routes')
app.use('/message', message);

const login = require('./routes/login.routes')
app.use('/login', login);

const logout = require('./routes/logout.routes')
app.use('/logout', logout);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
