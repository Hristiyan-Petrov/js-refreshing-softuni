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

    insert(data) {
        if (this.root === null) {
            this.root = new Node(data);
        } else {
            const node = this.root;

            const searchTree = node => {
                if (data < node.value && node.left !== null) {
                    searchTree(node.left);
                } else if (data < node.value) {
                    node.left = new Node(data);
                } else if (data > node.value && node.right !== null) {
                    searchTree(node.right);
                } else if (data > node.value) {
                    node.right = new Node(data);
                }
            };

            return searchTree(node);
        }
    }

    find(data) {
        if (this.root === null) return false;

        let node = this.root;
        let found = false;

        while (node && !found) {
            if (data < node.value) {
                node = node.left;
            } else if (data > node.value) {
                node = node.left;
            } else {
                found = node;
            }
        }
        return found;
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

    dfsPreorderIterative() {
        let stack = [this.root];
        let traversed = [];
        let curr;

        // nodes are pushed when the the left and right child are not null
        // the stack will be empty when the tree has been completely traversed
        while (stack.length) {
            curr = stack.pop();
            traversed.push(curr.value);

            // pushed right then left so the popped order is left then right
            if (curr.right) stack.push(curr.right);
            if (curr.left) stack.push(curr.left);
        }

        console.log(traversed);
    }

    dfsInOrderIterative() {
        const stack = [],
        traversed = [];
        let curr = this.root;
    
        while(stack.length || curr){
            while(curr) {
                stack.push(curr);
                curr = curr.left;
            }
            curr = stack.pop()
            traversed.push(curr.value)
            curr = curr.right;        
        }
    
        console.log(traversed);
    }

    dfsPostorderIterative() {  
        const s1 = [this.root],
        s2 = [],
        traversed = [];
        let curr;
   
        while (s1.length) {
            curr = s1.pop();
            if (curr.left) s1.push(curr.left);
            if (curr.right) s1.push(curr.right);
            s2.push(curr);
        }
   
        while (s2.length) {
            curr = s2.pop();
            traversed.push(curr.value);
        }
   
        console.log(traversed);
   }
}

const bst = new BinarySearchTree();
bst.insert(27);
bst.insert(14);
bst.insert(10);
bst.insert(19);
bst.insert(35);
bst.insert(31);
bst.insert(42);
bst.dfsPreorderIterative();
bst.dfsInOrderIterative();
bst.dfsPostorderIterative();