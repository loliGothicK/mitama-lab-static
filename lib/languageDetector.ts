import { default as i18nextConfig } from '../next-i18next.config';
import languageDetector from 'next-language-detector';

export default languageDetector({
  fallbackLng: i18nextConfig.i18n.defaultLocale,
  supportedLngs: i18nextConfig.i18n.locales,
});
