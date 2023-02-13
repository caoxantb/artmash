import mongoose, { Schema, Types } from "mongoose";

export interface IGallery extends Document {
  _id: string;
  user: Types.ObjectId;
  artpiecesId: string[]
  spaceId: string;
  accessToken: string;
  contentTypeGalleryId: string;
  contentTypeArtpiecesId: string;
  environmentId: string;
}

const gallerySchema = new mongoose.Schema({
  _id: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  artpiecesId: [String],
  spaceId: String,
  accessToken: String,
  contentTypeGalleryId: String,
  contentTypeArtpiecesId: String,
  environmentId: String,
});

const Gallery = mongoose.model<IGallery>("Gallery", gallerySchema);

export default Gallery;
