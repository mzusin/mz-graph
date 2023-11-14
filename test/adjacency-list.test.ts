import { graph } from '../src/core/main';
import { IGraph, INode } from '../src/interfaces';

describe('Undirected Adjacency List Graph', () => {

    test('Add Vertex', () => {
        const myGraph: IGraph<number> = graph<number>(false);
        const vertex: INode<number> = { label: 'A', value: 42 };
        myGraph.addVertex(vertex);
        expect(myGraph.getVertex('A')).toBeDefined();
    });

    test('Add Edge', () => {
        const myGraph: IGraph<number> = graph<number>(false);

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
        const myGraph: IGraph<number> = graph<number>(false);

        const vertex1: INode<number> = { label: 'A', value: 42 };
        const vertex2: INode<number> = { label: 'B', value: 99 };

        myGraph.addVertex(vertex1);
        myGraph.addVertex(vertex2);
        myGraph.addEdge(vertex1, vertex2);

        // Redirect console.log to capture the output
        const consoleSpy = jest.spyOn(console, 'log');
        myGraph.printGraph();

        // Test the output
        expect(consoleSpy).toHaveBeenCalledWith('A -> [B]');
        expect(consoleSpy).toHaveBeenCalledWith('B -> [A]');
    });

    test('BFS', () => {
        const myGraph: IGraph<number> = graph<number>(false);

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
        myGraph.bfs('A', callback);

        // Check the callback calls in the correct order
        expect(callback).toHaveBeenNthCalledWith(1, 'A');
        expect(callback).toHaveBeenNthCalledWith(2, 'B');
        expect(callback).toHaveBeenNthCalledWith(3, 'C');
        expect(callback).toHaveBeenNthCalledWith(4, 'D');
        expect(callback).toHaveBeenCalledTimes(4);
    });

    test('Inorder Recursive', () => {
        const myGraph: IGraph<number> = graph<number>(false);

        const vertexA: INode<number> = { label: 'A', value: 42 };
        const vertexB: INode<number> = { label: 'B', value: 99 };
        const vertexC: INode<number> = { label: 'C', value: 77 };

        myGraph.addVertex(vertexA);
        myGraph.addVertex(vertexB);
        myGraph.addVertex(vertexC);

        myGraph.addEdge(vertexA, vertexB);
        myGraph.addEdge(vertexB, vertexC);

        const callback = jest.fn();
        myGraph.inorderRecursive(callback);

        // Check the callback calls in the correct order
        expect(callback).toHaveBeenNthCalledWith(1, 'C');
        expect(callback).toHaveBeenNthCalledWith(2, 'B');
        expect(callback).toHaveBeenNthCalledWith(3, 'A');
        expect(callback).toHaveBeenCalledTimes(3);
    });

    test('Preoder Recursive', () => {
        const myGraph: IGraph<number> = graph<number>(false);

        const vertexA: INode<number> = { label: 'A', value: 42 };
        const vertexB: INode<number> = { label: 'B', value: 99 };
        const vertexC: INode<number> = { label: 'C', value: 77 };

        myGraph.addVertex(vertexA);
        myGraph.addVertex(vertexB);
        myGraph.addVertex(vertexC);

        myGraph.addEdge(vertexA, vertexB);
        myGraph.addEdge(vertexB, vertexC);

        const callback = jest.fn();
        myGraph.preorderRecursive(callback);

        // Check the callback calls in the correct order
        expect(callback).toHaveBeenNthCalledWith(1, 'A');
        expect(callback).toHaveBeenNthCalledWith(2, 'B');
        expect(callback).toHaveBeenNthCalledWith(3, 'C');
        expect(callback).toHaveBeenCalledTimes(3);
    });

    test('Postorder Recursive', () => {
        const myGraph: IGraph<number> = graph<number>(false);

        const vertexA: INode<number> = { label: 'A', value: 42 };
        const vertexB: INode<number> = { label: 'B', value: 99 };
        const vertexC: INode<number> = { label: 'C', value: 77 };

        myGraph.addVertex(vertexA);
        myGraph.addVertex(vertexB);
        myGraph.addVertex(vertexC);

        myGraph.addEdge(vertexA, vertexB);
        myGraph.addEdge(vertexB, vertexC);

        const callback = jest.fn();
        myGraph.postorderRecursive(callback);

        // Check the callback calls in the correct order
        expect(callback).toHaveBeenNthCalledWith(1, 'C');
        expect(callback).toHaveBeenNthCalledWith(2, 'B');
        expect(callback).toHaveBeenNthCalledWith(3, 'A');
        expect(callback).toHaveBeenCalledTimes(3);
    });

    test('Inorder recursive for empty graph', () => {
        const myGraph: IGraph<number> = graph<number>(false);

        const callback = jest.fn();
        myGraph.inorderRecursive(callback);

        expect(callback).not.toHaveBeenCalled();
    });
});

describe('Directed Adjacency List Graph', () => {

    test('Add Vertex', () => {
        const myGraph: IGraph<number> = graph<number>(true);
        const vertex: INode<number> = { label: 'A', value: 42 };
        myGraph.addVertex(vertex);
        expect(myGraph.getVertex('A')).toBeDefined();
    });

    test('Add Edge', () => {
        const myGraph: IGraph<number> = graph<number>(true);

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
        const myGraph: IGraph<number> = graph<number>(true);

        const vertex1: INode<number> = { label: 'A', value: 42 };
        const vertex2: INode<number> = { label: 'B', value: 99 };

        myGraph.addVertex(vertex1);
        myGraph.addVertex(vertex2);
        myGraph.addEdge(vertex1, vertex2);

        // Redirect console.log to capture the output
        const consoleSpy = jest.spyOn(console, 'log');
        myGraph.printGraph();

        // Test the output
        expect(consoleSpy).toHaveBeenCalledWith('A -> [B]');
        expect(consoleSpy).toHaveBeenCalledWith('B -> []');
    });
});
