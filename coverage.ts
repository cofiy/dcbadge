import "https://deno.land/x/dotenv/load.ts";

export async function calculate(username: string, repo: string) {
  const prebuild1 = Deno.run({
    cmd: ["rm", "-rf", "repo"],
  });

  await prebuild1.status();
  prebuild1.close();
  
  const prebuild2 = Deno.run({
    cmd: ["git", "clone", `https://github.com/${username}/${repo}`, "repo"],
  });

  await prebuild2.status();
  prebuild2.close();

  const pre_build3 = Deno.run({
    cmd: ["deno", "test", "./repo", "-A", "--unstable", "--coverage"],
    stdout: "piped",
  });

  const output = await pre_build3.output();
  pre_build3.close();

  const test_result = new TextDecoder().decode(output);
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
  post_build.close();

  return url;
}
