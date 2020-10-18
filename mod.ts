import { calculate } from "./coverage.ts";
const [username, repo] = Deno.args;
const url = await calculate(username, repo);
console.log({ url, markdown: `![deno-code-coverage](${url})` });
