// 간단한 정적 파일 서버 — viewer.html이 fetch()로 JSON을 불러올 수 있도록
// file:// 대신 http://localhost 로 서비스합니다.
const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const root = __dirname;
const PORT = 5500;
const types = {
  ".html": "text/html; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8"
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/viewer.html";
  const filePath = path.join(root, urlPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 Not Found: " + urlPath);
      return;
    }
    res.writeHead(200, { "Content-Type": types[path.extname(filePath)] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}/viewer.html`;
  console.log(`\n✅ 서버 실행됨: ${url}`);
  console.log(`   (이 창을 닫으면 서버가 종료됩니다. 학습이 끝나면 닫아주세요)\n`);

  // Windows에서 기본 브라우저로 자동으로 열기
  exec(`start "" "${url}"`);
});
