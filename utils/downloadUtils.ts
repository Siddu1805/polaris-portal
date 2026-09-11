import { jsPDF } from 'jspdf';
import { Expedition, ReportItem, DatasetItem, MediaItem } from '@/data/polaris-data';

/**
 * Universally triggers a file download in desktop and mobile browsers
 * using a memory Blob and an anchor element.
 */
export function triggerBlobDownload(blobOrContent: Blob | string, filename: string, mimeType: string = 'application/octet-stream') {
  if (typeof window === 'undefined') return;

  const blob = typeof blobOrContent === 'string'
    ? new Blob([blobOrContent], { type: mimeType })
    : blobOrContent;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();

  // Cleanup after a short delay to support mobile Safari/WebKit
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 2500);
}

/**
 * Generates and downloads a publication-quality scientific expedition dossier
 * in proper PDF format using jsPDF.
 *
 * Requirements:
 * - Filename format: expedition-name-report.pdf
 * - Clear headings, margins, readable fonts, and auto page breaks
 * - Comprehensive mission summary, objectives, milestones, personnel, and associated reports
 */
export function downloadExpeditionReport(expedition: Expedition, associatedReports: ReportItem[] = []): string {
  // Format filename strictly as expedition-name-report.pdf
  const slug = expedition.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const filename = `${slug}-report.pdf`;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const marginLeft = 16;
  const marginTop = 18;
  const marginBottom = 18;
  const contentWidth = 178; // 210 - 16*2

  let y = marginTop;

  function checkPageBreak(neededHeight: number): boolean {
    if (y + neededHeight > 297 - marginBottom) {
      doc.addPage();
      y = marginTop + 4;
      // Header band on continuation pages
      doc.setFillColor(14, 165, 233);
      doc.rect(marginLeft, 8, contentWidth, 1.2, 'F');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(148, 163, 184);
      doc.text('POLARIS Polar Science Portal — Official Mission Dossier', marginLeft, 13);
      return true;
    }
    return false;
  }

  // =========================================================================
  // 1. COVER HEADER BANNER
  // =========================================================================
  doc.setFillColor(10, 25, 47); // Navy-950
  doc.roundedRect(marginLeft, y, contentWidth, 40, 2.5, 2.5, 'F');

  // Classification Tag
  doc.setTextColor(56, 189, 248); // Sky-400
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('POLARIS HIGH-LATITUDE SCIENCE REPOSITORY  •  PUBLIC OPEN ARCHIVE', marginLeft + 6, y + 8);

  // Expedition Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  const fullTitle = `${expedition.code} — ${expedition.name}`;
  const titleLines = doc.splitTextToSize(fullTitle, contentWidth - 12);
  doc.text(titleLines, marginLeft + 6, y + 17);

  // Subtitle Metadata Line
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text(
    `Region: ${expedition.region}  |  Operational Window: ${expedition.duration}  |  Status: ${expedition.status}`,
    marginLeft + 6,
    y + 34
  );

  y += 46;

  // =========================================================================
  // 2. EXPEDITION METADATA CARD
  // =========================================================================
  doc.setFillColor(248, 250, 252); // Slate-50
  doc.setDrawColor(226, 232, 240); // Slate-200
  doc.roundedRect(marginLeft, y, contentWidth, 42, 2, 2, 'FD');

  const metaItems = [
    { label: 'Chief Scientist / Lead:', value: expedition.leadResearcher },
    { label: 'Platform / Operational Base:', value: expedition.vesselOrBase },
    { label: 'Field Personnel:', value: `${expedition.scientistsCount} Scientists & Operational Technicians` },
    { label: 'Expedition Year:', value: `${expedition.year} (${expedition.duration})` },
    { label: 'Participating Bodies:', value: expedition.participatingInstitutions.join(', ') },
    { label: 'Core Research Domains:', value: expedition.researchDomains.join(', ') },
  ];

  let metaY = y + 6;
  doc.setFontSize(8.5);
  metaItems.forEach((item) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 85, 105);
    doc.text(item.label, marginLeft + 4, metaY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    const valueLines = doc.splitTextToSize(item.value, contentWidth - 62);
    doc.text(valueLines, marginLeft + 58, metaY);

    metaY += Math.max(6, valueLines.length * 4);
  });

  y += 48;

  // =========================================================================
  // 3. MISSION OVERVIEW & DESCRIPTION
  // =========================================================================
  checkPageBreak(30);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('1. MISSION OVERVIEW & DESCRIPTION', marginLeft, y);
  y += 2;
  doc.setDrawColor(14, 165, 233);
  doc.setLineWidth(0.6);
  doc.line(marginLeft, y, marginLeft + contentWidth, y);
  y += 5;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const summaryLines = doc.splitTextToSize(expedition.summary, contentWidth);
  doc.text(summaryLines, marginLeft, y);
  y += summaryLines.length * 4.5 + 6;

  // =========================================================================
  // 4. PRIMARY SCIENTIFIC OBJECTIVES
  // =========================================================================
  checkPageBreak(35);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('2. PRIMARY SCIENTIFIC OBJECTIVES', marginLeft, y);
  y += 2;
  doc.setDrawColor(14, 165, 233);
  doc.line(marginLeft, y, marginLeft + contentWidth, y);
  y += 5;

  expedition.objectives.forEach((obj, idx) => {
    const lines = doc.splitTextToSize(obj, contentWidth - 10);
    checkPageBreak(lines.length * 4.5 + 3);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(14, 165, 233);
    doc.text(`[${idx + 1}]`, marginLeft, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(lines, marginLeft + 8, y);
    y += lines.length * 4.5 + 2.5;
  });
  y += 4;

  // =========================================================================
  // 5. VOYAGE HIGHLIGHTS & FIELD MILESTONES
  // =========================================================================
  checkPageBreak(35);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('3. VOYAGE HIGHLIGHTS & FIELD MILESTONES', marginLeft, y);
  y += 2;
  doc.setDrawColor(14, 165, 233);
  doc.line(marginLeft, y, marginLeft + contentWidth, y);
  y += 5;

  expedition.highlights.forEach((hl, idx) => {
    const lines = doc.splitTextToSize(hl, contentWidth - 10);
    checkPageBreak(lines.length * 4.5 + 3);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(16, 185, 129); // Emerald
    doc.text('✦', marginLeft, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(lines, marginLeft + 8, y);
    y += lines.length * 4.5 + 2.5;
  });
  y += 4;

  // =========================================================================
  // 6. ASSOCIATED SCIENTIFIC REPORTS & KEY FINDINGS
  // =========================================================================
  if (associatedReports.length > 0) {
    checkPageBreak(40);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`4. ASSOCIATED SCIENTIFIC REPORTS & KEY FINDINGS (${associatedReports.length})`, marginLeft, y);
    y += 2;
    doc.setDrawColor(14, 165, 233);
    doc.line(marginLeft, y, marginLeft + contentWidth, y);
    y += 6;

    associatedReports.forEach((rep, rIdx) => {
      checkPageBreak(45);

      // Report Header Box
      doc.setFillColor(241, 245, 249); // Slate-100
      doc.roundedRect(marginLeft, y, contentWidth, 14, 1.5, 1.5, 'F');

      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(14, 165, 233);
      doc.text(`${rep.code} — ${rep.title}`, marginLeft + 4, y + 5.5, { maxWidth: contentWidth - 8 });

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text(`Author: ${rep.author} (${rep.institution})  |  Category: ${rep.category}  |  DOI: https://doi.org/${rep.doi}`, marginLeft + 4, y + 10.5);

      y += 17;

      // Abstract
      checkPageBreak(25);
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(71, 85, 105);
      doc.text('Abstract:', marginLeft + 4, y);
      y += 4;

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      const absLines = doc.splitTextToSize(rep.abstract, contentWidth - 8);
      doc.text(absLines, marginLeft + 4, y);
      y += absLines.length * 4 + 4;

      // Key Findings
      if (rep.keyFindings && rep.keyFindings.length > 0) {
        checkPageBreak(30);
        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(71, 85, 105);
        doc.text('Key Scientific Findings:', marginLeft + 4, y);
        y += 4;

        rep.keyFindings.forEach((kf, kIdx) => {
          const kfLines = doc.splitTextToSize(kf, contentWidth - 14);
          checkPageBreak(kfLines.length * 4 + 3);

          doc.setFont('helvetica', 'bold');
          doc.setTextColor(14, 165, 233);
          doc.text(`(${kIdx + 1})`, marginLeft + 4, y);

          doc.setFont('helvetica', 'normal');
          doc.setTextColor(51, 65, 85);
          doc.text(kfLines, marginLeft + 12, y);
          y += kfLines.length * 4 + 2;
        });
      }

      // Official Citation
      checkPageBreak(15);
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 116, 139);
      const citeLines = doc.splitTextToSize(`Citation: ${rep.citation}`, contentWidth - 8);
      doc.text(citeLines, marginLeft + 4, y);
      y += citeLines.length * 3.5 + 6;
    });
  }

  // =========================================================================
  // 7. CITATION & ARCHIVE REPRODUCIBILITY
  // =========================================================================
  checkPageBreak(25);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('5. OFFICIAL ARCHIVE CITATION', marginLeft, y);
  y += 2;
  doc.setDrawColor(14, 165, 233);
  doc.line(marginLeft, y, marginLeft + contentWidth, y);
  y += 5;

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  const citationText = `${expedition.leadResearcher} et al. (${expedition.year}). Official Mission Record and Scientific Findings of the ${expedition.name} (${expedition.code}). POLARIS Polar Science Knowledge & Outreach Repository. Document ID: POL-EXP-${expedition.year}-${expedition.code.replace(/[^a-zA-Z0-9]/g, '')}.`;
  const citationLines = doc.splitTextToSize(citationText, contentWidth);
  doc.text(citationLines, marginLeft, y);

  // =========================================================================
  // 8. RUNNING FOOTER WITH PAGE NUMBERS ON ALL PAGES
  // =========================================================================
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text('POLARIS Polar Science Portal — Verified Open-Access Scientific Dossier', marginLeft, 289);
    doc.text(`Page ${p} of ${totalPages}`, marginLeft + contentWidth, 289, { align: 'right' });
  }

  // Trigger download directly in the browser
  if (typeof window !== 'undefined') {
    const pdfBlob = doc.output('blob');
    triggerBlobDownload(pdfBlob, filename, 'application/pdf');
  }

  return filename;
}

