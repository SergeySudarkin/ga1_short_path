export const calculateFitness = (path) => {
    const fitness = Number((1 / (1 + path)).toFixed(4));
    return fitness;
}