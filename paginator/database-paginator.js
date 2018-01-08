const PaginatedCollection = require('./paginated-collection');

class DatabasePaginator {

    /**
     * Set the maximum number of item in a page
     *
     * @param itemPerPage
     * @returns {DatabasePaginator}
     */
    setItemPerPage(itemPerPage) {
        this.itemPerPage = itemPerPage;
        return this;
    }

    /**
     *
     * @param {knex.QueryBuilder|database|*} query
     * @param {number} page
     * @param {number} itemPerPage
     * @returns {Promise<PaginatedCollection>}
     */
    async fetch(query, page, itemPerPage = null) {

        if (page <= 0) {
            throw new Error('E_PAGINATOR: Invalid page [%s]', page);
        }

        itemPerPage = itemPerPage || this.itemPerPage;

        let startIndex      = (page - 1) * itemPerPage;
        let rawCollection   = await query.limit(itemPerPage + 1).offset(startIndex);
        let hasNext         = rawCollection.length > itemPerPage;

        if (hasNext) {
            rawCollection.pop();
        }

        let collection = new PaginatedCollection(rawCollection)
            .setCurrentPage(page)
            .setItemPerPage(itemPerPage)
        ;

        if (hasNext) {
            collection.havingNext();
        }

        return collection;
    }
}

module.exports = DatabasePaginator;
