'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/common/AuthContext';
import Link from 'next/link';

const GoogleIcon = () => (
    <svg className="google-icon" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

export default function TutorLoginPage() {
    const router = useRouter();
    const { signIn, signInWithGoogle, refreshUserData } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signIn(email, password);
            await refreshUserData();
            router.push('/tutor');
        } catch (err: any) {
            setError(err.message || 'Failed to sign in');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setLoading(true);
        setError('');
        try {
            await signInWithGoogle();
            await refreshUserData();
            router.push('/tutor');
        } catch (err: any) {
            setError(err.message || 'Google sign-in failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            {/* Left Panel */}
            <div className="auth-left tutor">
                <div className="auth-circle auth-circle-1" />
                <div className="auth-circle auth-circle-2" />
                <div className="auth-circle auth-circle-3" />

                <div className="auth-logo tutor">M</div>

                <h1 className="auth-tagline">
                    Welcome back,{' '}
                    <span className="highlight-tutor">Tutor.</span>
                </h1>

                <p className="auth-subtitle">
                    Sign in to manage your sessions, track earnings, and continue making an impact.
                </p>

                <ul className="auth-features">
                    <li className="auth-feature">
                        <span className="auth-feature-icon">🎓</span>
                        Teach students 1-on-1 in live sessions
                    </li>
                    <li className="auth-feature">
                        <span className="auth-feature-icon">💰</span>
                        Set your own hourly rates &amp; earn
                    </li>
                    <li className="auth-feature">
                        <span className="auth-feature-icon">📊</span>
                        Track your analytics &amp; ratings
                    </li>
                </ul>
            </div>

            {/* Right Panel */}
            <div className="auth-right">
                <div className="auth-form-container">
                    <div className="auth-brand">
                        <div className="auth-brand-logo tutor">M</div>
                        <span className="auth-brand-text tutor">Mentora Tutor</span>
                    </div>

                    <h2 className="auth-heading">Welcome back</h2>
                    <p className="auth-subheading tutor">Sign in to your tutor account</p>

                    {error && <div className="auth-error">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="auth-field">
                            <label className="auth-label">Email</label>
                            <input
                                className="auth-input tutor-focus"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="auth-field">
                            <label className="auth-label">Password</label>
                            <input
                                className="auth-input tutor-focus"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button className="auth-submit tutor" type="submit" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="auth-divider">
                        <div className="auth-divider-line" />
                        <span className="auth-divider-text">OR</span>
                        <div className="auth-divider-line" />
                    </div>

                    <button className="auth-google" onClick={handleGoogle} disabled={loading}>
                        <GoogleIcon />
                        Continue with Google
                    </button>

                    <p className="auth-links">
                        Don&apos;t have an account?{' '}
                        <Link href="/tutor/signup" className="auth-link tutor">Sign Up</Link>
                    </p>
                    <Link href="/" className="auth-back-link">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
