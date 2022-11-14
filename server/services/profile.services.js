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

const editProfile = async (values) => {
  try {
    // checking what needs to be updated
    console.log(values);
    if (values.name && values.profilePic) {
      console.log("in else if0");

      let editProfile = await Profile.updateOne(
        { _id: values.profileId },
        { $set: { profilePic: values.profilePic, name: values.name } }
      );

      return editProfile;
    } else if (values.profilePic) {
      let editProfile = await Profile.updateOne({
        _id: values.profileId,
        $set: { profilePic: values.profilePic },
      });
      return editProfile;
    } else if (values.name) {
      let editProfile = await Profile.updateOne({
        _id: values.profileId,
        $set: { name: values.name },
      });
      return editProfile;
    } else {
      return "Nothing to update!";
    }
  } catch (error) {
    throw error;
  }
};
module.exports = { createProfile, addProfile, editProfile, getProfiles };
