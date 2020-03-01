const knex = require("knex")(require("../knexfile").development);

module.exports.getUserWithIp = async ip => {
    return await knex("cusers").where({ip}).first();
}


module.exports.getUserWithNickname = async nickname => {
    return await knex("cusers").where({nickname}).first();
}

module.exports.addUser = async (nickname, ip) => {
    return await knex("cusers").insert({nickname, ip});
}

module.exports.newMessage = async (nickname, message) => {
    return await knex("cchats").insert({nickname, message});
}

module.exports.messagesBefore = async (id) => {
    return await knex("cchats").whereBetween("id", [id-20, id]);
}

module.exports.recentMessages = async () => {
    return await knex("cchats").select("*").orderBy("id", "desc").limit(15);
}
