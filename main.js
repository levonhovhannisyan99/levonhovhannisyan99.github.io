const I18N = {
    hy: {
        pageTitle: "Լևոն Հովհաննիսյան - Վեբ ծրագրավորող",
        langLabel: "Լեզու",
        themeLabel: "Թեմա",
        themeSystem: "Համակարգային",
        themeLight: "Բաց",
        themeDark: "Մուգ",
        skills: "Հմտություններ",
        technologies: "Տեխնոլոգիաներ",
        projects: "Նախագծեր",
        empty: "Նախագծերը շուտով կավելացվեն...",
        photoAlt: "Լուսանկար",
        copy: "Պատճենել",
        copied: "Պատճենվեց",
    },
    en: {
        pageTitle: "Levon Hovhannisyan - Web Developer",
        langLabel: "Language",
        themeLabel: "Theme",
        themeSystem: "System",
        themeLight: "Light",
        themeDark: "Dark",
        skills: "Skills",
        technologies: "Technologies",
        projects: "Projects",
        empty: "Projects will be added soon...",
        photoAlt: "Photo",
        copy: "Copy",
        copied: "Copied",
    },
};

const PLACEHOLDER_IMG = "https://via.placeholder.com/300x200?text=No+Image";
const PLACEHOLDER_PHOTO = "https://via.placeholder.com/150?text=Photo";

const state = {
    lang: localStorage.getItem("portfolio-lang") || "hy",
    theme: localStorage.getItem("portfolio-theme") || "system",
    contact: null,
    skills: [],
    projects: [],
};

const pick = (val, lang) => {
    if (val == null) return "";
    if (typeof val === "string") return val;
    return val[lang] || val.en || val.hy || "";
};

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[c]));

const mql = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme() {
    const effective = state.theme === "system"
        ? (mql.matches ? "dark" : "light")
        : state.theme;
    document.documentElement.setAttribute("data-theme", effective);
}

mql.addEventListener("change", () => {
    if (state.theme === "system") applyTheme();
});

function renderStatic() {
    const t = I18N[state.lang];
    document.documentElement.setAttribute("lang", state.lang);
    document.title = t.pageTitle;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (t[key] != null) el.textContent = t[key];
    });
}

function contactItem({ href, icon, label, copyValue, external }) {
    const t = I18N[state.lang];
    const target = external ? `target="_blank" rel="noopener noreferrer"` : "";
    return `
        <div class="contact-item">
            <a href="${escapeHtml(href)}" ${target} class="contact-link">
                <img src="${escapeHtml(icon)}" alt="" class="contact-icon" onerror="this.style.display='none'" />
                <span class="contact-label">${escapeHtml(label)}</span>
            </a>
            <button type="button" class="copy-btn" data-copy="${escapeHtml(copyValue)}"
                aria-label="${t.copy}" title="${t.copy}">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span class="copy-text">${t.copy}</span>
            </button>
        </div>
    `;
}

function renderProfile() {
    if (!state.contact) return;
    const t = I18N[state.lang];
    const c = state.contact;

    const nameEl = document.getElementById("profile-name");
    const titleEl = document.getElementById("profile-title");
    const photoEl = document.getElementById("profile-img");

    nameEl.textContent = pick(c.name, state.lang);
    titleEl.textContent = pick(c.title, state.lang);
    photoEl.alt = pick(c.name, state.lang) || t.photoAlt;
    photoEl.onerror = () => { photoEl.src = PLACEHOLDER_PHOTO; };

    const items = [];

    items.push(contactItem({
        href: `mailto:${c.email.address}`,
        icon: c.email.icon,
        label: c.email.address,
        copyValue: c.email.address,
        external: false,
    }));

    c.phones.forEach((p) => {
        items.push(contactItem({
            href: `tel:${p.number.replace(/\s/g, "")}`,
            icon: p.icon,
            label: p.number,
            copyValue: p.number,
            external: false,
        }));
    });

    c.socials.forEach((s) => {
        items.push(contactItem({
            href: s.url,
            icon: s.icon,
            label: pick(s.name, state.lang),
            copyValue: s.url,
            external: true,
        }));
    });

    const block = document.getElementById("contact-block");
    block.innerHTML = `<div class="contact-list">${items.join("")}</div>`;

    block.querySelectorAll(".copy-btn").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const value = btn.getAttribute("data-copy") || "";
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(value);
                } else {
                    const ta = document.createElement("textarea");
                    ta.value = value;
                    ta.style.position = "fixed";
                    ta.style.opacity = "0";
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand("copy");
                    document.body.removeChild(ta);
                }
                btn.classList.add("copied");
                const txt = btn.querySelector(".copy-text");
                const original = txt.textContent;
                txt.textContent = I18N[state.lang].copied;
                setTimeout(() => {
                    btn.classList.remove("copied");
                    txt.textContent = original;
                }, 1500);
            } catch (err) {
                console.error("Copy failed:", err);
            }
        });
    });
}

function renderSkills() {
    document.getElementById("skills-list").innerHTML = state.skills
        .map((s) => `<span class="skill-tag">${escapeHtml(pick(s, state.lang))}</span>`)
        .join("");
}

function renderProjects() {
    const t = I18N[state.lang];
    const list = document.getElementById("projects-list");
    if (!state.projects.length) {
        list.innerHTML = `<div class="empty-state"><p>${t.empty}</p></div>`;
        return;
    }
    list.innerHTML = state.projects.map((p) => `
        <div class="project-card" data-link="${escapeHtml(p.link)}">
            <img src="${escapeHtml(p.image)}" alt="${escapeHtml(pick(p.title, state.lang))}"
                class="project-img" onerror="this.src='${PLACEHOLDER_IMG}'" />
            <div class="project-info">
                <h3 class="project-title">${escapeHtml(pick(p.title, state.lang))}</h3>
            </div>
        </div>
    `).join("");
    list.querySelectorAll(".project-card").forEach((card) => {
        card.addEventListener("click", () => {
            window.open(card.dataset.link, "_blank", "noopener");
        });
    });
}

function renderAll() {
    renderStatic();
    renderProfile();
    renderSkills();
    renderProjects();
}

function initControls() {
    const langSel = document.getElementById("lang-select");
    const themeSel = document.getElementById("theme-select");

    langSel.value = state.lang;
    themeSel.value = state.theme;

    langSel.addEventListener("change", (e) => {
        state.lang = e.target.value;
        localStorage.setItem("portfolio-lang", state.lang);
        renderAll();
    });

    themeSel.addEventListener("change", (e) => {
        state.theme = e.target.value;
        localStorage.setItem("portfolio-theme", state.theme);
        applyTheme();
    });
}

async function loadData() {
    try {
        const [contact, skills, projects] = await Promise.all([
            fetch("data/contact.json").then((r) => r.json()),
            fetch("data/skills.json").then((r) => r.json()),
            fetch("data/projects.json").then((r) => r.json()),
        ]);
        state.contact = contact;
        state.skills = skills;
        state.projects = projects;
    } catch (err) {
        console.error("Failed to load data:", err);
    }
    renderAll();
}

document.addEventListener("DOMContentLoaded", () => {
    applyTheme();
    initControls();
    renderStatic();
    loadData();
});
