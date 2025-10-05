import React, { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import ExoplanetListComponent from "./ExoplanetListComponent";
import PlanetModel from "../models/PlanetModel";
import httpClient from "../config/httpClient";

const ExoplanetsComponent = () => {
    const [exoplanets, setPlanets] = useState<PlanetModel[]>([]);

    useEffect(() => {
        httpClient.get<PlanetModel[]>('/assumptions').then(value => {
            setPlanets(value.data);
        }
        )
    }, [])

    return (
        <Stack spacing={2} p={2}>
            <Typography variant="h2">All discovered exoplanets</Typography>
            {exoplanets.length > 0 && <ExoplanetListComponent planets={exoplanets} />}
        </Stack>
    )
}

export default ExoplanetsComponent;