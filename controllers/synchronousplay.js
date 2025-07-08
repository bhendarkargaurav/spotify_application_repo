const Playlist = require("../models/playlist.js");

function playbackSocketHandler(io) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join a playlist room
    socket.on("join_playlist", async ({ playlistId, userId }) => {
      const playlist = await Playlist.findById(playlistId);
      if (
        !playlist ||
        (!playlist.members.includes(userId) && playlist.user.toString() !== userId)
      ) {
        return socket.emit("error", "Access denied");
      }

      socket.join(playlistId);
      socket.to(playlistId).emit("user_joined", userId);
      console.log(`User ${userId} joined playlist ${playlistId}`);
    });

    // Playback controls
    socket.on("play_song", ({ playlistId, songId, songTitle }) => {
      io.to(playlistId).emit("play_song", { songId, songTitle });
    });

    socket.on("pause_song", ({ playlistId }) => {
      io.to(playlistId).emit("pause_song");
    });

    socket.on("seek_song", ({ playlistId, position }) => {
      io.to(playlistId).emit("seek_song", { position });
    });

    socket.on("next_song", ({ playlistId }) => {
      io.to(playlistId).emit("next_song");
    });

    // Add/remove songs
    socket.on("add_song", ({ playlistId, song }) => {
      io.to(playlistId).emit("song_added", song);
    });

    socket.on("remove_song", ({ playlistId, songId }) => {
      io.to(playlistId).emit("song_removed", songId);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}

module.exports = playbackSocketHandler;
