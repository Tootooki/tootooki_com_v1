// --- DATA: GLOBAL REMOTE TALENT POOL ---
const candidates = [
    {
        name: "Prateek S.",
        role: "Senior Full-Stack Developer",
        country: "India",
        rate: 8,
        skills: ["React", "Node.js", "Python", "AWS"],
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        bio: "5+ years building scale SaaS apps. Ex-Infosys."
    },
    {
        name: "Maria Santos",
        role: "Executive Virtual Assistant",
        country: "Philippines",
        rate: 2,
        skills: ["Admin Support", "HubSpot", "Canva", "Calendar"],
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        bio: "Specializes in founder operations, inbox management, and CRM maintenance."
    },
    {
        name: "Amit Patel",
        role: "Data Analyst & SQL Expert",
        country: "India",
        rate: 6,
        skills: ["Python", "SQL", "Tableau", "PowerBI"],
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        bio: "Translates complex datasets into actionable dashboard metrics."
    },
    {
        name: "Nattaporn K.",
        role: "Customer Success Lead",
        country: "Thailand",
        rate: 5,
        skills: ["Zendesk", "Shopify", "Intercom", "Support"],
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        bio: "Fluent in English. Managing client queries with 98% satisfaction score."
    },
    {
        name: "Jessica Reyes",
        role: "SEO & Content Strategist",
        country: "Philippines",
        rate: 5,
        skills: ["SEO", "Copywriting", "Figma", "WordPress"],
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        bio: "Helps SaaS brands grow organic traffic via high-converting articles."
    },
    {
        name: "Rohan Mehta",
        role: "DevOps & Cloud Architect",
        country: "India",
        rate: 12,
        skills: ["Docker", "Kubernetes", "CI/CD", "AWS"],
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
        bio: "Specializes in secure, scalable cloud setups and continuous deployments."
    }
];

// --- CUSTOM CURSOR LOGIC ---
const cursor = document.getElementById('customCursor');
const cursorDot = document.getElementById('customCursorDot');

document.addEventListener('mousemove', (e) => {
    // Smooth cursor movement
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
});

// Animate cursor on hovering hoverable elements
const addCursorHover = () => {
    const hoverables = document.querySelectorAll('button, a, .switcher-tab, .profile-card, .tilt-card, select, input');
    hoverables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.style.width = '35px';
            cursor.style.height = '35px';
            cursor.style.backgroundColor = 'rgba(0, 242, 254, 0.05)';
        });
        item.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
        });
    });
};
addCursorHover();


// --- TAB SWITCHER LOGIC ---
const tabs = document.querySelectorAll('.switcher-tab');
const panels = document.querySelectorAll('.tab-panel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Hide all panels
        panels.forEach(p => p.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');
        // Show corresponding panel
        const targetPanel = document.getElementById(tab.dataset.tab);
        targetPanel.classList.add('active');

        // If switching to AI Matcher, trigger the terminal chat animation
        if (tab.dataset.tab === 'ai-matcher') {
            triggerAIChatSimulation();
        }
    });
});


// --- DIRECT HIRE PROFILE DIRECTORY LOGIC ---
const profilesContainer = document.getElementById('profilesContainer');
const skillSearch = document.getElementById('skillSearch');
const countryFilter = document.getElementById('countryFilter');
const rateFilter = document.getElementById('rateFilter');

