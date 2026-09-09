export interface ResearchStation {
  id: string;
  name: string;
  region: 'Antarctica' | 'Arctic' | 'Southern Ocean' | 'Himalayas';
  coordinates: [number, number]; // [lat, lng]
  elevation: string;
  established: number;
  status: 'Operational Year-Round' | 'Seasonal' | 'Historical' | 'Moored Observatory';
  description: string;
  facilities: string[];
  scientificFocus: string[];
  image: string;
  associatedExpeditions: string[];
  associatedDatasets: string[];
  associatedPublications: string[];
  mediaCount: number;
}

export interface Expedition {
  id: string;
  code: string;
  name: string;
  region: 'Antarctica' | 'Arctic' | 'Southern Ocean' | 'Himalayas';
  year: number;
  duration: string;
  leadResearcher: string;
  vesselOrBase: string;
  status: 'Completed' | 'Active' | 'Under Analysis';
  summary: string;
  objectives: string[];
  highlights: string[];
  researchDomains: string[];
  heroImage: string;
  galleryImages: string[];
  reportsCount: number;
  datasetsCount: number;
  participatingInstitutions: string[];
  scientistsCount: number;
}

export interface ReportItem {
  id: string;
  title: string;
  code: string;
  category: 'Expedition Report' | 'Technical Monograph' | 'Scientific Brief' | 'Field Assessment';
  author: string;
  coAuthors: string[];
  institution: string;
  year: number;
  region: 'Antarctica' | 'Arctic' | 'Southern Ocean' | 'Himalayas';
  expeditionId: string;
  expeditionName: string;
  researchDomain: string;
  doi: string;
  pages: number;
  fileSize: string;
  fileFormat: 'PDF' | 'DOCX';
  abstract: string;
  executiveSummary: string;
  keyFindings: string[];
  keywords: string[];
  citation: string;
  relatedDatasetIds: string[];
  relatedPublicationIds: string[];
  relatedMediaIds: string[];
  coverImage: string;
}

export interface DatasetItem {
  id: string;
  title: string;
  code: string;
  region: 'Antarctica' | 'Arctic' | 'Southern Ocean' | 'Himalayas';
  domain: string;
  year: number;
  format: 'NetCDF' | 'CSV' | 'GeoJSON' | 'HDF5';
  size: string;
  recordsCount: string;
  accessStatus: 'Public Open Access' | 'Embargoed' | 'Restricted Scientific';
  leadInvestigator: string;
  institution: string;
  coordinatesBbox: string;
  temporalCoverage: string;
  description: string;
  citation: string;
  variables: string[];
  sampleData: Array<{ timestamp: string; value: number; secondaryValue?: number; depthOrAlt?: number }>;
  unit: string;
  parameterName: string;
  secondaryParameterName?: string;
  relatedExpeditionId: string;
  relatedPublicationIds: string[];
}

export interface PublicationItem {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  volume: string;
  year: number;
  doi: string;
  region: 'Antarctica' | 'Arctic' | 'Southern Ocean' | 'Himalayas';
  domain: string;
  abstract: string;
  citationsCount: number;
  openAccess: boolean;
  relatedExpeditionId: string;
  relatedDatasetIds: string[];
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'Photo' | 'Video' | '360 Experience' | 'Audio / Hydrophone';
  category: 'Landscape' | 'Wildlife' | 'Station Life' | 'Scientific Equipment' | 'Aerial';
  region: 'Antarctica' | 'Arctic' | 'Southern Ocean' | 'Himalayas';
  year: number;
  expedition: string;
  photographer: string;
  location: string;
  coordinates: string;
  cameraInfo: string;
  url: string;
  thumbnail: string;
  duration?: string;
  description: string;
  license: string;
  tags: string[];
}

export interface ResearcherItem {
  id: string;
  name: string;
  title: string;
  institution: string;
  role: string;
  domain: string;
  photo: string;
  bio: string;
  researchInterests: string[];
  expeditionsCount: number;
  publicationsCount: number;
  datasetsCount: number;
  expeditionIds: string[];
  email: string;
  orcid: string;
}

export interface StoryItem {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  category: 'Station Life' | 'Deep Science' | 'Exploration' | 'Ocean Voyages' | 'Climate Frontier';
  author: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  heroImage: string;
  heroCaption: string;
  summary: string;
  contentParagraphs: string[];
  keyFacts: string[];
  pullQuote: string;
  pullQuoteAuthor: string;
  relatedReportIds: string[];
  relatedDatasetIds: string[];
}

export interface EducationalModule {
  id: string;
  title: string;
  targetLevel: 'Middle School' | 'High School' | 'Undergraduate' | 'General Public';
  duration: string;
  region: 'Antarctica' | 'Arctic' | 'Southern Ocean';
  description: string;
  keyConcepts: string[];
  image: string;
  interactiveActivity: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  category: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  scientificContext: string;
}

// -------------------------------------------------------------
// STATIONS & OBSERVATORIES
// -------------------------------------------------------------
export const POLAR_STATIONS: ResearchStation[] = [
  {
    id: 'bharati',
    name: 'Bharati Antarctic Station',
    region: 'Antarctica',
    coordinates: [-69.4072, 76.1914], // Larsemann Hills, East Antarctica
    elevation: '35 m above sea level',
    established: 2012,
    status: 'Operational Year-Round',
    description: 'A third-generation Antarctic research base constructed on stilts to prevent snow accumulation. Specializes in atmospheric sciences, space physics, satellite ground stations, and coastal oceanography.',
    facilities: ['Atmospheric Laboratory', 'Satellite Earth Station', 'Clean Chemistry Lab', 'Sea Ice Observatory', 'High-speed Polar Link'],
    scientificFocus: ['Upper Atmosphere Dynamics', 'Geomagnetic Pulsations', 'Southern Ocean Coastal Currents', 'Meteorite Tracking'],
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    associatedExpeditions: ['exp-43-iae', 'exp-42-iae', 'exp-41-iae'],
    associatedDatasets: ['ds-ice-01', 'ds-atm-02', 'ds-geomag-04'],
    associatedPublications: ['pub-01', 'pub-04'],
    mediaCount: 420
  },
  {
    id: 'maitri',
    name: 'Maitri Research Base',
    region: 'Antarctica',
    coordinates: [-70.7667, 11.7333], // Schirmacher Oasis
    elevation: '117 m above sea level',
    established: 1989,
    status: 'Operational Year-Round',
    description: 'Located in the ice-free rocky oasis of Schirmacher Hills, Dronning Maud Land. Maitri hosts deep-drilling glaciology labs, paleoclimate limnology experiments, and year-round seismological telemetry.',
    facilities: ['Lake Priyadarshini Water Quality Lab', 'Digital Broadband Seismological Lab', 'Permanent GPS Observatory', 'Medical Telemedicine Station'],
    scientificFocus: ['Schirmacher Oasis Limnology', 'Paleoclimate Lacustrine Sediments', 'Antarctic Plate Tectonics', 'Human Physiological Adaptation'],
    image: 'https://images.unsplash.com/photo-1687904368738-ca6423635666?auto=format&fit=crop&w=1200&q=80',
    associatedExpeditions: ['exp-43-iae', 'exp-42-iae'],
    associatedDatasets: ['ds-limno-03', 'ds-seism-06'],
    associatedPublications: ['pub-02', 'pub-05'],
    mediaCount: 380
  },
  {
    id: 'himadri',
    name: 'Himadri Arctic Research Station',
    region: 'Arctic',
    coordinates: [78.9236, 11.9281], // Ny-Ålesund, Svalbard, Norway
    elevation: '15 m above sea level',
    established: 2008,
    status: 'Seasonal',
    description: 'Located at Ny-Ålesund, Svalbard, within 1,200 km of the North Pole. Himadri monitors Arctic aerosol dynamics, fjord oceanography in Kongsfjorden, and snow microbiology.',
    facilities: ['Aerosol Chemical Characterization Lab', 'Kongsfjorden Moorings Access', 'Microbial Metagenomics Bench', 'Cryospheric Snow Depth Sensors'],
    scientificFocus: ['Short-Lived Climate Pollutants', 'Glacial Runoff Biogeochemistry', 'Permafrost Carbon Flux', 'Arctic Zooplankton Transitions'],
    image: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?auto=format&fit=crop&w=1200&q=80',
    associatedExpeditions: ['exp-arctic-24', 'exp-arctic-23'],
    associatedDatasets: ['ds-aero-05', 'ds-fjord-07'],
    associatedPublications: ['pub-03', 'pub-06'],
    mediaCount: 290
  },
  {
    id: 'indarc',
    name: 'IndARC Subsurface Moored Observatory',
    region: 'Arctic',
    coordinates: [79.0000, 11.5000], // Kongsfjorden Mid-Fjord
    elevation: '-192 m (subsurface)',
    established: 2014,
    status: 'Moored Observatory',
    description: 'An underwater mooring system deployed midway between the Kongsvegen glacier and the Fram Strait mouth to sample water temperature, salinity, currents, and acoustic biology throughout Arctic polar nights.',
    facilities: ['Acoustic Doppler Current Profilers', 'CTD Recorders', 'Sediment Traps', 'Hydrophone Arrays'],
    scientificFocus: ['Atlantic Water Ingress to Arctic', 'Seasonal Fjord Thermohaline Circulation', 'Polar Marine Acoustics'],
    image: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?auto=format&fit=crop&w=1200&q=80',
    associatedExpeditions: ['exp-arctic-24'],
    associatedDatasets: ['ds-indarc-08'],
    associatedPublications: ['pub-03'],
    mediaCount: 110
  },
  {
    id: 'dakshin-gangotri',
    name: 'Dakshin Gangotri Site (Historical Monument)',
    region: 'Antarctica',
    coordinates: [-70.0833, 12.0000], // Princess Astrid Coast ice shelf
    elevation: 'Ice Shelf at Sea Level',
    established: 1983,
    status: 'Historical',
    description: 'The pioneering polar scientific station built on the floating ice shelf of Princess Astrid Coast. Today preserved as an Antarctic Treaty Historical Site and Monument (HSM No. 44).',
    facilities: ['Commemorative Plaque', 'Historical Ice Measurement Markers'],
    scientificFocus: ['Historical Ice Shelf Flow Calibration', 'Polar Heritage Preservation'],
    image: 'https://images.unsplash.com/photo-1551415923-31d2072bc248?auto=format&fit=crop&w=1200&q=80',
    associatedExpeditions: ['exp-historical-83'],
    associatedDatasets: [],
    associatedPublications: ['pub-hist-01'],
    mediaCount: 180
  },
  {
    id: 'soe-transect-60s',
    name: 'Southern Ocean Polar Frontal Observatory (60°S)',
    region: 'Southern Ocean',
    coordinates: [-60.0000, 57.5000], // Sub-Antarctic Front
    elevation: 'Ocean Surface to 4,500m Benthic',
    established: 2004,
    status: 'Operational Year-Round',
    description: 'Hydrographic and biological deep-ocean sampling corridor straddling the Sub-Antarctic Front, Polar Front, and Southern Antarctic Circumpolar Current Boundary.',
    facilities: ['Deep CTD Rosette', 'Continuous Plankton Recorder', 'PCO2 Continuous Underway Equilibrator'],
    scientificFocus: ['Southern Ocean Carbon Sink Efficiency', 'Antarctic Intermediate Water Ventilation', 'Krill Biomass Acoustical Mapping'],
    image: 'https://images.unsplash.com/photo-1687904590788-a3ce87df66d6?auto=format&fit=crop&w=1200&q=80',
    associatedExpeditions: ['exp-soe-12', 'exp-soe-11'],
    associatedDatasets: ['ds-ocean-09', 'ds-krill-10'],
    associatedPublications: ['pub-07', 'pub-08'],
    mediaCount: 240
  }
];

// -------------------------------------------------------------
// EXPEDITIONS
// -------------------------------------------------------------
export const POLAR_EXPEDITIONS: Expedition[] = [
  {
    id: 'exp-43-iae',
    code: '43-IAE',
    name: '43rd Indian Scientific Expedition to Antarctica',
    region: 'Antarctica',
    year: 2024,
    duration: '114 Days (Nov 2023 - Mar 2024)',
    leadResearcher: 'Dr. Vikramaditya Sen',
    vesselOrBase: 'Chartered Ice-Class Vessel MV Vasiliy Golovnin',
    status: 'Under Analysis',
    summary: 'Conducted comprehensive glaciological traverse across the Polar Ice Sheet, deployed automated weather buoys, drilled 120m ice cores near Dronning Maud Land, and replenished Bharati and Maitri research infrastructure.',
    objectives: [
      'Extract 120m deep ice cores for paleoclimate reconstruction spanning 2,000 years',
      'Deploy autonomous GPS receivers for continuous ice-sheet flow tracking',
      'Conduct aerosol and cloud condensation nuclei sampling over Princess Elizabeth Land',
      'Maintain year-round atmospheric and geomagnetic recording instruments'
    ],
    highlights: [
      'Successfully traversed 1,800 km on snow cats across rugged sastrugi terrains',
      'Discovered anomalous micro-layering in firn cores indicating historic storm regimes',
      'Zero lost-time safety incidents during extreme -48°C katabatic winds'
    ],
    researchDomains: ['Glaciology', 'Atmospheric Physics', 'Geodesy', 'Cryospheric Geobiology'],
    heroImage: 'https://images.unsplash.com/photo-1551415923-31d2072bc248?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1687904368738-ca6423635666?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1687904590788-a3ce87df66d6?auto=format&fit=crop&w=800&q=80'
    ],
    reportsCount: 4,
    datasetsCount: 5,
    participatingInstitutions: ['NCPOR', 'Geological Survey of India', 'Indian Institute of Geomagnetism', 'Survey of India'],
    scientistsCount: 48
  },
  {
    id: 'exp-42-iae',
    code: '42-IAE',
    name: '42nd Indian Scientific Expedition to Antarctica',
    region: 'Antarctica',
    year: 2023,
    duration: '128 Days (Nov 2022 - Apr 2023)',
    leadResearcher: 'Dr. Anandita Chatterjee',
    vesselOrBase: 'MV Vasiliy Golovnin & Bharati Station',
    status: 'Completed',
    summary: 'Focused on Larsemann Hills coastal dynamics, Southern Ocean boundary layer turbulence, and benthic ecosystem surveys under fast ice.',
    objectives: [
      'Map fast-ice thickness variations using Ground Penetrating Radar (GPR)',
      'Characterize cold-adapted extremophile bacteria in supra-glacial lakes',
      'Evaluate structural fatigue on station stilt foundations subjected to permafrost creep'
    ],
    highlights: [
      'Collected 140 CTD oceanographic casts in Prydz Bay',
      'Sequenced novel microbial genomes with specialized antifreeze enzymes'
    ],
    researchDomains: ['Oceanography', 'Microbiology', 'Cryospheric Structural Engineering'],
    heroImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1687904368738-ca6423635666?auto=format&fit=crop&w=800&q=80'
    ],
    reportsCount: 5,
    datasetsCount: 6,
    participatingInstitutions: ['NCPOR', 'National Institute of Oceanography', 'CSIR-IMTECH'],
    scientistsCount: 52
  },
  {
    id: 'exp-arctic-24',
    code: 'ARCTIC-24',
    name: 'Indian Arctic Summer Scientific Expedition 2024',
    region: 'Arctic',
    year: 2024,
    duration: '65 Days (Jun 2024 - Aug 2024)',
    leadResearcher: 'Dr. Rajeshwar Nair',
    vesselOrBase: 'Himadri Research Station, Ny-Ålesund & RV Lance',
    status: 'Completed',
    summary: 'Investigated rapid glacier retreat in Kongsvegen and Blomstrandbreen, measured atmospheric black carbon transport from mid-latitudes, and retrieved deep mooring data from IndARC.',
    objectives: [
      'Retrieve and redeploy the multi-sensor IndARC underwater mooring',
      'Quantify seasonal freshwater flux from meltwater runoff into Kongsfjorden',
      'Sample atmospheric aerosol size distributions during the Arctic haze period'
    ],
    highlights: [
      'Recorded 100% data recovery rate from the 192m depth IndARC sensor array',
      'Identified episodic mid-latitude atmospheric river intrusion events carrying black carbon'
    ],
    researchDomains: ['Atmospheric Science', 'Fjord Oceanography', 'Glacial Hydrology'],
    heroImage: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?auto=format&fit=crop&w=800&q=80'
    ],
    reportsCount: 3,
    datasetsCount: 4,
    participatingInstitutions: ['NCPOR', 'IIT Roorkee', 'Indian Institute of Tropical Meteorology'],
    scientistsCount: 22
  },
  {
    id: 'exp-soe-12',
    code: 'SOE-12',
    name: '12th Southern Ocean Scientific Expedition',
    region: 'Southern Ocean',
    year: 2023,
    duration: '60 Days (Jan 2023 - Mar 2023)',
    leadResearcher: 'Dr. Meenakshi Sundaram',
    vesselOrBase: 'SA Agulhas II',
    status: 'Completed',
    summary: 'A dedicated multi-disciplinary oceanic voyage from Mauritius to 68°S along the 57.5°E transect. Documented biogeochemical carbon pump efficiency, zooplankton shifts, and atmospheric trace gases.',
    objectives: [
      'Sample 32 hydrographic stations from 40°S to the Antarctic continental margin',
      'Measure pCO2 air-sea gas exchange in the high-wind roaring forties',
      'Map distribution of Euphausia superba (Antarctic krill) using multi-frequency echosounders'
    ],
    highlights: [
      'Unveiled deeper penetration of anthropogenic carbon into Antarctic Intermediate Water',
      'Discovered localized phytoplankton blooming fueled by hydrothermal iron plumes'
    ],
    researchDomains: ['Ocean Biogeochemistry', 'Physical Oceanography', 'Marine Ecology'],
    heroImage: 'https://images.unsplash.com/photo-1687904590788-a3ce87df66d6?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?auto=format&fit=crop&w=800&q=80'
    ],
    reportsCount: 3,
    datasetsCount: 4,
    participatingInstitutions: ['NCPOR', 'INCOIS', 'Goa University'],
    scientistsCount: 34
  },
  {
    id: 'exp-arctic-23',
    code: 'ARCTIC-23',
    name: 'Indian Arctic Winter Precursor Campaign 2023',
    region: 'Arctic',
    year: 2023,
    duration: '45 Days (Nov 2023 - Dec 2023)',
    leadResearcher: 'Dr. Priya Harikrishnan',
    vesselOrBase: 'Himadri Research Station',
    status: 'Completed',
    summary: 'The milestone early-winter observation campaign at Ny-Ålesund studying polar night biological rhythms, auroral ionization, and seasonal sea ice onset.',
    objectives: [
      'Measure baseline winter biological activity in fjord zooplankton during continuous darkness',
      'Monitor optical auroral emissions using all-sky imaging',
      'Assess winter boundary layer atmospheric stability under strong thermal inversions'
    ],
    highlights: [
      'Pioneered continuous Indian scientific monitoring during Svalbard polar night',
      'Correlated energetic electron precipitation with mesospheric ozone dips'
    ],
    researchDomains: ['Space Physics', 'Polar Biology', 'Boundary Layer Meteorology'],
    heroImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [],
    reportsCount: 2,
    datasetsCount: 3,
    participatingInstitutions: ['NCPOR', 'Indian Institute of Science'],
    scientistsCount: 14
  },
  {
    id: 'exp-41-iae',
    code: '41-IAE',
    name: '41st Indian Scientific Expedition to Antarctica',
    region: 'Antarctica',
    year: 2022,
    duration: '120 Days (Nov 2021 - Mar 2022)',
    leadResearcher: 'Dr. Shailendra Saini',
    vesselOrBase: 'Chartered Ice-Class Vessel MV Vasiliy Golovnin',
    status: 'Completed',
    summary: 'Deployed advanced seismic broadband sensors along the Central Dronning Maud Land Escarpment, installed automatic energy management at Maitri, and collected snow radar stratigraphy.',
    objectives: [
      'Study lithospheric structure beneath the East Antarctic Ice Sheet',
      'Conduct environmental audit around Schirmacher Oasis and Larsemann Hills',
      'Measure solar UV-B radiation indices at sea level versus inland ice'
    ],
    highlights: [
      'Drilled 35m firm cores revealing sulfur isotope signatures from volcanic events',
      'Demonstrated 30% reduction in station fuel consumption via intelligent load balancers'
    ],
    researchDomains: ['Geophysics', 'Glaciology', 'Environmental Science'],
    heroImage: 'https://images.unsplash.com/photo-1687904368738-ca6423635666?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [],
    reportsCount: 3,
    datasetsCount: 4,
    participatingInstitutions: ['NCPOR', 'National Geophysical Research Institute'],
    scientistsCount: 44
  }
];

