// TESMUN XXII — Application Logic (Router + Page Renderers)

let currentPage = 'about';
let currentLevel = 'bootcamp';
let currentCommittee = null;

// ── Router ──────────────────────────────────────────
function navigateTo(page, params) {
    currentPage = page;
    if (params?.level) currentLevel = params.level;
    if (params?.committee) currentCommittee = params.committee;
    window.location.hash = page;
    render();
}

function render() {
    const app = document.getElementById('app');
    // Update nav active states
    document.querySelectorAll('#nav-links .nav-item').forEach(a => {
        a.classList.toggle('active', a.dataset.page === currentPage);
    });
    const renderers = { about: renderAbout, handbook: renderHandbook, committees: renderCommittees, campus: renderCampus, schedule: renderSchedule, contact: renderContact };
    const fn = renderers[currentPage] || renderAbout;
    app.innerHTML = fn();
    app.querySelector('.page-enter')?.offsetHeight; // force reflow for animation
}

function toggleMobileMenu() {
    const m = document.getElementById('mobile-menu');
    const icon = document.getElementById('mobile-menu-icon');
    m.classList.toggle('hidden');
    icon.textContent = m.classList.contains('hidden') ? 'menu' : 'close';
}

// ── About Page ──────────────────────────────────────
function renderAbout() {
    const d = TESMUN_DATA.about;
    return `
    <div class="flex-1 overflow-y-auto custom-scrollbar page-enter">
        <!-- Hero -->
        <div class="relative bg-hero-pattern bg-cover bg-center min-h-[50vh] flex items-center justify-center text-center px-8">
            <div class="absolute inset-0 bg-gradient-to-b from-tesmun-blue/30 to-tesmun-blue"></div>
            <div class="relative z-10 max-w-4xl">
                <p class="text-accent font-display text-xs uppercase tracking-[0.4em] mb-4">Welcome to</p>
                <h1 class="text-7xl md:text-9xl font-display font-bold text-white leading-none tracking-tighter">TESMUN<br/><span class="text-outline-white text-8xl md:text-[10rem]">XXII</span></h1>
                <p class="text-gray-300 font-light text-lg mt-6 max-w-2xl mx-auto">Shaping global citizens through diplomacy, debate, and determination.</p>
                <div class="mt-8 flex gap-4 justify-center">
                    <button onclick="navigateTo('committees')" class="bg-secondary hover:bg-secondary/80 text-white px-8 py-3 text-xs font-display uppercase tracking-widest transition-colors rounded-sm shadow-lg inline-flex items-center gap-2">
                        <span class="material-symbols-outlined text-lg">groups</span> Explore Committees
                    </button>
                    <button onclick="navigateTo('schedule')" class="border border-white/30 hover:bg-white/10 text-white px-8 py-3 text-xs font-display uppercase tracking-widest transition-colors rounded-sm inline-flex items-center gap-2">
                        <span class="material-symbols-outlined text-lg">event</span> View Schedule
                    </button>
                </div>
            </div>
        </div>
        <!-- Mission & Vision -->
        <div class="max-w-6xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-8">
            <div class="bg-[#1c1f4a]/50 border border-white/10 rounded-xl p-10 hover:border-accent/30 transition-all">
                <div class="flex items-center gap-3 mb-6">
                    <span class="material-symbols-outlined text-accent text-3xl">flag</span>
                    <h2 class="font-display text-2xl font-bold text-white uppercase tracking-widest">Mission</h2>
                </div>
                <p class="text-gray-300 font-light leading-relaxed text-sm">${d.mission}</p>
            </div>
            <div class="bg-[#1c1f4a]/50 border border-white/10 rounded-xl p-10 hover:border-accent/30 transition-all">
                <div class="flex items-center gap-3 mb-6">
                    <span class="material-symbols-outlined text-accent text-3xl">visibility</span>
                    <h2 class="font-display text-2xl font-bold text-white uppercase tracking-widest">Vision</h2>
                </div>
                <p class="text-gray-300 font-light leading-relaxed text-sm">${d.vision}</p>
            </div>
        </div>
        <!-- Stats -->
        <div class="max-w-6xl mx-auto px-8 pb-16">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                ${[{ n: '14', l: 'Committees', i: 'groups' }, { n: '5', l: 'Levels', i: 'stairs' }, { n: '4', l: 'Days', i: 'event' }, { n: '30+', l: 'Chairs', i: 'person' }].map(s => `
                <div class="bg-black/20 border border-white/5 rounded-xl p-6 text-center hover:border-accent/30 transition-all">
                    <span class="material-symbols-outlined text-accent text-3xl mb-2">${s.i}</span>
                    <div class="text-4xl font-display font-bold text-white">${s.n}</div>
                    <div class="text-[10px] text-gray-400 uppercase tracking-widest mt-1">${s.l}</div>
                </div>`).join('')}
            </div>
        </div>
    </div>`;
}

