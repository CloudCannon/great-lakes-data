cd ..
# Clean old collections
for element in "${COLLECTION[@]}"
do
  rm -rf src/content/${element}
done

# Clean old data files
for element in "${DATA_FILE[@]}"
do
  rm -rf data/${element}.json
  touch data/${element}.json
done

# Create new collections and move them to their new home
cd src/content
for element in "${COLLECTION[@]}"
do
  mkdir ${element}
  cp ../../great-lakes-data/content/${element}/* ./${element}
done

cd ../../
for element in "${DATA_FILE[@]}"
do
  mkdir data/temp-${element}
  cp ./great-lakes-data/content/${element}/* ./data/temp-${element}
done

# Run formatters
node ./great-lakes-data/format-collection.cjs
node ./great-lakes-data/format-data-collection.cjs

# Clean up cloned file
rm -rf great-lakes-data