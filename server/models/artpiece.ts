import mongoose from "mongoose";

export interface IArtpiece extends Document {
  _id: string,
	points: number,
	gallery: string
}

const artpieceSchema = new mongoose.Schema({
  _id: String,
  points: Number,
  gallery: { type: String, ref: "Gallery" }
});

const Artpiece = mongoose.model<IArtpiece>('Artpiece', artpieceSchema);

export default Artpiece;