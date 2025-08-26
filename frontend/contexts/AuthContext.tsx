'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../lib/api';

interface User {
    id: number,
    email: string,
    name: string,
    role: 'admin' | 'user'
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

export const AuthContextType = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = () => {

            const token = localStorage.getItem('authToken');
            const userData = localStorage.getItem('userData');

            if (token && userData) {
                setUser(JSON.parse(userData));
            }
            setLoading(false);

        }
        initAuth();
        
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;

            localStorage.setItem('authToken', token);
            localStorage.setItem('userData', JSON.stringify(user));
            setUser(user);
        } catch (error) {
            throw new Error('Login failed');
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const response = await api.post('/users/signup', { name, email, password });
            const { token, user } = response.data;

            localStorage.setItem('authToken', token);
            localStorage.setItem('userData', JSON.stringify(user));
            setUser(user);
        } catch (error) {
            throw new Error('Registration failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setUser(null);
    };

    return (
        <AuthContextType.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContextType.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContextType);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};