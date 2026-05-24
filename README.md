# Storefront Sahhaonline

Application Next.js publique pour Sahhaonline (DTC Maroc, paiement a la livraison).

## Fonctionnel

- tunnel panier -> checkout -> upsell -> page merci
- checkout avec nom, adresse et telephone marocain
- i18n FR / AR
- tracking web (Meta, TikTok, Google Tag) + relais server-side via `/api/track`

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Variables d'environnement

Copier `storefront/.env.example` vers `.env.local` puis renseigner:

- `API_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_META_PIXEL_ID`
- `NEXT_PUBLIC_TIKTOK_PIXEL_ID`
- `NEXT_PUBLIC_GOOGLE_TAG_ID`

## Déploiement

Voir `storefront/DEPLOY-EASYPANEL.md`.
