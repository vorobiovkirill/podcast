import { RemixI18Next, FileSystemBackend } from 'remix-i18next';
import { createCookie } from 'remix'

import i18nextOptions from '../../i18nextOptions';

const HOST_URL = process.env.NODE_ENV !== 'production' ? './public/locales' : `https://${process.env.VERCEL_URL}`

// You will need to provide a backend to load your translations, here we use the
// file system one and tell it where to find the translations.
let backend = new FileSystemBackend(HOST_URL);

export default new RemixI18Next(backend, {
    fallbackLng: i18nextOptions.fallbackLng, // here configure your default (fallback) language
    supportedLanguages: i18nextOptions.supportedLanguages, // here configure your supported languages
    cookie: createCookie('locale')
});
