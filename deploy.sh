#!/bin/bash


name="water_level"
echo $1

  npm run build
  scp -r ./dist root@101.132.117.245:/tmp/dist
  ssh root@101.132.117.245 > /dev/null 2>&1 << eof
  cd /tmp
  rm -rf /opt/webapptest/${name}
  mv  dist /opt/webapptest/${name}
  exit
eof

echo done!
