import { CacheProvider, EmotionCache } from '@emotion/react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssVarsProvider } from '@mui/joy/styles';
import { ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import * as React from 'react';

import '../styles/globals.css';
import extendTheme from '../styles/theme';
import createEmotionCache from '../utility/createEmotionCache';
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={extendTheme}>
        <CssVarsProvider>
          <Component {...pageProps} />
        </CssVarsProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
