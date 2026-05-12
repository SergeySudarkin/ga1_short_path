export const sortedPopulation = (population) => {
    return [...population].sort((a, b) => b.fitness - a.fitness);
}