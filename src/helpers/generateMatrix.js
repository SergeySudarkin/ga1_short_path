import { getRandom } from "./getRandom";

export const generateMatrix = (n, min, max) => {
    const matrix = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            if (i === j) {
                matrix[i][j] = 0;
            } else {
                const value = getRandom(min, max);
                matrix[i][j] = value;
                matrix[j][i] = value;
            }
        }
    }
    return matrix;
}