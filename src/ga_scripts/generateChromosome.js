import { getRandom } from "../helpers/getRandom";

export const generateChromosome = (lenChrom, start, end, maxNode) => {
    const chromosome = [start];
    for (let i = 1; i < lenChrom - 1; i++) {
        chromosome.push(getRandom(1, maxNode));
    }
    chromosome.push(end);
    return chromosome;
}