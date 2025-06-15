const Song = require('../models/song.js');


const uploadAudio = async (req, res) => {
  try {
    const { title, album, artist, duration, genre } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({
        success: false,
        message: "No audio file uploaded.",
      });
    }

    const newSong = new Song({
      title,
      artist,
      album,
      // duration: duration || null,
      // genre: genre || null,
      cloudinaryUrl: req.file.path,
      // publicId: req.file.filename,
    });

    await newSong.save();

    return res.status(201).json({
      success: true,
      message: "Song uploaded and saved successfully.",
      data: newSong,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


const getSongByName = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const song = await Song.findOne({ title: new RegExp(title, 'i') }); // case-insensitive

    if (!song) {
      return res.status(404).json({ success: false, message: "Song not found" });
    }

    return res.status(200).json({
      success: true,
      data: {
        title: song.title,
        url: song.cloudinaryUrl
      }
    });

  } catch (error) {
    console.error("Get song error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};





module.exports = { uploadAudio, getSongByName };
