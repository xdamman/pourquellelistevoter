#!/bin/bash

# Usage:
# ./scripts/merge_csv_files.sh data/Communales\ 2018\ -\ liste\ des\ candidats\ -\ Villes\ * > data/candidats.csv

for FILE in "$@"
do
  if [ -z ${HEADER+x} ]; then
    HEADER=`head -n 1 "$FILE"`
    echo $HEADER
  else
    echo "header set";
  fi;
  tail -n +2 "$FILE";
done