// ── Committees Page ─────────────────────────────────
function renderCommittees() {
    const levels = TESMUN_DATA.levels;
    const committees = TESMUN_DATA.committees[currentLevel] || [];
    if (!currentCommittee || !committees.find(c => c.id === currentCommittee)) {
        currentCommittee = committees[0]?.id || null;
    }
    const active = committees.find(c => c.id === currentCommittee);
    const levelObj = levels.find(l => l.id === currentLevel);

    return `
    <!-- Left Sidebar -->
    <aside class="w-72 shrink-0 bg-[#191b42] border-r border-white/5 flex flex-col overflow-y-auto page-enter">
        <div class="p-8 border-b border-white/5">
            <h2 class="text-gray-400 font-display text-xs uppercase tracking-[0.2em]">Conference Levels</h2>
        </div>
        <nav class="flex-1 py-4">
            ${levels.map(lv => {
        const isActive = lv.id === currentLevel;
        const lvComms = TESMUN_DATA.committees[lv.id] || [];
        return `<div class="mb-1">
                    <a onclick="currentLevel='${lv.id}';currentCommittee=null;render()" class="sidebar-link ${isActive ? 'active' : ''} group flex items-center px-8 py-4 transition-all relative overflow-hidden cursor-pointer ${isActive ? 'bg-secondary text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}">
                        ${isActive ? '<div class="absolute left-0 top-0 bottom-0 w-1 bg-accent"></div>' : ''}
                        <span class="material-symbols-outlined mr-4 ${isActive ? 'text-accent' : ''}">${lv.icon}</span>
                        <span class="font-display uppercase tracking-widest text-sm ${isActive ? 'font-bold' : ''}">${lv.name}</span>
                        ${isActive ? '<span class="material-symbols-outlined ml-auto text-sm">expand_less</span>' : ''}
                    </a>
                    ${isActive ? `<div class="bg-[#141539] py-2">${lvComms.map(c => `
                        <a onclick="currentCommittee='${c.id}';render()" class="flex items-center pl-16 pr-8 py-3 cursor-pointer transition-colors ${c.id === currentCommittee ? 'text-white bg-white/5 border-r-4 border-accent' : 'text-gray-400 hover:text-white hover:bg-white/5'}">
                            <span class="font-display uppercase tracking-widest text-xs ${c.id === currentCommittee ? 'font-bold text-accent' : ''}">${c.name}</span>
                        </a>`).join('')}</div>` : ''}
                </div>`;
    }).join('')}
        </nav>
        <div class="p-6 mt-auto">
            <div class="bg-black/20 rounded-lg p-5 border border-white/5">
                <h3 class="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-3">Quick Links</h3>
                <div class="space-y-3">
                    <a class="text-xs text-gray-300 hover:text-white flex items-center gap-2 transition-colors cursor-pointer" onclick="navigateTo('handbook')"><span class="material-symbols-outlined text-base">description</span> Delegate Guide</a>
                    <a class="text-xs text-gray-300 hover:text-white flex items-center gap-2 transition-colors cursor-pointer" onclick="navigateTo('schedule')"><span class="material-symbols-outlined text-base">event</span> Calendar</a>
                </div>
            </div>
        </div>
    </aside>
    <!-- Center Content -->
    <section class="flex-1 overflow-y-auto custom-scrollbar relative px-8 py-10 lg:px-16 lg:py-12 bg-tesmun-blue">
        ${active ? renderCommitteeCenter(active, levelObj) : '<div class="flex items-center justify-center h-full text-gray-500 font-display uppercase tracking-widest">Select a committee</div>'}
    </section>
    <!-- Right Panel -->
    ${active ? renderChairsPanel(active) : ''}`;
}

