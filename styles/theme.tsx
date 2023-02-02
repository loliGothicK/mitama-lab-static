import { extendTheme } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface PaletteBackground {
    appBody: string;
    componentBg: string;
  }
}

export default extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          appBody: 'var(--joy-palette-neutral-50)',
          componentBg: 'var(--joy-palette-common-white)',
          level1: 'var(--joy-palette-neutral-100)',
          level2: 'var(--joy-palette-neutral-150)',
          level3: 'var(--joy-palette-neutral-200)',
        },
      },
    },
    dark: {
      palette: {
        background: {
          appBody: 'var(--joy-palette-common-black)',
          level1: 'var(--joy-palette-neutral-900)',
          level2: 'var(--joy-palette-neutral-800)',
          level3: 'var(--joy-palette-neutral-700)',
        },
      },
    },
  },
  fontFamily: {
    display: "'Roboto Flex', var(--joy-fontFamily-fallback)",
    body: "'Roboto Flex', var(--joy-fontFamily-fallback)",
  },
});
