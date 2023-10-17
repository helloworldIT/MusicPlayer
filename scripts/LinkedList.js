 // Define linked list to store playlist
class Node{
    constructor(data){
        this.data = data;
        this.next = null;
    }
}

class LinkedList{
    #len;

    constructor(){
        this.head = null;
        this.tail = null;
        this.#len = 0;
    }

    addHead(data){
        const newNode = new Node(data);
        if(this.head===null){
            this.head = newNode;
            this.tail = newNode;
        }
        else{
            newNode.next = this.head;
            this.head = newNode;
        }
        this.#len++;
    }

    addTail(data){
        const newNode = new Node(data);
        if(this.head === null){
            this.head = newNode;
            this.tail = newNode;
        }
        else{
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.#len++;
    }

    addIndex(x,data){
        if(x < 1 || x > this.#len) {
            return;
        }
        else if (x === 1) {
            this.addHead(data);
        } 
        else if (x === this.#len) {
            this.addTail(data);
        } 
        else {
            const newNode = new Node(data);
            let currentNode = this.head;
            let previousNode = null;
        
            for (let i = 1; i <= x-1 ; i++) {
            previousNode = currentNode;
            currentNode = currentNode.next;
            }
        
            newNode.next = currentNode;
            previousNode.next = newNode;
        }
        
        this.#len++;
    }

    removeHead(){
        if(this.head===null){
            return;
        }
        else if(this.head===this.tail){
            this.head = null;
            this.tail = null;
        }
        else{
            this.head = this.head.next;
        }
        this.#len--;
    }

    removeTail(){
        if(this.head===null){
            return;
        }
        else if(this.head===this.tail){
            this.head = null;
            this.tail = null;
        }else{
            let currentNode = this.head;
            let previuosNode = null;
            while(currentNode.next !== null){
                previuosNode = currentNode;
                currentNode = currentNode.next;
            }
            previuosNode.next = null;
            this.tail = previuosNode;
        }
        this.#len--;
    }

    removeIndex(x) {
        if (x === 1) {
            this.removeHead();
        } 
        else if (x === this.#len) {
            this.removeTail();
        } 
        else if (x <= 0 ||x > this.#len||this.head===null) {
            return;
        } 
        else {
            let currentNode = this.head;
            let previousNode = null;
    
            for (let i = 1; i <= x-1; i++) {
            previousNode = currentNode;
            currentNode = currentNode.next;
            }
    
            previousNode.next = currentNode.next;
            this.#len--;
        }

    }

    getNode(index){
        let currentNode = this.head;
        if(index === 1){
            return this.head;
        }
        else if(index === this.#len){
            return this.tail;
        }
        else if(index <= 0 || index > this.#len || this.head===null){
            return;
        }
        else{
            for(let i=2;i<=index;i++){
                currentNode = currentNode.next;
            }
            return currentNode;
        }
    }

    changePosition(nodePosition, newPosition) {
        if (
            newPosition !== nodePosition &&
            nodePosition <= this.#len &&
            this.#len > 1 &&
            nodePosition > 0 &&
            newPosition <= this.#len &&
            newPosition > 0
        ) {
            let node = this.getNode(nodePosition);
            let prevNode = null;
            let temp = null;
    
            // Handling the case when nodePosition is 1
            if (nodePosition === 1) {
                temp = this.head;
                this.head = this.head.next;
            } else {
                let i = 1;
                prevNode = this.head;
                while (i < nodePosition - 1) {
                    prevNode = prevNode.next;
                    i++;
                }
                temp = prevNode.next;
                prevNode.next = temp.next;
            }
    
            // Inserting the node at the new position
            if (newPosition === 1) {
                temp.next = this.head;
                this.head = temp;
            } else {
                let j = 1;
                prevNode = this.head;
                while (j < newPosition - 1) {
                    prevNode = prevNode.next;
                    j++;
                }
                temp.next = prevNode.next;
                prevNode.next = temp;
                if (temp.next === null) {
                    this.tail = temp;
                }
            }
    
            // Handling the case when nodePosition is the last node
            if (nodePosition === this.#len) {
                this.tail = prevNode;
            }
        }
    }

    // exportToArray(){
    //     let array = new Array;
    //     let currentNode = this.head;
    //     while(currentNode!== null){
    //         array.push(currentNode.data);
    //         currentNode = currentNode.next;
    //     }
    //     return array;
    // }

    shuffle() {
        let array = [];
        let currentNode = this.head;
        while (currentNode !== null) {
            array.push(currentNode.data);
            currentNode = currentNode.next;
        }

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        // Update the linked list with shuffled elements
        currentNode = this.head;
        let index = 0;
        while (currentNode !== null) {
            currentNode.data = array[index];
            currentNode = currentNode.next;
            index++;
        }

        // Update head and tail references
        this.head = this.getNode(1);
        this.tail = this.getNode(this.#len);
    }

    forEach(callback){
        let currentNode = this.head;
        while (currentNode !== null) {
            callback(currentNode.data);
            currentNode = currentNode.next;
        }
    }

    printList(){
        let currentNode = this.head;
        while(currentNode!== null){
            console.log(currentNode.data);
            currentNode = currentNode.next;
        }
    }

    clearList() {
        // Set the head and tail pointers to null.
        this.head = null;
        this.tail = null;
    
        // Iterate over the linked list, deleting each node.
        let currentNode = this.head;
        while (currentNode !== null) {
            let nextNode = currentNode.next;
            currentNode = null;
            currentNode = nextNode;
        }
    
        // Reset the length of the linked list to 0.
        this.#len = 0;
    }
}


