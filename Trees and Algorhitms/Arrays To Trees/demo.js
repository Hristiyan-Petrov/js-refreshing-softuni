var sortedListToBST = function (head) {

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

        let left = sortedListToBSTRecur(list, start, mid - 1);

        let root = new TreeNode(list[mid]);
        root.left = left;
        root.right = sortedListToBSTRecur(list, mid + 1, end);
        return root;
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

    let bstRoot = sortedListToBSTRecur(head, 0, head.length - 1);
    return bfs(bstRoot);
};


console.log(sortedListToBST([-10, -3, 0, 5, 9]));