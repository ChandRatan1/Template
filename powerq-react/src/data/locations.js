// Local-area landing pages, one per suburb PowerQ services — replaces the ~125
// near-duplicate WordPress location pages (test-and-tag-in-<suburb>,
// cheap-test-and-tag-in-<suburb>, etc.) with one real page per suburb instead.
// Historical URL variants 301-redirect here (see public/.htaccess).

const introTemplates = [
  (suburb) =>
    `PowerQ Test & Tag Melbourne proudly provides electrical test and tag services to businesses and homes in ${suburb} and the surrounding area. Our certified technicians carry out thorough testing and tagging of electrical equipment, cords and appliances, ensuring your workplace stays compliant with AS/NZS 3760 and Victorian safety regulations.`,
  (suburb) =>
    `Looking for reliable test and tag services in ${suburb}? PowerQ has you covered. We service offices, warehouses, restaurants, schools and homes throughout ${suburb}, providing thorough electrical safety inspections backed by full public liability cover and detailed compliance reports.`,
]

const suburbs = [
  'Ballarat',
  'Bendigo',
  'Brunswick',
  'Camberwell',
  'Campbellfield',
  'Carlton',
  'Clayton',
  'Coburg',
  'Craigieburn',
  'Cranbourne',
  'Dandenong',
  'Derrimut',
  'Docklands',
  'Doncaster',
  'Fitzroy',
  'Geelong',
  'Glen Waverley',
  'Glenroy',
  'Hallam',
  'Heidelberg',
  'Laverton',
  'Melbourne CBD',
  'Port Melbourne',
  'Preston',
  'Somerton',
  'Springvale',
  'Sunshine North',
  'Tarneit',
  'Thomastown',
  'Truganina',
  'Tullamarine',
  'Werribee',
  'Wyndham',
]

const toSlug = (suburb) => suburb.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const locations = suburbs.map((suburb, i) => ({
  suburb,
  slug: `test-and-tag-in-${toSlug(suburb)}`,
  intro: introTemplates[i % introTemplates.length](suburb),
}))

export const getLocationBySlug = (slug) => locations.find((l) => l.slug === slug)
