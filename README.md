# Belfast & the Causeway Coast — trip map

Eighteen food-and-drink places specific to Belfast and the Causeway Coast, on an
interactive map, filterable by **day of the trip** (Mon 27 → Fri 31 July 2026)
and by **activity type**. The point of the map is *what's open on the day I'm
standing here* — half the good places shut Sunday to Tuesday.

## Run it

No build step. Just open the file:

```
open index.html          # macOS
xdg-open index.html      # Linux
```

Or serve the folder (avoids any `file://` quirks on some phones):

```
python3 -m http.server 8000
# then visit http://localhost:8000 — or http://<your-laptop-ip>:8000 from your phone
```

Everything runs client-side. Leaflet is vendored under `vendor/`, so the app
loads with **no network at all**. Street tiles come from OpenStreetMap when
you're online; when you're not, the map falls back to a drawn Natural Earth
coastline, road network and town labels baked into `basemap.js` — enough to
stay oriented on a dead SIM in Bushmills. A small pill, bottom-left of the map,
tells you which you're on (`Streets` vs `Offline — drawn map`).

## Editing the data

All eighteen places live in **`data.js`** — one object each, with a five-state
day array `[Mon, Tue, Wed, Thu, Fri]` (`1` open · `0` closed · `2` unconfirmed
or booking/weather-dependent). Category labels and colours are the `CATS` map at
the top of the same file. Edit there; nothing else references the dataset.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app — markup, styles, map + filter logic |
| `data.js` | The eighteen places and the category definitions (edit this) |
| `basemap.js` | Generated offline fallback: `COAST`, `ROADS`, `ROADLABELS` |
| `build_basemap.py` | Regenerates `basemap.js` from Natural Earth (`pip install shapely`) |
| `vendor/` | Leaflet 1.9.4 (js, css, marker images), vendored for offline use |

### Regenerating the offline basemap

```
pip install shapely
python3 build_basemap.py > basemap.js
```

Produces `COAST` (NI + Ireland landmass, Lough Neagh, Upper Lough Erne),
`ROADS` (44 regional road segments) and `ROADLABELS` (A2, M2, A4). Natural Earth
tops out at regional roads — it has no street detail, and exists only as the
offline fallback beneath the real tiles.
