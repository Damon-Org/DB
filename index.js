import BaseModule from './structures/BaseModule.js'
import mysql from 'mysql2/promise.js'

export default class DB extends BaseModule {
    /**
     * @param {Main} main
     */
    constructor(main) {
        super(main);

        this.register(DB, {
            name: 'db',
            scope: 'global'
        });
    }

    /**
     * @returns {mysql2/promise_pool}
     */
    get pool() {
        return this._pool;
    }

    setup() {
        this._pool = mysql.createPool(this.config.development ? this.auth.credentials.db.dev : this.auth.credentials.db.prod);

        this.log.info('DB', 'Created MySQL Promise Connection Pool.');

        return true;
    }
}
