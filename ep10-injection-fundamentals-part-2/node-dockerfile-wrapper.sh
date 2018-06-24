#!/bin/bash
EX_NUM=$1
EXEC_MODE=$2
ENV_SECRET="This is a secret"

if [[  -z "${EX_NUM// }" ]]; then
    echo "Please set EX_NUM"
    echo "Ex: EX_NUM=1 docker-compose up"
    echo "Additional help: https://sts.tools/setup"
    exit 1
fi

# Start the python server
python -m SimpleHTTPServer 8081 &
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start python: $status"
  exit $status
fi

# Start nodemon
npx "${EXEC_MODE:-nodemon}" "src/${EX_NUM}/${FILE:-app.js}"
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start Node: $status"
  exit $status
fi

# The container will exit with an error if it detects that either
# of the processes has exited. Otherwise it will loop forever,
# waking up every 60 seconds

while /bin/true; do
  ps aux | grep nodemon | grep -q -v grep
  PROCESS_1_STATUS=$?
  ps aux | grep python | grep -q -v grep
  PROCESS_2_STATUS=$?
  # If the greps above find anything, they will exit with 0 status
  # If they are not both 0, then something is wrong
  if [ $PROCESS_1_STATUS -ne 0 -o $PROCESS_2_STATUS -ne 0 ]; then
    echo "One of the processes has already exited."
    exit -1
  fi
  sleep 60
done

#!/bin/bash
EX_NUM=$1
EXEC_MODE=$2
ENV_SECRET="This is a secret"

if [[  -z "${EX_NUM// }" ]]; then
    echo "Please set EX_NUM"
    echo "Ex: EX_NUM=1 docker-compose up"
    echo "Additional help: https://sts.tools/setup"
    exit 1
fi

# Start the python server
python -m SimpleHTTPServer 8081 &
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start python: $status"
  exit $status
fi

# Start nodemon
npx "${EXEC_MODE:-nodemon}" "src/${EX_NUM}/${FILE:-app.js}"
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start Node: $status"
  exit $status
fi

# The container will exit with an error if it detects that either
# of the processes has exited. Otherwise it will loop forever,
# waking up every 60 seconds

while /bin/true; do
  ps aux | grep nodemon | grep -q -v grep
  PROCESS_1_STATUS=$?
  ps aux | grep python | grep -q -v grep
  PROCESS_2_STATUS=$?
  # If the greps above find anything, they will exit with 0 status
  # If they are not both 0, then something is wrong
  if [ $PROCESS_1_STATUS -ne 0 -o $PROCESS_2_STATUS -ne 0 ]; then
    echo "One of the processes has already exited."
    exit -1
  fi
  sleep 60
done
