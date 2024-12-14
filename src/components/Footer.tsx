import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-black py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 关于我们 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">关于我们</h3>
            <p className="text-gray-600 dark:text-gray-300">
              致力于帮助情侣了解彼此，建立更好的关系
            </p>
          </div>
          
          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-pink-500">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="/test" className="text-gray-600 dark:text-gray-300 hover:text-pink-500">
                  开始测试
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 dark:text-gray-300 hover:text-pink-500">
                  情感博客
                </Link>
              </li>
            </ul>
          </div>
          
          {/* 联系方式 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-300">
                邮箱：contact@example.com
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                微信：love_calculator
              </li>
            </ul>
          </div>
        </div>
        
        {/* 版权信息 */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-300">
          <p>© 2024 缘分计算器. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
} 