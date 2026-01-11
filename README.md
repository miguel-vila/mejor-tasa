# MejorTasa

Comparador de tasas de crédito hipotecario en Colombia.

## Requisitos

- Node.js 20+
- pnpm 9+

## Instalación

```bash
pnpm install
pnpm --filter @mejor-tasa/core build
```

## Desarrollo

```bash
pnpm dev
```

Abre http://localhost:3000

## Actualizar tasas

```bash
pnpm update-rates
```

Esto ejecuta el ETL que descarga las tasas de los bancos y genera los archivos JSON en `data/`.

## Tests

```bash
pnpm test
```

## Build para producción

```bash
pnpm build
```

## Estructura

- `apps/web` - Frontend Next.js
- `packages/core` - Tipos y esquemas compartidos
- `packages/updater` - ETL/scraper de tasas
- `fixtures/` - HTML/PDFs de prueba por banco
- `data/` - JSON generados
