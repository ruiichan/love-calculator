'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PredictionResult } from '@/utils/prediction';

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // 从 localStorage 获取预测结果
      const savedResult = localStorage.getItem('predictionResult');
      if (savedResult) {
        setResult(JSON.parse(savedResult));
      } else {
        // 如果没有结果，重定向到测试页面
        router.push('/test');
      }
    } catch (error) {
      console.error('获取结果失败:', error);
      setError('获取结果失败');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleShare = async () => {
    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ result }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '分享失败');
      }

      // 复制分享链接到剪贴板
      const shareUrl = `${window.location.origin}${data.shareUrl}`;
      await navigator.clipboard.writeText(shareUrl);
      alert('分享链接已复制到剪贴板！');

      // 跳转到分享页面
      router.push(data.shareUrl);
    } catch (error) {
      console.error('分享失败:', error);
      alert('分享失败，请重试');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">正在生成预测结果...</p>
        </div>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-500">获取结果失败</p>
          <button
            onClick={() => router.push('/test')}
            className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
          >
            重新测试
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 总分展示 */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">爱情预测结果</h1>
          <div className="relative inline-block">
            <svg className="w-48 h-48" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#ec4899"
                strokeWidth="10"
                strokeDasharray={`${result.score * 2.83} 283`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div>
                <div className="text-4xl font-bold">{result.score}</div>
                <div className="text-sm text-gray-500">总分</div>
              </div>
            </div>
          </div>
        </div>

        {/* 详细分数 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">兼容性评分</h2>
            <div className="relative h-4 bg-gray-200 rounded-full">
              <div
                className="absolute h-full bg-pink-500 rounded-full"
                style={{ width: `${result.compatibility}%` }}
              ></div>
            </div>
            <div className="mt-2 text-right text-sm text-gray-600">
              {result.compatibility}分
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">发展潜力</h2>
            <div className="relative h-4 bg-gray-200 rounded-full">
              <div
                className="absolute h-full bg-pink-500 rounded-full"
                style={{ width: `${result.potential}%` }}
              ></div>
            </div>
            <div className="mt-2 text-right text-sm text-gray-600">
              {result.potential}分
            </div>
          </div>
        </div>

        {/* 特征标签 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">你的特征</h2>
          <div className="flex flex-wrap gap-2">
            {result.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 建议列表 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">专业建议</h2>
          <ul className="space-y-4">
            {result.advice.map((advice, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-pink-100 text-pink-800 rounded-full text-sm mr-3">
                  {index + 1}
                </span>
                <span className="text-gray-700 dark:text-gray-300">{advice}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => router.push('/test')}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            重新测试
          </button>
          <button
            onClick={handleShare}
            className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
          >
            分享结果
          </button>
        </div>
      </div>
    </main>
  );
} 