# Déployer Sahhaonline sur EasyPanel

Architecture : **storefront** (`sahha.online`) + **backend** (`api.sahha.online`) + **Postgres**.

## 1. Prérequis

- Serveur avec [EasyPanel](https://easypanel.io)
- Dépôt Git contenant `storefront/` et `backend/`

## 2. DNS (registrar — domaine `sahha.online`)

| Type | Host | Valeur |
|------|------|--------|
| **A** | `@` | IP du serveur EasyPanel |
| **A** ou **CNAME** | `www` | IP ou `sahha.online` |
| **A** ou **CNAME** | `api` | IP du serveur (même IP) |

## 3. PostgreSQL

1. **+ Service** → **Postgres** (ex. nom interne `sahhaonline_database`)
2. Notez user / mot de passe / base (`sahhaonline`)
3. URL interne (exemple) :

```env
DATABASE_URL=postgres://postgres:MOT_DE_PASSE@sahhaonline_database:5432/sahhaonline?sslmode=disable
```

Ne pas exposer Postgres sur Internet sans besoin. Activez **Backups**.

## 4. Service backend (API)

| Paramètre | Valeur |
|-----------|--------|
| Type | App |
| Dockerfile | `backend/Dockerfile` |
| Racine build | `backend` |
| Port proxy | `4000` |
| Domaines | `api.sahha.online` |

Variables → copier depuis `backend/.env.example` :

```env
NODE_ENV=production
PORT=4000
DATABASE_URL=postgres://postgres:MOT_DE_PASSE@sahhaonline_database:5432/sahhaonline?sslmode=disable
ORDER_WEBHOOK_URL=https://votre-webhook
IP_HASH_SALT=chaine-aleatoire-longue
CORS_ORIGINS=https://sahha.online,https://www.sahha.online
META_PIXEL_ID=...
META_CAPI_ACCESS_TOKEN=...
TIKTOK_PIXEL_ID=...
TIKTOK_EVENTS_API_ACCESS_TOKEN=...
```

Au **démarrage**, le backend exécute les migrations SQL (`migrations/*.sql`) puis écoute sur le port 4000.

Vérification : `https://api.sahha.online/health` → `{"ok":true,...}`

## 5. Service storefront (Next.js)

| Paramètre | Valeur |
|-----------|--------|
| Type | App |
| Dockerfile | `storefront/Dockerfile` |
| Racine build | `storefront` |
| Port proxy | `3000` |
| Domaines | `sahha.online`, `www.sahha.online` |

Variables → copier depuis `storefront/.env.example` :

```env
NODE_ENV=production
API_URL=http://sahhaonline_backend:4000
NEXT_PUBLIC_SITE_URL=https://sahha.online
NEXT_PUBLIC_META_PIXEL_ID=...
NEXT_PUBLIC_TIKTOK_PIXEL_ID=...
NEXT_PUBLIC_GOOGLE_TAG_ID=...
```

`API_URL` : Next.js proxifie `/api/order` et `/api/track` vers le backend (le navigateur appelle toujours `sahha.online/api/...`).

**Important checkout :** utilisez l’URL **interne** Docker (nom du service backend dans EasyPanel, ex. `sahhaonline_backend`) — pas `https://api.sahha.online` depuis le conteneur storefront, sinon latence / timeouts avant l'offre unique.

```env
API_URL=http://sahhaonline_backend:4000
```

## 6. Ordre de déploiement

1. Postgres
2. Backend (migrations + health)
3. Storefront

## 7. Test local

```bash
# Terminal 1 — API + Postgres
cd backend
docker compose up --build

# Terminal 2 — site
cd storefront
cp .env.example .env.local
# Dans .env.local : API_URL=http://localhost:4000
npm run dev
```

Site : http://localhost:3000 — API : http://localhost:4000/health

## 8. Auto-deploy (optionnel)

Activez **Auto Deploy** sur chaque service après le premier déploiement réussi.
