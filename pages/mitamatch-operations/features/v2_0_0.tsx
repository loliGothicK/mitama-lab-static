import {
  Card,
  Divider,
  Grid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
} from '@mui/joy';

import React from 'react';

import MitamaLab from '../../../components/MitamaLab';

const UnitManagement: React.FC = () => {
  return (
    <Card>
      <Typography level="h2" component="h2" sx={{ margin: 5 }}>
        {'ユニット管理'}
      </Typography>

      <Grid container spacing={2}>
        <Grid xs={6}>
          <img src={'/v2_0_0/overview.png'} alt={'overview'} width={'100%'} />
        </Grid>
        <Grid xs={6}>
          <Typography sx={{ margin: 10 }}>
            ユニット（編成）のスクショを画像認識してメモリアを認識して保存・一覧できる機能です。
          </Typography>
          <Typography sx={{ margin: 10 }}></Typography>
        </Grid>
      </Grid>

      <Card>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography level="h3" component="h3">
              ユニットマネージコンソール
            </Typography>
            <Divider sx={{ margin: '1% 0' }} />
            <Typography sx={{ margin: 10 }}>
              レギオンコンソールをクリックするとユニットマネージコンソールが表示されます。
              メンバーを選択し画像をドラッグ・アンド・ドロップすると解析がはじます（20秒くらいフリーズすると思いますが正常です）。
              選択したメンバーが前衛か後衛かによって装備できるメモリアからメモリアを認識します。
              解析が終わるとダイアログに解析結果が出ます。メモリアの認識に問題がなければ名前をつけて保存します（選択したメンバーのユニットとして保存されます）。
            </Typography>
          </Grid>
          <Grid xs={6}>
            <img src={'/v2_0_0/image_drop.png'} alt={'move'} width={'100%'} />
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography level="h3" component="h3">
              画像読み込み
            </Typography>
            <Divider sx={{ margin: '1% 0' }} />
            <Typography sx={{ margin: 10 }}>
              スクショは外征任務のユニット選択画面から詳細をタップして見れる画面でメモリアがレジェンダリーを含めて全部写っているものである必要があります。
            </Typography>
          </Grid>
          <Grid xs={6}>
            <img src={'/v2_0_0/Reliever_N.png'} alt={'move'} width={'100%'} />
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography level="h3" component="h3">
              ビューアー
            </Typography>
            <Divider sx={{ margin: '1% 0' }} />
            <Typography sx={{ margin: 10 }}>
              「ユニットマネージコンソール」をクリックするとビューワーに切り替わります。
              左側のツリービューからユニットをクリックするとユニットを眺めることができます。
              ちなみに、メモリアを右クリックするとメモリアの情報を見ることもできます。
            </Typography>
          </Grid>
          <Grid xs={6}>
            <img src={'/v2_0_0/viewer.png'} alt={'move'} width={'100%'} />
          </Grid>
        </Grid>
      </Card>
    </Card>
  );
};

const NewFeatures: React.FC = () => {
  return (
    <MitamaLab>
      <Stack direction={'row'}>
        <Typography level="h1" component="h1">
          {'New Features in v2.0.0'}
        </Typography>
      </Stack>
      <Divider sx={{ margin: '2% 0' }} />
      <Tabs aria-label="Basic tabs" defaultValue={0}>
        <TabList>
          <Tab>ユニット管理</Tab>
        </TabList>
        <TabPanel value={0}>
          <UnitManagement />
        </TabPanel>
      </Tabs>
    </MitamaLab>
  );
};

export default NewFeatures;
