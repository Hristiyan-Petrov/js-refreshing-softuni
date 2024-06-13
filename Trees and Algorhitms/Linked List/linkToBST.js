// Sorted Linked List to Balanced BST

// Method 1 (Simple)

// Steps:
// 1) Get the Middle of the linked list and make it root.
// 2) Recursively do same for the left half and right half.
//        a) Get the middle of the left half and make it left child of the root
//           created in step 1.
//        b) Get the middle of right half and make it the right child of the
//           root created in step 1.

// Time complexity: O(nLogn) where n is the number of nodes in Linked List.


// Method 2 (Tricky):
// Method 1 constructs the tree from root to leaves. In this method, we construct from leaves to root. The idea is to insert nodes in BST in the same order as they appear in Linked List so that the tree can be constructed in O(n) time complexity. We first count the number of nodes in the given Linked List. Let the count be n. After counting nodes, we take left n/2 nodes and recursively construct the left subtree. After left subtree is constructed, we allocate memory for root and link the left subtree with root. Finally, we recursively construct the right subtree and link it with root.
// While constructing the BST, we also keep moving the list head pointer to next so that we have the appropriate pointer in each recursive call.
// Time Complexity: O(n)

let head;

class ListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

/* A Binary Tree Node */
class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

/* This function counts the number
of nodes in Linked List and then calls
  sortedListToBSTRecur() to construct BST */
function sortedListToBST() {

    /*Count the number of nodes in Linked List */
    let n = countNodes(head);

    /* Construct BST */
    return sortedListToBSTRecur(n);
}

/* The main function that constructs
 balanced BST and returns root of it.
n --> No. of nodes in the Doubly Linked List */
function sortedListToBSTRecur(n) {
    /* Base Case */
    if (n <= 0) return null;

    /* Recursively construct the left subtree */
    let left = sortedListToBSTRecur(parseInt(n / 2));

    /* head_ref now refers to middle node, 
    make middle node as root of BST*/
    let root = new TreeNode(head.data);

    // Set pointer to left subtree
    root.left = left;

    /* Change head pointer of Linked List
     for parent recursive calls */
    head = head.next;

    /* Recursively construct the 
     right subtree and link it 
    with root. The number of 
    nodes in right subtree is 
    total nodes - nodes in left
    subtree - 1 (for root) */
    root.right = sortedListToBSTRecur(n - parseInt(n / 2) - 1);
    return root;
}


function countNodes(head) {
    let count = 0;
    let temp = head;
    while (temp != null) {
        temp = temp.next;
        count++;
    }
    return count;
}

/* Function to insert a node at the beginning of 
the Doubly Linked List */
function add(data) {
    /* allocate node */
    var node = new ListNode(data);

    /* since we are adding at the beginning,
    prev is always NULL */

    node.prev = null;
    /* link the old list of the new node */

    node.next = head;
    /* change prev of head node to new node */

    if (head != null)
        head.prev = node;

    /* move the head to point to the new node */
    head = node;
}

/* Function to print nodes in a given linked list */
function printList(node) {
    while (node != null) {
        console.log(node.data + " ");
        node = node.next;
    }
}


function preOrder(node) {
    if (node == null)
        return;
    console.log(node.data + " ");
    preOrder(node.left);
    preOrder(node.right);
}


// create a sorted 
// linked list to test the functions
// Created linked list will be 
// 7->6->5->4->3->2->1 */
add(7);
add(6);
add(5);
add(4);
add(3);
add(2);
add(1);
console.log("Given Linked List ");
printList(head);
/* Convert List to BST */
let root = sortedListToBST();
console.log("\n");
console.log("preOrder Traversal of constructed BST ");
preOrder(root);