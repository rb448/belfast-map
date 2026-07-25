/* ---------------------------------------------------------------------------
   Belfast + Dublin trip data — edit here, in one place.

   Two legs, two map "views": Belfast & the Causeway Coast (Mon 27–Fri 31 Jul),
   and Dublin & Wicklow (Sat 1–Tue 4 Aug, the August bank-holiday weekend).

   Each place carries a day array matching its leg's day count:
     Belfast → [Mon 27, Tue 28, Wed 29, Thu 30, Fri 31]   (5 days)
     Dublin  → [Sat 1, Sun 2, Mon 3, Tue 4]               (4 days)
   with states: 1 = open, 0 = closed, 2 = unconfirmed / booking- or weather-
   dependent. Coordinates came from Google Places / venue listings.

   Operating days verified July 2026; venues with disputed/unclear hours use
   state 2 and say so in the flag. Ring ahead — festival + bank-holiday week
   shifts hours.
--------------------------------------------------------------------------- */

const CATS = {
  meal:   {label:"Sit-down meal",           color:"#D6564A"},
  pub:    {label:"Pub & trad session",      color:"#EFB01F"},
  still:  {label:"Distillery & brewery",    color:"#4FB3A5"},
  market: {label:"Market & makers",         color:"#8C7BD6"},
  air:    {label:"Outdoors & on the water", color:"#4A90D9"},
  see:    {label:"Sights & heritage",       color:"#D98A3D"}
};

