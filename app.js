// TESMUN XXII — Application Logic (Router + Page Renderers)

let currentPage = 'home';
let currentLevel = 'bootcamp';
let currentCommittee = null;
let currentLang = 'en'; // 'en' or 'es' — for future i18n
let currentAboutSection = 'mun'; // Default about section

// ── Language Toggle ──────────────────────────────────
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    const flag = currentLang === 'en' ? '🇪🇸' : '🇬🇧';
    const label = currentLang === 'en' ? 'Español' : 'English';
    // Update desktop
    const df = document.getElementById('lang-flag');
    const dl = document.getElementById('lang-label');
    if (df) df.textContent = flag;
    if (dl) dl.textContent = label;
    // Update mobile
    const mf = document.getElementById('lang-flag-mobile');
    const ml = document.getElementById('lang-label-mobile');
    if (mf) mf.textContent = flag;
    if (ml) ml.textContent = label;
    // TODO: re-render page content in selected language
}

// ── Committees Dropdown ──────────────────────────────
function getAllCommitteesSorted() {
    const all = [];
    for (const level of Object.keys(TESMUN_DATA.committees)) {
        for (const c of TESMUN_DATA.committees[level]) {
            all.push({ ...c, level });
        }
    }
    return all.sort((a, b) => a.name.localeCompare(b.name));
}

function toggleCommitteeDropdown(e) {
    e.stopPropagation();
    const dd = document.getElementById('committees-dropdown');
    const list = document.getElementById('committees-dropdown-list');
    if (!dd.classList.contains('hidden')) {
        dd.classList.add('hidden');
        return;
    }
    // Populate
    const committees = getAllCommitteesSorted();
    list.innerHTML = committees.map(c =>
        `<a class="px-4 py-2 text-sm text-white hover:bg-white/10 cursor-pointer font-body transition-colors"
            onclick="selectCommitteeFromDropdown('${c.level}','${c.id}')">${c.name}</a>`
    ).join('');
    dd.classList.remove('hidden');
}

function selectCommitteeFromDropdown(level, id) {
    document.getElementById('committees-dropdown').classList.add('hidden');
    currentLevel = level;
    currentCommittee = id;
    navigateTo('committees');
}

// Close dropdown on outside click
document.addEventListener('click', () => {
    const dd = document.getElementById('committees-dropdown');
    if (dd && !dd.classList.contains('hidden')) dd.classList.add('hidden');
});

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
    const renderers = { home: renderHome, about: renderAbout, handbook: renderHandbook, committees: renderCommittees, campus: renderCampus, schedule: renderSchedule };
    const fn = renderers[currentPage] || renderAbout;
    app.innerHTML = fn();
    app.querySelector('.page-enter')?.offsetHeight; // force reflow for animation
    // Setup scroll sync for history slide viewer
    if (currentPage === 'about' && currentAboutSection === 'history') {
        setupHistoryScrollSync();
    }
}

function toggleMobileMenu() {
    const m = document.getElementById('mobile-menu');
    const icon = document.getElementById('mobile-menu-icon');
    m.classList.toggle('hidden');
    icon.textContent = m.classList.contains('hidden') ? 'menu' : 'close';
}

// ── Home Page ───────────────────────────────────────
function renderHome() {
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
        <!-- Stats -->
        <div class="max-w-6xl mx-auto px-8 py-16">
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

// ── About Page ──────────────────────────────────────
// ── About Page ──────────────────────────────────────
const ABOUT_SECTIONS = [
    { id: 'mun', name: 'MUN', icon: 'public' },
    { id: 'history', name: 'History of TESMUN', icon: 'history_edu' },
    { id: 'mission', name: 'Mission', icon: 'flag' },
    { id: 'vision', name: 'Vision', icon: 'visibility' },
    { id: 'contact', name: 'Contact', icon: 'mail' }
];

function renderAbout() {
    const activeSection = ABOUT_SECTIONS.find(s => s.id === currentAboutSection) || ABOUT_SECTIONS[0];

    return `
    <!-- Left Sidebar -->
    <aside class="w-72 shrink-0 bg-[#191b42] border-r border-white/5 flex flex-col overflow-y-auto page-enter">
        <div class="p-8 pb-4">
            <h3 class="text-white font-display text-2xl font-bold uppercase leading-tight">About TESMUN</h3>
            <h2 class="text-gray-400 font-display text-xs uppercase tracking-[0.2em] mt-1" style="padding-left:32px;">Overview</h2>
            <div class="h-0.5 w-12 bg-accent mt-4"></div>
        </div>
        <nav class="flex-1 py-4">
            ${ABOUT_SECTIONS.map(s => {
        const isActive = s.id === currentAboutSection;
        return `<div class="mb-1">
                    <a onclick="currentAboutSection='${s.id}';render()" class="sidebar-link ${isActive ? 'active' : ''} group flex items-center px-8 py-4 transition-all relative overflow-hidden cursor-pointer ${isActive ? 'bg-secondary text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}">
                        ${isActive ? '<div class="absolute left-0 top-0 bottom-0 w-1 bg-accent"></div>' : ''}
                        
                        <span class="font-display uppercase tracking-widest text-sm ${isActive ? 'font-bold' : ''}">${s.name}</span>
                        ${isActive ? '<span class="material-symbols-outlined ml-auto text-sm">expand_less</span>' : ''}
                    </a>
                </div>`;
    }).join('')}
        </nav>
        <div class="p-6 mt-auto">
            <div class="bg-black/20 rounded-lg p-5 border border-white/5">
                <h3 class="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-3">Quick Links</h3>
                <div class="space-y-3">
                    <a class="text-xs text-gray-300 hover:text-white flex items-center gap-2 transition-colors cursor-pointer" onclick="navigateTo('committees')"><span class="material-symbols-outlined text-base">groups</span> Committees</a>
                    <a class="text-xs text-gray-300 hover:text-white flex items-center gap-2 transition-colors cursor-pointer" onclick="navigateTo('schedule')"><span class="material-symbols-outlined text-base">event</span> Schedule</a>
                </div>
            </div>
        </div>
    </aside>
    <!-- Center Content -->
    <section class="flex-1 overflow-y-auto custom-scrollbar relative px-8 py-10 lg:px-16 lg:py-12 bg-tesmun-blue">
        ${renderAboutCenter(activeSection)}
    </section>
    <!-- Right Panel -->
    ${renderAboutRightPanel(activeSection)}`;
}

// History section → image mapping
const HISTORY_SECTION_IMAGES = {
    'history-intro': 'assets/images/infographic-evolution.jpeg',
    'history-2003': 'assets/images/history/2003.jpeg',
    'history-2004': 'assets/images/history/2004.jpeg',
    'history-2005': 'assets/images/history/2005.jpeg',
    'history-2006': 'assets/images/history/2006.jpeg',
    'history-2007': 'assets/images/history/2007.jpeg',
    'history-2008': 'assets/images/history/2008.jpeg',
    'history-2009': 'assets/images/history/2009.jpeg',
    'history-2010': 'assets/images/history/2010.jpeg',
    'history-2011': 'assets/images/history/2011.jpeg',
    'history-2012': 'assets/images/history/2012.jpeg',
    'history-2013': 'assets/images/history/2013.jpeg',
    'history-2014': 'assets/images/history/2014.jpeg'
};

function renderAboutRightPanel(section) {
    if (section.id === 'history') {
        const firstImg = Object.values(HISTORY_SECTION_IMAGES).find(v => v);
        return `<aside class="w-80 shrink-0 bg-[#16183d] border-l border-white/5 flex flex-col overflow-hidden">
            <div class="flex-1 flex items-center justify-center p-4">
                <div id="history-slide-viewer" class="w-full">
                    <img id="history-slide-img" src="${firstImg}" alt="" class="w-full h-auto block rounded-lg" style="transition: opacity 0.4s ease;" />
                </div>
            </div>
        </aside>`;
    }
    return `<aside class="w-80 shrink-0 bg-[#16183d] border-l border-white/5 flex flex-col overflow-y-auto">
        <div class="px-4 py-4 flex-1 overflow-y-auto"></div>
    </aside>`;
}

function setupHistoryScrollSync() {
    const scrollContainer = document.querySelector('#app section.flex-1.overflow-y-auto');
    const sections = scrollContainer?.querySelectorAll('[data-year]');
    const img = document.getElementById('history-slide-img');
    if (!scrollContainer || !sections?.length || !img) return;

    let currentSlide = null;

    const observer = new IntersectionObserver((entries) => {
        let topVisible = null;
        let topY = Infinity;
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.boundingClientRect.top < topY) {
                topY = entry.boundingClientRect.top;
                topVisible = entry.target;
            }
        });
        if (!topVisible) return;
        const yearId = topVisible.dataset.year;
        if (yearId === currentSlide) return;
        currentSlide = yearId;
        const newSrc = HISTORY_SECTION_IMAGES[yearId];
        if (newSrc) {
            img.style.opacity = '0';
            setTimeout(() => {
                img.src = newSrc;
                img.style.opacity = '1';
            }, 300);
        } else {
            img.style.opacity = '0.2';
        }
    }, {
        root: scrollContainer,
        threshold: 0,
        rootMargin: '0px 0px -70% 0px'
    });

    sections.forEach(s => observer.observe(s));
}

