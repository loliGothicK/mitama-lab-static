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

const RegionManagement: React.FC = () => {
  return (
    <Card>
      <Typography level="h2" component="h2" sx={{ margin: 5 }}>
        {'プロジェクト（レギオン）管理'}
      </Typography>

      <Grid container spacing={2}>
        <Grid xs={6}>
          <img
            src={'/v1_0_0/region-management/overview.png'}
            alt={'overview'}
            width={'100%'}
          />
        </Grid>
        <Grid xs={6}>
          <Typography sx={{ margin: 10 }}>
            Mitamatch Operations
            では、プロジェクトと言う単位でデータが管理されます。
            最初にプロジェクトを作成する必要があります。
            メンバーもプロジェクトに紐づくのでプロジェクト=レギオンです。
            現在のプロジェクトはタイトルバーに表示されています（ボタンではありません）。
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ margin: '1% 0' }} />

      <Card>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography level="h3" component="h3">
              Change Project
            </Typography>
            <Divider sx={{ margin: '1% 0' }} />
            <Typography sx={{ margin: 10 }}>
              ログインするプロジェクトはここから選択できます。
              最初にやることはプロジェクトの作成です。
              レギオン名を入力して作成します。
              作成時、自動的にプロジェクトにログインします。
              次回起動時には最後にログインしていたプロジェクトに自動的にログインします。
            </Typography>
          </Grid>
          <Grid xs={6}>
            <img
              src={'/v1_0_0/region-management/selectOrCreate.png'}
              alt={'selectOrCreate'}
              width={'100%'}
            />
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography level="h3" component="h3">
              Add Member
            </Typography>
            <Divider sx={{ margin: '1% 0' }} />
            <Typography sx={{ margin: 10 }}>
              レギオンメンバーの追加を行います。
              メンバー名入力しポジションを選択します。
            </Typography>
          </Grid>
          <Grid xs={6}>
            <img
              src={'/v1_0_0/region-management/addMember.png'}
              alt={'addMember'}
              width={'100%'}
            />
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography level="h3" component="h3">
              Remove Member
            </Typography>
            <Divider sx={{ margin: '1% 0' }} />
            <Typography sx={{ margin: 10 }}>
              おわかれするメンバーを選択しておわかれします。
              この操作はもとには戻せません。
              ワンクリックでデータがすべて削除されます。
            </Typography>
          </Grid>
          <Grid xs={6}>
            <img
              src={'/v1_0_0/region-management/removeMember.png'}
              alt={'removeMember'}
              width={'100%'}
            />
          </Grid>
        </Grid>
      </Card>
    </Card>
  );
};

const OrderConsole: React.FC = () => {
  return (
    <Card>
      <Typography level="h2" component="h2" sx={{ margin: 5 }}>
        {'オーダーコンソール'}
      </Typography>

      <Grid container spacing={2}>
        <Grid xs={6}>
          <img
            src={'/v1_0_0/order-console/overview.png'}
            alt={'overview'}
            width={'100%'}
          />
        </Grid>
        <Grid xs={6}>
          <Typography sx={{ margin: 10 }}>
            オーダーのテイムテーブル作成と所持オーダーの管理ができる機能です。
            タイムテーブルではオーダー間のマージンタイムが自動で考慮されます（一括で変更、または個別に変更できます）。
            オーダー所持確認をしてツールの管理下になると、オーダー担当者を自動で割り当てる機能が使用可能となります。
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ margin: '1% 0' }} />

      <Card>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography level="h3" component="h3">
              Deck Editor 基本的な使い方
            </Typography>
            <Divider sx={{ margin: '1% 0' }} />
            <Typography sx={{ margin: 10 }}>
              右のグリッドビューにすべての課金オーダーがあります。
              左のリストビュー（最初は背景しかないですけど）にオーダーをドラッグアンドドロップをすると追加されます。
              {
                "（または右クリックして 'Add to Deck' ボタンをクリックすると末尾に追加されます。）"
              }
              マージンは自動的に差し込まれます。デフォルトでは5秒ですが、変更することができます。
              変更すると全体に適用されます。
              編集が終わったら右上のSaveボタンで名前をつけて保存します。
              ロードボタンでデッキを読み込むことができます。
            </Typography>
          </Grid>
          <Grid xs={6}>
            <img
              src={'/v1_0_0/order-console/move.png'}
              alt={'move'}
              width={'100%'}
            />
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography level="h3" component="h3">
              Deck Editor オーダーごとの詳細設定
            </Typography>
            <Divider sx={{ margin: '1% 0' }} />
            <Typography sx={{ margin: 10 }}>
              デッキのオーダーリストで右クリックをするとコンテキストメニューが開き、詳細設定をすることができます。
              詳細設定の項目はディレイ時間とオーダー担当者とConditionalチェックボックスです。
              Conditionalは別の機能で使うやつです。
            </Typography>
          </Grid>
          <Grid xs={6}>
            <img
              src={'/v1_0_0/order-console/ContextMenu.png'}
              alt={'ContextMenu'}
              width={'100%'}
            />
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography level="h3" component="h3">
              Order Manager
            </Typography>
            <Divider sx={{ margin: '1% 0' }} />
            <Typography sx={{ margin: 10 }}>
              Order Managerは所持オーダー管理機能です。
              デッキ編成と同じように右から左へオーダーを移動し、保存を押すとレギオンとメンバーを選択するように言われるので選択します。
              するとメンバーの所持オーダーが登録されます。
              ロードすると所持オーダーを眺めることができます。
            </Typography>
          </Grid>
          <Grid xs={6}>
            <img
              src={'/v1_0_0/order-console/orderManager.png'}
              alt={'orderManager'}
              width={'100%'}
            />
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography level="h3" component="h3">
              自動担当割当ボタン
            </Typography>
            <Divider sx={{ margin: '1% 0' }} />
            <Typography sx={{ margin: 10 }}>
              `Assign`
              ボタンを使うことで、自動でオーダー担当者を割り当てることができます。
              前提として、すべてのメンバーの所持オーダーを登録する必要があります。
              自動割り当てはすべてのオーダーを割り当てるわけではなく、担当が決まっていないオーダーに自動で担当を割り当てる機能です。
              自動割り当てが気に入らない場合はあらかじめ数か所の担当を埋めてからやり直してください。
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Card>
  );
};

