
/**
 * A simple collection of data
 */
class Collection {

    /**
     *
     * @param {[*]} elements
     */
    constructor(elements = []) {
        this.elements = elements;
    }

    /**
     * Appends an element to the collection
     *
     * @param {*} element
     * @returns {Collection}
     */
    append(element) {
        this.elements.push(element);

        return this;
    }

    /**
     * Map this collection to another one with
     *
     * @param {Function} callback
     * @returns {Collection}
     */
    map(callback) {
        return new Collection(this.elements.map(callback));
    }

    /**
     * Count the number of elements
     *
     * @returns {number}
     */
    count() {
        return this.elements.length;
    }

    /**
     * Get list elements as a native array
     *
     * @returns {[]}
     */
    toArray() {
        return this.elements;
    }

    /**
     * Represents this collection as an array
     *
     * @returns {any[]}
     */
    toJson() {
        return this.elements.map( element => typeof (element.toJson) === 'function' ? element.toJson() : element );
    }
}

module.exports = Collection;
