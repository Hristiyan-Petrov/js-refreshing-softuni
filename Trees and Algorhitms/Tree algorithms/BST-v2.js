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
}