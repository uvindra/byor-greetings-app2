const express = require("express");
const router = express.Router();



router.get('/', (req, res) => {
    res.status(200).json({ movies })
})


router.get('/m', (req, res) => {
    const movieName = req.query.name
    const movie = movies.find(m => m.name == movieName)

    if (!movieName) {
        res.status(400).json({ message: `Movie name should provide` })
    } else {
        if (movie) {
            res.status(200).json({ movie })
        }
        res.status(404).json({ message: `Movie with name ${movieName} not found` })
    }
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    const movie = movies.find(m => m.id == id)
    if (movie) {
        res.status(200).json({ movie })
    }
    res.status(404).json({ message: `Movie with ID ${id} not found` })
})

router.post('/new', (req, res) => {
    const { name, year, ratings } = req.body
    if (!name || !year || !ratings) {
        res.status(400).json({ message: `Insufficient information` })
    } else {

        const movie = movies.find(m => m.name === name)
        if (movie) {
            res.status(409).json({ message: `Movie with name ${name} exists` })
        } else {
            const id = movies.length + 1;
            const m = { id, name, year, ratings }
            movies.push(m)
            res.status(201).json(m)
        }


    }
})

const movies = [
    { id: 1, name: "The Shawshank Redemption", year: 1994, ratings: 9.2 },
    { id: 2, name: "The God Father", year: 1972, ratings: 9.2 },
    { id: 3, name: " The Dark Knight", year: 2008, ratings: 9.0 },
    { id: 4, name: "The Godfather Part II", year: 1974, ratings: 9.0 },
    { id: 5, name: "12 Angry Men", year: 1957, ratings: 9.0 }
]

module.exports = router