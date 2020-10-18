# dcbadge

![GitHub](https://img.shields.io/github/license/jswildcards/dcbadge)

Deno code coverage badge powered by [Shields.io](https://shields.io/)

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
