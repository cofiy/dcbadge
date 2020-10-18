rm -rf repo test_result.txt
git clone $1 repo &> /dev/null
NO_COLOR=true deno test ./repo -A --unstable --coverage > test_result.txt
