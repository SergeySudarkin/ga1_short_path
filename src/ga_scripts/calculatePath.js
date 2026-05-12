export const calculatePath = (chromosome, matrix) => {
    let sum = 0;
    for (let i = 0; i < chromosome.length - 1; i++) {
        const from = chromosome[i] - 1;
        const to = chromosome[i + 1] - 1;
        const weight = matrix[from][to];
        sum += weight;
    }
    return sum;
}