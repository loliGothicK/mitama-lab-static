import { AspectRatio, Box, Card, CardOverflow, Typography } from '@mui/joy';

import React from 'react';

import Link from './Link';

const ContentCard: React.FC<{
  readonly to: string;
  readonly title: string;
  readonly description: string;
  readonly createdAt: string;
}> = ({ to, title, description, createdAt }) => {
  return (
    <Link href={to}>
      <Card
        variant="outlined"
        sx={{
          '--Card-radius': (theme) => theme.vars.radius.sm,
          bgcolor: 'background.componentBg',
          boxShadow: 'none',
        }}
      >
        <CardOverflow
          sx={{
            borderBottom: '1px solid',
            borderColor: 'neutral.outlinedBorder',
          }}
        >
          <AspectRatio ratio="16/9" color="primary">
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.plainColor',
              }}
            >
              {title}
            </Typography>
          </AspectRatio>
        </CardOverflow>
        <Box sx={{ pt: 2, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Typography>{description}</Typography>
            <Typography level="body3" mt={0.5}>
              {createdAt}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Link>
  );
};

export default ContentCard;
