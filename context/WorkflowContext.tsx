'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { POLAR_REPORTS, POLAR_DATASETS } from '@/data/polaris-data';

export type WorkflowStatus = 'Draft' | 'Generated' | 'Under Review' | 'Approved' | 'Published';

export type ContentType = 
  | 'Website Article'
  | 'Social Media Post'
  | 'Educational Story'
  | 'Press Brief'
  | 'Newsletter'
  | 'Video Script';

export type TargetAudience = 
  | 'General Public'
  | 'Students'
  | 'Researchers'
  | 'Teachers'
  | 'Policymakers';

export type TargetLanguage = 'English' | 'Hindi';

export interface WorkflowItem {
  id: string;
  title: string;
  contentType: ContentType;
  audience: TargetAudience;
  language: TargetLanguage;
  sourceReportId: string;
  sourceReportTitle: string;
  status: WorkflowStatus;
  author: string;
  authorRole: string;
  createdDate: string;
  lastUpdated: string;
  summary: string;
  content: string[];
  keyFacts: string[];
  citations: string[];
  reviewComments: Array<{
    author: string;
    date: string;
    text: string;
    decision: 'Approve' | 'Changes Requested' | 'Comment';
  }>;
  distributionChannels?: {
    website: boolean;
    linkedin: boolean;
    twitter: boolean;
    instagram: boolean;
    youtube: boolean;
  };
}

