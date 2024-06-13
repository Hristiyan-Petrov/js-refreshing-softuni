class Node {
    constructor(val) {
        this.data = val;
        this.next = null;
    }
}

// The main function for quick sort. This is a wrapper over
// recursive function quickSortRecur()
class QuickSortLinkedList {
    constructor() {
        this.head = null;
    }

    addNode(data) {
        if (this.head == null) {
            this.head = new Node(data);
            return;
        }
        let curr = this.head;
        while (curr.next != null) {
            curr = curr.next;
        }
        let newNode = new Node(data);
        curr.next = newNode;
    }

    /* A utility function to print linked list */
    printList(n) {
        while (n != null) {
            console.log(n.data);
            n = n.next;
        }
    }

    // Partitions the list taking the last element as the pivot
    partitionLast(start, end) {
        if (start == end || start == null || end == null) {
            return start;
        }
        let pivotPrev = start;
        let curr = start;
        let pivot = end.data;
        while (start != end) {
            if (start.data < pivot) {
                pivotPrev = curr;
                let temp = curr.data;
                curr.data = start.data;
                start.data = temp;
                curr = curr.next;
            }
            start = start.next;
        }
        let temp = curr.data;
        curr.data = pivot;
        end.data = temp;
        return pivotPrev;
    }

    // Function to sort 
    sort(start, end) {
        if (start == null || start == end || start == end.next) {
            return;
        }

        let pivot_prev = this.partitionLast(start, end);
        this.sort(start, pivot_prev);
        
        if (pivot_prev != null && pivot_prev == start) {
            this.sort(pivot_prev.next, end);
        } else if (pivot_prev != null && pivot_prev.next != null) {
            this.sort(pivot_prev.next.next, end);
        }
    }
}


// Driver code
let ll = new QuickSortLinkedList();
ll.addNode(30);
ll.addNode(3);
ll.addNode(4);
ll.addNode(20);
ll.addNode(5);
let N = ll.head;
while (N.next != null) {
    N = N.next;
}
console.log('\nLinked List before sorting');
ll.printList(ll.head)
ll.sort(ll.head, N);
console.log("\nLinked List after sorting");
ll.printList(ll.head);