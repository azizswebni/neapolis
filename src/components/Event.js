import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

export default function Event({ event }) {
  return (
    <Card sx={{ minWidth: 275 }} className="ev">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {event.type}
        </Typography>
        <Typography variant="h5" component="div">
          {event.title}
        </Typography>

        <Typography variant="body2">
          {event.description}
          <br />
          {event.date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => {
            axios
              .delete(`http://localhost:5000/api/ev/del/${event._id}`)
              .then(() => (window.location = "/"));
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
