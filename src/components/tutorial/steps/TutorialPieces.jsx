// src/components/tutorial/steps/TutorialPieces.jsx
import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  alpha,
  Paper,
} from "@mui/material";
import ExtensionIcon from "@mui/icons-material/Extension";
import CheckIcon from "@mui/icons-material/Check";
import MovementDiagram from "../shared/MovementDiagram";

const TutorialPieces = ({ theme }) => {
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
        <ExtensionIcon sx={{ mr: 1.5 }} /> Bewegungsmuster der Figuren
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
            variant="subtitle1"
            fontWeight={700}
            gutterBottom
            color="primary"
          >
            König
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                Der König kann ein Feld in jede Richtung ziehen (horizontal,
                vertikal oder diagonal). Er ist die wichtigste Figur - wenn er
                geschlagen wird (Schachmatt), ist das Spiel verloren.
              </Typography>

              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                Der König kann nicht auf ein Feld ziehen, das von einer
                gegnerischen Figur bedroht wird.
              </Typography>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.warning.main, 0.1),
                  border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                }}
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  Sonderregel: Rochade
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  Ein besonderer Zug, bei dem König und Turm gleichzeitig bewegt
                  werden. Mehr dazu im Abschnitt "Spezielle Züge".
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <MovementDiagram type="king" />
            </Grid>
          </Grid>
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
            variant="subtitle1"
            fontWeight={700}
            gutterBottom
            color="primary"
          >
            Dame
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                Die Dame ist die stärkste Figur. Sie kann beliebig viele freie
                Felder in jede Richtung ziehen (horizontal, vertikal oder
                diagonal).
              </Typography>

              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                Sie kombiniert die Zugmöglichkeiten von Turm und Läufer und ist
                daher besonders mächtig auf dem Spielfeld.
              </Typography>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.info.main, 0.1),
                  border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                }}
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  Strategischer Hinweis:
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  Die Dame sollte nicht zu früh ins Spiel gebracht werden, da
                  sie leicht von gegnerischen Figuren bedroht werden kann.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <MovementDiagram type="queen" />
            </Grid>
          </Grid>
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
            variant="subtitle1"
            fontWeight={700}
            gutterBottom
            color="primary"
          >
            Turm
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                Der Turm kann beliebig viele freie Felder horizontal (Reihen)
                oder vertikal (Linien) ziehen.
              </Typography>

              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                Türme sind besonders wertvoll in offenen Stellungen und im
                Endspiel, wo sie große Kontrolle über das Brett ausüben können.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.success.main, 0.1),
                  border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                }}
              >
                <CheckIcon sx={{ color: theme.palette.success.main, mr: 1 }} />
                <Typography variant="body2">
                  Ein Turm kontrolliert in einer offenen Position bis zu 14
                  Felder!
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <MovementDiagram type="rook" />
            </Grid>
          </Grid>
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
            variant="subtitle1"
            fontWeight={700}
            gutterBottom
            color="primary"
          >
            Läufer
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                Der Läufer kann beliebig viele freie Felder diagonal ziehen.
              </Typography>

              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                Jeder Läufer bleibt immer auf Feldern der gleichen Farbe - ein
                weißfeldriger Läufer kann niemals auf ein schwarzes Feld ziehen
                und umgekehrt.
              </Typography>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.info.main, 0.1),
                  border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                }}
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  Strategischer Tipp:
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  Ein Läuferpaar (beide Läufer zusammen) kann sehr stark sein,
                  da sie gemeinsam Felder beider Farben kontrollieren können.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <MovementDiagram type="bishop" />
            </Grid>
          </Grid>
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
            variant="subtitle1"
            fontWeight={700}
            gutterBottom
            color="primary"
          >
            Springer
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                Der Springer bewegt sich in einem "L"-Muster: zwei Felder
                horizontal oder vertikal und dann ein Feld im rechten Winkel.
              </Typography>

              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                Der Springer ist die einzige Figur, die über andere Figuren
                "springen" kann und damit besonders wertvoll in geschlossenen
                Stellungen ist.
              </Typography>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.warning.main, 0.1),
                  border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                }}
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  Besonderheit:
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  Der Springer wechselt mit jedem Zug die Feldfarbe - von einem
                  weißen Feld springt er immer auf ein schwarzes und umgekehrt.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <MovementDiagram type="knight" />
            </Grid>
          </Grid>
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
            variant="subtitle1"
            fontWeight={700}
            gutterBottom
            color="primary"
          >
            Bauer
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                Bauern bewegen sich nur vorwärts:
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
                  mb: 2,
                }}
              >
                <Typography component="ul" variant="body1" sx={{ pl: 2 }}>
                  <li>Ein Feld geradeaus (wenn das Feld frei ist)</li>
                  <li>Beim ersten Zug optional zwei Felder</li>
                  <li>Schlagen diagonal vorwärts</li>
                </Typography>
              </Box>

              <Typography paragraph sx={{ fontWeight: 600 }}>
                Sonderregeln:
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
                <Typography component="ul" variant="body1" sx={{ pl: 2 }}>
                  <li>
                    <b>En Passant</b> (im Vorbeigehen)
                  </li>
                  <li>
                    <b>Umwandlung</b> bei Erreichen der letzten Reihe
                  </li>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <MovementDiagram type="pawn" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TutorialPieces;
