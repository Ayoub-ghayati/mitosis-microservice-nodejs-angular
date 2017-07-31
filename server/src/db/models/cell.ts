import { mongoose } from "../config/database";
import { Schema, Document, Model } from "mongoose";

export enum CellType {
  EUCARYOTE,
  PROCARYOTE
};

export interface ICell extends Document {
  name: string;
  type: CellType;
  color: string;
  size: number;
}

export interface ICellModel extends Model<ICell> {
  findByType(type: CellType): Promise<Array<ICell>>
}

// create a schema
const schema = new Schema({
  name: String,
  type: {
    type: String,
    enum: [CellType.EUCARYOTE, CellType.PROCARYOTE]
  },
  color: String,
  size: Number
});

schema.static("findByType", (cellType: CellType) => {
  return Cell
    .find({ 'type': cellType.toString() })
    .exec();
});

export const Cell = mongoose.model<ICell>("Cell", schema) as ICellModel;

/*// create a new user called chris
var user = new Cell({
  name: 'Nirby',
  type: CellType.PROCARYOTE
});

// call the built-in save method to save to the database
user.save(function (err) {
  if (err) throw err;

  console.log('User saved successfully!');
});*/