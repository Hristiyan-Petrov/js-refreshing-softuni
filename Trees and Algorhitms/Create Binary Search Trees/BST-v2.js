class Node {
    constructor(value) {
        this.value = value;
        this.left = left;
        this.rigth = rigth;
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
                } else if (data > node.value && node.rigth !== null) {
                    searchTree(node.rigth);
                } else if (data > node.value) {
                    node.rigth = new Node(data);
                }
            };
            
            return searchTree(node);
        }
    }
}