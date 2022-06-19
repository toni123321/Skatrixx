const express = require('express')
const router = express.Router()
const SkateGame = require('../models/skateGame')

async function getSkateGame(req, res, next) {
    let skateGame
    try {
        skateGame = await SkateGame.findById(req.params.id)
        if (skateGame == null) {
            return res.status(404).json({ message: "Cannot find game" })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.skateGame = skateGame
    next()
}

router.get('/', async (req, res) => {
    try {
        const games = await SkateGame.find()
        res.send(games)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', getSkateGame, async (req, res) => {
    try {
        res.send(res.skateGame)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {
    const skateGame = new SkateGame({
        players: req.body.players,
        eliminated: req.body.eliminated,
        scores: req.body.scores,
        currentTrick: req.body.currentTrick,
        trickPicker: req.body.trickPicker,
        currentPlayer: req.body.currentPlayer,
        round: req.body.round,
        voting: req.body.voting,
        votes: req.body.votes
    })
    try {
        const newSkateGame = await skateGame.save()
        res.status(201).json(newSkateGame)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.patch('/:id/setTrick/:trick', getSkateGame, async (req, res) => {
    const io = req.app.get('socketio')
    let skateGame = res.skateGame
    if (req.params.trick !== null) {
        skateGame.currentTrick = req.params.trick;
        skateGame.currentPlayer++;
        if (skateGame.currentPlayer > skateGame.players.length - 1) {
            skateGame.currentPlayer = 0;
        }
        try {
            const updatedGame = await skateGame.save()
            io.emit(req.params.id, updatedGame)
            res.json(updatedGame)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
})

router.patch('/:id/attemptTrick', getSkateGame, async (req, res) => {
    const io = req.app.get('socketio')
    let skateGame = res.skateGame
    try {
        skateGame.voting = true;
        const updatedGame = await skateGame.save()
        io.emit(req.params.id, updatedGame)
        res.json(updatedGame)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.put('/:id/vote/:vote', getSkateGame, async (req, res) => {
    const io = req.app.get('socketio')
    let skateGame = res.skateGame
    try {
        skateGame.votes.push(req.params.vote)
        if (skateGame.votes.length === skateGame.players.length - 1) {
            let positiveVotes = 0;
            skateGame.votes.forEach(vote => {
                if (vote == "yes") { positiveVotes++ }
            });
            if (positiveVotes < (skateGame.votes.length / 2)) {
                skateGame.scores[skateGame.currentPlayer] = skateGame.scores[skateGame.currentPlayer] + 1;
                if (skateGame.scores[skateGame.currentPlayer] === 5) {
                    skateGame.eliminated.push(skateGame.players[skateGame.currentPlayer])
                }
            }
            skateGame.votes = []
            skateGame.voting = false
            skateGame.currentPlayer++;
            if (skateGame.currentPlayer == skateGame.trickPicker) {
                skateGame.currentPlayer++;
            }
        }
        if (skateGame.currentPlayer > skateGame.players.length - 1) {
            skateGame.trickPicker++;
            if (skateGame.trickPicker > skateGame.players.length - 1) {
                skateGame.trickPicker = 0;
            }
            skateGame.currentPlayer = skateGame.trickPicker;
            skateGame.currentTrick = ""
            skateGame.voting = false
        }
        const updatedGame = await skateGame.save()
        io.emit(req.params.id, updatedGame)
        res.json(updatedGame)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router