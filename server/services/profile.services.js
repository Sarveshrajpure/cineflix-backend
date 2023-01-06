const { Profile } = require("../models/profile");

const createProfile = async (defaultProfile) => {
  try {
    const profile = new Profile(defaultProfile);

    await profile.save();
    return profile;
  } catch (error) {
    throw error;
  }
};

const getProfiles = async (userId) => {
  try {
    let profiles = await Profile.find({ userId: userId });
    return profiles;
  } catch (error) {
    throw error;
  }
};

const addProfile = async (name, userId) => {
  try {
    let checkProfilesForSameName = await Profile.find({
      userId: userId,
      name: name,
    });

    if (checkProfilesForSameName?.length > 0) {
      return false;
    } else {
      let profile = await createProfile({ name: name, userId: userId });
      return profile;
    }
  } catch (error) {
    throw error;
  }
};

const editProfile = async (name, profileId, profilePic) => {
  try {
    // checking what needs to be updated

    if (name && profilePic) {
      let editProfile = await Profile.findByIdAndUpdate(
        profileId,
        {
          $set: { profilePic: profilePic, name: name },
        },
        { new: "true" }
      );

      return editProfile;
    } else if (profilePic) {
      let editProfile = await Profile.findByIdAndUpdate(
        profileId,
        {
          $set: { profilePic: profilePic },
        },
        { new: "true" }
      );
      return editProfile;
    } else if (name) {
      let editProfile = await Profile.findByIdAndUpdate(
        profileId,
        {
          $set: { name: name },
        },
        { new: "true" }
      );
      return editProfile;
    } else {
      return "Nothing to update!";
    }
  } catch (error) {
    throw error;
  }
};

const updateWatchHistory = async (id, contentId, watchTime, contentType) => {
  try {
    let findHistory = await Profile.findOne({
      watchHistory: { $elemMatch: { contentId: contentId } },
    });

    if (!findHistory) {
      let addHistory = await Profile.updateOne(
        { _id: id },
        {
          $push: {
            watchHistory: {
              contentId,
              watchTime,
              contentType,
            },
          },
        },
        { new: true }
      );
      return addHistory;
    } else {
      let updateHistory = await Profile.updateOne(
        {
          "watchHistory.contentId": contentId,
        },
        { $set: { "watchHistory.$.watchTime": watchTime } }
      );

      return updateHistory;
    }
  } catch (error) {
    throw error;
  }
};

const deleteProfile = async (profileId, userId) => {
  try {
    let profiles = await Profile.find({ userId: userId });

    if (profiles.length > 1) {
      let deleteProfile = await Profile.deleteOne({ _id: profileId });
      return deleteProfile;
    }
  } catch (error) {
    throw error;
  }
};

const addToFavourite = async (profileId, contentId) => {
  try {
    let profile = await Profile.findById({ _id: profileId });
    let map = new Map();

    let previouslyAvailableContent = profile.favourites;
    let length = previouslyAvailableContent.length;

    for (let i = 0; i < length; i++) {
      map.set(profile.favourites[i], true);
    }

    if (!map.has(contentId)) {
      let profileFavourites = await Profile.updateOne(
        { _id: profileId },
        { $push: { favourites: contentId } },
        { new: true }
      );
      return profileFavourites;
    } else {
      return " Content already in favourites!";
    }
  } catch (error) {
    throw error;
  }
};

const removeFavouriteItem = async (profileId, contentId) => {
  try {
    let removeFavourite = await Profile.updateOne(
      { _id: profileId },
      { $pull: { favourites: contentId } }
    );

    return removeFavourite;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createProfile,
  addProfile,
  editProfile,
  getProfiles,
  deleteProfile,
  updateWatchHistory,
  addToFavourite,
  removeFavouriteItem,
};
