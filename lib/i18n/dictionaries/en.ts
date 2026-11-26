/**
 * English UI strings. `kh.ts` must provide the same keys (enforced by type).
 * Placeholders like {name} are filled with `format()` from lib/i18n/format.ts.
 */
const en = {
  meta: {
    siteTitle: "ICT BMC — Software Development & IT Consulting",
    siteDescription:
      "ICT BMC, based in Banteay Meanchey Province, delivers custom software development, business management systems, IT consulting, IT infrastructure and technical support to help businesses across Cambodia grow with confidence.",
    homeTitle: "ICT BMC — Software Development & IT Consulting in Banteay Meanchey, Cambodia",
    homeDescription:
      "ICT BMC, a technology company in Banteay Meanchey Province, designs, develops and delivers custom software, business management systems, IT consulting, infrastructure and support that help businesses grow with confidence.",
    aboutTitle: "About Us",
    aboutDescription:
      "Learn about ICT BMC — a technology solutions provider in Banteay Meanchey helping businesses and organizations improve operations through modern software, IT consulting, digital solutions and IT support.",
    servicesTitle: "Services",
    servicesDescription:
      "Custom software development, IT consulting, business management systems, web applications, IT infrastructure, database management, IT support and digital transformation services.",
    solutionsTitle: "Solutions",
    solutionsDescription:
      "Business automation, business management systems, digital transformation, information management, IT infrastructure and custom software solutions for modern businesses.",
    productsTitle: "Software Products",
    productsDescription:
      "Business management systems by ICT BMC: restaurant, POS & inventory, accounting, hotel, school, HR & payroll, loan, pawn shop, rental, appointment booking, document and hospital management.",
    consultingTitle: "IT Consulting",
    consultingDescription:
      "Expert IT consulting in Cambodia: IT strategy, technology assessment, software selection, system architecture, infrastructure and network planning, cybersecurity assessment and IT project management.",
    projectsTitle: "Projects",
    projectsDescription:
      "Explore demo projects illustrating the software development, business systems, web applications, IT infrastructure and digital transformation work ICT BMC can deliver.",
    contactTitle: "Contact Us",
    contactDescription:
      "Contact ICT BMC to discuss custom software, business management systems, IT consulting or technical support for your business.",
    notFoundTitle: "Page not found",
    productNotFound: "Product not found",
    ogAlt: "ICT BMC — Your Trusted Technology Partner for Business Growth",
    ogHeadline: "Technology That Empowers Your Business.",
    ogSubline: "Software Development · IT Consulting · Business Systems · IT Support",
  },

  nav: {
    home: "Home",
    about: "About Us",
    services: "Services",
    solutions: "Solutions",
    projects: "Projects",
    contact: "Contact",
    allSolutions: "All Solutions",
    allSolutionsDesc: "Technology solutions for modern businesses",
    products: "Software Products",
    productsDesc: "Ready-to-deploy business management systems",
    consulting: "IT Consulting",
    consultingDesc: "Strategy, assessment and expert guidance",
    mainAria: "Main",
    mobileAria: "Mobile",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    homeAria: "ICT BMC — Home",
    skipToContent: "Skip to main content",
    backToTop: "Back to top",
    language: "Language",
    breadcrumb: "Breadcrumb",
  },

  footer: {
    company: "Company",
    solutions: "Solutions",
    products: "Products",
    softwareDevelopment: "Software Development",
    businessSystems: "Business Management Systems",
    itSupport: "IT Support",
    restaurant: "Restaurant Management System",
    pos: "POS & Inventory",
    accounting: "Accounting",
    hr: "HR & Payroll",
    hotel: "Hotel Management",
    socialAria: "Social media",
    socialOn: "{company} on {network}",
    comingSoon: "coming soon",
    footerNav: "Footer {title}",
    copyright: "Copyright © {year} {company}. All rights reserved.",
    strapline: "Software · Consulting · Infrastructure · Support",
  },

  common: {
    letsTalk: "Let's Talk",
    learnMore: "Learn More",
    learnMoreShort: "Learn more",
    aboutService: "about {title}",
    viewDetails: "View Details",
    viewDetailsOf: "View details: {name}",
    requestDemo: "Request Demo",
    requestDemoOf: "Request a demo: {name}",
    requestADemo: "Request a Demo",
    keyFeatures: "Key features",
    step: "Step {n}",
    exploreSolutions: "Explore Solutions",
    ourServices: "Our Services",
    viewServices: "View Services",
    allProducts: "All Products",
    customDevelopment: "Custom Development",
    getInTouch: "Get in touch",
    close: "Close",
    opensNewTab: "(opens in a new tab)",
  },

  cta: {
    title: "Ready to move your business forward?",
    description:
      "Tell us about your goals and challenges. We will help you find a practical technology solution that fits your organization.",
  },

  home: {
    heroPill: "Technology partner from Banteay Meanchey, Cambodia",
    heroTitleA: "Technology That",
    heroTitleHighlight: "Empowers",
    heroTitleB: "Your Business.",
    heroDescription:
      "We design, develop, and deliver technology solutions that help businesses streamline operations, improve efficiency, and grow with confidence.",
    exploreOurSolutions: "Explore Our Solutions",
    pillars: ["Custom Software", "Business Systems", "IT Consulting", "Infrastructure & Support"],
    introEyebrow: "Who we help",
    introTitle: "Technology Solutions Built Around Your Business.",
    introDescription:
      "Every business has unique challenges. We work closely with our clients to understand their needs and deliver technology solutions that improve efficiency, productivity, and long-term growth.",
    introFeatures: [
      {
        title: "Business Technology",
        description: "Modern technology solutions designed to improve business operations.",
      },
      {
        title: "Digital Transformation",
        description: "Helping organizations modernize their processes through digital technology.",
      },
      {
        title: "Custom Solutions",
        description: "Technology solutions tailored to your organization's requirements.",
      },
    ],
    servicesEyebrow: "Services",
    servicesTitle: "Comprehensive Technology Services.",
    servicesDescription:
      "End-to-end expertise across software, systems, infrastructure and support — delivered by one accountable partner.",
    allServices: "All services",
    solutionsEyebrow: "Solutions",
    solutionsTitle: "Smart Solutions for Modern Businesses.",
    solutionsDescription:
      "Explore our technology solutions designed to support businesses across different industries.",
    productsEyebrow: "Software Products",
    productsTitle: "Ready-to-Deploy Business Systems.",
    productsDescription:
      "Proven building blocks for common business needs — configured to your workflows and extended where you need more.",
    viewAllProducts: "View all {count} products",
    processEyebrow: "How we work",
    processTitle: "A Clear, Proven Delivery Process.",
    processDescription:
      "From the first conversation to long-term support, every engagement follows a structured process that keeps you informed and in control.",
    industriesEyebrow: "Industries",
    industriesTitle: "Industries We Can Support.",
    industriesDescription:
      "Our solutions are designed to adapt to the needs of organizations across a wide range of sectors.",
    mockup: {
      title: "Business Dashboard",
      revenue: "Revenue",
      orders: "Orders",
      efficiency: "Efficiency",
      performance: "Performance overview",
      months: "12 months",
      salesByMonth: "Sales by month",
      systems: "Systems",
      sales: "Sales",
      inventory: "Inventory",
      finance: "Finance",
      inventorySynced: "Inventory synced",
      inventorySyncedSub: "All branches up to date",
      workflowAutomated: "Workflow automated",
      workflowAutomatedSub: "Approval routed in seconds",
    },
  },

  about: {
    eyebrow: "About Us",
    titleA: "Driving Business Innovation",
    titleHighlight: "Through Technology.",
    whoEyebrow: "Who we are",
    whoTitle: "A Practical Technology Partner.",
    bmcQuestionA: "What does",
    bmcQuestionB: "stand for?",
    mission: "Our Mission",
    vision: "Our Vision",
    missionVisionAria: "Mission and vision",
    valuesEyebrow: "Core values",
    valuesTitle: "The Principles Behind Our Work.",
    approachEyebrow: "Our approach",
    approachTitle: "How We Partner With Clients.",
    approachDescription:
      "Technology only creates value when it fits the people and processes it serves. Our approach keeps your business at the center of every decision.",
    whyEyebrow: "Why ICT BMC",
    whyTitle: "Why Choose ICT BMC?",
    whyDescription: "What you can expect when you work with us.",
    whyCta: "Let's discuss your goals.",
    layers: {
      users: "Users & Channels",
      apps: "Business Applications",
      data: "Data & Integration",
      infra: "Infrastructure",
    },
  },

  services: {
    eyebrow: "Services",
    titleA: "Comprehensive",
    titleHighlight: "Technology Services.",
    description:
      "From strategy and software to infrastructure and support, we provide the technology services organizations need to operate efficiently and grow with confidence.",
    indexAria: "Services on this page",
    included: "What's included",
    discuss: "Discuss this service",
    ctaTitle: "Not sure which service you need?",
    ctaDescription:
      "Tell us about your challenge and we'll recommend the right combination of services for your organization.",
  },

  solutions: {
    eyebrow: "Solutions",
    titleA: "Smart Solutions for",
    titleHighlight: "Modern Businesses.",
    description: "Explore our technology solutions designed to support businesses across different industries.",
    browseProducts: "Browse Products",
    listAria: "Our solutions",
    discuss: "Discuss this solution",
    explore: "Explore {title}",
    pathsAria: "Where to start",
    readyTitle: "Need a ready-made system?",
    readyText:
      "Browse 12 configurable business management products for restaurants, retail, finance, HR, education, healthcare and more.",
    readyCta: "View software products",
    unsureTitle: "Not sure where to start?",
    unsureText:
      "Our IT consulting services help you assess your current situation and plan the right technology investments.",
    unsureCta: "Explore IT consulting",
  },

  consulting: {
    eyebrow: "IT Consulting",
    titleA: "Expert Technology Guidance",
    titleHighlight: "for Your Business.",
    description:
      "We help organizations identify technology opportunities, solve operational challenges, improve IT infrastructure, and implement practical solutions aligned with their business objectives.",
    discussNeeds: "Discuss Your Technology Needs",
    ourProcess: "Our process",
    servicesEyebrow: "Consulting services",
    servicesTitle: "How We Can Help.",
    servicesDescription: "Independent, practical advice across strategy, systems, infrastructure and delivery.",
    processEyebrow: "Consulting process",
    processTitle: "From Understanding to Ongoing Support.",
    processDescription:
      "A structured five-step engagement that turns business challenges into practical, implemented solutions.",
    ctaTitle: "Discuss Your Technology Needs.",
    ctaDescription:
      "Share your goals and challenges with us. We will help you understand your options and recommend a practical path forward.",
  },

  products: {
    eyebrow: "Software Products",
    titleA: "Business Systems,",
    titleHighlight: "Ready to Deploy.",
    description:
      "Configurable business management systems for hospitality, retail, finance, HR, education, healthcare and operations — tailored to your workflows during implementation.",
    catalogAria: "Product catalog",
    ctaTitle: "Need something more specific?",
    ctaDescription:
      "Every product can be configured and extended. If your requirements are unique, we can design and build a custom system for you.",
    filterAria: "Filter by category",
    all: "All",
    searchLabel: "Search products",
    searchPlaceholder: "Search products or features…",
    clearSearch: "Clear search",
    showing: "Showing {count} of {total} products",
    inCategory: " in {category}",
    matching: " matching “{query}”",
    emptyTitle: "No products match your search.",
    emptyText: "Try a different keyword or category — or ask us about a custom solution.",
    reset: "Reset filters",
    categories: {
      Hospitality: "Hospitality",
      "Retail & Sales": "Retail & Sales",
      Finance: "Finance",
      "People & HR": "People & HR",
      Education: "Education",
      Healthcare: "Healthcare",
      Operations: "Operations",
    },
    detail: {
      viewFeatures: "View features",
      overviewEyebrow: "Overview",
      overviewTitle: "Product Overview",
      configured:
        "The {name} is configured to your organization during implementation, with optional customization and integration with your existing tools. ICT BMC provides onboarding, training and ongoing technical support.",
      challengesAria: "Business challenges and solution",
      challenges: "Business Challenges",
      solution: "Our Solution",
      featuresEyebrow: "Key features",
      featuresTitle: "Everything You Need in One Platform.",
      benefitsEyebrow: "Benefits",
      benefitsTitle: "What It Means for Your Business.",
      previewEyebrow: "UI preview",
      previewTitle: "Designed for Everyday Use.",
      previewDescription:
        "A clean, intuitive interface that your team can learn quickly. Preview shown with sample data.",
      modulesAria: "Modules",
      workflowEyebrow: "Workflow",
      workflowTitle: "How It Works.",
      ctaTitle: "See the {name} in action.",
      ctaDescription:
        "Request a personalized demo and we will walk you through the features that matter most to your business.",
      relatedEyebrow: "Explore more",
      relatedTitle: "Related Products",
      demoMessage: "I'd like to request a demo of the {name}.",
    },
  },

  projects: {
    eyebrow: "Portfolio",
    titleA: "Solutions We Can",
    titleHighlight: "Build for You.",
    description:
      "A selection of demo concepts across software development, business systems, web applications, IT infrastructure and digital transformation.",
    portfolioAria: "Project portfolio",
    noteStrong: "About these projects:",
    noteA: "all entries below are",
    noteDemo: "demo concepts",
    noteB:
      "created to illustrate the types of solutions ICT BMC can deliver. They do not represent actual clients, engagements or results. Real case studies will be published here with client permission.",
    ctaTitle: "Have a project in mind?",
    ctaDescription: "Tell us what you want to achieve and we'll help you scope, design and deliver it.",
    filterAria: "Filter by category",
    all: "All",
    showing: "Showing {count} demo projects",
    showingOne: "Showing 1 demo project",
    inCategory: " in {category}",
    demoBadge: "Demo project",
    status: "Status: {status}",
    stackAria: "Technology stack",
    emptyTitle: "No projects in this category yet.",
    showAll: "Show all projects",
    demoIllustrative: "Demo / illustrative",
    stack: "Technology stack",
    demoNote:
      "This is a demo concept that illustrates the type of solution ICT BMC can deliver. It does not represent an actual client project.",
    discussSimilar: "Discuss a similar project",
    categories: {
      "Software Development": "Software Development",
      "Business Systems": "Business Systems",
      "Web Applications": "Web Applications",
      "IT Infrastructure": "IT Infrastructure",
      "Digital Transformation": "Digital Transformation",
    },
    statuses: {
      Concept: "Concept",
      Prototype: "Prototype",
      "In Design": "In Design",
    },
  },

  contact: {
    eyebrow: "Contact Us",
    titleA: "Let's Build the Right Technology Solution",
    titleHighlight: "for Your Business.",
    description:
      "Whether you need custom software, a business management system, IT consulting, or technical support, our team is ready to help.",
    sectionAria: "Contact information and form",
    getInTouch: "Get in touch",
    getInTouchText: "Reach out through any of the channels below, or send us a message using the form.",
    email: "Email",
    phone: "Phone",
    whatsapp: "WhatsApp",
    officeAddress: "Office address",
    hours: "Business hours",
    tba: "To be announced",
    mapTitle: "ICT BMC office location map",
    openInMaps: "Open in Maps",
    form: {
      title: "Send us a message",
      requiredA: "Fields marked",
      requiredB: "are required.",
      detailsLegend: "Your details",
      fullName: "Full Name",
      company: "Company Name",
      email: "Email",
      phone: "Phone Number",
      service: "Service Category",
      selectService: "Select a service…",
      message: "Message",
      messagePlaceholder: "Tell us about your business, your challenges and what you would like to achieve.",
      errors: {
        nameRequired: "Please enter your full name.",
        nameShort: "Name must be at least 2 characters.",
        emailRequired: "Please enter your email address.",
        emailInvalid: "Please enter a valid email address (e.g. name@company.com).",
        phoneInvalid: "Please enter a valid phone number.",
        serviceRequired: "Please select a service category.",
        messageRequired: "Please tell us a little about your needs.",
        messageShort: "Message must be at least 10 characters.",
        messageLong: "Message must be 2,000 characters or fewer.",
      },
      sendError: "Something went wrong while sending your message. Please try again, or contact us directly.",
      demoNote: "Demo form: submissions are validated in your browser only and are not sent to a server.",
      submit: "Send Message",
      sending: "Sending…",
      sendingSr: "Sending your message…",
      thanks: "Thank you, {name}!",
      validated: "Your form passed validation successfully.",
      demoModeStrong: "Demo mode:",
      demoModeA: "this website is a frontend-only demo, so your message was",
      demoModeNotSent: "not sent",
      demoModeB: "to a server. Please contact ICT BMC directly using the details on this page.",
      received: "Your message has been received. Our team will get back to you as soon as possible.",
      sendAnother: "Send another message",
    },
    serviceOptions: {
      "Custom Software Development": "Custom Software Development",
      "IT Consulting": "IT Consulting",
      "Business Management Systems": "Business Management Systems",
      "Web Development": "Web Development",
      "IT Infrastructure": "IT Infrastructure",
      "IT Support": "IT Support",
      "Digital Transformation": "Digital Transformation",
      Other: "Other",
    },
  },

  notFound: {
    title: "Page not found",
    description: "The page you are looking for doesn't exist or may have been moved.",
    backHome: "Back to home",
    browseProducts: "Browse products",
  },
};

export default en;

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : T extends object
      ? { [K in keyof T]: Widen<T[K]> }
      : T;

export type Dictionary = Widen<typeof en>;