/* =========================== BELFAST leg =========================== */
// day arrays are [Mon27, Tue28, Wed29, Thu30, Fri31]
const PLACES_BELFAST = [
  {
    name:"Holohan's Pantry", cat:"meal",
    lat:54.5861332, lng:-5.9363915, days:[1,1,1,1,1],
    why:"Belfast's only dedicated Irish restaurant. Still the place for boxty — the potato pancake born of Ulster poorhouse cooking. Family-run; absorbed their floating restaurant when it closed.",
    cost:"££", area:"Queen's Quarter", baby:"Small room — book and flag the pram",
    flag:"Wed opens 4pm · booking advised", tel:"+442890291103",
    url:"https://wanderlog.com/place/details/856371/holohans-pantry"
  },
  {
    name:"St George's Market", cat:"market",
    lat:54.5961402, lng:-5.9219548, days:[0,0,0,0,1],
    why:"Ireland's last Victorian covered market. Get the Belfast Bap — a Famine-era bread invented here in the 1840s.",
    cost:"Free entry", area:"East Bridge St", baby:"Pram-friendly",
    flag:"Friday only, 8am–2pm",
    url:"https://www.belfastcity.gov.uk/Things-to-Do/Markets/St-George-s-Market/Information-about-St-George-s-Market"
  },
  {
    name:"McConnell's Distillery, Crumlin Road Gaol", cat:"still",
    lat:54.6089559, lng:-5.9423649, days:[1,1,1,1,1],
    why:"Three copper stills inside the restored A-Wing of a Victorian prison. Cuffs restaurant on site puts diners in old cells.",
    cost:"~£25 tour", area:"Crumlin Rd", baby:"Pram OK on site · 18+ tasting",
    flag:"Free parking · open all five days",
    url:"https://mcconnellsirishwhisky.com/tours/"
  },
  {
    name:"Kelly's Cellars", cat:"pub",
    lat:54.5994941, lng:-5.9321271, days:[1,1,1,1,1],
    why:"On the TradFest free session trail all week. One of the oldest pubs in the city.",
    cost:"£", area:"Bank St", baby:"Packed evenings",
    flag:"Free trad sessions 26 Jul–2 Aug",
    url:"https://www.xsnoize.com/belfast-tradfest-2026-programme/"
  },
  {
    name:"Madden's", cat:"pub",
    lat:54.600101, lng:-5.9337168, days:[1,1,1,1,1],
    why:"Small room, huge personality, and a TradFest session venue. Order in Irish and the locals warm up fast.",
    cost:"£", area:"Berry St", baby:"Fills quickly",
    flag:"Free trad sessions this week",
    url:"https://www.xsnoize.com/belfast-tradfest-2026-programme/"
  },
  {
    name:"The Garrick", cat:"pub",
    lat:54.5973352, lng:-5.9266596, days:[1,1,1,1,1],
    why:"TradFest session pub that also does bangers and champ — the buttered scallion mash you won't find at home.",
    cost:"££", area:"Chichester St", baby:"Daytime fine",
    flag:"Free trad sessions this week",
    url:"https://www.xsnoize.com/belfast-tradfest-2026-programme/"
  },
  {
    name:"The American Bar", cat:"pub",
    lat:54.6085451, lng:-5.9200405, days:[1,1,1,1,1],
    why:"Old Sailortown dock pub near the ferry terminals, on the TradFest trail. Kitchen stops around 7pm.",
    cost:"£", area:"Dock St", baby:"Quiet early",
    flag:"Free trad sessions this week",
    url:"https://www.xsnoize.com/belfast-tradfest-2026-programme/"
  },
  {
    name:"The Crown Liquor Saloon", cat:"pub",
    lat:54.5947018, lng:-5.9341146, days:[1,1,1,1,1],
    why:"The only pub owned by the National Trust — an intact 1885 gin palace with ten snugs, gas lamps and gunmetal match strikes.",
    cost:"££", area:"Great Victoria St", baby:"Upstairs, out by 9pm",
    flag:"Snugs fill fast — go off-peak",
    url:"https://www.belfastentries.com/places/crown/"
  },
  {
    name:"Bullhouse East", cat:"still",
    lat:54.5977952, lng:-5.8891661, days:[1,1,1,1,1],
    why:"Belfast's first permanent brewery taproom. Twenty taps, wood-fired pizza, heated garden — kids and dogs welcome.",
    cost:"££", area:"Newtownards Rd", baby:"Family-friendly till 9pm",
    flag:"Walk-in · open all five days",
    url:"https://bullhousebrewco.com/pages/bullhouse-east"
  },
  {
    name:"Boundary Brewery", cat:"still",
    lat:54.5984506, lng:-5.8943102, days:[0,1,1,1,1],
    why:"Member-owned co-op brewery with 2,000+ shareholders, in an old spinning mill. Walkable from Bullhouse.",
    cost:"£", area:"Newtownards Rd", baby:"Kids and dogs welcome",
    flag:"Closed Monday · opens 4pm Tue–Thu",
    url:"https://boundarybrewing.coop/pages/taproom"
  },
  {
    name:"John Long's", cat:"meal",
    lat:54.5961964, lng:-5.9374968, days:[0,1,1,1,1],
    why:"Chipper since 1914. Order a pastie supper — the Belfast pastie is a battered patty of mince and potato, nothing like the Cornish kind.",
    cost:"£", area:"Athol St", baby:"Casual, tight seating",
    flag:"Closed Monday · often sells out early",
    url:"https://www.johnlongs.com/"
  },
  {
    name:"Aunt Sandra's Candy Factory", cat:"market",
    lat:54.5981581, lng:-5.8878073, days:[0,1,1,1,1],
    why:"Handmade yellowman and honeycomb to 1953 recipes, made in front of you in a working candy kitchen.",
    cost:"£ · ~£8 show", area:"Holywood Rd", baby:"Great with children",
    flag:"Closed Monday · live shows weekends only",
    url:"https://auntsandras.com/"
  },
  {
    name:"Van Morrison Trail & C.S. Lewis Square", cat:"air",
    lat:54.5980429, lng:-5.8911853, days:[1,1,1,1,1],
    why:"3.5km self-guided walk through the streets that shaped Astral Weeks, ending at a square of Narnia bronzes. £1 map from the visitor centre.",
    cost:"£1 map", area:"East Belfast", baby:"Flat, pram-friendly",
    flag:"Pairs with Bullhouse and Boundary",
    url:"https://www.visiteastside.com/listing/van-morrison-trail"
  },
  {
    name:"Old Bushmills Distillery", cat:"still",
    lat:55.2028537, lng:-6.5172267, days:[1,1,1,1,1],
    why:"Licensed since 1608 — the oldest in the world. Walk the working floor from milling to maturation.",
    cost:"From ~£20", area:"Bushmills · 1hr drive", baby:"Pram OK · cashless site",
    flag:"Book tickets in advance",
    url:"https://www.theoldbushmillsbarn.com/restaurants-in-bushmills"
  },
  {
    name:"Causeway Boats — Catch Your Breakfast", cat:"air",
    lat:55.2070854, lng:-6.6583284, days:[2,2,2,2,2],
    why:"Leave Portrush harbour at 7am, fish the Atlantic as the sun comes up over Dunluce Castle, then a chef cooks your catch.",
    cost:"£50–75pp", area:"Portrush North Pier", baby:"Not suitable for an infant",
    flag:"Tide and weather dependent — book ahead",
    url:"https://causewayboats.com/tour/sunrise-catch-your-breakfast-food-tour/"
  },
  {
    name:"Catch and Sea — Portstewart", cat:"air",
    lat:55.1871101, lng:-6.7207214, days:[2,2,2,2,2],
    why:"The other version of the same idea: catch and fillet your own fish, cooked with award-winning Causeway produce.",
    cost:"£50–75pp", area:"Portstewart Harbour", baby:"Not suitable for an infant",
    flag:"Small boat — sells out",
    url:"https://causewaycoastfoodietours.com/catch-and-sea/"
  },
  {
    name:"Broughgammon Farm", cat:"meal",
    lat:55.202349, lng:-6.343295, days:[0,0,0,0,1],
    why:"Ethical rare-meat farm — cabrito goat and rose veal — with a farm-shop café and monthly supper clubs.",
    cost:"££", area:"Ballycastle · Causeway route", baby:"Kids love the goats",
    flag:"Café Fri–Sun only, 11am–4pm",
    url:"https://broughgammon.com/supper-club-events/"
  },

  /* ---- added July 2026, verified trading with source URLs ---- */
  {
    name:"Titanic Belfast", cat:"see",
    lat:54.6076, lng:-5.9103, days:[1,1,1,1,1],
    why:"The slipway museum where Titanic was built; the ticket includes SS Nomadic, the last White Star Line ship afloat.",
    cost:"~£25", area:"Titanic Quarter", baby:"Lifts · prams · baby facilities",
    flag:"Timed tickets — sells out in summer",
    url:"https://www.titanicbelfast.com/visitor-information/opening-hours/"
  },
  {
    name:"Titanic Distillers", cat:"still",
    lat:54.6072, lng:-5.9040, days:[1,1,1,1,1],
    why:"Belfast's first working whiskey distillery in ~90 years, inside the 1911 Thompson Pump House; the dock tour descends into the graving dock where Titanic last sat on dry land.",
    cost:"From ~£20 tour", area:"Titanic Quarter", baby:"Café pram-OK · dock tour 66 steps · 18+ tasting",
    flag:"Book tours ahead",
    url:"https://www.titanicdistillers.com/pages/dry-dock-tour"
  },
  {
    name:"Crumlin Road Gaol", cat:"see",
    lat:54.6167, lng:-5.9430, days:[1,1,1,1,1],
    why:"Restored Victorian prison and Troubles-era history — the tunnel, C-Wing and the hanging cell. One of NI's best-told hard-history sites.",
    cost:"~£16 tour", area:"Crumlin Rd", baby:"Lift to C-Wing · mostly step-free",
    flag:"Open 7 days · same site as McConnell's",
    url:"https://www.crumlinroadgaol.com/gaolexperience/"
  },
  {
    name:"Ulster Museum", cat:"see",
    lat:54.5838, lng:-5.9340, days:[0,1,1,1,1],
    why:"Free national museum — the mummy Takabuti, the Girona Armada gold, Troubles art — set in the Botanic Gardens.",
    cost:"Free", area:"Botanic Gardens", baby:"Lifts · prams welcome · baby facilities",
    flag:"Closed Mondays · no booking",
    url:"https://www.ulstermuseum.org/visit"
  },
  {
    name:"Black Cab Peace Wall Tour", cat:"see",
    lat:54.5965, lng:-5.9575, days:[1,1,1,1,1],
    why:"Ex-residents drive you through the Falls and Shankill murals and the still-gated Peace Wall you can sign — the Troubles history first-hand.",
    cost:"~£40 / cab", area:"West Belfast", baby:"Private cab — bring the car seat (confirm)",
    flag:"Pre-book a slot",
    url:"https://visitbelfast.com/things-to-do/black-taxi-tours/"
  },
  {
    name:"McHugh's Bar & Restaurant", cat:"meal",
    lat:54.6010, lng:-5.9260, days:[1,1,1,1,1],
    why:"Boxty on the menu inside Belfast's oldest surviving building, c.1711.",
    cost:"££", area:"Queen's Sq", baby:"Roomy ground floor",
    flag:"Open all week",
    url:"https://mchughsbar.com/"
  },
  {
    name:"Mourne Seafood Bar", cat:"meal",
    lat:54.6000, lng:-5.9310, days:[1,1,1,1,1],
    why:"Fresh shellfish from the group's own beds at Carlingford and Kilkeel — oysters and chowder.",
    cost:"££", area:"Bank St", baby:"Ground floor — can be tight",
    flag:"Mon & Tue dinner-only",
    url:"https://www.mourneseafood.com/restaurants/belfast/"
  },
  {
    name:"The Muddlers Club", cat:"meal",
    lat:54.6011, lng:-5.9271, days:[0,0,1,1,1],
    why:"Michelin-starred tasting menu down a hidden Cathedral Quarter lane — your special dinner.",
    cost:"£££", area:"Warehouse Lane", baby:"Fine dining — not suited to an infant",
    flag:"Wed–Sat only · book now",
    url:"https://themuddlersclubbelfast.com/"
  },
  {
    name:"The Sunflower Public House", cat:"pub",
    lat:54.6031, lng:-5.9332, days:[1,1,1,1,1],
    why:"Genuine character: a preserved Troubles-era security cage on the door, craft beer, wood-fired pizza and live trad nightly.",
    cost:"£–££", area:"Union St", baby:"Beer garden — go early with the infant",
    flag:"Live trad most nights",
    url:"https://sunflowerbelfast.com/"
  },
  {
    name:"Giant's Causeway", cat:"air",
    lat:55.2408, lng:-6.5116, days:[1,1,1,1,1],
    why:"UNESCO basalt-column coast — the Causeway's signature natural wonder.",
    cost:"From ~£13.50 (stones free)", area:"Bushmills · 1hr drive", baby:"Lower path & shuttle pram-OK · upper cliff not",
    flag:"Pre-book to secure parking",
    url:"https://www.nationaltrust.org.uk/visit/northern-ireland/giants-causeway"
  },
  {
    name:"Carrick-a-Rede Rope Bridge", cat:"air",
    lat:55.2395, lng:-6.3298, days:[1,1,1,1,1],
    why:"Cross a rope bridge 30m above the sea to a tiny fishermen's island — also a Game of Thrones coastal spot.",
    cost:"~£15.50", area:"Ballintoy · Causeway", baby:"Sling only — cliff walk + swaying bridge",
    flag:"Timed slots — book ahead",
    url:"https://www.nationaltrust.org.uk/visit/northern-ireland/carrick-a-rede"
  },
  {
    name:"Dunluce Castle", cat:"see",
    lat:55.2110, lng:-6.5786, days:[1,1,1,1,1],
    why:"Dramatic 16th-century clifftop ruin whose kitchen fell into the sea; the exterior that inspired Game of Thrones' Pyke.",
    cost:"~£6", area:"Portrush–Bushmills", baby:"Uneven ruin, some steps · sling better than pram",
    flag:"Open 7 days · buy at the gate",
    url:"https://discovernorthernireland.com/things-to-do/dunluce-castle-p675131"
  },
  {
    name:"The Dark Hedges", cat:"air",
    lat:55.1344, lng:-6.3806, days:[1,1,1,1,1],
    why:"Iconic tunnel of 18th-century beech trees — Game of Thrones' Kingsroad.",
    cost:"Free · £4 parking", area:"Stranocum · Causeway", baby:"Flat lane · pram OK",
    flag:"Park at the Hedges Hotel, 5-min walk",
    url:"https://discovernorthernireland.com/things-to-do/the-dark-hedges-p675281"
  },
  {
    name:"Harry's Shack", cat:"meal",
    lat:55.1660, lng:-6.7280, days:[1,1,1,1,1],
    why:"A seafood shack literally on Portstewart Strand, fish from local boats cooked over wood on National Trust dunes.",
    cost:"££", area:"Portstewart Strand", baby:"Beach setting · buggies fine outside",
    flag:"Book · car needed",
    url:"https://harrysshack.app/"
  },
  {
    name:"Ursa Minor Bakehouse", cat:"market",
    lat:55.2050, lng:-6.2410, days:[0,1,1,1,1],
    why:"Award-winning wild sourdough and daily-changing pastries — a north-coast pilgrimage.",
    cost:"£–££", area:"Ballycastle", baby:"Relaxed café",
    flag:"Closed Sun–Mon · confirm address",
    url:"https://www.ursaminor-bakehouse.com/"
  }
];

