# Webhook receiver — Google Sheet (Apps Script)

Le script versionné se trouve dans:

- `storefront/docs/google-sheet-webhook/Code.gs`
- `storefront/docs/google-sheet-webhook/orders-template.csv`
- `storefront/docs/google-sheet-webhook/contacts-template.csv`

## Événements gérés

- `order_created`: ajoute une ligne commande (avec `address`, `event_id`, UTM et IDs pub).
- `upsell_added`: met à jour la commande existante (upsell + total).
- `contact_message`: ajoute une ligne contact.

## Setup rapide

1. Créez une feuille Google.
2. Ouvrez **Extensions > Apps Script**.
3. Collez le contenu de `Code.gs`.
4. Déployez en **Web app** (`Execute as: Me`, `Who has access: Anyone`).
5. Récupérez l'URL `/exec` et placez-la dans:

```bash
ORDER_WEBHOOK_URL=https://script.google.com/macros/s/XXXXX/exec
IP_HASH_SALT=une_chaine_secrete_longue
```

## Colonnes importantes

La feuille commande inclut désormais:

- infos client: `name`, `address`, `phone_raw`, `phone_normalized`
- suivi commercial: `status`, `note`
- attribution marketing: `event_id`, `utm_*`, `fbp`, `fbc`, `ttclid`, `gclid`
- audit: `source`, `source_url`, `user_agent`, `referrer`, `ip_hash`

## Workflow call-center recommandé

Valeurs de `status`:

- `a_appeler`
- `confirme`
- `expedie`
- `livre`
- `refuse`
- `injoignable`
- `annule`

## Note

Si vous mettez à jour `Code.gs`, redéployez une nouvelle version depuis **Manage deployments**.