/**
 * Generates and downloads an individual scientific monograph / report in PDF format
 */
export function downloadReportItem(report: ReportItem): string {
  const cleanCode = report.code.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const filename = `${cleanCode}-report.pdf`;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const marginLeft = 16;
  const marginTop = 18;
  const marginBottom = 18;
  const contentWidth = 178;

  let y = marginTop;

  function checkPageBreak(neededHeight: number): boolean {
    if (y + neededHeight > 297 - marginBottom) {
      doc.addPage();
      y = marginTop + 4;
      doc.setFillColor(14, 165, 233);
      doc.rect(marginLeft, 8, contentWidth, 1.2, 'F');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(148, 163, 184);
      doc.text('POLARIS Polar Science Knowledge Repository — Scientific Monograph', marginLeft, 13);
      return true;
    }
    return false;
  }

  // Cover Header
  doc.setFillColor(10, 25, 47);
  doc.roundedRect(marginLeft, y, contentWidth, 38, 2.5, 2.5, 'F');

  doc.setTextColor(56, 189, 248);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text(`POLARIS MONOGRAPH SERIES  •  ${report.category.toUpperCase()}`, marginLeft + 6, y + 8);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  const titleLines = doc.splitTextToSize(report.title, contentWidth - 12);
  doc.text(titleLines, marginLeft + 6, y + 17);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text(
    `Code: ${report.code}  |  Domain: ${report.researchDomain}  |  Region: ${report.region}  |  Year: ${report.year}`,
    marginLeft + 6,
    y + 32
  );

  y += 44;

  // Metadata Card
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(marginLeft, y, contentWidth, 34, 2, 2, 'FD');

  const metaItems = [
    { label: 'Lead Author:', value: `${report.author} (${report.institution})` },
    { label: 'Co-Authors:', value: report.coAuthors.join(', ') },
    { label: 'Associated Expedition:', value: `${report.expeditionName} (${report.expeditionId})` },
    { label: 'Verified DOI:', value: `https://doi.org/${report.doi}` },
    { label: 'Keywords:', value: report.keywords.join('; ') },
  ];

  let metaY = y + 6;
  doc.setFontSize(8.5);
  metaItems.forEach((item) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 85, 105);
    doc.text(item.label, marginLeft + 4, metaY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    const valueLines = doc.splitTextToSize(item.value, contentWidth - 52);
    doc.text(valueLines, marginLeft + 48, metaY);

    metaY += Math.max(5.5, valueLines.length * 4);
  });

  y += 40;

  // Abstract
  checkPageBreak(30);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('ABSTRACT', marginLeft, y);
  y += 2;
  doc.setDrawColor(14, 165, 233);
  doc.setLineWidth(0.6);
  doc.line(marginLeft, y, marginLeft + contentWidth, y);
  y += 5;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const abstractLines = doc.splitTextToSize(report.abstract, contentWidth);
  doc.text(abstractLines, marginLeft, y);
  y += abstractLines.length * 4.5 + 6;

  // Executive Summary
  checkPageBreak(35);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('EXECUTIVE SUMMARY', marginLeft, y);
  y += 2;
  doc.setDrawColor(14, 165, 233);
  doc.line(marginLeft, y, marginLeft + contentWidth, y);
  y += 5;

  const execLines = doc.splitTextToSize(report.executiveSummary, contentWidth);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text(execLines, marginLeft, y);
  y += execLines.length * 4.5 + 6;

  // Key Findings
  checkPageBreak(35);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('KEY SCIENTIFIC FINDINGS', marginLeft, y);
  y += 2;
  doc.setDrawColor(14, 165, 233);
  doc.line(marginLeft, y, marginLeft + contentWidth, y);
  y += 5;

  report.keyFindings.forEach((kf, idx) => {
    const lines = doc.splitTextToSize(kf, contentWidth - 10);
    checkPageBreak(lines.length * 4.5 + 3);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(14, 165, 233);
    doc.text(`[${idx + 1}]`, marginLeft, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(lines, marginLeft + 8, y);
    y += lines.length * 4.5 + 2.5;
  });
  y += 4;

  // Official Citation
  checkPageBreak(25);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('OFFICIAL CITATION', marginLeft, y);
  y += 2;
  doc.setDrawColor(14, 165, 233);
  doc.line(marginLeft, y, marginLeft + contentWidth, y);
  y += 5;

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  const citeLines = doc.splitTextToSize(report.citation, contentWidth);
  doc.text(citeLines, marginLeft, y);

  // Page Numbers Footer
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text('POLARIS Polar Science Knowledge Repository — Open-Access Monograph', marginLeft, 289);
    doc.text(`Page ${p} of ${totalPages}`, marginLeft + contentWidth, 289, { align: 'right' });
  }

  if (typeof window !== 'undefined') {
    const pdfBlob = doc.output('blob');
    triggerBlobDownload(pdfBlob, filename, 'application/pdf');
  }

  return filename;
}

