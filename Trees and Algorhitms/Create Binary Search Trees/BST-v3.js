function TreeNode(val, left, rigth) {
    this.val = val;
    this.left = left;
    this.rigth = rigth;
}

// Recursive Traversals
const inorder = root => {
    let nodes = [];

    if (root) {
        inorder(root.left);
        nodes.push(root.val);
        inorder(root.rigth);
    }

    return nodes;
}

const postorder = root => {
    let nodes = [];

    if (root) {
        inorder(root.left);
        inorder(root.rigth);
        nodes.push(root.val);
    }

    return nodes;
}

const preorder = root => {
    let nodes = [];

    if (root) {
        nodes.push(root.val);
        inorder(root.left);
        inorder(root.rigth);
    }

    return nodes;
}

// Determnine if valid BST
const isValidBST = root => {
    const helper = (node, min, max) => {
        if (!node) return true;

        if (node.val <= min || node.val >= max) return false;

        return helper(node.left, min, node.val) && helper(node.rigth, node.val, max);
    }

    return helper(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
}

// Find Max Depth / Heigth
const maxDepth = root => {

    const calc = node => {
        if (!node) return 0;

        return Math.max(1 + calc(node.left), 1 + calc(node.rigth));
    }

    return calc(root);
}