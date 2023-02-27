import mongoose from "mongoose";

export interface IFilm extends Document {
  _id: string,
	points: number,
	gallery: string
}

const filmSchema = new mongoose.Schema({
  _id: String,
  points: Number,
  gallery: { type: String, ref: "Gallery" }
});

const Film = mongoose.model<IFilm>('Film', filmSchema);

export default Film;