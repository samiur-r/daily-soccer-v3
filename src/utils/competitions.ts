export const COMPETITION_IDS = [
    346 // Joan Gamper
];

export const isValidId = (id: number): boolean => {
    return COMPETITION_IDS.includes(id);
}