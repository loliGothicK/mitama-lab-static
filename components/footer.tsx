import {styled, useTheme} from '@mui/material/styles';
import {Container} from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';

import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

const FooterBox = styled(Box)(({ theme }) => ({
  footerNav: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: theme.spacing(1)
  },
  footerLink: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
  }
}));

export default function Footer({ ...props }) {
  const theme = useTheme();
  const content = {
    copy: '© 2023 Mitama Lab. All rights reserved.',
    link1: 'blog',
    ...props
  };
  
  return (
    <footer>
      <Container maxWidth="lg">
        <Box py={6} textAlign="center">
          <FooterBox component="nav">
            <Link href="#" variant="body1" color={theme.palette.text.secondary}>{content['link1']}</Link>
          </FooterBox>
          <Box mb={3}>
            <IconButton aria-label="Twitter" sx={{ color: theme.palette.text.secondary }}>
              <TwitterIcon />
            </IconButton>
            <IconButton aria-label="GitHub" sx={{ color: theme.palette.text.secondary }}>
              <GitHubIcon />
            </IconButton>
          </Box>
          <Typography color={theme.palette.text.secondary} component="p" variant="body2" gutterBottom={false}>{content['copy']}</Typography>
        </Box>
      </Container>
    </footer>
  );
}