// -------------------------------------------------------------
// HISTORICAL TIMELINE MILESTONES
// -------------------------------------------------------------
export interface TimelineMilestone {
  year: number;
  title: string;
  category: 'Milestone' | 'Station' | 'Expedition' | 'Technology';
  region: 'Antarctica' | 'Arctic' | 'Southern Ocean' | 'Himalayas';
  summary: string;
  scientificObjectives: string[];
  highlights: string[];
  image: string;
  associatedReportCode?: string;
}

export const POLAR_TIMELINE: TimelineMilestone[] = [
  {
    year: 1981,
    title: 'Operation Gangotri: First Indian Antarctic Expedition',
    category: 'Milestone',
    region: 'Antarctica',
    summary: 'Flagged off from Goa aboard the chartered vessel MV Polar Circle under the leadership of Dr. S.Z. Qasim. Landed in Antarctica on January 9, 1982.',
    scientificObjectives: [
      'Establish capability for polar navigation and scientific sampling in the Southern Ocean',
      'Conduct preliminary meteorological and magnetic field observations',
      'Collect marine flora, fauna, and water samples from the ice edge'
    ],
    highlights: [
      'First footprint of Indian science on the Antarctic continent',
      'Set up an unmanned solar-powered weather monitoring station'
    ],
    image: 'https://images.unsplash.com/photo-1551415923-31d2072bc248?auto=format&fit=crop&w=800&q=80',
    associatedReportCode: 'REP-1981-01'
  },
  {
    year: 1983,
    title: 'Commissioning of Dakshin Gangotri Research Station',
    category: 'Station',
    region: 'Antarctica',
    summary: 'Built in a record 60 days on the Princess Astrid Coast ice shelf by a team of scientists and Indian Army engineers during the 3rd Expedition.',
    scientificObjectives: [
      'Enable first continuous overwintering of scientists in Antarctica',
      'Monitor ice shelf movement, glaciology, and meteorological trends',
      'Establish permanent high-frequency radio communication links'
    ],
    highlights: [
      'Accommodated 12 scientists during the harsh 1984 winter with temperatures plunging to -52°C',
      'Laid foundation for India joining the Antarctic Treaty as a Consultative Party'
    ],
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
    associatedReportCode: 'REP-1983-03'
  },
  {
    year: 1989,
    title: 'Establishment of Maitri Base in Schirmacher Oasis',
    category: 'Station',
    region: 'Antarctica',
    summary: 'Constructed on solid bedrock in the ice-free Schirmacher Oasis, replacing Dakshin Gangotri which was steadily being submerged by snow.',
    scientificObjectives: [
      'Long-term geologic and seismic observations on Antarctic continental bedrock',
      'Lacustrine studies of freshwater periglacial lakes (Lake Priyadarshini)',
      'Paleo-magnetic surveys tracing Gondwanaland supercontinent connections'
    ],
    highlights: [
      'Over 35 continuous years of uninterrupted scientific observations',
      'Direct link between Indian cratons and East Antarctic geology demonstrated'
    ],
    image: 'https://images.unsplash.com/photo-1687904368738-ca6423635666?auto=format&fit=crop&w=800&q=80',
    associatedReportCode: 'REP-1989-08'
  },
  {
    year: 2004,
    title: 'Launch of Dedicated Southern Ocean Expeditions (SOE)',
    category: 'Expedition',
    region: 'Southern Ocean',
    summary: 'Initiation of dedicated oceanic voyages investigating the Antarctic Circumpolar Current, ocean-atmosphere CO2 flux, and marine food webs.',
    scientificObjectives: [
      'Quantify the carbon absorption capacity of high-latitude waters',
      'Map physical frontal systems (Subtropical Front, Sub-Antarctic Front, Polar Front)',
      'Monitor krill biomass acoustics and trace metal concentrations'
    ],
    highlights: [
      'Established the multi-decade 57.5°E hydrographic standard section',
      'Showed vital role of Southern Ocean in buffering global anthropogenic warming'
    ],
    image: 'https://images.unsplash.com/photo-1687904590788-a3ce87df66d6?auto=format&fit=crop&w=800&q=80',
    associatedReportCode: 'REP-2004-SOE1'
  },
  {
    year: 2008,
    title: 'Expansion to Arctic: Himadri Research Station at Ny-Ålesund',
    category: 'Station',
    region: 'Arctic',
    summary: 'Inauguration of Himadri at Ny-Ålesund, Svalbard (79°N), marking the formal beginning of Indian long-term Arctic polar monitoring.',
    scientificObjectives: [
      'Investigate Arctic teleconnections and their influence on the Indian Summer Monsoon',
      'Study glacier mass balance and melt dynamics in Kongsfjorden',
      'Sample atmospheric black carbon and persistent organic pollutants'
    ],
    highlights: [
      'Joined the elite international scientific consortium at the world’s northernmost permanent settlement',
      'Linked Arctic sea ice decline with changing monsoon precipitation patterns'
    ],
    image: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?auto=format&fit=crop&w=800&q=80',
    associatedReportCode: 'REP-2008-ARCTIC'
  },
  {
    year: 2012,
    title: 'State-of-the-Art Bharati Antarctic Base Commissioned',
    category: 'Station',
    region: 'Antarctica',
    summary: 'Commissioned in the Larsemann Hills, East Antarctica (69°S), featuring an advanced architectural stilt structure with panoramic ocean views and minimal environmental footprint.',
    scientificObjectives: [
      'Provide continuous high-throughput satellite ground station data reception',
      'Investigate coastal oceanography and fast-ice dynamics in Prydz Bay',
      'Monitor geomagnetic pulsations and high-latitude ionospheric disturbances'
    ],
    highlights: [
      'Constructed with prefabricated intermodal containers wrapped in aerodynamic skin',
      'Certified under the strictest Antarctic Treaty environmental impact guidelines'
    ],
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
    associatedReportCode: 'REP-2012-BHARATI'
  },
  {
    year: 2014,
    title: 'Deployment of IndARC: Subsurface Arctic Moored Observatory',
    category: 'Technology',
    region: 'Arctic',
    summary: 'First underwater moored multi-sensor observatory anchored at 192m depth in Kongsfjorden, Svalbard, recording water properties throughout polar winter.',
    scientificObjectives: [
      'Observe seasonal inflow of warm saline Atlantic waters into the cold Arctic fjord',
      'Capture biological activity and zooplankton migration under continuous polar darkness',
      'Measure ambient acoustic noise and cryospheric ice fracturing sounds'
    ],
    highlights: [
      'Achieved year-round subsurface measurements in ice-covered Arctic waters',
      'Key component of the international Arctic ocean observation grid'
    ],
    image: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?auto=format&fit=crop&w=800&q=80',
    associatedReportCode: 'REP-2014-INDARC'
  },
  {
    year: 2024,
    title: 'Integrated Third-Pole & Bipolar Cryosphere Observational Network',
    category: 'Milestone',
    region: 'Antarctica',
    summary: 'Unification of Arctic, Antarctic, and Himalayan high-altitude (Himansh) observations into a single interconnected polar Earth system modeling framework.',
    scientificObjectives: [
      'Harmonize deep ice core paleoclimate records across the polar and third-pole domains',
      'Quantify global cryospheric sea-level rise contribution with coupled ice-sheet models',
      'Accelerate open scientific discovery and science communication'
    ],
    highlights: [
      'Extracted 120m ice core in Dronning Maud Land with intact annual layering',
      'Platform for open data discovery connecting thousands of researchers and educators'
    ],
    image: 'https://images.unsplash.com/photo-1687904368738-ca6423635666?auto=format&fit=crop&w=800&q=80',
    associatedReportCode: 'REP-2024-UNIFIED'
  }
];

