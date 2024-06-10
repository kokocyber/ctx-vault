"use client";

import "../page.model.css";
import { Navbar } from "@/app/(components)/Navbar";
import { Container, Grid } from "@mui/material";
import PricingPaper from "../(components)/PricingPaper";

export default function Pricing() {

    return (
        <>
            <Navbar>
                <Container maxWidth="xl" sx={{
                    marginTop: "16%"
                }}>
                    <Grid container spacing={15}>
                        <Grid item xs={4}>
                            <PricingPaper
                                title="Premium"
                                price="59.99"
                                description="Enjoy advanced security features and priority support with our Premium subscription. Perfect for individuals looking to enhance their online safety."
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <PricingPaper
                                title="Pro"
                                price="99.99"
                                description="Elevate your password management with the Pro plan. Includes all Premium features plus multi-device syncing and secure sharing options for teams and families."
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <PricingPaper
                                title="Deluxe"
                                price="149.99"
                                description="Experience the ultimate in password security and convenience with Deluxe. Get all Pro features, unlimited storage, and exclusive VIP support for complete peace of mind."
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Navbar>
        </>
    );
}
