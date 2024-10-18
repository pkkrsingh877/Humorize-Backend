// types.d.ts
import { ObjectId } from 'mongoose'; // or wherever your ObjectId is coming from

declare global {
    namespace Express {
        interface Request {
            user?: { id: ObjectId }; // Adjust this according to your user structure
        }
    }
}
