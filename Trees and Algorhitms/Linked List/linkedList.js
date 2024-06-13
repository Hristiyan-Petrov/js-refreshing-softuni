class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    // function to add data to linked list
    add(data) {
        const newNode = new Node(data);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.count++;
        return this;
    }

    //function to add data to tail
    addLast(data) {
        const newNode = new Node(data);

        if (!this.head) {
            this.head = newNode;
        } else {
            this.tail.next = newNode;
        }

        this.count++;
        return this;
    }

    //function to add data at first index
    addFirst(data) {
        let newNode = new Node(data);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }

        this.count++;
        return this;
    }

    // function to insert data to linked list at a particular index
    addAt(element, index) {

        if (index < 0 || index > this.size) return console.log("Please enter a valid index.");

        // create a new node
        let newNode = new Node(element);
        let curr, prev;

        curr = this.head;

        // add the element to the first index
        if (index == 0) {
            this.addFirst(element);

        } else {
            curr = this.head;
            let i = 0;

            // iterate over the list to find the position to insert
            while (i < index) {
                i++;
                prev = curr;
                curr = curr.next;
            }

            // adding an element
            newNode.next = curr;
            prev.next = newNode;
        }
        this.count++;
    }

    // Removes the first occurrence of the specified value from the LinkedList<T>.
    remove(data) {

        if (index < 0 || index >= this.size) return console.log("Please Enter a valid index");

        if (!this.head) {
            return null;
        }

        // delete first element
        if (this.head.data === data) {
            this.head = this.head.next;
        }

        // else iterate over the list to the position to remove an element
        let current = this.head;
        while (current.next) {
            if (current.next.data === data) {
                // remove the element
                current.next = current.next.next;
            }
            current = current.next;
        }

        this.count--;
        return this;
    }

    removeAt(index) {
        if (index < 0 || index >= this.count) return null;
        if (index === 0) return this.remove();

        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }

        current.next = current.next.next;
        this.count--;
        return this;
    }

    removeElement(element) {
        let current = this.head;
        let prev = null;

        // iterate over the list
        while (current != null) {

            // compare element with current element if found then remove theand return true
            if (current.data === element) {

                if (prev == null) {
                    this.head = current.next;
                } else {
                    prev.next = current.next;
                }

                this.count--;
                return current.data;
            }
            prev = current;
            current = current.next;
        }
        return -1;
    }

    // Removes the node at the start of the LinkedList<T>.
    removeFirst(head) {
        if (this.head == null) return null;

        // Move the head pointer to the next node
        this.head = this.head.next;
        this.count--;
        return head;
    }

    removeLast() {
        if (this.head == null)
            return null;

        if (this.head.next == null) {
            this.head = null;
        } else {
            // Find the second last node
            let last = this.head;
            while (last.next.next != null)
                last = last.next;

            // Change next of second last
            last.next = null;
        }

        this.count--;
    }

    // iterate over the entire linkedlist and print data
    toString() {
        let result = [];
        let current = this.head;
        while (current) {
            result.push(current.data);
            console.log(current.data);
            current = current.next;
        }

        console.log(`Linked list count: ${this.count}`);
        // console.log(result);
    }

    find(element) {
        let count = 0;
        let current = this.head;

        // iterate over the list
        while (current != null) {
            if (current.data === element)
                return count;
            count++;
            current = current.next;
        }

        // not found
        return -1;
    }

    // FindLast(T)	
    // Finds the last node that contains the specified value.

    // Contains(T)
}


const ll = new LinkedList();
ll.add(10);
// adding more elements to the list
ll.add(20);
ll.add(30);
ll.add(40);
ll.toString();

ll.removeLast();
ll.toString();


// add elements to the linkedlist
// list.add("node1");
// list.add("node2");
// list.add("node3");
// list.add("node4");
// console.log("Initial List:");
// list.toString();

// console.log("List after adding nodex at position 2");
// list.addAtPosition("nodex", 2);
// list.toString();

// console.log("List after adding nodey to tail");
// list.addLast("nodey");
// list.toString();

// console.log("List after adding nodeF to tail");
// list.addFirst("nodeF");
// list.toString();



// add elements to the linkedlist
// list.add("node1");
// list.add("node2");
// list.add("node3");
// list.add("node4");
// console.log("Initial List:");
// list.toString();

// console.log("List after removing node2");
// list.remove("node2");
// list.toString();

// console.log("List after removing node at index 2");
// list.removeAt(2);
// list.toString();


// const ll = new LinkedList();
// ll.add(10);
// // adding more elements to the list
// ll.add(20);
// ll.add(30);
// ll.add(40);
// ll.add(50);
// // ll.toString();

// console.log("is element removed ?" + ll.removeElement(50));

// ll.toString();
// console.log("Index of 40 :" + ll.indexOf(40));

// // insert 60 at second position
// // ll contains 10 20 60 30 40
// ll.addAtPosition(60, 2);
// ll.toString();


// // remove 3rd element from the list
// console.log(ll.removeAt(3));

// // prints 10 20 60 40
// ll.toString();
