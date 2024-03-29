import { usePageView } from '../hooks/usePageView';
import '../styles/global.css';
import createEmotionCache from '../utility/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import * as React from 'react';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import 'zenn-content-css';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const MyApp: React.FunctionComponent<MyAppProps> = props => {
  usePageView();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  useEffect(() => {
    import('zenn-embed-elements');
  }, []);
  return (
    <CacheProvider value={emotionCache}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </CacheProvider>
  );
};

export default appWithTranslation(MyApp);
