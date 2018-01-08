const Collection = require('./collection');

/**
 * A collection which is a paginated result
 */
class PaginatedCollection extends Collection {

    /**
     *
     * @param elements
     */
    constructor(elements = []) {
        super(elements);

        this.next = false;
    }

    /**
     * Set the current page of this collection
     *
     * @param {number} page - The current page
     * @returns {PaginatedCollection}
     */
    setCurrentPage(page) {
        this.currentPage = page;

        return this;
    }

    /**
     * Set the maximum number of items in a page
     *
     * @param {number} itemPerPage - The maximum number of items in a page
     * @returns {PaginatedCollection}
     */
    setItemPerPage(itemPerPage) {
        this.perPage = itemPerPage;

        return this;
    }

    /**
     * Mark this collection as having next page
     *
     * @returns {PaginatedCollection}
     */
    havingNext() {
        this.next = true;

        return this;
    }

    /**
     * Get the maximum number of items in a page
     *
     * @returns {number}
     */
    itemPerPage() {
        return this.perPage;
    }

    /**
     * Get the current page of this collection
     *
     * @returns {number}
     */
    page() {
        return this.currentPage;
    }

    /**
     * Check if this collection has the next page
     *
     * @returns {boolean}
     */
    hasNext() {
        return this.next;
    }

    /**
     * @inheritDoc
     *
     * @param callback
     */
    map(callback) {
        let newlyMappedCollection = new PaginatedCollection(this.elements.map(callback))
            .setCurrentPage(this.page())
            .setItemPerPage(this.itemPerPage())
        ;

        if (this.hasNext()) {
            newlyMappedCollection.havingNext();
        }

        return newlyMappedCollection;
    }

    /**
     * @inheritDoc
     *
     * @returns {{currentPage: number, perPage: number, hasNext: boolean, collection: any[]}}
     */
    toJson() {
        return {
            currentPage : this.page(),
            perPage     : this.itemPerPage(),
            hasNext     : this.hasNext(),
            collection  : super.toJson()
        };
    }
}

module.exports = PaginatedCollection;
