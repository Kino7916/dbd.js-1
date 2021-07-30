const mysql = require("mysql2");

class MySqlDatabase {
    /**
     * 
     * @param {{
     * host: string;
     * user: string;
     * password: string | null;
     * database: string;
     * variables: Array<string>;
     * alwaysCleanup: false | boolean;
     * }} options 
     */
    constructor(options) {
        this.options = options;
        this.tableReady = false;
        this.variables = options.variables;
        this.pool = mysql.createPool({
            connectTimeout: 60000,
            ...this.options,
            waitForConnections: true,
            connectionLimit: 10,
            decimalNumbers: true,
            bigNumberStrings: true,
            supportBigNumbers: true,
            multipleStatements: true
        }).promise();

        this._resolveTable();
        if (options.alwaysCleanup) this._cleanup();
    }

    async _resolveTable() {
        await this.pool.query(`CREATE TABLE IF NOT EXISTS \`dbd.jsTableVariable\` (
            json MEDIUMTEXT
        )`).catch(err => {throw err});

        await this.pool.query(`CREATE TABLE IF NOT EXISTS \`dbd.jsTable\` (
            key CHAR(255) PRIMARY KEY
            var VARCHAR(200)
            number DOUBLE PRECISION
            string MEDIUMTEXT
        )`).catch(err => {throw err});

        this.tableReady = true;
    }

    async _cleanup() {
        const rawvariables = await this.pool.query("SELECT json FROM `dbd.jsTableVariable`");
        /** @type {Array<string>} */
        const vars = JSON.parse(`${rawvariables}`)
        const sqlSyntax = vars.filter(v => !this.variables.includes(v)).map(v => " `var`=" + v + " ").join("OR");
        
        await this.pool.query("DELETE FROM `dbd.jsTable` WHERE " + sqlSyntax);
    }

    async set(key, val) {
        if (!this.tableReady) return;
        if (!key) throw new Error("Missing Key!")
        if (!val) throw new Error("Value must be a valid type!");

        const type = isNaN(val) ? 'string' : 'number';
        const value = type === "string" ? JSON.stringify(val) : val;
       const res = await this.pool.query(`INSERT OR IGNORE INTO \`dbd.jsTable\` (key)
       VALUES (?);
       UPDATE \`dbd.jsTable\`
       SET ??=?
       WHERE \`key\`=?`, [key, type, value, key]).catch(err => {throw err;});

       return res;
    }

    async get(key, limit = 1) {
        if (!this.tableReady) return;
        if (!key) throw new Error("Missing Key!");

        if (isNaN(limit)) limit = 1
        
        let actualLimit = ""
        if (isFinite(limit)) actualLimit = "\nLIMIT " + limit.toString();

        const res = await this.pool
        .query(`SELECT * FROM \`dbd.jsTable\`${actualLimit}`);
        return res;
    }

    async delete(key) {
        if (!this.tableReady) return;
        if (!key) throw new Error("Missing Key!")

        const res = await this.pool
        .query(`DELETE FROM \`dbd.jsTable\`
        WHERE \`key\`=?`, key);
        return res;
    }

    async reset() {
        if (!this.tableReady) return;

        const res = await this.pool
        .query("DELETE FROM `dbd.jsTable`");
        return res;
    }
}

module.exports = MySqlDatabase