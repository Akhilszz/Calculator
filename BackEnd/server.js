
const cors = require('cors')
const express = require('express')
const route = require('./routes/routes')
const Database = require('./database/database')

const app = express()
const port = process.env.PORT || 5000;

const corsOptions = {

    origin: 'https://calculator-frontend-pi.vercel.app/',
};

app.use(cors(corsOptions));

app.use(express.json())
app.use('/api', route)

Database()

app.listen(port, () => {
    console.log('server running on port:', port);
})