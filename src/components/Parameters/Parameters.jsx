import { useSettings } from '../../hooks/useSettings';
import styles from './Parameters.module.css'

const selection = ["tournament", "roulette"];
const crossover = ["one_point", "two_point"];

export const Parameters = () => {
    const { settings, setSettings } = useSettings();

    const handleChange = (e) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        });
    };

    return (
        <fieldset className={styles.settingsParameters}>
            <legend>Настройки генетического алгоритма</legend>
            <div className={styles.parameters}>
                <label htmlFor="populationSize">Размер популяции
                    <input type="number" name="populationSize" id="populationSize" min={2} value={settings.populationSize} onChange={handleChange} />
                </label>
                <label htmlFor="generations">Поколений
                    <input type="number" name="generations" id="generations" min={1} value={settings.generations} onChange={handleChange} />
                </label>
                <label htmlFor="selection">Отбор
                    <select name="selection" id="selection" value={settings.selection} onChange={handleChange}>
                        {selection.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor="coefTour">k (tournament)
                    <input type="number" name="coefTour" id="coefTour" min={2} max={settings.populationSize} value={settings.coefTour} onChange={handleChange} disabled={settings.selection === "tournament" ? false : true} />
                </label>
                <label htmlFor="crossover">Кроссовер
                    <select name="crossover" id="crossover" value={settings.crossover} onChange={handleChange}>
                        {crossover.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor="chanceCrossover">P (crossover)
                    <input type="number" step={0.1} name="chanceCrossover" id="chanceCrossover" min={0} max={1} value={settings.chanceCrossover} onChange={handleChange} />
                </label>
                <label htmlFor="chanceMutation">P (mutation)
                    <input type="number" step={0.1} name="chanceMutation" id="chanceMutation" min={0} max={1} value={settings.chanceMutation} onChange={handleChange} />
                </label>
                <label htmlFor="elitism">Элитизм
                    <input type="number" name="elitism" id="elitism" min={0} max={settings.populationSize - 1} value={settings.elitism} onChange={handleChange} />
                </label>
            </div>
        </fieldset>
    );
};
