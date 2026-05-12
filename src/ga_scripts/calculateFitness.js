export const calculateFitness = (path) => {
    const fitness = Number((1 / (1 + path)));
    return fitness;
}