// -------------------------------------------------------------
// EXPEDITION REPORTS (KNOWLEDGE REPOSITORY)
// -------------------------------------------------------------
export const POLAR_REPORTS: ReportItem[] = [
  {
    id: 'rep-43-01',
    code: 'POL-REP-2024-001',
    title: 'Glaciological Stratigraphy and Mass Balance of Dronning Maud Land Ice Sheet',
    category: 'Expedition Report',
    author: 'Dr. Vikramaditya Sen',
    coAuthors: ['Dr. Ramesh Chandra', 'Dr. Sunita Deshmukh', 'Dr. Keith Braganza'],
    institution: 'National Polar Knowledge Centre',
    year: 2024,
    region: 'Antarctica',
    expeditionId: 'exp-43-iae',
    expeditionName: '43rd Indian Scientific Expedition to Antarctica',
    researchDomain: 'Glaciology',
    doi: '10.1016/j.polarsci.2024.01.008',
    pages: 64,
    fileSize: '14.2 MB',
    fileFormat: 'PDF',
    abstract: 'This scientific report synthesizes field glaciological observations conducted during the 43rd Antarctic voyage along an 1,800 km traverse in Central Dronning Maud Land. Snow radar profiles (400 MHz) combined with 120-meter firn core extractions provide a definitive assessment of annual accumulation variability between 1950 and 2023. We observe a 7.4% decadal acceleration in accumulation over coastal escarpments alongside persistent inland desiccation.',
    executiveSummary: 'Field glaciological operations traversed the Princess Astrid Coast ice shelf to the inland polar plateau. GPS-stake networks indicate surface velocity variations between 2.1 m/yr in the interior to 22.8 m/yr across coastal outlet glaciers. High-frequency radar stratigraphy successfully mapped subsurface crevasses and firn aquifer bodies, demonstrating stable ice thickness across the survey grid with isolated grounding line thinning.',
    keyFindings: [
      'Accumulation rate on the coastal slope increased by 7.4% per decade since 1990 due to cyclonic moisture intrusions.',
      'Inland polar plateau accumulation showed stability with mean annual water equivalent of 7.2 cm/year.',
      'Subsurface radar detected no basal melt channels beneath the Maitri corridor bedrock interface.',
      'Isotopic delta-18O measurements reveal a distinct cooling signature during the 1970s followed by steady +0.22°C/decade warming.'
    ],
    keywords: ['Ice Sheet Mass Balance', 'Firn Stratigraphy', 'Dronning Maud Land', 'Ground Penetrating Radar', 'Accumulation Rates'],
    citation: 'Sen, V., Chandra, R., Deshmukh, S., & Braganza, K. (2024). Glaciological Stratigraphy and Mass Balance of Dronning Maud Land Ice Sheet. POLARIS Scientific Monographs, 43(1), 1-64.',
    relatedDatasetIds: ['ds-ice-01', 'ds-atm-02'],
    relatedPublicationIds: ['pub-01', 'pub-04'],
    relatedMediaIds: ['med-01', 'med-05'],
    coverImage: 'https://images.unsplash.com/photo-1551415923-31d2072bc248?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rep-42-02',
    code: 'POL-REP-2023-014',
    title: 'Fast-Ice Dynamics, Bottom Sea Ice Ecology, and Prydz Bay Coastal Currents',
    category: 'Expedition Report',
    author: 'Dr. Anandita Chatterjee',
    coAuthors: ['Dr. Meenakshi Sundaram', 'Dr. Farooq Khan', 'Dr. Tarun Ghosh'],
    institution: 'Oceanographic Research Group',
    year: 2023,
    region: 'Antarctica',
    expeditionId: 'exp-42-iae',
    expeditionName: '42nd Indian Scientific Expedition to Antarctica',
    researchDomain: 'Oceanography',
    doi: '10.1016/j.polarsci.2023.09.012',
    pages: 82,
    fileSize: '21.6 MB',
    fileFormat: 'PDF',
    abstract: 'Investigates landfast ice formation, seasonal breakup cycles, and bottom ice algae colonization around the Larsemann Hills coastal perimeter. High-resolution Acoustic Doppler Current Profilers (ADCP) deployed through fast ice holes reveal diurnal tidal modulation of benthic boundary layer currents and nutrient replenishment.',
    executiveSummary: 'Continuous fast ice thickness monitoring from April 2022 to January 2023 demonstrated a maximum thermodynamic thickness of 1.78 meters. Microalgal chlorophyll concentrations within the bottom 5 cm of the ice matrix peaked in late November, providing an early nutritional bloom that precedes open water phytoplankton development by four weeks.',
    keyFindings: [
      'Maximum landfast ice thickness reached 1.78 m in mid-October before basal melting commenced.',
      'Sympagic diatom communities were dominated by Fragilariopsis cylindrus and Entomoneis kjellmanii.',
      'Tidal current velocities beneath the ice shelf edge reached peak speeds of 0.42 m/s during spring tides.',
      'Fast-ice stability duration was 14 days shorter than the 10-year historical baseline.'
    ],
    keywords: ['Landfast Ice', 'Prydz Bay', 'Sea Ice Algae', 'ADCP Oceanography', 'Larsemann Hills'],
    citation: 'Chatterjee, A., Sundaram, M., Khan, F., & Ghosh, T. (2023). Fast-Ice Dynamics, Bottom Sea Ice Ecology, and Prydz Bay Coastal Currents. POLARIS Expedition Series, 42(3), 1-82.',
    relatedDatasetIds: ['ds-ice-01', 'ds-ocean-09'],
    relatedPublicationIds: ['pub-04', 'pub-07'],
    relatedMediaIds: ['med-02', 'med-06'],
    coverImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rep-arc-03',
    code: 'POL-REP-2024-028',
    title: 'Aerosol Chemical Speciation and Black Carbon Deposition in Kongsfjorden, Svalbard',
    category: 'Scientific Brief',
    author: 'Dr. Rajeshwar Nair',
    coAuthors: ['Dr. Elena Rostova', 'Dr. Priya Harikrishnan', 'Dr. Marcus Lind'],
    institution: 'Atmospheric Physics Consortium',
    year: 2024,
    region: 'Arctic',
    expeditionId: 'exp-arctic-24',
    expeditionName: 'Indian Arctic Summer Scientific Expedition 2024',
    researchDomain: 'Atmospheric Science',
    doi: '10.1029/2024JD041289',
    pages: 45,
    fileSize: '9.8 MB',
    fileFormat: 'PDF',
    abstract: 'Continuous optical absorption measurements via 7-wavelength Aethalometer at Himadri station characterize equivalent black carbon (eBC) concentrations. Air mass back-trajectory analysis reveals episodes of long-range pollutant transport from Eurasian industrial hubs and boreal wildfire plumes.',
    executiveSummary: 'Atmospheric sampling during the summer melt season documented a baseline eBC level of 14 ng/m3, interrupted by three distinct intrusion events where concentrations spiked to 148 ng/m3. Snow surface albedo reductions attributed to deposited refractory black carbon ranged from 0.015 to 0.038, enhancing solar radiation absorption on glacier surfaces.',
    keyFindings: [
      'Summer baseline equivalent black carbon averaged 14.2 ng/m3 under prevailing Arctic air masses.',
      'Wildfire plumes from Eastern Siberia accounted for 68% of extreme deposition events in July.',
      'Measured snow surface albedo drops accelerated localized melting on the ablation zone of Midtre Lovenbreen.',
      'Sulfate aerosol concentrations showed strong correlation with seasonal marine biogenic dimethyl sulfide (DMS) emissions.'
    ],
    keywords: ['Arctic Aerosols', 'Black Carbon', 'Albedo Feedback', 'Kongsfjorden', 'Long-range Transport'],
    citation: 'Nair, R., Rostova, E., Harikrishnan, P., & Lind, M. (2024). Aerosol Chemical Speciation and Black Carbon Deposition in Kongsfjorden. POLARIS Research Briefs, 16(2), 1-45.',
    relatedDatasetIds: ['ds-aero-05', 'ds-fjord-07'],
    relatedPublicationIds: ['pub-03', 'pub-06'],
    relatedMediaIds: ['med-03', 'med-07'],
    coverImage: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rep-soe-04',
    code: 'POL-REP-2023-039',
    title: 'Biogeochemical Carbon Sequestration and Micronutrient Dynamics Across the Southern Ocean Polar Front',
    category: 'Expedition Report',
    author: 'Dr. Meenakshi Sundaram',
    coAuthors: ['Dr. K.V. Swaminathan', 'Dr. Jacques De Villiers', 'Dr. Shalini Roy'],
    institution: 'Southern Ocean Biogeochemistry Directorate',
    year: 2023,
    region: 'Southern Ocean',
    expeditionId: 'exp-soe-12',
    expeditionName: '12th Southern Ocean Scientific Expedition',
    researchDomain: 'Marine Biogeochemistry',
    doi: '10.1016/j.marchem.2023.104250',
    pages: 96,
    fileSize: '24.1 MB',
    fileFormat: 'PDF',
    abstract: 'Presents high-resolution biogeochemical transect data along 57.5°E from subtropical waters (40°S) to the Antarctic shelf edge (68°S). Assesses dissolved inorganic carbon (DIC), total alkalinity, and trace iron concentrations to determine seasonal carbon sink capacity and biological pump efficiency.',
    executiveSummary: 'Underway pCO2 measurements reveal that the Polar Frontal Zone acted as a net atmospheric CO2 sink with a mean flux of -3.8 mmol/m2/day during late summer. Dissolved iron limitations north of the Polar Front restricted diatom bloom expansion despite high ambient nitrate concentrations (HNLC regime). Sub-surface chlorophyll maxima were identified at depths between 45 and 75 meters.',
    keyFindings: [
      'Sub-Antarctic Zone exhibited highest net community production (NCP) of 42 mmol C/m2/day.',
      'Nanomolar dissolved iron measurements showed pronounced depletion (<0.08 nM) in open Southern Ocean waters.',
      'Antarctic Intermediate Water (AAIW) formation zone exhibited elevated concentrations of subducted anthropogenic CO2.',
      'Calcifying pteropod populations showed subtle shell dissolution signs in surface waters with aragonite saturation states below 1.4.'
    ],
    keywords: ['Southern Ocean', 'Biological Carbon Pump', 'Dissolved Iron', 'Polar Front', 'Ocean Acidification'],
    citation: 'Sundaram, M., Swaminathan, K.V., De Villiers, J., & Roy, S. (2023). Biogeochemical Carbon Sequestration Across the Southern Ocean Polar Front. POLARIS Expedition Series, 12(1), 1-96.',
    relatedDatasetIds: ['ds-ocean-09', 'ds-krill-10'],
    relatedPublicationIds: ['pub-07', 'pub-08'],
    relatedMediaIds: ['med-04', 'med-08'],
    coverImage: 'https://images.unsplash.com/photo-1687904590788-a3ce87df66d6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rep-arc-05',
    code: 'POL-REP-2024-042',
    title: 'Kongsfjorden Thermohaline Structure and Glacial Melt Inflow: IndARC Mooring Observations (2014-2024)',
    category: 'Technical Monograph',
    author: 'Dr. Priya Harikrishnan',
    coAuthors: ['Dr. Rajeshwar Nair', 'Dr. Geir Gundersen', 'Dr. Arvind Nambiar'],
    institution: 'Arctic Marine Systems Lab',
    year: 2024,
    region: 'Arctic',
    expeditionId: 'exp-arctic-24',
    expeditionName: 'Indian Arctic Summer Scientific Expedition 2024',
    researchDomain: 'Physical Oceanography',
    doi: '10.1007/s00300-024-03215-w',
    pages: 110,
    fileSize: '32.4 MB',
    fileFormat: 'PDF',
    abstract: 'A comprehensive decadal synthesis of continuous hydrographic measurements collected by the IndARC underwater mooring in Kongsfjorden, Svalbard. Analyzes the seasonal competition between cold Arctic water masses and warm Atlantic water intrusions, documenting a progressive warming trend of intermediate waters.',
    executiveSummary: 'Ten years of continuous temperature, salinity, and current velocity records demonstrate a statistically significant increase in the duration of Atlantic Water (AW) residence in Kongsfjorden during the autumn-winter transition. This "Atlantification" prevents traditional winter sea-ice consolidation and alters benthic ecosystem energy flows.',
    keyFindings: [
      'Intermediate water temperature (100m depth) increased at an average rate of 0.38°C per decade.',
      'Complete winter fast-ice coverage in outer Kongsfjorden has not been observed since 2017.',
      'Glacial freshwater plumes in summer penetrate deeper into the fjord water column due to sediment-laden hyperpycnal flows.',
      'Acoustic monitoring detected seasonal shifts in bowhead whale and ringed seal call frequencies correlated with ice cover.'
    ],
    keywords: ['IndARC', 'Kongsfjorden', 'Atlantification', 'Subsurface Mooring', 'Ocean Warming'],
    citation: 'Harikrishnan, P., Nair, R., Gundersen, G., & Nambiar, A. (2024). Kongsfjorden Thermohaline Structure: IndARC Decadal Synthesis. POLARIS Technical Monographs, 10(4), 1-110.',
    relatedDatasetIds: ['ds-indarc-08', 'ds-fjord-07'],
    relatedPublicationIds: ['pub-03', 'pub-06'],
    relatedMediaIds: ['med-03', 'med-10'],
    coverImage: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rep-41-06',
    code: 'POL-REP-2022-051',
    title: 'Broadband Seismological Investigation of Crustal Thickness Beneath Schirmacher Oasis',
    category: 'Field Assessment',
    author: 'Dr. Shailendra Saini',
    coAuthors: ['Dr. P.R. Murthy', 'Dr. Alok Verma'],
    institution: 'National Earth Science Institute',
    year: 2022,
    region: 'Antarctica',
    expeditionId: 'exp-41-iae',
    expeditionName: '41st Indian Scientific Expedition to Antarctica',
    researchDomain: 'Geophysics',
    doi: '10.1093/gji/ggac288',
    pages: 52,
    fileSize: '11.4 MB',
    fileFormat: 'PDF',
    abstract: 'Receiver function analysis of teleseismic earthquakes recorded by the permanent broadband seismological observatory at Maitri station. Constrains crustal thickness, Vp/Vs velocity ratios, and Moho discontinuity depth beneath the East Antarctic mobile belt.',
    executiveSummary: 'Analysis of 184 high-quality teleseismic earthquake events yields an estimated crustal thickness of 38.5 ± 1.2 km beneath the Schirmacher Oasis. The average Vp/Vs ratio of 1.76 suggests an intermediate-to-felsic bulk crustal composition, corroborating geological correlations with the Eastern Ghats Belt of peninsular India.',
    keyFindings: [
      'Moho depth beneath Maitri station is determined at 38.5 km with sharp seismic velocity contrast.',
      'Crustal structure exhibits strong anisotropic shear-wave splitting consistent with ancient Pan-African orogenic fabric.',
      'Local micro-earthquake monitoring detected low-magnitude (<2.0 Mw) intraplate events along coastal boundary faults.'
    ],
    keywords: ['Antarctic Seismology', 'Receiver Functions', 'Moho Discontinuity', 'Crustal Structure', 'Schirmacher Oasis'],
    citation: 'Saini, S., Murthy, P.R., & Verma, A. (2022). Broadband Seismological Investigation of Crustal Thickness Beneath Schirmacher Oasis. POLARIS Geophysics Reports, 41(2), 1-52.',
    relatedDatasetIds: ['ds-seism-06'],
    relatedPublicationIds: ['pub-05'],
    relatedMediaIds: ['med-05'],
    coverImage: 'https://images.unsplash.com/photo-1687904368738-ca6423635666?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rep-43-07',
    code: 'POL-REP-2024-063',
    title: 'Extremophilic Microflora and Bioactive Metabolites from Lake Priyadarshini Sediments',
    category: 'Scientific Brief',
    author: 'Dr. Sunita Deshmukh',
    coAuthors: ['Dr. Anandita Chatterjee', 'Dr. B.K. Tiwari'],
    institution: 'Polar Microbial Biotechnology Centre',
    year: 2024,
    region: 'Antarctica',
    expeditionId: 'exp-43-iae',
    expeditionName: '43rd Indian Scientific Expedition to Antarctica',
    researchDomain: 'Cryospheric Microbiology',
    doi: '10.1007/s00792-024-01340-9',
    pages: 58,
    fileSize: '16.7 MB',
    fileFormat: 'PDF',
    abstract: 'High-throughput metagenomic sequencing and culturable isolation of cold-tolerant psychrophilic bacteria and fungi from benthic sediment cores retrieved from Lake Priyadarshini, Schirmacher Oasis. Identifies antimicrobial peptides and cold-active lipases.',
    executiveSummary: 'Sediment core samples retrieved from water depths of 4 to 12 meters yielded 42 distinct psychrophilic bacterial isolates belonging predominantly to Actinobacteria, Proteobacteria, and Bacteroidetes. Three novel strains showed exceptional production of polyunsaturated fatty acids and cold-active esterases with optimum catalytic activity at 10°C.',
    keyFindings: [
      'Metagenomic analysis identified over 2,400 microbial operational taxonomic units in sediment top layers.',
      'Isolated strain Psychrobacter sp. MAITRI-43 demonstrated broad-spectrum inhibition against resistant fungal pathogens.',
      'Genome mining revealed extensive secondary metabolite biosynthetic gene clusters tailored for cryo-preservation.'
    ],
    keywords: ['Psychrophiles', 'Antarctic Lakes', 'Lake Priyadarshini', 'Metagenomics', 'Cold-Active Enzymes'],
    citation: 'Deshmukh, S., Chatterjee, A., & Tiwari, B.K. (2024). Extremophilic Microflora and Bioactive Metabolites from Lake Priyadarshini. POLARIS Life Sciences Series, 43(2), 1-58.',
    relatedDatasetIds: ['ds-limno-03'],
    relatedPublicationIds: ['pub-02'],
    relatedMediaIds: ['med-06', 'med-09'],
    coverImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rep-soe-08',
    code: 'POL-REP-2023-078',
    title: 'Krill Acoustic Biomass Estimation and Larval Distribution in the Enderby Basin',
    category: 'Expedition Report',
    author: 'Dr. Tarun Ghosh',
    coAuthors: ['Dr. Meenakshi Sundaram', 'Dr. Hans-Peter Siegel'],
    institution: 'Southern Ocean Biogeochemistry Directorate',
    year: 2023,
    region: 'Southern Ocean',
    expeditionId: 'exp-soe-12',
    expeditionName: '12th Southern Ocean Scientific Expedition',
    researchDomain: 'Marine Ecology',
    doi: '10.1016/j.dsr2.2023.105298',
    pages: 74,
    fileSize: '18.9 MB',
    fileFormat: 'PDF',
    abstract: 'Simrad EK80 multi-frequency acoustic surveys combined with Bongo net trawls mapped Euphausia superba and Euphausia crystallorophias distributions along the Enderby Basin continental slope. Documents larval recruitment rates and sea ice habitat dependency.',
    executiveSummary: 'Acoustic transect lines covering 2,400 nautical miles revealed high acoustic target strengths corresponding to dense krill swarms near the Southern Boundary of the Antarctic Circumpolar Current. Biomass density was estimated at 48.2 g/m2 in coastal shelf break zones, dropping to 3.4 g/m2 in northern oceanic waters.',
    keyFindings: [
      'Krill biomass concentrated along submarine canyons where upwelling delivers nutrient-rich deep water.',
      'Larval furcilia stages were strongly associated with multi-year pack ice floes providing shelter and ice-algae grazing.',
      'Echosounder frequency difference techniques (120 kHz - 38 kHz) achieved 94% classification accuracy against net catches.'
    ],
    keywords: ['Euphausia superba', 'Acoustic Biomass', 'Enderby Basin', 'Pelagic Ecology', 'Southern Ocean'],
    citation: 'Ghosh, T., Sundaram, M., & Siegel, H.P. (2023). Krill Acoustic Biomass in the Enderby Basin. POLARIS Marine Ecology Series, 12(2), 1-74.',
    relatedDatasetIds: ['ds-krill-10', 'ds-ocean-09'],
    relatedPublicationIds: ['pub-08'],
    relatedMediaIds: ['med-08'],
    coverImage: 'https://images.unsplash.com/photo-1687904590788-a3ce87df66d6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rep-42-09',
    code: 'POL-REP-2023-089',
    title: 'High-Latitude Geomagnetic Pulsations and Space Weather Monitoring at Bharati Station',
    category: 'Field Assessment',
    author: 'Dr. Farooq Khan',
    coAuthors: ['Dr. Sunita Deshmukh', 'Dr. George Varghese'],
    institution: 'Space and Atmospheric Physics Division',
    year: 2023,
    region: 'Antarctica',
    expeditionId: 'exp-42-iae',
    expeditionName: '42nd Indian Scientific Expedition to Antarctica',
    researchDomain: 'Space Physics',
    doi: '10.1029/2023SW003511',
    pages: 68,
    fileSize: '15.3 MB',
    fileFormat: 'PDF',
    abstract: 'Fluxgate and induction coil magnetometer recordings at Bharati station record Pc3-Pc5 geomagnetic pulsations and substantiate magnetospheric ring current dynamics during high-intensity solar coronal mass ejection (CME) impacts.',
    executiveSummary: 'Continuous tri-axial magnetic field telemetry recorded 14 major geomagnetic storm events throughout 2022-2023. Analysis demonstrates that ionospheric field-aligned currents at high latitudes modulate ground-induced currents (GIC) with significant amplitude surges during substorm expansion phases.',
    keyFindings: [
      'Recorded maximum magnetic disturbance of -420 nT during the March 2023 CME impact.',
      'Identified Pc5 wave resonances driven by Kelvin-Helmholtz instabilities on the magnetopause flank.',
      'Data ingested into global space weather early warning networks with sub-minute latency.'
    ],
    keywords: ['Geomagnetism', 'Space Weather', 'Bharati Station', 'Solar Storms', 'Ionosphere'],
    citation: 'Khan, F., Deshmukh, S., & Varghese, G. (2023). Geomagnetic Pulsations at Bharati Station. POLARIS Space Physics, 42(4), 1-68.',
    relatedDatasetIds: ['ds-geomag-04'],
    relatedPublicationIds: ['pub-04'],
    relatedMediaIds: ['med-01'],
    coverImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rep-arc-10',
    code: 'POL-REP-2023-102',
    title: 'Kongsfjorden Zooplankton Trophic Cascades During Autumn Ice Free Transitions',
    category: 'Scientific Brief',
    author: 'Dr. Elena Rostova',
    coAuthors: ['Dr. Rajeshwar Nair', 'Dr. Haakon Berg'],
    institution: 'Arctic Marine Systems Lab',
    year: 2023,
    region: 'Arctic',
    expeditionId: 'exp-arctic-23',
    expeditionName: 'Indian Arctic Winter Precursor Campaign 2023',
    researchDomain: 'Marine Ecology',
    doi: '10.1007/s00300-023-03178-y',
    pages: 56,
    fileSize: '12.8 MB',
    fileFormat: 'PDF',
    abstract: 'Evaluates the ecological replacement of cold-water Arctic copepod species (Calanus glacialis) by smaller, boreal Atlantic species (Calanus finmarchicus) in response to ocean warming in western Spitsbergen.',
    executiveSummary: 'Net sampling during October-November 2023 reveals Calanus finmarchicus constituting up to 72% of total copepod abundance in outer Kongsfjorden. Because C. finmarchicus contains lower lipid wax esters than Arctic native counterparts, this dietary shift exerts energetic constraints on foraging seabirds like the Little Auk.',
    keyFindings: [
      'Calanus finmarchicus biomass dominated outer fjord waters, extending 12 km further inland than five years ago.',
      'Individual lipid content per copepod decreased by 28% compared to historical cold-year baselines.',
      'Higher water column transparency prolonged grazing activity by visual predators into early polar twilight.'
    ],
    keywords: ['Calanus', 'Zooplankton', 'Kongsfjorden', 'Atlantification', 'Marine Food Web'],
    citation: 'Rostova, E., Nair, R., & Berg, H. (2023). Zooplankton Trophic Cascades in Kongsfjorden. POLARIS Polar Biology, 23(1), 1-56.',
    relatedDatasetIds: ['ds-fjord-07', 'ds-indarc-08'],
    relatedPublicationIds: ['pub-06'],
    relatedMediaIds: ['med-07'],
    coverImage: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rep-43-11',
    code: 'POL-REP-2024-118',
    title: 'Autonomous Clean Energy Microgrid Operations Under Extreme Antarctic Weather',
    category: 'Technical Monograph',
    author: 'Dr. Keith Braganza',
    coAuthors: ['Dr. Vikramaditya Sen', 'Dr. Anandita Chatterjee'],
    institution: 'Polar Engineering and Technology Division',
    year: 2024,
    region: 'Antarctica',
    expeditionId: 'exp-43-iae',
    expeditionName: '43rd Indian Scientific Expedition to Antarctica',
    researchDomain: 'Renewable Polar Engineering',
    doi: '10.1016/j.renene.2024.120541',
    pages: 70,
    fileSize: '17.8 MB',
    fileFormat: 'PDF',
    abstract: 'Documents operational performance of hybrid solar photovoltaic arrays, vertical-axis wind turbines, and lithium iron phosphate battery storage systems integrated into Bharati and Maitri station microgrids.',
    executiveSummary: 'During the 24-hour sunlight polar summer, the experimental photovoltaic installation supplied 44% of total station electrical base load, reducing diesel fuel consumption by 32,000 liters over 90 days. Vertical-axis wind turbines withstood wind gusts exceeding 140 km/h without mechanical stall.',
    keyFindings: [
      'Bifacial solar panels showed 18% enhanced yield due to high albedo reflection from pristine surrounding snowfields.',
      'Cold-temperature battery insulation housing maintained cell core temperatures at +15°C with minimal parasitic draw.',
      'CO2 emissions were curtailed by 85 metric tons during the 2023-2024 operational cycle.'
    ],
    keywords: ['Antarctic Microgrid', 'Solar PV', 'Polar Engineering', 'Emission Reductions', 'Clean Energy'],
    citation: 'Braganza, K., Sen, V., & Chatterjee, A. (2024). Autonomous Clean Energy Microgrids in Antarctica. POLARIS Engineering Reports, 43(3), 1-70.',
    relatedDatasetIds: ['ds-atm-02'],
    relatedPublicationIds: ['pub-01'],
    relatedMediaIds: ['med-01', 'med-05'],
    coverImage: 'https://images.unsplash.com/photo-1687904368738-ca6423635666?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rep-41-12',
    code: 'POL-REP-2022-130',
    title: 'Paleoclimatic Synthesis from Shallow Lacustrine Cores in Schirmacher Oasis',
    category: 'Expedition Report',
    author: 'Dr. Sunita Deshmukh',
    coAuthors: ['Dr. Ramesh Chandra', 'Dr. Shailendra Saini'],
    institution: 'National Earth Science Institute',
    year: 2022,
    region: 'Antarctica',
    expeditionId: 'exp-41-iae',
    expeditionName: '41st Indian Scientific Expedition to Antarctica',
    researchDomain: 'Paleoclimatology',
    doi: '10.1016/j.quascirev.2022.107842',
    pages: 88,
    fileSize: '19.5 MB',
    fileFormat: 'PDF',
    abstract: 'Diatom assemblages, organic carbon isotope records, and grain size distributions in sediment cores retrieved from proglacial lakes reveal Holocene climatic warm intervals and glacier retreat stages in East Antarctica.',
    executiveSummary: 'Multi-proxy analysis of a 1.4-meter sediment core from Lake Long spanning the past 9,200 calibrated years shows evidence of the Mid-Holocene Hypsithermal between 6,500 and 4,200 BP. During this interval, biological productivity in Schirmacher Oasis lakes was substantially higher than modern levels.',
    keyFindings: [
      'Radiocarbon dating confirms deglaciation of the Schirmacher Oasis rocky oasis commenced prior to 10,500 BP.',
      'Dominance of benthic diatom Pinnularia microstauron indicates extended ice-free lake surface conditions during the mid-Holocene.',
      'Neoglacial cooling after 3,000 BP caused renewed perennial lake ice caps and diminished organic sedimentation.'
    ],
    keywords: ['Paleoclimate', 'Schirmacher Oasis', 'Holocene', 'Diatoms', 'Lacustrine Sediments'],
    citation: 'Deshmukh, S., Chandra, R., & Saini, S. (2022). Paleoclimatic Synthesis from Schirmacher Oasis Lakes. POLARIS Quaternary Science, 41(3), 1-88.',
    relatedDatasetIds: ['ds-limno-03', 'ds-ice-01'],
    relatedPublicationIds: ['pub-02', 'pub-05'],
    relatedMediaIds: ['med-09'],
    coverImage: 'https://images.unsplash.com/photo-1551415923-31d2072bc248?auto=format&fit=crop&w=800&q=80'
  }
];

