import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { parse } from "https://deno.land/std@0.74.0/flags/mod.ts";
import { calculate } from "./coverage.ts";

const router = new Router();

router.get("/", function (context) {
  context.response.body = /*html*/ `
    <html>
    <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/css/bootstrap.min.css" integrity="sha384-DhY6onE6f3zzKbjUPRc2hOzGAdEf4/Dz+WJwBvEYL/lkkIsI3ihufq9hk9K4lVoK" crossorigin="anonymous">
    </head>
    <body style="width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;font-size:16px;">
      <div style="display:flex;flex-direction:column;margin-bottom:20vh;width:500px;">
        <h2>Deno Code Coverage Badge</h2>
        <p>Please enter your GitHub Repo information</p>
        <p>It will clone repo from <b>https://github.com/:username/:repo</b> and evaluate deno code coverage</p>
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input type="text" class="form-control" id="username" />
        </div>
        <div class="mb-3">
          <label for="repo" class="form-label">Repo</label>
          <input type="text" class="form-control" id="repo" />
        </div>
        <button type='button' class="btn btn-primary" onclick="location.href='/' + document.querySelector('#username').value + '/' + document.querySelector('#repo').value">Evaluate</button>
      </div>
    </body>
    </html>
  `;
});

router.get("/:username/:repo", async function (context) {
  const { username, repo } = context.params;
  const url = await calculate(username!, repo!);

  context.response.body = /*html*/ `
    <html>
    <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/css/bootstrap.min.css" integrity="sha384-DhY6onE6f3zzKbjUPRc2hOzGAdEf4/Dz+WJwBvEYL/lkkIsI3ihufq9hk9K4lVoK" crossorigin="anonymous">
    </head>
    <body style="width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;">
      <div style="margin-bottom:20vh;max-width:600px;">
        <h2>Deno Code Coverage Badge</h2>
        <p>This is your badge</p>
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