/* =========================== DUBLIN leg =========================== */
// day arrays are [Sat 1, Sun 2, Mon 3 (bank holiday), Tue 4] Aug 2026
const PLACES_DUBLIN = [
  {
    name:"Book of Kells & Trinity Long Room", cat:"see",
    lat:53.3441, lng:-6.2567, days:[1,1,1,1],
    why:"The 9th-century illuminated gospels and the cathedral-like Long Room library at Trinity College.",
    cost:"€25", area:"College Green", baby:"Long Room has stairs — use a carrier",
    flag:"Timed tickets — book now, sells out",
    url:"https://www.tcd.ie/visitors/book-of-kells/"
  },
  {
    name:"Kilmainham Gaol", cat:"see",
    lat:53.3419, lng:-6.3097, days:[1,1,1,1],
    why:"Where the 1916 Rising leaders were held and executed — guided-tour only.",
    cost:"~€8", area:"Kilmainham", baby:"Uneven floors — a carrier beats a pram",
    flag:"Pre-book essential — sells out",
    url:"https://www.kilmainhamgaolmuseum.ie/plan-a-visit/"
  },
  {
    name:"EPIC The Irish Emigration Museum", cat:"see",
    lat:53.3479, lng:-6.2497, days:[1,1,1,1],
    why:"A fully interactive museum of the Irish diaspora — all story, no artefacts.",
    cost:"~€21", area:"CHQ, Custom House Quay", baby:"Fully accessible · pram-friendly",
    flag:"Open all four days · walk-up usually fine",
    url:"https://epicchq.com/visit/tickets-and-tours/"
  },
  {
    name:"Glasnevin Cemetery Museum", cat:"see",
    lat:53.3707, lng:-6.2769, days:[1,1,1,1],
    why:"Ireland's necropolis — O'Connell, Collins and Parnell — plus the O'Connell Tower climb.",
    cost:"Tour ~€16", area:"Glasnevin", baby:"Flat grounds · pram-friendly",
    flag:"Pre-book the guided tours",
    url:"https://www.dctrust.ie/experience-glasnevin/plan-your-visit.html"
  },
  {
    name:"Little Museum of Dublin", cat:"see",
    lat:53.3384, lng:-6.2591, days:[1,1,1,1],
    why:"A curated 'people's history' of Dublin — entry by guided tour only.",
    cost:"~€19", area:"St Stephen's Green", baby:"Georgian stairs — a carrier is better",
    flag:"Tour-only — book ahead",
    url:"https://www.littlemuseum.ie/visit/"
  },
  {
    name:"National Museum of Ireland — Archaeology", cat:"see",
    lat:53.3402, lng:-6.2547, days:[1,1,2,1],
    why:"Bog bodies and the Ór Celtic gold hoards — one of Europe's great archaeology collections, free.",
    cost:"Free", area:"Kildare St", baby:"Accessible · pram-friendly",
    flag:"Verify Mon / bank-holiday hours",
    url:"https://www.museum.ie/en-IE/Museums/Archaeology"
  },
  {
    name:"Marsh's Library", cat:"see",
    lat:53.3399, lng:-6.2713, days:[1,0,0,1],
    why:"Ireland's first public library (1707), unchanged with its original Georgian book-cages.",
    cost:"~€5", area:"St Patrick's Close", baby:"Historic and small — pram awkward",
    flag:"Closed Sun & Mon (+ bank hol)",
    url:"https://marshlibrary.ie/visit/"
  },
  {
    name:"14 Henrietta Street", cat:"see",
    lat:53.3530, lng:-6.2686, days:[1,1,0,0],
    why:"One Georgian townhouse's journey from grandeur to tenement slum — guided tour only.",
    cost:"~€10", area:"Henrietta St", baby:"Lots of stairs — carrier, not pram",
    flag:"Closed Mon & Tue · pre-book",
    url:"https://14henriettastreet.ie/whats-on/house-tours/"
  },
  {
    name:"Christ Church Cathedral & Dublinia", cat:"see",
    lat:53.3434, lng:-6.2711, days:[1,1,1,1],
    why:"Ireland's largest medieval crypt (the mummified 'cat and rat') beside the Viking-and-medieval Dublinia museum.",
    cost:"Cathedral €12 · combo cheaper", area:"Christchurch Pl", baby:"Crypt has steps · Dublinia pram-ish",
    flag:"Sunday cathedral hours limited",
    url:"https://christchurchcathedral.ie/opening-hours/"
  },
  {
    name:"Howth Cliff Path Loop", cat:"air",
    lat:53.3877, lng:-6.0654, days:[1,1,1,1],
    why:"A sea-cliff loop past the Baily Lighthouse with Dublin Bay views, straight off the DART.",
    cost:"Free", area:"Howth · DART ~35 min", baby:"Rough narrow cliff path — carrier, not pram",
    flag:"Weather-dependent · ~6km loop",
    url:"https://www.discoverireland.ie/dublin/howth-cliff-path-loop"
  },
  {
    name:"Glendalough", cat:"air",
    lat:53.0106, lng:-6.3269, days:[1,1,1,1],
    why:"A 6th-century monastic city with a round tower in a glacial lake valley.",
    cost:"Site free · centre ~€5", area:"Co. Wicklow · car", baby:"Lower paths pram-OK · uplands not",
    flag:"Car recommended (~1.5 hr)",
    url:"https://www.nationalparks.ie/wicklow/"
  },
  {
    name:"Powerscourt House & Gardens", cat:"air",
    lat:53.1840, lng:-6.1900, days:[1,1,1,1],
    why:"Great Italianate gardens under the Sugar Loaf; Ireland's highest waterfall sits 6km away.",
    cost:"Gardens ~€12.50", area:"Enniskerry · Wicklow", baby:"Paths mostly pram-OK",
    flag:"Car recommended · waterfall separate",
    url:"https://powerscourt.com/gardens"
  },
  {
    name:"John Kavanagh 'The Gravediggers'", cat:"pub",
    lat:53.3717, lng:-6.2769, days:[1,1,1,1],
    why:"An 1833 Victorian bar backing onto Glasnevin Cemetery — no TV, no music, cash-only, seven generations in.",
    cost:"€ · €€ food", area:"Glasnevin", baby:"Small & snug — daytime only",
    flag:"Food Tue–Sat only · cash-only",
    url:"https://dublinpubs.com/john-kavanagh-the-gravediggers/"
  },
  {
    name:"The Cobblestone", cat:"pub",
    lat:53.3479, lng:-6.2783, days:[1,1,1,1],
    why:"The real trad-session pub — 'a drinking pub with a music problem' — family-run, sessions seven nights.",
    cost:"€€", area:"Smithfield", baby:"Early sessions OK · loud later",
    flag:"Trad sessions daily",
    url:"https://www.cobblestonepub.ie/"
  },
  {
    name:"Mulligan's of Poolbeg Street", cat:"pub",
    lat:53.3470, lng:-6.2560, days:[1,1,1,1],
    why:"Est. 1782; JFK drank here as a journalist in 1945 — reputedly the best pint of Guinness in Dublin.",
    cost:"€€", area:"Off Tara St", baby:"Traditional — tight for a pram",
    flag:"Open all four days",
    url:"https://www.dublintown.ie/business/mulligans/"
  },
  {
    name:"The Stag's Head", cat:"pub",
    lat:53.3439, lng:-6.2637, days:[1,1,1,1],
    why:"Probably Dublin's best-preserved Victorian pub — stag-themed stained glass, mahogany and a mosaic floor.",
    cost:"€€", area:"Dame Court", baby:"Does food — easier midday",
    flag:"Open all four days",
    url:"https://www.visitdublin.com/the-stags-head-pub"
  },
  {
    name:"Guinness Storehouse", cat:"still",
    lat:53.3419, lng:-6.2867, days:[1,1,1,1],
    why:"Seven floors in the 1904 fermentation house, ending at the Gravity Bar's 360° pint over the city.",
    cost:"€€€ ~€22", area:"St James's Gate", baby:"Lifts · baby facilities · under-3s free",
    flag:"Pre-book timed entry",
    url:"https://www.guinness-storehouse.com/en/plan-your-visit"
  },
  {
    name:"Teeling Whiskey Distillery", cat:"still",
    lat:53.3378, lng:-6.2760, days:[1,1,1,1],
    why:"Dublin's first new working distillery in 125 years — the Liberties whiskey revival, tour plus tasting.",
    cost:"€18–35 tour", area:"Newmarket, D8", baby:"Pram-OK · confirm infant tour policy",
    flag:"Pre-book tours",
    url:"https://teelingdistillery.com/plan-your-visit/"
  },
  {
    name:"Gallagher's Boxty House", cat:"meal",
    lat:53.3454, lng:-6.2637, days:[1,1,1,1],
    why:"The traditional-boxty specialist — potato pancakes and coddle — genuinely family-friendly amid Temple Bar.",
    cost:"€€–€€€", area:"Temple Bar", baby:"High chairs · accommodating",
    flag:"Book ahead, especially weekends",
    url:"https://www.boxtyhouse.ie/"
  },
  {
    name:"Leo Burdock", cat:"meal",
    lat:53.3432, lng:-6.2703, days:[1,1,1,1],
    why:"Dublin's oldest chipper, est. 1913 — the original fish and chips institution.",
    cost:"€", area:"Werburgh St, Christchurch", baby:"Takeaway · no seating — eat in the park",
    flag:"Verify hours · use the Werburgh St shop",
    url:"https://www.leoburdock.com/"
  },
  {
    name:"Temple Bar Food Market", cat:"market",
    lat:53.3447, lng:-6.2644, days:[1,0,0,0],
    why:"Dublin's best-known artisan food market under a retractable canopy — oysters, cheese, breads, hot food.",
    cost:"€", area:"Meeting House Sq", baby:"Covered · pram-friendly",
    flag:"Saturday only — your one shot is Sat 1",
    url:"https://www.lovetemplebar.com/templebarmarkets"
  },
  {
    name:"Bewley's Grafton Street", cat:"meal",
    lat:53.3410, lng:-6.2601, days:[1,1,1,1],
    why:"Dublin's grand Victorian-lineage café — Harry Clarke stained glass, sticky buns and coffee-roasting heritage since 1927.",
    cost:"€€", area:"Grafton St", baby:"Spacious · high chairs · pram-friendly",
    flag:"Open all four days",
    url:"https://bewleysgraftonstreet.com/opening-hours/"
  },

  /* ---- added: interesting / non-touristy Dublin, verified Aug 2026 ---- */
  {
    name:"Variety Jones", cat:"meal",
    lat:53.3435, lng:-6.2830, days:[1,0,0,0],
    why:"The Higgs brothers' live-fire cooking — Dublin's cult Michelin-starred modern-Irish room in the Liberties.",
    cost:"€€€", area:"Thomas St, The Liberties", baby:"Small evening room — an adults' dinner",
    flag:"Michelin · Wed–Sat dinner — Sat only this week, book",
    url:"https://www.varietyjones.ie/"
  },
  {
    name:"Bastible", cat:"meal",
    lat:53.3345, lng:-6.2790, days:[1,1,0,0],
    why:"A one-room neighbourhood Michelin star in Portobello; the weekend set lunch is the local move.",
    cost:"€€€", area:"South Circular Rd", baby:"Tight room — lunch is easiest",
    flag:"Michelin · Sun lunch 12:30–15:30 · closed Mon–Tue",
    url:"https://www.bastible.com/food"
  },
  {
    name:"Assassination Custard", cat:"meal",
    lat:53.3378, lng:-6.2670, days:[0,0,0,1],
    why:"An 8-seat, menu-on-a-paper-bag legend near Kevin St — Dublin's most-loved tiny lunch counter.",
    cost:"€€", area:"Kevin St Lower", baby:"8 seats — no pram room",
    flag:"Lunch only, Tue–Fri · phone ahead", tel:"+353879971513",
    url:"https://www.theinfatuation.com/dublin/reviews/assassination-custard"
  },
  {
    name:"Fish Shop", cat:"meal",
    lat:53.3480, lng:-6.2870, days:[1,1,0,1],
    why:"Tiny fish-and-chips with thirty wines by the glass — the Stoneybatter wine-bar crowd's favourite.",
    cost:"€€", area:"Benburb St, Stoneybatter", baby:"Casual but tight",
    flag:"Tue–Sun · closed Mon",
    url:"https://fish-shop.ie/"
  },
  {
    name:"Klaw", cat:"meal",
    lat:53.3453, lng:-6.2635, days:[1,1,1,1],
    why:"Achill oysters three ways from €2 at a fifteen-seat counter — a proper seafood shack in Temple Bar.",
    cost:"€€", area:"Crown Alley, Temple Bar", baby:"~15 counter seats",
    flag:"Open 7 days · 4–6pm oyster happy hour",
    url:"https://klaw.ie/"
  },
  {
    name:"Hang Dai", cat:"meal",
    lat:53.3350, lng:-6.2640, days:[1,1,0,1],
    why:"A basement disco-Chinese with a cult roast duck — one of Dublin's most distinctive dinners.",
    cost:"€€€", area:"Camden St Lower", baby:"Dark, loud basement — not for an infant",
    flag:"Tue–Sun · closed Mon",
    url:"https://www.hangdaichinese.com/"
  },
  {
    name:"M&L Sichuan", cat:"meal",
    lat:53.3495, lng:-6.2600, days:[1,1,1,1],
    why:"The city's real-deal Sichuan, off O'Connell St — where Dublin's Chinese community actually eats.",
    cost:"€€", area:"Cathedral St", baby:"Big, busy, family-friendly",
    flag:"Open 7 days incl. bank holiday",
    url:"https://mlchineserestaurant.com/"
  },
  {
    name:"Lucky Tortoise", cat:"meal",
    lat:53.3400, lng:-6.2648, days:[1,1,1,1],
    why:"Set dim-sum feasts at communal tables — the fun, unfussy antidote to a formal dinner.",
    cost:"€€", area:"Aungier St", baby:"Communal tables — casual",
    flag:"Use the Aungier St original (Temple Bar branch closed Mon)",
    url:"https://www.luckytortoise.ie/"
  },
  {
    name:"L. Mulligan Grocer", cat:"pub",
    lat:53.3490, lng:-6.2870, days:[1,1,1,1],
    why:"A craft-beer-and-whiskey gastropub with a famous Scotch egg, in the heart of Stoneybatter.",
    cost:"€€", area:"Stoneybatter", baby:"Daytime and early evening fine",
    flag:"Open 7 days · kitchen hours vary",
    url:"https://www.lmulligangrocer.com/"
  },
  {
    name:"Grogan's Castle Lounge", cat:"pub",
    lat:53.3420, lng:-6.2630, days:[1,1,1,1],
    why:"The artists' and writers' snug — no TVs, a legendary toasted special, unchanged for decades.",
    cost:"€€", area:"South William St", baby:"Daytime only — traditional pub",
    flag:"Open 7 days",
    url:"https://www.groganspub.ie/"
  },
  {
    name:"Pearse Lyons Distillery", cat:"still",
    lat:53.3430, lng:-6.2930, days:[1,1,1,1],
    why:"A working whiskey distillery inside a restored medieval church, with its own stained-glass windows.",
    cost:"€€ tours", area:"James's St, The Liberties", baby:"Site pram-OK · 18+ tasting",
    flag:"Open 7 days · pre-book the tour · verify bank hol",
    url:"https://pearselyonsdistillery.com/"
  },
  {
    name:"Glasnevin Food Market", cat:"market",
    lat:53.376, lng:-6.279, days:[1,0,0,0],
    why:"The former Honest2Goodness market — a genuine local Saturday food market, no tourists.",
    cost:"€", area:"Slaney Rd, Glasnevin", baby:"Pram-friendly",
    flag:"Saturdays only, ~9:30–15:30",
    url:"https://www.honest2goodness.ie/"
  },
  {
    name:"People's Park Market", cat:"market",
    lat:53.293, lng:-6.133, days:[0,1,0,0],
    why:"A seaside Sunday food-and-craft market in a Victorian park by Dún Laoghaire's piers.",
    cost:"€", area:"Dún Laoghaire", baby:"Very pram-friendly · playground on site",
    flag:"Sundays only, 10–16",
    url:"https://www.dunlaoghairetown.ie/peoples-park-market-dun-laoghaire"
  },
  {
    name:"Casino at Marino", cat:"see",
    lat:53.371, lng:-6.225, days:[1,1,1,1],
    why:"A perfect neoclassical folly — a tiny palace of sixteen hidden rooms disguised as a single-room temple.",
    cost:"~€5 tour", area:"Marino", baby:"Ground floor fine · tight spiral stairs above",
    flag:"Guided tour only — email to book · confirm bank hol",
    url:"https://heritageireland.ie/places-to-visit/casino-marino/"
  },
  {
    name:"James Joyce Tower & Museum", cat:"see",
    lat:53.290, lng:-6.113, days:[1,1,0,0],
    why:"The free Martello tower where Ulysses opens, on the rocks at Sandycove — volunteer-run.",
    cost:"Free", area:"Sandycove · DART", baby:"Steep spiral stair to the roof",
    flag:"Wed–Sun · closed Mon & Tue",
    url:"https://joycetower.ie/visit"
  },
  {
    name:"The Forty Foot", cat:"air",
    lat:53.290, lng:-6.114, days:[1,1,1,1],
    why:"A historic open-water bathing spot off the Sandycove rocks — Dubliners swim here year-round.",
    cost:"Free", area:"Sandycove · DART", baby:"Rocks & ladders · deep water",
    flag:"Open-access · not lifeguarded",
    url:"https://www.dlrcoco.ie/beaches/forty-foot"
  },
  {
    name:"Great South Wall & Poolbeg Lighthouse", cat:"air",
    lat:53.343, lng:-6.153, days:[1,1,1,1],
    why:"Walk two kilometres out into Dublin Bay on an 18th-century sea wall to a red lighthouse.",
    cost:"Free", area:"Ringsend · car", baby:"Uneven, exposed · unguarded edge",
    flag:"Open-access · car park at the end of Pigeon House Rd",
    url:"https://www.visitdublin.com/guides/south-wall-stroll"
  },
  {
    name:"Iveagh Gardens", cat:"air",
    lat:53.335, lng:-6.260, days:[1,1,1,1],
    why:"Dublin's 'secret garden' behind the Concert Hall — a cascade, a maze and fountains few tourists find.",
    cost:"Free", area:"off Clonmel St", baby:"Gravel paths · some steps",
    flag:"Open-access · can close for summer concerts — verify",
    url:"https://www.iveaghgardens.ie/plan-a-visit/"
  },
  {
    name:"National Botanic Gardens", cat:"air",
    lat:53.372, lng:-6.271, days:[1,1,1,1],
    why:"Free Victorian curvilinear glasshouses and 15,000 plants, backing onto Glasnevin Cemetery.",
    cost:"Free", area:"Glasnevin", baby:"Flat wide paths · pram-perfect",
    flag:"Open 7 days incl. bank holiday",
    url:"https://www.botanicgardens.ie/glasnevin/opening-hours/"
  },
  {
    name:"Phoenix Park — wild deer", cat:"air",
    lat:53.356, lng:-6.329, days:[1,1,1,1],
    why:"Around 600 wild fallow deer roam Europe's largest walled city park — best near the Papal Cross at dawn or dusk.",
    cost:"Free", area:"Phoenix Park", baby:"Flat wide paths · bikes ideal",
    flag:"Open-access · keep your distance from the deer",
    url:"https://www.phoenixpark.ie/"
  },
  {
    name:"North Bull Island & Dollymount Strand", cat:"air",
    lat:53.369, lng:-6.149, days:[1,1,1,1],
    why:"A five-kilometre beach on a UNESCO biosphere island, reached across a wooden bridge.",
    cost:"Free", area:"Clontarf · car", baby:"Firm low-tide sand",
    flag:"Open-access · fast incoming tide — check tables",
    url:"https://www.visitdublin.com/bull-island"
  },
  {
    name:"Hellfire Club, Montpelier Hill", cat:"air",
    lat:53.244, lng:-6.324, days:[1,1,1,1],
    why:"A spooky ruined 1725 hunting lodge, wrapped in legend, atop a forest hill with city-wide views.",
    cost:"Free", area:"Dublin Mountains · car", baby:"Steep rooty climb · use a carrier",
    flag:"Car essential · arrive early, the car park fills",
    url:"https://www.coillte.ie/site/hell-fire-club/"
  },
  {
    name:"Killiney Hill", cat:"air",
    lat:53.260, lng:-6.112, days:[1,1,1,1],
    why:"'Ireland's Bay of Naples' — a hilltop obelisk panorama the locals prefer to Howth.",
    cost:"Free", area:"Killiney · DART Dalkey", baby:"Paved but uphill, with steps",
    flag:"Open-access · combine with Dalkey village",
    url:"https://wildirishwalks.ie/killiney-hill-walk/"
  },
  {
    name:"Blackrock Market", cat:"market",
    lat:53.302, lng:-6.178, days:[1,1,1,0],
    why:"A ramshackle weekend market village of antiques, vintage and food — a genuine local haunt.",
    cost:"Free entry", area:"Blackrock · DART", baby:"Some tight aisles",
    flag:"Sat, Sun & bank-hol Mon · closed Tue",
    url:"https://www.theblackrockmarket.com/"
  },
  {
    name:"Rathfarnham Castle", cat:"see",
    lat:53.299, lng:-6.285, days:[1,1,1,2],
    why:"Georgian interiors inside a fortified Elizabethan castle — quiet, and the most pram-friendly heritage site in Dublin.",
    cost:"~€5", area:"Rathfarnham", baby:"Lift & ramps — pram-friendly",
    flag:"Summer season · verify Tue hours",
    url:"https://heritageireland.ie/places-to-visit/rathfarnham-castle/"
  }
];

