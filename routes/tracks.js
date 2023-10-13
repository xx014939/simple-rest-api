require('dotenv').config()
const axios = require('axios')
const express = require('express')
const router = express.Router()
const Track = require('../models/track')
const Isrc = require('../models/isrc')
const track = require('../models/track')

// Getting all tracks
router.get('/', async (req, res) => {
    try {
        const tracks = await Track.find()
        res.json(tracks)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
  })

  // Getting tracks by artist
router.get('/artist', async (req, res) => {
    try {
        const tracks = await Track.find()
        let tracksWithArtist = []
        tracks.forEach(function(track) {
            if (track.artist === req.body.artist) {
                tracksWithArtist.push(track)
            }
        })
        res.json(tracksWithArtist)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
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
        let artistName = obj.tracks.items[0].artists[0].name

        console.log('ALBUM NAME -', obj.tracks.items[0].name)
        let albumName = obj.tracks.items[0].name

        console.log('URI -', obj.tracks.items[0].artists[0].uri)
        let uriName = obj.tracks.items[0].artists[0].uri

        createNewTrack(artistName,albumName,uriName)


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


  function createNewTrack(artist, title, uri) {
    console.log('Working')
    axios.post('http://localhost:3000/tracks', {
        image_uri: `${uri}`,
        title: `${title}`,
        artist: `${artist}`
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


module.exports = router