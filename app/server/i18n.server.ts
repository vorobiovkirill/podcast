import { RemixI18Next } from 'remix-i18next';
import { FileSystemBackend } from 'remix-i18next';
import { createCookie } from 'remix'

import i18nextOptions from '../../i18nextOptions';

// You will need to provide a backend to load your translations, here we use the
// file system one and tell it where to find the translations.
let backend = new FileSystemBackend('./public/locales');

export default new RemixI18Next(backend, {
    fallbackLng: i18nextOptions.fallbackLng, // here configure your default (fallback) language
    supportedLanguages: i18nextOptions.supportedLngs, // here configure your supported languages
    cookie: createCookie('locale')
});
