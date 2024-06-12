class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    breadthFirstSearch() {

        if (!this.root) return console.log('Cannot traverse emprty tree.');

        let queue = [];
        let result = [];
        let currentNode;

        queue.push(this.root);

        while (queue.length) {

            // dequeue a node from the queue 
            currentNode = queue.shift();

            // push the visited node into the result
            result.push(currentNode);

            // push children to the queue
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        console.log(result);
    }
}