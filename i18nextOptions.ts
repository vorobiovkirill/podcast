export default {
    debug: process.env.NODE_ENV !== 'production',
    fallbackLng: 'en',
    supportedLngs: ['en', 'ua'],
    defaultNS: 'common',
    ns: ['common', 'meta'],
    react: { useSuspense: false },
  }