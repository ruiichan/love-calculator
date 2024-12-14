'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // TODO: 实现重置密码邮件发送功能
      // 临时模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError('发送重置密码邮件时出错');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold">找回密码</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            输入您的邮箱，我们将向您发送重置密码的链接
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {success ? (
          <div className="text-center">
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
              <p className="text-green-700">
                重置密码链接已发送到您的邮箱，请查收
              </p>
            </div>
            <Link
              href="/login"
              className="text-pink-500 hover:text-pink-600 font-medium"
            >
              返回登录
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                邮箱地址
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-pink-500 focus:ring-pink-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="请输入您的邮箱地址"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-pink-500 py-3 text-white font-semibold hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? '发送中...' : '发送重置链接'}
              </button>
            </div>

            <div className="text-center">
              <Link
                href="/login"
                className="text-sm text-pink-500 hover:text-pink-600"
              >
                返回登录
              </Link>
            </div>
          </form>
        )}
      </div>
    </main>
  );
} 