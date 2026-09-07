/**
 * Content data layer — single source of truth for the whole site.
 *
 * Every string here is transcribed from cv.txt. Nothing is embellished,
 * rounded up, or invented. If a claim is not in cv.txt, it does not
 * belong in this file.
 *
 * Timeline entries carry the dates recorded on the underlying certificate
 * or letter, and `sort` orders them chronologically.
 */

export const profile = {
  name: 'Sujan Sapkota',
  title: 'Computer Engineering Graduate',
  role: 'Junior Cloud & Infrastructure Engineer',
  employer: 'Kontract IT Support',
  focus: 'Cloud Infrastructure | Networking | Information Systems',
  location: 'Chitwan, Nepal',
  timezone: 'UTC+5:45',
  summary:
    'Computer Engineering graduate with practical experience in network administration, cloud infrastructure, SecOps, and enterprise IT operations. Proven technical background through hands-on roles as a Cloud & Infrastructure Engineer and Network Trainee at Kontract IT Support, complemented by network support training at Nepal Telecom and a DevOps & SecOps fellowship at Leapfrog Technology. Skilled in managing AWS multi-region environments, Docker/Kubernetes containerization, Terraform IaC, and zero-trust network security.',
  contact: {
    email: 'sujansapkota0923@gmail.com',
    phone: '+977 9867970707',
    github: 'https://github.com/SujanSapkota0923',
    githubHandle: 'SujanSapkota0923',
    linkedin: 'https://www.linkedin.com/in/sujan-sapkota-a254a6215/',
    linkedinHandle: 'sujan-sapkota-a254a6215',
    portfolio: 'https://portfolio.sujansapkota07.com.np/'
  }
};

/** The "developer object" motif in the hero — real stack only. */
export const heroObject = {
  engineer: {
    name: 'Sujan Sapkota',
    role: 'Cloud & Infrastructure Engineer',
    employer: 'Kontract IT Support',
    education: 'BE Computer Engineering, KEC (TU) — 2025',
    location: 'Chitwan, Nepal',
    stack: ['Linux', 'AWS', 'Terraform', 'Docker', 'Kubernetes', 'Python', 'Bash'],
    focus: ['Hybrid infrastructure', 'Zero-trust networking', 'SecOps']
  }
};

/** Real markers for the hero strip. No invented counters. */
export const heroMarkers = [
  { label: 'DEGREE', value: 'BE Computer Engineering', note: 'KEC · Tribhuvan University · 2025' },
  { label: 'HACKATHON', value: '1st Place', note: 'WISE BEE Hackathon · 2023' },
  { label: 'LEADERSHIP', value: 'President', note: 'KEC IT Club · 2024/25' }
];

/**
 * Merged life timeline: education + work + achievements in one stream.
 * `kind` drives the log-level styling; `sort` drives the ordering.
 */
