#!/usr/bin/env python3
"""
Regenerates the offline fallback basemap embedded in the Belfast trip map.

Produces the COAST and ROADS constants: a clipped, simplified coastline of
Northern Ireland (plus Lough Neagh and the border with the Republic) and the
regional road network. Source is Natural Earth, which is public domain.

    pip install shapely
    python3 build_basemap.py > basemap.js

Note: Natural Earth tops out at regional roads (motorway / primary / secondary).
It has no street-level geometry. This layer exists only as a fallback for when
real street tiles are unreachable — it is not a substitute for them.
"""
import json
import urllib.request
from shapely.geometry import shape, box, mapping

BBOX = box(-7.65, 54.15, -5.15, 55.60)   # Belfast through to Portstewart
NE = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/"
TOL = 0.0012                              # ~130m; plenty at zoom 8-12


def fetch(name):
    with urllib.request.urlopen(NE + name, timeout=180) as r:
        return json.load(r)


def rnd(o, nd=4):
    if isinstance(o, (list, tuple)):
        if o and isinstance(o[0], (int, float)):
            return [round(float(c), nd) for c in o]
        return [rnd(x, nd) for x in o]
    return o


def clipped(geom, tol=TOL):
    # buffer(0) is a polygon self-intersection cleanup; on lines it collapses
    # to empty (zero area), so only apply it to polygonal geometry.
    if geom.geom_type in ("Polygon", "MultiPolygon"):
        geom = geom.buffer(0)
    g = geom.intersection(BBOX)
    if g.is_empty:
        return None
    m = mapping(g.simplify(tol, preserve_topology=True))
    m['coordinates'] = rnd(m['coordinates'])
    return m


def build_coast():
    feats = []
    for f in fetch("ne_10m_admin_0_countries.geojson")['features']:
        name = f['properties'].get('ADMIN')
        if name in {"United Kingdom", "Ireland"}:
            g = clipped(shape(f['geometry']))
            if g:
                feats.append({"type": "Feature",
                              "properties": {"kind": "land", "name": name},
                              "geometry": g})
    for f in fetch("ne_10m_lakes.geojson")['features']:
        name = f['properties'].get('name') or ''
        if 'Neagh' in name or 'Erne' in name:
            g = clipped(shape(f['geometry']))
            if g:
                feats.append({"type": "Feature",
                              "properties": {"kind": "water", "name": name},
                              "geometry": g})
    return {"type": "FeatureCollection", "features": feats}


def build_roads():
    feats, longest = [], {}
    rank = {"Major Highway": 1, "Secondary Highway": 2}
    for f in fetch("ne_10m_roads.geojson")['features']:
        p = f['properties']
        if p.get('type') == 'Ferry Route':
            continue
        geom = shape(f['geometry'])
        if not geom.intersects(BBOX):
            continue
        g = clipped(geom, 0.0015)
        if not g:
            continue
        feats.append({"type": "Feature",
                      "properties": {"r": rank.get(p.get('type'), 3),
                                     "n": p.get('label') or ""},
                      "geometry": g})
        label = (p.get('label') or '').strip()
        if label:
            seg = geom.intersection(BBOX)
            if label not in longest or seg.length > longest[label][0]:
                longest[label] = (seg.length, seg)

    labels = []
    for name in ("A2", "M2", "A4"):           # the roads that matter for this trip
        if name in longest:
            pt = longest[name][1].interpolate(0.5, normalized=True)
            labels.append({"n": name, "lat": round(pt.y, 4), "lng": round(pt.x, 4)})
    return {"type": "FeatureCollection", "features": feats}, labels


if __name__ == "__main__":
    coast = build_coast()
    roads, labels = build_roads()
    d = lambda o: json.dumps(o, separators=(',', ':'))
    print("const COAST = %s;" % d(coast))
    print("const ROADS = %s;" % d(roads))
    print("const ROADLABELS = %s;" % d(labels))
