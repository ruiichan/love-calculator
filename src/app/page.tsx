import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          探索你们的缘分指数
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">
          通过科学的测试方法，了解你们的关系潜力
        </p>
        <Link
          href="/test"
          className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors"
        >
          开始测试
        </Link>
      </section>

      {/* Features Section */}
      <section className="mt-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="text-center p-6">
          <h3 className="text-xl font-semibold mb-4">科学测试</h3>
          <p className="text-gray-600 dark:text-gray-300">
            基于心理学研究的专业测试方法
          </p>
        </div>
        <div className="text-center p-6">
          <h3 className="text-xl font-semibold mb-4">即时结果</h3>
          <p className="text-gray-600 dark:text-gray-300">
            完成测试后立即获得详细分析报告
          </p>
        </div>
        <div className="text-center p-6">
          <h3 className="text-xl font-semibold mb-4">专业建议</h3>
          <p className="text-gray-600 dark:text-gray-300">
            获得改善关系的专业建议和指导
          </p>
        </div>
      </section>
    </main>
  );
}
