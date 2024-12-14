import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="font-bold text-xl">
            缘分计算器
          </Link>
          <div className="flex space-x-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              登录
            </Link>
            <Link
              href="/register"
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full"
            >
              注册
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 