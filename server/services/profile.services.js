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
module.exports = {
  createProfile,
  addProfile,
  editProfile,
  getProfiles,
  deleteProfile,
};
