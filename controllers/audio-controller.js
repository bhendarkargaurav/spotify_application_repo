const Song = require('../models/song.js');

// const uploadAudio = async (req, res) => {
//   try {
//     const { title, album, artist, duration, genre } = req.body;

//     if (!req.file || !req.file.path) {
//       return res.status(400).json({
//         success: false,
//         message: "No audio file uploaded.",
//       });
//     }

//     const newSong = new Song({
//       title: title || req.file.originalname,
//       artist: artist || null,
//       album: album || null,
//       duration: duration || null,
//       genre: genre || null,
//       cloudinaryUrl: req.file.path,
//       publicId: req.file.filename,
//     });

//     await newSong.save();

//     return res.status(201).json({
//       success: true,
//       message: "Song uploaded and saved successfully.",
//       data: newSong,
//     });
//   } catch (error) {
//     console.error("Upload error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

// module.exports = { uploadAudio };


// const Song = require('../models/song.js');

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

module.exports = { uploadAudio };
