import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Gallery = mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);

export default Gallery;
