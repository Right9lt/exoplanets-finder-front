import { Grid, Card, Stack, Typography } from "@mui/material";
import React from "react";
import PlanetModel from "../models/PlanetModel";
import PercentageIndicatorComponent from "./PercentageIndicatorComponent";

const ExoplanetListComponent: React.FC<{ planets: PlanetModel[] }> = ({ planets }) => {
    return (
        <Grid container spacing={3} >
            {
                planets!.map((planet, index) => (
                    <Grid size={{ xs: 12, md: 6 }} key={index}>
                        <Card sx={{ p: 3, boxShadow: 3, height: '100%' }}>
                            <Stack spacing={1}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",

                                    }}
                                >
                                    <div
                                        style={{
                                            position: "relative",
                                            width: "200px",
                                            height: "200px",
                                            borderRadius: "50%",
                                            background: "#3c4a5a",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "absolute",
                                                width: "120px",
                                                height: "150px",
                                                background: "#1f2835",
                                                borderRadius: "50%",
                                                top: "0px",
                                                left: "0px",
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                width: "140px",
                                                height: "140px",
                                                background: "hsla(215, 26%, 17%, 0.5)",
                                                borderRadius: "50%",
                                                top: "80px",
                                                left: "70px",
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                width: "100px",
                                                height: "100px",
                                                background: "hsla(215, 26%, 17%, 0.25)",
                                                borderRadius: "50%",
                                                top: "20px",
                                                left: "120px",
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                width: "80px",
                                                height: "80px",
                                                background: "hsla(215, 26%, 17%, 0.8)",
                                                borderRadius: "50%",
                                                bottom: "5px",
                                                left: "50px",
                                            }}
                                        />
                                    </div>
                                </div>
                                <Typography variant="h6" sx={{ wordBreak: "break-word", flex: 1, pr: 2 }}>
                                    {planet.planet}
                                </Typography>
                                <PercentageIndicatorComponent value={planet.probability} label="Exoplanet candidate" />

                                <Typography>Period days: {planet.period_days}</Typography>
                                <Typography>Distance AU: {planet.distance_au}</Typography>
                                <Typography>Radius earth: {planet.radius_earth}</Typography>
                            </Stack>

                        </Card>
                    </Grid>
                ))
            }
        </Grid >
    );
}

export default ExoplanetListComponent;