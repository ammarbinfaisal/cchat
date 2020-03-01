const fs = require("fs");
const jwt = require("jsonwebtoken");
const Router = require("koa-router");
const {getUserWithIp, getUserWithNickname, addUser} = require("../queries");
const router = new Router();

const SECRET = fs.readFileSync(".secret");  

const setStatus = (ctx, s) => {ctx.status = s;}

const setBadStatus = (ctx) => setStatus(ctx, 400);

router.post("/register-user", async (ctx, next) => {
    const {nickname} = JSON.parse(ctx.request.body);
    if(!nickname) ctx.status = 400;
    else if(u = await getUserWithNickname(nickname)) {
        console.log(u)
        ctx.body = JSON.stringify({error: "A user with that nickname is already in the chat server.\nChoose a different nickname"});
    } else {
        addUser(nickname, ctx.ip);
        ctx.cookies.set("nickname", jwt.sign(nickname, SECRET));
        ctx.body = JSON.stringify({success: true});
    }
    ctx.status = 200;
    next();
});

router.get("/get-info", async (ctx) => {
    const u = await getUserWithIp(ctx.ip);
    if(u) ctx.cookies.set("nickname", jwt.sign(u.nickname, SECRET));
    ctx.body = JSON.stringify(u || {});
});


module.exports = router;
