import mongoose, { Schema, Document, Types } from 'mongoose';

export interface JokeData extends Document {
    joke: string;
    impressed?: number;
    unimpressed?: number;
    displeased?: number;
    creatorId: Schema.Types.ObjectId;
    approverId: Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const JokeSchema: Schema<JokeData> = new Schema({
    joke: { type: String, required: true, unique: true, minlength: 1000 },
    impressed: { type: Number, default: 0 },
    unimpressed: { type: Number, default: 0 },
    displeased: { type: Number, default: 0 },
    creatorId: { type: Schema.Types.ObjectId, required: true },
    approverId: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true });

export const Joke = mongoose.model<JokeData>('Joke', JokeSchema);