// -------------------------------------------------------------
// SCIENTIFIC DATASETS
// -------------------------------------------------------------
export const POLAR_DATASETS: DatasetItem[] = [
  {
    id: 'ds-ice-01',
    code: 'POL-DAT-2024-001',
    title: 'Central Dronning Maud Land Ice Velocity and Grounding Line GPS Vectors',
    region: 'Antarctica',
    domain: 'Glaciology',
    year: 2024,
    format: 'NetCDF',
    size: '1.42 GB',
    recordsCount: '482,500 points',
    accessStatus: 'Public Open Access',
    leadInvestigator: 'Dr. Vikramaditya Sen',
    institution: 'National Polar Knowledge Centre',
    coordinatesBbox: '-71.5°S to -69.8°S, 10.2°E to 14.8°E',
    temporalCoverage: 'Dec 2023 - Feb 2024 (Continuous 15-second epoch)',
    description: 'High-precision dual-frequency GNSS continuous observations tracking surface ice displacement vectors across the Dronning Maud Land transition zone. Includes kinematic baseline solutions and derived horizontal velocities.',
    citation: 'Sen, V., et al. (2024). Dronning Maud Land Ice Velocity and Grounding Line GPS Vectors [Data set]. POLARIS Data Repository. https://doi.org/10.5061/dryad.polaris.ice01',
    variables: ['Ice Velocity (m/yr)', 'Surface Elevation Change (cm)', 'Azimuth Direction (deg)', 'Strain Rate (1/s)'],
    sampleData: [
      { timestamp: '2023-12-01', value: 2.14, depthOrAlt: 1240 },
      { timestamp: '2023-12-15', value: 2.22, depthOrAlt: 1239 },
      { timestamp: '2024-01-01', value: 2.38, depthOrAlt: 1238 },
      { timestamp: '2024-01-15', value: 2.51, depthOrAlt: 1237 },
      { timestamp: '2024-02-01', value: 2.45, depthOrAlt: 1236 },
      { timestamp: '2024-02-15', value: 2.30, depthOrAlt: 1236 },
      { timestamp: '2024-03-01', value: 2.18, depthOrAlt: 1235 }
    ],
    unit: 'm/year',
    parameterName: 'Horizontal Surface Ice Displacement',
    secondaryParameterName: 'GPS Ice Sheet Elevation (m)',
    relatedExpeditionId: 'exp-43-iae',
    relatedPublicationIds: ['pub-01']
  },
  {
    id: 'ds-atm-02',
    code: 'POL-DAT-2024-002',
    title: 'Surface Boundary Layer Meteorology and Cloud Condensation Nuclei at Maitri',
    region: 'Antarctica',
    domain: 'Meteorology',
    year: 2024,
    format: 'CSV',
    size: '340 MB',
    recordsCount: '1,240,000 records',
    accessStatus: 'Public Open Access',
    leadInvestigator: 'Dr. Rajeshwar Nair',
    institution: 'Atmospheric Physics Consortium',
    coordinatesBbox: '-70.76°S, 11.73°E',
    temporalCoverage: 'Jan 2023 - Jan 2024 (1-minute resolution)',
    description: 'Meteorological mast parameters: temperature, wind velocity, gust speed, barometric pressure, relative humidity, net radiation, and CCN particle counter measurements at 0.5% supersaturation.',
    citation: 'Nair, R., et al. (2024). Surface Meteorology and Cloud Condensation Nuclei at Maitri [Data set]. POLARIS Atmospheric Archive. https://doi.org/10.5061/dryad.polaris.atm02',
    variables: ['Air Temperature (°C)', 'Wind Speed (m/s)', 'Atmospheric Pressure (hPa)', 'CCN Number (cm-3)'],
    sampleData: [
      { timestamp: 'Jan', value: -2.4, secondaryValue: 7.2 },
      { timestamp: 'Feb', value: -6.1, secondaryValue: 9.4 },
      { timestamp: 'Mar', value: -12.8, secondaryValue: 12.1 },
      { timestamp: 'Apr', value: -18.2, secondaryValue: 14.8 },
      { timestamp: 'May', value: -22.5, secondaryValue: 16.5 },
      { timestamp: 'Jun', value: -25.8, secondaryValue: 18.2 },
      { timestamp: 'Jul', value: -28.4, secondaryValue: 19.5 },
      { timestamp: 'Aug', value: -27.1, secondaryValue: 17.8 },
      { timestamp: 'Sep', value: -21.9, secondaryValue: 15.2 },
      { timestamp: 'Oct', value: -14.3, secondaryValue: 12.6 },
      { timestamp: 'Nov', value: -7.5, secondaryValue: 9.8 },
      { timestamp: 'Dec', value: -1.8, secondaryValue: 6.9 }
    ],
    unit: '°C',
    parameterName: 'Monthly Mean Air Temperature',
    secondaryParameterName: 'Mean Wind Velocity (m/s)',
    relatedExpeditionId: 'exp-43-iae',
    relatedPublicationIds: ['pub-04']
  },
  {
    id: 'ds-limno-03',
    code: 'POL-DAT-2023-003',
    title: 'Lake Priyadarshini Water Physico-Chemistry, Nutrients and Dissolved Oxygen',
    region: 'Antarctica',
    domain: 'Limnology',
    year: 2023,
    format: 'CSV',
    size: '85 MB',
    recordsCount: '124,000 records',
    accessStatus: 'Public Open Access',
    leadInvestigator: 'Dr. Sunita Deshmukh',
    institution: 'Polar Microbial Biotechnology Centre',
    coordinatesBbox: '-70.75°S, 11.72°E',
    temporalCoverage: 'Feb 2022 - Feb 2023',
    description: 'Multiparameter sonde profiles of permafrost-fed Lake Priyadarshini at depths from surface to 28m: temperature, pH, conductivity, dissolved oxygen, oxidation-reduction potential, and chlorophyll-a.',
    citation: 'Deshmukh, S., et al. (2023). Lake Priyadarshini Water Quality and Nutrients Profile [Data set]. POLARIS Limnology Series. https://doi.org/10.5061/dryad.polaris.limno03',
    variables: ['Dissolved Oxygen (mg/L)', 'Water Temperature (°C)', 'Conductivity (µS/cm)', 'pH'],
    sampleData: [
      { timestamp: '0m Surface', value: 14.2, secondaryValue: 3.1 },
      { timestamp: '3m Depth', value: 13.8, secondaryValue: 3.4 },
      { timestamp: '6m Depth', value: 12.5, secondaryValue: 3.8 },
      { timestamp: '9m Depth', value: 11.2, secondaryValue: 4.1 },
      { timestamp: '12m Depth', value: 9.8, secondaryValue: 4.5 },
      { timestamp: '15m Depth', value: 8.4, secondaryValue: 4.8 },
      { timestamp: '20m Depth', value: 6.2, secondaryValue: 5.1 },
      { timestamp: '25m Depth', value: 4.1, secondaryValue: 5.3 }
    ],
    unit: 'mg/L',
    parameterName: 'Dissolved Oxygen Concentration',
    secondaryParameterName: 'Water Temperature (°C)',
    relatedExpeditionId: 'exp-42-iae',
    relatedPublicationIds: ['pub-02']
  },
  {
    id: 'ds-geomag-04',
    code: 'POL-DAT-2023-004',
    title: 'Tri-Axial Geomagnetic Vector Field Fluctuations at Bharati Observatory',
    region: 'Antarctica',
    domain: 'Geomagnetism',
    year: 2023,
    format: 'HDF5',
    size: '3.8 GB',
    recordsCount: '31,536,000 samples (1 Hz)',
    accessStatus: 'Public Open Access',
    leadInvestigator: 'Dr. Farooq Khan',
    institution: 'Space and Atmospheric Physics Division',
    coordinatesBbox: '-69.41°S, 76.19°E',
    temporalCoverage: 'Full Calendar Year 2023 (1 Hz cadence)',
    description: 'Calibrated H, D, and Z components of the Earth magnetic field recorded by the dIdD fluxgate magnetometer. Critical dataset for solar wind-magnetosphere coupling models and INTERMAGNET integration.',
    citation: 'Khan, F., et al. (2023). Bharati 1-Hz Geomagnetic Field Observational Archive [Data set]. POLARIS Geophysics. https://doi.org/10.5061/dryad.polaris.geomag04',
    variables: ['H-Component (nT)', 'D-Component (deg)', 'Z-Component (nT)', 'Total Intensity F (nT)'],
    sampleData: [
      { timestamp: '00:00 UTC', value: 43210, secondaryValue: -22 },
      { timestamp: '04:00 UTC', value: 43235, secondaryValue: -18 },
      { timestamp: '08:00 UTC', value: 43180, secondaryValue: -45 },
      { timestamp: '12:00 UTC', value: 43090, secondaryValue: -98 },
      { timestamp: '16:00 UTC', value: 43140, secondaryValue: -65 },
      { timestamp: '20:00 UTC', value: 43195, secondaryValue: -32 }
    ],
    unit: 'nT',
    parameterName: 'Total Magnetic Intensity F',
    secondaryParameterName: 'Delta-H Horizontal Perturbation (nT)',
    relatedExpeditionId: 'exp-42-iae',
    relatedPublicationIds: ['pub-04']
  },
  {
    id: 'ds-aero-05',
    code: 'POL-DAT-2024-005',
    title: 'Arctic Equivalent Black Carbon and Aerosol Optical Depth at Ny-Ålesund',
    region: 'Arctic',
    domain: 'Atmospheric Chemistry',
    year: 2024,
    format: 'CSV',
    size: '190 MB',
    recordsCount: '525,600 readings',
    accessStatus: 'Public Open Access',
    leadInvestigator: 'Dr. Rajeshwar Nair',
    institution: 'Atmospheric Physics Consortium',
    coordinatesBbox: '78.92°N, 11.93°E',
    temporalCoverage: 'Jun 2023 - Jul 2024',
    description: 'Measurements of equivalent black carbon (eBC) via Magee AE33 Aethalometer and column aerosol optical depth (AOD) via Cimel sun photometer at the Himadri research facility.',
    citation: 'Nair, R., et al. (2024). Black Carbon and AOD Observations at Himadri Station [Data set]. POLARIS Arctic Atmospheric Archive. https://doi.org/10.5061/dryad.polaris.aero05',
    variables: ['eBC Mass Concentration (ng/m3)', 'AOD (500 nm)', 'Ångström Exponent', 'Absorption Coefficient (Mm-1)'],
    sampleData: [
      { timestamp: '2024-06-01', value: 12.4, secondaryValue: 0.042 },
      { timestamp: '2024-06-10', value: 16.8, secondaryValue: 0.055 },
      { timestamp: '2024-06-20', value: 48.2, secondaryValue: 0.118 },
      { timestamp: '2024-06-30', value: 114.5, secondaryValue: 0.245 },
      { timestamp: '2024-07-10', value: 24.1, secondaryValue: 0.068 },
      { timestamp: '2024-07-20', value: 15.3, secondaryValue: 0.048 }
    ],
    unit: 'ng/m3',
    parameterName: 'Equivalent Black Carbon Concentration',
    secondaryParameterName: 'Aerosol Optical Depth (500 nm)',
    relatedExpeditionId: 'exp-arctic-24',
    relatedPublicationIds: ['pub-03']
  },
  {
    id: 'ds-seism-06',
    code: 'POL-DAT-2022-006',
    title: 'Continuous Broadband Seismological Waveforms: Maitri Station Observatory (MAIT)',
    region: 'Antarctica',
    domain: 'Seismology',
    year: 2022,
    format: 'HDF5',
    size: '8.4 GB',
    recordsCount: 'Global Seismological MiniSEED Streams',
    accessStatus: 'Public Open Access',
    leadInvestigator: 'Dr. Shailendra Saini',
    institution: 'National Earth Science Institute',
    coordinatesBbox: '-70.76°S, 11.73°E',
    temporalCoverage: 'Jan 2022 - Dec 2022 (Continuous 40 sps)',
    description: 'Three-component (BHZ, BHN, BHE) velocity records from Streckeisen STS-2 seismometer anchored to crystalline bedrock. Contributes to IRIS and FDSN global earthquake networks.',
    citation: 'Saini, S., et al. (2022). Seismic Waveform Record MAIT Station Antarctica [Data set]. POLARIS Seismology. https://doi.org/10.5061/dryad.polaris.seism06',
    variables: ['Vertical Velocity (counts)', 'North Velocity (counts)', 'East Velocity (counts)'],
    sampleData: [
      { timestamp: '0.0s', value: 120 },
      { timestamp: '0.5s', value: 450 },
      { timestamp: '1.0s', value: 3200 },
      { timestamp: '1.5s', value: 8900 },
      { timestamp: '2.0s', value: -7400 },
      { timestamp: '2.5s', value: 4100 },
      { timestamp: '3.0s', value: -1800 },
      { timestamp: '3.5s', value: 650 }
    ],
    unit: 'µm/s',
    parameterName: 'Ground Velocity Amplitude',
    relatedExpeditionId: 'exp-41-iae',
    relatedPublicationIds: ['pub-05']
  },
  {
    id: 'ds-fjord-07',
    code: 'POL-DAT-2024-007',
    title: 'Kongsfjorden High-Resolution Hydrographic CTD Transects and Glacial Runoff',
    region: 'Arctic',
    domain: 'Oceanography',
    year: 2024,
    format: 'NetCDF',
    size: '620 MB',
    recordsCount: '185 CTD casts',
    accessStatus: 'Public Open Access',
    leadInvestigator: 'Dr. Priya Harikrishnan',
    institution: 'Arctic Marine Systems Lab',
    coordinatesBbox: '78.9°N to 79.1°N, 11.2°E to 12.5°E',
    temporalCoverage: 'Jul 2024 - Aug 2024',
    description: 'Seabird SBE 911plus CTD profiling casts spanning outer shelf to glacier fronts in Kongsfjorden. Measures temperature, salinity, turbidity, fluorescence, and photosynthetically active radiation (PAR).',
    citation: 'Harikrishnan, P., et al. (2024). Kongsfjorden Hydrographic CTD Transects [Data set]. POLARIS Ocean Data. https://doi.org/10.5061/dryad.polaris.fjord07',
    variables: ['Conservative Temperature (°C)', 'Absolute Salinity (g/kg)', 'Density (kg/m3)', 'Fluorescence (mg/m3)'],
    sampleData: [
      { timestamp: '0m Surface', value: 5.4, secondaryValue: 32.1 },
      { timestamp: '20m', value: 4.8, secondaryValue: 33.4 },
      { timestamp: '50m', value: 3.2, secondaryValue: 34.2 },
      { timestamp: '100m', value: 2.1, secondaryValue: 34.8 },
      { timestamp: '150m', value: 1.5, secondaryValue: 34.9 },
      { timestamp: '200m', value: 0.9, secondaryValue: 35.0 },
      { timestamp: '250m Benthic', value: 0.4, secondaryValue: 35.1 }
    ],
    unit: '°C',
    parameterName: 'Water Column Temperature',
    secondaryParameterName: 'Salinity (PSU)',
    relatedExpeditionId: 'exp-arctic-24',
    relatedPublicationIds: ['pub-03', 'pub-06']
  },
  {
    id: 'ds-indarc-08',
    code: 'POL-DAT-2024-008',
    title: 'IndARC Decadal Subsurface Mooring Oceanographic Time-Series (2014-2024)',
    region: 'Arctic',
    domain: 'Physical Oceanography',
    year: 2024,
    format: 'NetCDF',
    size: '2.85 GB',
    recordsCount: '8,760,000 observation intervals',
    accessStatus: 'Public Open Access',
    leadInvestigator: 'Dr. Priya Harikrishnan',
    institution: 'Arctic Marine Systems Lab',
    coordinatesBbox: '79.00°N, 11.50°E',
    temporalCoverage: 'Aug 2014 - Aug 2024 (Continuous hourly sampling)',
    description: 'Continuous 10-year moored oceanographic record from 192m depth in Kongsfjorden. Records multi-level water temperature, salinity, current vectors, turbidity, and dissolved oxygen.',
    citation: 'Harikrishnan, P., et al. (2024). IndARC Ten-Year Continuous Underwater Mooring Record [Data set]. POLARIS Marine Repository. https://doi.org/10.5061/dryad.polaris.indarc08',
    variables: ['Water Temperature (°C)', 'Salinity (PSU)', 'Current Velocity (cm/s)', 'Dissolved O2 (µmol/kg)'],
    sampleData: [
      { timestamp: '2015', value: 1.25, secondaryValue: 34.72 },
      { timestamp: '2016', value: 1.48, secondaryValue: 34.78 },
      { timestamp: '2017', value: 1.72, secondaryValue: 34.84 },
      { timestamp: '2018', value: 1.65, secondaryValue: 34.81 },
      { timestamp: '2019', value: 1.84, secondaryValue: 34.89 },
      { timestamp: '2020', value: 2.05, secondaryValue: 34.92 },
      { timestamp: '2021', value: 1.95, secondaryValue: 34.90 },
      { timestamp: '2022', value: 2.18, secondaryValue: 34.95 },
      { timestamp: '2023', value: 2.32, secondaryValue: 34.98 },
      { timestamp: '2024', value: 2.45, secondaryValue: 35.01 }
    ],
    unit: '°C',
    parameterName: 'Annual Mean Deep Fjord Temperature (100m)',
    secondaryParameterName: 'Salinity (PSU)',
    relatedExpeditionId: 'exp-arctic-24',
    relatedPublicationIds: ['pub-03', 'pub-06']
  },
  {
    id: 'ds-ocean-09',
    code: 'POL-DAT-2023-009',
    title: 'Southern Ocean Underway Carbon Dioxide (pCO2) and Hydrographic Transect 57.5°E',
    region: 'Southern Ocean',
    domain: 'Ocean Biogeochemistry',
    year: 2023,
    format: 'CSV',
    size: '410 MB',
    recordsCount: '980,000 data rows',
    accessStatus: 'Public Open Access',
    leadInvestigator: 'Dr. Meenakshi Sundaram',
    institution: 'Southern Ocean Biogeochemistry Directorate',
    coordinatesBbox: '40.0°S to 68.5°S, 57.5°E',
    temporalCoverage: 'Jan 2023 - Mar 2023',
    description: 'Underway atmospheric and seawater partial pressure of CO2 (pCO2), sea surface temperature, salinity, fluorometry, and calculated air-sea CO2 gas exchange fluxes along the 57.5°E meridian.',
    citation: 'Sundaram, M., et al. (2023). Underway pCO2 and Hydrographic Observations Along 57.5°E [Data set]. POLARIS Biogeochemical Archive. https://doi.org/10.5061/dryad.polaris.ocean09',
    variables: ['Seawater pCO2 (µatm)', 'Atmospheric pCO2 (µatm)', 'SST (°C)', 'Air-Sea CO2 Flux (mmol/m2/d)'],
    sampleData: [
      { timestamp: '40°S Subtropical', value: 395, secondaryValue: 18.2 },
      { timestamp: '45°S Sub-Antarctic', value: 375, secondaryValue: 12.4 },
      { timestamp: '50°S Polar Front', value: 352, secondaryValue: 5.8 },
      { timestamp: '55°S SACCF', value: 368, secondaryValue: 2.1 },
      { timestamp: '60°S S. Boundary', value: 382, secondaryValue: 0.4 },
      { timestamp: '65°S Sea Ice Edge', value: 410, secondaryValue: -1.2 },
      { timestamp: '68°S Continental Shelf', value: 388, secondaryValue: -1.6 }
    ],
    unit: 'µatm',
    parameterName: 'Seawater pCO2 (Partial Pressure)',
    secondaryParameterName: 'Sea Surface Temperature (°C)',
    relatedExpeditionId: 'exp-soe-12',
    relatedPublicationIds: ['pub-07']
  },
  {
    id: 'ds-krill-10',
    code: 'POL-DAT-2023-010',
    title: 'Enderby Basin Multi-Frequency Acoustic Krill Biomass Backscatter Profiles',
    region: 'Southern Ocean',
    domain: 'Marine Biology',
    year: 2023,
    format: 'NetCDF',
    size: '1.88 GB',
    recordsCount: '3,200 nautical miles acoustic survey',
    accessStatus: 'Public Open Access',
    leadInvestigator: 'Dr. Tarun Ghosh',
    institution: 'Southern Ocean Biogeochemistry Directorate',
    coordinatesBbox: '62.0°S to 67.5°S, 50.0°E to 65.0°E',
    temporalCoverage: 'Feb 2023 - Mar 2023',
    description: 'Calibrated volumetric backscattering strength (Sv) recorded at 38 kHz, 70 kHz, 120 kHz, and 200 kHz via Simrad scientific echosounder for estimating Antarctic krill swarm density.',
    citation: 'Ghosh, T., et al. (2023). Acoustic Krill Swarm Density Survey Enderby Basin [Data set]. POLARIS Marine Biology. https://doi.org/10.5061/dryad.polaris.krill10',
    variables: ['Nautical Area Scattering Coeff (m2/nmi2)', 'Derived Krill Density (g/m2)', 'Swarm Depth (m)'],
    sampleData: [
      { timestamp: 'Transect 1', value: 48.2, depthOrAlt: 42 },
      { timestamp: 'Transect 2', value: 65.4, depthOrAlt: 35 },
      { timestamp: 'Transect 3', value: 32.1, depthOrAlt: 58 },
      { timestamp: 'Transect 4', value: 18.5, depthOrAlt: 62 },
      { timestamp: 'Transect 5', value: 84.7, depthOrAlt: 28 },
      { timestamp: 'Transect 6', value: 52.0, depthOrAlt: 39 },
      { timestamp: 'Transect 7', value: 12.3, depthOrAlt: 74 }
    ],
    unit: 'g/m2',
    parameterName: 'Estimated Krill Biomass Density',
    secondaryParameterName: 'Mean Swarm Depth (m)',
    relatedExpeditionId: 'exp-soe-12',
    relatedPublicationIds: ['pub-08']
  },
  {
    id: 'ds-paleo-11',
    code: 'POL-DAT-2024-011',
    title: 'Central Dronning Maud Land 120m Firn Core Stable Isotopes and Trace Chemistry',
    region: 'Antarctica',
    domain: 'Paleoclimatology',
    year: 2024,
    format: 'CSV',
    size: '120 MB',
    recordsCount: '24,000 sub-sampled depth intervals',
    accessStatus: 'Public Open Access',
    leadInvestigator: 'Dr. Vikramaditya Sen',
    institution: 'National Polar Knowledge Centre',
    coordinatesBbox: '-71.20°S, 12.45°E',
    temporalCoverage: 'Paleoclimate Archive (1800 AD - 2023 AD)',
    description: 'Continuous flow analysis (CFA) data of stable water isotopes (delta-18O, delta-D), major ions (Na+, Ca2+, SO42-, NO3-), and electrical conductivity from a 120m ice core drilled in 2024.',
    citation: 'Sen, V., et al. (2024). Dronning Maud Land 120m Ice Core Isotopic Time Series [Data set]. POLARIS Paleoclimate. https://doi.org/10.5061/dryad.polaris.paleo11',
    variables: ['delta-18O (permil)', 'delta-D (permil)', 'Deuterium Excess', 'Dust Concentration (ppb)'],
    sampleData: [
      { timestamp: '1850', value: -38.4, secondaryValue: 12.2 },
      { timestamp: '1880', value: -39.1, secondaryValue: 11.8 },
      { timestamp: '1910', value: -38.7, secondaryValue: 12.4 },
      { timestamp: '1940', value: -38.2, secondaryValue: 13.1 },
      { timestamp: '1970', value: -38.9, secondaryValue: 12.0 },
      { timestamp: '2000', value: -37.8, secondaryValue: 14.5 },
      { timestamp: '2023', value: -37.2, secondaryValue: 15.8 }
    ],
    unit: '‰ (permil)',
    parameterName: 'delta-18O Stable Oxygen Isotope Ratio',
    secondaryParameterName: 'Deuterium Excess (permil)',
    relatedExpeditionId: 'exp-43-iae',
    relatedPublicationIds: ['pub-01', 'pub-02']
  },
  {
    id: 'ds-rad-12',
    code: 'POL-DAT-2023-012',
    title: 'Broadband Surface Downwelling and Upwelling Solar Radiation Balance at Bharati',
    region: 'Antarctica',
    domain: 'Atmospheric Physics',
    year: 2023,
    format: 'CSV',
    size: '210 MB',
    recordsCount: '525,600 1-minute measurements',
    accessStatus: 'Public Open Access',
    leadInvestigator: 'Dr. Keith Braganza',
    institution: 'Polar Engineering and Technology Division',
    coordinatesBbox: '-69.41°S, 76.19°E',
    temporalCoverage: 'Jan 2023 - Dec 2023',
    description: 'Baseline Surface Radiation Network (BSRN) compliant measurements using Kipp & Zonen CMP21 pyranometers and CGR4 pyrgeometers for polar surface energy budget modeling.',
    citation: 'Braganza, K., et al. (2023). Surface Radiation Balance at Bharati Station [Data set]. POLARIS Solar Archive. https://doi.org/10.5061/dryad.polaris.rad12',
    variables: ['Downwelling Shortwave (W/m2)', 'Upwelling Shortwave (W/m2)', 'Surface Albedo', 'Net Radiation (W/m2)'],
    sampleData: [
      { timestamp: 'Jan', value: 345, secondaryValue: 0.82 },
      { timestamp: 'Feb', value: 248, secondaryValue: 0.81 },
      { timestamp: 'Mar', value: 120, secondaryValue: 0.84 },
      { timestamp: 'Apr', value: 32, secondaryValue: 0.86 },
      { timestamp: 'May', value: 2, secondaryValue: 0.88 },
      { timestamp: 'Jun', value: 0, secondaryValue: 0.89 },
      { timestamp: 'Jul', value: 0, secondaryValue: 0.89 },
      { timestamp: 'Aug', value: 12, secondaryValue: 0.87 },
      { timestamp: 'Sep', value: 85, secondaryValue: 0.85 },
      { timestamp: 'Oct', value: 198, secondaryValue: 0.83 },
      { timestamp: 'Nov', value: 312, secondaryValue: 0.81 },
      { timestamp: 'Dec', value: 380, secondaryValue: 0.80 }
    ],
    unit: 'W/m2',
    parameterName: 'Mean Downwelling Solar Irradiance',
    secondaryParameterName: 'Surface Snow Albedo Ratio',
    relatedExpeditionId: 'exp-42-iae',
    relatedPublicationIds: ['pub-04']
  }
];

