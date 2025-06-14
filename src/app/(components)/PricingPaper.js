"use client";

import { useState } from "react";
import "./page.models.css";
import { Paper, Divider, Grid } from "@mui/material";

export default function PricingPaper(props) {
  const { title, price, description } = props;
  const [elevation, setElevation] = useState(1);

  const handleMouseOver = () => {
    setElevation(15);
  };

  const handleMouseOut = () => {
    setElevation(1);
  };

  return (
    <Paper
      elevation={elevation}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="paperStyle"
    >
      <div className="title">{title}</div>
      <Divider />
      <p className="description">With our {title} subscription you can:</p>
      <p className="description">{description}</p>
      <Divider />
      <Grid container sx={{ mt: 2, mb: 0 }}>
        <Grid item xs={8}>
          <div className="price">
            {price}CHF<span className="time">/min</span>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="small">currently unavailable</div>
        </Grid>
      </Grid>
    </Paper>
  );
}
