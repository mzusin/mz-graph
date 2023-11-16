import { graph } from '../src/core/adjacency-list';
import { IGraph, INode } from '../src/interfaces';

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
                A: [{ label: 'B', value: 10 }],
                B: [{ label: 'C', value: 20 }],
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
        const vertex: INode<number> = { label: 'A', value: 42 };
        myGraph.addVertex(vertex);
        expect(myGraph.getVertex('A')).toBeDefined();
    });

    test('Add Edge', () => {
        const myGraph: IGraph<number> = graph<number>({
            isDirected: false
        });

        const vertex1: INode<number> = { label: 'A', value: 42 };
        const vertex2: INode<number> = { label: 'B', value: 99 };

        myGraph.addVertex(vertex1);
        myGraph.addVertex(vertex2);
        myGraph.addEdge(vertex1, vertex2);

        const neighborsA = myGraph.getVertex('A');
        const neighborsB = myGraph.getVertex('B');

        expect(neighborsA).toContain(vertex2);
        expect(neighborsB).toContain(vertex1);
    });

    test('Print Graph', () => {
        const myGraph: IGraph<number> = graph<number>({
            isDirected: false
        });

        const vertex1: INode<number> = { label: 'A', value: 42 };
        const vertex2: INode<number> = { label: 'B', value: 99 };

        myGraph.addVertex(vertex1);
        myGraph.addVertex(vertex2);
        myGraph.addEdge(vertex1, vertex2);

        // Redirect console.log to capture the output
        const consoleSpy = jest.spyOn(console, 'log');
        myGraph.printGraph();

        // Test the output
        expect(consoleSpy).toHaveBeenCalledWith('A -> [B(99)]');
        expect(consoleSpy).toHaveBeenCalledWith('B -> [A(42)]');
    });

    test('BFS', () => {
        const myGraph: IGraph<number> = graph<number>({
            isDirected: false
        });

        const vertexA: INode<number> = { label: 'A', value: 42 };
        const vertexB: INode<number> = { label: 'B', value: 99 };
        const vertexC: INode<number> = { label: 'C', value: 77 };
        const vertexD: INode<number> = { label: 'D', value: 55 };

        myGraph.addVertex(vertexA);
        myGraph.addVertex(vertexB);
        myGraph.addVertex(vertexC);
        myGraph.addVertex(vertexD);

        myGraph.addEdge(vertexA, vertexB);
        myGraph.addEdge(vertexA, vertexC);
        myGraph.addEdge(vertexB, vertexD);

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

        const vertexA: INode<number> = { label: 'A', value: 42 };
        const vertexB: INode<number> = { label: 'B', value: 99 };
        const vertexC: INode<number> = { label: 'C', value: 77 };

        myGraph.addVertex(vertexA);
        myGraph.addVertex(vertexB);
        myGraph.addVertex(vertexC);

        myGraph.addEdge(vertexA, vertexB);
        myGraph.addEdge(vertexB, vertexC);

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

        const vertexA: INode<number> = { label: 'A', value: 42 };
        const vertexB: INode<number> = { label: 'B', value: 99 };
        const vertexC: INode<number> = { label: 'C', value: 77 };

        myGraph.addVertex(vertexA);
        myGraph.addVertex(vertexB);
        myGraph.addVertex(vertexC);

        myGraph.addEdge(vertexA, vertexB);
        myGraph.addEdge(vertexB, vertexC);

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

});

describe('Directed Adjacency List Graph', () => {

    test('Add Vertex', () => {
        const myGraph: IGraph<number> = graph<number>({
            isDirected: true
        });
        const vertex: INode<number> = { label: 'A', value: 42 };
        myGraph.addVertex(vertex);
        expect(myGraph.getVertex('A')).toBeDefined();
    });

    test('Add Edge', () => {
        const myGraph: IGraph<number> = graph<number>({
            isDirected: true
        });

        const vertex1: INode<number> = { label: 'A', value: 42 };
        const vertex2: INode<number> = { label: 'B', value: 99 };

        myGraph.addVertex(vertex1);
        myGraph.addVertex(vertex2);
        myGraph.addEdge(vertex1, vertex2);

        const neighborsA = myGraph.getVertex('A');
        const neighborsB = myGraph.getVertex('B');

        expect(neighborsA).toContain(vertex2);
        expect(neighborsB).not.toContain(vertex1);
    });

    test('Print Graph', () => {
        const myGraph: IGraph<number> = graph<number>({
            isDirected: true
        });

        const vertex1: INode<number> = { label: 'A', value: 42 };
        const vertex2: INode<number> = { label: 'B', value: 99 };

        myGraph.addVertex(vertex1);
        myGraph.addVertex(vertex2);
        myGraph.addEdge(vertex1, vertex2);

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
