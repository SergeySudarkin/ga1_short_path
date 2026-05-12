import { getRandom } from "../helpers/getRandom";
import { sortedPopulation } from "./sortedPopulation";

export const selection = (pop, optionSel, coefTour) => {
    if (optionSel === "tournament") {
        let population = [];
        for (let i = 1; i <= pop.length; i++) {
            let tourArr = [];
            for (let j = 1; j <= coefTour; j++) {
                const randomChromIndex = getRandom(0, pop.length - 1);
                tourArr.push(pop[randomChromIndex]);
            }
            let tourEl = tourArr.reduce((max, item) => item.fitness > max.fitness ? item : max);
            population.push({
                ...tourEl,
                chromosome: [...tourEl.chromosome]
            });
        }
        return sortedPopulation(population);
    } else if (optionSel === "roulette") {
        let population = [];
        let popStats = [];
        const sumFitness = pop.reduce((sum, item) => sum + item.fitness, 0);
        for (let i = 0; i < pop.length; i++) {
            popStats.push({
                ...pop[i],
                sectorArea: pop[i].fitness / sumFitness * 100
            })
        }
        popStats.reduce((sum, item) => {
            sum += item.sectorArea;
            item.sectorArea = sum;
            return sum;
        }, 0)
        for (let i = 1; i <= pop.length; i++) {
            const sectorPercent = Math.random() * 100;
            const chrom = popStats.find((item, idx, arr) => {
                const prevSector = idx === 0 ? 0 : arr[idx - 1].sectorArea;
                return (sectorPercent >= prevSector && sectorPercent <= item.sectorArea);
            })
            if (!chrom) continue;
            population.push({
                ...chrom,
                chromosome: [...chrom.chromosome]
            });
        }
        return sortedPopulation(population);
    }
}