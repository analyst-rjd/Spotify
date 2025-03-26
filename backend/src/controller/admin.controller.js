import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

const uploadtocloudinary = async (file) => {
  try {
    const upload = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return upload.secure_url;
  } catch {
    console.log("Error uploading to cloudinary", error);
    throw new Error("Error uploading to cloudinary");
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });// Return admin status
}

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res
        .status(400)
        .json({ message: "Please provide both audio and image files" });
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const imageUrl = await uploadtocloudinary(imageFile);
    const audioUrl = await uploadtocloudinary(audioFile);

    const song = new Song({
      title,
      artist,
      imageUrl,
      audioUrl,
      albumId: albumId || null,
      duration,
    });
    await song.save();

    //if album is given, add song to album

    if (albumId) {
      const album = await Album.findById(albumId, {
        $push: { songs: song._id },
      });
    }

    res.status(201).json(song);
  } catch(error) {
    console.log("Error in adding song", error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params.id;

    //delete song from album's array

    const song = await Song.findById(id);
    if (song.albumId) {
      const album = await Album.findById(song.albumId, {
        $pull: { songs: song._id },
      });
    }
    //delete song from database
    await Song.findByIdAndDelete(id);
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.log("Error in Deleting Song", error);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    if (!req.files || !req.files.imageFile) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const { title, artist, releaseyear } = req.body;
    const imageFile = req.files.imageFile;

    const imageUrl = await uploadtocloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      releaseyear,
      imageUrl
    });
    //save album to database
    await album.save();
    res.status(201).json(album);
  } catch (error) {
    console.log("Error adding Album", error);
    next(error);
  }
}

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);
    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.log("Error deleting Album", error);
    next(error);
  }
}
