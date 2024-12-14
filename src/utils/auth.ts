// API endpoints
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Interface for login response
interface LoginResponse {
  success: boolean;
  token?: string;
  error?: string;
}

// Login function
export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || '登录失败');
    }

    // Store the token in localStorage if login is successful
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }

    return {
      success: true,
      token: data.token,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '登录过程中发生错误',
    };
  }
}

// Logout function
export function logoutUser(): void {
  localStorage.removeItem('authToken');
}

// Check if user is logged in
export function isLoggedIn(): boolean {
  return !!localStorage.getItem('authToken');
} 