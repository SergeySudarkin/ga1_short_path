import { Matrix } from "../Matrix/Matrix";
import { Parameters } from "../Parameters/Parameters";
import { Topology } from "../Topology/Topology";
import styles from "./Settings.module.css"

export const Settings = () => {
    return (
        <div className={styles.settings}>
            <Topology />
            <Matrix />
            <Parameters />
        </div>
    );
};
