import styles from './Cycle.module.css'
import { useSettings } from '../../hooks/useSettings';
import { generatePopulation } from '../../ga_scripts/generatePopulations';
import { getStats } from '../../ga_scripts/getStats';
import { selection } from '../../ga_scripts/selection';

export const Cycle = () => {
    const { settings, matrix, pop, setPop, generations, setGenerations } = useSettings();

    const handleGeneratePopulation = () => {
        const population = generatePopulation(settings.populationSize, settings.lengthChrom, settings.startPeak, settings.endPeak, matrix);
        const stats = getStats(population);

        setPop(population);
        setGenerations([
            {
                generation: 1,
                population,
                stats,
            }
        ])
    }

    const handleRun = () => {
        if (!generations.length) return;

        let currentGen = generations.length;
        let population = generations[generations.length - 1].population;

        const interval = setInterval(() => {
            if (currentGen >= settings.generations) {
                clearInterval(interval);
                return;
            }

            let nextPopulation = selection(population, settings.selection, settings.coefTour);
            // population = crossover(population);
            // population = mutation(population);
            // population = sortedPopulation(population);
            population = nextPopulation;

            const stats = getStats(population);

            const nextGenNumber = currentGen + 1;

            setGenerations((prev) => [
                ...prev,
                {
                    generation: nextGenNumber,
                    population,
                    stats,
                },
            ]);

            currentGen++;
        }, 30);
    };

    return (
        <div className={styles.cycle}>
            <div className={styles.cycleBtns}>
                <button className={styles.startBtn} onClick={handleGeneratePopulation} disabled={(generations.length > 1) && (generations.length !== settings.generations) ? true : false}>Инициализировать</button>
                <button className={styles.startBtn} onClick={handleRun} disabled={generations.length !== 1 ? true : false}>Запуск</button>
            </div>
            <div className={styles.aggregated}>
                <h3>Агрегированные данные по поколениям</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Поколение</th>
                            <th>Лучшее</th>
                            <th>Среднее</th>
                            <th>Худшее</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generations.map((gen) => (
                            <tr key={gen.generation}>
                                <td>{gen.generation}</td>
                                <td>{gen.stats.best}</td>
                                <td>{gen.stats.avg}</td>
                                <td>{gen.stats.worst}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.set}>
                <h3>Итоговый набор хромосом</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Номер</th>
                            <th>Хромосома</th>
                            <th>Длина пути</th>
                            <th>Fitness</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generations.length === settings.generations && (
                            generations[settings.generations - 1].population.map((pop, idx) => (
                                <tr key={idx + 1}>
                                    <td>{idx + 1}</td>
                                    <td>{pop.chromosome.join(" -> ")}</td>
                                    <td>{pop.path}</td>
                                    <td>{pop.fitness}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
