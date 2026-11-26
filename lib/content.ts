// Homepage content beyond the hero and the route. Every figure, name and date is from tetr.com (checked 26 Nov 2026).

export const APPLY_URL = "https://applications.tetr.com";

/* Business visits per term (tetr.com route section) and a local clock for the card's strip */
export const TERM_EXTRA: { tz: string; cur: string; visits: [string, string][] }[] = [
  { tz: "Asia/Dubai", cur: "AED", visits: [["Gitex Global", "the world's largest tech showcase"], ["Emirates Innovation HQ", "aviation innovation at scale"], ["DIFC AI Campus", "AI and fintech across the Middle East"], ["DP World", "global trade and smart logistics"]] },
  { tz: "Asia/Kolkata", cur: "INR", visits: [["ITC", "FMCG, hospitality and agribusiness"], ["Nivia Sports", "manufacturing and brand excellence"], ["Pee Safe", "scaling a D2C femtech brand"], ["LinkedIn", "data, talent and the future of work"]] },
  { tz: "Asia/Shanghai", cur: "CNY", visits: [["Tesla Gigafactory", "automated production at scale"], ["Alibaba Campus", "the stack behind modern commerce"], ["Tencent HQ", "the super app economy"], ["Zhangjiang Hi-Tech Park", "China's silicon valley in Shanghai"]] },
  { tz: "Africa/Accra", cur: "GHS", visits: [["Google AI Research Centre", "AI research built in Africa"], ["Meltwater Lab", "talent, mentorship and venture creation"], ["Coca-Cola", "manufacturing and brand strategy"], ["mPharma", "healthcare logistics across Africa"]] },
  { tz: "America/New_York", cur: "USD", visits: [["The New York Times", "behind world-class journalism"], ["Spotify HQ", "data, algorithms and the future of audio"], ["JPMorgan Chase / Goldman Sachs", "how global capital moves"], ["The AI Summit", "founders and researchers building AI"]] },
  { tz: "America/Argentina/Buenos_Aires", cur: "ARS", visits: [["Grupo Los Grobo", "agribusiness run on data and futures"], ["Distrito Arcos", "heritage rail arches reborn as retail"]] },
  { tz: "Europe/Madrid", cur: "EUR", visits: [["Iberdrola HQ", "renewables at global scale"], ["La Nave Innovation Hub", "Madrid's leading startup hub"], ["El Corte Inglés HQ", "retail innovation at scale"]] },
];

/* Results */
export const RESULTS = {
  stats: [
    { value: 150, prefix: "", suffix: "+", label: "Businesses built" },
    { value: 504000, prefix: "$", suffix: "+", label: "Revenue generated" },
    { value: 180000, prefix: "$", suffix: "+", label: "Funds raised" },
  ],
  lines: [
    { value: "91%", label: "of students are revenue positive" },
    { value: "40%", label: "of student teams raised funds at demo days" },
  ],
  // venture posters as Tetr prints them (name, class and revenue are on the poster itself)
  ventures: [
    { img: "bike-arena", name: "Bike Arena", where: "Dubai" },
    { img: "jhatak", name: "Jhatak", where: "India" },
    { img: "meridian-v2", name: "Meridian", where: "China" },
    { img: "tafflo", name: "Tafflo", where: "Dubai" },
    { img: "kalaam", name: "Kalaam", where: "India" },
    { img: "kando-v2", name: "Kando", where: "China" },
    { img: "chula-fashion", name: "Chula Fashion", where: "Dubai" },
    { img: "lavella", name: "Lavella", where: "India" },
    { img: "slide-pass-v2", name: "Slide Pass", where: "China" },
    { img: "nothing-but", name: "Nothing But", where: "India" },
    { img: "critter-chaos-v2", name: "Critter Chaos", where: "China" },
    { img: "welz-company", name: "Welz Company", where: "Dubai" },
  ],
};

/* Partner universities on the route (tetr.com) */
export const UNIS = [
  { name: "Cornell University", city: "Ithaca", cc: "USA", img: "collab-cornell" },
  { name: "Imperial College London", city: "London", cc: "GBR", img: "collab-imperial" },
  { name: "INSEAD", city: "Fontainebleau", cc: "FRA", img: "collab-insead" },
  { name: "Fudan University", city: "Shanghai", cc: "CHN", img: "collab-fudan" },
  { name: "FITT, IIT Delhi", city: "New Delhi", cc: "IND", img: "collab-fitt" },
  { name: "Illinois Tech", city: "Chicago", cc: "USA", img: "collab-illinois" },
  { name: "UBI Business School", city: "Brussels", cc: "BEL", img: "collab-ubi" },
  { name: "Adelphi University", city: "New York", cc: "USA", img: "collab-adelphi" },
  { name: "Bryant University", city: "Rhode Island", cc: "USA", img: "collab-bryant" },
];

