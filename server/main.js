const Koa = require("koa");
const fs = require("fs");
const http = require("http");
const bodyParser = require("koa-body");
const serve = require("koa-static");
const etag = require('koa-etag');
const helmet = require("koa-helmet");
const koaRequest = require('koa-http-request');
const jwt = require("jsonwebtoken");
const app = new Koa();
const router = require("./routes/auth");
const {newMessage, messagesBefore, recentMessages} = require("./queries");

const SECRET = fs.readFileSync(".secret");

let messages = [];

(async () => {
    messages = await recentMessages();
    console.log(messages);
})();

app.use(koaRequest({
    dataType: 'json',
    timeout: 3000    //3s timeout
}));

app.use(async (ctx, next) => {
    await next();
    console.log(`${ctx.method}  ${ctx.url}  ${ctx.status}`);
});

app.use(bodyParser());

app.use(async (ctx, next) => {
    await next();
});

app.use(helmet());

app.use(etag());

app.use(serve("../client/public"));


router.post("/send-message", async (ctx, next) => {
    const signedName = ctx.cookies.get("nickname");
    const {message} = JSON.parse(ctx.request.body);
    console.log(ctx.params)
    const nickname = jwt.decode(signedName);
    console.log(nickname)
    console.log(message);
    if(!nickname || !message) {
        ctx.status = 400;
        return next();
    }
    try {
        jwt.verify(signedName, SECRET);
    } catch(error) {
        console.log(error.message)
        ctx.status = 400;
        returnnext();
    }
    ctx.status = 200;
    const id = (await newMessage(nickname, message))[0];
    const msg = {id, nickname, message};
    io.emit("message", msg);
    messages.push(msg);
    if(messages.length > 30) messages.pop();
});

router.get("/recent-messages", async (ctx, next) => {
    ctx.body = JSON.stringify(messages);
});

router.get("/messages-before", async (ctx, next) => {
    const {id} = ctx.query;
    if(!id) {
        ctx.status = 400;
        return next();
    }
    ctx.body = JSON.stringify(await messagesBefore(id));
});

app
  .use(router.routes())
  .use(router.allowedMethods());

const server = http.createServer(app.callback());

const io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('a user connected');
});

server.listen(80, "0.0.0.0", function () {
    console.log('listening on *:3000');
});