function renderCommitteeCenter(c, level) {
    return `<div class="max-w-5xl mx-auto">
        <div class="mb-12 border-b border-white/10 pb-12">
            <div class="flex items-center gap-4 mb-4">
                <span class="bg-secondary text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">Active Selection</span>
                <span class="text-accent font-display text-xs uppercase tracking-widest">${level.name} Level</span>
                ${c.crisis ? '<span class="bg-red-900/50 text-red-300 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm border border-red-500/30">Crisis</span>' : ''}
            </div>
            <h1 class="text-7xl lg:text-[10rem] font-display font-bold text-white leading-none tracking-tighter mb-2">${c.name}</h1>
            <p class="text-xl lg:text-2xl text-gray-300 font-light max-w-3xl mt-6 border-l-4 border-accent pl-6 py-1">
                ${c.description}
                <br/><span class="text-white font-medium italic mt-2 inline-block">Language: ${c.lang}.</span>
            </p>
        </div>
        <div class="space-y-8">
            <h2 class="text-gray-500 font-display text-xs uppercase tracking-[0.3em] mb-8">Committee Topics</h2>
            ${c.topics.map(t => `
            <div class="topic-card">
                <div class="bg-white p-8 flex items-center justify-center shrink-0 w-full md:w-64 md:border-r border-white/10 relative overflow-hidden">
                    <div class="absolute inset-0 bg-secondary/5"></div>
                    <h3 class="text-5xl font-display font-bold uppercase text-secondary relative z-10 text-center">Topic<br/><span class="text-6xl">${t.label}</span></h3>
                    <span class="material-symbols-outlined absolute -bottom-4 -right-4 text-8xl text-secondary/10">${t.icon}</span>
                </div>
                <div class="p-8 flex-1 flex flex-col justify-center relative">
                    <div class="absolute top-4 right-4 opacity-10"><span class="material-symbols-outlined text-6xl text-white">${t.icon}</span></div>
                    <h4 class="text-2xl text-white font-light leading-snug mb-6 pr-8">${t.title}</h4>
                    <button class="self-start inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-white px-6 py-3 text-xs font-display uppercase tracking-widest transition-colors rounded-sm shadow-lg">
                        <span class="material-symbols-outlined text-lg">download</span> Download Study Guide
                    </button>
                </div>
            </div>`).join('')}
        </div>
    </div>`;
}

function renderChairsPanel(c) {
    const hasFactions = c.chairs.some(ch => ch.faction);
    return `<aside class="w-80 shrink-0 bg-[#16183d] border-l border-white/5 flex flex-col overflow-y-auto">
        <div class="p-8 pb-4">
            <h2 class="text-gray-400 font-display text-xs uppercase tracking-[0.2em] mb-1">The Dais</h2>
            <h3 class="text-white font-display text-2xl font-bold uppercase leading-tight">Committee Chairs</h3>
            <div class="h-0.5 w-12 bg-accent mt-4"></div>
        </div>
        <div class="px-6 py-4 space-y-6 flex-1 overflow-y-auto">
            ${hasFactions ? renderFactionChairs(c.chairs) : c.chairs.map(ch => renderChairCard(ch)).join('')}
        </div>
        <div class="mt-auto bg-black/20 p-6 border-t border-white/5">
            <div class="flex items-center justify-between">
                <div>
                    <h4 class="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Language</h4>
                    <span class="text-xs text-white font-medium">${c.lang}</span>
                </div>
                <div class="text-right">
                    <h4 class="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Type</h4>
                    <span class="text-xs text-white font-medium">${c.crisis ? 'Crisis' : 'Standard'}</span>
                </div>
            </div>
        </div>
    </aside>`;
}

