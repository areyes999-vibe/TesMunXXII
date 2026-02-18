#!/usr/bin/env node
/**
 * extract-text.js — Extract page-annotated text from PDFs for RAG.
 *
 * Usage: node scripts/extract-text.js
 *
 * Reads each PDF listed in SOURCES, extracts text per page using pdfjs-dist,
 * and writes a JSON file alongside the PDF in assets/docs/.
 */

const fs = require('fs');
const path = require('path');

// pdfjs-dist for Node (legacy build)
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

const SOURCES = [
    { id: 'handbook', file: 'handbook.pdf', name: 'TESMUN XXII Handbook' },
    // Add more sources here:
    // { id: 'rules', file: 'rules.pdf', name: 'Rules of Procedure' },
];

const DOCS_DIR = path.resolve(__dirname, '..', 'assets', 'docs');

async function extractText(source) {
    const pdfPath = path.join(DOCS_DIR, source.file);
    console.log(`\n📄 Processing: ${source.name} (${source.file})`);

    if (!fs.existsSync(pdfPath)) {
        console.error(`   ❌ File not found: ${pdfPath}`);
        return null;
    }

    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const doc = await pdfjsLib.getDocument({ data }).promise;

    const pages = [];
    for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items
            .map(item => item.str)
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();
        pages.push({ page: i, text });
    }

    const output = {
        id: source.id,
        name: source.name,
        totalPages: doc.numPages,
        pages,
    };

    const outPath = path.join(DOCS_DIR, `${source.id}.json`);
    fs.writeFileSync(outPath, JSON.stringify(output, null, 2));

    const totalChars = pages.reduce((sum, p) => sum + p.text.length, 0);
    console.log(`   ✅ Extracted ${doc.numPages} pages (${totalChars.toLocaleString()} chars)`);
    console.log(`   📁 Written to: ${outPath}`);
    return output;
}

async function main() {
    console.log('🔍 TESMUN PDF Text Extractor');
    console.log('============================');

    for (const source of SOURCES) {
        await extractText(source);
    }

    console.log('\n✨ Done!');
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