export const timeline = [
  {
    kind: 'education',
    level: 'INFO',
    sort: 2008.03,
    period: 'Mar 2008 — Apr 2018',
    stamp: '2008-03',
    org: 'New Oasis Academy Higher Secondary School',
    role: 'Secondary Education (SEE)',
    where: 'Baglung',
    summary: 'School education completed through the SEE examination.',
    bullets: [],
    tags: []
  },
  {
    kind: 'education',
    level: 'INFO',
    sort: 2018.07,
    period: 'Jul 2018 — May 2020',
    stamp: '2018-07',
    org: 'Trinity International College and Higher Secondary School',
    role: 'Higher Secondary Education — Science',
    where: 'Kathmandu',
    summary: 'Higher secondary education in the science stream.',
    bullets: [],
    tags: []
  },
  {
    kind: 'education',
    level: 'INFO',
    sort: 2021.04,
    period: 'April 2021 — June 2025',
    stamp: '2021-04',
    org: 'Kathmandu Engineering College (KEC), Tribhuvan University',
    role: 'Bachelor of Engineering in Computer Engineering',
    where: 'Kathmandu',
    summary:
      'Four-year engineering degree covering systems, networking, and software fundamentals.',
    bullets: [],
    tags: ['Computer Engineering', 'Tribhuvan University']
  },
  {
    kind: 'achievement',
    level: 'SUCCESS',
    sort: 2023.1,
    period: '2023',
    stamp: '2023',
    org: 'WISE BEE Hackathon',
    role: '1st Place',
    summary:
      'Won first place by developing a Hotel Booking Cancellation EDA and prediction model.',
    bullets: [],
    tags: ['Machine Learning', 'EDA'],
    link: 'https://drive.google.com/file/d/17TPaiENQqQmE94FujXF-w6Xb_zk1Jky6/view',
    linkLabel: 'Certificate'
  },
  {
    kind: 'achievement',
    level: 'INFO',
    sort: 2023.2,
    period: '2023',
    stamp: '2023',
    org: 'PALS "Think Create Engineer" Program',
    role: 'Residential Participant — IIT Madras, India',
    summary:
      'Residential engineering program at IIT Madras; built an Airport Passenger Feedback System as the final project.',
    bullets: [],
    tags: ['IIT Madras'],
    link: 'https://drive.google.com/file/d/14Dyliz4dNH3cUoo-op77dvMvccceR0Kh/view',
    linkLabel: 'Certificate'
  },
  {
    kind: 'certification',
    level: 'INFO',
    sort: 2023.3,
    period: '2023',
    stamp: '2023',
    org: 'Coursera',
    role: 'Google Foundations of Cybersecurity',
    summary: 'Certification in cybersecurity fundamentals.',
    bullets: [],
    tags: ['Cybersecurity'],
    link: 'https://drive.google.com/file/d/13wj_gjK9jXjYmwBrA_Q3SbeBkoxaTqIO/view',
    linkLabel: 'Certificate'
  },
  {
    kind: 'work',
    level: 'INFO',
    sort: 2024.05,
    period: 'May 2024 — July 2024',
    stamp: '2024-05',
    org: 'Intel Institute — INTEL afterSEE',
    role: 'Website Administrator',
    summary: 'Ran the institute\'s web services and Moodle-based examination platform.',
    bullets: [
      'Managed and maintained institutional web services and digital resources.',
      'Administered Moodle-based online examination and learning management systems.',
      'Provided technical support to staff and students for platform-related issues.',
      'Assisted in maintaining service availability and user access management.'
    ],
    tags: ['Moodle', 'Web Administration', 'User Access'],
    link: 'https://drive.google.com/file/d/1Uy0Gor8fM9N5ZPq6y57QJCkEIRNpJEFH/view',
    linkLabel: 'Certificate'
  },
  {
    kind: 'achievement',
    level: 'SUCCESS',
    sort: 2024.6,
    period: '2024',
    stamp: '2024',
    org: 'KIST HackFest 2024',
    role: '48-Hour Hackathon',
    summary:
      'Built a computer vision web application for exercise pose analysis, rep counting, feedback, and gamified leaderboards.',
    bullets: [],
    tags: ['Computer Vision', '48h'],
    link: 'https://drive.google.com/file/d/16wxdtSeUgTNbisp3y1CQox3JYVSNQUPV/view?usp=sharing',
    linkLabel: 'Certificate'
  },
  {
    kind: 'achievement',
    level: 'SUCCESS',
    sort: 2024.9,
    period: '2024/25',
    stamp: '2024',
    org: 'KEC IT Club',
    role: 'President',
    summary:
      'Led organization of workshops and bootcamps covering Web3.0, GitHub, data manipulation (NumPy, Pandas), Linux, and open source contribution.',
    bullets: [],
    tags: ['Leadership', 'Community'],
    link: 'https://drive.google.com/file/d/13r5yJacxx-IR8LDaIiPgNrrIEfd5MIzI/view',
    linkLabel: 'Certificate'
  },
  {
    kind: 'work',
    level: 'DEBUG',
    sort: 2024.09,
    period: 'September 2024 — December 2024',
    stamp: '2024-09',
    org: 'Nepal Telecom',
    role: 'IT Intern — ISSD',
    summary:
      'Network monitoring and system maintenance inside a national telecom operator.',
    bullets: [
      'Assisted engineers in network monitoring, troubleshooting, and system maintenance activities.',
      'Observed operation of enterprise-scale networking and telecommunication infrastructure.',
      'Supported hardware and software troubleshooting tasks within the department.',
      'Participated in routine maintenance and operational activities to ensure service reliability.',
      'Gained practical exposure to enterprise IT support workflows and infrastructure management.'
    ],
    tags: ['Network Monitoring', 'Enterprise Infrastructure'],
    link: 'https://drive.google.com/file/d/1sZaCKBh4J0S1284tuQ8IXygZb7G7J9SF/view',
    linkLabel: 'Certificate'
  },
  {
    kind: 'work',
    level: 'DEBUG',
    sort: 2025.06,
    period: 'June 2025 — August 2025',
    stamp: '2025-06',
    org: 'Leapfrog Technology',
    role: 'DevOps & SecOps Fellow',
    summary:
      'Hands-on fellowship in DevOps, cloud infrastructure, Linux systems, and security operations.',
    bullets: [
      'Completed hands-on training in DevOps, cloud infrastructure, Linux systems, and security operations.',
      'Worked with containerized environments and deployment workflows using Docker and CI/CD pipelines.',
      'Performed security assessments, reconnaissance, vulnerability identification, and infrastructure hardening exercises.',
      'Monitored system performance and analyzed logs to identify operational and security-related issues.',
      'Gained practical exposure to cloud-native infrastructure and operational best practices.'
    ],
    tags: ['DevOps', 'SecOps', 'Docker', 'CI/CD'],
    link: 'https://drive.google.com/file/d/1F96JQmBjthRLw-j9MLyEQtXuyabaPjdj/view?usp=sharing',
    linkLabel: 'Certificate'
  },
  {
    kind: 'work',
    level: 'INFO',
    sort: 2025.11,
    period: 'November 2025 — January 2026',
    stamp: '2025-11',
    org: 'Kontract IT Support',
    role: 'Network & Systems Trainee',
    summary:
      'Supported the infrastructure team on office network hardware, Linux servers, and access control.',
    bullets: [
      'Assisted senior infrastructure engineers in managing local office network hardware, routers, switches, VLANs, and firewall policies.',
      'Configured web and database servers on Linux environments, including Nginx reverse proxy configuration, SSL setup, and DNS management.',
      'Handled user access control, IAM policies, and system administration under direct supervision following organizational security practices.',
      'Conducted routine network monitoring, system health checks, and maintained comprehensive infrastructure technical documentation.',
      'Gained hands-on exposure to cloud onboarding, subnetting, and foundational security auditing practices.'
    ],
    tags: ['VLANs', 'Nginx', 'DNS', 'IAM', 'Linux'],
    link: 'https://drive.google.com/file/d/1F96JQmBjthRLw-j9MLyEQtXuyabaPjdj/view?usp=sharing',
    linkLabel: 'Certificate'
  },
  {
    kind: 'work',
    level: 'CURRENT',
    sort: 2026.02,
    period: 'February 2026 — Present',
    stamp: '2026-02',
    org: 'Kontract IT Support',
    role: 'Cloud & Infrastructure Engineer',
    current: true,
    summary:
      'Provisioning and running hybrid Linux/Windows and AWS infrastructure, automated with Terraform and GitHub Actions.',
    bullets: [
      'Provision, configure, and maintain hybrid enterprise infrastructure utilizing Linux/Windows servers and AWS cloud environments (VPC, EC2, RDS, S3).',
      'Automate multi-environment infrastructure deployment using Infrastructure as Code (Terraform) and setup CI/CD delivery pipelines with GitHub Actions.',
      'Manage containerized workload deployments, orchestration, and service networking using Docker and Kubernetes clusters.',
      'Enforce network security using site-to-site IPsec VPNs, subnets, custom routing, security groups, and AWS Web Application Firewall (WAF).',
      'Monitor system health, centralize logs, and implement automated threat alerts using AWS CloudWatch, GuardDuty, and Security Hub.'
    ],
    tags: ['AWS', 'Terraform', 'Kubernetes', 'IPsec VPN', 'CloudWatch'],
    link: 'https://drive.google.com/file/d/1F96JQmBjthRLw-j9MLyEQtXuyabaPjdj/view?usp=sharing',
    linkLabel: 'Certificate'
  }
].sort((a, b) => a.sort - b.sort);

