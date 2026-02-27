import { Router, Response } from 'express';
import admin from '../config/firebaseAdmin';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

const router = Router();

// POST /api/auth/register — Create user doc in Firestore after client signup
router.post('/register', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const uid = req.uid!;
        const { fullName, role } = req.body;

        if (!fullName || !role) {
            res.status(400).json({ error: 'fullName and role are required' });
            return;
        }

        const validRoles = ['student', 'tutor', 'parent'];
        if (!validRoles.includes(role)) {
            res.status(400).json({ error: 'Invalid role' });
            return;
        }

        const firebaseUser = await admin.auth().getUser(uid);

        const userData: Record<string, any> = {
            roles: [role],
            profile: {
                fullName,
                email: firebaseUser.email || '',
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            },
            studentData: role === 'student' ? { classLevel: '', examFocus: [], linkedParentIds: [] } : null,
            tutorData: role === 'tutor' ? {
                isVerified: false,
                subjects: [],
                availability: [],
                teachingMode: 'Online',
                sessionPrice: 0,
                walletBalance: 0,
                aggregateRating: 0,
                demoVideoUrl: '',
            } : null,
            parentData: role === 'parent' ? { linkedStudentIds: [] } : null,
        };

        await admin.firestore().collection('users').doc(uid).set(userData);

        res.status(201).json({ message: 'User registered', uid });
    } catch (err: any) {
        console.error('Register error:', err);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// GET /api/auth/me — Get current user's Firestore doc
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const snap = await admin.firestore().collection('users').doc(req.uid!).get();
        if (!snap.exists) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ uid: req.uid, ...snap.data() });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

export default router;
