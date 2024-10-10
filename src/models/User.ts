import mongoose, { Schema, Document } from 'mongoose';

export interface UserData extends Document {
    name?: string;
    email: string;
    password: string;
}

const UserSchema: Schema<UserData> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export const User = mongoose.model<UserData>('User', UserSchema);