// -------------------------------------------------------------
// SCIENTIFIC PUBLICATIONS
// -------------------------------------------------------------
export const POLAR_PUBLICATIONS: PublicationItem[] = [
  {
    id: 'pub-01',
    title: 'Decadal Acceleration in Coastal Snow Accumulation Across East Antarctic Ice Margins',
    authors: ['Dr. Vikramaditya Sen', 'Dr. Ramesh Chandra', 'Dr. Sunita Deshmukh'],
    journal: 'Nature Geoscience',
    volume: '17, 342-351',
    year: 2024,
    doi: '10.1038/s41561-024-01398-w',
    region: 'Antarctica',
    domain: 'Glaciology',
    abstract: 'Ice core stratigraphy and radar surveys across Dronning Maud Land demonstrate that increased poleward moisture advection driven by the Southern Annular Mode has accelerated coastal accumulation by 7.4% per decade since 1990, partially mitigating dynamic mass loss.',
    citationsCount: 42,
    openAccess: true,
    relatedExpeditionId: 'exp-43-iae',
    relatedDatasetIds: ['ds-ice-01', 'ds-paleo-11']
  },
  {
    id: 'pub-02',
    title: 'Genomic Adaptations and Cold-Active Enzymatic Pathways of Novel Psychrophiles in Antarctic Oasis Lakes',
    authors: ['Dr. Sunita Deshmukh', 'Dr. Anandita Chatterjee', 'Dr. B.K. Tiwari'],
    journal: 'Applied and Environmental Microbiology',
    volume: '90(4), e02189-23',
    year: 2024,
    doi: '10.1128/aem.02189-23',
    region: 'Antarctica',
    domain: 'Microbiology',
    abstract: 'Metagenomic assembly reveals novel antifreeze glycopeptides and unsaturated membrane fatty acid synthase complexes that allow bacterial proliferation at sub-zero temperatures in Lake Priyadarshini.',
    citationsCount: 28,
    openAccess: true,
    relatedExpeditionId: 'exp-43-iae',
    relatedDatasetIds: ['ds-limno-03']
  },
  {
    id: 'pub-03',
    title: 'IndARC Decadal Mooring Observations Reveal Shifting Atlantic-Arctic Water Mass Transitions in Kongsfjorden',
    authors: ['Dr. Priya Harikrishnan', 'Dr. Rajeshwar Nair', 'Dr. Geir Gundersen'],
    journal: 'Geophysical Research Letters',
    volume: '51(8), e2023GL107890',
    year: 2024,
    doi: '10.1029/2023GL107890',
    region: 'Arctic',
    domain: 'Physical Oceanography',
    abstract: 'Ten years of autonomous underwater observations verify that Atlantic Water heat transport into Svalbard fjords has doubled in duration, suppressing winter fast-ice development and driving rapid glacial terminus retreat.',
    citationsCount: 65,
    openAccess: true,
    relatedExpeditionId: 'exp-arctic-24',
    relatedDatasetIds: ['ds-indarc-08', 'ds-fjord-07']
  },
  {
    id: 'pub-04',
    title: 'Space Weather Geomagnetic Induction and Pc5 Resonance Dynamics at High Antarctic Latitudes',
    authors: ['Dr. Farooq Khan', 'Dr. Sunita Deshmukh', 'Dr. George Varghese'],
    journal: 'Journal of Geophysical Research: Space Physics',
    volume: '128(11), e2023JA031840',
    year: 2023,
    doi: '10.1029/2023JA031840',
    region: 'Antarctica',
    domain: 'Space Physics',
    abstract: 'Synchronized magnetometer records from Bharati and Maitri isolate magnetopause Kelvin-Helmholtz wave signatures that directly transfer solar wind energy into the high-latitude auroral ionosphere.',
    citationsCount: 19,
    openAccess: true,
    relatedExpeditionId: 'exp-42-iae',
    relatedDatasetIds: ['ds-geomag-04', 'ds-rad-12']
  },
  {
    id: 'pub-05',
    title: 'Crustal Thickness and Lithospheric Velocity Structure Beneath the Central Dronning Maud Land Escarpment',
    authors: ['Dr. Shailendra Saini', 'Dr. P.R. Murthy', 'Dr. Alok Verma'],
    journal: 'Tectonophysics',
    volume: '864, 229987',
    year: 2023,
    doi: '10.1016/j.tecto.2023.229987',
    region: 'Antarctica',
    domain: 'Geophysics',
    abstract: 'Receiver function deconvolution from teleseismic broadband data reveals a 38.5 km Moho depth, confirming geological continuity between East Antarctica and the Precambrian cratonic roots of peninsular India.',
    citationsCount: 31,
    openAccess: false,
    relatedExpeditionId: 'exp-41-iae',
    relatedDatasetIds: ['ds-seism-06']
  },
  {
    id: 'pub-06',
    title: 'Boreal Plankton Expansion and Lipid Depletion in High Arctic Ecosystems',
    authors: ['Dr. Elena Rostova', 'Dr. Rajeshwar Nair', 'Dr. Haakon Berg'],
    journal: 'Global Change Biology',
    volume: '29(16), 4612-4628',
    year: 2023,
    doi: '10.1111/gcb.16782',
    region: 'Arctic',
    domain: 'Marine Ecology',
    abstract: 'Documented replacement of high-energy Arctic copepods by temperate Atlantic counterparts creates an ecological energy deficit that cascades up the marine food chain to pelagic seabirds and marine mammals.',
    citationsCount: 54,
    openAccess: true,
    relatedExpeditionId: 'exp-arctic-23',
    relatedDatasetIds: ['ds-fjord-07', 'ds-indarc-08']
  },
  {
    id: 'pub-07',
    title: 'Anthropogenic Carbon Uptake and Aragonite Saturation Trends in the Sub-Antarctic Southern Ocean',
    authors: ['Dr. Meenakshi Sundaram', 'Dr. K.V. Swaminathan', 'Dr. Jacques De Villiers'],
    journal: 'Limnology and Oceanography',
    volume: '68(9), 2088-2104',
    year: 2023,
    doi: '10.1002/lno.12410',
    region: 'Southern Ocean',
    domain: 'Marine Biogeochemistry',
    abstract: 'High-resolution transects along 57.5°E highlight rapid shoaling of the aragonite saturation horizon, demonstrating that the Southern Ocean is nearing critical buffering thresholds for calcareous pteropods.',
    citationsCount: 38,
    openAccess: true,
    relatedExpeditionId: 'exp-soe-12',
    relatedDatasetIds: ['ds-ocean-09']
  },
  {
    id: 'pub-08',
    title: 'Acoustic Swarm Biomass and Sea-Ice Association of Euphausia superba in the Indian Ocean Sector of Antarctica',
    authors: ['Dr. Tarun Ghosh', 'Dr. Meenakshi Sundaram', 'Dr. Hans-Peter Siegel'],
    journal: 'Deep Sea Research Part II: Topical Studies in Oceanography',
    volume: '211, 105285',
    year: 2023,
    doi: '10.1016/j.dsr2.2023.105285',
    region: 'Southern Ocean',
    domain: 'Marine Ecology',
    abstract: 'Multi-frequency hydroacoustic surveys demonstrate that juvenile krill density is directly tied to structural complexity in fast-ice undersides, confirming vulnerability of krill nurseries to sea ice decline.',
    citationsCount: 22,
    openAccess: true,
    relatedExpeditionId: 'exp-soe-12',
    relatedDatasetIds: ['ds-krill-10', 'ds-ocean-09']
  },
  {
    id: 'pub-09',
    title: 'Atmospheric River Incursions Drive Sudden Surface Melt on Princess Elizabeth Land Ice Cap',
    authors: ['Dr. Vikramaditya Sen', 'Dr. Rajeshwar Nair', 'Dr. Keith Braganza'],
    journal: 'Journal of Climate',
    volume: '37(5), 1845-1862',
    year: 2024,
    doi: '10.1175/JCLI-D-23-0412.1',
    region: 'Antarctica',
    domain: 'Glaciology',
    abstract: 'Identifies narrow plumes of high-latitude moisture advection (atmospheric rivers) responsible for 78% of transient positive degree-day anomalies and extensive surface firn saturation in East Antarctica.',
    citationsCount: 15,
    openAccess: true,
    relatedExpeditionId: 'exp-43-iae',
    relatedDatasetIds: ['ds-ice-01', 'ds-atm-02']
  },
  {
    id: 'pub-10',
    title: 'Aerosol Black Carbon Radiative Forcing Over Arctic Snowpack at Ny-Ålesund',
    authors: ['Dr. Rajeshwar Nair', 'Dr. Elena Rostova', 'Dr. Priya Harikrishnan'],
    journal: 'Atmospheric Chemistry and Physics',
    volume: '24(6), 3891-3908',
    year: 2024,
    doi: '10.5194/acp-24-3891-2024',
    region: 'Arctic',
    domain: 'Atmospheric Chemistry',
    abstract: 'Longitudinal radiative transfer models constrain black carbon deposition effects on snow albedo, showing instantaneous radiative forcing of +1.8 W/m2 during extreme springtime haze events.',
    citationsCount: 29,
    openAccess: true,
    relatedExpeditionId: 'exp-arctic-24',
    relatedDatasetIds: ['ds-aero-05']
  }
];

