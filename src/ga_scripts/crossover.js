import { getRandom } from "../helpers/getRandom";

export const crossover = (pop, optionCross, chanceCross) => {
    let population = [];
    while (population.length < pop.length) {
        const parent1 = pop[getRandom(0, pop.length - 1)];
        const parent2 = pop[getRandom(0, pop.length - 1)];
        let child1 = [...parent1.chromosome];
        let child2 = [...parent2.chromosome];
        const isCross = Math.random() < chanceCross;

        if (isCross) {
            if (optionCross === "one_point") {
                const point = getRandom(1, child1.length - 2);
                child1 = [
                    ...parent1.chromosome.slice(0, point),
                    ...parent2.chromosome.slice(point)
                ];
                child2 = [
                    ...parent2.chromosome.slice(0, point),
                    ...parent1.chromosome.slice(point)
                ];
            } else if (optionCross === "two_point") {
                const point1 = getRandom(1, child1.length - 3);
                const point2 = getRandom(point1 + 1, child1.length - 2);
                child1 = [
                    ...parent1.chromosome.slice(0, point1),
                    ...parent2.chromosome.slice(point1, point2),
                    ...parent1.chromosome.slice(point2)
                ];
                child2 = [
                    ...parent2.chromosome.slice(0, point1),
                    ...parent1.chromosome.slice(point1, point2),
                    ...parent2.chromosome.slice(point2)
                ];
            }
        }

        population.push({
            ...parent1,
            chromosome: child1
        })
        population.push({
            ...parent2,
            chromosome: child2
        });
    }

    return population;
}