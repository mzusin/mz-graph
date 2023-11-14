import { AdjacencyList, AdjacencyMatrix, IGraph, IMatrix, INode } from '../interfaces';

/**
 * Adjacency List Representation
 */
export const graph = <T>(isDirected: boolean) : IGraph<T> => {
    const adjacencyList: AdjacencyList<T> = new Map();

    const addVertex = (vertex: INode<T>) => {
        if(adjacencyList.has(vertex.label)) return;
        adjacencyList.set(vertex.label, []);
    };

    const getVertex = (label: string|number) : INode<T>[]|null => {
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
     * DFS - inorder - recursive
     */
    const inorderRecursive = (callback: (label: string|number) => void) : void => {
        const visited: Set<string|number> = new Set();

        const traverse = (label: string|number) => {
            if(visited.has(label)) return;
            visited.add(label);

            const neighbors = getVertex(label);
            if(!neighbors) return;

            for (const neighbor of neighbors) {
                traverse(neighbor.label);
            }

            callback(label);
        };

        const labels = adjacencyList.keys();
        for(const label of labels) {
            traverse(label);
        }
    };

    /**
     * DFS - preorder - recursive
     */
    const preorderRecursive = (callback: (label: string|number) => void) : void => {
        const visited: Set<string|number> = new Set();

        const traverse = (label: string|number) => {
            if(visited.has(label)) return;
            visited.add(label);

            callback(label);

            const neighbors = getVertex(label);
            if(!neighbors) return;

            for (const neighbor of neighbors) {
                traverse(neighbor.label);
            }
        };

        const labels = adjacencyList.keys();
        for(const label of labels) {
            traverse(label);
        }
    };

    /**
     * DFS - postorder - recursive
     * TODO
     */
    const postorderRecursive = (callback: (label: string|number) => void) : void => {
        const visited: Set<string|number> = new Set();

        const traverse = (label: string|number) => {
            if(visited.has(label)) return;
            visited.add(label);

            const neighbors = getVertex(label);
            if(!neighbors) return;

            for (const neighbor of neighbors) {
                traverse(neighbor.label);
            }

            callback(label);
        };

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

        inorderRecursive,
        preorderRecursive,
        postorderRecursive,
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

    const addEdge = (source: string|number, destination: string|number, weight: T) => {
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
