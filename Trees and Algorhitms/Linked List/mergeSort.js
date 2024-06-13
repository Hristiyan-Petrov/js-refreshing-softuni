/* Node class for linked list */
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

/* Function to merge two sorted linked lists */
function sortedMerge(a, b) {
    let result = null;
    /* Base cases */
    if (a == null) {
        return b;
    } else if (b == null) {
        return a;
    }
    /* Pick either a or b, and recur */
    if (a.data <= b.data) {
        result = a;
        result.next = sortedMerge(a.next, b);
    } else {
        result = b;
        result.next = sortedMerge(a, b.next);
    }
    return result;
}

/* Function to split the linked list into two halves */
function frontBackSplit(source) {
    let fast = source.next;
    let slow = source;

    /* Advance 'fast' two nodes, and advance 'slow' one node */
    while (fast != null) {
        fast = fast.next;
        if (fast != null) {
            slow = slow.next;
            fast = fast.next;
        }
    }

    /* 'slow' is before the midpoint in the list, so split it in two at that point. */
    const frontRef = source;
    const backRef = slow.next;
    slow.next = null;

    return { frontRef, backRef };
}

/* Function to perform merge sort on linked list */
function mergeSort(headRef) {
    let head = headRef;
    let a, b;

    /* Base case -- length 0 or 1 */
    if (head == null || head.next == null) {
        return head;
    }

    /* Split head into 'a' and 'b' sublists */
    const { frontRef, backRef } = frontBackSplit(head);

    /* Recursively sort the sublists */
    a = mergeSort(frontRef);
    b = mergeSort(backRef);

    /* Merge the two sorted lists */
    return sortedMerge(a, b);
}

/* Function to print the linked list */
function printList(node) {
    while (node != null) {
        console.log(node.data + " ");
        node = node.next;
    }
}

/* Driver program to test above functions */
function main() {
    /* Start with the empty list */
    let res = null;
    let a = null;

    /* Let us create an unsorted linked list to test the functions */
    a = new Node(15);
    a.next = new Node(10);
    a.next.next = new Node(5);
    a.next.next.next = new Node(20);
    a.next.next.next.next = new Node(3);
    a.next.next.next.next.next = new Node(2);

    /* Sort the above created linked list */
    a = mergeSort(a);

    console.log("Sorted Linked List is:");
    printList(a);
}

/* Invoke the main function */
main();
