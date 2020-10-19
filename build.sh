mkdir dcbadge-tests
rm -rf repo test_result.txt
git clone $1 dcbadge-tests/repo
NO_COLOR=true deno test dcbadge-tests/repo -A --unstable --coverage > dcbadge-tests/test_result.txt
