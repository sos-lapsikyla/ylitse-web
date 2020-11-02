set -eu

npx eslint src/ --ext .js,.jsx,.ts,.tsx
npx prettier --list-different 'src/**/*.{ts,tsx}'