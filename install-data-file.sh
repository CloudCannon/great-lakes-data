# exit when any command fails
set -e

if [ "$1" = "" ]
then
  echo "Usage: Please provide the collection name to install into a datafile"
  exit
fi

COLLECTION=$1
rm -rf ./data/temp-$COLLECTION
mkdir ./data/temp-$COLLECTION
cp ./great-lakes-data/content/$COLLECTION/* ./data/temp-$COLLECTION
node ./great-lakes-data/format-data-file.cjs $COLLECTION