module.exports = class Queue {
    constructor() {
        this.data = [];
    }

    add(record) {
        this.data.unshift(record);
    }

    remove() {
        this.data.pop();
    }

    get first() {
        return this.data[0];
    }

    get last() {
        return this.data[this.data.length - 1];
    }

    get size() {
        return this.data.length;
    }

    get array() {
        return this.data;
    }
}