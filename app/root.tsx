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
    useLoaderData
} from '@remix-run/react'
import type { LoaderFunction, MetaFunction, LinksFunction } from '@remix-run/node';
import { useSetupTranslations } from 'remix-i18next';

import { Footer } from '~/components/layout/Footer';
import { Navbar } from '~/components/layout/Navbar';

import type { Theme } from '~/providers/ThemeProvider';
import {
    NonFlashOfWrongThemeEls,
    ThemeProvider,
    useTheme
} from '~/providers/ThemeProvider';

import { getEnv } from './server/env.server';
import remixI18n from '~/server/i18n.server';
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
    const locale = await remixI18n.getLocale(request);
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
        }
    };

    return json(data, { headers });
};

export const meta: MetaFunction = () => {
    const metaTitle = 'Скажи Паляниця | Podcast';
    const metaDescription = 'Наш любимый подкасик';
    return {
        metaTitle,
        metaDescription,
        viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
        "msapplication-TileColor": "#ffb03a",
        'theme-color': '#ffb03a'
    };
};

export default function App() {
    const data = useLoaderData<LoaderData>();
    useSetupTranslations(data.locale);

    // console.log('locale', locale);
    // console.log('theme', theme);

    return (
        <ThemeProvider specifiedTheme={data.requestInfo.session.theme}>
            <Document
                env={data.ENV}
                locale={data.locale}
                specifiedTheme={data.requestInfo.session.theme}
            >
                <Layout>
                    <Outlet />
                </Layout>
            </Document>
        </ThemeProvider>
    );
}

const Document = ({
    children,
    env,
    locale,
    specifiedTheme,
    title
}: {
    children: React.ReactNode;
    env: ReturnType<typeof getEnv>,
    locale: string;
    specifiedTheme: Theme | null;
    title?: string;
}) => {
    const [theme] = useTheme();

    return (
        <html className={clsx(theme)} lang={locale} data-theme={theme}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" />
                {title ? <title>{title}</title> : null}
                <Meta />
                <Links />
                <NonFlashOfWrongThemeEls ssrTheme={Boolean(specifiedTheme)} />
            </head>
            <body>
                <Navbar />
                {children}
                <Footer />
                <ScrollRestoration />
                <Scripts />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.ENV = ${JSON.stringify(env)};`
                    }}
                />
                {process.env.NODE_ENV === 'development' && <LiveReload />}
            </body>
        </html>
    );
};

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
    return <main>{children}</main>;
};

export const CatchBoundary = () => {
    let caught = useCatch();

    let message;
    switch (caught.status) {
        case 404:
            message = <p>This is a custom error message for 404 pages</p>;
            break;
        // You can customize the behavior for other status codes
        default:
            throw new Error(caught.data || caught.statusText);
    }

    return (
        <Document title={`${caught.status} ${caught.statusText}`}>
            <Layout>
                <h1>
                    {caught.status}: {caught.statusText}
                </h1>
                {message}
            </Layout>
        </Document>
    );
};
