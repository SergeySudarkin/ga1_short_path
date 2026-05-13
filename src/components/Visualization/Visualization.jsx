import { useSettings } from '../../hooks/useSettings';
import { Cycle } from '../Cycle/Cycle';
import { Graph } from '../Graph/Graph';
import { Step } from '../Step/Step';
import styles from './Visualization.module.css'
import { useState } from 'react';

export const Visualization = () => {
    const [mode, setMode] = useState("cycle");
    const { matrix } = useSettings();


    return (
        <div className={styles.visualization}>
            <div>
                <div className={styles.mode}>
                    <span>Режим:</span>
                    <input type="radio" name="mode" id="cycle" value="cycle" onChange={() => setMode("cycle")} checked={mode === "cycle"} />
                    <label htmlFor="cycle">Циклический</label>
                    <input type="radio" name="mode" id="step" value="step" onChange={() => setMode("step")} checked={mode === "step"} />
                    <label htmlFor="step">Пошаговый</label>
                </div>
                <div className={styles.content}>
                    {mode === "cycle" ? <Cycle /> : null}
                    {mode === "step" ? <Step /> : null}
                </div>
            </div>
            {matrix.length ?
                <div className={styles.graph}>
                    <Graph />
                </div>
                : ""}
        </div>
    );
};
