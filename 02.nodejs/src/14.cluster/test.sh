#!/bin/bash

for i in $(seq 1 200)

do
  curl 'http://localhost:3000'
  echo
  sleep 0.3
done