/** The ten skill groups from cv.txt, verbatim. No percentages. */
export const skills = [
  {
    group: 'System Administration',
    icon: 'dns',
    items: ['Linux Administration', 'Windows Administration', 'User Management', 'Access Control', 'Process Monitoring', 'System Troubleshooting']
  },
  {
    group: 'Networking',
    icon: 'lan',
    items: ['TCP/IP', 'VLANs', 'Routing', 'Switching', 'Subnetting', 'DHCP', 'DNS', 'Cisco Packet Tracer', 'Network Troubleshooting']
  },
  {
    group: 'Infrastructure & Virtualization',
    icon: 'deployed_code',
    items: ['Docker', 'Containerization', 'Virtual Machines', 'Load Balancing', 'Infrastructure Monitoring']
  },
  {
    group: 'Cybersecurity',
    icon: 'security',
    items: ['Vulnerability Assessment', 'Security Monitoring', 'Information Gathering', 'Burp Suite', 'Wireshark', 'Access Control', 'Security Best Practices']
  },
  {
    group: 'Cloud & DevOps',
    icon: 'cloud',
    items: ['AWS', 'GitHub Actions', 'CI/CD Pipelines', 'Automation', 'Terraform', 'Kubernetes', 'Infrastructure Deployment']
  },
  {
    group: 'Databases & Storage',
    icon: 'database',
    items: ['SQL', 'Redis', 'Database Administration', 'Backup and Recovery Concepts']
  },
  {
    group: 'Programming',
    icon: 'code',
    items: ['Python', 'C', 'C++', 'Bash Scripting']
  },
  {
    group: 'Tools',
    icon: 'handyman',
    items: ['Git', 'GitHub', 'Postman', 'Linux CLI', 'Monitoring Tools']
  },
  {
    group: 'Operating Systems',
    icon: 'computer',
    items: ['Linux', 'Windows', 'macOS']
  },
  {
    group: 'Soft Skills',
    icon: 'groups',
    items: ['Technical Support', 'Incident Response', 'Problem Solving', 'Documentation', 'Communication', 'Team Leadership']
  }
];

