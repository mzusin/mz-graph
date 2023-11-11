import { graph } from '../src/core/main';
import { IGraph, INode } from '../src/interfaces';

describe('Undirected Graph', () => {

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
});

describe('Directed Graph', () => {

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
