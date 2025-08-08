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
},{timestamps: true});

userSchema.pre('save', async function(next) {

  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
  
});

userSchema.methods.matchPassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
};

const User = mongoose.model("User", userSchema);
export default User;