function renderAboutCenter(section) {
    const d = TESMUN_DATA.about;
    let content = '';

    switch (section.id) {
        case 'mun':
            content = `<div class="max-w-5xl mx-auto">
                    <div class="pb-6 rounded-t-lg" style="margin-bottom:16px; border-bottom:3px solid rgba(255,255,255,0.1); background:#b71c1c; padding:24px 32px;">
                        <div class="flex items-center gap-4 mb-4">
                            <span class="text-white px-3 py-1 font-bold uppercase tracking-widest rounded-sm" style="font-size:12px; background:#191b42;">About TESMUN</span>
                            <span class="text-accent font-display uppercase tracking-widest" style="font-size:14px;">Model United Nations</span>
                        </div>
                        <h1 class="font-display font-bold text-white leading-none tracking-tighter" style="font-size:clamp(54px, 10vw, 120px);">MUN</h1>
                    </div>

                    <div class="space-y-12 text-gray-300 font-light leading-relaxed text-2xl">

                        <h2 class="font-display text-4xl font-bold text-white uppercase tracking-widest mb-4">Overview</h2>

                        <div>
                            <p class="mb-4"><strong class="text-white font-medium">Model United Nations (MUN)</strong> are simulations which recreate the real procedures of the United Nations Organization. The main objective of the activity is to encourage different opportunities for middle and high school students in which they can learn and reflect about current global problematics.</p>
                            <p class="mb-4">Throughout this process, students develop essential skills, including:</p>
                            <ul class="list-none space-y-3 mb-4 pl-4">
                                <li class="flex items-center gap-3"><span class="material-symbols-outlined text-accent text-xl">search</span> <strong class="text-white font-medium">Investigation and Research</strong></li>
                                <li class="flex items-center gap-3"><span class="material-symbols-outlined text-accent text-xl">record_voice_over</span> <strong class="text-white font-medium">Public Speaking</strong></li>
                                <li class="flex items-center gap-3"><span class="material-symbols-outlined text-accent text-xl">handshake</span> <strong class="text-white font-medium">Diplomatic Negotiation</strong></li>
                            </ul>
                            <p><strong class="text-white font-medium">Academic Excellence</strong>: Simulations are also academic experiences which encourage participants to develop autonomy and leadership.</p>
                        </div>

                        <div class="h-px bg-white/10"></div>

                        <h2 class="font-display text-4xl font-bold text-white uppercase tracking-widest mb-4">Global Interaction and Responsibility</h2>

                        <div>
                            <p class="mb-4">These conferences provide spaces for students to interact with young delegates from different cities in Colombia and around the world. Participants must debate and write resolutions regarding international disputes and conflicts.</p>
                            <p class="mb-4">During the development of MUN, students assume the role of <strong class="text-white font-medium">diplomats</strong> from their assigned country in an environment that simulates the UN. The real success of these conferences is found in:</p>
                            <ol class="list-none space-y-3 pl-4">
                                <li class="flex items-start gap-3"><span class="text-accent font-display font-bold text-xl">1.</span> The <strong class="text-white font-medium">seriousness</strong> with which delegates perform their role.</li>
                                <li class="flex items-start gap-3"><span class="text-accent font-display font-bold text-xl">2.</span> The application of <strong class="text-white font-medium">political and diplomatic abilities</strong>.</li>
                            </ol>
                        </div>

                        <div class="h-px bg-white/10"></div>

                        <h2 class="font-display text-4xl font-bold text-white uppercase tracking-widest mb-4">Leadership and Future Prospects</h2>

                        <div>
                            <p class="mb-4">In addition, MUN provides students with spaces to develop leadership under the role of delegates or presidents.</p>
                            <p>These environments help develop new skills in the participant delegates and assist them in finding a <strong class="text-white font-medium">professional orientation for the future</strong>.</p>
                        </div>

                    </div>
                </div>`;
            break;
        case 'history':
            content = `<div class="max-w-5xl mx-auto">
                    <div data-year="history-intro" class="pb-6 rounded-t-lg" style="margin-bottom:16px; border-bottom:3px solid rgba(255,255,255,0.1); background:#b71c1c; padding:24px 32px;">
                        <div class="flex items-center gap-4 mb-4">
                            <span class="text-white px-3 py-1 font-bold uppercase tracking-widest rounded-sm" style="font-size:12px; background:#191b42;">About TESMUN</span>
                            <span class="text-accent font-display uppercase tracking-widest" style="font-size:14px;">History</span>
                        </div>
                        <h1 class="font-display font-bold text-white leading-none tracking-tighter" style="font-size:clamp(54px, 10vw, 120px);">The Origins of TESMUN</h1>
                    </div>

                    <div class="space-y-12 text-gray-300 font-light leading-relaxed text-2xl">

                        <h2 class="font-display text-4xl font-bold text-white uppercase tracking-widest mb-4">Inception and the Inaugural Conference <span class="text-accent">(2003–2004)</span></h2>

                        <div data-year="history-2003">
                            <p class="mb-4">Driven by a vision to provide students with a global perspective, <strong class="text-white font-medium">The English School</strong> first engaged with the Model United Nations (MUN) circuit in 2003. This initiative was spearheaded by a small group of ambitious upper school students: María Ximena Lozano, Lina Henao, Estefanía Tapias, Felipe Guerrero, Juan Sebastián Robledo, and Juan Sebastián Dachiardi.</p>
                        </div>

                        <div data-year="history-2004">
                            <p class="mb-4">Following a series of distinguished performances within Bogotá's burgeoning MUN community, this group set out to establish the school's own model in 2004. After extensive proposals and deliberations with school leadership and faculty, <strong class="text-white font-medium">TESMUN</strong> was officially integrated into the academic calendar.</p>
                            <p>The first conference was a true grassroots effort, characterized by hand-stapled handbooks and recycled classroom materials. Despite being an internal event, <strong class="text-white font-medium">TESMUN I</strong> was a resounding success, drawing approximately 100 students who transformed their everyday classrooms into arenas of high-level diplomatic debate.</p>
                        </div>

                        <img src="assets/images/infographic-evolution.jpeg" alt="The Evolution of TESMUN" class="w-full h-auto block rounded-lg" style="margin-top:2rem; margin-bottom:2rem;" />

                        <div class="h-px bg-white/10"></div>

                        <h2 class="font-display text-4xl font-bold text-white uppercase tracking-widest mb-4">Expanding Horizons: TESMUN II and III <span class="text-accent">(2005–2006)</span></h2>

                        <div data-year="history-2005">
                            <p>By 2005, a new generation of delegates sought to push the boundaries of the program, leading The English School to its first national and international MUN appearances. Buoyed by the success of the previous year, the school provided the funding necessary for <strong class="text-white font-medium">TESMUN II</strong> to welcome external participants. This edition also saw the creation of the official TESMUN emblem—a logo that remains the symbol of the conference today. The event grew to accommodate 150 delegates, including many from outside Bogotá.</p>
                        </div>

                        <div data-year="history-2006">
                            <p>In 2006, the project gained formal institutional backing, with the TESMUN curriculum being integrated into the 8th-grade academic program and recognized across other levels. <strong class="text-white font-medium">TESMUN III</strong> continued this upward trajectory, hosting roughly 200 delegates from seven external schools who debated across seven specialized committees.</p>
                        </div>

                        <div class="h-px bg-white/10"></div>

                        <h2 class="font-display text-4xl font-bold text-white uppercase tracking-widest mb-4">A Major Leap: TESMUN IV <span class="text-accent">(2007)</span></h2>

                        <div data-year="history-2007">
                            <p class="mb-4">The year 2007 marked a pivotal milestone as the conference transitioned from the school campus to the <strong class="text-white font-medium">Cafam Floresta Convention Center</strong> in Bogotá. This move signaled the model's transition to a national stage, attracting corporate sponsorships and aligning the academic project with tangible social impact.</p>
                            <p>With fifteen schools from across Colombia participating, attendance rose to 450 delegates. This edition saw the launch of the highly acclaimed <strong class="text-white font-medium">Comisión Bogotá</strong>, a "real-action" committee designed to immerse delegates in the challenges of their own city. On the final day of the conference, students implemented action plans directly within marginalized neighborhoods. TESMUN IV was overseen by Faculty Sponsor Professor Fabio Cárdenas and Secretaries General Juan Camilo Orduz and Carolina Sintura, who led an extensive team to ensure the highest standards of diplomatic formality.</p>
                        </div>

                        <div class="h-px bg-white/10"></div>

                        <h2 class="font-display text-4xl font-bold text-white uppercase tracking-widest mb-4">Social Responsibility and Continued Growth: TESMUN V and VI <span class="text-accent">(2008–2009)</span></h2>

                        <div data-year="history-2008">
                            <p>In 2008, <strong class="text-white font-medium">TESMUN V</strong> focused on deepening its social mission. The organization launched a landmark sponsorship program, enabling students from agricultural communities, indigenous populations, and under-resourced public and private schools to participate in an MUN for the first time. The team conducted specialized training sessions within these communities to ensure they were fully prepared for the diplomatic experience. With 650 delegates, TESMUN solidified its reputation as a model of national coverage and inclusive access.</p>
                        </div>

                        <div data-year="history-2009">
                            <p>By 2009, the sixth iteration of TESMUN became the largest MUN conference in Colombia. Dedicated to the formation of "World Citizens," <strong class="text-white font-medium">TESMUN VI</strong> introduced plenary sessions and lectures led by experts to foster critical thinking and rigorous debate. The conference reached a record attendance of 750 delegates.</p>
                        </div>

                        <div class="h-px bg-white/10"></div>

                        <h2 class="font-display text-4xl font-bold text-white uppercase tracking-widest mb-4">Scaling New Heights and International Reach: TESMUN VII to IX <span class="text-accent">(2010–2012)</span></h2>

                        <div data-year="history-2010">
                            <p>In 2010, <strong class="text-white font-medium">TESMUN VII</strong> maintained its status as the country's largest MUN while preserving the personalized attention that defined the "TESMUN experience." That year, 850 delegates participated, with total attendance reaching 1,000. The academic rigor was enhanced by collaborations with distinguished guest speakers, including the President of the Supreme Court of Justice and Colombian representatives to the United Nations.</p>
                        </div>

                        <div data-year="history-2011">
                            <p>In 2011, <strong class="text-white font-medium">TESMUN VIII</strong> welcomed over 60 public and private schools, totaling 1,000 participants. The conference achieved international recognition by awarding two scholarships to Hult University in London and hosting prominent figures such as Senator Juan Manuel Galán and David Luna.</p>
                        </div>

                        <div data-year="history-2012">
                            <p>The 2012 edition, <strong class="text-white font-medium">TESMUN IX</strong>, marked the conference's true international debut, welcoming delegations from Ecuador, Mexico, and Chile. The model featured 19 committees—ten in Spanish and nine in English—highlighting innovative dynamics within the Crisis and "Historical Colombia" committees.</p>
                        </div>

                        <div class="h-px bg-white/10"></div>

                        <h2 class="font-display text-4xl font-bold text-white uppercase tracking-widest mb-4">A Decade of Excellence <span class="text-accent">(2013–2014)</span></h2>

                        <div data-year="history-2013">
                            <p>Marking its tenth anniversary in 2013, <strong class="text-white font-medium">TESMUN X</strong> celebrated a decade of diplomatic excellence by expanding to 21 committees. The conference projected a massive participation of 1,200 delegates, drawing students from Bogotá, across Colombia, and around the world, cementing its legacy as a cornerstone of the global MUN community.</p>
                        </div>

                        <div data-year="history-2014">
                            <p>Building on a decade of achievement, <strong class="text-white font-medium">TESMUN XI</strong> in 2014 continued to expand the conference's reach and refine its academic rigor, setting the stage for the next chapter in a legacy of diplomatic excellence.</p>
                        </div>

                    </div>
                </div>`;
            break;
        case 'mission':
            content = `<div class="max-w-4xl mx-auto"><h1 class="text-5xl md:text-7xl font-display font-bold text-white leading-none tracking-tighter mb-8">${section.name}</h1><div class="bg-[#1c1f4a]/50 border border-white/10 rounded-xl p-10 hover:border-accent/30 transition-all"><p class="text-gray-300 font-light leading-relaxed text-lg">${d.mission}</p></div></div>`;
            break;
        case 'vision':
            content = `<div class="max-w-4xl mx-auto"><h1 class="text-5xl md:text-7xl font-display font-bold text-white leading-none tracking-tighter mb-8">${section.name}</h1><div class="bg-[#1c1f4a]/50 border border-white/10 rounded-xl p-10 hover:border-accent/30 transition-all"><p class="text-gray-300 font-light leading-relaxed text-lg">${d.vision}</p></div></div>`;
            break;
        case 'contact':
            content = `<div class="max-w-4xl mx-auto">
                <p class="text-accent font-display text-xs uppercase tracking-[0.4em] mb-4">Get in Touch</p>
                <h1 class="text-5xl md:text-7xl font-display font-bold text-white leading-none tracking-tighter mb-12">Contact Us</h1>
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
            </div>`;
            break;
    }
    return content;
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
        <div class="p-8 pb-4">
            <h3 class="text-white font-display text-2xl font-bold uppercase leading-tight">Conference Levels</h3>
            <h2 class="text-gray-400 font-display text-xs uppercase tracking-[0.2em] mt-1" style="padding-left:32px;">Committees</h2>
            <div class="h-0.5 w-12 bg-accent mt-4"></div>
        </div>
        <nav class="flex-1 py-4">
            ${levels.map(lv => {
        const isActive = lv.id === currentLevel;
        const lvComms = TESMUN_DATA.committees[lv.id] || [];
        return `<div class="mb-1">
                    <a onclick="currentLevel='${lv.id}';currentCommittee=null;render()" class="sidebar-link ${isActive ? 'active' : ''} group flex items-center px-8 py-4 transition-all relative overflow-hidden cursor-pointer ${isActive ? 'bg-secondary text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}">
                        ${isActive ? '<div class="absolute left-0 top-0 bottom-0 w-1 bg-accent"></div>' : ''}
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
        <div class="pb-6 rounded-t-lg" style="margin-bottom:16px; border-bottom:3px solid rgba(255,255,255,0.1); background:#b71c1c; padding:24px 32px;">
            <div class="flex items-center gap-4 mb-4">
                <span class="text-white px-3 py-1 font-bold uppercase tracking-widest rounded-sm" style="font-size:12px; background:#191b42;">Active Selection</span>
                <span class="text-accent font-display uppercase tracking-widest" style="font-size:14px;">${level.name} Level</span>
                ${c.crisis ? '<span class="bg-red-900/50 text-red-300 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm border border-red-500/30">Crisis</span>' : ''}
            </div>
            ${c.name.length <= 8 ? `
            <div class="flex items-center gap-0" style="margin-top:8px;">
                <h1 class="font-display font-bold text-white leading-none tracking-tighter shrink-0" style="font-size:clamp(54px, 10vw, 120px);">${c.name}</h1>
                <div style="width:4px; align-self:stretch; background:#FFD700; margin:0 24px; border-radius:2px;"></div>
                <div style="flex:1; min-width:0;">
                    <p class="text-gray-300 font-light" style="font-size:clamp(14px, 2vw, 18px);">
                        ${c.description}
                        <br/><span class="text-white font-medium italic mt-2 inline-block">Language: ${c.lang}.</span>
                    </p>
                </div>
            </div>
            ` : `
            <h1 class="font-display font-bold text-white leading-none tracking-tighter mb-2" style="font-size:clamp(54px, 10vw, 120px);">${c.name}</h1>
            <p class="text-gray-300 font-light max-w-3xl mt-6 border-l-4 border-accent pl-6 py-1" style="font-size:clamp(14px, 2vw, 18px);">
                ${c.description}
                <br/><span class="text-white font-medium italic mt-2 inline-block">Language: ${c.lang}.</span>
            </p>
            `}
        </div>
        <div class="space-y-8">
            <h2 class="text-gray-500 font-display font-bold uppercase tracking-[0.3em] mb-4" style="font-size:18px;">Committee Topics</h2>
            ${c.topics.map(t => `
            <div class="topic-card">
                <div class="bg-white p-8 flex items-center justify-center shrink-0 w-full md:w-64 md:border-r border-white/10 relative overflow-hidden">
                    <div class="absolute inset-0 bg-secondary/5"></div>
                    <h3 class="text-5xl font-display font-bold uppercase text-secondary relative z-10 text-center">Topic<br/><span class="text-6xl">${t.label}</span></h3>
                    <span class="material-symbols-outlined absolute -bottom-4 -right-4 text-8xl text-secondary/10">${t.icon}</span>
                </div>
                <div class="p-8 flex-1 flex flex-col justify-center relative">
                    <div class="absolute top-4 right-4 opacity-10"><span class="material-symbols-outlined text-6xl text-white">${t.icon}</span></div>
                    <h4 class="text-2xl text-white font-light leading-snug pr-8">${t.title}</h4>
                </div>
            </div>`).join('')}
            <div style="text-align:center; margin-top:2rem;">
                <button class="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-white px-8 py-3 text-xs font-display uppercase tracking-widest transition-colors rounded-sm shadow-lg cursor-pointer">
                    <span class="material-symbols-outlined text-lg">download</span> Download Study Guide
                </button>
                <p style="color:#9ca3af; font-size:11px; margin-top:8px; font-style:italic;">Both topics are covered in a single study guide PDF.</p>
            </div>
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
        ? `<img alt="${ch.name}" class="w-full h-full rounded-full object-cover transition-all duration-300" src="${ch.img}"/>`
        : `<div class="w-full h-full rounded-full bg-surface-dark flex items-center justify-center text-white font-display font-bold text-lg">${initials}</div>`;
    const hoverOn = ch.img ? `onmouseenter="showChairZoom(this, '${ch.img.replace(/'/g, "\\'")}', '${ch.name.replace(/'/g, "\\'")}')"` : '';
    const hoverOff = ch.img ? `onmouseleave="hideChairZoom()"` : '';
    return `<div class="group flex items-center gap-4 py-2 border-b border-white/5 pb-6 last:border-0">
        <div class="relative shrink-0" ${hoverOn} ${hoverOff}>
            <div class="w-16 h-16 rounded-full border border-white/20 p-1 group-hover:border-accent transition-colors" style="cursor:pointer;">${imgEl}</div>
        </div>
        <div>
            <h5 class="text-base font-bold text-white uppercase tracking-wide">${ch.name}</h5>
            <p class="text-[10px] text-gray-400 font-semibold uppercase mt-1 tracking-wider">${ch.school}</p>
        </div>
    </div>`;
}

// Chair zoom popup — rendered as fixed overlay to avoid overflow clipping
let _chairZoomHideTimer = null;

function showChairZoom(el, imgSrc, name) {
    // Cancel any pending hide
    if (_chairZoomHideTimer) { clearTimeout(_chairZoomHideTimer); _chairZoomHideTimer = null; }

    let popup = document.getElementById('chair-zoom-fixed');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'chair-zoom-fixed';
        popup.style.cssText = 'position:fixed; z-index:9999; pointer-events:none;';
        document.body.appendChild(popup);
    }
    const rect = el.getBoundingClientRect();
    const popupSize = 256;
    // Position to the left of the thumbnail, vertically centered
    let top = rect.top + rect.height / 2 - popupSize / 2;
    let left = rect.left - popupSize - 16;
    // If it would go off-screen left, show to the right instead
    if (left < 8) left = rect.right + 16;
    // Keep within vertical bounds
    if (top < 8) top = 8;
    if (top + popupSize + 30 > window.innerHeight) top = window.innerHeight - popupSize - 40;
    popup.style.top = top + 'px';
    popup.style.left = left + 'px';
    popup.style.display = 'block';
    popup.innerHTML = `<img src="${imgSrc}" alt="${name}" style="width:${popupSize}px; height:${popupSize}px; border-radius:12px; object-fit:cover; border:2px solid #FFD700; box-shadow:0 8px 32px rgba(0,0,0,0.6);"/>
        <p style="text-align:center; color:#fff; font-size:12px; margin-top:6px; font-weight:600; text-shadow:0 1px 4px rgba(0,0,0,0.8);">${name}</p>`;
}

