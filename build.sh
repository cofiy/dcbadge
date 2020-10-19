rm -rf repo test_result.txt
git clone $1 repo
cd repo
NO_COLOR=true deno test -A --unstable --coverage > test_result.txt
