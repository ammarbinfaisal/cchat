exports.up = function (knex) {
    return knex.schema.createTable("cchats", (table) => {
        table.increments("id");
        table.string("nickname").notNullable();
        table.string("message");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("cchats");
};
