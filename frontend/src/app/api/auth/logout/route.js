
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const jwtCookie = cookieHeader
      ?.split('; ')
      .find((cookie) => cookie.startsWith('jwt='));

    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: jwtCookie,
      },
      credentials: 'include',
    });

    if (response.ok) {
      const res = NextResponse.json({ message: 'Logout bem-sucedido' });
      res.cookies.set('jwt', '', { maxAge: 0 });
      return res;
    } else {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.error || 'Falha ao fazer logout' }, { status: response.status });
    }
  } catch (error) {
    console.error('Erro na API de logout:', error);
    return NextResponse.json({ error: 'Erro Interno do Servidor' }, { status: 500 });
  }
}
