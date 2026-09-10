// Portfolio content. This is the single source of truth for the site.
//
// Every claim here is transcribed from cv.txt. Nothing is embellished,
// rounded up, or invented — if it is not on the CV, it does not belong in
// this file. Edit this file to update the site; there is no database and no
// build step beyond Vite.

const tech = (...names) => names.map((name) => ({ name, icon: '' }))

export const profile = {
  name: 'Sujan Sapkota',
  title: 'Infrastructure Engineer',
  tagline:
    'Cloud infrastructure, networking, and security operations for hybrid enterprise environments',
  bio: 'I’m a Computer Engineering graduate working on network administration, cloud infrastructure, SecOps, and enterprise IT operations. My hands-on experience comes from roles as a Junior Cloud & Infrastructure Engineer and Network & Systems Trainee at Kontract IT Support, network support training at Nepal Telecom, and a DevOps & SecOps fellowship at Leapfrog Technology. Day to day that means AWS multi-region environments, Docker and Kubernetes workloads, Terraform as the record of what is running, and zero-trust network security around all of it.',
  avatar: null,
  resume: '/resume.pdf',
  email: 'sujansapkota0923@gmail.com',
  phone: '+977 9867970707',
  location: 'Kathmandu, Nepal',
  github_url: 'https://github.com/SujanSapkota0923',
  linkedin_url: 'https://www.linkedin.com/in/sujan-sapkota-a254a6215/',
  twitter_url: '',
  // First hands-on role; the About page renders this as "In the field since".
  in_field_since: 2024,

  // Flat lists per category on the About page. No proficiency scores: a
  // self-assigned percentage tells a reader nothing the timeline doesn't.
  skills: [
    { name: 'Linux Administration', category: 'System Administration' },
    { name: 'Windows Administration', category: 'System Administration' },
    { name: 'User Management', category: 'System Administration' },
    { name: 'Access Control', category: 'System Administration' },
    { name: 'Process Monitoring', category: 'System Administration' },
    { name: 'System Troubleshooting', category: 'System Administration' },

    { name: 'TCP/IP', category: 'Networking' },
    { name: 'VLANs', category: 'Networking' },
    { name: 'Routing', category: 'Networking' },
    { name: 'Switching', category: 'Networking' },
    { name: 'Subnetting', category: 'Networking' },
    { name: 'DHCP', category: 'Networking' },
    { name: 'DNS', category: 'Networking' },
    { name: 'Cisco Packet Tracer', category: 'Networking' },
    { name: 'Network Troubleshooting', category: 'Networking' },

    { name: 'Docker', category: 'Infrastructure & Virtualization' },
    { name: 'Containerization', category: 'Infrastructure & Virtualization' },
    { name: 'Virtual Machines', category: 'Infrastructure & Virtualization' },
    { name: 'Load Balancing', category: 'Infrastructure & Virtualization' },
    { name: 'Infrastructure Monitoring', category: 'Infrastructure & Virtualization' },

    { name: 'Vulnerability Assessment', category: 'Cybersecurity' },
    { name: 'Security Monitoring', category: 'Cybersecurity' },
    { name: 'Information Gathering', category: 'Cybersecurity' },
    { name: 'Burp Suite', category: 'Cybersecurity' },
    { name: 'Wireshark', category: 'Cybersecurity' },
    { name: 'Security Best Practices', category: 'Cybersecurity' },

    { name: 'AWS', category: 'Cloud & DevOps' },
    { name: 'Terraform', category: 'Cloud & DevOps' },
    { name: 'Kubernetes', category: 'Cloud & DevOps' },
    { name: 'GitHub Actions', category: 'Cloud & DevOps' },
    { name: 'CI/CD Pipelines', category: 'Cloud & DevOps' },
    { name: 'Automation', category: 'Cloud & DevOps' },
    { name: 'Infrastructure Deployment', category: 'Cloud & DevOps' },

    { name: 'SQL', category: 'Databases & Storage' },
    { name: 'Redis', category: 'Databases & Storage' },
    { name: 'Database Administration', category: 'Databases & Storage' },
    { name: 'Backup and Recovery', category: 'Databases & Storage' },

    { name: 'Python', category: 'Programming' },
    { name: 'C', category: 'Programming' },
    { name: 'C++', category: 'Programming' },
    { name: 'Bash Scripting', category: 'Programming' },

    { name: 'Git', category: 'Tools' },
    { name: 'GitHub', category: 'Tools' },
    { name: 'Postman', category: 'Tools' },
    { name: 'Linux CLI', category: 'Tools' },
    { name: 'Monitoring Tools', category: 'Tools' },

    { name: 'Linux', category: 'Platforms & OS' },
    { name: 'Windows', category: 'Platforms & OS' },
    { name: 'macOS', category: 'Platforms & OS' },

    { name: 'Technical Support', category: 'Practices' },
    { name: 'Incident Response', category: 'Practices' },
    { name: 'Problem Solving', category: 'Practices' },
    { name: 'Documentation', category: 'Practices' },
    { name: 'Communication', category: 'Practices' },
    { name: 'Team Leadership', category: 'Practices' },
  ].map((skill, index) => ({ id: index + 1, icon: '', ...skill })),

  // Newest first; `end_date: null` renders as "Now".
  experience: [
    {
      id: 1,
      company: 'Kontract IT Support',
      role: 'Junior Cloud & Infrastructure Engineer',
      start_date: '2026-02-01',
      end_date: null,
      description:
        'Provision, configure, and maintain hybrid enterprise infrastructure across Linux/Windows servers and AWS (VPC, EC2, RDS, S3). Automate multi-environment deployment with Terraform and GitHub Actions pipelines, run containerized workloads and service networking on Docker and Kubernetes, and enforce network security through site-to-site IPsec VPNs, subnets, custom routing, security groups, and AWS WAF. System health, centralized logs, and automated threat alerts run on CloudWatch, GuardDuty, and Security Hub.',
      technologies: tech(
        'AWS',
        'Terraform',
        'Kubernetes',
        'Docker',
        'GitHub Actions',
        'IPsec VPN',
        'CloudWatch',
        'Linux',
      ),
    },
    {
      id: 2,
      company: 'Kontract IT Support',
      role: 'Network & Systems Trainee',
      start_date: '2025-11-01',
      end_date: '2026-01-31',
      description:
        'Assisted senior infrastructure engineers with office network hardware, routers, switches, VLANs, and firewall policies. Configured web and database servers on Linux, including Nginx reverse proxy, SSL, and DNS, handled user access control and IAM policies under supervision, and kept the infrastructure documentation and routine health checks current.',
      technologies: tech('Linux', 'Nginx', 'VLANs', 'DNS', 'IAM', 'SSL'),
    },
    {
      id: 3,
      company: 'Leapfrog Technology',
      role: 'DevOps & SecOps Fellow',
      start_date: '2025-06-01',
      end_date: '2025-08-31',
      description:
        'Hands-on fellowship in DevOps, cloud infrastructure, Linux systems, and security operations. Worked with containerized environments and CI/CD deployment workflows, performed security assessments covering reconnaissance, vulnerability identification, and infrastructure hardening, and analyzed logs and system performance to surface operational and security issues.',
      technologies: tech('Docker', 'CI/CD', 'Linux', 'Security Assessment', 'Monitoring'),
    },
    {
      id: 4,
      company: 'Nepal Telecom',
      role: 'IT Intern — ISSD',
      start_date: '2024-09-01',
      end_date: '2024-12-31',
      description:
        'Assisted engineers with network monitoring, troubleshooting, and system maintenance inside a national telecom operator, supported hardware and software troubleshooting within the department, and took part in the routine maintenance that keeps enterprise-scale networking and telecommunication infrastructure available.',
      technologies: tech('Network Monitoring', 'Troubleshooting', 'Enterprise Infrastructure'),
    },
    {
      id: 5,
      company: 'Intel Institute — INTEL afterSEE',
      role: 'Website Administrator',
      start_date: '2024-05-01',
      end_date: '2024-07-31',
      description:
        'Managed the institute’s web services and digital resources, administered the Moodle-based online examination and learning management system, and provided platform support to staff and students while maintaining service availability and user access.',
      technologies: tech('Moodle', 'Web Administration', 'User Access'),
    },
  ],

  education: [
    {
      id: 1,
      institution: 'Kathmandu Engineering College (KEC), Tribhuvan University',
      degree: 'Bachelor of Engineering',
      field: 'Computer Engineering',
      start_date: '2021-04-01',
      end_date: '2025-06-30',
    },
    {
      id: 2,
      institution: 'Trinity International College and Higher Secondary School',
      degree: 'Higher Secondary Education',
      field: 'Science',
      start_date: '2018-07-01',
      end_date: '2020-05-31',
    },
    {
      id: 3,
      institution: 'New Oasis Academy Higher Secondary School',
      degree: 'Secondary Education (SEE)',
      field: 'General Studies',
      start_date: '2008-03-01',
      end_date: '2018-04-30',
    },
  ],

  certifications: [
    {
      id: 1,
      name: 'Google Foundations of Cybersecurity',
      issuer: 'Coursera',
      year: '2023',
      link: 'https://drive.google.com/file/d/13wj_gjK9jXjYmwBrA_Q3SbeBkoxaTqIO/view',
    },
  ],

  achievements: [
    {
      id: 1,
      title: 'President, KEC IT Club',
      period: '2024/25',
      detail:
        'Led organization of workshops and bootcamps covering Web3.0, GitHub, data manipulation with NumPy and Pandas, Linux, and open source contribution.',
      link: 'https://drive.google.com/file/d/13r5yJacxx-IR8LDaIiPgNrrIEfd5MIzI/view',
    },
    {
      id: 2,
      title: '1st Place, WISE BEE Hackathon',
      period: '2023',
      detail:
        'Won by developing a hotel booking cancellation EDA and prediction model.',
      link: 'https://drive.google.com/file/d/17TPaiENQqQmE94FujXF-w6Xb_zk1Jky6/view',
    },
    {
      id: 3,
      title: 'KIST HackFest 2024 — 48-hour hackathon',
      period: '2024',
      detail:
        'Built a computer vision web application for exercise pose analysis, rep counting, feedback, and gamified leaderboards.',
      link: 'https://drive.google.com/file/d/16wxdtSeUgTNbisp3y1CQox3JYVSNQUPV/view?usp=sharing',
    },
    {
      id: 4,
      title: 'PALS “Think Create Engineer” Program',
      period: '2023',
      detail:
        'Residential program at IIT Madras, India; built an Airport Passenger Feedback System as the final project.',
      link: 'https://drive.google.com/file/d/14Dyliz4dNH3cUoo-op77dvMvccceR0Kh/view',
    },
  ],
}

