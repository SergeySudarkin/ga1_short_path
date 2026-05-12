export const getStats = (population) => {
    if (!population.length) return null;

    const best = population[0].path;
    const worst = population[population.length - 1].path;
    const avg = population.reduce((sum, item) => sum + item.path, 0) / population.length;

    return { best, worst, avg: avg.toFixed(3) };
}