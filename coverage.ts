export async function calculate(username: string, repo: string) {
  const cmd = Deno.run({
    cmd: ["sh", "build.sh", `https://github.com/${username}/${repo}`],
  });

  await cmd.status();

  const test_result = Deno.readTextFileSync("test_result.txt");
  const coverage_lines = test_result.split("\n").filter((line) =>
    line.includes("cover file:/")
  );

  const coverage = Math.round(
    coverage_lines.map((line) =>
      parseFloat(
        line.split(" ").find((word) => word.includes("%"))?.replace("%", "")!,
      )
    ).reduce((prev, cur) => prev + cur, 0) / coverage_lines.length * 100,
  ) / 100;

  const color = coverage >= 80
    ? "brightgreen"
    : (coverage >= 60 ? "yellowgreen"
    : (coverage >= 40 ? "yellow" : (coverage >= 20 ? "orange" : "red")));

  const url =
    `https://img.shields.io/badge/code%20coverage-${coverage}%25-${color}.svg`;

  const post_build = Deno.run({
    cmd: ["rm", "-rf", "repo", "test_result.txt"],
  });

  await post_build.status();

  return url;
}
