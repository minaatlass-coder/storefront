# Product photos

Drop real product photos here when you have them.

## Naming (obligatoire)

Use the product slug + extension — **exact filename**:

- `vitalstride.jpg` (or `.webp`)
- `restwave.jpg`
- `floraease.jpg`

The site already points to these paths in `src/data/products.ts`.  
**You only need to drop the file here** — no code change required.

If the file is missing, a colored placeholder with the product name is shown instead.

## Recommended specs

| Property | Value |
|---|---|
| Aspect | **1:1 (square)** — used in cards, drawer, PDP main image |
| Min size | 1200 × 1200 px |
| Format | WebP preferred, JPG fine |
| Background | Off-white or light sand (matches site palette) |
| Margin | ~12% padding around the bottle/box so it never gets cropped |
| Color profile | sRGB |

`next/image` handles resizing, AVIF/WebP encoding, and responsive `srcset` automatically.

## Wiring a photo

1. Drop the file in this folder, e.g. `public/products/vitalstride.jpg`.
2. Redeploy (or refresh locally). The photo appears on home, boutique, PDP, cart, etc.

Paths are already set in `src/data/products.ts` as `/products/{slug}.jpg`.

## Photos des 3 sections PDP (douleur / routine / confiance)

Sur chaque page produit, 3 blocs image + texte utilisent des fichiers dédiés :

| Section | Fichier suggéré |
|---------|-----------------|
| Douleur / problème | `{slug}-section-pain.jpg` |
| Routine | `{slug}-section-routine.jpg` |
| Qualité / confiance | `{slug}-section-trust.jpg` |

Exemple : `vitalstride-section-pain.jpg`, `restwave-section-routine.jpg`, etc.

Puis dans `src/data/product-sections.ts`, renseigner les chemins dans `productSectionImagePaths` :

```ts
vitalstride: {
  pain: "/products/vitalstride-section-pain.jpg",
  routine: "/products/vitalstride-section-routine.jpg",
  trust: "/products/vitalstride-section-trust.jpg",
},
```

Format conseillé : **4:5** (portrait) pour pain/routine, **5:4** (paysage) possible pour trust.

## Galleries (optional)

If you want multiple angles on the PDP:

```ts
image: "/products/vitalstride.jpg",
gallery: [
  "/products/vitalstride-side.jpg",
  "/products/vitalstride-ingredients.jpg",
  "/products/vitalstride-back.jpg",
],
```

The PDP currently shows 3 thumbnails of the main image; switching to use `gallery` is a small additional change when you're ready.
