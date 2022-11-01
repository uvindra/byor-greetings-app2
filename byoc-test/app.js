const express = require('express')
const morgan = require('morgan')





const app = express();
app.use(morgan('tiny'));
app.use(express.json())



const moviesRoute = require('./routes/movies')


app.use("/movies", moviesRoute)


app.listen(9090, () => console.log("Server is running on port 9090"))