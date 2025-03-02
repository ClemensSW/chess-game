// src/components/tutorial/steps/TutorialStrategy.jsx
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
import PsychologyIcon from "@mui/icons-material/Psychology";
import WidgetsIcon from "@mui/icons-material/Widgets";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

const TutorialStrategy = ({ theme }) => {
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
        <PsychologyIcon sx={{ mr: 1.5 }} /> Schach-Strategie für Anfänger
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
                sx={{ color: theme.palette.primary.main, mb: 2 }}
              >
                Die Eröffnung
              </Typography>

              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                In der Eröffnungsphase geht es darum, die Figuren zu entwickeln,
                Kontrolle über das Zentrum zu erlangen und den König in
                Sicherheit zu bringen.
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.background.paper, 0.5),
                  mb: 3,
                }}
              >
                <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                  Grundprinzipien der Eröffnung:
                </Typography>
                <Typography
                  component="ol"
                  variant="body2"
                  sx={{ pl: 2, lineHeight: 1.8 }}
                >
                  <li>Kontrolliere das Zentrum (die Felder e4, d4, e5, d5)</li>
                  <li>
                    Entwickle deine Leichtfiguren (Springer und Läufer) früh
                  </li>
                  <li>Rochiere, um deinen König in Sicherheit zu bringen</li>
                  <li>
                    Verbinde deine Türme (bringe sie auf die gleiche Reihe)
                  </li>
                  <li>
                    Bewege die Bauern sparsam, um deine Stellung nicht zu
                    schwächen
                  </li>
                </Typography>
              </Paper>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.info.main, 0.1),
                  border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                }}
              >
                <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                  Gängige Eröffnungen für Anfänger:
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <Chip
                      label="Italienische Partie"
                      size="small"
                      sx={{
                        mb: 1,
                        fontWeight: 500,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        "&:hover": {
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.2
                          ),
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Chip
                      label="Spanische Partie"
                      size="small"
                      sx={{
                        mb: 1,
                        fontWeight: 500,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        "&:hover": {
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.2
                          ),
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Chip
                      label="Sizilianische Verteidigung"
                      size="small"
                      sx={{
                        mb: 1,
                        fontWeight: 500,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        "&:hover": {
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.2
                          ),
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Chip
                      label="Französische Verteidigung"
                      size="small"
                      sx={{
                        mb: 1,
                        fontWeight: 500,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        "&:hover": {
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.2
                          ),
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Chip
                      label="Damengambit"
                      size="small"
                      sx={{
                        fontWeight: 500,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        "&:hover": {
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.2
                          ),
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
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
                Das Mittelspiel
              </Typography>

              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                Im Mittelspiel geht es um taktische und strategische Elemente,
                Angriff und Verteidigung. Hier entfaltet sich das eigentliche
                Schachspiel mit all seinen komplexen Möglichkeiten.
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
                        theme.palette.background.paper,
                        0.5
                      ),
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      gutterBottom
                    >
                      Wichtige Taktiken:
                    </Typography>
                    <Typography
                      component="ul"
                      variant="body2"
                      sx={{ pl: 2, lineHeight: 1.7 }}
                    >
                      <li>
                        <b>Gabel:</b> Eine Figur greift zwei gegnerische Figuren
                        gleichzeitig an
                      </li>
                      <li>
                        <b>Spieß:</b> Eine Figur greift zwei gegnerische Figuren
                        an, die hintereinander stehen
                      </li>
                      <li>
                        <b>Fesselung:</b> Eine Figur kann nicht ziehen, weil
                        sonst eine wertvollere Figur dahinter gefährdet wäre
                      </li>
                      <li>
                        <b>Abzugsschach:</b> Eine Figur zieht weg und gibt
                        Schach durch eine andere Figur
                      </li>
                      <li>
                        <b>Doppelschach:</b> Zwei Figuren geben gleichzeitig
                        Schach
                      </li>
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
                        theme.palette.background.paper,
                        0.5
                      ),
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      gutterBottom
                    >
                      Strategische Elemente:
                    </Typography>
                    <Typography
                      component="ul"
                      variant="body2"
                      sx={{ pl: 2, lineHeight: 1.7 }}
                    >
                      <li>
                        <b>Figurenaktivität:</b> Positioniere deine Figuren auf
                        aktiven Feldern
                      </li>
                      <li>
                        <b>Bauernstruktur:</b> Achte auf schwache und starke
                        Bauern
                      </li>
                      <li>
                        <b>Offene Linien:</b> Nutze offene Linien für deine
                        Türme
                      </li>
                      <li>
                        <b>Kontrolle wichtiger Felder</b> (besonders im Zentrum)
                      </li>
                      <li>
                        <b>Koordination:</b> Koordiniere deine Figuren für
                        Angriff oder Verteidigung
                      </li>
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card
        elevation={0}
        sx={{
          mt: 3,
          mb: 4,
          borderRadius: 3,
          backgroundColor: alpha(theme.palette.success.main, 0.08),
          border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            gutterBottom
            sx={{ color: theme.palette.success.main, mb: 2 }}
          >
            Das Endspiel
          </Typography>

          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            Im Endspiel sind nur noch wenige Figuren auf dem Brett. Der König
            wird zu einer aktiven Figur, und Bauern werden oft entscheidend, da
            sie zu Damen umgewandelt werden können.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.background.paper, 0.5),
                  height: "100%",
                }}
              >
                <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                  Grundregeln für das Endspiel:
                </Typography>
                <Typography
                  component="ul"
                  variant="body2"
                  sx={{ pl: 2, lineHeight: 1.7 }}
                >
                  <li>Aktiviere deinen König und bringe ihn ins Zentrum</li>
                  <li>Strebe nach Bauernumwandlung</li>
                  <li>Behalte die Opposition (Könige stehen sich gegenüber)</li>
                  <li>
                    Freibauern (Bauern ohne gegnerische Bauern auf der gleichen
                    oder benachbarten Linien) sind sehr wertvoll
                  </li>
                  <li>
                    Lerne grundlegende Mattführungen (z.B. mit Dame, Turm oder
                    zwei Läufern)
                  </li>
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.background.paper, 0.5),
                  height: "100%",
                }}
              >
                <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                  Wichtige Endspieltechniken:
                </Typography>
                <Typography
                  component="ul"
                  variant="body2"
                  sx={{ pl: 2, lineHeight: 1.7 }}
                >
                  <li>
                    <b>Quadratregel</b> (für Bauernendspiele)
                  </li>
                  <li>
                    <b>Schaffung von Freibauern</b>
                  </li>
                  <li>
                    <b>Turmendspiele</b> und die 7. Reihe
                  </li>
                  <li>
                    <b>Läufer- und Springerendspiele</b>
                  </li>
                  <li>
                    <b>Umwandlungsrennen</b>
                  </li>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          backgroundColor:
            theme.palette.mode === "dark"
              ? alpha(theme.palette.success.main, 0.15)
              : alpha(theme.palette.success.main, 0.08),
          border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <EmojiObjectsIcon
          color="success"
          sx={{
            mr: 2,
            fontSize: 28,
            filter: `drop-shadow(0 1px 2px ${alpha(
              theme.palette.success.main,
              0.5
            )})`,
            mt: 0.5,
          }}
        />
        <Box>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Tipp für Anfänger:
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
            Die beste Weise, sich im Schach zu verbessern, ist durch
            regelmäßiges Spielen, Analysieren der eigenen Partien und das Lösen
            von Schachproblemen. Es ist normal, am Anfang Fehler zu machen - aus
            jedem Fehler lernst du etwas Neues!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TutorialStrategy;
