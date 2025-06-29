const dns = require("native-dns");
const server = dns.createServer();

const TARGET_IP = process.env.TARGET_IP || "185.219.118.245";

server.on("request", function (request, response) {
  const question = request.question[0];
  console.log("طلب DNS من:", question.name);

  response.answer.push(
    dns.A({
      name: question.name,
      address: TARGET_IP,
      ttl: 300,
    })
  );

  response.send();
});

server.on("error", function (err) {
  console.error("حدث خطأ:", err);
});

server.serve(53);
