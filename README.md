# PIXELBUILD (Growtopia-style Web Game)

Browser-based 2D sandbox inspired by Growtopia, built with plain HTML/CSS/JavaScript and Firebase Realtime Database.

No server-side code is required for gameplay.

## Project Location

Main game files are in:

- `growtopia test/`

Entry file:

- `growtopia test/index.html`

## Features

- Account login/create (client + Firebase)
- Multiplayer worlds
- World lock ownership/admins
- World menu with occupancy
- Block place/break/rotate
- Seeds, trees, growth, harvesting, gems
- Inventory, dropped items, stacking
- Cosmetics (shirts/pants/hats/wings/swords)
- Chat, PMs, trade, friends
- Vending machines, donation boxes, storage chests
- Signs, doors, weather machines, cameras
- Admin panel, roles, commands, audit/logs
- Owner backup/restore system (including JSON import/export)

## Tech

- Vanilla JavaScript modules loaded in `index.html`
- Firebase Realtime Database
- Firebase App Check (optional if configured)
- Font Awesome icons

## Quick Start

1. Open `growtopia test/index.html` in a browser.
2. Configure Firebase:
   - Put config in `growtopia test/firebase-config.js`, or
   - Use runtime API key fetch if you already configured that flow.
3. Ensure Firebase Realtime Database rules allow your intended environment.
4. Create an account and start playing.

## Important Config Notes

- Base DB path is controlled by `SETTINGS.BASE_PATH`.
- Admin roles/permissions are controlled by:
  - `growtopia test/admin.js`
  - `growtopia test/settings.js`
- Asset version cache-busting uses `window.GT_ASSET_VERSION` in `index.html`.

## Owner Backup System

Owner-only actions in Admin panel:

- `Backup DB`
- `Restore Backup`
- `Download JSON`
- `Upload JSON`

Backups are stored under:

- `{BASE_PATH}/backups`

Restore keeps the `backups` tree intact.

## Controls (Default)

- Move: `A/D` or Arrow keys
- Jump: `W` or `Space`
- Chat: `Enter`
- Drop selected item: `Q`
- Place/Break: mouse/tap
- Rotate: right click (with fist)
- Slot quick select: `1` fist, `2` wrench

## Module Layout (high level)

- Core/game loop: `growtopia test/game.js`
- Database/auth helpers: `growtopia test/db.js`, `growtopia test/auth.js`
- Admin/commands: `growtopia test/admin.js`, `growtopia test/admins.js`, `growtopia test/commands.js`
- Sync: `growtopia test/sync_player.js`, `growtopia test/sync_blocks.js`, `growtopia test/sync_worlds.js`, `growtopia test/sync_hits.js`
- Gameplay systems: `vending.js`, `donation.js`, `chest.js`, `plants.js`, `trade.js`, `friends.js`, `shop.js`, `sign.js`
- Content definitions: `blocks.js`, `seeds.js`, `items.js`, `titles.js`, `clothes/*`
- Backups: `growtopia test/backup.js`

## Disclaimer

This is a fan-made project inspired by Growtopia and is not an official Ubisoft/Growtopia product.
