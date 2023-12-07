import MitamaLab from '../layouts/MitamaLab';
import {
  Box,
  Container,
  Card,
  CardActions,
  CardContent,
  Grid,
  Button,
  Typography,
  TableContainer,
  Paper, Table, TableHead, TableRow, TableCell, TableBody, Divider
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Job {
  title: string;
  span: string;
  stack: string;
  abstract: string;
}

const JobList: Job[] = [
  {
    title: '高校教員（理科）',
    span: '2012/4/1 ~ 2018/3/31',
    stack: '物理・化学',
    abstract: '高校教員として、物理と化学をを担当（専門は物理）。'
  },
  {
    title: 'キャディ株式会社',
    span: '2018/9/1 ~ 2023/8/31',
    stack: 'C++/Rust/Python/TypeScript/React/Next.js',
    abstract: 'キャディ株式会社にて、ソフトウェアエンジニアとして勤務。'
  }
];

function createData(
  year: number,
  month: number,
  content: string,
) {
  return { year, month, content };
}

const rows = [
  createData(2008, 4, '大阪工業大学 工学部 環境工学科 入学'),
  createData(2012, 3, '大阪工業大学 工学部 環境工学科 卒業'),
  createData(2012, 4, '大阪府立高校 教員採用'),
  createData(2018, 3, '大阪府立高校 教員退職'),
  createData(2018, 9, 'キャディ株式会社 入社（アルゴリズムエンジニア/3D CAD）'),
  createData(2020, 2, 'キャディ株式会社 2D 図面 解析（画像認識）'),
  createData(2021, 3, 'キャディ株式会社 バックエンドエンジニア（Rust）'),
  createData(2023, 4, 'キャディ株式会社 フロントエンド（シナリオテスト）'),
  createData(2023, 8, 'キャディ株式会社 退職'),
  createData(2023, 8, '株式会社 Arent 入社（アルゴリズムエンジニア）'),
  createData(2023, 11, '株式会社 Arent 退職（うつ病のため）'),
];

export default function Portfolio() {
  return (
    <MitamaLab>
      <Container maxWidth={'xs'}>
        <Typography variant="h3" component="div" gutterBottom align={'center'}>
          {"Mitama's Portfolio"}
        </Typography>
        <Grid container spacing={2}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1} //一度に表示するスライドの数
            navigation //スライドを前後させるためのボタン、スライドの左右にある
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
          >
            {JobList.map(({ title, span, stack, abstract }, index) => {
              return (
                <SwiperSlide key={`${index}`}>
                  <Card sx={{ marginLeft: 10, marginRight: 10 }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {span}
                      </Typography>
                      <Typography variant="h5" component="div">
                        {title}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {stack}
                      </Typography>
                      <Typography variant="body2">
                        {abstract}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Read More</Button>
                    </CardActions>
                  </Card>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </Grid>
        <Divider sx={{ margin: 10 }} />
        <Box sx={{ overflow: "auto", marginBottom: 10 }}>
          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" align={'center'}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">年/月</TableCell>
                  <TableCell>学歴/職歴</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.content}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{`${row.year}/${row.month}`}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.content}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Box>
        </Box>
      </Container>
    </MitamaLab>
  );
};
