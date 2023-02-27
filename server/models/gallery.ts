import mongoose, { Schema, Types } from "mongoose";

export interface IGallery extends Document {
  _id: string;
  user: Types.ObjectId;
  filmsId: string[]
  spaceId: string;
  accessToken: string;
  contentTypeGalleryId: string;
  contentTypeFilmsId: string;
  environmentId: string;
}

const gallerySchema = new mongoose.Schema({
  _id: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  filmsId: [String],
  spaceId: String,
  accessToken: String,
  contentTypeGalleryId: String,
  contentTypeFilmsId: String,
  environmentId: String,
});

const Gallery = mongoose.model<IGallery>("Gallery", gallerySchema);

export default Gallery;
