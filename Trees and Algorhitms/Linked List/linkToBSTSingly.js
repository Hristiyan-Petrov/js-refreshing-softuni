// 1) Create an array and store all the elements of linked list.
// 2) Find the middle element of the linked list and set it as root of the tree and call for left array and right array for left and right child.
// 3) Recursively repeat above approach until the start becomes greater than end.
// 4) Print the preorder traversal of created tree.

class ListNode {
    constructor(data, next) {
        this.data = (data === undefined ? 0 : data)
        this.next = (next === undefined ? null : next)
    }
}

class TreeNode {
    constructor(data) {
        this.data = (data === undefined ? 0 : data)
        this.left = null
        this.right = null
    }
}

function sortedListToBSTRecur(list, start, end) {
    if (start > end) return null;

    let mid = Math.floor((start + end + 1) / 2);

    // First construct the left subtree, so as to grab the last node in the mid calculation
    let left = sortedListToBSTRecur(list, start, mid - 1);

    let root = new TreeNode(list[mid]);
    root.left = left;

    // Then construct the right subtree
    root.right = sortedListToBSTRecur(list, mid + 1, end);
    return root;
}

function sortedListToBST(head) {
    let vec = [];
    let temp = head;

    while (temp != null) {
        vec.push(temp.data);
        temp = temp.next;
    }

    return sortedListToBSTRecur(vec, 0, vec.length - 1);
}

function bfs(root) {
    if (!root) return [];
    let res = [];
    let queue = [root];

    while (queue.length) {
        let node = queue.shift();

        if (node) res.push(node.data);
        else {
            res.push(null);
            continue;
        }

        // Enqueue left child
        if (node.left) queue.push(node.left);
        else queue.push(null);

        // Enqueue right child
        if (node.right) queue.push(node.right);
        else queue.push(null);
    }

    // Remove trailing null values from array
    while (res[res.length - 1] === null) {
        res.pop();
    }

    return res;
}

let head = new ListNode(-10);
head.next = new ListNode(-3);
head.next.next = new ListNode(0);
head.next.next.next = new ListNode(5);
head.next.next.next.next = new ListNode(9);

let bstRoot = sortedListToBST(head);
console.log(bfs(bstRoot)); // [0,-3,9,-10,null,5]