# dcbadge

![GitHub](https://img.shields.io/github/license/jswildcards/dcbadge)

Deno code coverage badge powered by [Shields.io](https://shields.io/)

## Caution!

> ## TL;DR: Do not use this if your tests are not in the same level of the same directory of your source code
Some unknown bugs are exists, that cannot show the coverage statistics provided by Deno. It seems that coverage will only be shown when tests are in the folder with the same level of the source code (You may refer to my file structure of [this](https://github.com/jswildcards/filedb) repo). We will try to fix it as soon as possible. Stay tuned.

## Usage

Enter the command below with your terminal, filling your username and repo as parameters

```bash
$ deno run -A --unstable https://raw.githubusercontent.com/jswildcards/dcbadge/main/mod.ts <username> <repo>
```

For example,

```bash
$ deno run -A --unstable https://raw.githubusercontent.com/jswildcards/dcbadge/main/mod.ts jswildcards filedb
```

It will return an object `{ url, markdown }`. The `url` field is the url containing your generated badge. The `markdown` field is for your convenience to add the badge into your markdown file like README.md.

## Online Generate

If the above method isn't work for you, you may go to [here](https://dcbadge.herokuapp.com) and follow the instruction to generate your badge too!
