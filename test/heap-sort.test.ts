import { heapsort } from '../src/core/heap-sort';

describe('heapsort asc', () => {
    it('should sort an array of numbers in ascending order', () => {
        const inputArray = [12, 11, 13, 5, 6, 7];
        const expectedOutput = [5, 6, 7, 11, 12, 13];

        heapsort(inputArray);
        expect(inputArray).toEqual(expectedOutput);
    });
});