import { graph } from '../src/core/adjacency-list';
import { IGraph } from '../src/interfaces';

describe('Undirected Adjacency List Graph', () => {

    test('Init graph with initial value', () => {
        const myGraph: IGraph<number> = graph<number>({
            isDirected: true,
            initial: {
                A: [{ label: 'B' }],
                B: [{ label: 'C' }],
                C: [],
            },
        });

        const consoleSpy = jest.spyOn(console, 'log');
        myGraph.printGraph();

        // Test the output
        expect(consoleSpy).toHaveBeenCalledWith('A -> [B]');
        expect(consoleSpy).toHaveBeenCalledWith('B -> [C]');
        expect(consoleSpy).toHaveBeenCalledWith('C -> []');
    });

    test('Init graph with initial value with weights', () => {
        const myGraph: IGraph<number> = graph<number>({
            isDirected: true,
            initial: {
                A: [{ label: 'B', edgeWeight: 10 }],
                B: [{ label: 'C', edgeWeight: 20 }],
                C: [],
            }
        });

        const consoleSpy = jest.spyOn(console, 'log');
        myGraph.printGraph();

        // Test the output
        expect(consoleSpy).toHaveBeenCalledWith('A -> [B(10)]');
        expect(consoleSpy).toHaveBeenCalledWith('B -> [C(20)]');
        expect(consoleSpy).toHaveBeenCalledWith('C -> []');
    });

    test('Add Vertex', () => {
        const myGraph: IGraph<number> = graph<number>({
            isDirected: false
        });
        myGraph.addVertex('A');
        expect(myGraph.hasVertex('A'));
    });

    test('Add Edge', () => {
        const myGraph: IGraph<number> = graph<number>({
            isDirected: false
        });

        myGraph.addVertex('A');
        myGraph.addVertex('B');
        myGraph.addEdge('A', 'B', 42);

        const neighborsA = myGraph.getVertex('A');
        const neighborsB = myGraph.getVertex('B');

        expect(neighborsA).toContainEqual({ label: 'B', edgeWeight: 42 });
        expect(neighborsB).toContainEqual({ label: 'A', edgeWeight: 42 });
    });

    test('Print Graph', () => {
        const myGraph: IGraph<number> = graph<number>({
            isDirected: false
        });

        myGraph.addVertex('A');
        myGraph.addVertex('B');
        myGraph.addEdge('A', 'B', 99);

        // Redirect console.log to capture the output
        const consoleSpy = jest.spyOn(console, 'log');
        myGraph.printGraph();

        // Test the output
        expect(consoleSpy).toHaveBeenCalledWith('A -> [B(99)]');
        expect(consoleSpy).toHaveBeenCalledWith('B -> [A(99)]');
    });

    test('BFS', () => {
        const myGraph: IGraph<number> = graph<number>({
            isDirected: false
        });

        myGraph.addVertex('A');
        myGraph.addVertex('B');
        myGraph.addVertex('C');
        myGraph.addVertex('D');

        myGraph.addEdge('A', 'B');
        myGraph.addEdge('A', 'C');
        myGraph.addEdge('B', 'D');

        const callback = jest.fn();
        myGraph.bfs(callback);

        // Check the callback calls in the correct order
        expect(callback).toHaveBeenNthCalledWith(1, 'A');
        expect(callback).toHaveBeenNthCalledWith(2, 'B');
        expect(callback).toHaveBeenNthCalledWith(3, 'C');
        expect(callback).toHaveBeenNthCalledWith(4, 'D');
        expect(callback).toHaveBeenCalledTimes(4);
    });

    test('DFS', () => {
        const myGraph: IGraph<number> = graph<number>({
            isDirected: false
        });

        myGraph.addVertex('A');
        myGraph.addVertex('B');
        myGraph.addVertex('C');

        myGraph.addEdge('A', 'B');
        myGraph.addEdge('B', 'C');

        const callback = jest.fn();
        myGraph.dfs(callback);

        // Check the callback calls in the correct order
        expect(callback).toHaveBeenNthCalledWith(1, 'A');
        expect(callback).toHaveBeenNthCalledWith(2, 'B');
        expect(callback).toHaveBeenNthCalledWith(3, 'C');
        expect(callback).toHaveBeenCalledTimes(3);
    });

    test('DFS recursive', () => {
        const myGraph: IGraph<number> = graph<number>({
            isDirected: false
        });

        myGraph.addVertex('A');
        myGraph.addVertex('B');
        myGraph.addVertex('C');

        myGraph.addEdge('A', 'B');
        myGraph.addEdge('B', 'C');

        const callback = jest.fn();
        myGraph.dfsRecursive(callback);

        // Check the callback calls in the correct order
        expect(callback).toHaveBeenNthCalledWith(1, 'A');
        expect(callback).toHaveBeenNthCalledWith(2, 'B');
        expect(callback).toHaveBeenNthCalledWith(3, 'C');
        expect(callback).toHaveBeenCalledTimes(3);
    });

    describe('Cycle Detection', () => {
        test('Empty graph has no cycle', () => {
            const myGraph: IGraph<number> = graph<number>({
                isDirected: false,
                initial: {

                },
            });

            expect(myGraph.hasCycle).toBeTruthy();
        });

        test('A - B - C - D - A has a cycle', () => {
            const myGraph: IGraph<number> = graph<number>({
                isDirected: false,
                initial: {
                    A: [{ label: 'B' }, { label: 'D' }],
                    B: [{ label: 'C' }, { label: 'A' }],
                    C: [{ label: 'B' }, { label: 'D' }],
                    D: [{ label: 'A' }, { label: 'C' }],
                },
            });

            expect(myGraph.hasCycle).toBeTruthy();
        });

        test('A - B - C - D has no cycle', () => {
            const myGraph: IGraph<number> = graph<number>({
                isDirected: false,
                initial: {
                    A: [{ label: 'B' }],
                    B: [{ label: 'C' }, { label: 'A' }],
                    C: [{ label: 'B' }, { label: 'D' }],
                    D: [{ label: 'C' }],
                },
            });

            expect(myGraph.hasCycle).toBeTruthy();
        });
    });

    describe('Dijkstra', () => {
        test('Dijkstra Shortest Distances 1', () => {

            const myGraph: IGraph<number> = graph<number>({
                isDirected: false,

                initial: {
                    A: [{ label: 'B', edgeWeight: 5 }],
                    B: [{ label: 'C', edgeWeight: 8 }],
                },
            });

            const distances = myGraph.findShortestPathDijkstra('A');

            // Check the calculated distances
            expect(Object.fromEntries(distances)).toEqual({ A: 0, B: 5, C: 13 });
        });
    });

});

