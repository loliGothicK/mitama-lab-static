import { Typography } from '@mui/joy';
import { PropsWithChildren } from 'react';
import MitamaLab from '../../../components/MitamaLab';

const NewFeatures: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <MitamaLab>
      <Typography>{'執筆中...'}</Typography>
    </MitamaLab>
  );
};

export default NewFeatures;
