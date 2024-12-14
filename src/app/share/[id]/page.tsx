'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PredictionResult } from '@/utils/prediction';

// 社交媒体分享按钮组件
const ShareButtons = ({ url, title }: { url: string; title: string }) => {
  const shareData = {
    weibo: `http://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    qq: `http://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    wechat: '#' // 微信分享需要使用 SDK
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => window.open(shareData.weibo, '_blank')}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        分享到微博
      </button>
      <button
        onClick={() => window.open(shareData.qq, '_blank')}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        分享到QQ
      </button>
      <button
        onClick={() => alert('请使用微信扫描二维码分享')}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        分享到微信
      </button>
    </div>
  );
};

export default function SharePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedResult = async () => {
      try {
        const response = await fetch(`/api/share?id=${params.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || '获取分享结果失败');
        }

        setResult(data.result);
      } catch (error) {
        console.error('获取分享结果失败:', error);
        setError(error instanceof Error ? error.message : '获取分享结果失败');
      } finally {
        setLoading(false);
      }
    };

    fetchSharedResult();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">正在加载分享结果...</p>
        </div>
      </main>
    );
  }

  if (error || !result) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-500">{error || '分享的结果不存在'}</p>
          <button
            onClick={() => router.push('/test')}
            className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
          >
            参与测试
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
          <h1 className="text-4xl font-bold mb-2">爱情预测结果分享</h1>
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
          <h2 className="text-xl font-semibold mb-4">特征标签</h2>
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

        {/* 分享按钮 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">分享到社交媒体</h2>
          <ShareButtons
            url={typeof window !== 'undefined' ? window.location.href : ''}
            title={`我在爱情预测测试中获得了 ${result.score} 分，快来测试你的分数吧！`}
          />
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-center">
          <button
            onClick={() => router.push('/test')}
            className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
          >
            我也要测试
          </button>
        </div>
      </div>
    </main>
  );
} 