import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebaseAdmin';

export interface AuthRequest extends Request {
    uid?: string;
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if (!header?.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Missing or malformed Authorization header' });
        return;
    }

    const token = header.split('Bearer ')[1];

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.uid = decoded.uid;
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired token' });
        return;
    }
}
