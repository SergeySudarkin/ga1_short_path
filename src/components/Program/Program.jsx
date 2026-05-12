import { useState, useEffect } from 'react';
import styles from './Program.module.css'
import { Settings } from '../Settings/Settings';
import { Visualization } from '../Visualization/Visualization';
import { SettingsContext } from '../../context/SettingsContext';

export const Program = () => {
    const [activeTab, setActiveTab] = useState('settings');

    const [settings, setSettings] = useState({
        countPeaks: 8,
        lengthChrom: 6,
        startPeak: 1,
        endPeak: 8,
        minWeight: 1,
        maxWeight: 50,
        populationSize: 30,
        selection: "tournament",
        crossover: "one_point",
        elitism: 2,
        generations: 200,
        coefTour: 2,
        chanceCrossover: 0.8,
        chanceMutation: 0.2
    });

    const [matrix, setMatrix] = useState([]);
    const [pop, setPop] = useState([]);
    const [generations, setGenerations] = useState([]);

    useEffect(() => {
        setMatrix([])
    }, [settings.countPeaks, settings.minWeight, settings.maxWeight]);

    return (
        <section className={styles.program}>
            <div className="container">
                <div className={styles.tabs}>
                    <button className={`${styles.tab} ${activeTab == 'settings' ? styles.active : ""}`} onClick={() => setActiveTab("settings")}>Настройки</button>
                    <button className={`${styles.tab} ${activeTab == 'visualization' ? styles.active : ""}`} onClick={() => setActiveTab("visualization")}>Визуализация</button>
                </div>
                <SettingsContext.Provider value={{ settings, setSettings, matrix, setMatrix, pop, setPop, generations, setGenerations }}>
                    {activeTab === "settings" ? <Settings /> : null}
                    {activeTab === "visualization" ? <Visualization /> : null}
                </SettingsContext.Provider>
            </div>
        </section >
    );
};
