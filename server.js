const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = process.env.RAILWAY_VOLUME_MOUNT_PATH || path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'trip-data.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DEFAULTS = {
  restaurants: [
    { id: 'r1', name: 'Seagull\'s Restaurant', category: 'Restaurant', notes: 'Right at Chatfield Marina — closest option, counter service, lake/mountain views', addedBy: 'Seed', rating: null, lat: 39.54447126161328, lng: -105.0608122927029, menuUrl: 'http://chatfield-marina.com/', isGoldenTee: false },
    { id: 'r2', name: 'Atlas Coffee | Salta', category: 'Coffee/Cafe', notes: '', addedBy: 'Seed', rating: null, lat: 39.506880873514554, lng: -105.03712334522874, menuUrl: 'http://www.atlascoffees.com/menu-1', isGoldenTee: false },
    { id: 'r3', name: 'Living The Dream Taproom at Sterling Ranch', category: 'Brewery', notes: '', addedBy: 'Seed', rating: null, lat: 39.50687399209698, lng: -105.0374366145683, menuUrl: 'https://livingthedreambrewing.com/', isGoldenTee: false },
    { id: 'r4', name: 'Waterton Tavern', category: 'Restaurant', notes: '', addedBy: 'Seed', rating: null, lat: 39.48468032611802, lng: -105.07488057613945, menuUrl: 'http://www.watertontavern.com/', isGoldenTee: true },
    { id: 'r5', name: 'Starbucks', category: 'Coffee/Cafe', notes: '', addedBy: 'Seed', rating: null, lat: 39.48500006678508, lng: -105.07463199200244, menuUrl: 'https://www.starbucks.com', isGoldenTee: false },
    { id: 'r6', name: 'JP\'s Asian Bistro', category: 'Restaurant', notes: '', addedBy: 'Seed', rating: null, lat: 39.48304289734905, lng: -105.07401285695921, menuUrl: 'https://jpsasianbistro.getbento.com/online-ordering/jps-asian-bistro/menu', isGoldenTee: false },
    { id: 'r7', name: 'Domino\'s', category: 'Restaurant', notes: '', addedBy: 'Seed', rating: null, lat: 39.48345795163097, lng: -105.07537315801693, menuUrl: 'https://www.dominos.com/en/?utm_source=google&utm_medium=loclist&utm_campaign=localmaps', isGoldenTee: false },
    { id: 'r8', name: 'Asian Spice', category: 'Restaurant', notes: '', addedBy: 'Seed', rating: null, lat: 39.56689616352093, lng: -105.08095147584837, menuUrl: 'http://asianspicelittleton.com/', isGoldenTee: false },
    { id: 'r9', name: 'Hogback BBQ & Grill', category: 'Restaurant', notes: '', addedBy: 'Seed', rating: null, lat: 39.57364116542723, lng: -105.05606141703639, menuUrl: 'https://hogbackbbq.com/littleton-hogback-bbq-and-grill-food-menu', isGoldenTee: false },
    { id: 'r10', name: 'Texas Roadhouse', category: 'Restaurant', notes: '', addedBy: 'Seed', rating: null, lat: 39.563007944945134, lng: -105.11196702941392, menuUrl: 'https://www.texasroadhouse.com/location/170-littletonco/detail/action/waitlist', isGoldenTee: false },
    { id: 'r11', name: 'Wide Open Saloon', category: 'Restaurant', notes: '', addedBy: 'Seed', rating: null, lat: 39.43891981941245, lng: -104.96151111507154, menuUrl: 'http://wideopensaloon.com/', isGoldenTee: false },
    { id: 'r12', name: 'Bud\'s Bar', category: 'Restaurant', notes: '', addedBy: 'Seed', rating: null, lat: 39.437473215315116, lng: -104.96266491092057, menuUrl: 'https://buds-cafe-bar.placeid.site/', isGoldenTee: false },
    { id: 'r13', name: 'O\'Brien\'s Cafe', category: 'Restaurant', notes: '', addedBy: 'Seed', rating: null, lat: 39.43815851608194, lng: -104.95892289659376, menuUrl: null, isGoldenTee: false },
    { id: 'r14', name: 'El Mesón | Mexican Restaurant', category: 'Restaurant', notes: '', addedBy: 'Seed', rating: null, lat: 39.54738778043553, lng: -105.03440921061029, menuUrl: 'https://mesonhighlandsranch.com/menu/', isGoldenTee: false },
    { id: 'r15', name: 'Platte River Bar and Grill', category: 'Restaurant', notes: '', addedBy: 'Seed', rating: null, lat: 39.607878670776586, lng: -105.02145459868441, menuUrl: 'http://www.theplatteriverbarandgrill.com/', isGoldenTee: true },
    { id: 'r16', name: 'Breckenridge Brewery', category: 'Brewery', notes: '', addedBy: 'Seed', rating: null, lat: 39.59366279976414, lng: -105.02510768038447, menuUrl: 'https://www.breckbrew.com/visit/littleton/food/', isGoldenTee: false }
  ],
  links: [
    { id: 'l1', label: 'Chatfield State Park (CPW)', url: 'https://cpw.state.co.us/placestogo/parks/Chatfield', notes: 'Official park info, alerts, camping rules' },
    { id: 'l2', label: 'Chatfield Reservoir Lake Levels', url: 'https://dwr.state.co.us/Tools/Stations/CHARESCO?params=ELEV', notes: 'CO Division of Water Resources — live gauge data for Chatfield' },
    { id: 'l3', label: 'Chatfield Marina', url: 'https://www.chatfieldmarina.com/', notes: 'Boat ramp status, fuel, rentals' },
    { id: 'l4', label: 'NOAA Weather - Chatfield/Littleton', url: 'https://forecast.weather.gov/', notes: 'Detailed hourly forecast' },
    { id: 'l5', label: 'Windy.com (wind/marine)', url: 'https://www.windy.com/', notes: 'Good for boating wind conditions' },
    { id: 'l6', label: 'CPW Camping Reservations', url: 'https://cpw.state.co.us/camping', notes: 'Reservation portal / site info' },
    { id: 'l7', label: 'Google Maps - Chatfield State Park', url: 'https://www.google.com/maps/place/Chatfield+State+Park', notes: 'Directions, campground map' },
    { id: 'l8', label: 'Golden Tee Locations', url: 'https://livewire.itsgames.com/find_a_game', notes: 'Find nearby Golden Tee machines — Waterton Tavern & Platte River Bar and Grill both have one' }
  ],
  packing: [],
  events: [
    { id: 'e1', date: '2026-08-16', title: "Hailey's college friends visiting", notes: 'Group of Hailey\'s college friends joining for the day', addedBy: 'Seed' }
  ],
  meta: {
    tripName: 'Chatfield 2026',
    checkIn: '2026-08-12',
    checkOut: '2026-08-23',
    crew: [
      { name: 'Bill', family: 'Heinlein' },
      { name: 'Melissa', family: 'Heinlein' },
      { name: 'Marc', family: 'Marc\'s Family' }
    ]
  }
};

