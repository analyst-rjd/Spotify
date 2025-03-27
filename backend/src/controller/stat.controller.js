import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { User } from "../models/user.model.js";

export const getStats = async (req, res, next) => {
  try {
    const [songCount, albumCount, userCount, uniqueArtistCount] =
      await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        User.countDocuments(),
        Song.aggregate([
          {
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);

    res.status(200).json({
      songCount: songCount,
      albumCount: albumCount ,
      userCount: userCount ,
      uniqueArtistCount: uniqueArtistCount[0]?.count || 0,
    });
  } catch (error) {
    console.error("Error getting stats", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
