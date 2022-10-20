import * as React from "react";
import { GlobalStyles } from "@mui/system";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import type { Theme } from "@mui/joy/styles";
import {
  Box,
  Chip,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  ListItemContent,
  Divider,
  Container,
} from "@mui/joy";

// Icons import
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import MenuIcon from "@mui/icons-material/Menu";
import BookRoundedIcon from "@mui/icons-material/BookRounded";

// custom
import teamTheme from "../styles/theme";
import Menu from "./MitamaLab/Menu";
import * as Layout from "./MitamaLab/Layout";
import { default as NextLink } from "next/link";

const ColorSchemeToggle = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="primary"
      onClick={() => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
};

function ContentNav() {
  return (
    <List size="sm" sx={{ "--List-item-radius": "8px" }}>
      <ListItem nested sx={{ p: 0 }}>
        <Box
          sx={{
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            id="nav-list-browse"
            textColor="neutral.500"
            fontWeight={700}
            sx={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: ".1rem",
            }}
          >
            Browse
          </Typography>
          <IconButton
            size="sm"
            variant="plain"
            color="primary"
            sx={{ "--IconButton-size": "24px" }}
          >
            <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
          </IconButton>
        </Box>
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            "& .JoyListItemButton-root": { p: "8px" },
          }}
        >
          <ListItem>
            <ListItemButton variant="soft" color="primary">
              <ListItemDecorator sx={{ color: "inherit" }}>
                <PeopleRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <NextLink href={"/"}>
                <ListItemContent>HOME</ListItemContent>
              </NextLink>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator sx={{ color: "neutral.500" }}>
                <AssignmentIndRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <NextLink href={"/mitamatch-operations"}>
                <ListItemContent>Mitamatch Operations</ListItemContent>
              </NextLink>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator sx={{ color: "neutral.500" }}>
                <ArticleRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>ラーメンAPI</ListItemContent>
              <Chip variant="soft" size="sm" sx={{ borderRadius: "sm" }}>
                Beta
              </Chip>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
}

const MitamaLab: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <CssVarsProvider disableTransitionOnChange theme={teamTheme}>
      <GlobalStyles<Theme>
        styles={(theme) => ({
          body: {
            margin: 0,
            fontFamily: theme.vars.fontFamily.body,
          },
        })}
      />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <ContentNav />
        </Layout.SideDrawer>
      )}
      <Layout.Root
        sx={{
          ...(drawerOpen && {
            height: "100vh",
            overflow: "hidden",
          }),
        }}
      >
        <Layout.Header>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <IconButton
              variant="outlined"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: { xs: "none", sm: "inline-flex" } }}>
              <NextLink href={"/"}>
                <img
                  src="/MitamaLabLogo.svg"
                  alt={"logo"}
                  width={50}
                  height={50}
                />
              </NextLink>
            </Box>
            <Divider orientation="vertical" />
            <Typography
              component="h1"
              fontWeight="xl"
              width={"100%"}
              height={"100%"}
            >
              {"Mitama Lab."}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}>
            <IconButton
              size="sm"
              variant="outlined"
              color="primary"
              sx={{ display: { xs: "inline-flex", sm: "none" } }}
            >
              <SearchRoundedIcon />
            </IconButton>
            <IconButton
              size="sm"
              variant="outlined"
              color="primary"
              component="a"
              href="/blog/first-look-at-joy/"
            >
              <BookRoundedIcon />
            </IconButton>
            <Menu
              id="app-selector"
              control={
                <IconButton
                  size="sm"
                  variant="outlined"
                  color="primary"
                  aria-label="Apps"
                >
                  <GridViewRoundedIcon />
                </IconButton>
              }
              menus={[
                {
                  label: "Lab",
                  active: true,
                  href: "/",
                },
                {
                  label: "Blog",
                  href: "/",
                  target: "_blank",
                },
                {
                  label: "GitHub",
                  href: "https://github.com/LoliGothick",
                  target: "_blank",
                },
              ]}
            />
            <ColorSchemeToggle />
          </Box>
        </Layout.Header>
        <Layout.SideNav>
          <ContentNav />
        </Layout.SideNav>
        <Layout.Main>{children}</Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
};

export default MitamaLab;