/* Career Labs */
export const CAREERS = {
  stats: [
    { value: "70%", label: "secured internships before their second year" },
    { value: "314", label: "placements in the 2025–26 academic year" },
    { value: "23", label: "countries and regions on the placement map" },
    { value: "$204K+", label: "in stipends earned by the cohort" },
  ],
  interns: [
    { img: "tetr-cl11-f1-anshika", name: "Anshika Agarwal", org: "Formula 1" },
    { img: "tetr-cl11-google-loris", name: "Loris De Rosso", org: "Google" },
    { img: "tetr-cl11-blackrock-antriksh", name: "Antriksh Gupta", org: "Jio BlackRock" },
    { img: "tetr-cl11-ebay-tanisha", name: "Tanisha Gureja", org: "eBay" },
    { img: "tetr-cl11-difc-weronika", name: "Weronika Leśniak", org: "DIFC" },
    { img: "tetr-cl11-certik-lucas", name: "Lucas Ceccon", org: "CertiK" },
    { img: "tetr-cl11-emeritus-nicoleta", name: "Nicoleta Dicusar", org: "Emeritus" },
    { img: "tetr-cl11-noon-santiago", name: "Santiago Vaca", org: "noon" },
    { img: "tetr-cl11-axa-judy", name: "Judy Ayman", org: "AXA" },
  ],
};

/* Faculty: the 40 / 30 / 30 mix, grouped and worded exactly as tetr.com lists them */
export const FACULTY = [
  { share: 40, title: "Industry practitioners", line: "CEOs, founders and operators teaching what they're building today.", people: [
    { img: "faverie", name: "Stéphane de La Faverie", role: "Executive Group President, Estée Lauder", teach: "Global markets and customer dynamics" },
    { img: "lanma", name: "Dr. Lan Ma", role: "Academician Adjunct Professor of Business", teach: "How to market strategically in the real world" },
    { img: "rogers", name: "Dr. Edward Rogers", role: "Former Chief Knowledge Officer, NASA", teach: "How to manage complexities" },
  ] },
  { share: 30, title: "Full-time faculty", line: "PhDs from India's and the world's top institutions, with FT50 and A* research.", people: [
    { img: "zal", name: "Dr. Zal Phiroz", role: "Adjunct Professor", teach: "How companies procure and ship globally" },
    { img: "nitin", name: "Nitin Gaur", role: "Former Advisory Board Member", teach: "How to innovate in fintech" },
    { img: "daniel", name: "Dr. Daniel G. Van Der Vliet", role: "Executive Director", teach: "Leadership and family business" },
  ] },
  { share: 30, title: "Visiting faculty", line: "Professors from Harvard, Stanford, Wharton, Kellogg, Columbia, NYU, Cornell and Imperial.", people: [
    { img: "zvi", name: "Dr. Zvi Gilula", role: "Professor", teach: "Statistics and marketing" },
    { img: "hayton", name: "Dr. James Hayton", role: "Professor", teach: "Innovation and entrepreneurship" },
    { img: "shad", name: "Dr. Shad Morris", role: "Former Faculty Fellow", teach: "How to work effectively in teams" },
  ] },
];

/* Classmates */
export const CLASSMATES = {
  stats: [
    { value: "800+", label: "students" }, { value: "70+", label: "nationalities" }, { value: "45+", label: "languages" },
    { value: "30%", label: "ran a business first" }, { value: "10%", label: "national-level athletes" },
  ],
  people: [
    { img: "songheon-2", name: "Songheon", from: "South Korea" }, { img: "mayra-2", name: "Mayra", from: "Argentina" },
    { img: "amanda-2", name: "Amanda", from: "Latvia" }, { img: "alma-mexico", name: "Alma", from: "Mexico" },
    { img: "linda-2", name: "Linda", from: "Kenya" }, { img: "allan-2", name: "Allan", from: "Canada" },
    { img: "snigdha", name: "Snigdha", from: "India" }, { img: "lilijana", name: "Lilijana", from: "Germany" },
    { img: "andrea-chapman", name: "Andrea", from: "USA" },
  ],
  // "hello" in the languages of the route and the cohort, for the departure board
  hellos: ["Hello", "Marhaba", "Namaste", "Nǐ hǎo", "Akwaaba", "Hola", "Bonjour", "Annyeong", "Jambo", "Hallo", "Olá", "Labdien"],
};

/* Open days, all on Sat 28 Nov 2026 (tetr.com events) */
export const OPEN_DAYS = [
  { city: "Mexico", code: "MEX", tz: "America/Mexico_City", start: "2026-11-28T11:00:00-06:00", end: "2026-11-28T14:00:00-06:00", local: "11:00 AM to 2:00 PM CST", venue: "Venue to be announced" },
  { city: "Madrid", code: "MAD", tz: "Europe/Madrid", start: "2026-11-28T11:00:00+01:00", end: "2026-11-28T14:00:00+01:00", local: "11:00 AM to 2:00 PM CET", venue: "Vincci Soma Hotel, Madrid" },
  { city: "Mumbai", code: "BOM", tz: "Asia/Kolkata", start: "2026-11-28T14:00:00+05:30", end: "2026-11-28T17:00:00+05:30", local: "2:00 PM to 5:00 PM IST", venue: "Hotel Solitaire, Andheri East, Mumbai" },
];