function renderFactionChairs(chairs) {
    const f1 = chairs.filter(c => c.faction === 1);
    const f2 = chairs.filter(c => c.faction === 2);
    const noFaction = chairs.filter(c => !c.faction);
    let html = '';
    if (f1.length) html += `<div class="mb-4"><p class="text-[10px] text-accent uppercase tracking-widest font-bold mb-3">Faction 1</p>${f1.map(renderChairCard).join('')}</div>`;
    if (f2.length) html += `<div class="mb-4"><p class="text-[10px] text-accent uppercase tracking-widest font-bold mb-3">Faction 2</p>${f2.map(renderChairCard).join('')}</div>`;
    if (noFaction.length) html += noFaction.map(renderChairCard).join('');
    return html;
}

function renderChairCard(ch) {
    const initials = ch.name.split(' ').map(w => w[0]).join('').slice(0, 2);
    const imgEl = ch.img
        ? `<img alt="${ch.name}" class="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" src="${ch.img}"/>`
        : `<div class="w-full h-full rounded-full bg-surface-dark flex items-center justify-center text-white font-display font-bold text-lg">${initials}</div>`;
    return `<div class="group flex items-center gap-4 py-2 border-b border-white/5 pb-6 last:border-0">
        <div class="relative shrink-0">
            <div class="w-16 h-16 rounded-full border border-white/20 p-1 group-hover:border-accent transition-colors">${imgEl}</div>
        </div>
        <div>
            <h5 class="text-base font-bold text-white uppercase tracking-wide">${ch.name}</h5>
            <p class="text-[10px] text-gray-400 font-semibold uppercase mt-1 tracking-wider">${ch.school}</p>
        </div>
    </div>`;
}

// ── Campus Page ─────────────────────────────────────
function renderCampus() {
    return `<div class="flex-1 overflow-y-auto custom-scrollbar page-enter px-8 py-12 lg:px-16">
        <div class="max-w-6xl mx-auto">
            <p class="text-accent font-display text-xs uppercase tracking-[0.4em] mb-4">Venue</p>
            <h1 class="text-6xl md:text-8xl font-display font-bold text-white leading-none tracking-tighter mb-2">Campus</h1>
            <p class="text-xl text-gray-300 font-light mt-4 mb-12 border-l-4 border-accent pl-6">Universidad de La Sabana — Chía, Colombia</p>
            <div class="space-y-8">
                ${[
            { title: 'Promotional Video', icon: 'play_circle', desc: 'Conference highlights and campus overview.', ph: 'Video player will be embedded here.' },
            { title: 'Campus Map', icon: 'map', desc: 'Navigate the conference venue and key locations.', ph: 'Interactive campus map will be displayed here.' },
            { title: '360° Virtual Tour', icon: 'view_in_ar', desc: 'Explore the campus from anywhere in the world.', ph: '360° virtual tour experience will be embedded here.' }
        ].map(s => `
                <div class="bg-[#1c1f4a]/50 border border-white/10 rounded-xl overflow-hidden hover:border-accent/30 transition-all">
                    <div class="p-8">
                        <div class="flex items-center gap-3 mb-4">
                            <span class="material-symbols-outlined text-accent text-2xl">${s.icon}</span>
                            <h2 class="font-display text-xl font-bold text-white uppercase tracking-widest">${s.title}</h2>
                        </div>
                        <p class="text-gray-400 text-sm mb-6">${s.desc}</p>
                    </div>
                    <div class="bg-black/30 border-t border-white/5 h-64 flex items-center justify-center">
                        <div class="text-center">
                            <span class="material-symbols-outlined text-gray-600 text-6xl mb-3">${s.icon}</span>
                            <p class="text-gray-500 text-sm font-display uppercase tracking-widest">${s.ph}</p>
                        </div>
                    </div>
                </div>`).join('')}
            </div>
        </div>
    </div>`;
}

