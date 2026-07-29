export const profile = {
  name: 'Bhupendra Kumar',
  role: 'Full Stack Developer',
  tagline: 'React • Node.js • Data Integrity',
  years: '4+ Years',
  email: 'bhuppi.rudra@gmail.com',
  phone: '+91 83190 83756',
  linkedin: 'https://linkedin.com/in/bhupendra-kumar-133987b3',
  linkedinLabel: 'bhupendra-kumar-133987b3',
  summary:
    'Full-stack developer who builds secure, scalable web applications for enterprise and government systems. I have delivered mission-critical SaaS products including certificate management platforms serving 22 CAs and quantum network monitoring systems following ETSI standards.',
  focus:
    'Known for end-to-end ownership, proactive stakeholder engagement, and robust data validation layers that reduced fraud risks by 45%.',
}

export type Achievement = {
  metric: string
  label: string
  detail: string
  animation?: 'increase' | 'decrease'
  startValue?: number
  endValue?: number
  suffix?: string
}

export const achievements: Achievement[] = [
  {
    metric: '45%',
    label: 'Fraud risk reduction',
    detail: 'via Hyperledger Fabric blockchain integration for a certificate platform serving 22 CAs.',
    animation: 'decrease',
    startValue: 100,
    endValue: 45,
  },
  {
    metric: '60%',
    label: 'Reporting accuracy',
    detail: 'improved with role-based access controls and automated dashboards, cutting manual tracking by 50%.',
    animation: 'increase',
    startValue: 0,
    endValue: 60,
  },
  {
    metric: '15K+',
    label: 'Users supported',
    detail: 'on a secure web platform, with 30% faster load times through performance optimization.',
    animation: 'increase',
    startValue: 0,
    endValue: 15000,
    suffix: 'K+',
  },
]

export const skillGroups = [
  {
    label: 'Front-End',
    items: ['React.js', 'JavaScript', 'Redux', 'HTML5', 'CSS3', 'Tailwind CSS', 'Hooks', 'State Management'],
  },
  {
    label: 'Back-End',
    items: ['Node.js', 'Express.js', 'RESTful APIs', 'Microservices', 'JWT Auth'],
  },
  {
    label: 'Databases',
    items: ['MySQL', 'MongoDB', 'NoSQL', 'Schema Design', 'Data Modeling', 'Query Optimization'],
  },
  {
    label: 'DevOps & Infra',
    items: ['Linux', 'CI/CD', 'Git', 'Docker', 'Deployment Pipelines'],
  },
  {
    label: 'Security & Compliance',
    items: ['RBAC', 'Data Validation', 'Audit Trails', 'ETSI Standards', 'Blockchain'],
  },
  {
    label: 'Tools & Methods',
    items: ['Agile', 'WebSocket', 'Electron.js', 'Data Structures', 'Algorithms'],
  },
]

export type Project = {
  index: string
  title: string
  org: string
  timeframe: string
  description: string
  stack: string[]
  stats: { label: string; value: string; animation?: 'increase' | 'decrease'; startValue?: number }[]
}

export const projects: Project[] = [
  {
    index: '01',
    title: 'QKD Network Monitoring Platform',
    org: 'Quntrol Sphere Pvt. Ltd.',
    timeframe: 'Aug 2025 — Mar 2026',
    description:
      'Full-stack quantum key distribution monitoring platform following ETSI GS QKD 014 standards. Built node-to-node key distribution using XOR one-time pad encryption for end-to-end security without exposing keys to the backend, plus a real-time dashboard with QBER tracking and automated security alerts.',
    stack: ['Node.js', 'React', 'WebSocket', 'MySQL', 'JWT'],
    stats: [
      { label: 'Standard', value: 'ETSI GS QKD 014' },
      { label: 'Encryption', value: 'XOR One-Time Pad' },
      { label: 'Access', value: 'Role-Based' },
    ],
  },
  {
    index: '02',
    title: 'CertStore — Certificate Management',
    org: 'CDAC',
    timeframe: 'Sept 2021 — Dec 2024',
    description:
      'Full-stack certificate management platform serving 22 Certificate Authorities across India. Integrated Hyperledger Fabric for enhanced data security and delivered RESTful APIs for certificate issuance and revocation with role-based dashboards.',
    stack: ['React.js', 'Node.js', 'MySQL', 'Hyperledger Fabric'],
    stats: [
      { label: 'Fraud risk', value: '-45%', animation: 'decrease', startValue: 100 },
      { label: 'Reporting accuracy', value: '+60%', animation: 'increase', startValue: 0 },
      { label: 'CAs served', value: '22' },
    ],
  },
  {
    index: '03',
    title: 'MAQAN Quantum Visualization',
    org: 'CDAC',
    timeframe: '2022 — 2024',
    description:
      'Desktop application built with Electron.js for quantum transmission visualization across multiple nodes in the Metro Area Quantum Access Network. Enhanced user decision-making and path selection across the network topology.',
    stack: ['Electron.js', 'JavaScript', 'Node.js'],
    stats: [
      { label: 'Comm. efficiency', value: '+35%' },
      { label: 'Target', value: 'Multi-node MAQAN' },
      { label: 'Type', value: 'Desktop App' },
    ],
  },
  {
    index: '04',
    title: 'IWBDC Secure Web Platform',
    org: 'CDAC · MeitY Initiative',
    timeframe: '2021 — 2024',
    description:
      'Led a team developing a secure web platform for the Indian Web Browser Development Challenge, supporting 15,000+ users. Reduced load times through performance optimization and hardened system security via advanced SDLC models.',
    stack: ['React.js', 'Node.js', 'MySQL', 'CI/CD'],
    stats: [
      { label: 'Users', value: '15,000+' },
      { label: 'Load time', value: '-30%' },
      { label: 'Security', value: '+50%' },
    ],
  },
]

export const experience = [
  {
    role: 'Freelance — Full Stack Developer',
    company: 'Quntrol Sphere Pvt. Ltd.',
    period: 'Aug 2025 — Mar 2026',
    points: [
      'Built a QKD network monitoring platform following ETSI GS QKD 014 standards for secure key delivery.',
      'Developed node-to-node key distribution with XOR one-time pad encryption and JWT-authenticated ETSI-compliant APIs.',
    ],
  },
  {
    role: 'Software Developer',
    company: 'ResolveBiz Services and Apps Pvt. Ltd.',
    period: 'Dec 2024 — Jul 2025',
    points: [
      'Developed responsive React.js interfaces for HR solutions including payroll, leave, and attendance systems.',
      'Implemented Redux state management for complex financial workflows and contributed to CI/CD pipelines.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'CDAC',
    period: 'Sept 2021 — Dec 2024',
    points: [
      'Built the CertStore certificate management platform serving 22 CAs, integrating Hyperledger Fabric to cut fraud risk 45%.',
      'Led a 15,000+ user secure web platform for the IWBDC initiative recognized by MeitY, India.',
    ],
  },
]

export const education = [
  {
    degree: 'PG Diploma in Advanced Computing (DAC)',
    school: 'CDAC, Bengaluru, India',
  },
  {
    degree: 'B.E. Electronics & Communication',
    school: 'Mahatma Jyoti Rao Phoole University, Jaipur, India',
  },
]

export const certifications = [
  'Project Lead for IWBDC — recognized by Ministry of Electronics & IT (MeitY), India',
  'Certified DevOps Practitioner (In Progress)',
]
