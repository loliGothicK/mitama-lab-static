import { Link as MuiLink } from '@mui/material';

import NextLink from 'next/link';
import React from 'react';

const Link: React.FC<
  React.PropsWithChildren<{
    href: string;
    target?: string;
    download?: string | boolean;
  }>
> = ({ href, children, target, download }) => {
  return target ? (
    <NextLink href={href} passHref>
      <MuiLink target={target} download={download}>
        {children}
      </MuiLink>
    </NextLink>
  ) : (
    <NextLink href={href} passHref>
      <MuiLink>{children}</MuiLink>
    </NextLink>
  );
};

export default Link;
