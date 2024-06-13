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
    addAtPosition(data, position) {
        let newNode = new Node(data);

        if (position === 1) {
            newNode.next = this.head;
            this.head = newNode;

            this.count++;
            return this;
        }

        let current = this.head;
        let i = 1;
        while (i < position - 1 && current) {
            current = current.next;
            i++;
        }

        if (current) {
            newNode.next = current.next;
            current.next = newNode;

            this.count++;
            return this;
        }
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


    //     Remove(T)	
    // Removes the first occurrence of the specified value from the LinkedList<T>.

    // RemoveFirst()	
    // Removes the node at the start of the LinkedList<T>.

    // RemoveLast()

    // Find(T)	
    // Finds the first node that contains the specified value.

    // FindLast(T)	
    // Finds the last node that contains the specified value.

    // Contains(T)
}


const list = new LinkedList();

// add elements to the linkedlist
list.add("node1");
list.add("node2");
list.add("node3");
list.add("node4");
console.log("Initial List:");
list.toString();

console.log("List after adding nodex at position 2");
list.addAtPosition("nodex", 2);
list.toString();

console.log("List after adding nodey to tail");
list.addLast("nodey");
list.toString();

console.log("List after adding nodeF to tail");
list.addFirst("nodeF");
list.toString();