/**
 * Generates and downloads a structured dataset package with CSV observations and metadata
 */
export function downloadDatasetPackage(dataset: DatasetItem): string {
  const cleanTitle = dataset.title
    .replace(/[^a-zA-Z0-9\s_-]/g, '')
    .trim()
    .slice(0, 30)
    .replace(/\s+/g, '_');
  const filename = `${dataset.code}_${cleanTitle}_DataPackage.csv`;

  // Build CSV metadata headers
  const metaRows = [
    `# POLARIS OPEN DATA ARCHIVE PACKAGE`,
    `# Dataset Code: ${dataset.code}`,
    `# Title: ${dataset.title}`,
    `# Domain: ${dataset.domain}`,
    `# Region: ${dataset.region}`,
    `# Year: ${dataset.year}`,
    `# Primary Parameter: ${dataset.parameterName} (${dataset.unit})`,
    dataset.secondaryParameterName ? `# Secondary Parameter: ${dataset.secondaryParameterName}` : '',
    `# Lead Investigator: ${dataset.leadInvestigator} (${dataset.institution})`,
    `# Coordinates Bounding Box: ${dataset.coordinatesBbox}`,
    `# Temporal Coverage: ${dataset.temporalCoverage}`,
    `# Citation: ${dataset.citation}`,
    `# Format Specification: ${dataset.format}`,
    `# Total Sample Records: ${dataset.sampleData.length}`,
    `# -----------------------------------------------------------`
  ].filter(Boolean);

  // Column headers
  const columns = ['timestamp', dataset.parameterName.replace(/\s+/g, '_')];
  if (dataset.secondaryParameterName) {
    columns.push(dataset.secondaryParameterName.replace(/\s+/g, '_'));
  }
  columns.push('depth_or_altitude_m');

  const dataRows = dataset.sampleData.map((row) => {
    const r = [row.timestamp, row.value];
    if (dataset.secondaryParameterName) {
      r.push(row.secondaryValue !== undefined ? row.secondaryValue : 0);
    }
    r.push(row.depthOrAlt !== undefined ? row.depthOrAlt : 0);
    return r.join(',');
  });

  const csvContent = [...metaRows, columns.join(','), ...dataRows].join('\n');
  triggerBlobDownload(csvContent, filename, 'text/csv;charset=utf-8');
  return filename;
}

/**
 * Triggers high-resolution media asset download
 */
export async function downloadMediaAsset(media: MediaItem): Promise<string> {
  const cleanTitle = media.title
    .replace(/[^a-zA-Z0-9\s_-]/g, '')
    .trim()
    .slice(0, 30)
    .replace(/\s+/g, '_');
  const filename = `${media.id}_${cleanTitle}.jpg`;

  try {
    const res = await fetch(media.url);
    if (!res.ok) throw new Error('Fetch failed');
    const blob = await res.blob();
    triggerBlobDownload(blob, filename, 'image/jpeg');
    return filename;
  } catch {
    // Fallback if cross-origin fetch is prevented
    const a = document.createElement('a');
    a.href = media.url;
    a.target = '_blank';
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => document.body.removeChild(a), 2000);
    return filename;
  }
}
