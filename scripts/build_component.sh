#!/bin/sh

read component

echo "Creating FileStruktur for '"$component"'";


BASE_PATH="src/"$component

if [ -d "$BASE_PATH" ]; then
    echo "Component already exists";
else
    sub_pathes=("components" "models" "pages" "repository")

    mkdir $BASE_PATH

    for sub_path in "${sub_pathes[@]}"
    do :
        mkdir $BASE_PATH"/"$sub_path
        touch $BASE_PATH"/"$sub_path"/.keep"
    done
fi