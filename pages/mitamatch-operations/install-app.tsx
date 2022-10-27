import {
  Button,
  Container,
  Divider,
  List,
  ListItem,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy';
import React from 'react';
import Link from '../../components/Link';
import MitamaLab from '../../components/MitamaLab';
import ReleaseNotes from '../../contents/ReleaseNotes';
import Version from '../../types/Version';

const releases: Version[] = ['0.1.14', '0.1.13', '0.1.12', '0.1.11', '0.1.10'];

const Installation: React.FC = () => {
  return (
    <MitamaLab>
      <Stack direction={'row'}>
        <Typography level="h1" component="h1">
          Releases
        </Typography>
      </Stack>
      <Divider sx={{ margin: '2% 0' }} />
      <Container>
        {releases.map((version) => {
          return (
            <Sheet
              sx={{
                mx: 'auto', // margin left & right
                my: 4, // margin top & bottom
                py: 3, // padding top & bottom
                px: 2, // padding left & right
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRadius: 'sm',
                boxShadow: 'md',
              }}
              variant="outlined"
              key={version}
            >
              <Stack direction={'row'}>
                <Typography level={'h2'}></Typography>
                <Typography level={'h2'}>{version}</Typography>
              </Stack>
              <Divider sx={{ margin: '2% 0' }} />
              <Typography level={'h2'}>{'Packages'}</Typography>
              <List>
                <Container sx={{ display: 'flex' }}>
                  <Link
                    href={ReleaseNotes[version].packages.zip}
                    download={`MitamatchOperations-${version}.zip`}
                  >
                    <Button sx={{ margin: '2% 1%' }}>
                      <Typography key={'installer'}>
                        {`MitamatchOperations-${version}.zip`}
                      </Typography>
                    </Button>
                  </Link>
                </Container>
              </List>
              <Divider sx={{ margin: '2% 0%' }} />
              <Typography level={'h3'}>{"What's new"}</Typography>
              <List>
                {ReleaseNotes[version].whatsNew.map((what, index) => {
                  return (
                    <ListItem key={index}>
                      <Typography>{what}</Typography>
                    </ListItem>
                  );
                })}
              </List>
              <Typography level={'h3'}>Bug fix</Typography>
              <List>
                {ReleaseNotes[version].bufFix.map((bugfix, index) => {
                  return (
                    <ListItem key={index}>
                      <Typography>{bugfix}</Typography>
                    </ListItem>
                  );
                })}
              </List>
            </Sheet>
          );
        })}
      </Container>
    </MitamaLab>
  );
};

export default Installation;
