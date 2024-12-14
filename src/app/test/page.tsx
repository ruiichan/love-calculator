'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 定义问题类型
interface Question {
  id: number;
  type: 'single' | 'multiple' | 'scale';
  category: string;
  question: string;
  options?: string[];
  min?: number;
  max?: number;
}

// 问题列表
const questions: Question[] = [
  // 基本信息
  {
    id: 1,
    type: 'single',
    category: '基本信息',
    question: '您的性别是？',
    options: ['男', '女', '其他']
  },
  {
    id: 2,
    type: 'single',
    category: '基本信息',
    question: '您的年龄范围是？',
    options: ['18-25岁', '26-30岁', '31-35岁', '36-40岁', '40岁以上']
  },
  {
    id: 3,
    type: 'single',
    category: '基本信息',
    question: '您目前的感情状态是？',
    options: ['单身', '恋爱中', '已婚', '离异', '其他']
  },
  // 性格测评
  {
    id: 4,
    type: 'scale',
    category: '性格测评',
    question: '您认为自己是一个外向的人吗？',
    min: 1,
    max: 5
  },
  {
    id: 5,
    type: 'multiple',
    category: '性格测评',
    question: '您的兴趣爱好包括？（可多选）',
    options: ['运动健身', '读书', '旅行', '音乐', '电影', '美食', '摄影', '其他']
  },
  // 感情经历
  {
    id: 6,
    type: 'single',
    category: '感情经历',
    question: '您期望的关系类型是？',
    options: ['长期稳定关系', '短期约会', '婚姻', '暂时不确定']
  }
];

export default function TestPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [loading, setLoading] = useState(false);

  const handleAnswer = (questionId: number, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // 调用预测API
      const response = await fetch('/api/prediction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '提交失败');
      }

      // 将结果存储在 localStorage 中，以便结果页面可以访问
      localStorage.setItem('predictionResult', JSON.stringify(data.result));

      // 提交成功后跳转到结果页面
      router.push('/result');
    } catch (error) {
      console.error('提交失败:', error);
      alert('提交失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[currentStep];

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'single':
        return (
          <div className="space-y-4">
            {currentQuestion.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option}
                  checked={answers[currentQuestion.id] === option}
                  onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                  className="h-4 w-4 text-pink-500 focus:ring-pink-500"
                />
                <span className="text-gray-700 dark:text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'multiple':
        return (
          <div className="space-y-4">
            {currentQuestion.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  value={option}
                  checked={answers[currentQuestion.id]?.includes(option)}
                  onChange={(e) => {
                    const currentAnswers = answers[currentQuestion.id] || [];
                    const newAnswers = e.target.checked
                      ? [...currentAnswers, option]
                      : currentAnswers.filter((a: string) => a !== option);
                    handleAnswer(currentQuestion.id, newAnswers);
                  }}
                  className="h-4 w-4 rounded text-pink-500 focus:ring-pink-500"
                />
                <span className="text-gray-700 dark:text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'scale':
        return (
          <div className="space-y-4">
            <input
              type="range"
              min={currentQuestion.min}
              max={currentQuestion.max}
              value={answers[currentQuestion.id] || currentQuestion.min}
              onChange={(e) => handleAnswer(currentQuestion.id, parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>非常不同意</span>
              <span>一般</span>
              <span>非常同意</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        {/* 进度条 */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-pink-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* 问题类别 */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {currentQuestion.category}
        </div>

        {/* 问题 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">{currentQuestion.question}</h2>
          {renderQuestion()}
        </div>

        {/* 按钮组 */}
        <div className="flex justify-between pt-6">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-6 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一题
          </button>
          <button
            onClick={handleNext}
            disabled={loading || !answers[currentQuestion.id]}
            className="px-6 py-2 rounded-md bg-pink-500 text-white hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === questions.length - 1 ? (loading ? '提交中...' : '提交') : '下一题'}
          </button>
        </div>
      </div>
    </main>
  );
} 