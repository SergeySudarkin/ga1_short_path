import { generateChromosome } from './generateChromosome'
import { calculatePath } from './calculatePath'
import { calculateFitness } from './calculateFitness'
import { sortedPopulation } from './sortedPopulation'

export const generatePopulation = (popSize, lenChrom, start, end, matrix) => {
    let population = [];

    const maxNode = matrix.length;

    for (let i = 0; i < popSize; i++) {
        const chromosome = generateChromosome(lenChrom, start, end, maxNode);
        const path = calculatePath(chromosome, matrix);
        const fitness = calculateFitness(path);

        population.push({
            chromosome,
            path,
            fitness,
        });
    }

    population = sortedPopulation(population);

    return population;
}