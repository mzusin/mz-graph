import { matrix } from '../src/core/adjacency-matrix';
import { IMatrix } from '../src/interfaces';

describe('Adjacency Matrix Graph', () => {

    describe('Init Matrix', () => {

        test('Init empty matrix 0x0', () => {
            const myGraph: IMatrix<number> = matrix<number>({
                isDirected: false,
                rowsCount: 0,
                columnsCount: 0,
            });
            expect(myGraph.getMatrix()).toEqual([]);
        });

        test('Init empty matrix 1x1', () => {
            const myGraph: IMatrix<number> = matrix<number>({
                isDirected: false,
                rowsCount: 1,
                columnsCount: 1,
            });
            expect(myGraph.getMatrix()).toEqual([
                [
                    undefined,
                ]
            ]);
        });

        test('Init empty matrix 2x2', () => {
            const myGraph: IMatrix<number> = matrix<number>({
                isDirected: false,
                rowsCount: 2,
                columnsCount: 2,
            });
            expect(myGraph.getMatrix()).toEqual([
                [
                    undefined,
                    undefined,
                ],
                [
                    undefined,
                    undefined,
                ],
            ]);
        });

        test('Init empty matrix 3x3', () => {
            const myGraph: IMatrix<number> = matrix<number>({
                isDirected: false,
                rowsCount: 3,
                columnsCount: 3,
            });
            expect(myGraph.getMatrix()).toEqual([
                [
                    undefined,
                    undefined,
                    undefined
                ],
                [
                    undefined,
                    undefined,
                    undefined
                ],
                [
                    undefined,
                    undefined,
                    undefined
                ]
            ]);
        });

        test('Init matrix 2x2 with default 0', () => {
            const myGraph: IMatrix<number> = matrix<number>({
                isDirected: false,
                rowsCount: 2,
                columnsCount: 2,
                defaultValue: 0,
            });
            expect(myGraph.getMatrix()).toEqual([
                [
                    0,
                    0,
                ],
                [
                    0,
                    0,
                ],
            ]);
        });

        test('Init matrix 2x2 with default 1', () => {
            const myGraph: IMatrix<number> = matrix<number>({
                isDirected: false,
                rowsCount: 2,
                columnsCount: 2,
                defaultValue: 1
            });
            expect(myGraph.getMatrix()).toEqual([
                [
                    1,
                    1,
                ],
                [
                    1,
                    1,
                ],
            ]);
        });

        test('Init 2x2 matrix with initial values.', () => {
            const myGraph: IMatrix<number> = matrix<number>({
                initial: [
                    [2, 1],
                    [1, 2],
                ]
            });
            expect(myGraph.getMatrix()).toEqual([
                [2, 1],
                [1, 2],
            ]);
        });
    });

    describe('Add Edge', () => {

        test('addEdge should add an edge between two vertices in undirected - 0,1,5', () => {
            const myGraph: IMatrix<number> = matrix<number>({
                isDirected: false,
                rowsCount: 3,
                columnsCount: 3,
                defaultValue: 0
            });
            myGraph.addEdge(0, 1, 5);
            const res = myGraph.getMatrix();
            expect(res[0][1]).toBe(5);
            expect(res[1][0]).toBe(5);
        });

        test('addEdge should add an edge between two vertices in directed - 0,1,5', () => {
            const myGraph: IMatrix<number> = matrix<number>({
                isDirected: true,
                rowsCount: 3,
                columnsCount: 3,
                defaultValue: 0
            });
            myGraph.addEdge(0, 1, 5);
            const res = myGraph.getMatrix();
            expect(res[0][1]).toBe(5);
            expect(res[1][0]).toBe(0);
        });

        test('addEdge should add an edge between two vertices in undirected - 1,2,8', () => {
            const myGraph: IMatrix<number> = matrix<number>({
                isDirected: false,
                rowsCount: 3,
                columnsCount: 3,
                defaultValue: 0
            });
            myGraph.addEdge(1, 2, 8);
            const res = myGraph.getMatrix();
            expect(res[1][2]).toBe(8);
            expect(res[2][1]).toBe(8);
        });

        test('addEdge should add an edge between two vertices in directed - 1,2,8', () => {
            const myGraph: IMatrix<number> = matrix<number>({
                isDirected: true,
                rowsCount: 3,
                columnsCount: 3,
                defaultValue: 100
            });
            myGraph.addEdge(1, 2, 8);
            const res = myGraph.getMatrix();
            expect(res[1][2]).toBe(8);
            expect(res[2][1]).toBe(100);
        });
    });

    describe('Print Graph', () => {
        let graph: IMatrix<number>;
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            // Initialize a new graph and spy on console.log before each test
            graph = matrix<number>({
                isDirected: false,
                rowsCount: 3,
                columnsCount: 3,
                defaultValue: 0,
            }); // Replace with the appropriate parameters for your use case
            consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        });

        afterEach(() => {
            // Restore the original console.log after each test
            consoleSpy.mockRestore();
        });

        test('printGraph should print the adjacency matrix to the console', () => {
            // Add some edges to the graph for testing
            graph.addEdge(0, 1, 5);
            graph.addEdge(1, 2, 8);

            // Call the printGraph method
            graph.printGraph();

            // Assert that console.log was called with the expected output
            expect(consoleSpy).toHaveBeenCalledTimes(3); // One call for each row in the matrix

            // Assert the content of each call
            expect(consoleSpy.mock.calls[0][0]).toBe('0 5 0'); // Replace with your expected output
            expect(consoleSpy.mock.calls[1][0]).toBe('5 0 8'); // Replace with your expected output
            expect(consoleSpy.mock.calls[2][0]).toBe('0 8 0'); // Replace with your expected output
        });
    });

    describe('BFS & DFS', () => {
        test('BFS visits all nodes in the correct order', () => {
            const myGraph: IMatrix<number> = matrix<number>({
                initial: [
                    [2, 1],
                    [1, 2],
                ]
            });

            const visitedNodes: [number, number, number][] = [];

            myGraph.bfs((row, col, val) => {
                visitedNodes.push([row, col, val]);
            });

            expect(visitedNodes).toEqual([
                [0, 0, 2], [0, 1, 1],
                [1, 0, 1], [1, 1, 2]
            ]);
        });

        test('DFS visits all nodes in the correct order', () => {
            const myGraph: IMatrix<number> = matrix<number>({
                initial: [
                    [2, 1],
                    [1, 2],
                ]
            });

            const visitedNodes: [number, number, number][] = [];

            myGraph.dfs((row, col, val) => {
                visitedNodes.push([row, col, val]);
            });

            expect(visitedNodes).toEqual([
                [0, 0, 2], [1, 0, 1],
                [1, 1, 2], [0, 1, 1],
            ]);
        });
    });
});
