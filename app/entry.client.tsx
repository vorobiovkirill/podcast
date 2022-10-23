import i18next from 'i18next';
import { hydrate } from 'react-dom';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { RemixBrowser } from 'remix';

import i18nextOptions from '../i18nextOptions';

if (!i18next.isInitialized) {
    i18next
        .use(initReactI18next)
        .init(i18nextOptions)
        .then(() => {
            // remix-i18next does not use the backend capability of i18next,
            // it uses a custom backend. So here we simulate a backendConnector is used,
            // this to check for ready flag in useTranslation, etc...
            // This will be important when navigating on client side: the translations will be lazy loaded.
            i18next.services.backendConnector.backend = {
                read: (language, namespace, callback) => callback(null, {})
            };
            // then hydrate your app wrapped in the RemixI18NextProvider
            // then hydrate your app wrapped in the RemixI18NextProvider
            return hydrate(
                <I18nextProvider i18n={i18next}>
                    <RemixBrowser />
                </I18nextProvider>,
                document
            );
        });
}
