import { spawn } from "node:child_process";

const page = process.argv[2];
if (page !== "write" && page !== "upload") {
  console.error("Usage: node scripts/open-authoring.mjs <write|upload>");
  process.exit(1);
}

const openCommand =
  process.platform === "darwin"
    ? ["open", []]
    : process.platform === "win32"
      ? ["cmd", ["/c", "start", ""]]
      : ["xdg-open", []];

let opened = false;
const server = spawn("pnpm", ["start"], {
  cwd: process.cwd(),
  stdio: ["inherit", "pipe", "pipe"],
});

const forwardOutput = (stream) => {
  stream.on("data", (chunk) => {
    process.stdout.write(chunk);
    if (opened) return;
    const localUrl = chunk.toString().match(/- Local:\s+(http:\/\/[^\s]+)/)?.[1];
    if (!localUrl) return;
    opened = true;
    const url = `${localUrl}/${page}?connect=1`;
    const [command, args] = openCommand;
    const browser = spawn(command, [...args, url], { detached: true, stdio: "ignore" });
    browser.unref();
    console.log(`Opened ${url}`);
  });
};

forwardOutput(server.stdout);
forwardOutput(server.stderr);
server.on("exit", (code) => process.exit(code ?? 0));
