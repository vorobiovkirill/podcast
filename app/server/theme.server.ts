import { createCookieSessionStorage } from '@remix-run/node';

import { isTheme, Theme } from '~/providers/ThemeProvider';

const sessionSecret = process.env.SESSION_SECRET || '40880441c710f16bcd98a29f474298bf';

if (!sessionSecret) {
    throw new Error('SESSION_SECRET must be set');
}

const themeStorage = createCookieSessionStorage({
    cookie: {
        name: 'palyanitsa_theme',
        secure: true,
        secrets: [sessionSecret],
        sameSite: 'lax',
        path: '/',
        httpOnly: true
    }
});

async function getThemeSession(request: Request) {
    const session = await themeStorage.getSession(
        request.headers.get('Cookie')
    );
    return {
        getTheme: () => {
            const themeValue = session.get('theme');
            return isTheme(themeValue) ? themeValue : Theme.RETRO;
        },
        setTheme: (theme: Theme) => session.set('theme', theme),
        commit: () => themeStorage.commitSession(session)
    };
}

export { getThemeSession };
