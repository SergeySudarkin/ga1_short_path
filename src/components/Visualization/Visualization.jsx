import { Cycle } from '../Cycle/Cycle';
import { Graph } from '../Graph/Graph';
import styles from './Visualization.module.css'
import { useState } from 'react';

export const Visualization = () => {
    const [mode, setMode] = useState("cycle");

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
                    {mode === "step" ? "hth" : null}
                </div>
            </div>
            <div className={styles.graph}>
                <Graph />
            </div>
        </div>
    );
};
