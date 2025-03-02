// src/components/tutorial/steps/TutorialSpecialMoves.jsx
import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Paper,
  Chip,
  alpha,
  Grid,
  Tooltip,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

const TutorialSpecialMoves = ({ theme }) => {
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
        <EmojiEventsIcon sx={{ mr: 1.5 }} /> Besondere Schachregeln
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
            fontWeight={700}
            gutterBottom
            sx={{ color: theme.palette.secondary.main, mb: 2 }}
          >
            Die Rochade
          </Typography>

          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            Die Rochade ist ein spezieller Zug, bei dem der König und ein Turm
            gleichzeitig bewegt werden. Es ist der einzige Zug, bei dem zwei
            Figuren auf einmal gezogen werden.
          </Typography>

          <Grid container spacing={3} sx={{ mb: 2 }}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                }}
              >
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                  Kurze Rochade (O-O):
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                  König bewegt sich zwei Felder zum Turm auf der Königsseite
                  (h-Linie), und der Turm springt auf die andere Seite des
                  Königs.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                }}
              >
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                  Lange Rochade (O-O-O):
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                  König bewegt sich zwei Felder zum Turm auf der Damenseite
                  (a-Linie), und der Turm springt auf die andere Seite des
                  Königs.
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? alpha(theme.palette.secondary.dark, 0.1)
                  : alpha(theme.palette.secondary.light, 0.1),
              border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
            }}
          >
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Voraussetzungen für die Rochade:
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography
                component="ul"
                variant="body1"
                sx={{ lineHeight: 1.8 }}
              >
                <li>
                  König und beteiligter Turm dürfen noch nicht bewegt worden
                  sein
                </li>
                <li>Keine Figuren zwischen König und Turm</li>
                <li>König darf nicht im Schach stehen</li>
                <li>König darf nicht über ein bedrohtes Feld ziehen</li>
                <li>König darf nicht auf ein bedrohtes Feld ziehen</li>
              </Typography>
            </Box>

            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <Chip
                icon={<EmojiObjectsIcon />}
                label="Strategischer Zweck: Sicherheit des Königs und Aktivierung des Turms"
                color="secondary"
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
            </Box>
          </Paper>
        </CardContent>
      </Card>

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
            fontWeight={700}
            gutterBottom
            sx={{ color: theme.palette.secondary.main, mb: 2 }}
          >
            En Passant (Im Vorbeigehen)
          </Typography>

          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            Wenn ein Bauer von seiner Startposition aus zwei Felder vorrückt und
            dabei neben einem gegnerischen Bauern landet, kann dieser
            gegnerische Bauer ihn "im Vorbeigehen" schlagen, als ob er nur ein
            Feld vorgerückt wäre.
          </Typography>

          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            Dieser spezielle Schlagzug muss unmittelbar im nächsten Zug
            ausgeführt werden, sonst verfällt das Recht auf "En Passant".
          </Typography>

          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? alpha(theme.palette.info.main, 0.15)
                  : alpha(theme.palette.info.main, 0.08),
              border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <EmojiObjectsIcon
              color="info"
              sx={{
                mr: 2,
                fontSize: 28,
                filter: `drop-shadow(0 1px 2px ${alpha(
                  theme.palette.info.main,
                  0.5
                )})`,
              }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Wichtig zu wissen:
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                Diese Regel verhindert, dass ein Bauer mit seinem Doppelschritt
                einem Schlagzug durch einen gegnerischen Bauern entgehen kann.
                Sie ist eine der am häufigsten übersehenen Regeln für Anfänger!
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card
        elevation={0}
        sx={{
          mb: 3,
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
            sx={{ color: theme.palette.secondary.main, mb: 2 }}
          >
            Bauernumwandlung
          </Typography>

          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            Wenn ein Bauer die gegnerische Grundreihe (8. Reihe für Weiß, 1.
            Reihe für Schwarz) erreicht, wird er umgewandelt. Der Spieler muss
            den Bauern in eine Dame, einen Turm, einen Läufer oder einen
            Springer der eigenen Farbe umwandeln.
          </Typography>

          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            In den meisten Fällen wird der Bauer in eine Dame umgewandelt, da
            sie die stärkste Figur ist. Diese Umwandlung kann dazu führen, dass
            ein Spieler mehr als eine Dame hat.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                width: { xs: "100%", sm: "80%" },
                py: 2,
                px: 3,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.background.paper, 0.5),
                border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
              }}
            >
              <Tooltip title="Dame">
                <Typography
                  variant="h3"
                  color={theme.palette.mode === "dark" ? "white" : "black"}
                >
                  ♕
                </Typography>
              </Tooltip>
              <Tooltip title="Turm">
                <Typography
                  variant="h3"
                  color={theme.palette.mode === "dark" ? "white" : "black"}
                >
                  ♖
                </Typography>
              </Tooltip>
              <Tooltip title="Läufer">
                <Typography
                  variant="h3"
                  color={theme.palette.mode === "dark" ? "white" : "black"}
                >
                  ♗
                </Typography>
              </Tooltip>
              <Tooltip title="Springer">
                <Typography
                  variant="h3"
                  color={theme.palette.mode === "dark" ? "white" : "black"}
                >
                  ♘
                </Typography>
              </Tooltip>
            </Box>
          </Box>

          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? alpha(theme.palette.info.main, 0.15)
                  : alpha(theme.palette.info.main, 0.08),
              border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <EmojiObjectsIcon
              color="info"
              sx={{
                mr: 2,
                fontSize: 28,
                filter: `drop-shadow(0 1px 2px ${alpha(
                  theme.palette.info.main,
                  0.5
                )})`,
              }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Fortgeschrittener Tipp:
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                In seltenen Fällen kann es taktisch vorteilhaft sein, in einen
                Springer oder eine andere Figur umzuwandeln statt in eine Dame.
                Dies nennt man "Unterverwandlung" und kann z.B. notwendig sein,
                um ein sofortiges Patt zu vermeiden.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TutorialSpecialMoves;
