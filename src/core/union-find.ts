/**
 * The Union-Find (Disjoint Set Union, DSU)
 * is a way to handle groups of items that don't overlap.
 *
 * Usage:
 * ------
 * - connectivity in networks
 * - such as finding connected components
 * - detecting cycles in graphs
 * - managing groups of elements and figuring out if they're in the same group or not.
 */
export interface IUnionFind {
    union: (node1: number, node2: number) => boolean;
    find: (node: number) => number;
}

export const unionFind = (size: number) : IUnionFind => {

    // Space complexity is O(N).

    // For size = 5 ---->
    // arr = [0, 1, 2, 3, 4]
    // For each i, parent[i] is the root.
    // So each "i" is its own group.
    const parent: number[] = [];

    // For size = 5 ---->
    // arr = [1, 1, 1, 1, 1]
    // It's used to keep track of the tree depth.
    const rank: number[] = [];

    const init = () => {
        for(let i=0; i<size; i++) {
            parent.push(i);
            rank.push(1);
        }
    };
    init();

    /**
     * Determine which subset a particular element is in.
     * This can be used for determining
     * if two elements are in the same subset.
     *
     * Returns the top-level leader (the root) of that group
     * for every element of this group.
     *
     * The find operation with path compression has an almost constant time complexity.
     * Specifically, the amortized time complexity is
     * 𝑂(𝛼(𝑁)), where 𝛼 is the inverse Ackermann function.
     * The inverse Ackermann function grows extremely slowly,
     * making it nearly constant for all practical purposes.
     */
    const find = (node: number) : number => {

        // Parent of the root is itself.
        if (parent[node] !== node) { // we not yet reached the root of the tree.
            parent[node] = find(parent[node]);
        }

        return parent[node];
    };

    /**
     * It merges two groups into one.
     * When you union two elements, say 1 and 2, you merge their groups.
     * If they’re already in the same group, nothing changes.
     * If not, the smaller group joins the larger one.
     *
     * Union Operation: The union operation, which includes the find operation,
     * also has an amortized time complexity of 𝑂(𝛼(𝑁)).
     */
    const union = (node1: number, node2: number) : boolean => {
        const root1 = find(node1);
        const root2 = find(node2);

        if (root1 !== root2) {
            // Union by rank to keep tree shallow
            if (rank[root1] > rank[root2]) {

                // Group 1 is bigger than group 2 --->
                // so make group 2 to be a child of group 1.
                parent[root2] = root1;
            }
            else {
                if (rank[root1] < rank[root2]) {

                    // Group 2 is bigger than group 1 --->
                    // so make group 1 to be a child of group 2.
                    parent[root1] = root2;
                }
                else {

                    // Groups has the same size.
                    // Make group 2 to be a child of group 1.
                    parent[root2] = root1;

                    // Update tree depth.
                    rank[root1] += 1;
                }
            }

            return true;
        }

        return false;
    };

    return {
        union,
        find,
    };
};