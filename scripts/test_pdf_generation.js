const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

function generateTestPdf() {
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

  function checkPageBreak(neededHeight) {
    if (y + neededHeight > 297 - marginBottom) {
      doc.addPage();
      y = marginTop + 4;
      // Header bar on continuation pages
      doc.setFillColor(14, 165, 233);
      doc.rect(marginLeft, 10, contentWidth, 1.2, 'F');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(148, 163, 184);
      doc.text('POLARIS Polar Science Portal — Official Mission Dossier', marginLeft, 15);
      return true;
    }
    return false;
  }

  // Cover banner on first page
  doc.setFillColor(10, 25, 47);
  doc.roundedRect(marginLeft, y, contentWidth, 38, 2.5, 2.5, 'F');

  doc.setTextColor(56, 189, 248);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('POLARIS HIGH-LATITUDE SCIENCE REPOSITORY', marginLeft + 6, y + 8);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  const titleLines = doc.splitTextToSize('43-IAE : 43rd Indian Scientific Expedition to Antarctica', contentWidth - 12);
  doc.text(titleLines, marginLeft + 6, y + 16);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text('Region: Antarctica  |  Window: 114 Days (Nov 2023 - Mar 2024)  |  Status: Under Analysis', marginLeft + 6, y + 32);

  y += 44;

  // Metadata Card
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(marginLeft, y, contentWidth, 34, 2, 2, 'FD');

  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'bold');
  doc.text('Lead Scientist:', marginLeft + 4, y + 7);
  doc.setFont('helvetica', 'normal');
  doc.text('Dr. Vikramaditya Sen (NCPOR)', marginLeft + 35, y + 7);

  doc.setFont('helvetica', 'bold');
  doc.text('Platform / Base:', marginLeft + 4, y + 14);
  doc.setFont('helvetica', 'normal');
  doc.text('Chartered Ice-Class Vessel MV Vasiliy Golovnin', marginLeft + 35, y + 14);

  doc.setFont('helvetica', 'bold');
  doc.text('Team Size:', marginLeft + 4, y + 21);
  doc.setFont('helvetica', 'normal');
  doc.text('48 Field Researchers & Technicians', marginLeft + 35, y + 21);

  doc.setFont('helvetica', 'bold');
  doc.text('Research Focus:', marginLeft + 4, y + 28);
  doc.setFont('helvetica', 'normal');
  doc.text('Glaciology, Atmospheric Physics, Geodesy, Cryospheric Geobiology', marginLeft + 35, y + 28);

  y += 40;

  // Section 1: Overview
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('1. MISSION OVERVIEW & SUMMARY', marginLeft, y);
  y += 2;
  doc.setDrawColor(14, 165, 233);
  doc.setLineWidth(0.5);
  doc.line(marginLeft, y, marginLeft + contentWidth, y);
  y += 5;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const summary = 'Conducted comprehensive glaciological traverse across the Polar Ice Sheet, deployed automated weather buoys, drilled 120m ice cores near Dronning Maud Land, and replenished Bharati and Maitri research infrastructure. Operations traversed 1,800 km on snow cats through extreme sub-zero weather.';
  const summaryLines = doc.splitTextToSize(summary, contentWidth);
  doc.text(summaryLines, marginLeft, y);
  y += summaryLines.length * 4.5 + 6;

  // Section 2: Objectives
  checkPageBreak(30);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('2. PRIMARY SCIENTIFIC OBJECTIVES', marginLeft, y);
  y += 2;
  doc.setDrawColor(14, 165, 233);
  doc.line(marginLeft, y, marginLeft + contentWidth, y);
  y += 5;

  const objectives = [
    'Extract 120m deep ice cores for paleoclimate reconstruction spanning 2,000 years',
    'Deploy autonomous GPS receivers for continuous ice-sheet flow tracking',
    'Conduct aerosol and cloud condensation nuclei sampling over Princess Elizabeth Land',
    'Maintain year-round atmospheric and geomagnetic recording instruments'
  ];

  objectives.forEach((obj, idx) => {
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

  // Page Numbers Footer
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text('POLARIS Polar Science Knowledge & Outreach Portal — Verified Open-Access Dossier', marginLeft, 288);
    doc.text(`Page ${p} of ${totalPages}`, marginLeft + contentWidth, 288, { align: 'right' });
  }

  const outPath = path.join(__dirname, 'test_output.pdf');
  const buffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(outPath, buffer);
  console.log('Test PDF successfully created at', outPath, 'Size:', buffer.length, 'Pages:', totalPages);
}

generateTestPdf();
