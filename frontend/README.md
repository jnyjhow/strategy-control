# Strategy Administração (strategy-admin)

Gerenciamento da strategy analytics

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

### Switching data source: fakes vs backend

During development you can choose whether the frontend uses local fake data or talks to the backend API:

- VITE_USE_FAKES=true (default) — frontend uses built-in fake data (no backend needed)
- VITE_USE_FAKES=false — frontend calls the backend API. Configure the host with VITE_API_BASE_URL.

Example `.env` entries (create `frontend/.env` or use your dev runner):

VITE_USE_FAKES=false
VITE_API_BASE_URL=http://localhost:3333

Note: the frontend composables call the API under the `/api` prefix (e.g. `${VITE_API_BASE_URL}/api/clients`).