interface WorkflowContextType {
  items: WorkflowItem[];
  getItemById: (id: string) => WorkflowItem | undefined;
  addItem: (item: Omit<WorkflowItem, 'id' | 'createdDate' | 'lastUpdated'>) => string;
  updateStatus: (id: string, status: WorkflowStatus) => void;
  addComment: (id: string, comment: { author: string; text: string; decision: 'Approve' | 'Changes Requested' | 'Comment' }) => void;
  deleteItem: (id: string) => void;
  generateFromSource: (
    sourceId: string,
    contentType: ContentType,
    audience: TargetAudience,
    language: TargetLanguage
  ) => Promise<WorkflowItem>;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

const INITIAL_WORKFLOW_ITEMS: WorkflowItem[] = [
  {
    id: 'wf-001',
    title: 'How 120-Meter Antarctic Firn Cores Unmask Climate Trajectories',
    contentType: 'Website Article',
    audience: 'General Public',
    language: 'English',
    sourceReportId: 'rep-43-01',
    sourceReportTitle: 'Glaciological Stratigraphy and Mass Balance of Dronning Maud Land Ice Sheet',
    status: 'Published',
    author: 'Dr. Vikramaditya Sen & POLARIS Science Outreach',
    authorRole: 'Chief Glaciologist',
    createdDate: '2024-02-14',
    lastUpdated: '2024-02-28',
    summary: 'A deep dive into how continuous firn stratigraphy gathered during the 43rd Antarctic voyage uncovers centuries of polar precipitation trends.',
    content: [
      'Beneath the windswept surface of Dronning Maud Land lies a crystalline archive of Earth’s atmospheric past. During the 43rd Indian Antarctic Expedition, researchers navigated an 1,800-kilometer overland traverse to extract 120-meter ice cores.',
      'Analysis reveals that coastal accumulation has increased by 7.4% per decade since 1990 due to intensified cyclonic moisture intrusions from the Southern Ocean, offering fresh insight into global sea level rise models.'
    ],
    keyFacts: [
      '120-meter continuous core extracted at -48°C',
      '7.4% increase in coastal snowfall accumulation per decade',
      'Overland traverse spanned 1,800 kilometers over sastrugi terrain'
    ],
    citations: [
      'Sen, V., et al. (2024). POLARIS Scientific Monographs, 43(1), 1-64.',
      'POLAR-DAT-2024-001: Central Dronning Maud Land Ice Velocity NetCDF'
    ],
    reviewComments: [
      {
        author: 'Dr. Anandita Chatterjee (Senior Referee)',
        date: '2024-02-24',
        text: 'Terminology and accumulation statistics verified against dryad repository dataset.',
        decision: 'Approve'
      }
    ],
    distributionChannels: {
      website: true,
      linkedin: true,
      twitter: true,
      instagram: false,
      youtube: false
    }
  },
  {
    id: 'wf-002',
    title: 'IndARC Subsurface Mooring: 10-Year Record of Arctic Atlantification',
    contentType: 'Press Brief',
    audience: 'Policymakers',
    language: 'English',
    sourceReportId: 'rep-arc-05',
    sourceReportTitle: 'Kongsfjorden Thermohaline Structure: IndARC Decadal Synthesis',
    status: 'Approved',
    author: 'Dr. Priya Harikrishnan',
    authorRole: 'Principal Investigator, Arctic Marine Programs',
    createdDate: '2024-03-01',
    lastUpdated: '2024-03-12',
    summary: 'Executive briefing synthesizing a decade of continuous underwater temperature, salinity, and current measurements at Kongsfjorden, Svalbard.',
    content: [
      'Continuous observations from the 192-meter deep IndARC mooring establish a statistically significant warming of intermediate Arctic waters at 0.38°C per decade.',
      'The protracted presence of warm Atlantic water prevents winter fast-ice formation, accelerating glacier terminus retreat and disrupting pelagic biodiversity.'
    ],
    keyFacts: [
      '10 years of unbroken subsurface measurements in Arctic fjord',
      'Intermediate water warming rate: +0.38°C per decade',
      'Suppression of winter sea-ice consolidation since 2017'
    ],
    citations: [
      'Harikrishnan, P., et al. (2024). POLARIS Technical Monographs, 10(4), 1-110.',
      'IndARC Mooring CTD Archives (POL-DAT-2024-008)'
    ],
    reviewComments: [
      {
        author: 'Dr. Rajeshwar Nair',
        date: '2024-03-10',
        text: 'Policy implications on Arctic shipping and geopolitical environmental standards are sharply framed.',
        decision: 'Approve'
      }
    ],
    distributionChannels: {
      website: true,
      linkedin: true,
      twitter: true,
      instagram: false,
      youtube: false
    }
  },
  {
    id: 'wf-003',
    title: 'Tiny Krill, Huge Impact: Understanding Southern Ocean Carbon Pumps',
    contentType: 'Educational Story',
    audience: 'Students',
    language: 'English',
    sourceReportId: 'rep-soe-04',
    sourceReportTitle: 'Biogeochemical Carbon Sequestration Across the Southern Ocean Polar Front',
    status: 'Under Review',
    author: 'Editorial Science Writer',
    authorRole: 'Science Communicator',
    createdDate: '2024-03-15',
    lastUpdated: '2024-03-18',
    summary: 'Engaging classroom story explaining how microscopic marine algae and swarms of Antarctic krill trap atmospheric carbon and sink it into the ocean deep.',
    content: [
      'Imagine millions of tiny shrimp-like creatures swimming in freezing waters around Antarctica. These are Antarctic krill, and together they have more collective mass than all the humans on Earth!',
      'When krill feed on phytoplankton blooming under polar ice, they absorb carbon. Their fecal pellets sink rapidly to the sea floor, locking away carbon for hundreds of years.'
    ],
    keyFacts: [
      'Total estimated krill biomass exceeds 400 million tonnes',
      'Southern Ocean absorbs 40% of all oceanic carbon emissions',
      'Fast-ice underside provides nursery shelter for young krill'
    ],
    citations: [
      'Sundaram, M., et al. (2023). POLARIS Expedition Series, 12(1), 1-96.',
      'POL-DAT-2023-010: Acoustic Krill Swarm Survey'
    ],
    reviewComments: [
      {
        author: 'Dr. Tarun Ghosh',
        date: '2024-03-17',
        text: 'Please ensure biomass figures clarify that Euphausia superba is specific to the Southern Ocean and not global krill species.',
        decision: 'Changes Requested'
      }
    ]
  },
  {
    id: 'wf-004',
    title: 'Solar Panels on the Ice: Clean Microgrids at Bharati Base',
    contentType: 'Social Media Post',
    audience: 'General Public',
    language: 'English',
    sourceReportId: 'rep-43-11',
    sourceReportTitle: 'Autonomous Clean Energy Microgrid Operations Under Extreme Antarctic Weather',
    status: 'Generated',
    author: 'POLARIS Content Studio',
    authorRole: 'Automated Scientific Drafter',
    createdDate: '2024-03-20',
    lastUpdated: '2024-03-20',
    summary: 'High-impact social carousel highlighting the 24-hour polar sunlight microgrid that cut diesel consumption by 32,000 liters.',
    content: [
      'Did you know that during the polar summer, solar panels can produce extra energy thanks to reflection from snow? ☀️❄️',
      'At Bharati Station in Antarctica, bifacial solar panels achieved an 18% boost in energy yield by capturing light bouncing off pristine snowfields! Over 90 days of midnight sun, this slashed station emissions by 85 metric tons.'
    ],
    keyFacts: [
      '32,000 liters of diesel fuel conserved in one season',
      'Bifacial solar technology captures reflected snow albedo',
      'Vertical axis turbines tested up to 140 km/h wind gusts'
    ],
    citations: [
      'Braganza, K., et al. (2024). POLARIS Engineering Reports, 43(3), 1-70.'
    ],
    reviewComments: []
  },
  {
    id: 'wf-005',
    title: 'Metagenomics of Lake Priyadarshini: Discovering Enzymes of the Deep Cold',
    contentType: 'Website Article',
    audience: 'Researchers',
    language: 'English',
    sourceReportId: 'rep-43-07',
    sourceReportTitle: 'Extremophilic Microflora and Bioactive Metabolites from Lake Priyadarshini Sediments',
    status: 'Draft',
    author: 'Dr. Sunita Deshmukh',
    authorRole: 'Head of Cryospheric Biotechnology',
    createdDate: '2024-03-22',
    lastUpdated: '2024-03-22',
    summary: 'Technical review exploring how novel cold-active enzymes isolated from Antarctic lake sediments can revolutionize detergent chemistry and medical cryo-storage.',
    content: [
      'Microbial survival in the perennially cold sediment layers of Lake Priyadarshini requires profound metabolic adaptation. Metagenomic sequencing has uncovered forty-two distinct psychrophilic isolates producing cold-active esterases.'
    ],
    keyFacts: [
      '42 distinct psychrophilic bacterial isolates discovered',
      'Enzymes retain catalytic activity at temperatures below 10°C',
      'Potential applications in sustainable low-temperature industrial processes'
    ],
    citations: [
      'Deshmukh, S., et al. (2024). POLARIS Life Sciences Series, 43(2), 1-58.'
    ],
    reviewComments: []
  }
];

export function WorkflowProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WorkflowItem[]>(INITIAL_WORKFLOW_ITEMS);

