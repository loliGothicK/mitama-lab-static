import {
  Card,
  Divider,
  Stack,
  Typography,
  Container,
  ListItem,
  List,
  Sheet,
  Button,
} from "@mui/joy";
import React from "react";
import MitamaLab from "../../components/MitamaLab";
import Link from "../../components/Link";
import Version, { Versions } from "../../types/Version";
import ReleaseNotes from "../../contents/ReleaseNotes";

const releases: Versions = ["v0.1.10"].map((ver) => Version.parse(ver));

const Installation: React.FC<{}> = () => {
  return (
    <MitamaLab>
      <Stack direction={"row"}>
        <Typography level="h1" component="h1">
          Releases
        </Typography>
      </Stack>
      <Divider sx={{ margin: "2% 0" }} />
      <Container>
        {releases.map((version) => {
          return (
            <Sheet
              sx={{
                mx: "auto", // margin left & right
                my: 4, // margin top & botom
                py: 3, // padding top & bottom
                px: 2, // padding left & right
                display: "flex",
                flexDirection: "column",
                gap: 2,
                borderRadius: "sm",
                boxShadow: "md",
              }}
              variant="outlined"
              key={version}
            >
              <Stack direction={"row"}>
                <Typography level={"h2"}></Typography>
                <Typography level={"h2"}>{version}</Typography>
              </Stack>
              <Divider sx={{ margin: "2% 0" }} />
              <Typography level={"h2"}>{"Packages"}</Typography>
              <List>
                <Container sx={{ display: "flex" }}>
                  <Link
                    href={ReleaseNotes[version].packages.certificate}
                    download={`MitamatchOperations-${version}.cer.zip`}
                  >
                    <Button sx={{ margin: "2% 1%" }}>
                      <Typography key={"certificate"}>
                        {`MitamatchOperations-${version}.cer.zip`}
                      </Typography>
                    </Button>
                  </Link>
                  <Link
                    href={ReleaseNotes[version].packages.appinstaller}
                    download={`MitamatchOperations-${version}.appinstaller.zip`}
                  >
                    <Button sx={{ margin: "2% 1%" }}>
                      <Typography key={"appinstaller"}>
                        {`MitamatchOperations-${version}.appinstaller.zip`}
                      </Typography>
                    </Button>
                  </Link>
                </Container>
              </List>
              <Divider sx={{ margin: "2% 0%" }} />
              <Typography level={"h3"}>{"What's new"}</Typography>
              <List>
                {ReleaseNotes[version].wahtsNew.map((what, index) => {
                  return (
                    <ListItem key={index}>
                      <Typography>{what}</Typography>
                    </ListItem>
                  );
                })}
              </List>
              <Typography level={"h3"}>Bug fix</Typography>
              <List>
                {ReleaseNotes[version].bufFix.map((bugfix, index) => {
                  return (
                    <ListItem key={index}>
                      <Typography>{bugfix}</Typography>
                    </ListItem>
                  );
                })}
              </List>
            </Sheet>
          );
        })}
      </Container>
    </MitamaLab>
  );
};

export default Installation;
