// Construct Complete Binary Tree from its Linked List Representation

// JavaScript program to create complete
// Binary Tree from its Linked List representation


// A linked list node
class ListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// A binary tree node
class BinaryTreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.head = null;
        this.root = null;
    }

    // Function to insert a node at
    // the beginning of the Linked List
    addFirst(data) {
        let newNode = new ListNode(data);

        // link the old list of the new node
        newNode.next = this.head;

        // move the head to point to the new node
        this.head = newNode;
    }

    // convert a given linked list representing a complete binary tree 
    // into the linked representation of binary tree.
    convertListToBinaryTree(node) {
        let queue = [];       // queue to store the parent nodes

        // Base Case
        if (this.head == null) return node = null;


        // 1. First node is always the root node. add it to the queue
        node = new BinaryTreeNode(this.head.data);
        queue.push(node);

        // advance the pointer to the next node
        this.head = this.head.next;

        // until the end of linked list is reached do the following steps
        while (this.head != null) {

            // 2. take the parent node from the queue and remove it from queue 
            let parent = queue.shift();

            // 3. take next two nodes from the linked list.
            // We will add them as children of the current
            // parent node in step 2.b. Push them into the
            // queue so that they will be parents to the
            // future nodes
            let leftChild;
            let rightChild;

            leftChild = new BinaryTreeNode(this.head.data);
            queue.push(leftChild);
            this.head = this.head.next;

            if (this.head != null) {
                rightChild = new BinaryTreeNode(this.head.data);
                queue.push(rightChild);
                this.head = this.head.next;
            }

            // 4. assign the left and right children of the parent
            parent.left = leftChild;
            parent.right = rightChild;
        }

        return node;

    }


    inorderTraversal(node) {
        if (node != null) {
            this.inorderTraversal(node.left);
            console.log(node.data + " ");
            this.inorderTraversal(node.right);
        }
    }

}


let tree = new BinaryTree();

/* Last node of Linked List */
tree.addFirst(36);
tree.addFirst(30);
tree.addFirst(25);
tree.addFirst(15);
tree.addFirst(12);

/* First node of Linked List */
tree.addFirst(10);
let node = tree.convertListToBinaryTree(tree.root);

console.log(
    "Inorder Traversal of the Binary Tree is:\n"
);
tree.inorderTraversal(node);