function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULTS, null, 2));
    return JSON.parse(JSON.stringify(DEFAULTS));
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    let changed = false;

    for (const key of Object.keys(DEFAULTS)) {
      if (!(key in parsed)) {
        parsed[key] = DEFAULTS[key];
        changed = true;
      }
    }

    // Seeded lists (restaurants, links) should never sit empty if we shipped
    // starter data for them — refill if the array exists but has nothing in it.
    const seededArrayKeys = ['restaurants', 'links'];
    for (const key of seededArrayKeys) {
      if (Array.isArray(parsed[key]) && parsed[key].length === 0 && DEFAULTS[key].length > 0) {
        parsed[key] = JSON.parse(JSON.stringify(DEFAULTS[key]));
        changed = true;
        console.log(`Refilled empty "${key}" with seed data`);
      }
    }

    // ONE-TIME RESEED (2026-08-03): the restaurant list was fully replaced with
    // Bill's curated spreadsheet, and the same r1..r16 ids now point at different
    // places than before. Detect the stale, pre-reseed dataset by its old
    // signature (it never had isGoldenTee) and replace seeded rows wholesale —
    // but keep every guest-added restaurant (non-'Seed' addedBy) exactly as is.
    if (Array.isArray(parsed.restaurants)) {
      const looksLikeOldSeed = parsed.restaurants.some(
        r => r.addedBy === 'Seed' && r.isGoldenTee === undefined
      );
      if (looksLikeOldSeed) {
        const guestKept = parsed.restaurants.filter(r => r.addedBy !== 'Seed');
        parsed.restaurants = [...JSON.parse(JSON.stringify(DEFAULTS.restaurants)), ...guestKept];
        changed = true;
        console.log(`Reseeded restaurants list (old seed detected) — kept ${guestKept.length} guest-added place(s)`);
      } else {
        // Already on the current seed generation — just backfill any fields
        // that predate a later field addition, matched by id, without
        // touching guest-added entries.
        const defaultsById = {};
        for (const d of DEFAULTS.restaurants) defaultsById[d.id] = d;
        for (const r of parsed.restaurants) {
          if (r.addedBy !== 'Seed') continue;
          const seedMatch = defaultsById[r.id];
          if (!seedMatch) continue;
          if ((r.lat === undefined || r.lat === null) && typeof seedMatch.lat === 'number') {
            r.lat = seedMatch.lat;
            r.lng = seedMatch.lng;
            changed = true;
          }
          if (!r.menuUrl && seedMatch.menuUrl) {
            r.menuUrl = seedMatch.menuUrl;
            changed = true;
          }
          if (r.isGoldenTee === undefined) {
            r.isGoldenTee = !!seedMatch.isGoldenTee;
            changed = true;
          }
        }
        const existingIds = new Set(parsed.restaurants.map(r => r.id));
        for (const d of DEFAULTS.restaurants) {
          if (!existingIds.has(d.id)) {
            parsed.restaurants.push(JSON.parse(JSON.stringify(d)));
            changed = true;
            console.log(`Added new seed restaurant "${d.name}"`);
          }
        }
      }
    }

    // Also refresh links whose id/label matches a known seed link but whose
    // URL is stale (e.g. the lake-level link narrowed to the Chatfield gauge).
    if (Array.isArray(parsed.links)) {
      const defaultLinksById = {};
      for (const d of DEFAULTS.links) defaultLinksById[d.id] = d;
      for (const l of parsed.links) {
        const seedMatch = defaultLinksById[l.id];
        if (seedMatch && l.url !== seedMatch.url && l.label === seedMatch.label) {
          l.url = seedMatch.url;
          l.notes = seedMatch.notes;
          changed = true;
        }
      }
      const existingLinkIds = new Set(parsed.links.map(l => l.id));
      for (const d of DEFAULTS.links) {
        if (!existingLinkIds.has(d.id)) {
          parsed.links.push(JSON.parse(JSON.stringify(d)));
          changed = true;
          console.log(`Added new seed link "${d.label}"`);
        }
      }
    }

    if (changed) fs.writeFileSync(DATA_FILE, JSON.stringify(parsed, null, 2));
    return parsed;
  } catch (e) {
    console.error('Failed to parse data file, resetting to defaults', e);
    fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULTS, null, 2));
    return JSON.parse(JSON.stringify(DEFAULTS));
  }
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

