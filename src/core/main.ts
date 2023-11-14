import { AdjacencyList, AdjacencyMatrix, IGraph, IMatrix, INode, Label } from '../interfaces';

/**
 * Adjacency List Representation
 */
export const graph = <T>(isDirected: boolean) : IGraph<T> => {
    const adjacencyList: AdjacencyList<T> = new Map();

    const addVertex = (vertex: INode<T>) => {
        if(adjacencyList.has(vertex.label)) return;
        adjacencyList.set(vertex.label, []);
    };

    const getVertex = (label: Label) : INode<T>[]|null => {
        return adjacencyList.get(label) ?? null;
    };

    const addEdge = (source: INode<T>, destination: INode<T>) => {
        adjacencyList.get(source.label)?.push(destination);

        if(!isDirected) {
            adjacencyList.get(destination.label)?.push(source);
        }
    };

    const printGraph = () => {
        for (const [vertex, neighbors] of adjacencyList.entries()) {
            const neighborString = neighbors.map(neighbor => neighbor.label).join(', ');
            console.log(`${vertex} -> [${neighborString}]`);
        }
    };

    /**
     * BFS (Breadth First Search)
     * Generally BFS is not implemented in graphs using recursion; this is something not standard.
     */
    const bfs = (callback: (label: Label) => void) => {
        const visited: Set<Label> = new Set();

        const traverse = (startLabel: Label) => {

            const queue: (Label)[] = [ startLabel ];
            visited.add(startLabel);

            while (queue.length > 0) {
                const currentLabel = queue.shift() as Label;

                callback(currentLabel);

                const neighbors = getVertex(currentLabel) || [];
                for (const neighbor of neighbors) {
                    if(visited.has(neighbor.label)) continue;

                    visited.add(neighbor.label);
                    queue.push(neighbor.label);
                }
            }
        };

        // handle disconnected nodes
        const labels = adjacencyList.keys();
        for (const label of labels) {
            if(visited.has(label)) continue;
            traverse(label);
        }
    };

    /**
     * DFS (Depth First Search)
     */
    const dfs = (callback: (label: Label) => void) : void => {

        const visited: Set<Label> = new Set();

        const traverse = (startLabel: Label) => {

            const stack: (Label)[] = [ startLabel ];
            visited.add(startLabel);

            while (stack.length > 0) {
                const currentLabel = stack.pop() as Label;

                callback(currentLabel);

                const neighbors = getVertex(currentLabel) || [];
                for (const neighbor of neighbors) {
                    if(visited.has(neighbor.label)) continue;

                    visited.add(neighbor.label);
                    stack.push(neighbor.label);
                }
            }
        };

        // handle disconnected nodes
        const labels = adjacencyList.keys();
        for (const label of labels) {
            if(visited.has(label)) continue;
            traverse(label);
        }
    };

    /**
     * DFS (Depth First Search)
     */
    const dfsRecursive = (callback: (label: Label) => void) : void => {

        const visited: Set<Label> = new Set();

        const traverse = (label: Label) => {
            if(visited.has(label)) return;
            visited.add(label);

            callback(label);

            const neighbors = getVertex(label);
            if(!neighbors) return;

            for (const neighbor of neighbors) {
                traverse(neighbor.label);
            }
        };

        // handle disconnected nodes
        const labels = adjacencyList.keys();
        for(const label of labels) {
            traverse(label);
        }
    };

    return {
        addVertex,
        getVertex,
        addEdge,
        printGraph,

        bfs,
        dfs,
        dfsRecursive,
    };
};

/**
 * Adjacency Matrix Representation
 */
export const matrix = <T>(verticesNumber: number, isDirected: boolean, defaultValue: T|undefined = undefined) : IMatrix<T> => {

    const adjacencyMatrix: AdjacencyMatrix<T> = Array(verticesNumber);

    const getMatrix = () => {
        return adjacencyMatrix;
    };

    const addEdge = (source: Label, destination: Label, weight: T) => {
        // @ts-ignore
        adjacencyMatrix[source][destination] = weight;

        if(!isDirected) {
            // @ts-ignore
            adjacencyMatrix[destination][source] = weight;
        }
    };

    const printGraph = () => {
        for (let r = 0; r < verticesNumber; r++) {
            console.log(adjacencyMatrix[r].map(value => ((value === null || value === undefined) ? '-' : value)).join(' '));
        }
    };

    /**
     * Entry Point.
     */
    (() => {
        for(let r=0; r<verticesNumber; r++) {
            adjacencyMatrix[r] = Array(verticesNumber);

            if(defaultValue !== undefined) {
                adjacencyMatrix[r].fill(defaultValue);
            }
        }
    })();

    return {
        getMatrix,
        addEdge,
        printGraph,
    };
};