const renderProfiles = (filteredCandidates) => {
    profilesContainer.innerHTML = '';
    
    if (filteredCandidates.length === 0) {
        profilesContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">
                <p>No candidates found matching your criteria.</p>
            </div>
        `;
        return;
    }

    filteredCandidates.forEach(candidate => {
        const card = document.createElement('div');
        card.className = 'profile-card glass-panel';
        card.innerHTML = `
            <div class="profile-header">
                <img src="${candidate.avatar}" alt="${candidate.name}" class="profile-avatar">
                <div class="profile-info">
                    <h3>${candidate.name}</h3>
                    <p>${candidate.role}</p>
                    <span class="country-tag">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        ${candidate.country}
                    </span>
                </div>
            </div>
            <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px; flex-grow: 1;">${candidate.bio}</p>
            <div class="profile-rate">
                $${candidate.rate}<span> / hour</span>
            </div>
            <div class="profile-skills">
                ${candidate.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <button class="profile-action-btn">Connect Directly</button>
        `;
        profilesContainer.appendChild(card);
    });
    addCursorHover(); // Rebind hover states for new cards
};

const filterCandidates = () => {
    const searchVal = skillSearch.value.toLowerCase();
    const countryVal = countryFilter.value;
    const rateVal = rateFilter.value;

    const filtered = candidates.filter(candidate => {
        // 1. Skill/Role Match
        const matchesSkill = candidate.role.toLowerCase().includes(searchVal) || 
                             candidate.skills.some(skill => skill.toLowerCase().includes(searchVal));

        // 2. Country Match
        const matchesCountry = countryVal === 'all' || candidate.country === countryVal;

        // 3. Hourly Rate Match
        let matchesRate = true;
        if (rateVal === 'low') {
            matchesRate = candidate.rate >= 2 && candidate.rate <= 5;
        } else if (rateVal === 'medium') {
            matchesRate = candidate.rate >= 6 && candidate.rate <= 10;
        } else if (rateVal === 'high') {
            matchesRate = candidate.rate > 10;
        }

        return matchesSkill && matchesCountry && matchesRate;
    });

    renderProfiles(filtered);
};

skillSearch.addEventListener('keyup', filterCandidates);
countryFilter.addEventListener('change', filterCandidates);
rateFilter.addEventListener('change', filterCandidates);

const resetFilters = () => {
    skillSearch.value = '';
    countryFilter.value = 'all';
    rateFilter.value = 'all';
    renderProfiles(candidates);
};

// Initial Render
renderProfiles(candidates);


// --- AI TERMINAL CHAT SIMULATOR LOGIC ---
const terminalChat = document.getElementById('terminalChat');
let typingTimeout;

const triggerAIChatSimulation = () => {
    // Clear previous simulation
    clearTimeout(typingTimeout);
    terminalChat.innerHTML = '';

    const dialogue = [
        { sender: 'user', text: 'Locate a Senior React Developer in India under $10/hr.' },
        { sender: 'ai', text: '⚡ Initializing semantic scanner... Scanning 4,892 verified profiles in India.' },
        { sender: 'ai', text: '🔎 Checking repository commits, parsing project payloads, and checking live response latencies...' },
        { sender: 'ai', text: '✅ Analysis Complete. Found 2 matches matching "React" & "< $10/hr" in India.' },
        { sender: 'ai', text: '⭐ Best Match: Prateek S. ($8/hr) | 98% skill affinity. Active now. Ready to interview.' }
    ];

    let currentLineIndex = 0;

    const typeLine = () => {
        if (currentLineIndex >= dialogue.length) return;

        const currentLine = dialogue[currentLineIndex];
        
        // Show Typing Indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chat-bubble ai typing-indicator';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        terminalChat.appendChild(typingIndicator);
        terminalChat.scrollTop = terminalChat.scrollHeight;

        // Simulate thinking delay, then output real message
        typingTimeout = setTimeout(() => {
            // Remove typing indicator
            terminalChat.removeChild(typingIndicator);

            const bubble = document.createElement('div');
            bubble.className = `chat-bubble ${currentLine.sender}`;
            bubble.textContent = currentLine.text;
            terminalChat.appendChild(bubble);
            terminalChat.scrollTop = terminalChat.scrollHeight;

            currentLineIndex++;
            // Schedule next line
            typingTimeout = setTimeout(typeLine, 1000);
        }, 1200);
    };

    typeLine();
};


// --- 3D INTERACTIVE TILT CARD EFFECT ---
const tiltCards = document.querySelectorAll('[data-tilt]');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        
        // Get mouse position relative to center of the card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate tilt amounts (-15deg to +15deg)
        const tiltX = ((y - centerY) / centerY) * -15;
        const tiltY = ((x - centerX) / centerX) * 15;
        
        // Apply tilt transformation
        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', () => {
        // Reset tilt on exit
        card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
});


// --- NAVIGATION UTILITIES ---
const scrollToElement = (id) => {
    const target = document.getElementById(id);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
};

const switchHubTab = (tabId) => {
    const tabButton = document.querySelector(`.switcher-tab[data-tab="${tabId}"]`);
    if (tabButton) {
        tabButton.click();
    }
    scrollToElement('hub');
};