// `order` sets the sequence on /projects; `is_featured` selects the Home page grid.
export const projects = [
  {
    id: 1,
    title: 'Nepashray',
    slug: 'nepashray',
    short_description:
      'A Django social platform backend with authenticated accounts, engagement dashboards, and an admin moderation panel.',
    problem:
      'A social platform is only as trustworthy as the two things around its posts: who is allowed to sign in, and who checks what gets published. Leave either one out and the platform is either impossible to get back into after a forgotten password, or wide open to whatever anybody chooses to post.',
    solution:
      'A Django backend with secure user authentication, including login and email-based password recovery, so an account is recoverable without an administrator in the loop. On top of that sit dynamic dashboards for monitoring likes and comments and managing posts, and an admin panel where a post is verified before it counts as published.',
    challenges:
      'Password recovery is the part of authentication that has to work while the user is locked out, which means the email path has to be reliable in a way the ordinary login path never gets tested for.',
    learnings:
      'Moderation is a data model decision before it is a screen. Once a post carries a verification state, the admin panel is a view over that state rather than a separate system bolted on afterwards.',
    thumbnail: null,
    tech_stack: tech('Django', 'Python', 'SQL', 'Authentication'),
    github_url: 'https://github.com/SujanSapkota0923/Nepashray',
    live_url: '',
    is_featured: true,
    order: 1,
  },
  {
    id: 2,
    title: 'URL Shortener',
    slug: 'url-shortener',
    short_description:
      'A Redis-backed link shortening service with custom slugs, generated keys, expiry, and per-link click analytics.',
    problem:
      'A shortened link has to be resolved on every single visit, and the redirect is the slowest thing standing between someone clicking and the page they wanted. A link also outlives its usefulness — a campaign ends, a document moves — so a store that only ever grows is the wrong shape for the job.',
    solution:
      'A shortening service where a link is either given a custom slug or a Base64-generated key, with automatic expiry support so a link can be issued for a fixed life. Storage is Redis, which keeps the lookup on the redirect path fast, and every shortened link tracks detailed click analytics.',
    challenges:
      'Keeping the redirect fast while still recording a click for analytics: the visitor should not be waiting on the bookkeeping that happens behind their redirect.',
    learnings:
      'Expiry belongs in the store rather than in a cleanup job. Redis already knows how to forget a key on schedule, so the service does not need to own a second mechanism for the same idea.',
    thumbnail: null,
    tech_stack: tech('Redis', 'Python', 'Base64', 'Analytics'),
    github_url: 'https://github.com/SujanSapkota0923/URL-Shortner',
    live_url: '',
    is_featured: true,
    order: 2,
  },
  {
    id: 3,
    title: 'Hotel Booking Cancellation Prediction',
    slug: 'hotel-booking-cancellation-prediction',
    short_description:
      'A machine learning classification model predicting booking cancellations — the project that won the WISE BEE Hackathon 2023.',
    problem:
      'A hotel holding a room for a booking that will be cancelled loses the night twice: once to the empty room, and once to the guest it turned away. The cancellation is visible in the booking record long before it happens, but only if somebody looks for the pattern.',
    solution:
      'A classification model trained to predict cancellations, built on data preprocessing and feature engineering, with exploratory data analysis and visualization used to identify which factors actually drive a cancellation rather than merely correlate with one. The project took first place at the WISE BEE Hackathon in 2023.',
    challenges:
      'Getting from raw booking records to features a classifier can use — the columns that matter are rarely the columns the data arrives in.',
    learnings:
      'The exploratory analysis carried as much weight as the model. Knowing which drivers stood behind a cancellation was what made the prediction worth acting on.',
    thumbnail: null,
    tech_stack: tech('Python', 'Pandas', 'NumPy', 'EDA', 'Scikit-learn'),
    github_url: '',
    live_url: '',
    is_featured: true,
    order: 3,
  },
].sort((a, b) => a.order - b.order)

export const featuredProjects = projects.filter((project) => project.is_featured)

export const getProjectBySlug = (slug) => projects.find((project) => project.slug === slug)
