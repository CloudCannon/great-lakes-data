# exit when any command fails
set -e

if [ "$1" = "" ]
then
  echo "Usage: Please provide the collection name to install"
  exit
fi

COLLECTION=$1
rm -rf ./src/content/$COLLECTION
mkdir ./src/content/$COLLECTION
cp ./great-lakes-data/content/$COLLECTION/* ./src/content/$COLLECTION
node ./great-lakes-data/format-collection.cjs $COLLECTION