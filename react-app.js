/* =========================================================
   REACT PARTS OF THE PORTFOLIO
   No build step needed: React is loaded from a CDN in index.html
   and components use React.createElement (shortened to `h`).

   To add a project, add one object to the PROJECTS list below.
========================================================= */
(function () {
    "use strict";

    if (typeof React === "undefined" || typeof ReactDOM === "undefined") {
        console.warn("React failed to load; skills/projects sections show their fallback text.");
        return;
    }

    const h = React.createElement;
    const { useState, useMemo } = React;

    /* ---------------- DATA ---------------- */

    const SKILL_GROUPS = [
        {
            title: "Frontend", icon: "fa-solid fa-laptop-code",
            skills: [
                { name: "HTML5", icon: "fab fa-html5" },
                { name: "CSS3", icon: "fab fa-css3-alt" },
                { name: "Bootstrap 5", icon: "fab fa-bootstrap" },
                { name: "JavaScript", icon: "fab fa-js" },
                { name: "React", icon: "fab fa-react" }
            ]
        },
        {
            title: "Backend & Database", icon: "fa-solid fa-server",
            skills: [
                { name: "Python", icon: "fab fa-python" },
                { name: "Django", icon: "fa-solid fa-leaf" },
                { name: "MySQL", icon: "fa-solid fa-database" },
                { name: "SQL", icon: "fa-solid fa-database" }
            ]
        },
        {
            title: "Tools & Practices", icon: "fa-solid fa-screwdriver-wrench",
            skills: [
                { name: "Git & GitHub", icon: "fab fa-github" },
                { name: "Responsive Design", icon: "fa-solid fa-mobile-screen" },
                { name: "Cross-browser Testing", icon: "fa-solid fa-globe" }
            ]
        }
    ];

    const PROJECTS = [
        {
            title: "SkillForge",
            category: "Full Stack",
            image: "images/skillforge.webp",
            description: "A web-based learning platform built with Django, featuring backend logic, URL routing, reusable templates, CRUD operations and responsive, cross-device interfaces.",
            tech: ["Python", "Django", "MySQL", "JavaScript", "Git/GitHub"],
            github: "https://github.com/Priyu-code14/SkillForge"
        },
        {
            title: "Foodie – Food Ordering App",
            category: "Full Stack",
            image: "images/foodie.webp",
            description: "A full-stack ordering app with registration, login, food menu, cart, checkout, payment flow and order history, using Django ORM models on MySQL.",
            tech: ["Python", "Django", "MySQL", "Bootstrap", "JavaScript"],
            github: "https://github.com/Priyu-code14/Foodie"
        },
        {
            title: "ShopSphere – Fashion E-Commerce",
            category: "Frontend",
            image: "images/shopsphere.webp",
            description: "An interactive fashion store frontend with product browsing, category navigation, cart, checkout, order-success and wishlist pages, powered by client-side JavaScript.",
            tech: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
            demo: "https://priyu-code14.github.io/ShopSphere/",
            github: "https://github.com/Priyu-code14/ShopSphere"
        },
        {
            title: "Responsive Cafe Website",
            category: "Frontend",
            image: "images/cafe.webp",
            description: "A responsive 5-page cafe website with dynamic menu filtering, mobile-first layouts and reusable interactive components. Tested across browsers for reliability.",
            tech: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript"],
            demo: "https://priyu-code14.github.io/PK-Treats-Cafe/",
            github: "https://github.com/Priyu-code14/PK-Treats-Cafe"
        },
        {
            title: "Digital Queue Management & Analytics",
            category: "Python",
            image: "images/queue.webp",
            description: "A database-driven desktop app for customer registration, token generation and counter workflows, with password-hashed authentication, queue history and reporting dashboards.",
            tech: ["Python", "Tkinter", "MySQL", "SQL", "Git/GitHub"],
            github: "https://github.com/Priyu-code14/Digital-Queue-Management-System"
        },
        {
            title: "Bank Management System",
            category: "Python",
            image: "images/bank.webp",
            description: "A modular Python application for account creation, deposits, withdrawals, transfers and balance checks, with input validation, exception handling and file-based storage.",
            tech: ["Python", "File Handling", "Exception Handling", "Git"],
            github: "https://github.com/Priyu-code14/Bank-Management-System"
        }
    ];

    const FILTERS = ["All", "Full Stack", "Frontend", "Python"];

    /* ---------------- COMPONENTS ---------------- */

    function SkillGroup({ group }) {
        return h("div", { className: "skill-group" },
            h("div", { className: "skill-group-head" },
                h("span", { className: "ico", "aria-hidden": "true" }, h("i", { className: group.icon })),
                h("h3", null, group.title)
            ),
            h("div", { className: "skill-tags" },
                group.skills.map(s =>
                    h("span", { className: "skill-tag", key: s.name },
                        h("i", { className: s.icon, "aria-hidden": "true" }),
                        s.name,
                        s.level ? h("em", null, s.level) : null
                    )
                )
            )
        );
    }

    function Skills() {
        return h("div", { className: "skills-grid" },
            SKILL_GROUPS.map(g => h(SkillGroup, { group: g, key: g.title }))
        );
    }

    function Thumb({ src, alt }) {
        const [failed, setFailed] = useState(false);
        if (failed) {
            return h("div", { className: "img-placeholder", role: "img", "aria-label": alt },
                h("i", { className: "fas fa-image" }),
                h("span", null, "Screenshot coming soon")
            );
        }
        return h("img", {
            src, alt, loading: "lazy", width: 900, height: 600,
            onError: () => setFailed(true)
        });
    }

    function ProjectCard({ project }) {
        return h("article", { className: "project-card" },
            h("div", { className: "project-thumb" },
                h(Thumb, { src: project.image, alt: project.title + " screenshot" }),
                h("span", { className: "project-badge" }, project.category)
            ),
            h("div", { className: "project-body" },
                h("h3", null, project.title),
                h("p", null, project.description),
                h("div", { className: "project-tech" },
                    project.tech.map(t => h("span", { key: t }, t))
                ),
                h("div", { className: "project-links" },
                    project.demo
                        ? h("a", { className: "btn-accent btn-sm-link", href: project.demo, target: "_blank", rel: "noopener" },
                            "Live Demo ", h("i", { className: "fas fa-arrow-up-right-from-square" }))
                        : null,
                    project.github
                        ? h("a", { className: "btn-ghost btn-sm-link", href: project.github, target: "_blank", rel: "noopener" },
                            h("i", { className: "fab fa-github" }), " GitHub")
                        : null
                )
            )
        );
    }

    function Projects() {
        const [active, setActive] = useState("All");

        const visible = useMemo(
            () => PROJECTS.filter(p => active === "All" || p.category === active),
            [active]
        );

        return h(React.Fragment, null,
            h("div", { className: "filters", role: "group", "aria-label": "Filter projects" },
                FILTERS.map(f =>
                    h("button", {
                        key: f, type: "button", className: "filter-btn",
                        "aria-pressed": active === f, onClick: () => setActive(f)
                    }, f)
                )
            ),
            // key on the grid restarts the entrance animation on every filter change
            h("div", { className: "project-grid", key: active },
                visible.map(p => h(ProjectCard, { project: p, key: p.title }))
            )
        );
    }

    /* ---------------- MOUNT ---------------- */

    const skillsRoot = document.getElementById("skills-root");
    const projectsRoot = document.getElementById("projects-root");

    if (skillsRoot) ReactDOM.createRoot(skillsRoot).render(h(Skills));
    if (projectsRoot) ReactDOM.createRoot(projectsRoot).render(h(Projects));
})();
