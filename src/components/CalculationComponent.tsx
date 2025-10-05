import React, { useEffect, useState } from "react";
import { Button, Card, CardActionArea, Grid, Stack, Switch, TextField, Typography } from "@mui/material"
import { FieldArray, Form, Formik, useFormik } from "formik";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ExperimentResponse from "../models/ExperimentResponse";
import OrbitExampleComponent from "./OrbitExapleComponent";
import httpClient from "../config/httpClient";
import PlanetModel from "../models/PlanetModel";
import ExperimentHistoryModel from "../models/ExperimentHistoryModel";
import ExoplanetListComponent from "./ExoplanetListComponent";

const CalculationComponent: React.FC = () => {
    const [isLoading, setLoading] = useState(false);
    const [planets, setPlanets] = useState<PlanetModel[]>([])
    const [isKnownStar, setKnownStar] = useState(false);
    const [experimentsHistory, setHistory] = useState<ExperimentHistoryModel[]>([]);
    const formikRef = React.useRef<any>(null);
    const formStar = useFormik({
        initialValues: {
            star_id: '',
        },
        onSubmit: async values => {
            setLoading(true);
            const experiment = (await httpClient.post<ExperimentResponse>('/experiments/known-star', values)).data
            setPlanets(experiment.conclusion.planets)
            setLoading(false);
        },
    });

    useEffect(() => {

        httpClient.get<ExperimentHistoryModel[]>('experiments').then(value => {
            setHistory(value.data)
        });
    }, [])


    const getExperiment = (id: string) => {
        const experiment = httpClient.get<ExperimentResponse>(`/experiments/${id}`).then((value) => {
            const experiment = value.data;

            if (formikRef.current) {

                formikRef.current.resetForm({
                    values: {
                        observations: experiment.observations
                    }
                });
            }

            setPlanets(experiment.conclusion.planets);
        })

        return experiment;
    }

    return (
        <Stack sx={{ alignItems: 'center' }} spacing={2}>

            <Typography variant="h2">History</Typography>
            <Grid container spacing={3}>
                {experimentsHistory!.map((experiment) => (
                    <Grid size={{ xs: 12, md: 6 }} key={experiment.id}>
                        <Card sx={{ boxShadow: 3, height: '100%' }}>
                            <CardActionArea sx={{ p: 3 }} onClick={() => getExperiment(experiment.id)}>
                                <Typography>{experiment.name}</Typography>
                                <Typography>{`Conducted at ${new Date(experiment.conducted_at).toLocaleString()}`}</Typography>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Stack direction="row" padding={3} spacing={2} alignItems="center">
                <Typography>Add new experiment</Typography>
                <Switch value={isKnownStar} onChange={(e, checked) => setKnownStar(checked)} />
                <Typography>Use existing star</Typography>
            </Stack>
            {!isKnownStar && <><Typography variant="h2">Add new experiment</Typography>
                <Typography variant="subtitle1">Provide your experiment observations
                    and our AI model will calculate exoplanet candidates</Typography>

                <Formik
                    innerRef={formikRef}
                    initialValues={{ observations: [{ time: 0, flux: 0, flux_err: 0, quality: 0, centroid_col: 0, centroid_row: 0, sap_flux: 0, background: 0 }] }}

                    onSubmit={async values => {
                        setLoading(true);
                        const experiment = (await httpClient.post<ExperimentResponse>('/experiments/custom-wave', values)).data
                        setPlanets(experiment.conclusion.planets)
                        setLoading(false);
                    }
                    }
                    render={({ values, handleChange }) => (
                        <Form style={{ width: '50%' }}>
                            <FieldArray
                                name="observations"
                                render={arrayHelpers => (
                                    <Stack spacing={2} >

                                        {values.observations && values.observations.map((observation, index) => (
                                            <Card key={index} sx={{ p: 3, width: "100%", boxShadow: 3 }}>
                                                <Stack width="100%" spacing={2}>
                                                    <TextField label="time" fullWidth value={observation.time} name={`observations[${index}].time`} onChange={handleChange} />
                                                    <TextField label="flux" fullWidth value={observation.flux} name={`observations[${index}].flux`} onChange={handleChange} />
                                                    <TextField label="quality" fullWidth value={observation.quality} name={`observations[${index}].quality`} onChange={handleChange} />
                                                    <TextField label="centroid_col" fullWidth value={observation.centroid_col} name={`observations[${index}].centroid_col`} onChange={handleChange} />
                                                    <TextField label="centroid_row" fullWidth value={observation.centroid_row} name={`observations[${index}].centroid_row`} onChange={handleChange} />
                                                    <TextField label="sap_flux" fullWidth value={observation.sap_flux} name={`observations[${index}].sap_flux`} onChange={handleChange} />
                                                    <TextField label="background" fullWidth value={observation.background} name={`observations[${index}].background`} onChange={handleChange} />
                                                    <Button variant="outlined" sx={{ visibility: values.observations.length > 1 ? 'visible' : 'collapse' }} color="error" onClick={() => arrayHelpers.remove(index)}>
                                                        <DeleteIcon />
                                                    </Button>
                                                </Stack>
                                            </Card>
                                        ))}
                                        <Button
                                            type="button"
                                            fullWidth
                                            variant="contained"
                                            onClick={() => arrayHelpers.push({ time: 0, flux: 0, flux_err: 0, quality: 0, centroid_col: 0, centroid_row: 0, sap_flux: 0, background: 0 })}
                                        >
                                            <AddIcon />
                                        </Button>
                                        <Button type="submit" variant="outlined" loading={isLoading} color="primary">
                                            Submit
                                        </Button>
                                    </Stack>
                                )}
                            />
                        </Form>
                    )}
                />
            </>}
            {
                isKnownStar && <>
                    <form onSubmit={formStar.handleSubmit} style={{ width: '50%' }}>
                        <Stack spacing={2}>
                            <TextField label="centroid_col" fullWidth value={formStar.values.star_id} name="star_id" onChange={formStar.handleChange} />

                            <Button type="submit" variant="outlined" loading={isLoading} color="primary">
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </>
            }
            {planets.length > 0 &&
                <>
                    <Typography variant="h2">Exoplanet candidates</Typography>
                    <ExoplanetListComponent planets={planets!} />
                    <OrbitExampleComponent planetsData={planets!} />
                </>
            }

        </Stack>



    )
}

export default CalculationComponent;