import * as dotenv from "dotenv";
dotenv.config();

const MONGODB_URI: string = process.env.MONGODB_URI;
const PORT: string = process.env.PORT;

export { MONGODB_URI, PORT };
