import clsx from 'clsx';
import {
    createCookie,
    json
} from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useCatch,
    useLoaderData,
    useLocation
} from '@remix-run/react'
import type { LoaderFunction, MetaFunction, LinksFunction } from '@remix-run/node';
import { useChangeLanguage } from "remix-i18next";
import { useTranslation } from "react-i18next";

import { Footer } from '~/components/layout/Footer';
import { Navbar } from '~/components/layout/Navbar';

import type { Theme } from '~/providers/ThemeProvider';
import {
    NonFlashOfWrongThemeEls,
    ThemeProvider,
    useTheme
} from '~/providers/ThemeProvider';

import { getEnv } from './server/env.server';
import i18next from '~/server/i18next.server';
import { getThemeSession } from '~/server/theme.server';

import styles from '~/styles/app.css';

export type LoaderData = {
    ENV: ReturnType<typeof getEnv>;
    locale: string;
    requestInfo: {
        session: {
            theme: Theme | null;
        };
    };
    title: string;
    description: string;
};

export const links: LinksFunction = () => {
    return [
        {
            color: '#ffb03a',
            rel: "mask-icon",
            href: "/favicons/safari-pinned-tab.svg"
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: "76x76",
            href: "/favicons/apple-touch-icon.png"
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/favicons/favicon-32x32.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/favicons/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: styles }
    ];
};

export const loader: LoaderFunction = async ({ request }) => {
    const themeSession = await getThemeSession(request);
    const locale = await i18next.getLocale(request);
    const t = await i18next.getFixedT(request, 'meta');
    const title = t('title');
    const description = t('description');
    const lngInQuery = new URL(request.url).searchParams.get('lng');

    const headers: HeadersInit = new Headers();

    if (lngInQuery) {
        // on language change via lng search param, save selection to cookie
        headers.append(
            'Set-Cookie',
            await createCookie('locale').serialize(locale)
        );
    }

    const data: LoaderData = {
        ENV: getEnv(),
        locale,
        requestInfo: {
            session: {
                theme: themeSession.getTheme()
            }
        },
        title,
        description,
    };

    return json(data, { headers });
};

export let handle = {
    // In the handle export, we can add a i18n key with namespaces our route
    // will need to load. This key can be a single string or an array of strings.
    // TIP: In most cases, you should set this to your defaultNS from your i18n config
    // or if you did not set one, set it to the i18next default namespace "translation"
    i18n: ["common"],
};

export const meta: MetaFunction = ({ data }) => {
    const metaTitle = data.title;
    const metaDescription = data.description;
    return {
        metaTitle,
        metaDescription,
        viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
        "msapplication-TileColor": "#ffb03a",
        'theme-color': '#ffb03a'
    };
};

function App() {
    const data = useLoaderData<LoaderData>();
    const { i18n } = useTranslation();
    const [theme] = useTheme();

    // This hook will change the i18n instance language to the current locale
    // detected by the loader, this way, when we do something to change the
    // language, this locale will change and i18next will load the correct
    // translation files
    useChangeLanguage(data.locale);

    return (
        <html className={clsx(theme)} lang={data.locale} data-theme={theme} dir={i18n.dir()}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" />
                {data?.title ? <title>{data.title}</title> : null}
                <Meta />
                <Links />
                <NonFlashOfWrongThemeEls ssrTheme={Boolean(data.requestInfo.session.theme)} />
            </head>
            <body>
                <Navbar />
                <Outlet />
                <Footer />
                <ScrollRestoration />
                <Scripts />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.ENV = ${JSON.stringify(data.ENV)};`
                    }}
                />
                {process.env.NODE_ENV === 'development' && <LiveReload />}
            </body>
        </html>
    );
}

export default function AppWithProviders() {
    const data = useLoaderData<LoaderData>()
    return (
        <ThemeProvider specifiedTheme={data.requestInfo.session.theme}>
            <App />
        </ThemeProvider>
    )
}

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error)
    const location = useLocation()
    return (
        <html lang="en" className="dark">
            <head>
                <title>Oh no...</title>
                <Links />
            </head>
            <body className="bg-white transition duration-500 dark:bg-gray-900">
                FUUUUUUUUUUUUUU
                <Scripts />
            </body>
        </html>
    )
}

export function CatchBoundary() {
    const caught = useCatch()
    const location = useLocation()
    console.error('CatchBoundary', caught)
    if (caught.status === 404) {
        return (
            <html lang="en" className="dark">
                <head>
                    <title>Oh no...</title>
                    <Links />
                </head>
                <body className="bg-white transition duration-500 dark:bg-gray-900">
                    ERROR
                    <Scripts />
                </body>
            </html>
        )
    }
    throw new Error(`Unhandled error: ${caught.status}`)
}