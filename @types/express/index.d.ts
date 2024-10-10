import { Schema } from 'mongoose';

declare global {
    namespace Express {
        interface Request {
            user?: {
                _id: Schema.Types.ObjectId
            }
        }
    }
}