function hideChairZoom() {
    // Small delay so moving between photos doesn't flicker
    _chairZoomHideTimer = setTimeout(() => {
        const popup = document.getElementById('chair-zoom-fixed');
        if (popup) { popup.style.display = 'none'; popup.innerHTML = ''; }
        _chairZoomHideTimer = null;
    }, 50);
}

// ── Locations Page ──────────────────────────────────
let currentVenue = 'tes';
let currentVenueItem = 'google-maps';

const VENUES = [
    {
        id: 'tes', name: 'The English School', icon: 'school', days: 'Days 1 & 4',
        items: [
            { id: 'google-maps', name: 'Google Maps', icon: 'map', desc: 'Calle 170 #15-68, Bogotá, Colombia', embed: 'https://maps.google.com/maps?q=The+English+School,+Bogota&ll=4.7500062,-74.0385556&z=16&output=embed' },
            { id: 'campus-map', name: 'Campus Map', icon: 'location_on', desc: 'School campus layout and key locations.', embed: 'assets/docs/tes-campus-map.pdf#navpanes=0&view=FitH' },
            { id: 'virtual-tour', name: 'Virtual Tour', icon: 'view_in_ar', desc: 'Explore the campus from anywhere in the world.', link: 'https://www.englishschool.edu.co/tour/' }
        ]
    },
    {
        id: 'sabana', name: 'La Sabana', icon: 'account_balance', days: 'Days 2 & 3',
        items: [
            { id: 'google-maps', name: 'Google Maps', icon: 'map', desc: 'Km 7, Autopista Norte de Bogotá, Chía, Cundinamarca, Colombia', embed: 'https://maps.google.com/maps?q=Universidad+de+La+Sabana&ll=4.8615787,-74.0325368&z=16&output=embed' },
            { id: 'campus-map', name: 'Campus Map', icon: 'location_on', desc: 'Navigate the conference venue and key locations.', ph: 'Interactive campus map will be displayed here.' },
            { id: 'virtual-tour', name: 'Virtual Tour', icon: 'view_in_ar', desc: 'Explore the campus from anywhere in the world.', embed: 'https://www.unisabana.edu.co/tour-virtual/' },
            { id: 'promo-video', name: 'Promotional Video', icon: 'play_circle', desc: 'Conference highlights and campus overview.', ph: 'Video player will be embedded here.' }
        ]
    }
];

