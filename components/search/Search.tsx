import Hits from './Hits';
import { Search as SearchIcon } from '@mui/icons-material';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import algoliasearch from 'algoliasearch/lite';
import * as React from 'react';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';

export default function Search() {
  const theme = useTheme();
  const searchClient = algoliasearch('RCM8CWQP3S', '82a6b4ab1e7b14c3b30d4d20757e032c');
  const indexName = 'mitama_lab';

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ bgcolor: theme.palette.background.paper, m: 2 }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        <Box>
          <Stack direction="row" spacing={2}>
            <SearchIcon />
            <Typography>{'Search...'}</Typography>
          </Stack>
        </Box>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Search</DialogTitle>
        <DialogContent>
          <InstantSearch indexName={indexName} searchClient={searchClient}>
            <SearchBox />
            <Hits />
          </InstantSearch>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
