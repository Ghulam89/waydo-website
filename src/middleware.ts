import { default as appConfig, default as config } from '@config';
import { UserV1I } from '@redux/rtk/server/v1/me/me.interfaces';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const isFileRegex = /(api|_next\/static|_next\/image|favicon\.ico|\/_next)/;

interface ValidateAuthI {
  cookies: string | null;
  req: NextRequest;
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const response = NextResponse.next()

  if (config.basicAuth.active) {
    const auth = request.headers.get('authorization');

    if (auth) {
      const [scheme, credentials] = auth.split(' ');

      if (scheme === 'Basic' && credentials) {
        const [user, pass] = Buffer.from(credentials, 'base64').toString().split(':');

        if (user === config.basicAuth.username && pass === config.basicAuth.password) {
          return NextResponse.next();
        }
      }
    }

    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  try {
    if (url.pathname.indexOf('.') != -1 || typeof window !== 'undefined') return response
    if (isFileRegex.test(url.pathname)) return response;

    const isPathAuth = Boolean(url.pathname.includes('auth'))
    const cookies = request.headers.get('Cookie')
    const user = await getUser({
      cookies,
      req: request
    });

    /**
     * HERE BELLOW DECLARED PROTECTED ROUTES
     */
    const protectedRoutes = [
      '/profile',
      '/2fa',
      '/posts/create',
      '/searches',
      '/favorites',
      '/notifications',
      '/announcements',
      '/my-company',
      '/dashboard',
    ];

    const isPathProtected = !!protectedRoutes
      .find(path => url.pathname.includes(path));

    if (isPathProtected && !user) {
      url.pathname = "/auth/signin";
      return NextResponse.redirect(url);
    }

    if (user && isPathAuth) {
      url.pathname = '/'
      return NextResponse.redirect(url)
    }

    return response
  } catch (error) {
    return response
  }
}

const getUser = async ({
  cookies,
  req,
}: ValidateAuthI): Promise<UserV1I | null> => {
  return new Promise((resolve) => {
    const url = req.nextUrl.clone();

    fetch(`${appConfig.server.api}/v1/me`, {
      credentials: "include",
      method: "GET",
      headers: {
        Cookie: `${cookies}`,
        Origin: appConfig.app.url || url.origin,
      },
    })
      .then((result) => result.json())
      .then((response) => {
        resolve(response.error ? null : response);
      })
      .catch((error) => [console.error({ error }), resolve(null)]);
  });
};
