class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.rigth = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // helper method which creates a new node to  be inserted and calls insertNode
    insert(value) {
        let newNode = new TreeNode(value);

        // check if there is root
        if (!this.root) {
            this.root = newNode;
        } else {
            // find the correct position in the tree and add the node
            this.insertNode(this.root, newNode);
        }
    }


    // Method to insert a node in a tree
    // it moves over the tree to find the location
    // to insert a node with a given value 
    insertNode(parent, child) {

        // if the child value is LESS than the parent value move LEFT of the tree
        if (child.value < parent.value) {

            // if left is null insert node here
            if (parent.left === null) {
                parent.left = child;
            } else {
                // if left is not null recur until null is found
                this.insertNode(parent.left, child);
            }


            // if the child value is MORE than the parent value move RIGTH of the tree
        } else {

            if (parent.rigth === null) {
                parent.rigth = child;
            } else {
                this.insertNode(parent.rigth, child);
            }
        }
    }

    remove(value) {
        this.root = this.removeNode(this.root, value);
    }

    removeNode(node, removeValue) {
        if (node === null) {
            return null;

            // if value to be delete is LESS than roots value then move to LEFT subtree
        } else if (removeValue < node.value) {
            node.left = this.removeNode(node.left, removeValue);
            return node;

            // if value to be delete is MORE than roots value then move to RIGTH subtree
        } else if (removeValue > node.value) {
            node.rigth = this.removeNode(node.rigth, removeValue);
            return node;

            // if value is similar to the root's value then delete this node
        } else {

            // deleting node with NO children
            if (!node.left && !node.rigth) {
                node = null;
                return node;
            }

            // deleting node with ONE children
            if (!node.left) {
                node = node.rigth;
                return node;

            } else if (!node.rigth) {
                node = node.left;
                return node;
            }

            // deleting node with TWO children
            // minimum node of the right subtree is stored in aux
            let aux = this.findMinNode(node.rigth);
            node.value = aux.value;

            node.rigth = this.removeNode(node.rigth, aux.value);
            return node;
        }
    }

    // Traversals
    inorder(node) {
        if (node !== null) {
            this.inorder(node.left);
            console.log(node.value);
            this.inorder(node.rigth);
        }
    }

    preorder(node) {
        if (node !== null) {
            console.log(node.value);
            this.inorder(node.left);
            this.inorder(node.rigth);
        }
    }

    postorder(node) {
        if (node !== null) {
            this.inorder(node.left);
            this.inorder(node.rigth);
            console.log(node.value);
        }
    }

    // Helper Methods

    //  finds the minimum node in tree. Searching starts from given node
    findMinNode(node) {
        // if left of a node is null then it must be minimum node
        if (node.left === null) {
            return node;
        } else {
            return this.findMinNode(node.left);
        }
    }


    // search for a node with given value
    search(node, value) {
        if (node === null) {
            return null;

        } else if (value < node.value) {
            return this.search(node.left, value);

        } else if (value > node.value) {
            return this.search(node.rigth, value);

            // if value is equal to the node value return node
        } else {
            return node;
        }
    }

    getRootNode() {
        return this.root;
    }

}

// create an object for the BinarySearchTree
var BST = new BinarySearchTree();

// Inserting nodes to the BinarySearchTree
BST.insert(15);
BST.insert(25);
BST.insert(10);
BST.insert(7);
BST.insert(22);
BST.insert(17);
BST.insert(13);
BST.insert(5);
BST.insert(9);
BST.insert(27);

//          15
//         /  \
//        10   25
//       / \   / \
//      7  13 22  27
//     / \    /
//    5   9  17 

var root = BST.getRootNode();


// prints 5 7 9 10 13 15 17 22 25 27
// BST.inorder(root);


// Removing node with no children 
BST.remove(5);

//          15
//         /  \
//        10   25
//       / \   / \
//      7  13 22  27
//       \    /
//        9  17 

// prints 7 9 10 13 15 17 22 25 27

// Removing node with one child 
BST.remove(7);

//          15
//         /  \
//        10   25
//       / \   / \
//      9  13 22  27
//            /
//           17 

// prints 9 10 13 15 17 22 25 27

BST.inorder(root);

console.log("postorder traversal");
BST.postorder(root);
console.log("preorder traversal");
BST.preorder(root);
