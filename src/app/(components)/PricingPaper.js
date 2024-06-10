"use client"

import { useState } from 'react';
import "./page.models.css";
import { Paper, Divider, Grid, Button } from "@mui/material";

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
            sx={{
                padding: 3,
                opacity: "65%",
                transition: '0.3s',
            }}
        >
            <div className="title">{title}</div>
            <Divider />
            <p>
                With our {title} subscription you can:
            </p>
            <p>
                {description}
            </p>
            <Divider />
            <Grid container sx={{ mt: 2, mb: 0 }}>
                <Grid item xs={8}>
                    <div className="price">{price}CHF<span className="time">/min</span></div>
                </Grid>
                <Grid item xs={4}>
                    <div className='small'>currently unavailable</div>
                </Grid> 
            </Grid> 
        </Paper>
    );
}
