import { Alert, Card, Divider, Sheet, Typography } from '@mui/joy';
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
        <Card>
          <Typography>
            <Link href={'/mitamatch-operations/releases'}>Releases</Link>
            ページに行き最新版のzipファイルをダウンロードしてください。
          </Typography>
          <Typography>
            まず、アプリのインストール前にルート証明書をインポートする必要があります。
          </Typography>
          <Alert>
            MSIXインストーラーはウイルスをインストールさせるためによく使われる手法です。
            ルート証明書をインポートすることにより、アプリおよびアプリ製作者（私）を信頼することになります。
            信頼ができないと思う場合はこの先の操作を行わないことを強く推奨します。
          </Alert>
          <Divider sx={{ margin: '2% 0' }} />
          <Typography>
            cerファイルを右クリックして「証明書のインストール」をクリック。
          </Typography>
          <img
            src="/certificate/install_cer.png"
            alt="install_cer"
            width={'40%'}
            height={'40%'}
          />
          <Typography sx={{ margin: '2% 0' }}>
            「証明書のインストール」をクリック。
          </Typography>
          <img
            src="/certificate/installing_cer.png"
            alt="installing_cer"
            width={'40%'}
            height={'40%'}
          />
          <Typography sx={{ margin: '2% 0' }}>
            ローカルコンピューターを選択し、次へをクリック（管理者権限が求められます）。
          </Typography>
          <img
            src="/certificate/local_computer.png"
            alt="local_computer"
            width={'40%'}
            height={'40%'}
          />
          <Typography sx={{ margin: '2% 0' }}>
            証明書をすべてのストアに配置するを選択肢、参照をクリック。
            「信頼されたルート証明機関」を選択して、次へをクリック。
          </Typography>
          <img
            src="/certificate/store.png"
            alt="store"
            width={'40%'}
            height={'40%'}
          />
          <Typography sx={{ margin: '2% 0' }}>
            これで準備は完了です。msixbundleファイルをダブルクリックするとインストーラーが起動します。
          </Typography>
        </Card>
      </Sheet>
    </MitamaLab>
  );
};

export default GettingStarted;
