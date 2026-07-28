import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    default: "+33 1 23 45 67 89",
  },
  email: {
    type: String,
    default: "contact@letoilepatisserie.com",
  },
  addressLine1: {
    type: String,
    default: "123 Luxury Avenue",
  },
  addressLine2: {
    type: String,
    default: "Paris, 75008, France",
  },
  igLink: {
    type: String,
    default: "#",
  },
  fbLink: {
    type: String,
    default: "#",
  },
  xLink: {
    type: String,
    default: "#",
  },
});

const Settings = mongoose.models.Settings || mongoose.model("Settings", settingsSchema);

export default Settings;