// ── Schedule Page ───────────────────────────────────
function renderSchedule() {
    return `<div class="flex-1 overflow-y-auto custom-scrollbar page-enter px-8 py-12 lg:px-16">
        <div class="max-w-5xl mx-auto">
            <p class="text-accent font-display text-xs uppercase tracking-[0.4em] mb-4">Conference Agenda</p>
            <h1 class="text-6xl md:text-8xl font-display font-bold text-white leading-none tracking-tighter mb-12">Schedule</h1>
            <div class="space-y-12">
                ${TESMUN_DATA.schedule.map(day => `
                <div class="bg-[#1c1f4a]/30 border border-white/10 rounded-xl overflow-hidden hover:border-accent/20 transition-all">
                    <div class="bg-secondary/20 border-b border-white/10 px-8 py-6 flex items-center justify-between">
                        <div>
                            <div class="flex items-center gap-3">
                                <span class="bg-secondary text-white w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-lg">${day.day}</span>
                                <div>
                                    <h2 class="font-display text-xl font-bold text-white uppercase tracking-widest">${day.weekday}</h2>
                                    <p class="text-gray-400 text-xs uppercase tracking-wider mt-0.5">Day ${day.day} of 4</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 text-accent"><span class="material-symbols-outlined text-lg">location_on</span><span class="text-xs font-display uppercase tracking-widest">${day.location}</span></div>
                    </div>
                    <div class="p-8">
                        <div class="space-y-0 relative">
                            <div class="absolute left-[5px] top-3 bottom-3 w-px bg-white/10"></div>
                            ${day.events.map(e => `
                            <div class="flex items-start gap-6 py-3 group">
                                <div class="timeline-dot mt-1 group-hover:bg-white group-hover:scale-125 transition-all"></div>
                                <div class="flex-1 flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <span class="material-symbols-outlined text-gray-500 group-hover:text-accent transition-colors">${e.icon}</span>
                                        <span class="text-white font-medium text-sm group-hover:text-accent transition-colors">${e.title}</span>
                                    </div>
                                    <span class="text-gray-400 text-xs font-mono">${e.time}</span>
                                </div>
                            </div>`).join('')}
                        </div>
                    </div>
                </div>`).join('')}
            </div>
        </div>
    </div>`;
}

// ── Contact Page ────────────────────────────────────
function renderContact() {
    return `<div class="flex-1 overflow-y-auto custom-scrollbar page-enter px-8 py-12 lg:px-16">
        <div class="max-w-4xl mx-auto">
            <p class="text-accent font-display text-xs uppercase tracking-[0.4em] mb-4">Get in Touch</p>
            <h1 class="text-6xl md:text-8xl font-display font-bold text-white leading-none tracking-tighter mb-12">Contact Us</h1>
            <div class="grid md:grid-cols-2 gap-8">
                <a href="mailto:tesmun@englishschool.edu.co" class="bg-[#1c1f4a]/50 border border-white/10 rounded-xl p-10 hover:border-accent/50 transition-all group block">
                    <span class="material-symbols-outlined text-accent text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">email</span>
                    <h2 class="font-display text-xl font-bold text-white uppercase tracking-widest mb-3">Email</h2>
                    <p class="text-gray-300 text-lg group-hover:text-accent transition-colors">tesmun@englishschool.edu.co</p>
                </a>
                <a href="https://instagram.com/officialtesmun" target="_blank" class="bg-[#1c1f4a]/50 border border-white/10 rounded-xl p-10 hover:border-accent/50 transition-all group block">
                    <span class="material-symbols-outlined text-accent text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">camera_alt</span>
                    <h2 class="font-display text-xl font-bold text-white uppercase tracking-widest mb-3">Instagram</h2>
                    <p class="text-gray-300 text-lg group-hover:text-accent transition-colors">@officialtesmun</p>
                </a>
            </div>
            <div class="mt-12 bg-black/20 border border-white/5 rounded-xl p-10 text-center">
                <span class="material-symbols-outlined text-gray-600 text-6xl mb-4">school</span>
                <h3 class="font-display text-lg font-bold text-white uppercase tracking-widest mb-2">The English School</h3>
                <p class="text-gray-400 text-sm">Bogotá, Colombia</p>
            </div>
        </div>
    </div>`;
}

