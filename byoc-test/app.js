const express = require('express')
const morgan = require('morgan')
const app = express();



app.use(morgan('tiny'));
app.use(express.json())


const PORT  = process.env.PORT || 8080
const moviesRoute = require('./routes/movies')


app.use("/movies", moviesRoute)


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))