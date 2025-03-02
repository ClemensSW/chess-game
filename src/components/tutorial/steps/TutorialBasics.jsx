// src/components/tutorial/steps/TutorialBasics.jsx
import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Paper,
  alpha,
  Grid,
} from "@mui/material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import PieceDisplay from "../shared/PieceDisplay";

const TutorialBasics = ({ theme }) => {
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
        <WidgetsIcon sx={{ mr: 1.5 }} /> Das Schachbrett & die Figuren
      </Typography>

      <Card
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 3,
          backgroundColor: alpha(theme.palette.background.paper, 0.6),
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            fontWeight={600}
            sx={{ color: theme.palette.secondary.main, mb: 2 }}
          >
            Das Schachbrett
          </Typography>

          <Typography variant="body1" paragraph sx={{ mb: 2, lineHeight: 1.7 }}>
            Schach wird auf einem 8×8-Brett gespielt. Die 64 Felder sind
            abwechselnd hell und dunkel gefärbt. Das Brett wird so positioniert,
            dass jeder Spieler ein weißes Feld in der rechten unteren Ecke hat.
          </Typography>

          <Typography variant="body1" paragraph sx={{ mb: 3, lineHeight: 1.7 }}>
            Die horizontalen Reihen werden mit Zahlen von 1 bis 8 bezeichnet,
            beginnend an der weißen Seite des Bretts. Die vertikalen Spalten
            werden mit Buchstaben von a bis h bezeichnet, von links nach rechts
            aus der Sicht des weißen Spielers.
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(8, 1fr)",
                width: { xs: "100%", sm: "300px" },
                height: { xs: "auto", sm: "300px" },
                aspectRatio: "1/1",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: theme.shadows[4],
              }}
            >
              {[...Array(64)].map((_, index) => {
                const row = Math.floor(index / 8);
                const col = index % 8;
                const isDark = (row + col) % 2 === 1;

                // Koordinaten anzeigen
                const showRowNum = col === 0;
                const showColLetter = row === 7;

                return (
                  <Box
                    key={index}
                    sx={{
                      backgroundColor: isDark ? "#B58863" : "#F0D9B5",
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* Zeige Koordinaten */}
                    {showRowNum && (
                      <Typography
                        sx={{
                          position: "absolute",
                          top: 2,
                          left: 4,
                          fontSize: "0.7rem",
                          fontWeight: "bold",
                          color: isDark ? "#ddd" : "#777",
                        }}
                      >
                        {8 - row}
                      </Typography>
                    )}
                    {showColLetter && (
                      <Typography
                        sx={{
                          position: "absolute",
                          bottom: 2,
                          right: 4,
                          fontSize: "0.7rem",
                          fontWeight: "bold",
                          color: isDark ? "#ddd" : "#777",
                        }}
                      >
                        {String.fromCharCode(97 + col)}
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ mb: 2, mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 3,
                backgroundColor: alpha(theme.palette.background.paper, 0.6),
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight={600}
                  sx={{
                    color: theme.palette.secondary.main,
                    mb: 2,
                    borderBottom: `2px solid ${alpha(
                      theme.palette.secondary.main,
                      0.2
                    )}`,
                    pb: 1,
                  }}
                >
                  Die Figuren
                </Typography>

                <Typography paragraph sx={{ mb: 3, lineHeight: 1.7 }}>
                  Jeder Spieler beginnt mit 16 Figuren:
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <PieceDisplay
                    type="king"
                    color="w"
                    description="1 König - Wertvollste Figur"
                  />
                  <PieceDisplay
                    type="queen"
                    color="w"
                    description="1 Dame - Stärkste Figur"
                  />
                  <PieceDisplay type="rook" color="w" description="2 Türme" />
                  <PieceDisplay
                    type="bishop"
                    color="w"
                    description="2 Läufer"
                  />
                  <PieceDisplay
                    type="knight"
                    color="w"
                    description="2 Springer"
                  />
                  <PieceDisplay type="pawn" color="w" description="8 Bauern" />
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
                backgroundColor: alpha(theme.palette.background.paper, 0.6),
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight={600}
                  sx={{
                    color: theme.palette.secondary.main,
                    mb: 2,
                    borderBottom: `2px solid ${alpha(
                      theme.palette.secondary.main,
                      0.2
                    )}`,
                    pb: 1,
                  }}
                >
                  Startaufstellung
                </Typography>

                <Typography paragraph sx={{ mb: 3, lineHeight: 1.7 }}>
                  Die Figuren werden wie folgt aufgestellt:
                </Typography>

                <Box
                  sx={{
                    pl: 2,
                    pr: 2,
                    py: 2,
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.background.paper, 0.5),
                    boxShadow: `inset 0 0 5px ${alpha(
                      theme.palette.divider,
                      0.2
                    )}`,
                  }}
                >
                  <Typography variant="body1" component="div" sx={{ pl: 2 }}>
                    <ul style={{ lineHeight: 1.8, paddingLeft: 16 }}>
                      <li>
                        <b>Bauern:</b> Zweite Reihe
                      </li>
                      <li>
                        <b>Türme:</b> Ecken (a1, h1 für Weiß; a8, h8 für
                        Schwarz)
                      </li>
                      <li>
                        <b>Springer:</b> Neben den Türmen
                      </li>
                      <li>
                        <b>Läufer:</b> Neben den Springern
                      </li>
                      <li>
                        <b>Dame:</b> Auf dem eigenen Farbfeld (d1 für Weiß, d8
                        für Schwarz)
                      </li>
                      <li>
                        <b>König:</b> Neben der Dame (e1 für Weiß, e8 für
                        Schwarz)
                      </li>
                    </ul>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          backgroundColor:
            theme.palette.mode === "dark"
              ? alpha(theme.palette.info.main, 0.2)
              : alpha(theme.palette.info.main, 0.08),
          border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
          display: "flex",
          alignItems: "flex-start",
          mt: 3,
        }}
      >
        <LightbulbIcon
          color="info"
          sx={{
            mr: 2,
            fontSize: 28,
            filter: `drop-shadow(0 1px 2px ${alpha(
              theme.palette.info.main,
              0.5
            )})`,
            mt: 0.5,
          }}
        />
        <Box>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Einfache Eselsbrücke:
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
            "Die Dame steht auf ihrer Farbe" - Die weiße Dame steht auf weißem
            Feld (d1), die schwarze Dame auf schwarzem Feld (d8).
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TutorialBasics;