export const projects = [
  {
    index: '01',
    name: 'Nepashray',
    schematic: [
      '  visitor',
      '     |',
      '     v',
      '  [[login]] --> email-based password recovery',
      '     |',
      '     +--> posts ------> [[admin panel]] --> verified',
      '     |                        ^',
      '     +--> [[dashboard]]       |',
      '            likes / comments  |',
      '            manage posts -----+'
    ],
    subtitle: 'Django Social Platform Backend',
    repo: 'https://github.com/SujanSapkota0923/Nepashray',
    summary:
      'Social platform backend with authenticated accounts, engagement dashboards, and an admin moderation panel.',
    stack: ['Django', 'Python', 'SQL', 'Auth'],
    notes: [
      'Developed secure user authentication with login and email-based password recovery.',
      'Built dynamic dashboards for monitoring likes/comments, managing posts, and an admin panel for post verification.'
    ]
  },
  {
    index: '02',
    name: 'URL Shortener',
    schematic: [
      '  POST /shorten',
      '     |',
      '     v',
      '  [[base64 key]] or custom slug',
      '     |',
      '     v',
      '  [[Redis]]  slug -> url  (+ expiry)',
      '     ^',
      '     |',
      '  GET /:slug --> lookup --> redirect',
      '                    |',
      '                    +--> [[click analytics]]'
    ],
    subtitle: 'Redis-backed Link Service',
    repo: 'https://github.com/SujanSapkota0923/URL-Shortner',
    summary:
      'Link shortening service with custom slugs, generated keys, expiry support, and per-link click analytics.',
    stack: ['Redis', 'Python', 'Base64', 'Analytics'],
    notes: [
      'Built a URL shortening service with customizable slugs, Base64-generated keys, and automatic expiry support.',
      'Implemented high-performance storage using Redis and tracked detailed click analytics for each shortened link.'
    ]
  },
  {
    index: '03',
    name: 'Hotel Booking Cancellation Prediction',
    schematic: [
      '  bookings data',
      '     |',
      '     v',
      '  [[preprocessing]] --> feature engineering',
      '     |                        |',
      '     v                        v',
      '  [[EDA]] + plots         classifier',
      '     |                        |',
      '     v                        v',
      '  cancellation drivers    cancel / keep'
    ],
    subtitle: 'ML Classification Model',
    repo: null,
    summary:
      'Classification model predicting booking cancellations — the project that won the WISE BEE Hackathon 2023.',
    stack: ['Python', 'Pandas', 'NumPy', 'EDA'],
    notes: [
      'Trained a machine learning classification model to predict booking cancellations using data preprocessing and feature engineering.',
      'Performed exploratory data analysis (EDA) and data visualization to identify key cancellation drivers.'
    ]
  }
];

