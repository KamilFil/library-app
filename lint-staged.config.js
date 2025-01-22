export default {
  '*.{ts,tsx}': [
    'npm run prettify',
    () => 'npm run typecheck',
    'npm run lint --fix --no-cache'
  ],
}