#!/bin/bash

LOGO_DIR="public/logos"
mkdir -p "$LOGO_DIR"

declare -A logos=(
  [react.svg]="https://cdn.simpleicons.org/react"
  [node.svg]="https://cdn.simpleicons.org/nodedotjs"
  [typescript.svg]="https://cdn.simpleicons.org/typescript"
  [nextjs.svg]="https://cdn.simpleicons.org/nextdotjs"
  [tailwind.svg]="https://cdn.simpleicons.org/tailwindcss"
  [js.svg]="https://cdn.simpleicons.org/javascript"
  [html.svg]="https://cdn.simpleicons.org/html5"
  [css.svg]="https://cdn.simpleicons.org/css3"
  [python.svg]="https://cdn.simpleicons.org/python"
  [docker.svg]="https://cdn.simpleicons.org/docker"
  [apache.svg]="https://cdn.simpleicons.org/apache"
  [java.svg]="https://cdn.simpleicons.org/java"
  [springboot.svg]="https://cdn.simpleicons.org/springboot"
)

for name in "${!logos[@]}"; do
  url="${logos[$name]}"
  echo "Téléchargement de $name ..."
  curl -fsSL "$url" -o "$LOGO_DIR/$name"
done

echo "Tous les logos SVG ont été téléchargés dans $LOGO_DIR/"

for f in public/logos/*.svg; do
  convert "$f" "${f%.svg}.png"
done