let cache = loadData();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => {
  res.json({ ok: true, dataFile: DATA_FILE });
});

app.get('/api/data', (req, res) => {
  res.json(cache);
});

app.post('/api/restaurants', (req, res) => {
  const { name, category, notes, addedBy, lat, lng, menuUrl, isGoldenTee } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  const item = {
    id: 'r' + Date.now(),
    name,
    category: category || 'Restaurant',
    notes: notes || '',
    addedBy: addedBy || 'Guest',
    rating: null,
    lat: typeof lat === 'number' ? lat : null,
    lng: typeof lng === 'number' ? lng : null,
    menuUrl: typeof menuUrl === 'string' && menuUrl.trim() ? menuUrl.trim() : null,
    isGoldenTee: !!isGoldenTee
  };
  cache.restaurants.push(item);
  saveData(cache);
  res.json(item);
});

app.put('/api/restaurants/:id', (req, res) => {
  const r = cache.restaurants.find(x => x.id === req.params.id);
  if (!r) return res.status(404).json({ error: 'not found' });
  const { menuUrl, isGoldenTee } = req.body;
  if (typeof menuUrl === 'string') r.menuUrl = menuUrl.trim() || null;
  if (typeof isGoldenTee === 'boolean') r.isGoldenTee = isGoldenTee;
  saveData(cache);
  res.json(r);
});

app.delete('/api/restaurants/:id', (req, res) => {
  cache.restaurants = cache.restaurants.filter(r => r.id !== req.params.id);
  saveData(cache);
  res.json({ ok: true });
});

app.post('/api/links', (req, res) => {
  const { label, url, notes } = req.body;
  if (!label || !url) return res.status(400).json({ error: 'label and url required' });
  const item = { id: 'l' + Date.now(), label, url, notes: notes || '' };
  cache.links.push(item);
  saveData(cache);
  res.json(item);
});

app.delete('/api/links/:id', (req, res) => {
  cache.links = cache.links.filter(l => l.id !== req.params.id);
  saveData(cache);
  res.json({ ok: true });
});

app.post('/api/packing', (req, res) => {
  const { item, addedBy } = req.body;
  if (!item) return res.status(400).json({ error: 'item required' });
  const newItem = { id: 'p' + Date.now(), item, addedBy: addedBy || 'Guest', checked: false };
  cache.packing.push(newItem);
  saveData(cache);
  res.json(newItem);
});

app.put('/api/packing/:id', (req, res) => {
  const p = cache.packing.find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: 'not found' });
  if (typeof req.body.checked === 'boolean') p.checked = req.body.checked;
  saveData(cache);
  res.json(p);
});

app.delete('/api/packing/:id', (req, res) => {
  cache.packing = cache.packing.filter(p => p.id !== req.params.id);
  saveData(cache);
  res.json({ ok: true });
});

app.post('/api/events', (req, res) => {
  const { date, title, notes, addedBy } = req.body;
  if (!date || !title) return res.status(400).json({ error: 'date and title required' });
  const item = { id: 'e' + Date.now(), date, title, notes: notes || '', addedBy: addedBy || 'Guest' };
  cache.events.push(item);
  saveData(cache);
  res.json(item);
});

app.put('/api/events/:id', (req, res) => {
  const e = cache.events.find(x => x.id === req.params.id);
  if (!e) return res.status(404).json({ error: 'not found' });
  const { date, title, notes } = req.body;
  if (date !== undefined) e.date = date;
  if (title !== undefined) e.title = title;
  if (notes !== undefined) e.notes = notes;
  saveData(cache);
  res.json(e);
});

app.delete('/api/events/:id', (req, res) => {
  cache.events = cache.events.filter(e => e.id !== req.params.id);
  saveData(cache);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Chatfield 2026 app listening on port ${PORT}`);
  console.log(`Data file: ${DATA_FILE}`);
});
