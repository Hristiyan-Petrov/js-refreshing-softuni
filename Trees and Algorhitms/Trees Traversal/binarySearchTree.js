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
            TreeNode.insertNode(this.root, newNode);
        }
    }


    // Method to insert a node in a tree
    // it moves over the tree to find the location
    // to insert a node with a given value 
    insertNode(parent, child) {

        // if the child value is LESS than the parent value move LEFT of the tree
        if (parent.value < child.value) {

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
}

 // function to be implemented
    // insert(data)
    // remove(data)
                 
 
    // Helper function
    // findMinNode()
    // getRootNode()
    // inorder(node)
    // preorder(node)               
    // postorder(node)
    // search(node, data)