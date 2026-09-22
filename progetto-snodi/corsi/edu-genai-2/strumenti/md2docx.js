const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, LevelFormat, AlignmentType, BorderStyle, ImageRun } = require('docx');

const src = fs.readFileSync(process.argv[2], 'utf8');
const lines = src.split('\n');

// inline parser: **bold**, *italic*
function runs(text, extra = {}) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(new TextRun({ text: text.slice(last, m.index), ...extra }));
    const tok = m[0];
    if (tok.startsWith('**')) out.push(new TextRun({ text: tok.slice(2, -2), bold: true, ...extra }));
    else out.push(new TextRun({ text: tok.slice(1, -1), italics: true, ...extra }));
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(new TextRun({ text: text.slice(last), ...extra }));
  return out.length ? out : [new TextRun({ text: '', ...extra })];
}

const children = [];
for (let raw of lines) {
  const line = raw.replace(/\r$/, '');
  const t = line.trim();
  if (t === '---') {
    children.push(new Paragraph({
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '999999' } },
      spacing: { before: 120, after: 240 },
    }));
  } else if (t.startsWith('### ')) {
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { before: 240, after: 120 }, children: runs(t.slice(4)) }));
  } else if (t.startsWith('## ')) {
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 320, after: 140 }, children: runs(t.slice(3)) }));
  } else if (t.startsWith('# ')) {
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 0, after: 200 }, children: runs(t.slice(2)) }));
  } else if (t.startsWith('- ')) {
    children.push(new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 80 }, children: runs(t.slice(2)) }));
  } else if (t === '') {
    // skip empty lines (spacing handled by paragraph spacing)
  } else {
    children.push(new Paragraph({ spacing: { after: 160 }, children: runs(t) }));
  }
}

// Sigillo FS in calce a ogni documento (marchio della formatrice)
const stampPath = path.join(__dirname, 'marchio-fs-small.png');
if (fs.existsSync(stampPath)) {
  children.push(new Paragraph({
    border: { top: { style: BorderStyle.SINGLE, size: 6, color: '999999' } },
    spacing: { before: 360 },
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200 },
    children: [new ImageRun({
      type: 'png',
      data: fs.readFileSync(stampPath),
      transformation: { width: 96, height: 96 },
    })],
  }));
}

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: 'Calibri', size: 22 } },
      heading1: { run: { font: 'Calibri', size: 32, bold: true, color: '1E2761' } },
      heading2: { run: { font: 'Calibri', size: 26, bold: true, color: '1E2761' } },
      heading3: { run: { font: 'Calibri', size: 23, bold: true, color: '444444' } },
    },
  },
  numbering: {
    config: [{
      reference: 'bullets',
      levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 200 } } } }],
    }],
  },
  sections: [{ properties: {}, children }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(process.argv[3], buf);
  console.log('written', process.argv[3], buf.length, 'bytes');
});