/* =========================== view / leg config =========================== */
const BELFAST_TOWNS = [
  {n:"BELFAST",      lat:54.5970, lng:-5.9300, big:true},
  {n:"Portrush",     lat:55.2050, lng:-6.6540},
  {n:"Portstewart",  lat:55.1860, lng:-6.7220},
  {n:"Bushmills",    lat:55.2029, lng:-6.5172},
  {n:"Ballycastle",  lat:55.2040, lng:-6.2450},
  {n:"Coleraine",    lat:55.1320, lng:-6.6680},
  {n:"Ballymena",    lat:54.8640, lng:-6.2760},
  {n:"Bangor",       lat:54.6540, lng:-5.6680},
  {n:"Lough Neagh",  lat:54.6100, lng:-6.4100, water:true},
  {n:"North Channel",lat:55.0500, lng:-5.5200, water:true}
];

const DUBLIN_TOWNS = [
  {n:"DUBLIN",        lat:53.3490, lng:-6.2600, big:true},
  {n:"Howth",         lat:53.3880, lng:-6.0650},
  {n:"Dún Laoghaire", lat:53.2940, lng:-6.1350},
  {n:"Dalkey",        lat:53.2770, lng:-6.1010},
  {n:"Bray",          lat:53.2030, lng:-6.1090},
  {n:"Greystones",    lat:53.1440, lng:-6.0630},
  {n:"Enniskerry",    lat:53.1930, lng:-6.1720},
  {n:"Glendalough",   lat:53.0106, lng:-6.3269},
  {n:"Malahide",      lat:53.4510, lng:-6.1540},
  {n:"Dublin Bay",    lat:53.3300, lng:-6.1250, water:true},
  {n:"Irish Sea",     lat:53.2400, lng:-5.9600, water:true}
];

