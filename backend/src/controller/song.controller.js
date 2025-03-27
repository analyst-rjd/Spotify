import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 }); //-1 is descending order which is newest to oldest
    res.json(songs);
  } catch (error) {
    console.log("Error getting all songs", error);
    next(error);
  }
};
export const getFeaturedSongs = async (req, res, next) => {
    try {
      //fetch 6 random songs using the the aggregate function in MongoDB
    const songs = await Song.aggregate({
      $sample: { size: 6 },
      $project: {
        _id: 1,
        title: 1,
        artist: 1,
        imageUrl: 1,
        audioUrl: 1,
      },
      $sort: { createdAt: -1 },
    });
  } catch (error) {
    console.log("Error getting featured songs", error);
    next(error);
  }
};

export const getTrending = async (req, res, next) => {
  try {
    const songs = await Song.aggregate({
      $sample: { size: 4 },
      $project: {
        _id: 1,
        title: 1,
        artist: 1,
        imageUrl: 1,
        audioUrl: 1,
      },
      $sort: { createdAt: -1 },
    });
  } catch (error) {
    console.log("Error getting featured songs", error);
    next(error);
  }
};

export const getMadeForYou = async (req, res, next) => {
  try {
    const songs = await Song.aggregate({
      $sample: { size: 4 },
      $project: {
        _id: 1,
        title: 1,
        artist: 1,
        imageUrl: 1,
        audioUrl: 1,
      },
      $sort: { createdAt: -1 },
    });
  } catch (error) {
    console.log("Error getting featured songs", error);
    next(error);
  }
};
