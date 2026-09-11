import { 
  POLAR_EXPEDITIONS, POLAR_REPORTS, POLAR_STATIONS, 
  POLAR_DATASETS, Expedition, ReportItem 
} from '@/data/polaris-data';

export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  expeditions?: Expedition[];
  selectedExpedition?: Expedition;
  associatedReports?: ReportItem[];
  findings?: string[];
  showDownloadButton?: boolean;
  suggestedActions?: string[];
}

/**
 * Intelligent client-side assistant engine that analyzes natural language queries
 * against the POLARIS high-latitude expedition registry and knowledge repository.
 */
export async function processAssistantQuery(
  rawQuery: string, 
  history: AssistantMessage[] = []
): Promise<AssistantMessage> {
  // Artificial natural processing delay for polish
  await new Promise((resolve) => setTimeout(resolve, 400));

  const query = rawQuery.trim().toLowerCase();
  const id = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 1. GREETING / CAPABILITIES QUERY
  if (/^(hi|hello|hey|help|who are you|what can you do|about)/i.test(query)) {
    return {
      id,
      role: 'assistant',
      content: `Hello! I am your **Polaris Expedition Assistant**. I can help you explore 40+ years of high-latitude scientific campaigns, research expeditions, field findings, and verified mission reports across Antarctica, the Arctic, and the Southern Ocean.\n\nTry asking me about specific voyages, scientific topics like *sea ice* or *glaciology*, or ask for downloadable expedition reports!`,
      timestamp,
      suggestedActions: [
        'Tell me about 43rd Antarctic Expedition',
        'Show me Arctic expeditions',
        'Which expedition studied sea ice?',
        'Give me the report for 43-IAE',
        'What were the findings of SOE-12?',
        'Tell me about the MOSAiC expedition'
      ]
    };
  }

  // 2. OUT-OF-CATALOG QUERY: MOSAiC OR OTHER HISTORICAL / INTERNATIONAL DRIFT EXPEDITIONS
  if (query.includes('mosaic')) {
    const arcticExpeditions = POLAR_EXPEDITIONS.filter((e) => e.region === 'Arctic');
    return {
      id,
      role: 'assistant',
      content: `**MOSAiC** (*Multidisciplinary drifting Observatory for the Study of Arctic Climate*) was a landmark international Arctic ice-drift expedition (2019–2020) led by Germany's Alfred Wegener Institute aboard the icebreaker *RV Polarstern*.\n\nWhile international missions like MOSAiC are not directly indexed in this portal's national polar registry, POLARIS maintains our dedicated high-latitude **Arctic campaigns** operating from the **Himadri Station** and **IndARC Moored Observatory** in Ny-Ålesund, Svalbard:\n\n• **ARCTIC-24 (2024)**: Summer expedition studying rapid glacier retreat and oceanic influx in Kongsfjorden.\n• **ARCTIC-23 (2023)**: Winter precursor campaign tracking atmospheric black carbon transport.\n\nWould you like to review findings or download reports from our Arctic expeditions?`,
      timestamp,
      expeditions: arcticExpeditions,
      suggestedActions: [
        'Tell me about ARCTIC-24',
        'Give me the report for ARCTIC-24',
        'Tell me about ARCTIC-23',
        'Show me Arctic expeditions'
      ]
    };
  }

  // 3. REPORT DOWNLOAD / FINDINGS EXPLICIT INQUIRY
  const isAskingForReport = /report|download|pdf|dossier|paper|monograph/i.test(query);
  const isAskingForFindings = /findings?|results?|discover(y|ies)|achieve(ment|ments)|highlights?/i.test(query);

  // Check if query targets a specific expedition code or name
  let targetedExpedition: Expedition | undefined = POLAR_EXPEDITIONS.find((exp) => {
    const codeMatch = query.includes(exp.code.toLowerCase().replace('-', ' ')) || query.includes(exp.code.toLowerCase());
    const nameMatch = query.includes(exp.name.toLowerCase());
    const idMatch = query.includes(exp.id.toLowerCase());
    return codeMatch || nameMatch || idMatch;
  });

  // Check common colloquial references
  if (!targetedExpedition) {
    if (query.includes('43') || query.includes('forty third') || query.includes('forty-third')) {
      targetedExpedition = POLAR_EXPEDITIONS.find((e) => e.code === '43-IAE');
    } else if (query.includes('42') || query.includes('forty second') || query.includes('forty-second')) {
      targetedExpedition = POLAR_EXPEDITIONS.find((e) => e.code === '42-IAE');
    } else if (query.includes('41') || query.includes('forty first') || query.includes('forty-first')) {
      targetedExpedition = POLAR_EXPEDITIONS.find((e) => e.code === '41-IAE');
    } else if (query.includes('soe') || query.includes('southern ocean')) {
      targetedExpedition = POLAR_EXPEDITIONS.find((e) => e.code === 'SOE-12');
    } else if (query.includes('arctic 24') || query.includes('arctic summer') || query.includes('arctic 2024')) {
      targetedExpedition = POLAR_EXPEDITIONS.find((e) => e.code === 'ARCTIC-24');
    } else if (query.includes('arctic 23') || query.includes('arctic winter') || query.includes('arctic 2023')) {
      targetedExpedition = POLAR_EXPEDITIONS.find((e) => e.code === 'ARCTIC-23');
    }
  }

  // 4. IF DIRECT EXPEDITION FOUND
  if (targetedExpedition) {
    const reports = POLAR_REPORTS.filter((r) => r.expeditionId === targetedExpedition?.id);
    const keyFindings = reports.flatMap((r) => r.keyFindings);

    if (isAskingForReport) {
      return {
        id,
        role: 'assistant',
        content: `Here is the official scientific documentation for **${targetedExpedition.name} (${targetedExpedition.code})**.\n\n` +
          `• **Region**: ${targetedExpedition.region} | **Year**: ${targetedExpedition.year}\n` +
          `• **Lead Scientist**: ${targetedExpedition.leadResearcher}\n` +
          `• **Platform**: ${targetedExpedition.vesselOrBase}\n` +
          `• **Indexed Reports**: ${reports.length} Peer-reviewed Monographs\n\n` +
          `You can download the complete **Scientific Expedition Dossier** below, which includes all executive summaries, radar survey metrics, and verified DOI citations:`,
        timestamp,
        selectedExpedition: targetedExpedition,
        associatedReports: reports,
        findings: keyFindings.slice(0, 4),
        showDownloadButton: true,
        suggestedActions: [
          `What were the findings of ${targetedExpedition.code}?`,
          `Tell me about ${targetedExpedition.code}`,
          'Show me Arctic expeditions',
          'Which expedition studied sea ice?'
        ]
      };
    }

    if (isAskingForFindings) {
      return {
        id,
        role: 'assistant',
        content: `### Key Scientific Findings of ${targetedExpedition.code}\n` +
          `**Expedition**: ${targetedExpedition.name}\n` +
          `**Chief Scientist**: ${targetedExpedition.leadResearcher} (${targetedExpedition.vesselOrBase})\n\n` +
          `The campaign produced the following peer-reviewed field discoveries:\n\n` +
          (keyFindings.length > 0 
            ? keyFindings.map((f, i) => `✦ **${i + 1}.** ${f}`).join('\n\n')
            : targetedExpedition.highlights.map((h, i) => `✦ **${i + 1}.** ${h}`).join('\n\n')) +
          `\n\nYou can download the full scientific report below:`,
        timestamp,
        selectedExpedition: targetedExpedition,
        associatedReports: reports,
        findings: keyFindings,
        showDownloadButton: true,
        suggestedActions: [
          `Give me the report for ${targetedExpedition.code}`,
          `Show research domains for ${targetedExpedition.code}`,
          'Show me Arctic expeditions',
          'Which expedition studied sea ice?'
        ]
      };
    }

    // General query about this expedition
    return {
      id,
      role: 'assistant',
      content: `### ${targetedExpedition.code} — ${targetedExpedition.name}\n\n` +
        `**Region & Operational Window**: ${targetedExpedition.region} (${targetedExpedition.year}) • ${targetedExpedition.duration}\n` +
        `**Lead Scientist**: ${targetedExpedition.leadResearcher} • **Team Size**: ${targetedExpedition.scientistsCount} Researchers\n` +
        `**Operational Base/Vessel**: ${targetedExpedition.vesselOrBase}\n` +
        `**Mission Status**: ${targetedExpedition.status}\n\n` +
        `**Summary**:\n${targetedExpedition.summary}\n\n` +
        `**Primary Scientific Objectives**:\n` +
        targetedExpedition.objectives.map((o) => `• ${o}`).join('\n') + `\n\n` +
        `**Research Domains**: ${targetedExpedition.researchDomains.join(', ')}\n` +
        `**Report Availability**: ${reports.length} peer-reviewed scientific report(s) indexed.`,
      timestamp,
      selectedExpedition: targetedExpedition,
      associatedReports: reports,
      findings: keyFindings.slice(0, 3),
      showDownloadButton: true,
      suggestedActions: [
        `Give me the report for ${targetedExpedition.code}`,
        `What were the findings of ${targetedExpedition.code}?`,
        'Show me Arctic expeditions',
        'Which expedition studied sea ice?'
      ]
    };
  }

  // 5. REGION QUERIES (e.g. "Show me Arctic expeditions", "Antarctic voyages")
  if (query.includes('arctic')) {
    const matches = POLAR_EXPEDITIONS.filter((e) => e.region === 'Arctic');
    return {
      id,
      role: 'assistant',
      content: `We have **${matches.length} major scientific expeditions** cataloged for the **Arctic** region operating from Ny-Ålesund, Svalbard:\n\n` +
        matches.map((m) => `• **${m.code}**: ${m.name} (${m.year}) — Lead: ${m.leadResearcher}`).join('\n') +
        `\n\nSelect an expedition below to inspect research objectives, key findings, or download the scientific report:`,
      timestamp,
      expeditions: matches,
      suggestedActions: [
        'Tell me about ARCTIC-24',
        'Give me the report for ARCTIC-24',
        'Tell me about ARCTIC-23',
        'Which expedition studied sea ice?'
      ]
    };
  }

  if (query.includes('antarctic') || query.includes('antarctica')) {
    const matches = POLAR_EXPEDITIONS.filter((e) => e.region === 'Antarctica');
    return {
      id,
      role: 'assistant',
      content: `POLARIS indexes **${matches.length} landmark scientific expeditions** to **Antarctica** operating across Bharati and Maitri stations:\n\n` +
        matches.map((m) => `• **${m.code}**: ${m.name} (${m.year}) — Lead: ${m.leadResearcher}`).join('\n') +
        `\n\nSelect an expedition below for deep mission overviews, objectives, and report downloads:`,
      timestamp,
      expeditions: matches,
      suggestedActions: [
        'Tell me about 43-IAE',
        'Tell me about 42-IAE',
        'Tell me about 41-IAE',
        'Which expedition studied sea ice?'
      ]
    };
  }

  if (query.includes('southern ocean') || query.includes('soe')) {
    const matches = POLAR_EXPEDITIONS.filter((e) => e.region === 'Southern Ocean');
    return {
      id,
      role: 'assistant',
      content: `We have cataloged **${matches.length} dedicated Southern Ocean Expedition(s)** investigating high-latitude oceanographic dynamics and carbon sinks:\n\n` +
        matches.map((m) => `• **${m.code}**: ${m.name} (${m.year}) — Lead: ${m.leadResearcher} (${m.vesselOrBase})`).join('\n') +
        `\n\nSelect below to inspect hydrographic transect findings or download the official mission report:`,
      timestamp,
      expeditions: matches,
      suggestedActions: [
        'Tell me about SOE-12',
        'What were the findings of SOE-12?',
        'Give me the report for SOE-12',
        'Show me Arctic expeditions'
      ]
    };
  }

  // 6. TOPIC / RESEARCH OBJECTIVE QUERIES
  // e.g. "Which expedition studied sea ice?", "ice cores", "glaciology", "black carbon", "aerosols", "oceanography"
  const topicKeywords: { [key: string]: { topicName: string; keywords: string[] } } = {
    sea_ice: {
      topicName: 'Sea Ice & Fast Ice Dynamics',
      keywords: ['sea ice', 'fast ice', 'fast-ice', 'ice shelf', 'pack ice', 'algae', 'gpr', 'sympagic']
    },
    ice_cores: {
      topicName: 'Deep Ice Core Drilling & Firn Stratigraphy',
      keywords: ['ice core', 'ice cores', 'drilling', 'firn', 'sastrugi', 'glaciology', 'mass balance']
    },
    black_carbon: {
      topicName: 'Black Carbon, Aerosols & Atmospheric Chemistry',
      keywords: ['black carbon', 'aerosol', 'aerosols', 'albedo', 'haze', 'atmosphere', 'pollutant', 'optical']
    },
    oceanography: {
      topicName: 'Ocean Currents, CTD Casts & Thermohaline Flow',
      keywords: ['oceanography', 'ocean', 'currents', 'ctd', 'adcp', 'salinity', 'temperature', 'mooring', 'indarc', 'krill']
    },
    microbiology: {
      topicName: 'Cryophilic Extremophiles & Microbial Genomics',
      keywords: ['microbiol', 'bacteria', 'extremophile', 'genome', 'enzyme', 'benthic', 'lake']
    }
  };

  let matchedTopicKey: string | null = null;
  for (const [key, val] of Object.entries(topicKeywords)) {
    if (val.keywords.some((kw) => query.includes(kw))) {
      matchedTopicKey = key;
      break;
    }
  }

  if (matchedTopicKey) {
    const topicInfo = topicKeywords[matchedTopicKey];
    // Score expeditions based on domain, summary, objectives, and report abstracts
    const scoredExpeditions = POLAR_EXPEDITIONS.map((exp) => {
      let score = 0;
      const relatedReports = POLAR_REPORTS.filter((r) => r.expeditionId === exp.id);
      const textToSearch = [
        exp.name,
        exp.summary,
        ...exp.objectives,
        ...exp.highlights,
        ...exp.researchDomains,
        ...relatedReports.map((r) => r.abstract + ' ' + r.keyFindings.join(' ') + ' ' + r.keywords.join(' '))
      ].join(' ').toLowerCase();

      topicInfo.keywords.forEach((kw) => {
        const occurrences = (textToSearch.match(new RegExp(kw, 'g')) || []).length;
        score += occurrences;
      });

      return { exp, score, reports: relatedReports };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

    if (scoredExpeditions.length > 0) {
      const topMatch = scoredExpeditions[0];
      const otherMatches = scoredExpeditions.slice(1, 3).map((m) => m.exp);

      let contextExplanation = '';
      if (matchedTopicKey === 'sea_ice') {
        contextExplanation = `**${topMatch.exp.code} (${topMatch.exp.name})** was the primary expedition investigating **fast-ice thickness and sea-ice ecosystems** in Prydz Bay. Under Dr. Anandita Chatterjee, researchers deployed Ground Penetrating Radar (GPR) across fast-ice sheets and characterized sympagic diatom colonies.`;
      } else if (matchedTopicKey === 'ice_cores') {
        contextExplanation = `**${topMatch.exp.code} (${topMatch.exp.name})** led deep ice-core extraction operations across Central Dronning Maud Land, drilling 120-meter firn cores to reconstruct 2,000 years of paleoclimatic temperature variability.`;
      } else if (matchedTopicKey === 'black_carbon') {
        contextExplanation = `**${topMatch.exp.code} (${topMatch.exp.name})** spearheaded atmospheric black carbon and optical absorption surveys at Himadri Station in Ny-Ålesund, documenting long-range Eurasian pollutant transport.`;
      } else {
        contextExplanation = `**${topMatch.exp.code} (${topMatch.exp.name})** focused heavily on **${topicInfo.topicName}**, deploying multi-sensor oceanographic moorings and conducting high-latitude surveys.`;
      }

      return {
        id,
        role: 'assistant',
        content: `### Research on ${topicInfo.topicName}\n\n${contextExplanation}\n\n` +
          `**Lead Researcher**: ${topMatch.exp.leadResearcher}\n` +
          `**Key Objectives**:\n` + topMatch.exp.objectives.slice(0, 3).map(o => `• ${o}`).join('\n') + `\n\n` +
          (otherMatches.length > 0 
            ? `Other related campaigns studying this topic: **${otherMatches.map(e => e.code).join(', ')}**.\n\n` 
            : '') +
          `You can download the verified scientific report below:`,
        timestamp,
        selectedExpedition: topMatch.exp,
        expeditions: scoredExpeditions.map((s) => s.exp),
        associatedReports: topMatch.reports,
        findings: topMatch.reports.flatMap((r) => r.keyFindings).slice(0, 4),
        showDownloadButton: true,
        suggestedActions: [
          `Give me the report for ${topMatch.exp.code}`,
          `What were the findings of ${topMatch.exp.code}?`,
          'Show me Arctic expeditions',
          'Tell me about 43-IAE'
        ]
      };
    }
  }

  // 7. RESEARCHER LOOKUP
  const matchedResearcher = POLAR_EXPEDITIONS.find((e) =>
    query.includes(e.leadResearcher.toLowerCase().replace('dr. ', '')) ||
    query.includes(e.leadResearcher.toLowerCase())
  );

  if (matchedResearcher) {
    const reports = POLAR_REPORTS.filter((r) => r.expeditionId === matchedResearcher.id);
    return {
      id,
      role: 'assistant',
      content: `**${matchedResearcher.leadResearcher}** served as Chief Scientist on the **${matchedResearcher.name} (${matchedResearcher.code})** in ${matchedResearcher.region} (${matchedResearcher.year}).\n\n` +
        `**Operational Focus**: ${matchedResearcher.summary}\n\n` +
        `**Key Milestones**:\n` + matchedResearcher.highlights.map(h => `• ${h}`).join('\n'),
      timestamp,
      selectedExpedition: matchedResearcher,
      associatedReports: reports,
      showDownloadButton: true,
      suggestedActions: [
        `Give me the report for ${matchedResearcher.code}`,
        `What were the findings of ${matchedResearcher.code}?`,
        'Show me Arctic expeditions',
        'Which expedition studied sea ice?'
      ]
    };
  }

  // 8. FALLBACK FUZZY MATCH ACROSS ALL FIELDS
  const terms = query.split(/\s+/).filter((t) => t.length > 2);
  const generalMatches = POLAR_EXPEDITIONS.filter((exp) => {
    const fullText = (
      exp.name + ' ' + 
      exp.code + ' ' + 
      exp.region + ' ' + 
      exp.summary + ' ' + 
      exp.objectives.join(' ') + ' ' + 
      exp.researchDomains.join(' ')
    ).toLowerCase();
    return terms.some((term) => fullText.includes(term));
  });

  if (generalMatches.length === 1) {
    const exp = generalMatches[0];
    const reports = POLAR_REPORTS.filter((r) => r.expeditionId === exp.id);
    return {
      id,
      role: 'assistant',
      content: `I matched your query to **${exp.name} (${exp.code})** in ${exp.region}.\n\n` +
        `• **Year**: ${exp.year} | **Duration**: ${exp.duration}\n` +
        `• **Chief Scientist**: ${exp.leadResearcher}\n` +
        `• **Mission Overview**: ${exp.summary}\n\n` +
        `Would you like to examine its scientific findings or download the official expedition report?`,
      timestamp,
      selectedExpedition: exp,
      associatedReports: reports,
      showDownloadButton: true,
      suggestedActions: [
        `Give me the report for ${exp.code}`,
        `What were the findings of ${exp.code}?`,
        'Show me Arctic expeditions',
        'Which expedition studied sea ice?'
      ]
    };
  }

  if (generalMatches.length > 1) {
    return {
      id,
      role: 'assistant',
      content: `I found **${generalMatches.length} matching scientific expeditions** based on your inquiry:\n\n` +
        generalMatches.map((m) => `• **${m.code}**: ${m.name} (${m.region}, ${m.year})`).join('\n') +
        `\n\nClick any expedition below to view detailed objectives, findings, and download reports:`,
      timestamp,
      expeditions: generalMatches,
      suggestedActions: generalMatches.slice(0, 3).map((m) => `Tell me about ${m.code}`)
    };
  }

  // 9. NO MATCH FALLBACK
  return {
    id,
    role: 'assistant',
    content: `I couldn't find a direct record matching "${rawQuery}" in our indexed expedition registry.\n\n` +
      `Our database contains detailed records, datasets, and peer-reviewed monographs for **Antarctic**, **Arctic**, and **Southern Ocean** campaigns.\n\n` +
      `Here are some popular topics and expeditions you can explore:`,
    timestamp,
    expeditions: POLAR_EXPEDITIONS.slice(0, 3),
    suggestedActions: [
      'Tell me about 43rd Antarctic Expedition',
      'Show me Arctic expeditions',
      'Which expedition studied sea ice?',
      'Give me the report for 43-IAE',
      'What were the findings of SOE-12?',
      'Tell me about the MOSAiC expedition'
    ]
  };
}
