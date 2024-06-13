// Sort Linked List using Insertion Sort 

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}


class LinkedlistIS {
    constructor() {
        this.head = null;
        this.sorted = null;
    }

    push(val) {
        // allocate node
        const newnode = new Node(val);
        // link the old list of the new node
        newnode.next = this.head;
        // move the head to point to the new node
        this.head = newnode;
    }

    // function to sort a singly linked list using insertion sort
    insertionSort(headRef) {
        // Initialize sorted linked list
        this.sorted = null;
        let current = headRef;

        // Traverse the given linked list and insert every
        // node to sorted
        while (current !== null) {
            // Store next for next iteration
            const next = current.next;

            // insert current in sorted linked list
            this.sortedInsert(current);

            // Update current
            current = next;
        }
        
        // Update head_ref to point to sorted linked list
        this.head = this.sorted;
    }

    /*
     * function to insert a new_node in a list. Note that
     * this function expects a pointer to head_ref as this
     * can modify the head of the input linked list
     * (similar to push())
     */
    sortedInsert(newnode) {
        /* Special case for the head end */
        if (this.sorted === null || this.sorted.val >= newnode.val) {
            newnode.next = this.sorted;
            this.sorted = newnode;
        } else {
            let current = this.sorted;
            /* Locate the node before the point of insertion */
            while (current.next !== null && current.next.val < newnode.val) {
                current = current.next;
            }
            newnode.next = current.next;
            current.next = newnode;
        }
    }

    /* Function to print linked list */
    printlist(head) {
        while (head !== null) {
            console.log(head.val + ' ');
            head = head.next;
        }
    }
}

// Driver program to test above functions
const list = new LinkedlistIS();
list.head = null;
list.push(5);
list.push(20);
list.push(4);
list.push(3);
list.push(30);
console.log('Linked List before sorting');
list.printlist(list.head);
console.log('');
list.insertionSort(list.head);
console.log('Linked List After sorting');
list.printlist(list.head);