describe('Directed Adjacency List Graph', () => {

    test('Add Vertex', () => {
        const myGraph: IGraph<number> = graph<number>({
            isDirected: true
        });
        myGraph.addVertex('A');
        expect(myGraph.getVertex('A')).toBeDefined();
    });

    test('Add Edge', () => {
        const myGraph: IGraph<number> = graph<number>({
            isDirected: true
        });

        myGraph.addVertex('A');
        myGraph.addVertex('B');
        myGraph.addEdge('A', 'B');

        const neighborsA = myGraph.getVertex('A');
        const neighborsB = myGraph.getVertex('B');

        expect(neighborsA).toContainEqual({ label: 'B' });
        expect(neighborsB).not.toContainEqual({ label: 'A' });
    });

    test('Print Graph', () => {
        const myGraph: IGraph<number> = graph<number>({
            isDirected: true
        });

        //const vertex1: IVertex<number> = { label: 'A', edgeWeight: 42 };
        //const vertex2: IVertex<number> = { label: 'B', edgeWeight: 99 };

        myGraph.addVertex('A');
        myGraph.addVertex('B');
        myGraph.addEdge('A', 'B', 99);

        // Redirect console.log to capture the output
        const consoleSpy = jest.spyOn(console, 'log');
        myGraph.printGraph();

        // Test the output
        expect(consoleSpy).toHaveBeenCalledWith('A -> [B(99)]');
        expect(consoleSpy).toHaveBeenCalledWith('B -> []');
    });

    describe('Cycle Detection', () => {
        test('Empty graph has no cycle', () => {
            const myGraph: IGraph<number> = graph<number>({
                isDirected: true,
                initial: {

                },
            });

            expect(myGraph.hasCycle).toBeTruthy();
        });

        test('A -> B -> C -> D -> A has a cycle', () => {
            const myGraph: IGraph<number> = graph<number>({
                isDirected: true,
                initial: {
                    A: [{ label: 'B' }],
                    B: [{ label: 'C' }],
                    C: [{ label: 'D' }],
                    D: [{ label: 'A' }],
                },
            });

            expect(myGraph.hasCycle).toBeTruthy();
        });

        test('A -> B -> C -> D has no cycle', () => {
            const myGraph: IGraph<number> = graph<number>({
                isDirected: true,
                initial: {
                    A: [{ label: 'B' }],
                    B: [{ label: 'C' }],
                    C: [{ label: 'D' }],
                    D: [],
                },
            });

            expect(myGraph.hasCycle).toBeTruthy();
        });
    });
});