// -------------------------------------------------------------
// MEDIA ASSETS (PHOTOS, VIDEOS, 360°)
// -------------------------------------------------------------
export const POLAR_MEDIA: MediaItem[] = [
  {
    id: 'med-01',
    title: 'Aurora Australis Over Bharati Station and Larsemann Hills',
    type: 'Photo',
    category: 'Landscape',
    region: 'Antarctica',
    year: 2024,
    expedition: '43rd Indian Scientific Expedition to Antarctica',
    photographer: 'Dr. Vikramaditya Sen',
    location: 'Larsemann Hills, East Antarctica',
    coordinates: '69.41°S, 76.19°E',
    cameraInfo: 'Sony Alpha 7R V • 24mm f/1.4 • 15s • ISO 3200',
    url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80',
    description: 'A vivid display of the Southern Lights (Aurora Australis) painting ribbons of emerald and magenta light directly over the elevated aerodynamic living modules of Bharati base.',
    license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    tags: ['Aurora', 'Bharati', 'Polar Night', 'Space Weather', 'Atmosphere']
  },
  {
    id: 'med-02',
    title: 'Colony of Adélie Penguins on Sea Ice Edge in Prydz Bay',
    type: 'Photo',
    category: 'Wildlife',
    region: 'Antarctica',
    year: 2023,
    expedition: '42nd Indian Scientific Expedition to Antarctica',
    photographer: 'Dr. Anandita Chatterjee',
    location: 'Prydz Bay Sea Ice, East Antarctica',
    coordinates: '69.12°S, 76.45°E',
    cameraInfo: 'Canon EOS R5 • 100-500mm f/4.5-7.1 at 400mm • 1/2000s • ISO 400',
    url: 'https://images.unsplash.com/photo-1687904368738-ca6423635666?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1687904368738-ca6423635666?auto=format&fit=crop&w=600&q=80',
    description: 'Adélie penguins navigating tabular ice floes along the active shelf break as seasonal pack ice begins its late-spring breakup.',
    license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    tags: ['Adélie Penguins', 'Prydz Bay', 'Fast Ice', 'Wildlife', 'Ecology']
  },
  {
    id: 'med-03',
    title: 'Himadri Research Station and Kongsfjorden Mountain Panorama',
    type: 'Photo',
    category: 'Landscape',
    region: 'Arctic',
    year: 2024,
    expedition: 'Indian Arctic Summer Scientific Expedition 2024',
    photographer: 'Dr. Rajeshwar Nair',
    location: 'Ny-Ålesund, Spitsbergen, Svalbard',
    coordinates: '78.92°N, 11.93°E',
    cameraInfo: 'Nikon Z9 • 24-70mm f/2.8 at 35mm • 1/1250s • ISO 160',
    url: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?auto=format&fit=crop&w=600&q=80',
    description: 'Summer view of Ny-Ålesund research station complex with glacier-capped nunataks reflecting in the turquoise waters of Kongsfjorden.',
    license: 'CC BY 4.0',
    tags: ['Himadri', 'Svalbard', 'Glaciers', 'Kongsfjorden', 'Arctic Landscape']
  },
  {
    id: 'med-04',
    title: 'Icebreaker Bow Cleaving Heavy Multi-Year Pack Ice in the Roaring Sixties',
    type: 'Photo',
    category: 'Scientific Equipment',
    region: 'Southern Ocean',
    year: 2023,
    expedition: '12th Southern Ocean Scientific Expedition',
    photographer: 'Dr. Meenakshi Sundaram',
    location: 'Southern Ocean 64°S, 57.5°E',
    coordinates: '64.00°S, 57.50°E',
    cameraInfo: 'Fujifilm GFX 100S • 32-64mm f/4 • 1/800s • ISO 200',
    url: 'https://images.unsplash.com/photo-1687904590788-a3ce87df66d6?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1687904590788-a3ce87df66d6?auto=format&fit=crop&w=600&q=80',
    description: 'Reinforced icebreaker hull fracturing 2.5-meter sea ice during the oceanic transect toward the Enderby Basin margin.',
    license: 'CC BY 4.0',
    tags: ['Icebreaker', 'Vessel', 'Southern Ocean', 'Sea Ice', 'Navigation']
  },
  {
    id: 'med-05',
    title: 'Traverse Snowcats Navigating Crevasse Field in Dronning Maud Land',
    type: 'Photo',
    category: 'Station Life',
    region: 'Antarctica',
    year: 2024,
    expedition: '43rd Indian Scientific Expedition to Antarctica',
    photographer: 'Dr. Ramesh Chandra',
    location: 'Central Dronning Maud Land Plateau',
    coordinates: '71.15°S, 12.08°E',
    cameraInfo: 'Sony FX3 • 28mm f/2.8 • 1/3200s • ISO 100',
    url: 'https://images.unsplash.com/photo-1551415923-31d2072bc248?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1551415923-31d2072bc248?auto=format&fit=crop&w=600&q=80',
    description: 'PistenBully heavy-tracked vehicles towing living cabooses and fuel sledges across sastrugi ice fields under bright 24-hour midnight sun.',
    license: 'CC BY 4.0',
    tags: ['Snowcat', 'Traverse', 'Antarctic Plateau', 'Logistics', 'Expedition']
  },
  {
    id: 'med-06',
    title: 'Sampling Pristine Lacustrine Sediments at Lake Priyadarshini',
    type: 'Photo',
    category: 'Scientific Equipment',
    region: 'Antarctica',
    year: 2023,
    expedition: '42nd Indian Scientific Expedition to Antarctica',
    photographer: 'Dr. Sunita Deshmukh',
    location: 'Schirmacher Oasis, Antarctica',
    coordinates: '70.76°S, 11.73°E',
    cameraInfo: 'Canon EOS R6 • 50mm f/1.8 • 1/1000s • ISO 200',
    url: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?auto=format&fit=crop&w=600&q=80',
    description: 'Scientists retrieving gravity sediment cores through 1.2m surface lake ice to isolate ancient Holocene biological microfossils.',
    license: 'CC BY 4.0',
    tags: ['Lake Priyadarshini', 'Sediment Coring', 'Maitri', 'Limnology', 'Fieldwork']
  },
  {
    id: 'med-07',
    title: 'Deep Glacial Terminus Calving at Kongsvegen, Svalbard',
    type: 'Video',
    category: 'Landscape',
    region: 'Arctic',
    year: 2024,
    expedition: 'Indian Arctic Summer Scientific Expedition 2024',
    photographer: 'Dr. Rajeshwar Nair',
    location: 'Inner Kongsfjorden, Svalbard',
    coordinates: '78.95°N, 12.30°E',
    cameraInfo: 'RED Komodo 6K Cinema • 70-200mm f/2.8 • 60 fps',
    url: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?auto=format&fit=crop&w=600&q=80',
    duration: '04:18',
    description: 'High-speed capture of explosive ice calving events where multi-ton ice blocks collapse from the tidewater glacier face into Arctic waters.',
    license: 'CC BY 4.0',
    tags: ['Calving', 'Glacier', 'Kongsvegen', 'Video', 'Climate Change']
  },
  {
    id: 'med-08',
    title: 'CTD Rosette Deployment at Sub-Antarctic Polar Front (60°S)',
    type: 'Video',
    category: 'Scientific Equipment',
    region: 'Southern Ocean',
    year: 2023,
    expedition: '12th Southern Ocean Scientific Expedition',
    photographer: 'Dr. Meenakshi Sundaram',
    location: 'Southern Ocean 60°S',
    coordinates: '60.00°S, 57.50°E',
    cameraInfo: 'GoPro HERO 11 Black 4K & Sony FX3',
    url: 'https://images.unsplash.com/photo-1687904590788-a3ce87df66d6?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1687904590788-a3ce87df66d6?auto=format&fit=crop&w=600&q=80',
    duration: '06:45',
    description: 'Underwater and deck perspective of a 24-bottle Seabird CTD Rosette descending 4,000 meters into the icy abyss to sample deep water masses.',
    license: 'CC BY 4.0',
    tags: ['CTD', 'Oceanography', 'Deep Sea', 'Research Vessel', 'Southern Ocean']
  },
  {
    id: 'med-09',
    title: '360° Virtual Walkthrough: Inside Bharati Research Base Modules',
    type: '360 Experience',
    category: 'Station Life',
    region: 'Antarctica',
    year: 2024,
    expedition: '43rd Indian Scientific Expedition to Antarctica',
    photographer: 'Dr. Keith Braganza',
    location: 'Bharati Station Upper Deck',
    coordinates: '69.41°S, 76.19°E',
    cameraInfo: 'Insta360 Titan 11K 360° VR Camera',
    url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80',
    duration: 'Interactive 360°',
    description: 'Immersive spherical tour through the main operations bridge, clean chemistry labs, communication suites, and living quarters of Bharati station.',
    license: 'CC BY 4.0',
    tags: ['360 Virtual Tour', 'Bharati', 'Architecture', 'Station Life']
  },
  {
    id: 'med-10',
    title: 'Under-Ice Hydrophone Audio Recording: Kongsfjorden Glacial Fracturing',
    type: 'Audio / Hydrophone',
    category: 'Scientific Equipment',
    region: 'Arctic',
    year: 2024,
    expedition: 'Indian Arctic Summer Scientific Expedition 2024',
    photographer: 'Dr. Priya Harikrishnan',
    location: 'IndARC Subsurface Mooring, Kongsfjorden',
    coordinates: '79.00°N, 11.50°E',
    cameraInfo: 'Ocean Sonics icListen HF Smart Hydrophone at 100m depth',
    url: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?auto=format&fit=crop&w=600&q=80',
    duration: '02:30',
    description: 'Acoustic recordings capturing the pops, snaps, and deep thrums of melting glacial ice releasing ancient trapped pressurized air bubbles.',
    license: 'CC BY 4.0',
    tags: ['Acoustics', 'Hydrophone', 'IndARC', 'Ice Sounds', 'Audio']
  },
  {
    id: 'med-11',
    title: 'Weddell Seal Cow and Pup Resting on Shelf Fast Ice',
    type: 'Photo',
    category: 'Wildlife',
    region: 'Antarctica',
    year: 2023,
    expedition: '42nd Indian Scientific Expedition to Antarctica',
    photographer: 'Dr. Tarun Ghosh',
    location: 'Princess Astrid Coast, Antarctica',
    coordinates: '70.08°S, 12.00°E',
    cameraInfo: 'Canon EOS R5 • 400mm f/2.8 • 1/1600s • ISO 250',
    url: 'https://images.unsplash.com/photo-1687904368738-ca6423635666?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1687904368738-ca6423635666?auto=format&fit=crop&w=600&q=80',
    description: 'A newborn Weddell seal pup bonding with its mother beside a breathing hole kept open through 2-meter fast ice using specialized dentition.',
    license: 'CC BY 4.0',
    tags: ['Weddell Seal', 'Wildlife', 'Fauna', 'Antarctica', 'Fast Ice']
  },
  {
    id: 'med-12',
    title: 'Midnight Sun Over Arctic Fjord and Sea Smoke',
    type: 'Photo',
    category: 'Landscape',
    region: 'Arctic',
    year: 2024,
    expedition: 'Indian Arctic Summer Scientific Expedition 2024',
    photographer: 'Dr. Rajeshwar Nair',
    location: 'Fram Strait Gateway, Svalbard',
    coordinates: '79.15°N, 10.80°E',
    cameraInfo: 'Sony Alpha 1 • 70-200mm f/2.8 • 1/2500s • ISO 100',
    url: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?auto=format&fit=crop&w=600&q=80',
    description: 'Atmospheric sea smoke forming as sub-zero Arctic air blows across warmer Atlantic water eddies during peak midnight sun at 2:00 AM.',
    license: 'CC BY 4.0',
    tags: ['Midnight Sun', 'Sea Smoke', 'Fram Strait', 'Atmosphere', 'Arctic']
  },
  {
    id: 'med-13',
    title: 'Deep Ice Core Extraction: 120-Meter Annual Stratigraphy Inspection',
    type: 'Photo',
    category: 'Scientific Equipment',
    region: 'Antarctica',
    year: 2024,
    expedition: '43rd Indian Scientific Expedition to Antarctica',
    photographer: 'Dr. Vikramaditya Sen',
    location: 'Drilling Camp, Dronning Maud Land',
    coordinates: '71.20°S, 12.45°E',
    cameraInfo: 'Fujifilm X-T5 • 23mm f/1.4 • 1/500s • ISO 400',
    url: 'https://images.unsplash.com/photo-1551415923-31d2072bc248?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1551415923-31d2072bc248?auto=format&fit=crop&w=600&q=80',
    description: 'Glaciologists in clean protective suits inspecting pristine cylindrical ice core segments illuminated by backlights in the subsurface trench.',
    license: 'CC BY 4.0',
    tags: ['Ice Core', 'Glaciology', 'Drilling', 'Paleoclimate', 'Fieldwork']
  },
  {
    id: 'med-14',
    title: 'Humpback Whale Pod Breaching in Antarctic Coastal Waters',
    type: 'Photo',
    category: 'Wildlife',
    region: 'Southern Ocean',
    year: 2023,
    expedition: '12th Southern Ocean Scientific Expedition',
    photographer: 'Dr. Tarun Ghosh',
    location: 'Enderby Coast Ice Edge',
    coordinates: '65.40°S, 54.20°E',
    cameraInfo: 'Nikon Z9 • 400mm f/4.5 • 1/3200s • ISO 320',
    url: 'https://images.unsplash.com/photo-1687904590788-a3ce87df66d6?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1687904590788-a3ce87df66d6?auto=format&fit=crop&w=600&q=80',
    description: 'Humpback whales bubble-net feeding on high-density Antarctic krill swarms along the shelf break in early autumn.',
    license: 'CC BY 4.0',
    tags: ['Whales', 'Southern Ocean', 'Marine Mammals', 'Krill', 'Breaching']
  },
  {
    id: 'med-15',
    title: 'Helicopter Sling-Load Operations During Logistics Relief at Maitri',
    type: 'Photo',
    category: 'Station Life',
    region: 'Antarctica',
    year: 2024,
    expedition: '43rd Indian Scientific Expedition to Antarctica',
    photographer: 'Dr. Keith Braganza',
    location: 'Maitri Base Helipad',
    coordinates: '70.76°S, 11.73°E',
    cameraInfo: 'Sony Alpha 7 IV • 70-200mm f/4 • 1/1600s • ISO 100',
    url: 'https://images.unsplash.com/photo-1687904368738-ca6423635666?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1687904368738-ca6423635666?auto=format&fit=crop&w=600&q=80',
    description: 'Heavy Kamov Ka-32 helicopter transporting scientific fuel bladders and provisions from the ship anchorage to Maitri base.',
    license: 'CC BY 4.0',
    tags: ['Helicopter', 'Aviation', 'Logistics', 'Maitri', 'Antarctica']
  }
];

