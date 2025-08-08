import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: function () {
      return this.provider === "local"; // this is only required for local user not google auth
    },
  },

  provider: {
    type: String,
    enum:['local', 'google'],
    default: 'local',
  },

  googleId: {
    type: String,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const User = mongoose.model("User", userSchema);

export default User;
