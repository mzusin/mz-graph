import {
    AdjacencyMatrix,
    IMatrix,
    IAdjacencyMatrixOptions
} from '../interfaces';

const getCount = <T>(options: IAdjacencyMatrixOptions<T>) => {
    if(options.initial) {
        const rowsCount = options.initial.length;
        const columnsCount = rowsCount > 0 ? options.initial[0].length : 0;
        return [rowsCount, columnsCount];
    }

    return [
        options.rowsCount ?? 0,
        options.columnsCount ?? 0,
    ]
};

/**
 * Adjacency Matrix Representation
 */
export const matrix = <T>(options: IAdjacencyMatrixOptions<T>) : IMatrix<T> => {

    const [rowsCount, columnsCount] = getCount(options);

    let adjacencyMatrix: AdjacencyMatrix<T> = Array(rowsCount);

    const getMatrix = () => {
        return adjacencyMatrix;
    };

    const addEdge = (source: number, destination: number, weight: T) => {
        // @ts-ignore
        adjacencyMatrix[source][destination] = weight;

        if(!options.isDirected) {
            // @ts-ignore
            adjacencyMatrix[destination][source] = weight;
        }
    };

    const printGraph = () => {
        for (let r = 0; r < rowsCount; r++) {
            console.log(adjacencyMatrix[r].map(value => ((value === null || value === undefined) ? '-' : value)).join(' '));
        }
    };

    /**
     * BFS (Breadth First Search)
     * Generally BFS is not implemented in graphs using recursion; this is something not standard.
     * Time Complexity O(N * M)
     * Space Complexity O(N * M)
     */
    const bfs = (callback: (row: number, col: number, value: T) => void) => {

        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        const queue: [number, number][] = [[0, 0]];
        const visited: boolean[][] = [];

        for(let r=0; r<rowsCount; r++) {
            visited[r] = [];
        }

        const isValid = (r: number, c: number) => {
            return  r >= 0 &&
                r < rowsCount &&
                c >= 0 &&
                c < columnsCount &&
                !visited[r][c];
        };

        while(queue.length > 0){
            const [r, c] = queue.shift() as [number, number];
            if(visited[r][c]) continue;

            visited[r][c] = true;

            callback(r, c, adjacencyMatrix[r][c]);

            for(let i=0; i<directions.length; i++){

                const [dr, dc] = directions[i];
                const newR = r + dr;
                const newC = c + dc;

                if(!isValid(newR, newC)) continue;
                queue.push([newR, newC]);
            }
        }
    };

    /**
     * Entry Point.
     */
    (() => {
        if(options.initial) {
            adjacencyMatrix = options.initial;
            return;
        }

        // If no initial value is defined ---> init an empty array.
        for(let r=0; r<rowsCount; r++) {
            adjacencyMatrix[r] = Array(columnsCount);

            if(options.defaultValue !== undefined) {
                adjacencyMatrix[r].fill(options.defaultValue);
            }
        }
    })();

    return {
        getMatrix,
        addEdge,
        printGraph,
        bfs,
    };
};