// -------------------------------------------------------------
// RESEARCHERS & SCIENTISTS
// -------------------------------------------------------------
export const POLAR_RESEARCHERS: ResearcherItem[] = [
  {
    id: 'dr-vikramaditya-sen',
    name: 'Dr. Vikramaditya Sen',
    title: 'Chief Scientist & Lead Glaciologist',
    institution: 'National Polar Knowledge Centre',
    role: 'Glaciology & Ice Sheet Dynamics',
    domain: 'Glaciology',
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Vikramaditya Sen has spent over two decades researching the mass balance, ice radar stratigraphy, and paleoclimate of the East Antarctic Ice Sheet. He served as Expedition Leader on both the 38th and 43rd Indian Scientific Expeditions to Antarctica.',
    researchInterests: ['Ice Sheet Mass Balance', 'Radar Echo Sounding', 'Ice Core Paleoclimatology', 'Grounding Line Dynamics'],
    expeditionsCount: 7,
    publicationsCount: 48,
    datasetsCount: 16,
    expeditionIds: ['exp-43-iae', 'exp-41-iae'],
    email: 'v.sen@polaris-science.org',
    orcid: '0000-0002-8419-3201'
  },
  {
    id: 'dr-anandita-chatterjee',
    name: 'Dr. Anandita Chatterjee',
    title: 'Senior Marine Biogeochemist',
    institution: 'Oceanographic Research Group',
    role: 'Coastal Oceanography & Microbial Sympagic Systems',
    domain: 'Oceanography',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bio: 'Specializing in fast-ice ecology and coastal ocean currents, Dr. Chatterjee led marine operations during the 42nd Antarctic campaign. Her research decodes how sea ice algae sustain entire Antarctic benthic ecosystems through polar winters.',
    researchInterests: ['Landfast Ice Ecosystems', 'Sympagic Algal Biomass', 'Coastal Boundary Currents', 'Cryophilic Metagenomics'],
    expeditionsCount: 5,
    publicationsCount: 36,
    datasetsCount: 12,
    expeditionIds: ['exp-42-iae'],
    email: 'a.chatterjee@polaris-science.org',
    orcid: '0000-0001-9234-8842'
  },
  {
    id: 'dr-rajeshwar-nair',
    name: 'Dr. Rajeshwar Nair',
    title: 'Lead Atmospheric Scientist',
    institution: 'Atmospheric Physics Consortium',
    role: 'Polar Atmospheric Aerosols & Climate Teleconnections',
    domain: 'Atmospheric Science',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Nair oversees long-term aerosol and greenhouse gas monitoring at both Himadri (Arctic) and Maitri (Antarctica). His seminal work links Arctic sea ice decline with changes in mid-latitude and Indian monsoon teleconnections.',
    researchInterests: ['Black Carbon Aerosols', 'Aerosol-Cloud Interactions', 'Arctic Teleconnections', 'Boundary Layer Meteorology'],
    expeditionsCount: 8,
    publicationsCount: 62,
    datasetsCount: 22,
    expeditionIds: ['exp-arctic-24', 'exp-43-iae'],
    email: 'r.nair@polaris-science.org',
    orcid: '0000-0003-4512-9908'
  },
  {
    id: 'dr-meenakshi-sundaram',
    name: 'Dr. Meenakshi Sundaram',
    title: 'Principal Oceanographer',
    institution: 'Southern Ocean Biogeochemistry Directorate',
    role: 'Deep Ocean Carbon Sinks & ACC Frontal Hydrography',
    domain: 'Oceanography',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    bio: 'Chief Scientist of the 12th Southern Ocean Scientific Expedition, Dr. Sundaram has completed six high-latitude voyages analyzing the biological carbon pump, trace iron limitation, and ocean acidification in the roaring forties and furious fifties.',
    researchInterests: ['Southern Ocean Carbon Sinks', 'Antarctic Circumpolar Current', 'Trace Iron Biogeochemistry', 'Ocean Acidification'],
    expeditionsCount: 6,
    publicationsCount: 44,
    datasetsCount: 18,
    expeditionIds: ['exp-soe-12'],
    email: 'm.sundaram@polaris-science.org',
    orcid: '0000-0002-1849-7714'
  },
  {
    id: 'dr-priya-harikrishnan',
    name: 'Dr. Priya Harikrishnan',
    title: 'Principal Investigator, Arctic Marine Programs',
    institution: 'Arctic Marine Systems Lab',
    role: 'Fjord Physical Oceanography & IndARC Operations',
    domain: 'Physical Oceanography',
    photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Harikrishnan has served as Lead Investigator for the IndARC underwater mooring in Kongsfjorden, Svalbard. Her work documents the accelerated "Atlantification" of the European Arctic and its influence on marine mammals.',
    researchInterests: ['IndARC Moored Arrays', 'Fjord Oceanography', 'Arctic Thermohaline Circulation', 'Marine Acoustics'],
    expeditionsCount: 6,
    publicationsCount: 39,
    datasetsCount: 14,
    expeditionIds: ['exp-arctic-24', 'exp-arctic-23'],
    email: 'p.harikrishnan@polaris-science.org',
    orcid: '0000-0001-7890-4421'
  },
  {
    id: 'dr-shailendra-saini',
    name: 'Dr. Shailendra Saini',
    title: 'Senior Solid Earth Geophysicist',
    institution: 'National Earth Science Institute',
    role: 'Lithospheric Seismology & Polar Geodesy',
    domain: 'Geophysics',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    bio: 'Leader of the 41st Indian Antarctic Expedition, Dr. Saini operates broadband seismological observatories across East Antarctica, using earthquake waveforms to model ancient Gondwana continent breakups.',
    researchInterests: ['Broadband Seismology', 'Receiver Functions', 'Gondwanaland Tectonics', 'Glacial Isostatic Adjustment'],
    expeditionsCount: 4,
    publicationsCount: 31,
    datasetsCount: 9,
    expeditionIds: ['exp-41-iae'],
    email: 's.saini@polaris-science.org',
    orcid: '0000-0002-6611-3092'
  },
  {
    id: 'dr-sunita-deshmukh',
    name: 'Dr. Sunita Deshmukh',
    title: 'Head of Cryospheric Biotechnology',
    institution: 'Polar Microbial Biotechnology Centre',
    role: 'Psychrophilic Extremophiles & Lacustrine Paleolimnology',
    domain: 'Microbiology',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Deshmukh isolates cold-active enzymes and novel antibiotics from sub-zero Antarctic lake sediments. Her lab has characterized over 150 novel bacterial strains with biotechnological applications.',
    researchInterests: ['Extremophile Microbiology', 'Cold-Active Enzymes', 'Antarctic Lake Paleolimnology', 'Biomedical Cryoprotectants'],
    expeditionsCount: 4,
    publicationsCount: 41,
    datasetsCount: 11,
    expeditionIds: ['exp-43-iae', 'exp-41-iae'],
    email: 's.deshmukh@polaris-science.org',
    orcid: '0000-0003-1289-5503'
  },
  {
    id: 'dr-farooq-khan',
    name: 'Dr. Farooq Khan',
    title: 'Senior Space Weather Physicist',
    institution: 'Space and Atmospheric Physics Division',
    role: 'Geomagnetism, Auroral Dynamics & Solar Storms',
    domain: 'Space Physics',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    bio: 'Stationed at Bharati for two overwintering seasons, Dr. Khan conducts research on high-latitude geomagnetic pulsations, ring current energy injection, and the impact of solar coronal mass ejections on polar navigation.',
    researchInterests: ['Geomagnetic Pulsations', 'Auroral Electrojets', 'Magnetosphere-Ionosphere Coupling', 'Space Weather Mitigation'],
    expeditionsCount: 3,
    publicationsCount: 27,
    datasetsCount: 10,
    expeditionIds: ['exp-42-iae'],
    email: 'f.khan@polaris-science.org',
    orcid: '0000-0002-9903-1120'
  },
  {
    id: 'dr-tarun-ghosh',
    name: 'Dr. Tarun Ghosh',
    title: 'Marine Hydroacoustics Specialist',
    institution: 'Southern Ocean Biogeochemistry Directorate',
    role: 'Pelagic Foodwebs & Acoustic Krill Surveys',
    domain: 'Marine Ecology',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Ghosh leads scientific echosounder biomass calibrations in the Southern Ocean, tracking the spatial response of Antarctic krill swarms to changing sea ice cover and whale predation.',
    researchInterests: ['Bioacoustics', 'Euphausia superba Dynamics', 'Pelagic Foodwebs', 'Fisheries Management'],
    expeditionsCount: 4,
    publicationsCount: 25,
    datasetsCount: 8,
    expeditionIds: ['exp-soe-12', 'exp-42-iae'],
    email: 't.ghosh@polaris-science.org',
    orcid: '0000-0002-3341-9870'
  },
  {
    id: 'dr-keith-braganza',
    name: 'Dr. Keith Braganza',
    title: 'Director of Polar Engineering Systems',
    institution: 'Polar Engineering and Technology Division',
    role: 'Autonomous Microgrids & Extreme Cold Engineering',
    domain: 'Polar Engineering',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    bio: 'Architect of the zero-emission clean microgrid retrofits at Bharati and Maitri bases, Dr. Braganza designs renewable solar and wind systems capable of operating during katabatic storms up to 180 km/h.',
    researchInterests: ['Extreme Cold Energy Storage', 'Polar Microgrids', 'Structural Vibration in Permafrost', 'Autonomous Field Instrumentation'],
    expeditionsCount: 5,
    publicationsCount: 29,
    datasetsCount: 7,
    expeditionIds: ['exp-43-iae'],
    email: 'k.braganza@polaris-science.org',
    orcid: '0000-0001-5540-2219'
  }
];

// -------------------------------------------------------------
// POLAR EDITORIAL STORIES
// -------------------------------------------------------------
export const POLAR_STORIES: StoryItem[] = [
  {
    id: 'story-01',
    slug: 'life-at-an-antarctic-research-station',
    title: 'Life at an Antarctic Research Station: Wintering Over at Bharati',
    subtitle: 'What happens when the last relief ship departs and 24 scientists face nine months of total polar isolation?',
    category: 'Station Life',
    author: 'Dr. Vikramaditya Sen',
    authorRole: 'Expedition Leader, 43-IAE',
    authorAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80',
    date: 'February 18, 2024',
    readTime: '8 min read',
    heroImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=80',
    heroCaption: 'Bharati Station glows under the emerald curtains of the Aurora Australis during the depth of mid-winter.',
    summary: 'An intimate look at wintering over in the Larsemann Hills—managing power, growing fresh herbs hydroponically in sub-zero darkness, navigating katabatic blizzards, and maintaining mission-critical scientific telemetry.',
    contentParagraphs: [
      'When the horn of the MV Vasiliy Golovnin sounds for the final time in March, it carries across the ice like an echo from another planet. The ship turns north toward Cape Town. From that moment until November, the 24 wintering members of Bharati Station are entirely on their own. No aircraft can land; no relief vessel can penetrate the hundreds of miles of crushing pack ice that rapidly seals Prydz Bay.',
      'Perched on stilts above the crystalline rocky outcrops of the Larsemann Hills, Bharati looks like a spacecraft that touched down on an alien shoreline. Built from 134 prefabricated shipping container modules clad in aerodynamic composite panels, the base is designed to let ferocious katabatic winds slip harmlessly beneath its hull rather than creating suffocating snowdrifts.',
      'Inside, life takes on a precise, disciplined cadence. At 07:00, the station chef has warm porridge and coffee ready. By 07:30, scientific teams report to their respective labs: atmospheric physicists check the continuous geomagnetic magnetometers, satellite ground engineers align tracking dishes for polar-orbiting Earth observation passes, and glaciologists verify data telemetry arriving from autonomous GPS weather stations stationed 80 kilometers inland on the high plateau.',
      'Yet the greatest challenge is not the technical workload; it is the psychological weight of the Polar Night. For over eight weeks, the sun never clears the horizon. Day and night merge into an endless twilight painted in shades of sapphire, indigo, and charcoal. To preserve circadian rhythms, the station operates on strict lighting schedules, and the hydroponics chamber becomes the communal heart of the base—where scientists take turns tending dwarf tomatoes, cucumbers, and basil under bright magenta grow lights.',
      'Outside, the temperature routinely drops below -42°C, and when a blizzard strikes, visibility drops to zero in seconds. Stepping between buildings requires clipping carabiners to heavy steel guide ropes. Yet when the winds fall silent, the rewards are transcendental: stepping onto the observation bridge to witness the Aurora Australis twisting across the celestial sphere in iridescent emerald bands, a reminder of the raw power and beauty of our living planet.'
    ],
    keyFacts: [
      'Bharati Station houses up to 47 personnel in summer and 24 during winter isolation.',
      'The base operates on aerodynamic stilts to prevent snow accumulation beneath the structure.',
      'Over 8 weeks of continuous Polar Night occur each winter with zero direct sunlight.',
      'A dedicated hydroponics facility produces fresh greens to support team nutrition and psychological health.'
    ],
    pullQuote: 'In Antarctica, you realize that nature does not negotiate. You either adapt with rigorous humility, or the continent will humble you in seconds.',
    pullQuoteAuthor: 'Dr. Vikramaditya Sen, Chief Scientist',
    relatedReportIds: ['rep-43-01', 'rep-42-02'],
    relatedDatasetIds: ['ds-ice-01', 'ds-geomag-04']
  },
  {
    id: 'story-02',
    slug: 'understanding-antarctic-ice-secrets-in-deep-core',
    title: 'Reading 800,000 Years in Antarctic Ice: Secrets in the Deep Core',
    subtitle: 'How microscopic bubbles of ancient atmosphere trapped within polar ice sheets illuminate our planet’s climatic future.',
    category: 'Deep Science',
    author: 'Dr. Anandita Chatterjee',
    authorRole: 'Senior Marine Biogeochemist',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    date: 'January 12, 2024',
    readTime: '10 min read',
    heroImage: 'https://images.unsplash.com/photo-1551415923-31d2072bc248?auto=format&fit=crop&w=1600&q=80',
    heroCaption: 'A continuous cylindrical ice core extracted from the polar plateau reveals delicate annual snow layering.',
    summary: 'Journey deep into the trench laboratories of Dronning Maud Land, where glaciologists carefully drill into kilometers of glacial ice to recover atmospheric records from epochs when mammoths roamed the Earth.',
    contentParagraphs: [
      'Deep inside an ice core trench carved three meters into the Antarctic firn, the air temperature is a constant -25°C. Glaciologists clad in cleanroom suits handle transparent cylinders of ice as if they were ancient illuminated manuscripts. In truth, they are something even rarer: a continuous, unbroken atmospheric tape recording of the Earth climate over hundreds of thousands of years.',
      'Every snowfall in Antarctica captures tiny air pockets between ice crystals. As subsequent winters pile fresh snow on top, the immense weight compresses the snow into firn, and eventually into dense crystalline glacial ice. The trapped air bubbles are hermetically sealed—preserving authentic samples of prehistoric atmosphere untouched since the day the snow drifted from the sky.',
      'By analyzing the ratios of stable oxygen isotopes (18O to 16O) in the ice matrix, scientists reconstruct past temperatures with astonishing precision. Meanwhile, laser spectrometers melt thin slices of the core to measure greenhouse gas concentrations trapped within the bubbles: carbon dioxide, methane, and nitrous oxide. Volcanic eruptions leave distinct acidic sulfate spikes, while micro-particles of desert dust reveal past wind regimes and drought cycles on distant continents.',
      'The data recovered from deep Antarctic cores tells an unequivocal story: for the past 800,000 years, atmospheric carbon dioxide fluctuated between 180 parts per million (during the depths of Ice Ages) and 280 parts per million (during warm interglacial periods). Today, human emissions have driven concentrations past 420 parts per million—a rate of increase unprecedented in the planetary geological record.',
      'As our research teams complete the extraction of the new 120-meter core in Dronning Maud Land, each millimeter decoded helps refine the supercomputer climate models that coastal cities worldwide depend upon to predict sea level rise across the coming century.'
    ],
    keyFacts: [
      'Antarctic ice sheets store 70% of the world’s freshwater and 90% of its glacial ice.',
      'Air bubbles trapped inside deep cores provide direct, physical samples of ancient atmospheres up to 800,000 years old.',
      'Pre-industrial CO2 levels never exceeded 280 ppm throughout 8 glacial-interglacial cycles.',
      'Modern automated laser spectroscopy can analyze continuous chemical stratigraphy at millimeter resolution.'
    ],
    pullQuote: 'Holding a piece of 50,000-year-old ice up to your ear, you can hear the pressurized air bubbles popping—ancient atmosphere escaping into modern air.',
    pullQuoteAuthor: 'Dr. Anandita Chatterjee',
    relatedReportIds: ['rep-43-01', 'rep-41-12'],
    relatedDatasetIds: ['ds-ice-01', 'ds-paleo-11']
  },
  {
    id: 'story-03',
    slug: 'exploring-the-southern-ocean',
    title: 'Exploring the Southern Ocean: The Planetary Heat Engine',
    subtitle: 'Navigating the Roaring Forties and Furious Fifties to decipher how the world’s wildest ocean shields humanity from climate shocks.',
    category: 'Ocean Voyages',
    author: 'Dr. Meenakshi Sundaram',
    authorRole: 'Principal Oceanographer',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    date: 'November 29, 2023',
    readTime: '9 min read',
    heroImage: 'https://images.unsplash.com/photo-1687904590788-a3ce87df66d6?auto=format&fit=crop&w=1600&q=80',
    heroCaption: 'The SA Agulhas II plows through 8-meter swells in the Sub-Antarctic Front along the 57.5°E transect.',
    summary: 'Follow the 12th Southern Ocean Expedition as scientists endure 10-meter swells to measure how deep ocean currents absorb excess planetary heat and sequester carbon dioxide into the abyss.',
    contentParagraphs: [
      'The Southern Ocean is the only ocean on Earth that circles the entire globe uninterrupted by any continental barrier. Driven by relentless westerly gales, the Antarctic Circumpolar Current transports 150 million cubic meters of water per second—more than one hundred times the combined flow of all the world rivers.',
      'Aboard our ice-strengthened research vessel, everything must be bolted down. Even chairs in the mess hall are chained to the deck. Working in the Roaring Forties and Furious Fifties means operating cranes, deploying CTD rosettes, and towing plankton nets while the ship rolls 30 degrees from side to side in freezing gray waters.',
      'Yet scientists brave these punishing waters because the Southern Ocean is the unsung hero of the global climate system. It has absorbed approximately 40% of all human-induced carbon dioxide taken up by oceans, and over 75% of the excess ocean heat generated since the Industrial Revolution. Without the Southern Ocean acting as a colossal planetary radiator, global air temperatures would be vastly higher today.',
      'Our team deployed 32 deep-water CTD casts along the 57.5°E meridian, lowering sensor clusters four thousand meters into the Antarctic Bottom Water. We measured trace quantities of dissolved iron—a vital fertilizer without which phytoplankton cannot grow. Where hydrothermal vents or island wakes release iron, the ocean bursts into vibrant turquoise blooms of diatoms visible from orbit, drawing thousands of tons of carbon from the atmosphere and burying it on the sea floor.',
      'Understanding the health and stability of this biological pump is critical. If warming waters or changing wind patterns diminish the Southern Ocean’s ability to absorb CO2, the consequences will reverberate through every ecosystem on Earth.'
    ],
    keyFacts: [
      'The Antarctic Circumpolar Current moves 150 million m³/s of water—the most powerful current on Earth.',
      'The Southern Ocean accounts for over 40% of the oceanic uptake of anthropogenic carbon dioxide.',
      'Phytoplankton blooms in the Polar Front are heavily limited by iron concentrations below 0.1 nanomoles/liter.',
      'Deep Antarctic Bottom Water ventilated here reaches all the way to the North Atlantic over centuries.'
    ],
    pullQuote: 'The Southern Ocean is Earth’s thermodynamic lung: breathing in heat and carbon, circulating nutrients, and keeping our biosphere temperate.',
    pullQuoteAuthor: 'Dr. Meenakshi Sundaram',
    relatedReportIds: ['rep-soe-04', 'rep-soe-08'],
    relatedDatasetIds: ['ds-ocean-09', 'ds-krill-10']
  },
  {
    id: 'story-04',
    slug: 'inside-a-polar-expedition',
    title: 'Inside a Polar Expedition: 45 Days on Icebreaker MV Vasiliy Golovnin',
    subtitle: 'From the humid docks of Mormugao to the pack-ice labyrinth of Antarctica: a dispatch from the logistics frontline.',
    category: 'Exploration',
    author: 'Dr. Keith Braganza',
    authorRole: 'Director of Polar Engineering Systems',
    authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    date: 'October 15, 2023',
    readTime: '7 min read',
    heroImage: 'https://images.unsplash.com/photo-1687904368738-ca6423635666?auto=format&fit=crop&w=1600&q=80',
    heroCaption: 'Scientists and flight engineers prepare a Kamov helicopter for ice-edge sling operations.',
    summary: 'A behind-the-scenes account of the logistical marvel behind polar science: loading thousands of tons of aviation fuel, specialized scientific containers, snowcats, and provisions for high-latitude field campaigns.',
    contentParagraphs: [
      'Behind every peer-reviewed paper and satellite-verified ice measurement lies a colossal logistical operation that begins months before a ship ever touches salt water. For the 43rd Antarctic campaign, over 1,200 metric tons of cargo had to be meticulously cataloged, inspected, and loaded into the holds of MV Vasiliy Golovnin.',
      'A polar research base is essentially a miniature off-grid city located thousands of miles from the nearest hardware store or hospital. Every spare filter, generator bearing, medical anesthetic, and freeze-dried vegetable must be packed with zero margin for error. If a crucial hydraulic coupling is left behind on the dock, an entire million-dollar ice-drilling campaign might sit idle for an entire year.',
      'As the vessel crosses the Antarctic Convergence near 55°S, the ocean temperature plummets from +12°C to +1°C in less than 24 hours. The ship enters the fog of the ice edge. Soon, the first tabular icebergs appear—floating cathedrals of blue and white, some stretching twenty kilometers across.',
      'When the ship reaches the fast ice fastness off Bharati Station, the real muscle begins. Dual Kamov Ka-32 helicopters fly continuous sling loads, ferrying heavy cargo containers from the vessel’s deck to the base helipad. Meanwhile, snowcat crews scout safe routes across sea-ice pressure ridges, drilling test holes every 200 meters to ensure the ice can support 25-ton PistenBully tractors.',
      'When you see a glaciologist successfully drill a 120-meter ice core, you are witnessing the tip of an iceberg that rests on the dedication of sailors, helicopter pilots, crane operators, and mechanics who keep polar science alive in the harshest environment on Earth.'
    ],
    keyFacts: [
      'An annual expedition requires transporting over 1,200 metric tons of fuel, machinery, and provisions.',
      'Kamov Ka-32 helicopters perform up to 180 flight hours during the brief 60-day summer discharge window.',
      'Fast-ice thickness must exceed 1.6 meters to safely support heavy PistenBully transport convoys.',
      'Zero-waste protocols require all human and industrial waste to be packed and transported back to mainland ports.'
    ],
    pullQuote: 'In polar science, logistics is not support—logistics is the mission. You cannot do science where you cannot survive.',
    pullQuoteAuthor: 'Dr. Keith Braganza',
    relatedReportIds: ['rep-43-11', 'rep-41-06'],
    relatedDatasetIds: ['ds-atm-02', 'ds-rad-12']
  },
  {
    id: 'story-05',
    slug: 'arctic-ecosystems-under-rapid-warming',
    title: 'Arctic Ecosystems Under Rapid Warming: Svalbard Field Notes',
    subtitle: 'Witnessing the transformation of Kongsfjorden as warmer Atlantic currents disrupt the northernmost biodiversity hotspot.',
    category: 'Climate Frontier',
    author: 'Dr. Priya Harikrishnan',
    authorRole: 'Principal Investigator, Arctic Marine Programs',
    authorAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80',
    date: 'September 04, 2024',
    readTime: '9 min read',
    heroImage: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?auto=format&fit=crop&w=1600&q=80',
    heroCaption: 'Kongsvegen glacier terminus where freshwater meltwater streams discharge directly into the fjord.',
    summary: 'Field dispatch from Ny-Ålesund, Svalbard, documenting the "Atlantification" of the high Arctic—how retreating glaciers and warmer water are altering marine food webs from tiny copepods to apex predators.',
    contentParagraphs: [
      'At 79 degrees north, Ny-Ålesund is the northernmost permanent civilian settlement on the planet. Here, surrounded by sharp alpine peaks that gave Spitsbergen its name, scientists from over a dozen nations share laboratory facilities, dining halls, and a common purpose: monitoring the fastest-warming region on Earth.',
      'The Arctic is warming at nearly four times the global average rate—a phenomenon known as Arctic Amplification. In Kongsfjorden, this warming is not a distant computer projection; it is something you see, hear, and feel every single day. The glaciers that terminate in the fjord—Kongsvegen, Blomstrandbreen, and Conwaybreen—are retreating at historic speeds. On warm July afternoons, the fjord echoes with explosive cracks as massive ice seracs collapse into the water, generating localized mini-tsunamis.',
      'Beneath the surface, an even more profound transformation is underway. Our IndARC subsurface mooring, anchored at 192 meters depth midway through the fjord, has tracked continuous ocean temperatures for a decade. The data reveals that warm, salty Atlantic water from the West Spitsbergen Current is penetrating deeper and lingering longer into the winter months.',
      'This process, termed "Atlantification", is rewriting the fjord’s ecology. Native Arctic zooplankton like Calanus glacialis—rich in energy-dense wax esters that sustain seabirds through winter—are being supplanted by smaller Atlantic copepods (Calanus finmarchicus). Seabird colonies on the cliffs of Blomstrandhalvøya are having to fly dozens of kilometers further out to sea to find suitable high-calorie food for their chicks.',
      'Standing on the pier of Himadri station at midnight, watching beluga whales surface through mist that glows amber in the midnight sun, you realize that the Arctic is not an isolated wilderness. It is an early warning system for the entire planet—and the warning bells are ringing loud and clear.'
    ],
    keyFacts: [
      'The Arctic is warming four times faster than the global average due to sea ice-albedo feedbacks.',
      'Ny-Ålesund (78°55\'N) is the world’s northernmost permanent civilian scientific research settlement.',
      'IndARC is India’s first multi-sensor underwater moored observatory deployed in the Arctic.',
      'Tidewater glaciers in Kongsfjorden have retreated over 1.5 kilometers over the past two decades.'
    ],
    pullQuote: 'What happens in the Arctic does not stay in the Arctic. The changes unfolding here will reshape global weather patterns, sea levels, and agricultural seasons worldwide.',
    pullQuoteAuthor: 'Dr. Priya Harikrishnan',
    relatedReportIds: ['rep-arc-03', 'rep-arc-05', 'rep-arc-10'],
    relatedDatasetIds: ['ds-aero-05', 'ds-indarc-08', 'ds-fjord-07']
  }
];

