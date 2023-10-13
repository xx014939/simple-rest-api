require('dotenv').config()
const express = require('express')
const router = express.Router()
const Track = require('../models/track')
const Isrc = require('../models/isrc')

// Getting all tracks
router.get('/', async (req, res) => {
    res.send('HELLO WORLD')
  })

// Creating ISRC Entry
router.post('/isrc', async (req, res) => {
    
    // Save ISRC
    const isrc = new Isrc({
            isrc: req.body.isrc
      })
      try {
        const newIsrc = await isrc.save()
        res.status(201).json(newIsrc)

        // Use ISRC to query Spotify
        let data = await fetch(`https://api.spotify.com/v1/search?type=track&q=isrc:${newIsrc.isrc}`, {
        headers: {'Authorization': 'Bearer ' + process.env.SPOTIFY_BEARER}
        })

        let obj = await data.json()

        console.log('ARTIST NAME -', obj.tracks.items[0].artists[0].name)
        console.log('ALBUM NAME -', obj.tracks.items[0].name)
        console.log('URI -', obj.tracks.items[0].artists[0].uri)

      } catch (err) {
        res.status(400).json({ message: err.message })
      }
})


// Creating Track Entry
router.post('/', async (req, res) => {
    const track = new Track({
        image_uri: req.body.image_uri,
        title: req.body.title,
        artist: req.body.artist
      })
      try {
        const newTrack = await track.save()
        res.status(201).json(newTrack)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }

  })

module.exports = router