export const certifications = [
  {
    name: 'Google Foundations of Cybersecurity',
    issuer: 'Coursera',
    year: '2023',
    link: 'https://drive.google.com/file/d/13wj_gjK9jXjYmwBrA_Q3SbeBkoxaTqIO/view'
  }
];

export const achievements = [
  {
    title: 'President, KEC IT Club',
    period: '2024/25',
    detail:
      'Led organization of workshops and bootcamps covering Web3.0, GitHub, Data Manipulation (NumPy, Pandas), Linux, and Open Source Contribution.',
    icon: 'groups_2',
    link: 'https://drive.google.com/file/d/13r5yJacxx-IR8LDaIiPgNrrIEfd5MIzI/view'
  },
  {
    title: '1st Place, WISE BEE Hackathon',
    period: '2023',
    detail:
      'Won by developing a Hotel Booking Cancellation EDA and Prediction model.',
    icon: 'emoji_events',
    link: 'https://drive.google.com/file/d/17TPaiENQqQmE94FujXF-w6Xb_zk1Jky6/view'
  },
  {
    title: 'KIST HackFest 2024 — 48-Hour Hackathon',
    period: '2024',
    detail:
      'Built a computer vision web application for exercise pose analysis, rep counting, feedback, and gamified leaderboards.',
    icon: 'visibility',
    link: 'https://drive.google.com/file/d/16wxdtSeUgTNbisp3y1CQox3JYVSNQUPV/view?usp=sharing'
  },
  {
    title: 'PALS "Think Create Engineer" Program',
    period: '2023',
    detail:
      'Residential program at IIT Madras, India; developed an Airport Passenger Feedback System as a final project.',
    icon: 'school',
    link: 'https://drive.google.com/file/d/14Dyliz4dNH3cUoo-op77dvMvccceR0Kh/view'
  }
];

/**
 * Infrastructure I actually run at Kontract IT Support.
 * Copy explains what each piece is for — no metrics, no boasting.
 */