// ── Handbook Page (PDF Viewer) ──────────────────────
const HANDBOOK_PDF_URL = 'assets/docs/handbook.pdf';
let pdfDoc = null;
let pdfScale = 1.5;
let pdfRendering = false;
let pdfPendingRender = null;

function renderHandbook() {
    // Schedule PDF load after DOM injection
    setTimeout(() => initPdfViewer(), 0);

    return `<div class="flex-1 flex flex-col overflow-hidden page-enter">
        <!-- Toolbar -->
        <div class="shrink-0 bg-[#191b42] border-b border-white/10 px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
            <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-accent text-xl">menu_book</span>
                <h1 class="font-display text-lg font-bold text-white uppercase tracking-widest">Handbook</h1>
            </div>
            <div class="flex items-center gap-3 flex-wrap">
                <!-- Page Nav -->
                <div class="flex items-center gap-2 bg-black/30 rounded-lg px-3 py-1.5 border border-white/10">
                    <button onclick="pdfPrevPage()" class="text-gray-400 hover:text-white transition-colors" title="Previous Page">
                        <span class="material-symbols-outlined text-lg">navigate_before</span>
                    </button>
                    <span class="text-white text-xs font-mono min-w-[80px] text-center" id="pdf-page-info">Loading…</span>
                    <button onclick="pdfNextPage()" class="text-gray-400 hover:text-white transition-colors" title="Next Page">
                        <span class="material-symbols-outlined text-lg">navigate_next</span>
                    </button>
                </div>
                <!-- Zoom -->
                <div class="flex items-center gap-1 bg-black/30 rounded-lg px-3 py-1.5 border border-white/10">
                    <button onclick="pdfZoom(-0.25)" class="text-gray-400 hover:text-white transition-colors" title="Zoom Out">
                        <span class="material-symbols-outlined text-lg">remove</span>
                    </button>
                    <span class="text-white text-xs font-mono min-w-[45px] text-center" id="pdf-zoom-info">150%</span>
                    <button onclick="pdfZoom(0.25)" class="text-gray-400 hover:text-white transition-colors" title="Zoom In">
                        <span class="material-symbols-outlined text-lg">add</span>
                    </button>
                    <button onclick="pdfFitWidth()" class="text-gray-400 hover:text-white transition-colors ml-1" title="Fit Width">
                        <span class="material-symbols-outlined text-lg">fit_width</span>
                    </button>
                </div>
                <!-- Actions -->
                <div class="flex items-center gap-1">
                    <button onclick="pdfPrint()" class="bg-black/30 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 rounded-lg px-3 py-1.5 transition-colors inline-flex items-center gap-2" title="Print">
                        <span class="material-symbols-outlined text-lg">print</span>
                        <span class="text-xs font-display uppercase tracking-widest hidden sm:inline">Print</span>
                    </button>
                    <a href="${HANDBOOK_PDF_URL}" download="TESMUN_XXII_Handbook.pdf" class="bg-secondary hover:bg-secondary/80 text-white border border-secondary/50 rounded-lg px-3 py-1.5 transition-colors inline-flex items-center gap-2" title="Download">
                        <span class="material-symbols-outlined text-lg">download</span>
                        <span class="text-xs font-display uppercase tracking-widest hidden sm:inline">Download</span>
                    </a>
                </div>
            </div>
        </div>
        <!-- PDF Canvas Container -->
        <div class="flex-1 overflow-auto custom-scrollbar bg-[#0d0e2a]" id="pdf-container">
            <div class="flex flex-col items-center gap-4 py-6 px-4" id="pdf-pages">
                <div class="flex items-center justify-center py-20">
                    <div class="text-center">
                        <span class="material-symbols-outlined text-gray-600 text-6xl mb-4 animate-pulse">hourglass_top</span>
                        <p class="text-gray-500 text-sm font-display uppercase tracking-widest">Loading Handbook…</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

function initPdfViewer() {
    if (typeof pdfjsLib === 'undefined') {
        document.getElementById('pdf-pages').innerHTML = '<p class="text-red-400 p-8">PDF.js failed to load. Please refresh.</p>';
        return;
    }
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    pdfjsLib.getDocument(HANDBOOK_PDF_URL).promise.then(doc => {
        pdfDoc = doc;
        renderAllPages();
    }).catch(err => {
        document.getElementById('pdf-pages').innerHTML = `<p class="text-red-400 p-8">Error loading PDF: ${err.message}</p>`;
    });
}

function renderAllPages() {
    const container = document.getElementById('pdf-pages');
    if (!container || !pdfDoc) return;
    container.innerHTML = '';

    const promises = [];
    for (let i = 1; i <= pdfDoc.numPages; i++) {
        const wrapper = document.createElement('div');
        wrapper.className = 'pdf-page-wrapper shadow-2xl rounded';
        wrapper.id = `pdf-page-${i}`;
        const canvas = document.createElement('canvas');
        canvas.className = 'block';
        wrapper.appendChild(canvas);
        container.appendChild(wrapper);
        promises.push(renderPage(i, canvas));
    }

    Promise.all(promises).then(() => {
        updatePageInfo();
        setupScrollPageTracker();
    });
}

function renderPage(num, canvas) {
    return pdfDoc.getPage(num).then(page => {
        const viewport = page.getViewport({ scale: pdfScale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const ctx = canvas.getContext('2d');
        return page.render({ canvasContext: ctx, viewport }).promise;
    });
}

function getCurrentPage() {
    const container = document.getElementById('pdf-container');
    if (!container || !pdfDoc) return 1;
    const scrollTop = container.scrollTop;
    const containerRect = container.getBoundingClientRect();
    const mid = scrollTop + containerRect.height / 3;

    let cumulative = 0;
    for (let i = 1; i <= pdfDoc.numPages; i++) {
        const el = document.getElementById(`pdf-page-${i}`);
        if (!el) continue;
        cumulative += el.offsetHeight + 16; // 16px = gap-4
        if (cumulative > mid) return i;
    }
    return pdfDoc.numPages;
}

function updatePageInfo() {
    const info = document.getElementById('pdf-page-info');
    if (info && pdfDoc) info.textContent = `${getCurrentPage()} / ${pdfDoc.numPages}`;
    const zoom = document.getElementById('pdf-zoom-info');
    if (zoom) zoom.textContent = `${Math.round(pdfScale * 100)}%`;
}

function setupScrollPageTracker() {
    const container = document.getElementById('pdf-container');
    if (!container) return;
    let ticking = false;
    container.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(() => { updatePageInfo(); ticking = false; }); ticking = true; }
    });
}

function pdfPrevPage() {
    const cur = getCurrentPage();
    if (cur > 1) scrollToPage(cur - 1);
}

function pdfNextPage() {
    const cur = getCurrentPage();
    if (pdfDoc && cur < pdfDoc.numPages) scrollToPage(cur + 1);
}

function scrollToPage(num) {
    const el = document.getElementById(`pdf-page-${num}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function pdfZoom(delta) {
    pdfScale = Math.max(0.5, Math.min(4, pdfScale + delta));
    renderAllPages();
}

function pdfFitWidth() {
    const container = document.getElementById('pdf-container');
    if (!container || !pdfDoc) return;
    pdfDoc.getPage(1).then(page => {
        const viewport = page.getViewport({ scale: 1 });
        const containerWidth = container.clientWidth - 48; // padding
        pdfScale = containerWidth / viewport.width;
        renderAllPages();
    });
}

function pdfPrint() {
    const printWindow = window.open(HANDBOOK_PDF_URL);
    if (printWindow) {
        printWindow.addEventListener('load', () => {
            printWindow.focus();
            printWindow.print();
        });
    }
}

// ── Init ────────────────────────────────────────────
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1) || 'about';
    currentPage = hash;
    render();
});

// Initial load
const initHash = window.location.hash.slice(1) || 'about';
currentPage = initHash;
render();
