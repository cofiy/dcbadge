# dcbadge

![GitHub](https://img.shields.io/github/license/jswildcards/dcbadge)

Deno code coverage badge powered by [Shields.io](https://shields.io/)

## Before using...

The command line tool is only for macOS and linux. For windows users, you may go [here](https://dcbadge.herokuapp.com) to generate one.

> ###### From issue denoland/deno#7563 ...
> This works out pretty well for std like modules where the test module is next to the module, but if you want to coverage for something that is elsewhere there is no way to do that.

Due to [this](https://github.com/denoland/deno/issues/7563) issue, the coverage report can  be generated *only if* your directory structure is **std like** (Refer to [this](https://github.com/jswildcards/filedb/tree/main/src) or any folder of official std modules directoty structure). Please stay tuned for other directory structures by waiting official team to fix it.

## Usage

Use your username and repo on GitHub as parameters.

The command needs to be run with flags --allow-read and --allow-run (-A for short).

```bash
$ deno run -A https://deno.land/x/dcbadge/mod.ts <username> <repo>
```

For example,

```bash
$ deno run -A https://deno.land/x/dcbadge/mod.ts jswildcards filedb
```

It will return an object `{ url, markdown }` and print onto the terminal. 

The `url` property is the url containing your generated badge. 

The `markdown` property is for your convenience to add the badge into your markdown file like README.md.

## Online Generation

If the above method doesn't work for you, you may go [here](https://dcbadge.herokuapp.com) and follow the instruction to generate your badge too!
