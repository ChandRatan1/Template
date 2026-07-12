// Smoke Alarm Service page content, sourced verbatim from /Content/Smokealarmservice.html.
// This page has a bespoke layout (dark/light card sections, fact cards, plain FAQ accordion,
// footnoted rental section) that doesn't fit the generic ServiceSection/ContentBlocks pattern
// used by the other 6 service pages, so it's rendered by its own SmokeAlarmPage component.

export const relations = {
  heading: 'We at PowerQ Test & Tag Melbourne believe in making relations',
  paragraph:
    'Based in Melbourne, PowerQ Test & Tag Melbourne offers [electrical testing and tagging](/electrical-test-and-tag-in-melbourne) services in Melbourne with full compliance to test and tag regulations that apply for Victoria. We are an experienced team of smart and skilled professionals, with full public liability cover and competence in test and tag services. We assure you complete peace of mind when you engage us as we follow all test and tag regulations that apply to your industry. We pride ourselves on delivering prompt, reliable, and affordable services tailored to meet your specific needs. Trust PowerQ Test & Tag Melbourne to ensure the safety and compliance of your electrical equipment.',
  image: '/content-img/WEB-DEVELOPMENT-4-1024x512.png',
}

export const inspect = {
  image: '/content-img/fire-gda479faea_640.jpg',
  heading: 'Inspect and Test Stand Alone Smoke Alarms',
  subheading: 'Why should I have a smoke alarm?',
  points: [
    'When you’re asleep you lose your sense of smell. A working smoke alarm will alert you if there is smoke from a fire.',
    'A small fire can grow to involve an entire room in two to three minutes.',
    'A working smoke alarm provides early warning and time to escape safely.',
  ],
  cta: { text: 'CONTACT US', href: '/request-a-quote' },
}

export const compulsory = {
  heading: 'Smoke alarms are compulsory in every home',
  subheading: 'By law, all residential properties must have working smoke alarms complying with Australian Standards AS 3786.',
  cards: [
    {
      icon: 'fas fa-home',
      text: 'Residential homes constructed after 1 August 1997, or homes which have undergone a major renovation or extension, must have smoke alarms connected to 240-volt mains power with battery backup.',
    },
    { icon: 'fas fa-home', text: 'Residential homes constructed before 1 August 1997 may have battery-operated smoke alarms.' },
    {
      icon: 'fas fa-home',
      text: 'Residential homes constructed after 1 May 2014, or homes which have undergone a major renovation or extension, must have smoke alarms interconnected (if there is a requirement for more than one smoke alarm).',
    },
  ],
}

export const newLaws =
  'New Smoke Alarm Laws in Victoria. The recently changed Residential Tenancy Regulations has made it mandatory for landlords to conduct regular gas and electric safety checks on their rental properties. Gas and electric safety checks must be done at least every 2 years and smoke alarms must be tested annually.'

export const facts = {
  heading: 'Smoke alarm facts',
  groups: [
    {
      lead: 'If you don’t have a working smoke alarm installed in your home and a fire occurs:',
      items: [{ icon: 'fas fa-house-damage', text: 'You are more likely to incur property loss and damage.' }],
    },
    {
      lead: 'All smoke alarms:',
      items: [
        { icon: 'fas fa-user-injured', text: 'You are more likely to suffer serious injury or death.' },
        { icon: 'fas fa-home', text: 'Need to be tested monthly.' },
        { icon: 'fas fa-battery-half', text: 'Contain a battery.' },
      ],
    },
  ],
  image: '/content-img/Need-to-be-replaced-after-10-years.jpg',
  overlayItems: ['Need to be cleaned annually', 'Need to be replaced after 10 years.'],
}

export const kitchenBathroom = {
  heading: 'Smoke alarms should not be located in kitchens and bathrooms.',
  points: [
    'The Australasian Fire and Emergency Services Council (AFAC) recommends smoke alarms be replaced with interconnected alarms in all sleeping areas, living spaces, paths of travel (hallways, stairways) and garages if they are under the home’s main roof.',
    'New Smoke Alarm Laws in Victoria. The recently changed Residential Tenancy Regulations has made it mandatory for landlords to conduct regular gas and electric safety checks on their rental properties. Gas and electric safety checks must be done at least every 2 years and smoke alarms must be tested annually.',
  ],
  secondHeading: 'Smoke alarms powered by 240-volt mains must be interconnected by an electrician.',
  point3: 'Battery operated, including long life battery alarms, can be interconnected by purchasing interconnected wireless smoke alarms. Electricians are not required to install these smoke alarms.',
}