const ControlDashboard: React.FC = () => {
  return (
    <Card>
      <Typography level="h2" component="h2" sx={{ margin: 5 }}>
        {'コントロールダッシュボード'}
      </Typography>

      <Grid container spacing={2}>
        <Grid xs={6}>
          <img
            src={'/v1_0_0/dashboard/overview.png'}
            alt={'overview'}
            width={'100%'}
          />
        </Grid>
        <Grid xs={6}>
          <Typography sx={{ margin: 10 }}>
            コントロールダッシュボードはレギオンマッチにおけるオーダー発動を支援するダッシュボードです。
            ダッシュボードを見ながらレギオンマッチをする前提なのでほぼ2画面必須です。
            ラスバレの画面を0.2秒に1回キャプチャしてオーダー発動の文字を認識し、オーダーがタイムテーブルからどれくらいずれているかを表示します。
            また、発動直前アラートや再編前アラートなどを備えています。
            使っている人がちょっと便利なのもありますが、基本的には僕がVCで注意喚起するのを忘れないようにするためという感じです。
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ margin: '1% 0' }} />

      <Card>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Typography level="h3" component="h3">
              使い方と注意事項
            </Typography>
            <Divider sx={{ margin: '1% 0' }} />
            <Typography sx={{ margin: 5 }}>
              ダッシュボードを選んだ瞬間にラスバレの画面を探します。
              ラスバレが起動していない、または最小化されている場合はエラーが出ます。
              現状はDMM版にしか対応していません（というか将来も他に対応する気がない）。
              また、画面はFull
              HDで最大化された状態を前提にしているので解像度が異なる場合やアスペクト比が異なる場合はアップデートをお待ち下さい。
            </Typography>
            <Typography sx={{ margin: 5 }}>
              使う前にオーダーデッキを保存している必要があります。
              フォルダアイコンをクリックしてデッキを選びます。
              すると、最初から4つオーダーがロードされます。
              この状態でレギオンマッチが始まり、初手のオーダーが打たれると自動でナビゲーションを開始します。
            </Typography>
            <Typography sx={{ margin: 5 }}>
              ノインヴェルト戦術において、ダッシュボードが絶対に発動を認識できない瞬間が2つあります。
              1つ目はパスで発動のお知らせがかき消された場合で、2つ目はフィニッシュに発動を差し込んだ場合です。
              このような場合においてもナビゲーションを継続するために手動で発動をツールに教えるショートカットコマンドが[Ctrl+Q]です
              （ウィンドウがアクティブでない場合には反応しないので素早く画面を切り替えてショートカットを1回だけおしてください）。
            </Typography>{' '}
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
          {'New Features in v1.0.0'}
        </Typography>
      </Stack>
      <Divider sx={{ margin: '2% 0' }} />
      <Tabs aria-label="Basic tabs" defaultValue={0}>
        <TabList>
          <Tab>プロジェクト管理</Tab>
          <Tab>オーダーコンソール</Tab>
          <Tab>コントロールダッシュボード</Tab>
        </TabList>
        <TabPanel value={0}>
          <RegionManagement />
        </TabPanel>
        <TabPanel value={1}>
          <OrderConsole />
        </TabPanel>
        <TabPanel value={2}>
          <ControlDashboard />
        </TabPanel>
      </Tabs>
    </MitamaLab>
  );
};

export default NewFeatures;
