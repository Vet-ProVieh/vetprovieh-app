#!/bin/sh

echo "What name your component should have?"
read component

echo "Creating FileStruktur for '"$component"'";


BASE_PATH="src/"$component

if [ -d "$BASE_PATH" ]; then
    echo "Component already exists";
else
    sub_pathes=("components" "models" "pages" "repository")

    mkdir -p $BASE_PATH
    touch $BASE_PATH"/index.ts"

    for sub_path in "${sub_pathes[@]}"
    do :
        path=$BASE_PATH"/"$sub_path
        mkdir $path
        touch $path"/.keep"
        touch $path"/index.ts"

        if [ "$sub_path" = "pages" ]; then
            pages=("create" "index" "show" "_includes")
            for page in "${pages[@]}"
            do :
                mkdir $path"/"$page
            done
        fi
    done
fi