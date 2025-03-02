// src/components/tutorial/steps/TutorialCheckmate.jsx
import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  alpha,
  Chip,
} from "@mui/material";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

const TutorialCheckmate = ({ theme }) => {
  return (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: theme.palette.primary.main,
          fontWeight: 700,
          mb: 3,
          pb: 1,
          borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          display: "flex",
          alignItems: "center",
        }}
      >
        <SportsKabaddiIcon sx={{ mr: 1.5 }} /> Spielende und besondere
        Situationen
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.error.main, 0.08),
              border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
                sx={{ color: theme.palette.error.main, mb: 2 }}
              >
                Schach
              </Typography>

              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                Ein König steht im Schach, wenn er von einer gegnerischen Figur
                angegriffen wird. Ein Spieler, dessen König im Schach steht,
                muss sofort reagieren und den Schach abwehren.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <img
                  src="/assets/images/chess-check-example.svg"
                  alt="Schach Beispiel"
                  style={{
                    width: "80%",
                    borderRadius: 8,
                    boxShadow: theme.shadows[4],
                  }}
                />
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.background.paper, 0.5),
                }}
              >
                <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                  Es gibt drei Möglichkeiten, ein Schach abzuwehren:
                </Typography>
                <Typography
                  component="ol"
                  variant="body2"
                  sx={{ pl: 2, lineHeight: 1.7 }}
                >
                  <li>Den König auf ein sicheres Feld ziehen</li>
                  <li>Die angreifende Figur schlagen</li>
                  <li>
                    Eine eigene Figur zwischen König und Angreifer stellen
                    (nicht möglich bei Springer-Schach)
                  </li>
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.error.main, 0.08),
              border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
                sx={{ color: theme.palette.error.main, mb: 2 }}
              >
                Schachmatt
              </Typography>

              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                Schachmatt ist die Situation, wenn ein König im Schach steht und
                keine Möglichkeit hat, das Schach abzuwehren. Dies beendet das
                Spiel, und der Spieler, dessen König schachmatt gesetzt wurde,
                verliert.
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.background.paper, 0.5),
                  mb: 2,
                }}
              >
                <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                  Beim Schachmatt gilt:
                </Typography>
                <Typography
                  component="ul"
                  variant="body2"
                  sx={{ pl: 2, lineHeight: 1.7 }}
                >
                  <li>Der König steht im Schach</li>
                  <li>Der König kann nicht auf ein sicheres Feld ziehen</li>
                  <li>Die angreifende Figur kann nicht geschlagen werden</li>
                  <li>
                    Das Schach kann nicht durch Dazwischenziehen einer Figur
                    abgewehrt werden
                  </li>
                </Typography>
              </Paper>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.warning.main, 0.1),
                  border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SportsKabaddiIcon
                  color="warning"
                  sx={{ mr: 1.5, fontSize: 24 }}
                />
                <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                  Das Wort "Schachmatt" kommt aus dem Persischen "Shah Mat" und
                  bedeutet "Der König ist tot" oder "Der König ist besiegt".
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 0 }}>
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              mt: 3,
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.secondary.main, 0.08),
              border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
                sx={{ color: theme.palette.secondary.main, mb: 2 }}
              >
                Patt
              </Typography>

              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                Patt ist eine Situation, in der ein Spieler am Zug ist, aber
                keinen legalen Zug machen kann, wobei sein König NICHT im Schach
                steht. Patt führt zu einem Remis (Unentschieden).
              </Typography>

              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                Typische Patt-Situationen entstehen oft im Endspiel, wenn ein
                Spieler mit überlegenen Kräften nicht vorsichtig genug spielt
                und dem Gegner keine legalen Züge mehr lässt.
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Chip
                  icon={<EmojiObjectsIcon />}
                  label="Patt ist ein wichtiges taktisches Motiv für den verteidigenden Spieler"
                  color="secondary"
                  sx={{ fontWeight: 500 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              mt: 3,
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
                sx={{ color: theme.palette.text.primary, mb: 2 }}
              >
                Weitere Remis-Arten
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      height: "100%",
                      borderRadius: 2,
                      backgroundColor: alpha(
                        theme.palette.background.default,
                        0.5
                      ),
                      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      gutterBottom
                    >
                      Einvernehmliches Remis:
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                      Die Spieler können jederzeit ein Remis vereinbaren.
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      height: "100%",
                      borderRadius: 2,
                      backgroundColor: alpha(
                        theme.palette.background.default,
                        0.5
                      ),
                      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      gutterBottom
                    >
                      Dreifache Stellungswiederholung:
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                      Wenn die gleiche Stellung (mit denselben Zugmöglichkeiten)
                      dreimal auftritt, kann Remis beansprucht werden.
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      height: "100%",
                      borderRadius: 2,
                      backgroundColor: alpha(
                        theme.palette.background.default,
                        0.5
                      ),
                      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      gutterBottom
                    >
                      50-Züge-Regel:
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                      Wenn 50 aufeinanderfolgende Züge ohne Bauernzug oder
                      Schlagzug gemacht wurden, kann Remis beansprucht werden.
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      height: "100%",
                      borderRadius: 2,
                      backgroundColor: alpha(
                        theme.palette.background.default,
                        0.5
                      ),
                      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      gutterBottom
                    >
                      Ungenügendes Material:
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                      Wenn keine Seite genügend Material hat, um ein Schachmatt
                      zu erzwingen (z.B. König gegen König, oder König und
                      Läufer gegen König).
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TutorialCheckmate;
