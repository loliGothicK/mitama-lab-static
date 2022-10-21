import { Divider, List, Sheet, Typography } from '@mui/joy';
import Link from 'next/link';
import React from 'react';
import MitamaLab from '../../components/MitamaLab';

const GettingStarted: React.FC<{}> = () => {
  return (
    <MitamaLab>
      <Typography level="h1" component="h1">
        Getting Started
      </Typography>
      <Divider sx={{ margin: '2% 0' }} />
      <Sheet
        sx={{
          mx: 'auto', // margin left & right
          my: 4, // margin top & botom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <List>
          <Typography key={0}>
            まず、Windows 11の開発者モードをONにしてください。
          </Typography>
          <Typography key={1}>
            <Link href={'/mitamatch-operations/releases'}>Releases</Link>
            ページに行き最新版のcerファイルをダウンロード・インポートしてください。
          </Typography>
          <Typography key={2}>
            同様にzipファイルをダウンロードして解凍してください。
            解凍したフォルダのappinstallerをダブルクリックすればインストーラが起動します。
          </Typography>
          <Divider />
          <Typography>補足</Typography>
          <Typography>
            msixもありますが、x64アーキテクチャ用にビルドされたものです。
            「MitamatchOperations
            (Package)_0.1.10.0_Test」みたいなフォルダにmsixbundleが入っていますが、罠なので使わないように。
          </Typography>
        </List>
      </Sheet>
    </MitamaLab>
  );
};

export default GettingStarted;
