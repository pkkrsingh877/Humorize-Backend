import mongoose, { Schema, Document, Model } from 'mongoose';

export interface JokeData extends Document {
    joke: string;
    impressed?: number;
    unimpressed?: number;
    displeased?: number;
    creator: Schema.Types.ObjectId | string;
    approver?: Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const JokeSchema: Schema<JokeData> = new Schema({
    joke: { type: String, required: true, unique: true, maxlength: 1000 },
    impressed: { type: Number, default: 0 },
    unimpressed: { type: Number, default: 0 },
    displeased: { type: Number, default: 0 },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    approver: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Joke: Model<JokeData> = mongoose.model<JokeData>('Joke', JokeSchema);

export default Joke;