'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';

type AuthTab = 'login' | 'signup';

export default function Home() {
    const { user, loading } = useAuth();
    const [activeTab, setActiveTab] = useState<AuthTab>('login');

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return (<div className="min-h-screen flex items-center justify-center bg-gray-100">
            {activeTab === 'signup' ? (
                <div className="w-full max-w-md">
                    <SignupForm />
                    <div className="my-6 border-t" />
                    <button className="w-full bg-blue-500 text-white p-2 rounded" onClick={() => setActiveTab('login')}>Login</button>
                </div>
            ) : (
                <div className="w-full max-w-md">
                    <LoginForm />
                    <div className="my-6 border-t" />
                    <button className="w-full bg-blue-500 text-white p-2 rounded" onClick={() => setActiveTab('signup')}>Sign Up</button>
                </div>
            )}
        </div>);
            
    }


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
                    <p className="text-lg">You are logged in as {user.role}.</p>
                </div>
        </div>
    );
}
