# Webhook receiver — Google Sheet (Apps Script)

Le script versionné se trouve dans:

- `storefront/docs/google-sheet-webhook/Code.gs`
- `storefront/docs/google-sheet-webhook/orders-template.csv`
- `storefront/docs/google-sheet-webhook/contacts-template.csv`
- `storefront/docs/google-sheet-webhook/products-template.csv`

## Événements gérés

- `order_created`: ajoute une ligne commande (avec `address`, `event_id`, UTM et IDs pub).
- `upsell_added`: met à jour la commande existante (upsell + total).
- `contact_message`: ajoute une ligne contact.
- `products_seed`: remplit l'onglet **Products** avec les 3 produits du store.
- `products_upsert`: ajoute ou met à jour un ou plusieurs produits (par `sku`).

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

Si le script n'est pas ouvert depuis **Extensions > Apps Script** dans la feuille Orders, renseignez `SPREADSHEET_ID` en haut de `Code.gs`. Après chaque modification de `Code.gs`, créez une nouvelle version dans **Manage deployments** puis redéployez la Web App.

## Colonnes importantes

La feuille commande inclut désormais:

- infos client: `name`, `address`, `phone_raw`, `phone_normalized`
- suivi commercial: `status`, `note`, `tracking_number`
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

## Catalogue Products (3 produits)

1. Collez le `Code.gs` mis à jour dans Apps Script.
2. **Déployer** (ou redéployer) la Web App.
3. Choisissez une méthode :

**Depuis Google Sheet** (le plus simple) :

- Rechargez la feuille → menu **Sahhaonline** → **Remplir catalogue Products (3 produits)**

**Depuis le navigateur** (URL Web App) :

```text
https://script.google.com/macros/s/XXXXX/exec?action=seed_products
```

**Depuis une requête POST** :

```json
{ "event": "products_seed" }
```

L'onglet **Products** est créé automatiquement avec les colonnes : `sku`, `name_fr`, prix MAD, ingrédients, usage, etc.

## Note

Si vous mettez à jour `Code.gs`, redéployez une nouvelle version depuis **Manage deployments**.
