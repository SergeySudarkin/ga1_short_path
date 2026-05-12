import { calculateFitness } from "./calculateFitness";
import { calculatePath } from "./calculatePath"

export const recalculatePopulation = (pop, matrix) => {
    return pop.map((item) => {
        const path = calculatePath(item.chromosome, matrix);
        const fitness = calculateFitness(path);
        return {
            ...item,
            path,
            fitness
        }
    })
}