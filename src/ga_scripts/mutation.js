import { getRandom } from "../helpers/getRandom";

export const mutation = (pop, chanceMut, countPeaks) => {
    return pop.map((item) => {
        let chromosome = [...item.chromosome];
        const isMutation = Math.random() < chanceMut;
        if (isMutation) {
            const genIndex = getRandom(1, chromosome.length - 2);
            chromosome[genIndex] = getRandom(1, countPeaks);
        }
        return {
            ...item,
            chromosome
        }
    })
}