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

    /*
    Тут используется **queue**, как и во всех BFS. Только в нем хранится пара значений \[i, j\], а не одно.
2.  Начинаем с первой клетки \[0, 0\] добавляя ее в queue
3.  Также есть **visited** array, который тоже хранит пары значений - вероятно, тоже 2х-мерный
4.  Также нужна helper функция isValid, которая будет проверят, находится ли индекс в пределах массива, а также visited или нет
5.  Как обычно, запускаем цикл пока очередь не пустая
6.  Как обычно, вынимаем первый элемент очереди (**shift**)
7.  Добавляем этот элемент в массив visited.
8.  Находим всех unvisited kids и добавляем их в очередь - при этом мы берем 4 смежные клетки если есть (слева, справа, сверху и снизу)
     */

    /**
     * BFS (Breadth First Search)
     * Generally BFS is not implemented in graphs using recursion; this is something not standard.
     * Time Complexity O(N * M)
     * Space Complexity O(N * M)

    const bfs = () => {
        const queue: [number, number][] = [[0, 0]];
    };*/

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
    };
};