export const installedIn = {
  heading: 'Smoke alarms must be installed in:',
  cards: [
    {
      icon: 'fas fa-home',
      title: 'All residential buildings where people sleep (houses, units, flats and townhouses).',
      text: 'This includes every bedroom, each hallway connecting a bedroom to the rest of the home, and any other area required under the Building Code of Australia. Alarms must comply with AS 3786 and be positioned according to manufacturer guidelines for early fire detection.',
    },
    {
      icon: 'far fa-building',
      title: 'Buildings used for short term accommodation',
      text: '(boarding house, guest house, hostel, bed and breakfast accommodation, cabins in caravan parks, tourist parks, holiday resorts, and similar tourist accommodation). Victorian fire and rescue services recommend smoke alarms connected to 240-volt mains power with a battery backup, or alarms powered by a 10 year long-life battery. When more than one smoke alarm is installed, they should be interconnected so that when any alarm activates, all smoke alarms will sound.',
    },
  ],
}

export const faq = {
  heading: 'Frequently asked questions:',
  items: [
    {
      q: 'Why should I test my smoke alarm?',
      a: 'A working smoke alarm is your first line of defence in the event of a fire. You should test your smoke alarm regularly to ensure the battery is not flat and that the alarm will sound when you need it most.',
    },
    {
      q: 'Why does my smoke alarm beep once every 60 seconds or intermittently?',
      a: 'This could mean that the battery is going flat and needs replacing.',
      note: 'Replace the entire smoke alarm if it still beeps after installing a new battery.',
    },
    {
      q: 'Why do 240-volt smoke alarms have a battery?',
      a: '240-volt smoke alarms connected to mains power are required to have a battery to provide back-up power in the event of a power outage.',
    },
    {
      q: 'What can I do if my smoke alarm operates every time I make toast or have a shower?',
      a: 'Do not remove the battery. A primary reason why smoke alarms do not operate when needed is because batteries have been removed after repeated false alarms. What you should do is:',
      list: [
        'Check the type of smoke alarm installed – if it is an ionisation type, consider replacing it with a photoelectric type smoke alarm.',
        'Consider installing an exhaust fan in the kitchen or bathroom.',
        'Consider relocating the smoke alarm away from the kitchen or bathroom.',
      ],
    },
  ],
}

export const rental = {
  heading: 'Rental Properties:',
  paragraphs: [
    'Residential rental providers are responsible for fitting smoke alarms in rented properties.¹',
    'Victoria’s Residential Tenancies Act, Section 68 (1), states “A residential rental provider must ensure that rented premises are provided and maintained in good repair.” A landlord must repair or replace a non-functioning smoke alarm once notified by the tenant.²',
    'It is the responsibility of renters to test the smoke alarm each month and it is the responsibility of the landlord or owner to clean the smoke alarm and replace the battery annually (if applicable).³',
  ],
  footnotes: [
    '1. Consumer Affairs Victoria, Renting a home: A guide for tenants, p. 20, 32',
    '2. Residential Tenancies Amendment Act 2018',
    '3. Australasian Fire and Emergency Service Authorities Council, Smoke Alarm in Residential Accommodation, 2018, p. 4.',
  ],
}

export const includedExcluded = {
  includedHeading: 'What is included in our smoke alarm service:',
  included: [
    'Safety check',
    'Battery replacement',
    'Cleaning of smoke alarm for better protection',
    'Smoke alarm positioning',
    'Digitally recorded',
    'Service report',
  ],
  excludedHeading: 'What is excluded from our smoke alarm inspection?',
  excluded: [
    'We do not install any new or replace any old smoke alarm.',
    'We do not connect or run new wiring to connect new smoke alarm.',
    'We do not service or replace any smoke alarms that are preinstalled but not in service or out of date.',
  ],
}
