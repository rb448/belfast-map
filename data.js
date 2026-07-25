/* ---------------------------------------------------------------------------
   Belfast trip data — edit here, in one place.

   Categories and their colours, then the eighteen places. Each place carries a
   five-state day array indexed [Mon 27, Tue 28, Wed 29, Thu 30, Fri 31]:
       1 = open
       0 = closed
       2 = unconfirmed, or depends on booking / weather
   Coordinates came from Google Places and are accurate — don't adjust them.
--------------------------------------------------------------------------- */

const CATS = {
  meal:   {label:"Sit-down meal",           color:"#D6564A"},
  pub:    {label:"Pub & trad session",      color:"#EFB01F"},
  still:  {label:"Distillery & brewery",    color:"#4FB3A5"},
  market: {label:"Market & makers",         color:"#8C7BD6"},
  air:    {label:"Outdoors & on the water", color:"#4A90D9"}
};

// day arrays are [Mon27, Tue28, Wed29, Thu30, Fri31]
// 1 = open, 0 = closed, 2 = unconfirmed / booking-dependent
const PLACES = [
  {
    name:"Holohan's at the Barge", cat:"meal",
    lat:54.5972157, lng:-5.9210473,
    days:[2,2,1,1,1],
    why:"Dinner on a moored coal barge on the Lagan, serving boxty — the potato pancake born of Ulster poorhouse cooking.",
    cost:"££", area:"Lanyon Quay", baby:"Pram tight",
    flag:"Book ahead — few seats aboard",
    tel:"+442890235973",
    url:"https://wanderlog.com/place/details/485766/holohans-at-the-barge"
  },
  {
    name:"St George's Market", cat:"market",
    lat:54.5961402, lng:-5.9219548,
    days:[0,0,0,0,1],
    why:"Ireland's last Victorian covered market. Get the Belfast Bap — a Famine-era bread invented here in the 1840s.",
    cost:"Free entry", area:"East Bridge St", baby:"Pram-friendly",
    flag:"Friday only, 8am–2pm",
    url:"https://www.belfastcity.gov.uk/Things-to-Do/Markets/St-George-s-Market/Information-about-St-George-s-Market"
  },
  {
    name:"McConnell's Distillery, Crumlin Road Gaol", cat:"still",
    lat:54.6089559, lng:-5.9423649,
    days:[1,1,1,1,1],
    why:"Three copper stills inside the restored A-Wing of a Victorian prison. Cuffs restaurant on site puts diners in old cells.",
    cost:"~£25 tour", area:"Crumlin Rd", baby:"Pram OK on site · 18+ tasting",
    flag:"Free parking · open all five days",
    url:"https://mcconnellsirishwhisky.com/tours/"
  },
  {
    name:"Kelly's Cellars", cat:"pub",
    lat:54.5994941, lng:-5.9321271,
    days:[1,1,1,1,1],
    why:"On the TradFest free session trail all week. One of the oldest pubs in the city.",
    cost:"£", area:"Bank St", baby:"Packed evenings",
    flag:"Free trad sessions 26 Jul–2 Aug",
    url:"https://www.xsnoize.com/belfast-tradfest-2026-programme/"
  },
  {
    name:"Madden's", cat:"pub",
    lat:54.600101, lng:-5.9337168,
    days:[1,1,1,1,1],
    why:"Small room, huge personality, and a TradFest session venue. Order in Irish and the locals warm up fast.",
    cost:"£", area:"Berry St", baby:"Fills quickly",
    flag:"Free trad sessions this week",
    url:"https://www.xsnoize.com/belfast-tradfest-2026-programme/"
  },
  {
    name:"The Garrick", cat:"pub",
    lat:54.5973352, lng:-5.9266596,
    days:[1,1,1,1,1],
    why:"TradFest session pub that also does bangers and champ — the buttered scallion mash you won't find at home.",
    cost:"££", area:"Chichester St", baby:"Daytime fine",
    flag:"Free trad sessions this week",
    url:"https://www.xsnoize.com/belfast-tradfest-2026-programme/"
  },
  {
    name:"The American Bar", cat:"pub",
    lat:54.6085451, lng:-5.9200405,
    days:[1,1,1,1,1],
    why:"Old Sailortown dock pub near the ferry terminals, on the TradFest trail. Kitchen stops around 7pm.",
    cost:"£", area:"Dock St", baby:"Quiet early",
    flag:"Free trad sessions this week",
    url:"https://www.xsnoize.com/belfast-tradfest-2026-programme/"
  },
  {
    name:"The Crown Liquor Saloon", cat:"pub",
    lat:54.5947018, lng:-5.9341146,
    days:[1,1,1,1,1],
    why:"The only pub owned by the National Trust — an intact 1885 gin palace with ten snugs, gas lamps and gunmetal match strikes.",
    cost:"££", area:"Great Victoria St", baby:"Upstairs, out by 9pm",
    flag:"Snugs fill fast — go off-peak",
    url:"https://www.belfastentries.com/places/crown/"
  },
  {
    name:"Bullhouse East", cat:"still",
    lat:54.5977952, lng:-5.8891661,
    days:[1,1,1,1,1],
    why:"Belfast's first permanent brewery taproom. Twenty taps, wood-fired pizza, heated garden — kids and dogs welcome.",
    cost:"££", area:"Newtownards Rd", baby:"Family-friendly till 9pm",
    flag:"Walk-in · open all five days",
    url:"https://bullhousebrewco.com/pages/bullhouse-east"
  },
  {
    name:"Boundary Brewery", cat:"still",
    lat:54.5984506, lng:-5.8943102,
    days:[0,1,1,1,1],
    why:"Member-owned co-op brewery with 2,000+ shareholders, in an old spinning mill. Walkable from Bullhouse.",
    cost:"£", area:"Newtownards Rd", baby:"Kids and dogs welcome",
    flag:"Closed Monday · opens 4pm Tue–Thu",
    url:"https://boundarybrewing.coop/pages/taproom"
  },
  {
    name:"John Long's", cat:"meal",
    lat:54.5961964, lng:-5.9374968,
    days:[0,1,1,1,1],
    why:"Chipper since 1914. Order a pastie supper — the Belfast pastie is a battered patty of mince and potato, nothing like the Cornish kind.",
    cost:"£", area:"Athol St", baby:"Casual, tight seating",
    flag:"Closed Monday · often sells out early",
    url:"https://www.johnlongs.com/"
  },
  {
    name:"Aunt Sandra's Candy Factory", cat:"market",
    lat:54.5981581, lng:-5.8878073,
    days:[0,1,1,1,1],
    why:"Handmade yellowman and honeycomb to 1953 recipes, made in front of you in a working candy kitchen.",
    cost:"£ · ~£8 show", area:"Holywood Rd", baby:"Great with children",
    flag:"Closed Monday · live shows weekends only",
    url:"https://auntsandras.com/"
  },
  {
    name:"Van Morrison Trail & C.S. Lewis Square", cat:"air",
    lat:54.5980429, lng:-5.8911853,
    days:[1,1,1,1,1],
    why:"3.5km self-guided walk through the streets that shaped Astral Weeks, ending at a square of Narnia bronzes. £1 map from the visitor centre.",
    cost:"£1 map", area:"East Belfast", baby:"Flat, pram-friendly",
    flag:"Pairs with Bullhouse and Boundary",
    url:"https://www.visiteastside.com/listing/van-morrison-trail"
  },
  {
    name:"Cyprus Avenue", cat:"meal",
    lat:54.5961472, lng:-5.8755534,
    days:[2,2,2,2,2],
    why:"The restaurant named for Van Morrison's song, on the avenue itself.",
    cost:"££", area:"Upper Newtownards Rd", baby:"Family restaurant",
    flag:"Status disputed — reported closed Jan 2026. Call first",
    url:"https://www.visiteastside.com/listing/van-morrison-trail"
  },
  {
    name:"Old Bushmills Distillery", cat:"still",
    lat:55.2028537, lng:-6.5172267,
    days:[1,1,1,1,1],
    why:"Licensed since 1608 — the oldest in the world. Walk the working floor from milling to maturation.",
    cost:"From ~£20", area:"Bushmills · 1hr drive", baby:"Pram OK · cashless site",
    flag:"Book tickets in advance",
    url:"https://www.theoldbushmillsbarn.com/restaurants-in-bushmills"
  },
  {
    name:"Causeway Boats — Catch Your Breakfast", cat:"air",
    lat:55.2070854, lng:-6.6583284,
    days:[2,2,2,2,2],
    why:"Leave Portrush harbour at 7am, fish the Atlantic as the sun comes up over Dunluce Castle, then a chef cooks your catch.",
    cost:"£50–75pp", area:"Portrush North Pier", baby:"Not suitable for an infant",
    flag:"Tide and weather dependent — book ahead",
    url:"https://causewayboats.com/tour/sunrise-catch-your-breakfast-food-tour/"
  },
  {
    name:"Catch and Sea — Portstewart", cat:"air",
    lat:55.1871101, lng:-6.7207214,
    days:[2,2,2,2,2],
    why:"The other version of the same idea: catch and fillet your own fish, cooked with award-winning Causeway produce.",
    cost:"£50–75pp", area:"Portstewart Harbour", baby:"Not suitable for an infant",
    flag:"Small boat — sells out",
    url:"https://causewaycoastfoodietours.com/catch-and-sea/"
  },
  {
    name:"Broughgammon Farm", cat:"meal",
    lat:55.202349, lng:-6.343295,
    days:[0,0,0,0,1],
    why:"Ethical rare-meat farm — cabrito goat and rose veal — with a farm-shop café and monthly supper clubs.",
    cost:"££", area:"Ballycastle · Causeway route", baby:"Kids love the goats",
    flag:"Café Fri–Sun only, 11am–4pm",
    url:"https://broughgammon.com/supper-club-events/"
  }
];