function renderCampus() {
    const venue = VENUES.find(v => v.id === currentVenue) || VENUES[0];
    const item = venue.items.find(it => it.id === currentVenueItem) || venue.items[0];

    return `
    <!-- Left Sidebar -->
    <aside class="w-72 shrink-0 bg-[#191b42] border-r border-white/5 flex flex-col overflow-y-auto page-enter">
        <div class="p-8 border-b border-white/5">
            <h2 class="text-gray-400 font-display text-xs uppercase tracking-[0.2em]">Conference Venues</h2>
        </div>
        <nav class="flex-1 py-4">
            ${VENUES.map(v => {
        const isActive = v.id === currentVenue;
        return `<div class="mb-1">
                    <a onclick="currentVenue='${v.id}';currentVenueItem='${v.items[0].id}';render()" class="sidebar-link ${isActive ? 'active' : ''} group flex items-center px-8 py-4 transition-all relative overflow-hidden cursor-pointer ${isActive ? 'bg-secondary text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}">
                        ${isActive ? '<div class="absolute left-0 top-0 bottom-0 w-1 bg-accent"></div>' : ''}
                        <span class="material-symbols-outlined mr-4 ${isActive ? 'text-accent' : ''}">${v.icon}</span>
                        <div class="flex flex-col">
                            <span class="font-display uppercase tracking-widest text-sm ${isActive ? 'font-bold' : ''}">${v.name}</span>
                            <span class="text-[10px] ${isActive ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider mt-0.5">${v.days}</span>
                        </div>
                        ${isActive ? '<span class="material-symbols-outlined ml-auto text-sm">expand_less</span>' : ''}
                    </a>
                    ${isActive ? `<div class="bg-[#141539] py-2">${v.items.map(it => `
                        <a onclick="currentVenueItem='${it.id}';render()" class="flex items-center pl-16 pr-8 py-3 cursor-pointer transition-colors ${it.id === currentVenueItem ? 'text-white bg-white/5 border-r-4 border-accent' : 'text-gray-400 hover:text-white hover:bg-white/5'}">
                            <span class="material-symbols-outlined mr-3 text-base ${it.id === currentVenueItem ? 'text-accent' : ''}">${it.icon}</span>
                            <span class="font-display uppercase tracking-widest text-xs ${it.id === currentVenueItem ? 'font-bold text-accent' : ''}">${it.name}</span>
                        </a>`).join('')}</div>` : ''}
                </div>`;
    }).join('')}
        </nav>
        <div class="p-6 mt-auto">
            <div class="bg-black/20 rounded-lg p-5 border border-white/5">
                <h3 class="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-3">Quick Links</h3>
                <div class="space-y-3">
                    <a class="text-xs text-gray-300 hover:text-white flex items-center gap-2 transition-colors cursor-pointer" onclick="navigateTo('schedule')"><span class="material-symbols-outlined text-base">event</span> Calendar</a>
                    <a class="text-xs text-gray-300 hover:text-white flex items-center gap-2 transition-colors cursor-pointer" onclick="navigateTo('committees')"><span class="material-symbols-outlined text-base">groups</span> Committees</a>
                </div>
            </div>
        </div>
    </aside>
    <!-- Center Content -->
    <section class="flex-1 overflow-y-auto custom-scrollbar relative px-8 py-10 lg:px-16 lg:py-12 bg-tesmun-blue">
        <div class="max-w-5xl mx-auto">
            <div class="mb-12 border-b border-white/10 pb-12">
                <div class="flex items-center gap-4 mb-4">
                    <span class="bg-secondary text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">Active Venue</span>
                    <span class="text-accent font-display text-xs uppercase tracking-widest">${venue.days}</span>
                </div>
                <h1 class="text-5xl lg:text-8xl font-display font-bold text-white leading-none tracking-tighter mb-2">${venue.name}</h1>
            </div>
            <div class="space-y-8">
                <h2 class="text-gray-500 font-display text-xs uppercase tracking-[0.3em] mb-4">${item.name}</h2>
                <div class="bg-[#1c1f4a]/50 border border-white/10 rounded-xl overflow-hidden hover:border-accent/30 transition-all">
                    <div class="p-8">
                        <div class="flex items-center gap-3 mb-4">
                            <span class="material-symbols-outlined text-accent text-2xl">${item.icon}</span>
                            <h2 class="font-display text-xl font-bold text-white uppercase tracking-widest">${item.name}</h2>
                        </div>
                        <p class="text-gray-400 text-sm mb-6">${item.desc}</p>
                    </div>
                    ${item.embed
            ? `<div class="border-t border-white/5 ${item.embed.includes('.pdf') ? 'h-[1400px]' : 'h-[600px]'}"><iframe src="${item.embed}" class="w-full h-full" style="border:none" allowfullscreen loading="lazy"></iframe></div>`
            : item.link
                ? `<div class="bg-black/30 border-t border-white/5 py-16 flex items-center justify-center"><div class="text-center"><span class="material-symbols-outlined text-gray-500 text-6xl mb-6">${item.icon}</span><p class="text-gray-400 text-sm mb-8 max-w-md mx-auto">${item.desc}</p><a href="${item.link}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-3 bg-secondary hover:bg-secondary/80 text-white px-8 py-4 rounded-lg font-display uppercase tracking-widest text-sm transition-colors"><span class="material-symbols-outlined">open_in_new</span>Open ${item.name}</a></div></div>`
                : `<div class="bg-black/30 border-t border-white/5 h-96 flex items-center justify-center"><div class="text-center"><span class="material-symbols-outlined text-gray-600 text-6xl mb-3">${item.icon}</span><p class="text-gray-500 text-sm font-display uppercase tracking-widest">${item.ph}</p></div></div>`
        }
                </div>
            </div>
        </div>
    </section>`;
}

