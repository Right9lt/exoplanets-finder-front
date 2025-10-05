import ConclusionModel from "./ConclusionModel";
import ObservationsModel from "./ObservationsModel";

export default interface ExperimentResponse{
    observations: ObservationsModel[];
    id: string;
    conclusion: ConclusionModel;
    conducted_at: Date;
}
