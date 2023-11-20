import { useSearchParams } from "next/navigation";
import MitamaLab from "../layouts/MitamaLab";
import {Card, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material";
import { Buffer } from 'buffer';
import { z } from "zod";
import Link from "next/link";

const DeckSchema = z.object({
  legendary: z.array(z.object({
    link: z.string(),
    name: z.string(),
  })),
  deck: z.array(z.object({
    link: z.string(),
    name: z.string(),
  })),
});

type Deck = z.infer<typeof DeckSchema>;

export default function Deck() {
  const searchParams = useSearchParams();
  const jsonBase64 = searchParams.get("json") ?? "eyAibGVnZW5kYXJ5IjogW10sICJkZWNrIjogW10gfQ==";
  const json = Buffer.from(jsonBase64, 'base64').toString('utf-8');
  console.log(json);
  const validDeck: Deck = DeckSchema.parse(JSON.parse(json));
  
  return (
    <MitamaLab>
      <Container maxWidth={'lg'}>
        <Grid container spacing={2}>
          {validDeck.legendary.map(({ name, link }, index) => {
            return (
              <Grid item xs={2.4} key={index}>
                <Card>
                  <Link href={`https://allb.game-db.tw/memoria/${link}`} target={"_blank"}>
                    <CardMedia
                      sx={{ height: 100, width: 100 }}
                      image={`https://raw.githubusercontent.com/LoliGothick/MitamatchOperations/main/MitamatichOperations/Assets/memoria/${name}.jpg`}
                      title={name}
                    />
                  </Link>
                  <CardContent>
                    <Typography gutterBottom component="div" fontSize={12}>
                      {decodeURI(name)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <Container maxWidth={'lg'}>
        <Grid container spacing={2} marginTop={2}>
          {validDeck.deck.map(({ name, link }, index) => {
            return (
              <Grid item xs={2.4} key={index}>
                <Card>
                  <Link href={`https://allb.game-db.tw/memoria/${link}`} target={"_blank"}>
                    <CardMedia
                      sx={{ height: 100, width: 100 }}
                      image={`https://raw.githubusercontent.com/LoliGothick/MitamatchOperations/main/MitamatichOperations/Assets/memoria/${name}.jpg`}
                      title={name}
                    />
                  </Link>
                  <CardContent>
                    <Typography gutterBottom component="div" fontSize={12}>
                      {decodeURI(name)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </MitamaLab>
  );
}
