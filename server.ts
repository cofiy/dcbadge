import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { parse } from 'https://deno.land/std@0.74.0/flags/mod.ts';
import { calculate } from "./coverage.ts";

const router = new Router();

router.get("/:username/:repo", async function (context) {
  const { username, repo } = context.params;
  const url = await calculate(username!, repo!);

  context.response.body = `
    <html>
    <body style="width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;">
      <div style="margin-bottom:20vh;max-width:600px;">
        <div>${await fetch(url).then((res) => res.text())}</div>
        <br>
        <div>url:</div> <div style="border-radius:6px;background:#dedede;margin-top:12px;padding:12px;"><code><a href=${url}>${url}</a></code></div>
        <br>
        <div>markdown:</div> <div style="border-radius:6px;background:#dedede;margin-top:12px;padding:12px;"><code>![deno-code-coverage](${url})</code></div>
      </div>
    </body>
    </html>
  `;
});

const DEFAULT_PORT = 8000;
const argPort = parse(Deno.args).port;

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: argPort ? Number(argPort) : DEFAULT_PORT });