const VIEWS = {
  belfast: {
    switchLabel:"Belfast", switchDates:"27–31 Jul",
    title:"Belfast & the Causeway Coast",
    standfirst:"Belfast and the Causeway Coast — the food, drink and sights worth the trip, mapped. Half the city shuts Sunday to Tuesday, so pick a day to see what's open.",
    month:"July",
    days:[
      {key:0, dow:"Mon", num:"27"},
      {key:1, dow:"Tue", num:"28"},
      {key:2, dow:"Wed", num:"29"},
      {key:3, dow:"Thu", num:"30"},
      {key:4, dow:"Fri", num:"31"}
    ],
    dletter:["M","T","W","T","F"],
    center:[54.92, -6.25], zoom:9,
    bounds:[[54.05, -7.85], [55.72, -4.95]],
    towns:BELFAST_TOWNS,
    places:PLACES_BELFAST,
    todayMonth:6, todayRange:[27, 31]        // July (month index 6)
  },
  dublin: {
    switchLabel:"Dublin", switchDates:"1–4 Aug",
    title:"Dublin & Wicklow",
    standfirst:"Dublin and the Wicklow day-trips, for the August bank-holiday weekend. Pick a day — several museums close Monday, and Monday the 3rd is the bank holiday.",
    month:"August",
    days:[
      {key:0, dow:"Sat", num:"1"},
      {key:1, dow:"Sun", num:"2"},
      {key:2, dow:"Mon", num:"3"},
      {key:3, dow:"Tue", num:"4"}
    ],
    dletter:["S","S","M","T"],
    center:[53.30, -6.24], zoom:10,
    bounds:[[52.80, -6.75], [53.62, -5.90]],
    towns:DUBLIN_TOWNS,
    places:PLACES_DUBLIN,
    todayMonth:7, todayRange:[1, 4]          // August (month index 7)
  }
};