// ── Schedule Page ───────────────────────────────────
function renderSchedule() {
    return `<div class="flex-1 overflow-auto page-enter flex items-center justify-center bg-tesmun-blue">
        <img src="assets/images/schedule.jpeg" alt="TESMUN XXII Schedule" class="w-full h-full object-contain" />
    </div>`;
}



// ── Resources / Sources ─────────────────────────────
const RESOURCE_SOURCES = [
    { id: 'handbook', name: 'Handbook', url: 'assets/docs/handbook.pdf', checked: true },
];
let activeResourceId = 'handbook';

function getActiveResource() {
    return RESOURCE_SOURCES.find(s => s.id === activeResourceId) || RESOURCE_SOURCES[0];
}

function selectResourceSource(id) {
    activeResourceId = id;
    pdfDoc = null; // reset so it reloads
    document.getElementById('app').innerHTML = renderHandbook();
}

function toggleAllSources() {
    const allChecked = RESOURCE_SOURCES.every(s => s.checked);
    RESOURCE_SOURCES.forEach(s => s.checked = !allChecked);
    document.getElementById('app').innerHTML = renderHandbook();
}

function toggleSource(id) {
    const src = RESOURCE_SOURCES.find(s => s.id === id);
    if (src) src.checked = !src.checked;
    document.getElementById('app').innerHTML = renderHandbook();
}

