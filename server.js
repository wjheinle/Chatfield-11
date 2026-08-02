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
    { id: 'r1', name: 'The Lake House Kitchen & Tavern', category: 'Restaurant', notes: 'Lake views, patio dining, dog-friendly patio', addedBy: 'Seed', rating: 4.4 },
    { id: 'r2', name: 'Seagull\'s Restaurant', category: 'Restaurant', notes: 'Right at Chatfield Marina — closest option, counter service, lake/mountain views', addedBy: 'Seed', rating: 4.5 },
    { id: 'r3', name: 'Farm House Restaurant at Breckenridge Brewery', category: 'Brewery', notes: 'Outdoor beer garden, stage, games', addedBy: 'Seed', rating: 4.5 },
    { id: 'r4', name: 'Breckenridge Brewery', category: 'Brewery', notes: 'Along the river/bike trail, pet friendly', addedBy: 'Seed', rating: 4.3 },
    { id: 'r5', name: 'Angelo\'s Taverna - Littleton', category: 'Restaurant', notes: 'Italian, wood-fired pizza, oysters, popular', addedBy: 'Seed', rating: 4.6 },
    { id: 'r6', name: 'Lariat Lodge Brewing Company', category: 'Brewery', notes: 'Burgers, big beer list, deck', addedBy: 'Seed', rating: 4.4 },
    { id: 'r7', name: 'Homegrown Tap & Dough', category: 'Restaurant', notes: 'Pizza, arcade room, family friendly', addedBy: 'Seed', rating: 4.6 },
    { id: 'r8', name: 'Cafe Terracotta', category: 'Coffee/Cafe', notes: 'Coffee + full dinner menu, cozy historic building', addedBy: 'Seed', rating: 4.6 },
    { id: 'r9', name: 'Enchanted Grounds', category: 'Coffee/Cafe', notes: 'Coffee shop with games, breakfast burritos', addedBy: 'Seed', rating: 4.6 },
    { id: 'r10', name: 'Lost Coffee (Littleton Blvd)', category: 'Coffee/Cafe', notes: 'Great lattes, patio, dog friendly', addedBy: 'Seed', rating: 4.8 },
    { id: 'r11', name: 'Hearth Bakery & Cafe', category: 'Coffee/Cafe', notes: 'Bakery, breakfast sandwiches, dog friendly patio', addedBy: 'Seed', rating: 4.7 },
    { id: 'r12', name: 'Zymos Brewing', category: 'Brewery', notes: 'Small neighborhood brewery, highly rated', addedBy: 'Seed', rating: 4.9 },
    { id: 'r13', name: 'Littleton Brewing Company', category: 'Brewery', notes: 'Rooftop patio, sunset views, karaoke nights', addedBy: 'Seed', rating: 4.6 },
    { id: 'r14', name: 'Comet Brews', category: 'Brewery', notes: 'Small batch, cozy, downtown Littleton', addedBy: 'Seed', rating: 4.6 },
    { id: 'r15', name: 'Coal Mine Ave Brewing Company', category: 'Brewery', notes: 'Dog park on site, food trucks', addedBy: 'Seed', rating: 4.5 },
    { id: 'r16', name: 'Locavore Beer Works', category: 'Brewery', notes: 'Pinball, BBQ + Italian food delivery to table', addedBy: 'Seed', rating: 4.7 },
    { id: 'r17', name: 'Waterton Tavern', category: 'Restaurant', notes: 'Near Roxborough State Park, wings, pinball', addedBy: 'Seed', rating: 4.3 },
    { id: 'r18', name: 'NoNo\'s Cafe', category: 'Restaurant', notes: 'Cajun/Creole, brunch, gumbo', addedBy: 'Seed', rating: 4.6 },
    { id: 'r19', name: 'Smokin Fins - Highlands Ranch', category: 'Restaurant', notes: 'Seafood + sushi, oysters, patio', addedBy: 'Seed', rating: 4.4 },
    { id: 'r20', name: 'Lazy Dog Restaurant & Bar', category: 'Restaurant', notes: 'Big American menu, late hours, patio', addedBy: 'Seed', rating: 4.5 }
  ],
  links: [
    { id: 'l1', label: 'Chatfield State Park (CPW)', url: 'https://cpw.state.co.us/placestogo/parks/Chatfield', notes: 'Official park info, alerts, camping rules' },
    { id: 'l2', label: 'Chatfield Reservoir Lake Levels / Water Data', url: 'https://dwr.state.co.us/Tools/Stations', notes: 'CO Division of Water Resources gauge data' },
    { id: 'l3', label: 'Chatfield Marina', url: 'https://www.chatfieldmarina.com/', notes: 'Boat ramp status, fuel, rentals' },
    { id: 'l4', label: 'NOAA Weather - Chatfield/Littleton', url: 'https://forecast.weather.gov/', notes: 'Detailed hourly forecast' },
    { id: 'l5', label: 'Windy.com (wind/marine)', url: 'https://www.windy.com/', notes: 'Good for boating wind conditions' },
    { id: 'l6', label: 'CPW Camping Reservations', url: 'https://cpw.state.co.us/camping', notes: 'Reservation portal / site info' },
    { id: 'l7', label: 'Google Maps - Chatfield State Park', url: 'https://www.google.com/maps/place/Chatfield+State+Park', notes: 'Directions, campground map' }
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
  const { name, category, notes, addedBy } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  const item = {
    id: 'r' + Date.now(),
    name,
    category: category || 'Restaurant',
    notes: notes || '',
    addedBy: addedBy || 'Guest',
    rating: null
  };
  cache.restaurants.push(item);
  saveData(cache);
  res.json(item);
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
