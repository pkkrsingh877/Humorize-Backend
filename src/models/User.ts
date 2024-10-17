import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserData extends Document {
    name?: string;
    email: string;
    password: string;
    role?: 'User' | 'Moderator';
    createdAt?: Date;
    updatedAt?: Date;
    comparePassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema: Schema<UserData> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['User', 'Moderator'],
        default: 'User',
        required: true
    }
}, { timestamps: true });

// Hash password before saving user
UserSchema.pre<UserData>('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if the password has been changed or is new

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err as Error);
    }
});

// Method to compare provided password with hashed password
UserSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, this.password);
};

const User: Model<UserData> = mongoose.model<UserData>('User', UserSchema);

export default User;