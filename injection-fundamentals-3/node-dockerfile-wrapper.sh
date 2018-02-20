#!/bin/bash
EX_NUM=$1
EXEC_MODE=$2

if [[  -z "${EX_NUM// }" ]]; then
    echo "Please set EX_NUM"
    echo "Ex: EX_NUM=1 docker-compose up"
    echo "Additional help: https://sts.tools/setup"
    exit 1
fi


# Start nodemon
npx "${EXEC_MODE:-nodemon}" "src/${EX_NUM}/${FILE:-app.js}"
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start Node: $status"
  exit $status
fi