  useEffect(() => {
    const saved = localStorage.getItem('polaris_workflow_items');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved workflow items', e);
      }
    }
  }, []);

  const persistItems = (newItems: WorkflowItem[]) => {
    setItems(newItems);
    localStorage.setItem('polaris_workflow_items', JSON.stringify(newItems));
  };

  const getItemById = (id: string) => items.find((item) => item.id === id);

  const addItem = (item: Omit<WorkflowItem, 'id' | 'createdDate' | 'lastUpdated'>) => {
    const id = 'wf-' + Math.random().toString(36).substring(2, 8);
    const now = new Date().toISOString().split('T')[0];
    const newItem: WorkflowItem = {
      ...item,
      id,
      createdDate: now,
      lastUpdated: now,
      reviewComments: []
    };
    persistItems([newItem, ...items]);
    return id;
  };

  const updateStatus = (id: string, status: WorkflowStatus) => {
    const updated = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    });
    persistItems(updated);
  };

  const addComment = (
    id: string,
    comment: { author: string; text: string; decision: 'Approve' | 'Changes Requested' | 'Comment' }
  ) => {
    const now = new Date().toISOString().split('T')[0];
    const updated = items.map((item) => {
      if (item.id === id) {
        let newStatus = item.status;
        if (comment.decision === 'Approve') {
          newStatus = 'Approved';
        } else if (comment.decision === 'Changes Requested') {
          newStatus = 'Under Review';
        }
        return {
          ...item,
          status: newStatus,
          lastUpdated: now,
          reviewComments: [
            ...item.reviewComments,
            { ...comment, date: now }
          ]
        };
      }
      return item;
    });
    persistItems(updated);
  };

  const deleteItem = (id: string) => {
    persistItems(items.filter((item) => item.id !== id));
  };

  const generateFromSource = async (
    sourceId: string,
    contentType: ContentType,
    audience: TargetAudience,
    language: TargetLanguage
  ): Promise<WorkflowItem> => {
    // Locate the source report or dataset
    const report = POLAR_REPORTS.find((r) => r.id === sourceId);
    const dataset = POLAR_DATASETS.find((d) => d.id === sourceId);

    const titleBase = report ? report.title : dataset ? dataset.title : 'Polar Science Discovery';
    const domain = report ? report.researchDomain : dataset ? dataset.domain : 'Cryospheric Science';
    const region = report ? report.region : dataset ? dataset.region : 'Antarctica';
    const authorName = report ? report.author : dataset ? dataset.leadInvestigator : 'Polar Research Team';

    // Simulate realistic generation logic with scientific credibility
    let generatedHeadline = '';
    let generatedSummary = '';
    let generatedContent: string[] = [];
    let generatedKeyFacts: string[] = [];

    if (language === 'Hindi') {
      generatedHeadline = `ध्रुवीय विज्ञान खोज: ${region} में ${domain} का नया अध्ययन`;
      generatedSummary = `${authorName} और शोध दल द्वारा प्रस्तुत किया गया व्यापक वैज्ञानिक अध्ययन, जो जलवायु परिवर्तन और ध्रुवीय पारिस्थितिकी पर महत्वपूर्ण अंतर्दृष्टि प्रदान करता है।`;
      generatedContent = [
        `ध्रुवीय क्षेत्रों में हुए हालिया शोध से यह स्पष्ट होता है कि ${region} में तापमान और बर्फ की संरचना में महत्वपूर्ण बदलाव आ रहे हैं। इस वैज्ञानिक अध्ययन का मुख्य उद्देश्य दीर्घकालिक आंकड़ों का विश्लेषण करना और भविष्य के प्रभावों का आकलन करना है।`,
        `वैज्ञानिक दल ने अत्याधुनिक उपकरणों का उपयोग करके नमूने एकत्र किए। यह शोध न केवल ध्रुवीय विज्ञान को समृद्ध करता है, बल्कि वैश्विक जलवायु नीतियों के लिए भी अत्यंत महत्वपूर्ण दिशा-निर्देश प्रस्तुत करता है।`
      ];
      generatedKeyFacts = [
        `${region} के अध्ययन क्षेत्र से उच्च-सटीक डेटा संग्रह`,
        `वैश्विक जलवायु मॉडल के लिए महत्वपूर्ण वैज्ञानिक संदर्भ`,
        `पीयर-रिव्यू प्रक्रिया के अंतर्गत सत्यापित निष्कर्ष`
      ];
    } else {
      if (contentType === 'Website Article') {
        generatedHeadline = `Unlocking the Mysteries of ${region}: New Insights in ${domain}`;
        generatedSummary = `A comprehensive scientific synthesis led by ${authorName}, detailing pioneering field observations and empirical models from ${region}.`;
        generatedContent = [
          `Scientific research conducted across ${region} continues to yield transformative data regarding the Earth's environmental equilibrium. Drawing upon direct measurements documented in "${titleBase}", this analysis illuminates how localized atmospheric and oceanographic shifts impact the broader cryospheric system.`,
          `Led by ${authorName}, the observational campaign deployed high-precision telemetry and physical sampling techniques. The empirical findings reveal intricate seasonal patterns that refine prevailing thermodynamic and ecological models, reinforcing the necessity of sustained polar monitoring.`
        ];
        generatedKeyFacts = [
          `Field observation anchored in ${region} polar research infrastructure`,
          `Empirical data verified against historical baselines and satellite measurements`,
          `Directly informs coupled Earth system models and sea level forecasting`
        ];
      } else if (contentType === 'Social Media Post') {
        generatedHeadline = `Breakthrough in Polar Science: New Observations from ${region}! ❄️🔬`;
        generatedSummary = `Key takeaways from ${authorName}'s latest research on ${domain} in ${region}.`;
        generatedContent = [
          `How is ${region} responding to changing planetary dynamics? 🌍 Discover the latest findings from ${authorName} on ${domain}!`,
          `Through rigorous field campaigns, scientists mapped critical parameters showing how polar systems act as early warning indicators for global climate shifts. Read the full scientific report on POLARIS! #PolarScience #${region.replace(/\s+/g, '')} #ClimateResearch`
        ];
        generatedKeyFacts = [
          `New data released by ${authorName}`,
          `Focuses on ${domain} dynamics in ${region}`,
          `Full report & open datasets accessible on POLARIS`
        ];
      } else if (contentType === 'Press Brief') {
        generatedHeadline = `SCIENTIFIC BRIEFING: New Research on ${domain} in ${region}`;
        generatedSummary = `Official scientific briefing on findings from "${titleBase}", authored by ${authorName}.`;
        generatedContent = [
          `FOR IMMEDIATE RELEASE: Polar researchers have completed a major empirical analysis focusing on ${domain} across ${region}. The investigation, spearheaded by ${authorName}, provides vital new baseline observations.`,
          `Policy Implications: The documented changes provide quantitative markers for international climate assessments, reinforcing the need for ongoing high-latitude telemetry and open-access data cooperation.`
        ];
        generatedKeyFacts = [
          `Investigator: ${authorName}`,
          `Domain: ${domain} | Region: ${region}`,
          `Peer-reviewed findings available for policy integration`
        ];
      } else {
        generatedHeadline = `Exploring ${domain}: Lessons from the ${region} Frontier`;
        generatedSummary = `An educational walkthrough on how polar science operates in ${region}, inspired by ${titleBase}.`;
        generatedContent = [
          `Welcome to the frontiers of polar science! Today we explore how researchers study ${domain} in one of Earth's most challenging environments: ${region}.`,
          `Working in sub-zero temperatures, scientists like ${authorName} gather ice, ocean, and atmospheric samples that tell the story of our planet's past, present, and future.`
        ];
        generatedKeyFacts = [
          `Targeted for ${audience} learning comprehension`,
          `Explains complex ${domain} concepts with real field data`,
          `Connected directly to authentic polar expeditions`
        ];
      }
    }

    const citations = [
      report ? report.citation : dataset ? dataset.citation : `POLARIS Polar Science Archive: ${titleBase}`,
      `Verified via POLARIS Knowledge Repository (ID: ${sourceId})`
    ];

    const newItem: WorkflowItem = {
      id: 'wf-' + Math.random().toString(36).substring(2, 8),
      title: generatedHeadline,
      contentType,
      audience,
      language,
      sourceReportId: sourceId,
      sourceReportTitle: titleBase,
      status: 'Generated',
      author: authorName,
      authorRole: 'Field Investigator & Science Contributor',
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      summary: generatedSummary,
      content: generatedContent,
      keyFacts: generatedKeyFacts,
      citations,
      reviewComments: []
    };

    persistItems([newItem, ...items]);
    return newItem;
  };

  return (
    <WorkflowContext.Provider
      value={{
        items,
        getItemById,
        addItem,
        updateStatus,
        addComment,
        deleteItem,
        generateFromSource
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
}
