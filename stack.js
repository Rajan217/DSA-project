class Stack {
    constructor() {
        this.size = 0;
        this.stack = [];
        this.buffer = 1;  // Maximum buffer size for concatenating characters
    }

    clear() {
        this.size = 0;
        this.stack = [];
    }

    isEmpty() {
        return this.size === 0;
    }

    top() {
        if (!this.isEmpty()) {
            return this.stack[this.size - 1];
        }
        return null;
    }

    pop() {
        if (!this.isEmpty()) {
            this.size--;
            return this.stack.pop();
        } else {
            return [-1, ''];  // Return this if the stack is empty
        }
    }

    push(type, char) {
        if (this.isEmpty()) {
            this.stack.push([type, char]);
            this.size++;
        } else {
            let top = this.top();
            if (top[0] === type && top[1].length < this.buffer) {
                top[1] = char + top[1]; // Concatenate character
            } else {
                this.stack.push([type, char]);
                this.size++;
            }
        }
    }
}

export { Stack };
