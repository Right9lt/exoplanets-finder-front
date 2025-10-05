export default interface ObservationsModel {
    time: number;
    flux: number;
    flux_err: number;
    quality: number;
    centroid_col: number;
    centroid_row: number;
    sap_flux: number;
    background: number;
}