// ── PDF Viewer State ────────────────────────────────
const HANDBOOK_PDF_URL = 'assets/docs/handbook.pdf';
let pdfDoc = null;
let pdfScale = 1.5;
let pdfRendering = false;
let pdfPendingRender = null;

// ── Panel State ─────────────────────────────────────
let leftPanelOpen = true;
let rightPanelOpen = true;
let leftPanelWidth = 288; // 18rem = 288px
let rightPanelWidth = 320; // 20rem = 320px

function toggleLeftPanel() {
    leftPanelOpen = !leftPanelOpen;
    const panel = document.getElementById('left-panel');
    const btn = document.getElementById('left-toggle-icon');
    if (panel) {
        panel.style.width = leftPanelOpen ? leftPanelWidth + 'px' : '0px';
        panel.style.minWidth = leftPanelOpen ? leftPanelWidth + 'px' : '0px';
        panel.style.overflow = leftPanelOpen ? '' : 'hidden';
        panel.style.padding = leftPanelOpen ? '' : '0';
        panel.style.opacity = leftPanelOpen ? '1' : '0';
    }
    if (btn) btn.textContent = leftPanelOpen ? 'left_panel_close' : 'left_panel_open';
}

function toggleRightPanel() {
    rightPanelOpen = !rightPanelOpen;
    const panel = document.getElementById('right-panel');
    const btn = document.getElementById('right-toggle-icon');
    if (panel) {
        panel.style.width = rightPanelOpen ? rightPanelWidth + 'px' : '0px';
        panel.style.minWidth = rightPanelOpen ? rightPanelWidth + 'px' : '0px';
        panel.style.overflow = rightPanelOpen ? '' : 'hidden';
        panel.style.padding = rightPanelOpen ? '' : '0';
        panel.style.opacity = rightPanelOpen ? '1' : '0';
    }
    if (btn) btn.textContent = rightPanelOpen ? 'right_panel_close' : 'right_panel_open';
}

function initResizeHandles() {
    const leftHandle = document.getElementById('left-resize-handle');
    const rightHandle = document.getElementById('right-resize-handle');

    function makeDraggable(handle, side) {
        if (!handle) return;
        let startX, startW;
        handle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            const panel = document.getElementById(side + '-panel');
            if (!panel) return;
            startX = e.clientX;
            startW = panel.getBoundingClientRect().width;
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';

            function onMove(ev) {
                const delta = side === 'left' ? ev.clientX - startX : startX - ev.clientX;
                const newW = Math.max(200, Math.min(500, startW + delta));
                panel.style.width = newW + 'px';
                panel.style.minWidth = newW + 'px';
                if (side === 'left') leftPanelWidth = newW;
                else rightPanelWidth = newW;
            }
            function onUp() {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
            }
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
        });
    }
    makeDraggable(leftHandle, 'left');
    makeDraggable(rightHandle, 'right');
}

