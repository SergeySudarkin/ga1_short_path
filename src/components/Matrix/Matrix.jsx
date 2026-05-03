import { useSettings } from '../../hooks/useSettings';
import styles from './Matrix.module.css';

export const Matrix = () => {
    const { settings, matrix } = useSettings();

    return (
        <fieldset className={styles.matrix}>
            <legend>Матрица расстояний</legend>
            <table>
                <thead>
                    <tr key={"head"}>
                        <th key={"number"}>Номер</th>
                        {Array.from({ length: settings.countPeaks }).map((_, colIndex) => (
                            <th key={`col-head-${colIndex + 1}`}>{colIndex + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: settings.countPeaks }).map((_, rowIndex) => (
                        <tr key={`row-${rowIndex + 1}`}>
                            <th key={`row-head-${rowIndex + 1}`}>{rowIndex + 1}</th>
                            {Array.from({ length: settings.countPeaks }).map((_, colIndex) => (
                                <td key={colIndex}>
                                    {matrix?.[rowIndex]?.[colIndex] ?? "-"}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </fieldset>
    );
};
