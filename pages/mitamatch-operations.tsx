import { DoubleArrow, Download } from '@mui/icons-material';
import WidgetsIcon from '@mui/icons-material/Widgets';
import {
  Avatar,
  Box,
  Card,
  Container,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
  useColorScheme,
} from '@mui/joy';
import { ListItemAvatar, ListItemText } from '@mui/material';
import Link from '../components/Link';
import MitamaLab from '../components/MitamaLab';
import styles from '../styles/Home.module.css';

const features: [string, string][] = [
  ['オーダーデッキ編成', '0.1.0'],
  ['メンバー管理', '0.1.10'],
  ['所持オーダー管理', '0.1.10'],
  ['オーダー担当者自動割り振り', '0.1.10'],
];

const MitamatchOperations: React.FC<{}> = () => {
  const { mode } = useColorScheme();

  return (
    <div className={styles.container}>
      <MitamaLab>
        <Container>
          {mode == 'light' ? (
            <img src="/MO_LIGHT.png" alt={'logo'} width={'80%'} />
          ) : (
            <img src="/MO_DARK.png" alt={'logo'} width={'80%'} />
          )}
          <Divider sx={{ margin: '5% 0' }} />
          <Typography>
            「Mitamatch Operations」は「アサルトリリィ Last Bullet
            」のレギオンマッチに本気を出す私により作られた支援ツール郡。
            しかしながら、レギオンマッチよりツール作りのほうが100倍本気まである。
          </Typography>
          <Typography>
            最初に残念なお知らせが１つあります。
            このツールは自分が使うため・楽しい開発をするために作られています。
            そのため、動作環境は Windows 11 Version 22H2
            以上のみとなっています。
            Webアプリ版やスマホアプリ版を作る気もございません。 Windows
            11を使っている方でラスバレをやっていて、
            使ってみたいという方がいましたら公開しておきますのでぜひインストールしてみてください。
            インストール方法は「Getting Started」をごらんくださいませ。
          </Typography>
          <Divider sx={{ margin: '5% 0' }} />
          <Stack direction="row" spacing={2}>
            <Link href={`mitamatch-operations/install-app`}>
              <Card>
                <Box sx={{ backgrounColor: 'darkgray' }}>
                  <Stack direction="row" spacing={2}>
                    <Download />
                    <Typography>Install Mitamatch Operations App</Typography>
                  </Stack>
                </Box>
              </Card>
            </Link>
            <Link href={`mitamatch-operations/getting-started`}>
              <Card>
                <Box sx={{ backgrounColor: 'darkgray' }}>
                  <Stack direction="row" spacing={2}>
                    <DoubleArrow />
                    <Typography>Getting Started</Typography>
                  </Stack>
                </Box>
              </Card>
            </Link>
          </Stack>
          <Divider sx={{ margin: '5% 0' }} />
          <Typography gutterBottom level="h4" component="h1">
            主な機能
          </Typography>
          <List>
            <ListItem>
              {features.map(([feature, since]) => {
                return (
                  <Link
                    href={`mitamatch-operations/features/v${since.replaceAll(
                      '.',
                      '_',
                    )}`}
                    key={feature}
                  >
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <WidgetsIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={feature}
                        secondary={`Since v${since}`}
                      />
                    </ListItem>
                  </Link>
                );
              })}
            </ListItem>
          </List>
        </Container>
      </MitamaLab>
    </div>
  );
};

export default MitamatchOperations;