function renderHandbook() {
    // Schedule PDF load and resize handles after DOM injection
    setTimeout(() => { initPdfViewer(); initResizeHandles(); }, 0);

    const sourceListHtml = RESOURCE_SOURCES.map((src, i) => `
            <div class="group flex items-center gap-3 px-6 py-3 cursor-pointer transition-all hover:bg-white/5 ${src.id === activeResourceId ? 'bg-secondary/20 border-l-2 border-accent' : 'border-l-2 border-transparent'}" onclick="selectResourceSource('${src.id}')">
                <span class="source-cb w-5 h-5 rounded border-2 ${src.checked ? 'bg-[#00b894] border-[#00b894]' : 'border-white'} flex items-center justify-center transition-colors cursor-pointer shrink-0" data-source-id="${src.id}" onclick="event.stopPropagation(); toggleSource('${src.id}')">
                    ${src.checked ? '<span class="material-symbols-outlined text-white text-xs" style="font-size:14px">check</span>' : ''}
                </span>
                <span class="material-symbols-outlined ${src.id === activeResourceId ? 'text-accent' : 'text-secondary'} text-lg shrink-0">picture_as_pdf</span>
                <span class="text-sm ${src.id === activeResourceId ? 'text-white font-bold' : 'text-gray-300'} truncate flex-1">${src.name}</span>
                <a href="${src.url}" download="${src.name}.pdf" onclick="event.stopPropagation()" class="shrink-0 text-secondary hover:text-red-400 transition-colors" title="Download ${src.name}">
                    <span class="material-symbols-outlined text-base">download</span>
                </a>
            </div>`).join('');

    const allChecked = RESOURCE_SOURCES.every(s => s.checked);
    const checkedCount = RESOURCE_SOURCES.filter(s => s.checked).length;

    return `
    <!-- Left Sidebar – Sources Panel -->
    <aside id="left-panel" class="shrink-0 bg-[#191b42] border-r border-white/5 flex flex-col overflow-y-auto page-enter panel-transition" style="width:${leftPanelOpen ? leftPanelWidth + 'px' : '0px'}; min-width:${leftPanelOpen ? leftPanelWidth + 'px' : '0px'}; opacity:${leftPanelOpen ? '1' : '0'}; ${leftPanelOpen ? '' : 'overflow:hidden; padding:0;'}">
        <div class="p-8 pb-4">
            <h3 class="text-white font-display text-2xl font-bold uppercase leading-tight">Resources</h3>
            <h2 class="text-gray-400 font-display text-xs uppercase tracking-[0.2em] mt-1" style="padding-left:32px;">Download or Select to Chat</h2>
            <div class="h-0.5 w-12 bg-accent mt-4"></div>
        </div>

        <!-- Select All -->
        <div class="flex items-center justify-between px-6 py-3 border-b border-white/5">
            <div class="flex items-center gap-3 cursor-pointer" onclick="toggleAllSources()">
                <span class="w-5 h-5 rounded border-2 ${allChecked ? 'bg-[#00b894] border-[#00b894]' : 'border-white'} flex items-center justify-center transition-colors">
                    ${allChecked ? '<span class="material-symbols-outlined text-white text-xs" style="font-size:14px">check</span>' : ''}
                </span>
                <span class="text-xs text-gray-400 font-display uppercase tracking-wider">Select all sources</span>
            </div>
            <span class="text-[10px] text-gray-500 font-mono">${checkedCount}/${RESOURCE_SOURCES.length}</span>
        </div>

        <!-- Source List -->
        <nav class="flex-1 py-2 overflow-y-auto custom-scrollbar">
            ${sourceListHtml}
        </nav>
    </aside>

    <!-- Left Resize Handle -->
    <div id="left-resize-handle" class="resize-handle"></div>

    <!-- Center – PDF Viewer -->
    <div class="flex-1 flex flex-col overflow-hidden page-enter" style="min-width:200px">
        <!-- Toolbar -->
        <div class="shrink-0 bg-[#191b42] border-b border-white/10 px-2 py-3 flex items-center justify-between gap-2 flex-wrap">
            <!-- Left Panel Toggle -->
            <button onclick="toggleLeftPanel()" class="text-gray-400 hover:text-white transition-colors shrink-0" title="Toggle Resources Panel">
                <span id="left-toggle-icon" class="material-symbols-outlined text-lg">${leftPanelOpen ? 'left_panel_close' : 'left_panel_open'}</span>
            </button>
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
                <!-- Print -->
                <button onclick="pdfPrint()" class="bg-black/30 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 rounded-lg px-3 py-1.5 transition-colors inline-flex items-center gap-2" title="Print">
                    <span class="material-symbols-outlined text-lg">print</span>
                    <span class="text-xs font-display uppercase tracking-widest hidden sm:inline">Print</span>
                </button>
            </div>
            <!-- Right Panel Toggle -->
            <button onclick="toggleRightPanel()" class="text-gray-400 hover:text-white transition-colors shrink-0" title="Toggle AI Assistant">
                <span id="right-toggle-icon" class="material-symbols-outlined text-lg">${rightPanelOpen ? 'right_panel_close' : 'right_panel_open'}</span>
            </button>
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
    </div>

    <!-- Right Resize Handle -->
    <div id="right-resize-handle" class="resize-handle"></div>

    <!-- Right Sidebar – AI Assistant -->
    <aside id="right-panel" class="shrink-0 bg-[#16183d] border-l border-white/5 flex flex-col overflow-hidden panel-transition" style="width:${rightPanelOpen ? rightPanelWidth + 'px' : '0px'}; min-width:${rightPanelOpen ? rightPanelWidth + 'px' : '0px'}; opacity:${rightPanelOpen ? '1' : '0'}; ${rightPanelOpen ? '' : 'overflow:hidden; padding:0;'}">
        <div class="p-8 pb-4">
            <h2 class="text-gray-400 font-display text-xs uppercase tracking-[0.2em] mb-1">AI Assistant</h2>
            <h3 class="text-white font-display text-2xl font-bold uppercase leading-tight">Ask TESMUN</h3>
            <div class="h-0.5 w-12 bg-accent mt-4"></div>
        </div>
        <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4" id="chat-messages">
            <div class="flex gap-3">
                <div class="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-accent text-sm">smart_toy</span>
                </div>
                <div class="bg-white/5 rounded-lg rounded-tl-none p-4 text-sm text-gray-300 leading-relaxed">
                    Welcome!<br><br>I'm an AI chatbot that provides answers ONLY based on the selected documents.<br><br>Try asking about rules of procedure, committee topics, or anything else in the handbook!<br><br>Click a <button class="citation-chip" style="cursor:default;pointer-events:none">1</button> to jump to that page in the document.
                </div>
            </div>
        </div>
        <div class="p-4 border-t border-white/5 bg-black/20">
            <div class="flex items-center gap-2 bg-[#191b42] rounded-lg border border-white/10 px-3 py-2">
                <input type="text" id="chat-input" placeholder="Ask about the selected sources…"
                    class="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-500"
                    onkeydown="if(event.key==='Enter')sendChatMessage()" />
                <button onclick="sendChatMessage()" class="text-gray-500 hover:text-accent transition-colors" title="Send">
                    <span class="material-symbols-outlined text-lg">send</span>
                </button>
            </div>
            <p class="text-gray-600 text-[10px] mt-2 text-center uppercase tracking-wider">Powered by Gemini</p>
        </div>
    </aside>`;
}

// ── Chat System ─────────────────────────────────────
const CHAT_WORKER_URL = 'https://tesmun-chat.tesmun-xxii-api.workers.dev/chat';
let chatHistory = [];
let lastCitations = []; // store citations from last bot response

