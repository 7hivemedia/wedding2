/**
 * Central configuration for the Wedding Invitation.
 * Edit text, dates, venue, timings, map URL, and WhatsApp link here.
 */
export const WEDDING_CONFIG = {
  meta: {
    title: 'Hariom weds Akansha – Wedding Invitation',
    coupleShort: 'Hariom & Akansha',
    coupleHindi: 'हरिओम तिवारी & आकांक्षा पांडेय',
  },
  doors: {
    sealLabelEn: 'Tap to Open',
    sealLabelHi: 'खोलें',
    ariaLabel: 'Tap or press Enter to open the wedding invitation',
  },
  nav: [
    { id: 'home', label: 'Home' },
    { id: 'families', label: 'Families' },
    { id: 'events', label: 'Events' },
  ],
  hero: {
    invocation: '|| श्री गणेशाय नमः ||',
    prelude: 'Please join us to celebrate the wedding of:',
    coupleNames: 'Hariom & Akansha',
    coupleHindi: 'हरिओम तिवारी & आकांक्षा पांडेय',
    month: 'JANUARY',
    dayOfWeek: 'WEDNESDAY',
    dateRange: '27–30',
    year: '2027',
    venueNote: 'Venue & timings to be announced',
  },
  families: {
    heading: "With Our Families' Blessings",
    groom: {
      role: 'The Groom',
      name: 'Hariom Tiwari',
      parentsLabel: 'Son of',
      parents: 'Shri Ghanshyam Tiwari & Smt. Rita Devi',
      address:
        'Village Parsauni, Post Maheshpur, P.S. Vijaipur, Dist. Gopalganj, Bihar – 841508',
    },
    bride: {
      role: 'The Bride',
      name: 'Akansha Pandey',
      parentsLabel: 'Daughter of',
      parents: 'Shri Deenbandhu Pandey & Smt. Kalawati Devi',
      address:
        'Village Ratanpura, Post Kanchanpur, P.S. Tarkulawa, Dist. Deoria, Uttar Pradesh – 274408',
    },
  },
  eventsSection: {
    heading: 'Wedding Celebrations',
    events: [
      {
        id: 'tilak',
        title: 'Tilak & Yagyopavit Sanskar',
        hindi: 'तिलक एवं यज्ञोपवीत संस्कार',
        dayName: 'Wed',
        dateNum: '27',
        monthYear: 'Jan 2027',
        time: 'Time TBA',
        color: '#7A5BB5',
        isoStart: '20270127T100000',
        isoEnd: '20270127T160000',
        location: 'Village Parsauni, Gopalganj, Bihar (Exact venue TBA)',
      },
      {
        id: 'haldi',
        title: 'Haldi',
        hindi: 'हल्दी',
        dayName: 'Thu',
        dateNum: '28',
        monthYear: 'Jan 2027',
        time: 'Time TBA',
        color: '#D47FC4',
        isoStart: '20270128T110000',
        isoEnd: '20270128T150000',
        location: 'Venue to be announced',
      },
      {
        id: 'baraat',
        title: 'Baraat',
        hindi: 'बारात',
        dayName: 'Fri',
        dateNum: '29',
        monthYear: 'Jan 2027',
        time: 'Time TBA',
        color: '#5F8C73',
        isoStart: '20270129T180000',
        isoEnd: '20270129T235900',
        location: 'Village Ratanpura, Deoria, Uttar Pradesh (Exact venue TBA)',
      },
      {
        id: 'vidai',
        title: 'Vidai',
        hindi: 'विदाई',
        dayName: 'Sat',
        dateNum: '30',
        monthYear: 'Jan 2027',
        time: 'Time TBA',
        color: '#5A63B5',
        isoStart: '20270130T080000',
        isoEnd: '20270130T110000',
        location: 'Village Ratanpura, Deoria, Uttar Pradesh (Exact venue TBA)',
      },
    ],
  },
  countdown: {
    heading: 'Counting Down to the Celebrations',
    // Target: 27 Jan 2027 00:00:00 IST (+05:30)
    targetIso: '2027-01-27T00:00:00+05:30',
    completedText: 'The Celebrations Have Begun!',
  },
  actions: {
    calendarLabel: 'Add to Calendar',
    calendarFilename: 'hariom-akansha-wedding-2027.ics',
    mapsLabel: 'Open in Maps',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Parsauni+Vijaipur+Gopalganj+Bihar+841508',
    whatsappLabel: 'WhatsApp Blessings',
    whatsappUrl:
      'https://wa.me/?text=Warmest%20wedding%20blessings%20and%20congratulations%20to%20Hariom%20%26%20Akansha%20for%20January%2027%E2%80%9330%2C%202027!',
  },
  footer: {
    prelude: 'With best compliments',
    familyEn: 'All Tiwari Family',
    familyHi: 'सभी तिवारी परिवार',
  },
};
