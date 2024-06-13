// Javascript program to sort Linked List
// using Bubble Sort
// by swapping nodes

// Node class
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Function to swap the nodes
function swap(ptr1, ptr2) {
    let tmp = ptr2.data;
    ptr2.data = ptr1.data;
    ptr1.data = tmp;
}

// Function to sort the list
function bubbleSort(head) {
    let swapped;

    if (head == null)
        return;

    do {
        swapped = false;
        let current = head;

        while (current.next != null) {
            if (current.data > current.next.data) {
                swap(current, current.next);
                swapped = true;
            }
            current = current.next;
        }
    } while (swapped);
}

// Function to print the list
function printList(n) {
    while (n != null) {
        console.log(n.data);
        n = n.next;
    }
    console.log();
}

// Function to insert a Node at the beginning of a linked list
function insertAtTheBegin(start_ref, data) {
    let ptr1 = new Node(data);

    ptr1.next = start_ref;
    start_ref = ptr1;
    return start_ref; // Return the updated start_ref
}

// Driver Code
function main() {
    let arr = [78, 20, 10, 32, 1, 5];
    let list_size, i;

    let start = null;
    list_size = arr.length;

    // Create linked list from the array arr[]
    for (i = list_size - 1; i >= 0; i--)
        start = insertAtTheBegin(start, arr[i]);

    console.log("Linked list before sorting");
    printList(start);

    bubbleSort(start);

    console.log("Linked list after sorting");
    printList(start);
}

main();