// Source text cache: loaded once per session from JSON files
const sourceTextCache = {};

async function loadSourceText(sourceId) {
    if (sourceTextCache[sourceId]) return sourceTextCache[sourceId];
    try {
        const res = await fetch(`assets/docs/${sourceId}.json`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        sourceTextCache[sourceId] = data;
        return data;
    } catch (err) {
        console.error(`Failed to load source ${sourceId}:`, err);
        return null;
    }
}

async function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const msg = input?.value?.trim();
    if (!msg) return;
    input.value = '';

    // Collect selected sources
    const checkedSources = RESOURCE_SOURCES.filter(s => s.checked);

    // Guard: no sources selected
    if (!checkedSources.length) {
        appendChatBubble('bot', 'Please select at least one source document in the left panel to search.', []);
        return;
    }

    // Add user bubble
    appendChatBubble('user', msg, []);
    chatHistory.push({ role: 'user', text: msg });

    // Show typing indicator with source count
    const typingId = 'typing-' + Date.now();
    appendTypingIndicator(typingId, checkedSources.map(s => s.name));

    // Load source text data in parallel
    const sourceData = (await Promise.all(
        checkedSources.map(s => loadSourceText(s.id))
    )).filter(Boolean);

    if (!sourceData.length) {
        removeTypingIndicator(typingId);
        appendChatBubble('bot', 'Unable to load source documents. Please refresh and try again.', []);
        return;
    }

    // Call Worker
    fetch(CHAT_WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message: msg,
            history: chatHistory.slice(-10),
            sourceData,
        }),
    })
        .then(res => res.json())
        .then(data => {
            removeTypingIndicator(typingId);
            const reply = data.reply || data.error || 'Sorry, something went wrong.';
            const citations = data.citations || [];
            lastCitations = citations;
            appendChatBubble('bot', reply, citations);
            chatHistory.push({ role: 'model', text: reply });
        })
        .catch(err => {
            removeTypingIndicator(typingId);
            appendChatBubble('bot', 'Unable to reach the server. Please try again.', []);
            console.error('Chat error:', err);
        });
}

/**
 * Render a chat bubble. For bot messages, parse [1] citation chips.
 */
function appendChatBubble(role, text, citations) {
    const container = document.getElementById('chat-messages');
    if (!container) return;
    const div = document.createElement('div');
    div.className = 'flex gap-3' + (role === 'user' ? ' flex-row-reverse' : '');
    const iconBg = role === 'user' ? 'bg-secondary/30' : 'bg-accent/20';
    const iconColor = role === 'user' ? 'text-white' : 'text-accent';
    const iconName = role === 'user' ? 'person' : 'smart_toy';
    const bubbleBg = role === 'user' ? 'bg-secondary/20 rounded-tr-none' : 'bg-white/5 rounded-tl-none';

    // Process text: escape HTML first, then inject citation chips for bot messages
    let processedText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');

    if (role === 'bot' && citations && citations.length > 0) {
        // Replace [1], [2] etc. with clickable citation chips
        processedText = processedText.replace(/\[(\d+)\]/g, (match, num) => {
            const cit = citations.find(c => c.id === parseInt(num, 10));
            if (cit) {
                return `<button class="citation-chip" onclick="scrollToCitation(${cit.id})" title="${cit.sourceName} — Page ${cit.page}">${num}</button>`;
            }
            return match;
        });
    }

    // Build references section for bot messages with citations
    let refsHtml = '';
    if (role === 'bot' && citations && citations.length > 0) {
        const refItems = citations.map(c =>
            `<div class="citation-ref" onclick="scrollToCitation(${c.id})">
                <span class="citation-ref-num">${c.id}</span>
                <span class="citation-ref-text">${c.sourceName} — p.${c.page}</span>
            </div>`
        ).join('');
        refsHtml = `<div class="citation-refs">
            <div class="citation-refs-header">Sources</div>
            ${refItems}
        </div>`;
    }

    div.innerHTML = `
        <div class="w-8 h-8 rounded-full ${iconBg} flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined ${iconColor} text-sm">${iconName}</span>
        </div>
        <div class="${bubbleBg} rounded-lg p-4 text-sm text-gray-300 leading-relaxed max-w-[85%]">
            ${processedText}
            ${refsHtml}
        </div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

/**
 * Scroll PDF viewer to the page cited by citation ID.
 */
function scrollToCitation(citationId) {
    const cit = lastCitations.find(c => c.id === citationId);
    if (!cit) return;

    // If the cited source is not the active document, switch to it first
    if (cit.sourceId !== activeResourceId) {
        const src = RESOURCE_SOURCES.find(s => s.id === cit.sourceId);
        if (src) {
            activeResourceId = cit.sourceId;
            pdfDoc = null;
            // We need to re-render, then scroll after PDF loads
            document.getElementById('app').innerHTML = renderHandbook();
            // Wait for PDF to load, then scroll
            const checkAndScroll = setInterval(() => {
                if (pdfDoc && document.getElementById(`pdf-page-${cit.page}`)) {
                    clearInterval(checkAndScroll);
                    scrollToPageWithHighlight(cit.page);
                }
            }, 200);
            setTimeout(() => clearInterval(checkAndScroll), 10000); // safety timeout
            return;
        }
    }

    scrollToPageWithHighlight(cit.page);
}

/**
 * Scroll to a PDF page and briefly highlight it with a glow effect.
 */
function scrollToPageWithHighlight(pageNum) {
    const el = document.getElementById(`pdf-page-${pageNum}`);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.add('page-citation-glow');
    setTimeout(() => el.classList.remove('page-citation-glow'), 2500);
    updatePageInfo();
}

function appendTypingIndicator(id, sourceNames) {
    const container = document.getElementById('chat-messages');
    if (!container) return;
    const div = document.createElement('div');
    div.id = id;
    div.className = 'flex gap-3';
    const searchLabel = sourceNames && sourceNames.length
        ? `Searching ${sourceNames.length} source${sourceNames.length > 1 ? 's' : ''}…`
        : 'Thinking…';
    div.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-accent text-sm animate-pulse">smart_toy</span>
        </div>
        <div class="bg-white/5 rounded-lg rounded-tl-none p-4 text-sm text-gray-400">
            <div class="flex items-center gap-2">
                <span class="inline-flex gap-1"><span class="animate-bounce" style="animation-delay:0ms">●</span><span class="animate-bounce" style="animation-delay:150ms">●</span><span class="animate-bounce" style="animation-delay:300ms">●</span></span>
                <span class="text-[10px] uppercase tracking-wider text-gray-500">${searchLabel}</span>
            </div>
        </div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator(id) {
    document.getElementById(id)?.remove();
}

function initPdfViewer() {
    if (typeof pdfjsLib === 'undefined') {
        document.getElementById('pdf-pages').innerHTML = '<p class="text-red-400 p-8">PDF.js failed to load. Please refresh.</p>';
        return;
    }
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    pdfjsLib.getDocument(getActiveResource().url).promise.then(doc => {
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
    const printWindow = window.open(getActiveResource().url);
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