export const infrastructure = {
  intro:
    'The stack below is the one described in my current role: hybrid Linux/Windows servers alongside AWS, provisioned as code, with the network locked down and everything logged. Click a node to read why it is there.',
  nodes: [
    {
      id: 'github',
      label: 'GitHub Actions',
      layer: 'delivery',
      title: 'GitHub Actions — CI/CD delivery',
      desc:
        'Pipelines that build, validate, and roll out infrastructure and application changes. Deployment becomes a reviewed commit rather than a manual sequence on a server, which means the change history and the audit trail are the same thing.',
      facts: ['Multi-environment delivery pipelines', 'Runs the Terraform plan/apply cycle']
    },
    {
      id: 'terraform',
      label: 'Terraform',
      layer: 'delivery',
      title: 'Terraform — Infrastructure as Code',
      desc:
        'Every VPC, subnet, security group, and instance is declared in version-controlled configuration. Environments are reproduced from the same modules instead of being hand-built, so staging and production drift is something you can see in a diff.',
      facts: ['Multi-environment deployment', 'Reviewable, reversible changes']
    },
    {
      id: 'vpc',
      label: 'VPC',
      layer: 'network',
      title: 'AWS VPC — the network boundary',
      desc:
        'Custom subnets and route tables split public entry points from private workloads. Nothing that holds data sits in a subnet that can be reached directly from the internet; access is by route, not by exception.',
      facts: ['Public / private subnet split', 'Custom routing and security groups']
    },
    {
      id: 'vpn',
      label: 'IPsec VPN',
      layer: 'network',
      title: 'Site-to-site IPsec VPN',
      desc:
        'Encrypted tunnel joining the office network to the cloud VPC, so internal systems can reach cloud resources over private addressing. It replaces the temptation to expose an admin port publicly.',
      facts: ['Office ↔ cloud private connectivity', 'Encrypted in transit']
    },
    {
      id: 'waf',
      label: 'AWS WAF',
      layer: 'network',
      title: 'AWS Web Application Firewall',
      desc:
        'Filters HTTP traffic before it reaches the application — common injection and scanning patterns are dropped at the edge. It is a layer, not a substitute for fixing the application.',
      facts: ['Request filtering at the edge', 'Blocks common exploit patterns']
    },
    {
      id: 'ec2',
      label: 'EC2 / Linux',
      layer: 'compute',
      title: 'EC2 and hybrid Linux/Windows servers',
      desc:
        'The compute tier: cloud instances alongside on-premise Linux and Windows servers. Provisioning, user management, access control, and health checks are the same discipline whether the box is in AWS or in the office rack.',
      facts: ['Hybrid Linux / Windows estate', 'Nginx reverse proxy, SSL, DNS']
    },
    {
      id: 'k8s',
      label: 'Docker / K8s',
      layer: 'compute',
      title: 'Docker and Kubernetes',
      desc:
        'Containerized workloads and their orchestration — deployments, service networking, and the routing between services. Containers make the runtime identical from a laptop to production; Kubernetes handles what happens when one of them dies.',
      facts: ['Container deployments and orchestration', 'Service networking between workloads']
    },
    {
      id: 'rds',
      label: 'RDS',
      layer: 'data',
      title: 'Amazon RDS — managed databases',
      desc:
        'Relational databases in private subnets, reachable only from the application tier. Managed backups and patching remove a whole category of maintenance that is easy to postpone and expensive to postpone.',
      facts: ['Private-subnet placement', 'Managed backup and recovery']
    },
    {
      id: 's3',
      label: 'S3',
      layer: 'data',
      title: 'Amazon S3 — object storage',
      desc:
        'Object storage for artifacts, backups, and static assets. Access is granted by policy to a role rather than by handing out keys, which is what makes revoking access a one-line change.',
      facts: ['Artifacts, backups, static assets', 'Policy-based access']
    },
    {
      id: 'cloudwatch',
      label: 'CloudWatch',
      layer: 'observe',
      title: 'AWS CloudWatch — logs and metrics',
      desc:
        'Centralized logs and system metrics with alarms on the signals that matter. Centralizing first is the point: you cannot correlate an incident across hosts if each host keeps its own logs to itself.',
      facts: ['Centralized logging', 'Automated health alerts']
    },
    {
      id: 'guardduty',
      label: 'GuardDuty',
      layer: 'observe',
      title: 'AWS GuardDuty — threat detection',
      desc:
        'Continuously analyses account activity and network flow for behaviour that looks like compromise — unusual API calls, traffic to known-bad hosts — and raises findings automatically.',
      facts: ['Behavioural threat detection', 'Automated findings']
    },
    {
      id: 'securityhub',
      label: 'Security Hub',
      layer: 'observe',
      title: 'AWS Security Hub — posture aggregation',
      desc:
        'Collects findings from the security services into one view scored against benchmarks, so remediation is prioritised from a single list instead of five separate consoles.',
      facts: ['Aggregated security findings', 'Benchmark-scored posture']
    }
  ]
};

/** Prose for the philosophy section. Kept short; monospace body copy is tiring. */
export const philosophy = [
  {
    heading: 'Infrastructure should be readable',
    body:
      'A server someone configured by hand is a server nobody can rebuild. Declaring infrastructure in Terraform is less about automation than about legibility — the configuration is the documentation, review happens before the change lands, and rolling back is a revert rather than an archaeology project.'
  },
  {
    heading: 'The network is the first security control',
    body:
      'Most of what protects a system is decided before any application code runs: which subnet a workload sits in, which security group can reach it, whether the office talks to the cloud over an IPsec tunnel or over the public internet. Get the boundary right and the remaining controls have far less to defend.'
  },
  {
    heading: 'Centralize logs before you need them',
    body:
      'Logs that live on the host they describe are useless during the incident where that host is the problem. Centralizing them into CloudWatch, then alerting on the few signals that actually indicate trouble, is the difference between investigating an outage and guessing at one.'
  },
  {
    heading: 'Learn it by running it',
    body:
      'Everything here I picked up somewhere concrete — monitoring a national telecom network at Nepal Telecom, hardening infrastructure during the Leapfrog fellowship, then owning hybrid infrastructure at Kontract. I would rather be honest about a short career spent on real systems than pad it out.'
  }
];
