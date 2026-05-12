import { useSettings } from '../../hooks/useSettings';
import { generateMatrix } from './../../helpers/generateMatrix'
import styles from './Topology.module.css'

export const Topology = () => {
    const { settings, setSettings, setMatrix } = useSettings();

    const handleChange = (e) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        });
    };

    const handleGenerate = () => {
        const newMatrix = generateMatrix(settings.countPeaks, settings.minWeight, settings.maxWeight);
        setMatrix(newMatrix);
    }

    return (
        <fieldset className={styles.settingsTopology}>
            <legend>Настройки топологии</legend>
            <div className={styles.topology}>
                <label htmlFor="countPeaks">Количество вершин N
                    <input type="number" name="countPeaks" id="countPeaks" min={4} value={settings.countPeaks} onChange={handleChange} />
                </label>
                <label htmlFor="lengthChrom">Длина хромосомы L
                    <input type="number" name="lengthChrom" id="lengthChrom" min={settings.countPeaks - 2} value={settings.lengthChrom} onChange={handleChange} />
                </label>
                <label htmlFor="startPeak">Начальная вершина
                    <input type="number" name="startPeak" id="startPeak" min={1} max={settings.countPeaks} value={settings.startPeak} onChange={handleChange} />
                </label>
                <label htmlFor="endPeak">Конечная вершина
                    <input type="number" name="endPeak" id="endPeak" min={1} max={settings.countPeaks} value={settings.endPeak} onChange={handleChange} />
                </label>
                <hr />
                <label htmlFor="minWeight">Вес дуги (min)
                    <input type="number" name="minWeight" id="minWeight" min={1} value={settings.minWeight} onChange={handleChange} />
                </label>
                <label htmlFor="maxWeight">Вес дуги (max)
                    <input type="number" name="maxWeight" id="maxWeight" min={1} value={settings.maxWeight} onChange={handleChange} />
                </label>
                <button className={styles.randomWeightBtn} onClick={handleGenerate}>Сгенерировать случайные веса</button>
            </div>
        </fieldset>
    );
};