// -------------------------------------------------------------
// POLAR CLASSROOM MODULES & QUIZ
// -------------------------------------------------------------
export const POLAR_EDUCATIONAL_MODULES: EducationalModule[] = [
  {
    id: 'mod-01',
    title: 'Antarctica: The Frozen Giant',
    targetLevel: 'Middle School',
    duration: '25 mins',
    region: 'Antarctica',
    description: 'Discover why Antarctica is the coldest, driest, and windiest continent on Earth. Learn how ice sheets form, explore the difference between land ice and sea ice, and meet the scientists who live at Bharati and Maitri.',
    keyConcepts: ['Ice Sheet vs Ice Shelf', 'Katabatic Winds', 'Extreme Cold Adaptation', 'The Antarctic Treaty'],
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80',
    interactiveActivity: 'Interactive Ice Thickness Simulator: Compare your city’s tallest towers with the 4,000m thick Antarctic ice sheet!'
  },
  {
    id: 'mod-02',
    title: 'The Arctic: Ocean Surrounded by Continents',
    targetLevel: 'High School',
    duration: '35 mins',
    region: 'Arctic',
    description: 'Explore the frozen ocean of the North Pole. Understand the albedo effect, discover why the Arctic is warming four times faster than the rest of the planet, and take an interactive tour of the Himadri station in Svalbard.',
    keyConcepts: ['Sea Ice Albedo Feedback', 'Polar Night & Midnight Sun', 'Atlantification', 'Arctic Wildlife'],
    image: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?auto=format&fit=crop&w=600&q=80',
    interactiveActivity: 'Albedo Experiment: Calculate how much solar energy is absorbed when white sea ice melts into dark ocean water.'
  },
  {
    id: 'mod-03',
    title: 'The Secrets Inside Ice Cores',
    targetLevel: 'Undergraduate',
    duration: '45 mins',
    region: 'Antarctica',
    description: 'How can ice drilled from thousands of meters deep reveal the composition of air from 800,000 years ago? Learn the science of isotopic paleoclimatology, greenhouse gas extraction, and volcanic fingerprinting.',
    keyConcepts: ['Oxygen Isotope Ratios (18O/16O)', 'Trapped Air Bubbles', 'Glacial-Interglacial Cycles', 'Milankovitch Forcing'],
    image: 'https://images.unsplash.com/photo-1551415923-31d2072bc248?auto=format&fit=crop&w=600&q=80',
    interactiveActivity: 'Virtual Core Analyzer: Inspect cross-sections of ice cores and match chemical spikes with historic volcanic eruptions!'
  },
  {
    id: 'mod-04',
    title: 'The Southern Ocean: Planetary Carbon Engine',
    targetLevel: 'High School',
    duration: '30 mins',
    region: 'Southern Ocean',
    description: 'Investigate the world’s most turbulent ocean. Discover how the Antarctic Circumpolar Current drives global ocean circulation, why tiny krill power the marine food web, and how the ocean absorbs excess heat and carbon.',
    keyConcepts: ['Antarctic Circumpolar Current', 'Biological Carbon Pump', 'Euphausia superba (Krill)', 'Upwelling & Downwelling'],
    image: 'https://images.unsplash.com/photo-1687904590788-a3ce87df66d6?auto=format&fit=crop&w=600&q=80',
    interactiveActivity: 'Ocean Conveyor Belt Simulator: Trace a water molecule traveling from the Antarctic ice shelf through all the world’s oceans!'
  },
  {
    id: 'mod-05',
    title: 'Meet the Polar Scientists & Life in the Field',
    targetLevel: 'General Public',
    duration: '20 mins',
    region: 'Antarctica',
    description: 'Ever wondered what it takes to work in -45°C? Step into the boots of polar glaciologists, marine biologists, and station engineers. Explore daily routines, specialized gear, safety rules, and cold-weather survival skills.',
    keyConcepts: ['Polar Logistics', 'Field Safety & Frostbite Prevention', 'Hydroponics in Antarctica', 'Clean Energy Microgrids'],
    image: 'https://images.unsplash.com/photo-1687904368738-ca6423635666?auto=format&fit=crop&w=600&q=80',
    interactiveActivity: 'Polar Packing Challenge: Select the essential scientific and survival gear needed for an 80 km Antarctic traverse without overloading your sledge!'
  }
];

export const POLAR_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Why is Antarctica considered the world’s largest desert?',
    category: 'Geography & Climate',
    options: [
      'Because it is covered in white sandy dunes that look like deserts',
      'Because it receives extremely low annual precipitation, averaging less than 100 mm in the interior',
      'Because solar radiation evaporates all moisture immediately',
      'Because the soil contains high concentrations of alkaline salts'
    ],
    correctIndex: 1,
    explanation: 'Despite holding 70% of the world’s freshwater locked as ice, the Antarctic interior receives an average of less than 50 to 100 mm of precipitation per year (mostly in the form of fine diamond dust snow), scientifically classifying it as a hyper-arid polar desert.',
    scientificContext: 'Polar atmospheric air is extremely cold and can hold very little water vapor, creating desert conditions despite the presence of immense ice sheets.'
  },
  {
    id: 2,
    question: 'What is the primary scientific difference between Arctic sea ice and the Antarctic ice sheet?',
    category: 'Cryospheric Science',
    options: [
      'Arctic sea ice is formed from frozen saltwater floating on an ocean, while the Antarctic ice sheet rests on a continental landmass',
      'Antarctic ice is salty, while Arctic ice is completely freshwater',
      'Arctic ice is 4,000 meters thick, while Antarctic ice is only 2 meters thick',
      'There is no scientific difference; both are identical frozen water bodies'
    ],
    correctIndex: 0,
    explanation: 'The Arctic is an ocean surrounded by continents, covered by a dynamic layer of frozen seawater (typically 1 to 4 meters thick). In contrast, Antarctica is an isolated continent covered by a massive continental freshwater ice sheet up to 4,800 meters thick.',
    scientificContext: 'Melting sea ice does not directly increase sea levels (like a melting ice cube in a full glass), whereas melting continental ice sheets adds new water to the ocean, driving global sea level rise.'
  },
  {
    id: 3,
    question: 'How do paleoclimatologists extract records of Earth’s atmosphere from 800,000 years ago?',
    category: 'Glaciological Research',
    options: [
      'By chemical analysis of dinosaur bones embedded in glaciers',
      'By analyzing microscopic bubbles of air trapped inside deep ice cores',
      'By taking underwater photographs of benthic sediment layers',
      'By reading tree ring sequences preserved in permafrost'
    ],
    correctIndex: 1,
    explanation: 'As snow is compressed into glacial ice over millennia, tiny air pockets are hermetically sealed between ice crystals. When glaciologists extract deep ice cores and melt them in vacuum chambers, they recover pristine samples of the ancient atmosphere to measure past CO2 and methane levels directly.',
    scientificContext: 'Ice cores from Dome C and Vostok in Antarctica provide the longest continuous direct atmospheric greenhouse gas records on Earth.'
  },
  {
    id: 4,
    question: 'What is meant by the "Atlantification" of the Arctic Ocean in places like Kongsfjorden?',
    category: 'Oceanography',
    options: [
      'The migration of Atlantic fish species to replace all Arctic wildlife',
      'The construction of undersea pipelines connecting Norway and Svalbard',
      'The deeper and longer seasonal inflow of warmer, saltier Atlantic water displacing colder Arctic water',
      'A chemical reaction between Arctic ice and Atlantic mineral deposits'
    ],
    correctIndex: 2,
    explanation: 'Atlantification refers to the increasing influence of warm, saline Atlantic water masses entering the Arctic Ocean and its fjords via Fram Strait. This suppresses seasonal sea ice formation and shifts marine ecosystems toward temperate Atlantic species.',
    scientificContext: 'Data from India’s IndARC subsurface mooring in Kongsfjorden has documented a decadal trend of Atlantic water intrusions extending well into the winter months.'
  },
  {
    id: 5,
    question: 'Why is the tiny Antarctic krill (Euphausia superba) considered a "keystone species" in the Southern Ocean?',
    category: 'Marine Biology',
    options: [
      'Because it is the largest predator in the Southern Ocean',
      'Because it creates massive coral-like stone structures along the seafloor',
      'Because it converts microscopic phytoplankton into food for penguins, seals, whales, and fish',
      'Because its shells are used to neutralize ocean acidification'
    ],
    correctIndex: 2,
    explanation: 'Antarctic krill forms the critical trophic bridge between primary producers (phytoplankton and ice algae) and higher trophic predators (baleen whales, crabeater seals, Adélie penguins, and seabirds). With an estimated biomass of over 400 million tonnes, it is one of the most abundant animal species on the planet.',
    scientificContext: 'Changes in sea ice extent directly impact krill larvae, which depend on ice-underside algae for nourishment during the polar winter.'
  }
];

// -------------------------------------------------------------
// "DID YOU KNOW?" QUICK POLAR FACTS
// -------------------------------------------------------------
export const POLAR_FACTS = [
  {
    fact: 'The coldest temperature ever recorded on Earth was -89.2°C (-128.6°F) at Vostok Station on the East Antarctic plateau in 1983.',
    category: 'Extreme Climate'
  },
  {
    fact: 'Antarctica holds roughly 70% of all fresh water and 90% of all glacial ice on Earth. If it all melted, global sea levels would rise by ~58 meters.',
    category: 'Cryosphere'
  },
  {
    fact: 'Polar bears and penguins never meet in the wild! Polar bears live exclusively in the Northern Hemisphere (Arctic), while penguins live in the Southern Hemisphere.',
    category: 'Wildlife'
  },
  {
    fact: 'In Antarctica, winds called "katabatic winds" can reach hurricane speeds exceeding 250 km/h, driven purely by dense cold air rolling down the polar plateau.',
    category: 'Meteorology'
  },
  {
    fact: 'The Arctic Svalbard Global Seed Vault stores over 1.2 million duplicate seed samples in permafrost deep inside a mountain at 78°N to safeguard human crop diversity.',
    category: 'Global Safeguards'
  },
  {
    fact: 'Antarctica has no permanent human residents, no native terrestrial mammals, and no trees or shrubs—only two native flowering plant species grow on the warmer peninsula.',
    category: 'Ecology'
  }
];



