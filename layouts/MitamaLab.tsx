import Footer from '../components/footer';
import { DarkMode, LightMode } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { blueGrey } from '@mui/material/colors';
import { createTheme, styled, ThemeProvider, useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { default as NextLink } from 'next/link';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

const drawerWidth = 240;
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const MitamaLabBase: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const colorMode = React.useContext(ColorModeContext);
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: theme.palette.primary.main }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" noWrap component="div">
              <NextLink href={'/'}>
                <Image src={'/MitamaLabHeader.svg'} alt={'header'} height={40} width={200} />
              </NextLink>
            </Typography>
          </Box>
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          sx={{
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon
                sx={{
                  bgcolor: theme.palette.background.default,
                  color: theme.palette.text.primary,
                }}
              />
            ) : (
              <ChevronRightIcon
                sx={{
                  bgcolor: theme.palette.background.default,
                  color: theme.palette.text.primary,
                }}
              />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider
          sx={{
            bgcolor: theme.palette.background.default,
          }}
        />
        <List
          sx={{
            bgcolor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          {['blog'].map((text, index) => (
            <Link href={`/${text}`} key={index}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Main
        open={open}
        sx={{
          marginTop: 10,
          padding: 0,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            minHeight: '65vh',
          }}
        >
          {children}
        </Box>
        <Footer
          sx={{
            position: 'absolute',
            bottom: 0,
          }}
        />
      </Main>
    </Box>
  );
};

const MitamaLab: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => {
          if (prevMode === 'light') {
            localStorage.setItem('paletteMode', 'dark');
            return 'dark';
          } else {
            localStorage.setItem('paletteMode', 'light');
            return 'light';
          }
        });
      },
    }),
    [mode],
  );

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    if (localStorage.getItem('paletteMode') === 'dark') {
      setMode('dark');
    } else if (localStorage.getItem('paletteMode') === 'light') {
      setMode('light');
    } else if (prefersDarkMode) {
      setMode('dark');
    } else {
      setMode('light');
    }
  }, [prefersDarkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: blueGrey,
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MitamaLabBase>{children}</MitamaLabBase>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default MitamaLab;
