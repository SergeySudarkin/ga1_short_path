import { useState } from 'react';
import { crossover } from '../../ga_scripts/crossover';
import { generatePopulation } from '../../ga_scripts/generatePopulations';
import { mutation } from '../../ga_scripts/mutation';
import { recalculatePopulation } from '../../ga_scripts/recalculatePopulation';
import { selection } from '../../ga_scripts/selection';
import { sortedPopulation } from '../../ga_scripts/sortedPopulation';
import { useSettings } from '../../hooks/useSettings';
import styles from './Step.module.css'

export const Step = () => {
    const [step, setStep] = useState(0);
    const [beforePop, setBeforePop] = useState([]);
    const [afterPop, setAfterPop] = useState([]);
    const [currentPopulation, setCurrentPopulation] = useState([]);
    const [generations, setGenerations] = useState([]);

    const { settings, matrix, setBestChromosome } = useSettings();

    const handleGeneratePopulation = () => {
        const population = generatePopulation(settings.populationSize, settings.lengthChrom, settings.startPeak, settings.endPeak, matrix);

        setBestChromosome(population[0].chromosome);
        setCurrentPopulation(population);
        setBeforePop(population);
        setAfterPop([]);
        setGenerations([
            {
                generation: 1,
                population
            }
        ])
        setStep(0);
    }

    const handleRun = () => {
        if (!currentPopulation.length) return;

        let newPopulation = [...currentPopulation];

        if (step === 0) {
            setBeforePop(newPopulation);
            newPopulation = selection(newPopulation, settings.selection, settings.coefTour);
            setAfterPop(newPopulation);
            setCurrentPopulation(newPopulation);
            setStep(1);
        } else if (step === 1) {
            setBeforePop(newPopulation);
            newPopulation = crossover(newPopulation, settings.crossover, settings.chanceCrossover);
            setAfterPop(newPopulation);
            setCurrentPopulation(newPopulation);
            setStep(2);
        } else if (step === 2) {
            setBeforePop(newPopulation);
            newPopulation = mutation(newPopulation, settings.chanceMutation, settings.countPeaks);
            setAfterPop(newPopulation);
            setCurrentPopulation(newPopulation);
            setStep(3);
        } else if (step === 3) {
            const elite = newPopulation.slice(0, settings.elitism).map(item => ({
                ...item,
                chromosome: [...item.chromosome]
            }));
            setBeforePop(newPopulation);
            newPopulation = recalculatePopulation(newPopulation, matrix);
            newPopulation = sortedPopulation(newPopulation);
            newPopulation.splice(newPopulation.length - settings.elitism, settings.elitism);
            newPopulation.push(...elite);
            newPopulation = sortedPopulation(newPopulation);
            setAfterPop(newPopulation);
            setCurrentPopulation(newPopulation);
            setGenerations(prev => [
                ...prev,
                {
                    generation: prev.length + 1,
                    population: newPopulation
                }
            ]);
            setBestChromosome(newPopulation[0].chromosome);
            setStep(0);
        }
    };

    const operatorNames = ["Селекция", "Скрещивание", "Мутация", "Формирование поколения"];

    return (
        <div className={styles.step}>
            <div className={styles.stepBtns}>
                <button className={styles.startBtn} onClick={handleGeneratePopulation}>Инициализировать</button>
                <button className={styles.startBtn} onClick={handleRun} disabled={(generations.length == 0) || (generations.length == settings.generations) ? true : false}>Следующий оператор</button>
                <p className={styles.info}>Поколение: {generations.length}/{settings.generations}</p>
                <p className={styles.info}>Оператор: {operatorNames[step]}</p>
            </div>
            <div className={styles.stepDatas}>
                <div>
                    <h3 className={styles.title}>До оператора</h3>
                    <div className={styles.beforeOperator}>
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
                                {beforePop.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{item.chromosome.join(" -> ")}</td>
                                        <td>{item.path}</td>
                                        <td>{item.fitness.toFixed(4)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <h3 className={styles.title}>После оператора</h3>
                    <div className={styles.afterOperator}>
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
                                {afterPop.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{item.chromosome.join(" -> ")}</td>
                                        <td>{item.path}</td>
                                        <td>{item.fitness.toFixed(4)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
