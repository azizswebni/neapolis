import React, { useRef, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import axios from "axios";
import SelectBox from "../components/Selectbox";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

const theme = createTheme();

export default function Addevent() {
  const [value, setValue] = useState();
  const [titre, setTitre] = useState();
  const [type, setType] = useState("Culturel");
  const [description, setDescription] = useState();
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const mapContainerRef = useRef(null);
  const [center, setCenter] = useState([-87.65, 41.84]);
  useEffect(() => {
    // Create default markers
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: center,
      zoom: 10,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    navigator.geolocation.getCurrentPosition((pos) => {
      map.flyTo({ center: [pos.coords.longitude, pos.coords.latitude] });
    });
    map.on("click", (ev) => {
      setLat(ev.lngLat.lat);
      setLon(ev.lngLat.lng);
      new mapboxgl.Marker().setLngLat(ev.lngLat).addTo(map);
    });
    // Clean up on unmount
    return () => map.remove();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Evenement
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="titre"
                  autoFocus
                  onChange={(e) => setTitre(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="DateTimePicker"
                    value={value}
                    onChange={(newValue) => {
                      console.log(newValue);
                      setValue(newValue);
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Description"
                  multiline
                  required
                  name="description"
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Type
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio onClick={() => setType("Culturel")} />}
                      label="Culturel"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio onClick={() => setType("Sportif")} />}
                      label="Sportif"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={8} sm={12}>
              {" "}
              <div className="map-container" ref={mapContainerRef} />
            </Grid>
            <Button
              variant="contained"
              onClick={() => {
                axios
                  .post("http://localhost:5000/api/ev/addevent", {
                    title: titre,
                    type: type,
                    description: description,
                    date: value,
                    lat: lat,
                    lon: lon,
                  })
                  .then((res) => {
                    console.log(res);
                    window.location = "/";
                  });
              }}
            >
              Submit
            </Button>
            <Button variant="outlined" onClick={() => (window.location = "/")}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
