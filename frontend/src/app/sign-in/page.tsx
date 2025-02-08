"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you're using ShadCN Button component
import { Input } from '@/components/ui/input'; // ShadCN Input component
import { Label } from '@/components/ui/label'; // ShadCN Label component
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'; // ShadCN Card component

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    
    console.log('Login submitted:', { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1 w-full"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 w-full"
              />
            </div>

            {error && (
              <div className="mb-4 text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="mb-6 flex items-center justify-between">
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
            </div>

            <a href="/home">
              <Button className="w-full" type="submit">Sign Up</Button>

            </a>
            
          </form>
        </CardContent>

        <CardFooter className="text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">Create Account</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
