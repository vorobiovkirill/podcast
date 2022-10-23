import { json, redirect } from '@remix-run/node';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { getThemeSession } from '~/server/theme.server';
import { isTheme } from '~/providers/ThemeProvider';

export const action: ActionFunction = async ({ request }) => {
    const themeSession = await getThemeSession(request);
    const requestText = await request.text();
    const form = new URLSearchParams(requestText);
    const theme = form.get('theme');
    console.log('theme', theme)

    if (!isTheme(theme))
        return json({
            success: false,
            message: `theme value of ${theme} is not a valid theme.`
        });

    themeSession.setTheme(theme);

    console.log('themeSession', themeSession)

    return json(
        { success: true },
        {
            headers: { 'Set-Cookie': await themeSession.commit() }
        }
    );
};

export const loader: LoaderFunction = () => redirect('/', { status: 404 });

export default function MarkRead() {
    return <div>Oops... You should not see this.</div>;
}
