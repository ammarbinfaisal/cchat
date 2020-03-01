
exports.up = function(knex) {
    return knex.schema.createTable("cusers", (table) => {
        table.increments("id").notNullable();
        table.string("ip");
        table.string("nickname").unique();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("ccusers");
};
