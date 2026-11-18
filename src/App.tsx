import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, MouseEvent, PointerEvent } from 'react'
import sceneBackground from './assets/afternoon-tea/scene-background-wall-hd.png'
import roundTable from './assets/afternoon-tea/round-table-tablecloth-hd.png'
import flowersBase from './assets/afternoon-tea/flowers-vase-base.png'
import workAipgptFlower from './assets/afternoon-tea/work-aipgpt-flower.png'
import workAipgptFlowerMenu from './assets/afternoon-tea/work-aipgpt-flower-menu.png'
import workEmpathiaFlower from './assets/afternoon-tea/work-empathia-flower.png'
import workYunjinFlower from './assets/afternoon-tea/work-yunjin-flower.png'
import workYunjinFlowerMenu from './assets/afternoon-tea/work-yunjin-flower-menu.png'
import workSkechersFlower from './assets/afternoon-tea/work-skechers-flower.png'
import workHrcFlower from './assets/afternoon-tea/work-hrc-flower.png'
import dessertStand from './assets/afternoon-tea/dessert-stand.png'
import cake from './assets/afternoon-tea/cake.png'
import smallCakePlate from './assets/afternoon-tea/small-cake-plate.png'
import teapot from './assets/afternoon-tea/teapot.png'
import teaCup from './assets/afternoon-tea/tea-cup.png'
import plants from './assets/afternoon-tea/plants.png'
import candle from './assets/afternoon-tea/candle.png'
import cherriesPlate from './assets/afternoon-tea/cherries-plate.png'
import cherrySecurity from './assets/afternoon-tea/cherry-security.png'
import cherryAwsAi from './assets/afternoon-tea/cherry-aws-ai.png'
import menu from './assets/afternoon-tea/menu.png'
import envelope from './assets/afternoon-tea/envelope.png'
import chair from './assets/afternoon-tea/chair.png'
import childhoodYellow from './assets/about/childhood-yellow.jpg'
import childhoodChef from './assets/about/childhood-chef.jpg'
import parentsPhoto from './assets/about/parents.jpg'
import burnabyCamping from './assets/about/burnaby-camping.jpg'
import burnabyFieldTrip from './assets/about/burnaby-field-trip.jpg'
import burnabySleepover from './assets/about/burnaby-sleepover.jpg'
import burnabyFarewellLetter from './assets/about/burnaby-farewell-letter.jpg'
import richmondMemoryVideo from './assets/about/richmond-memory.mp4'
import richmondGraduation from './assets/about/richmond-graduation.jpg'
import richmondHighSchool from './assets/about/richmond-high-school.jpg'
import richmondFamilyCooking from './assets/about/richmond-family-cooking.jpg'
import richmondFriends from './assets/about/richmond-friends.jpg'
import hrcWorkstation from './assets/work-experience/hrc-workstation.jpg'
import skechersEmail from './assets/work-experience/skechers-email.png'
import yunjinPlatform from './assets/work-experience/yunjin-platform.jpg'
import yunjinCertificatePreview from './assets/work-experience/yunjin-certificate-preview.png'
import empathiaWorkspace from './assets/work-experience/empathia-workspace.jpg'
import empathiaCertificatePreview from './assets/work-experience/empathia-certificate-preview.png'
import aipgptCertificatePreview from './assets/work-experience/aipgpt-certificate-preview.png'
import projectCake01 from './assets/projects/project-cake-01.png'
import projectCake02 from './assets/projects/project-cake-02.png'
import projectCake03 from './assets/projects/project-cake-03.png'
import projectCake04 from './assets/projects/project-cake-04.png'
import projectCake05 from './assets/projects/project-cake-05.png'
import projectCake06 from './assets/projects/project-cake-06.png'
import projectCake07 from './assets/projects/project-cake-07.png'
import projectCake08 from './assets/projects/project-cake-08.png'
import projectCake09 from './assets/projects/project-cake-09.png'
import './App.css'

const navigation = [
  { label: 'Work Experience', className: 'nav-work' },
  { label: 'Technical Skills', className: 'nav-skills' },
  { label: 'Projects', className: 'nav-projects' },
  { label: 'About Me', className: 'nav-about' },
  { label: 'Education', className: 'nav-education' },
  { label: 'Day / Night', className: 'nav-theme' },
  { label: 'Certifications', className: 'nav-certifications' },
  { label: 'Résumé', className: 'nav-resume' },
  { label: 'Contact', className: 'nav-contact' },
]

const resumePdfUrl = '/resume/serena-chen-resume.pdf'
const resumeWordUrl = '/resume/serena-chen-resume.docx'
const transitionDuration = 900
const aboutTransitionDuration = 2200

const aboutChapters = [
  { title: 'Where My Story Began' },
  { title: 'A Place I Still Remember' },
  { title: 'Another New Beginning' },
  { title: 'How My Journey Shaped Me' },
]

type ExperienceId = 'aipgpt' | 'empathia' | 'yunjin' | 'skechers' | 'hrc'

type WorkExperience = {
  company: string
  heading: string
  affiliation?: string
  role: string
  period: string
  location: string
  responsibilities: string[]
  technologies: string[]
  className: string
  asset: string
  menuAsset: string
  photos?: Array<{
    src: string
    alt: string
  }>
  document?: {
    previewSrc: string
    url: string
    title: string
  }
  translation?: string
}

const workExperiences: Record<ExperienceId, WorkExperience> = {
  aipgpt: {
    company: 'AIPGPT',
    heading: 'AIPGPT',
    role: 'Customer Support Engineer',
    period: 'January 2025 – April 2025',
    location: 'BC, Canada · Remote',
    responsibilities: [
      'Customer feedback and bug reporting',
      'AI-generated video testing',
      'API testing and debugging',
      'Product release validation',
    ],
    technologies: ['Postman', 'REST APIs', 'AI Prompt Engineering'],
    className: 'work-flower-aipgpt',
    asset: workAipgptFlower,
    menuAsset: workAipgptFlowerMenu,
    document: {
      previewSrc: aipgptCertificatePreview,
      url: '/work-experience/aipgpt-verification.pdf',
      title: 'AIPGPT Internship Verification Letter',
    },
  },
  empathia: {
    company: 'Empathia AI',
    heading: 'Empathia AI',
    role: 'Software Engineer Co-op',
    period: 'September 2024 – January 2025',
    location: 'BC, Canada · Remote',
    responsibilities: [
      'Full-stack development of an AI medical assistant',
      'AI-powered PDF Autofill feature development',
      'Software deployment and product releases',
      'Collaboration with clinics and hospitals',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Python', 'OpenAI API', 'AWS S3', 'Jenkins'],
    className: 'work-flower-empathia',
    asset: workEmpathiaFlower,
    menuAsset: workEmpathiaFlower,
    photos: [{
      src: empathiaWorkspace,
      alt: 'Serena’s software development workspace during her Empathia AI experience',
    }],
    document: {
      previewSrc: empathiaCertificatePreview,
      url: '/work-experience/empathia-verification.pdf',
      title: 'Empathia AI Employment Agreement',
    },
  },
  yunjin: {
    company: 'Yunjin Smart Technology',
    heading: 'Yunjin Smart Technology',
    affiliation: 'China Unicom-affiliated',
    role: 'AI Product Development Engineer Co-op',
    period: 'June 2024 – September 2024',
    location: 'Sichuan, China',
    responsibilities: [
      'AI-powered public service platform development',
      'Frontend development',
      'AI response evaluation and testing',
      'Internal QA tool development',
    ],
    technologies: ['Vue.js', 'Ant Design Vue', 'Pinia', 'Tailwind CSS', 'RAG'],
    className: 'work-flower-yunjin',
    asset: workYunjinFlower,
    menuAsset: workYunjinFlowerMenu,
    photos: [{
      src: yunjinPlatform,
      alt: 'Resource management interface developed during Serena’s Yunjin Smart Technology internship',
    }],
    document: {
      previewSrc: yunjinCertificatePreview,
      url: '/work-experience/yunjin-internship-certificate.pdf',
      title: 'Yunjin Smart Technology Internship Certificate',
    },
    translation: 'English translation: Serena Chen interned at China Unicom Digital Technology’s Chengdu R&D Center from June 10 to August 30, 2024 as an AI Government Large-Model R&D Assistant. Her work included frontend development, RAG system evaluation, feature testing, and issue analysis.',
  },
  skechers: {
    company: 'Skechers',
    heading: 'Skechers · McArthurGlen Outlet Store',
    role: 'Retail Sales Associate',
    period: 'June 2022 – September 2022',
    location: 'BC, Canada',
    responsibilities: [
      'Customer service',
      'Product recommendations and sales',
      'Inventory management',
      'Transaction processing',
    ],
    technologies: [],
    className: 'work-flower-skechers',
    asset: workSkechersFlower,
    menuAsset: workSkechersFlower,
    photos: [{
      src: skechersEmail,
      alt: 'Email confirming Serena’s Skechers employee setup at the McArthurGlen Outlet Store',
    }],
  },
  hrc: {
    company: 'HRC Fertility Center',
    heading: 'HRC Fertility Center',
    role: 'Front Desk and EHR Data Entry Clerk',
    period: 'June 2020 – September 2020',
    location: '',
    responsibilities: [
      'Electronic health record (EHR) data entry',
      'Patient record management',
      'Appointment scheduling',
      'Front desk operations',
    ],
    technologies: [],
    className: 'work-flower-hrc',
    asset: workHrcFlower,
    menuAsset: workHrcFlower,
    photos: [{
      src: hrcWorkstation,
      alt: 'Front desk workstation used during Serena’s HRC Fertility Center experience',
    }],
  },
}

const workExperienceOrder: ExperienceId[] = ['hrc', 'skechers', 'yunjin', 'empathia', 'aipgpt']

type ProjectId = 'project-1' | 'project-2' | 'project-3' | 'project-4' | 'project-5' | 'project-6' | 'project-7' | 'project-8' | 'project-9'

const projects = [
  { id: 'project-1', asset: projectCake01, group: 'large' },
  { id: 'project-2', asset: projectCake02, group: 'large' },
  { id: 'project-3', asset: projectCake03, group: 'large' },
  { id: 'project-4', asset: projectCake04, group: 'large' },
  { id: 'project-5', asset: projectCake05, group: 'large' },
  { id: 'project-6', asset: projectCake06, group: 'large' },
  { id: 'project-7', asset: projectCake07, group: 'small' },
  { id: 'project-8', asset: projectCake08, group: 'small' },
  { id: 'project-9', asset: projectCake09, group: 'small' },
] satisfies Array<{ id: ProjectId; asset: string; group: 'large' | 'small' }>

const WorkFlowerCrop = ({
  experienceId,
  variant = 'scene',
}: {
  experienceId: ExperienceId
  variant?: 'scene' | 'menu'
}) => (
  <span className={`work-flower-crop ${workExperiences[experienceId].className}-crop`} aria-hidden="true">
    <img
      src={variant === 'menu' ? workExperiences[experienceId].menuAsset : workExperiences[experienceId].asset}
      alt=""
    />
  </span>
)

type CertificationId = 'security' | 'aws-ai'

const certifications = {
  security: {
    shortTitle: 'CompTIA Security+',
    title: 'CompTIA Security+ (SY0-701)',
    issuer: 'CompTIA',
    examCode: 'SY0-701',
    expected: 'November 2026',
    officialUrl: 'https://www.comptia.org/en-us/certifications/security/',
    officialDomain: 'comptia.org',
    officialSummary: 'CompTIA Security+ validates the baseline skills needed to perform core security functions and pursue an IT security career.',
    previewPoints: ['General security concepts', 'Threats, vulnerabilities, and mitigations', 'Security architecture and operations', 'Security program management and oversight'],
    why: 'I am pursuing Security+ to strengthen and validate my practical foundation in threats, risk, identity, secure architecture, and security operations. It supports the way I want to build thoughtful products: with security considered from the beginning rather than added at the end.',
  },
  'aws-ai': {
    shortTitle: 'AWS AI Practitioner',
    title: 'AWS Certified AI Practitioner (AIF-C01)',
    issuer: 'Amazon Web Services',
    examCode: 'AIF-C01',
    expected: 'December 2026',
    officialUrl: 'https://aws.amazon.com/certification/certified-ai-practitioner/',
    officialDomain: 'aws.amazon.com',
    officialSummary: 'AWS Certified AI Practitioner validates foundational knowledge of AI, machine learning, generative AI concepts, and their use with AWS services.',
    previewPoints: ['AI and machine learning fundamentals', 'Generative AI and foundation models', 'Responsible AI practices', 'Security, compliance, and governance'],
    why: 'I am pursuing AWS Certified AI Practitioner to formalize my understanding of AI, machine learning, and generative AI on AWS. It connects my product and development experience with responsible, secure cloud AI decisions and gives me a stronger vocabulary for collaborating across technical and business teams.',
  },
} satisfies Record<CertificationId, {
  shortTitle: string
  title: string
  issuer: string
  examCode: string
  expected: string
  officialUrl: string
  officialDomain: string
  officialSummary: string
  previewPoints: string[]
  why: string
}>

const getResumeFileName = (extension: 'pdf' | 'docx') => {
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Vancouver',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())

  return `Serena_Chen_${today}.${extension}`
}

function App() {
  const [view, setView] = useState<'scene' | 'resume' | 'certification' | 'experience' | 'project' | 'about'>('scene')
  const [isOpeningResume, setIsOpeningResume] = useState(false)
  const [isClosingResume, setIsClosingResume] = useState(false)
  const [activeCertification, setActiveCertification] = useState<CertificationId>('security')
  const [isOpeningCertification, setIsOpeningCertification] = useState(false)
  const [isClosingCertification, setIsClosingCertification] = useState(false)
  const [isOpeningAbout, setIsOpeningAbout] = useState(false)
  const [isClosingAbout, setIsClosingAbout] = useState(false)
  const [activeExperienceId, setActiveExperienceId] = useState<ExperienceId>('aipgpt')
  const [isOpeningExperience, setIsOpeningExperience] = useState(false)
  const [isClosingExperience, setIsClosingExperience] = useState(false)
  const [activeProjectId, setActiveProjectId] = useState<ProjectId>('project-1')
  const [isOpeningProject, setIsOpeningProject] = useState(false)
  const [isClosingProject, setIsClosingProject] = useState(false)
  const [selectedExperiencePhoto, setSelectedExperiencePhoto] = useState<{ src: string; alt: string } | null>(null)
  const [selectedExperienceDocument, setSelectedExperienceDocument] = useState<{
    url: string
    title: string
    previewSrc: string
  } | null>(null)
  const [aboutPageIndex, setAboutPageIndex] = useState(0)
  const [selectedAboutPhoto, setSelectedAboutPhoto] = useState<{ src: string; alt: string } | null>(null)
  const [isAboutVideoExpanded, setIsAboutVideoExpanded] = useState(false)
  const [spreadOrigin, setSpreadOrigin] = useState({ x: 50, y: 50 })
  const transitionTimer = useRef<number | undefined>(undefined)
  const teaCupRef = useRef<HTMLImageElement | null>(null)

  const certification = certifications[activeCertification]
  const activeExperience = workExperiences[activeExperienceId]
  const activeProject = projects.find((project) => project.id === activeProjectId) ?? projects[0]
  const activeAboutChapter = aboutChapters[aboutPageIndex]
  const spreadStyle = {
    '--spread-x': `${spreadOrigin.x}%`,
    '--spread-y': `${spreadOrigin.y}%`,
  } as CSSProperties
  const isSceneTransitioning = isOpeningResume
    || isClosingResume
    || isOpeningCertification
    || isClosingCertification
    || isOpeningAbout
    || isClosingAbout
    || isOpeningExperience
    || isClosingExperience
    || isOpeningProject
    || isClosingProject

  useEffect(() => () => {
    if (transitionTimer.current !== undefined) {
      window.clearTimeout(transitionTimer.current)
    }
  }, [])

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    event.currentTarget.style.setProperty('--pointer-x', `${x * 12}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${y * 8}px`)
  }

  const resetPointer = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--pointer-x', '0px')
    event.currentTarget.style.setProperty('--pointer-y', '0px')
  }

  const openResume = () => {
    if (isOpeningResume) return

    setIsOpeningResume(true)
    transitionTimer.current = window.setTimeout(() => {
      setView('resume')
      setIsOpeningResume(false)
      transitionTimer.current = undefined
    }, transitionDuration)
  }

  const closeResume = () => {
    if (isClosingResume) return

    setIsClosingResume(true)
    setView('scene')
    transitionTimer.current = window.setTimeout(() => {
      setIsClosingResume(false)
      transitionTimer.current = undefined
    }, transitionDuration)
  }

  const openCertification = (
    certificationId: CertificationId,
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    if (isOpeningCertification || isClosingCertification) return

    const bounds = event.currentTarget.getBoundingClientRect()
    setActiveCertification(certificationId)
    setSpreadOrigin({
      x: ((bounds.left + bounds.width / 2) / window.innerWidth) * 100,
      y: ((bounds.top + bounds.height / 2) / window.innerHeight) * 100,
    })
    setIsOpeningCertification(true)
    transitionTimer.current = window.setTimeout(() => {
      setView('certification')
      setIsOpeningCertification(false)
      transitionTimer.current = undefined
    }, transitionDuration)
  }

  const closeCertification = () => {
    if (isClosingCertification) return

    setIsClosingCertification(true)
    setView('scene')
    transitionTimer.current = window.setTimeout(() => {
      setIsClosingCertification(false)
      transitionTimer.current = undefined
    }, transitionDuration)
  }

  const openExperience = (
    experienceId: ExperienceId,
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    if (isOpeningExperience || isClosingExperience) return

    const bounds = event.currentTarget.getBoundingClientRect()
    setActiveExperienceId(experienceId)
    setSelectedExperiencePhoto(null)
    setSelectedExperienceDocument(null)
    setSpreadOrigin({
      x: ((bounds.left + bounds.width / 2) / window.innerWidth) * 100,
      y: ((bounds.top + bounds.height / 2) / window.innerHeight) * 100,
    })
    setIsOpeningExperience(true)
    transitionTimer.current = window.setTimeout(() => {
      setView('experience')
      setIsOpeningExperience(false)
      transitionTimer.current = undefined
    }, transitionDuration)
  }

  const closeExperience = () => {
    if (isClosingExperience) return

    setIsClosingExperience(true)
    setSelectedExperiencePhoto(null)
    setSelectedExperienceDocument(null)
    setView('scene')
    transitionTimer.current = window.setTimeout(() => {
      setIsClosingExperience(false)
      transitionTimer.current = undefined
    }, transitionDuration)
  }

  const openProject = (
    projectId: ProjectId,
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    if (isOpeningProject || isClosingProject) return

    const bounds = event.currentTarget.getBoundingClientRect()
    setActiveProjectId(projectId)
    setSpreadOrigin({
      x: ((bounds.left + bounds.width / 2) / window.innerWidth) * 100,
      y: ((bounds.top + bounds.height / 2) / window.innerHeight) * 100,
    })
    setIsOpeningProject(true)
    transitionTimer.current = window.setTimeout(() => {
      setView('project')
      setIsOpeningProject(false)
      transitionTimer.current = undefined
    }, transitionDuration)
  }

  const closeProject = () => {
    if (isClosingProject) return

    setIsClosingProject(true)
    setView('scene')
    transitionTimer.current = window.setTimeout(() => {
      setIsClosingProject(false)
      transitionTimer.current = undefined
    }, transitionDuration)
  }

  const openAbout = () => {
    if (isOpeningAbout || isClosingAbout) return

    const bounds = teaCupRef.current?.getBoundingClientRect()
    if (bounds) {
      setSpreadOrigin({
        x: ((bounds.left + bounds.width / 2) / window.innerWidth) * 100,
        y: ((bounds.top + bounds.height / 2) / window.innerHeight) * 100,
      })
    }

    setAboutPageIndex(0)
    setSelectedAboutPhoto(null)
    setIsAboutVideoExpanded(false)
    setIsOpeningAbout(true)
    transitionTimer.current = window.setTimeout(() => {
      setView('about')
      setIsOpeningAbout(false)
      transitionTimer.current = undefined
    }, aboutTransitionDuration)
  }

  const closeAbout = () => {
    if (isClosingAbout) return

    setIsClosingAbout(true)
    setSelectedAboutPhoto(null)
    setIsAboutVideoExpanded(false)
    setView('scene')
    transitionTimer.current = window.setTimeout(() => {
      setIsClosingAbout(false)
      transitionTimer.current = undefined
    }, transitionDuration)
  }

  const showNextAboutPage = () => {
    setAboutPageIndex((currentPage) => Math.min(currentPage + 1, aboutChapters.length - 1))
  }

  return (
    <main className="portfolio-shell" aria-label="Serena Chen portfolio home">
      {view === 'scene' ? (
        <section
          className={`tea-scene${isOpeningResume ? ' is-opening-resume' : ''}${isClosingResume ? ' is-closing-resume' : ''}${isOpeningCertification ? ' is-opening-certification' : ''}${isClosingCertification ? ' is-closing-certification' : ''}${isOpeningAbout ? ' is-opening-about' : ''}${isClosingAbout ? ' is-closing-about' : ''}${isOpeningExperience ? ' is-opening-experience' : ''}${isClosingExperience ? ' is-closing-experience' : ''}${isOpeningProject ? ' is-opening-project' : ''}${isClosingProject ? ' is-closing-project' : ''}`}
          aria-labelledby="portfolio-title"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
        >
          <img
            className="scene-background"
            src={sceneBackground}
            alt="Mount Fuji and a flower garden beyond a lace-curtained window and light brown wall"
          />

          <img
            className="scene-object round-table"
            src={roundTable}
            alt="A round table covered with a patchwork cloth, lace trim, and dark green skirt"
          />

          <header className="title-plaque">
            <span className="title-flower" aria-hidden="true">✿</span>
            <div>
              <p>Welcome to</p>
              <h1 id="portfolio-title">Serena Chen’s Portfolio</h1>
            </div>
            <span className="title-flower" aria-hidden="true">✿</span>
          </header>

          <img className="scene-object flowers" src={flowersBase} alt="A floral vase with pink and white flowers" />
          <div className="work-flower-layer" aria-label="Work experience flowers">
            {(Object.keys(workExperiences) as ExperienceId[]).map((experienceId) => {
              const experience = workExperiences[experienceId]

              return (
                <button
                  className={`work-flower-trigger ${experience.className}`}
                  type="button"
                  aria-label={`Open ${experience.company} work experience`}
                  key={experienceId}
                  onClick={(event) => openExperience(experienceId, event)}
                  disabled={isSceneTransitioning}
                >
                  <WorkFlowerCrop experienceId={experienceId} />
                </button>
              )
            })}
          </div>
          <img className="scene-object dessert-stand" src={dessertStand} alt="A two-tier stand with five cupcakes" />
          <img className="scene-object cake" src={cake} alt="Six cake slices arranged as a round cake" />
          <div className="project-cake-layer project-cake-layer-large" aria-label="Projects 1 through 6">
            {projects.filter((project) => project.group === 'large').map((project, index) => (
              <button
                className={`project-cake-trigger project-cake-trigger-${index + 1}`}
                type="button"
                aria-label={`Open Project ${index + 1}`}
                key={project.id}
                onClick={(event) => openProject(project.id, event)}
                disabled={isSceneTransitioning}
              >
                <img src={project.asset} alt="" />
              </button>
            ))}
          </div>
          <img
            className="scene-object small-cake-plate"
            src={smallCakePlate}
            alt="Three colorful cake slices on a floral plate"
          />
          <div className="project-cake-layer project-cake-layer-small" aria-label="Projects 7 through 9">
            {projects.filter((project) => project.group === 'small').map((project, index) => (
              <button
                className={`project-cake-trigger project-cake-trigger-${index + 7}`}
                type="button"
                aria-label={`Open Project ${index + 7}`}
                key={project.id}
                onClick={(event) => openProject(project.id, event)}
                disabled={isSceneTransitioning}
              >
                <img src={project.asset} alt="" />
              </button>
            ))}
          </div>
          <button
            className="scene-object teapot teapot-trigger"
            type="button"
            aria-label="Open About Me"
            onClick={openAbout}
            disabled={isSceneTransitioning}
          >
            <img src={teapot} alt="" />
          </button>
          <span className="tea-pour-stream" aria-hidden="true" />
          <img
            ref={teaCupRef}
            className="scene-object tea-cup"
            src={teaCup}
            alt="A floral teacup filled with tea on a matching saucer"
          />
          <img className="scene-object plants" src={plants} alt="Two floral pots showing plants at different growth stages" />
          <img className="scene-object candle" src={candle} alt="A lit candle in a floral holder" />
          <div className="scene-object cherries cherries-interactive">
            <img className="cherry-plate" src={cherriesPlate} alt="Two cherries on a floral saucer" />
            <button
              className="cherry-hotspot cherry-hotspot-left"
              type="button"
              aria-label="Open CompTIA Security+ certification"
              onClick={(event) => openCertification('security', event)}
              disabled={isSceneTransitioning}
            />
            <button
              className="cherry-hotspot cherry-hotspot-right"
              type="button"
              aria-label="Open AWS Certified AI Practitioner certification"
              onClick={(event) => openCertification('aws-ai', event)}
              disabled={isSceneTransitioning}
            />
            <img className="cherry-layer cherry-layer-left" src={cherrySecurity} alt="" />
            <img className="cherry-layer cherry-layer-right" src={cherryAwsAi} alt="" />
          </div>
          <button
            className="scene-object menu menu-trigger"
            type="button"
            aria-label="Open résumé"
            onClick={openResume}
            disabled={isSceneTransitioning}
          >
            <img src={menu} alt="" />
          </button>
          <img className="scene-object envelope" src={envelope} alt="A floral envelope with a gold seal" />
          <img className="scene-object chair" src={chair} alt="A dark wooden chair with purple upholstery" />

          <nav className="scene-navigation" aria-label="Portfolio sections">
            {navigation.map(({ label, className }) => (
              <button
                className={`nav-plaque ${className}`}
                type="button"
                key={label}
                disabled={isSceneTransitioning}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="paper-texture" aria-hidden="true" />
        </section>
      ) : view === 'resume' ? (
        <section className="resume-page" aria-labelledby="resume-page-title">
          <header className="resume-toolbar">
            <button className="resume-back-button" type="button" onClick={closeResume}>
              <span aria-hidden="true">←</span>
              Go Back
            </button>
            <div className="resume-heading">
              <p>Serena Chen</p>
              <h1 id="resume-page-title">Résumé</h1>
            </div>
            <div className="resume-downloads" aria-label="Resume downloads">
              <a href={resumePdfUrl} download={getResumeFileName('pdf')}>Download PDF</a>
              <a href={resumeWordUrl} download={getResumeFileName('docx')}>Download Word</a>
            </div>
          </header>

          <div className="resume-preview-shell">
            <iframe
              className="resume-preview"
              src={`${resumePdfUrl}#view=FitH`}
              title="Serena Chen resume preview"
            />
          </div>
        </section>
      ) : view === 'certification' ? (
        <section className="resume-page certification-page" aria-labelledby="certification-page-title">
          <header className="resume-toolbar certification-toolbar">
            <button className="resume-back-button" type="button" onClick={closeCertification}>
              <span aria-hidden="true">←</span>
              Go Back
            </button>
            <div className="resume-heading">
              <p>Certification Path</p>
              <h1 id="certification-page-title">{certification.shortTitle}</h1>
            </div>
            <div className="resume-downloads certification-actions">
              <a href={certification.officialUrl} target="_blank" rel="noreferrer">
                Open Official Website <span aria-hidden="true">↗</span>
              </a>
            </div>
          </header>

          <div className="certification-content">
            <article className="certification-intro">
              <p className="certification-kicker">Expected {certification.expected}</p>
              <h2>{certification.title}</h2>
              <p className="certification-why">{certification.why}</p>
              <dl className="certification-facts">
                <div>
                  <dt>Issuer</dt>
                  <dd>{certification.issuer}</dd>
                </div>
                <div>
                  <dt>Exam</dt>
                  <dd>{certification.examCode}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>In progress</dd>
                </div>
              </dl>
            </article>

            <section className="official-site-preview" aria-labelledby="official-preview-title">
              <div className="preview-browser-bar">
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <p id="official-preview-title">Official website preview</p>
              </div>
              <div className="official-preview-content">
                <p className="official-preview-domain">{certification.officialDomain}</p>
                <p className="official-preview-issuer">{certification.issuer}</p>
                <h2>{certification.title}</h2>
                <p className="official-preview-summary">{certification.officialSummary}</p>
                <ul>
                  {certification.previewPoints.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </div>
              <p className="preview-fallback">
                Preview based on the official certification overview. Open the website for full details.
              </p>
            </section>

            <aside className="certificate-preview" aria-label="Certificate preview">
              <p className="certificate-status">Certificate preview · Pending</p>
              <div className="certificate-seal" aria-hidden="true">SC</div>
              <p className="certificate-issuer">{certification.issuer}</p>
              <h2>{certification.shortTitle}</h2>
              <p className="certificate-code">{certification.examCode}</p>
              <p className="certificate-note">
                The verified certificate will be displayed here after it is earned.
              </p>
              <p className="certificate-expected">Expected {certification.expected}</p>
            </aside>
          </div>
        </section>
      ) : view === 'experience' ? (
        <section className="resume-page work-experience-page" aria-labelledby="work-experience-page-title">
          <header className="work-experience-toolbar">
            <button className="resume-back-button" type="button" onClick={closeExperience}>
              <span aria-hidden="true">←</span>
              Go Back
            </button>
            <h1 className="visually-hidden" id="work-experience-page-title">Work Experience</h1>
            <nav className="work-experience-tabs" aria-label="Work experience timeline">
              {workExperienceOrder.map((experienceId, index) => {
                const experience = workExperiences[experienceId]
                const isActive = experienceId === activeExperienceId

                return (
                  <button
                    className={`work-experience-tab${isActive ? ' is-active' : ''}`}
                    type="button"
                    aria-label={`Show Work Experience ${index + 1}: ${experience.company}`}
                    aria-current={isActive ? 'page' : undefined}
                    key={experienceId}
                    onClick={() => {
                      setActiveExperienceId(experienceId)
                      setSelectedExperiencePhoto(null)
                      setSelectedExperienceDocument(null)
                    }}
                  >
                    {isActive && (
                      <span className="work-menu-flower">
                        <WorkFlowerCrop experienceId={experienceId} variant="menu" />
                      </span>
                    )}
                    <span>Work Experience {index + 1}</span>
                  </button>
                )
              })}
            </nav>
          </header>

          <div className="work-experience-layout" key={activeExperienceId}>
            <section
              className={`work-experience-media work-experience-media-${activeExperienceId}`}
              aria-label={`${activeExperience.company} supporting media`}
            >
              <div className="work-media-stack">
                {activeExperience.document && (
                  <button
                    className="work-media-card work-media-document"
                    type="button"
                    aria-label={`Open ${activeExperience.document.title}`}
                    onClick={() => setSelectedExperienceDocument({
                      url: activeExperience.document!.url,
                      title: activeExperience.document!.title,
                      previewSrc: activeExperience.document!.previewSrc,
                    })}
                  >
                    <img src={activeExperience.document.previewSrc} alt="" />
                    <span>Open PDF</span>
                  </button>
                )}

                {activeExperience.photos?.map((photo) => (
                  <button
                    className="work-media-card work-media-photo"
                    type="button"
                    aria-label={`View ${photo.alt}`}
                    key={photo.src}
                    onClick={() => setSelectedExperiencePhoto(photo)}
                  >
                    <img src={photo.src} alt="" />
                    <span>View photo</span>
                  </button>
                ))}
              </div>

              {activeExperience.translation && (
                <p className="work-media-translation">{activeExperience.translation}</p>
              )}
            </section>

            <article className="work-experience-content" aria-live="polite">
              <p className="work-experience-chapter">
                Work Experience {workExperienceOrder.indexOf(activeExperienceId) + 1}
              </p>
              <h2>{activeExperience.heading}</h2>
              {'affiliation' in activeExperience && activeExperience.affiliation && (
                <p className="work-experience-affiliation">
                  {activeExperience.affiliation}
                </p>
              )}
              <p className="work-experience-role">{activeExperience.role}</p>
              <p className="work-experience-meta">
                {activeExperience.period}
                {activeExperience.location && (
                  <>
                    <span aria-hidden="true"> | </span>
                    {activeExperience.location}
                  </>
                )}
              </p>

              <ul className="work-experience-responsibilities">
                {activeExperience.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>

              {activeExperience.technologies.length > 0 && (
                <div className="work-experience-technologies">
                  <h3>Technologies</h3>
                  <ul>
                    {activeExperience.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          </div>

          {selectedExperiencePhoto && (
            <div className="work-media-lightbox" role="dialog" aria-modal="true" aria-label="Work photo preview">
              <button
                className="work-media-close"
                type="button"
                aria-label="Close work photo preview"
                onClick={() => setSelectedExperiencePhoto(null)}
              >
                ×
              </button>
              <img src={selectedExperiencePhoto.src} alt={selectedExperiencePhoto.alt} />
            </div>
          )}

          {selectedExperienceDocument && (
            <div className="work-document-lightbox" role="dialog" aria-modal="true" aria-label="Work document preview">
              <header>
                <h2>{selectedExperienceDocument.title}</h2>
                <button
                  className="work-media-close"
                  type="button"
                  aria-label="Close work document preview"
                  onClick={() => setSelectedExperienceDocument(null)}
                >
                  ×
                </button>
              </header>
              <div className="work-document-preview-stage">
                <img
                  src={selectedExperienceDocument.previewSrc}
                  alt={`Preview of ${selectedExperienceDocument.title}`}
                />
                <a href={selectedExperienceDocument.url} target="_blank" rel="noreferrer">
                  Open full PDF in new tab
                </a>
              </div>
            </div>
          )}
        </section>
      ) : view === 'project' ? (
        <section className="resume-page project-page" aria-labelledby="project-page-title">
          <header className="project-toolbar">
            <button className="resume-back-button" type="button" onClick={closeProject}>
              <span aria-hidden="true">←</span>
              Go Back
            </button>
            <h1 className="visually-hidden" id="project-page-title">Projects</h1>
            <nav className="project-tabs" aria-label="Project menu">
              {projects.map((project, index) => {
                const isActive = project.id === activeProjectId

                return (
                  <button
                    className={`project-tab${isActive ? ' is-active' : ''}`}
                    type="button"
                    aria-label={`Show Project ${index + 1}`}
                    aria-current={isActive ? 'page' : undefined}
                    key={project.id}
                    onClick={() => setActiveProjectId(project.id)}
                  >
                    {isActive && <img src={project.asset} alt="" />}
                    <span>Project {index + 1}</span>
                  </button>
                )
              })}
            </nav>
          </header>

          <section
            className={`project-empty-page${
              activeProjectId === 'project-1' || activeProjectId === 'project-2'
                ? ' has-project-embed'
                : ''
            }`}
            key={activeProjectId}
            aria-live="polite"
          >
            {activeProjectId === 'project-1' ? (
              <article className="project-one-showcase">
                <section className="project-game-preview" aria-labelledby="project-one-title">
                  <header>
                    <div>
                      <p>WebGL · Computer Graphics</p>
                      <h2 id="project-one-title">Interactive WebGL Sphere Game</h2>
                    </div>
                    <a href="/projects/project-1/index.html" target="_blank" rel="noreferrer">
                      Open full screen
                    </a>
                  </header>
                  <iframe
                    src="/projects/project-1/index.html"
                    title="Interactive WebGL sphere game"
                    allow="fullscreen"
                  />
                </section>

                <aside className="project-user-guide" aria-labelledby="project-user-guide-title">
                  <div className="project-user-guide-heading">
                    <p>Documentation Preview</p>
                    <h2 id="project-user-guide-title">User Guide</h2>
                  </div>

                  <div className="project-user-guide-paper" tabIndex={0}>
                    <h3>Game start</h3>
                    <p>When you open the html file (or the website), the game will start.</p>
                    <p>
                      You can see there are 10 bacterias (with different colors) growing in same
                      speed on the white disk.
                    </p>

                    <h3>Users Play</h3>
                    <p>You need to move your mouse on the bacterias and click it.</p>
                    <p>
                      If you click the bacterias before they grow to certain size, the bacterias
                      will disapear (you also can say that you killed the bacterias) and you
                      (Player) can gain points.
                    </p>
                    <p>
                      If the bacterias grow to the certain size and you didn’t click on it, the
                      computer (Game) will gain points.
                    </p>
                    <p>
                      The certain size is not too big and grow speed is not too slow, which make
                      the game harder.
                    </p>

                    <h3>You Win</h3>
                    <p>You have to kill at leat 20 bacterias.</p>

                    <h3>Game Win</h3>
                    <p>
                      If 1 or more bacteria grow to certain size, you will lose. The certain size
                      is determined by the radius which is less than 30.
                    </p>
                  </div>

                  <div className="project-download-actions">
                    <a
                      href="/projects/project-1/downloads/Serena_Chen_Project_1_User_Guide.docx"
                      download
                    >
                      Download User Guide
                    </a>
                    <a
                      href="/projects/project-1/downloads/Serena_Chen_Project_1_Demo.zip"
                      download
                    >
                      Download Project ZIP File
                    </a>
                  </div>
                </aside>
              </article>
            ) : activeProjectId === 'project-2' ? (
              <article className="project-two-showcase">
                <header className="project-two-heading">
                  <div>
                    <p>Human-Computer Interaction · Android</p>
                    <h2>FamPlan</h2>
                  </div>
                  <a
                    className="project-two-github-link"
                    href="https://github.com/SerenaChen7/COSC419B_2025W2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View GitHub Repository
                  </a>
                </header>

                <div className="project-two-content">
                  <section className="project-two-videos" aria-label="FamPlan video previews">
                    <article className="project-video-card">
                      <h3>Prototype Video</h3>
                      <iframe
                        src="https://www.youtube.com/embed/qs2WD_q5hG0"
                        title="FamPlan prototype video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </article>

                    <article className="project-video-card">
                      <h3>Project Video</h3>
                      <iframe
                        src="https://www.youtube.com/embed/mbW4mDufstQ"
                        title="FamPlan project video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </article>
                  </section>

                  <section className="project-report-card" aria-labelledby="project-two-report-title">
                    <header>
                      <div>
                        <p>Course Project · Final Report</p>
                        <h3 id="project-two-report-title">Main Report</h3>
                      </div>
                      <a
                        href="/projects/project-2/Group13_Step4_Main_Report.pdf"
                        download="FamPlan_Main_Report.pdf"
                      >
                        Download Report
                      </a>
                    </header>
                    <a
                      className="project-report-preview"
                      href="/projects/project-2/Group13_Step4_Main_Report.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="/projects/project-2/Group13_Step4_Main_Report_preview.png"
                        alt="Preview of the FamPlan main report first page"
                      />
                      <span>Open Full Report</span>
                    </a>
                  </section>
                </div>
              </article>
            ) : (
              <img src={activeProject.asset} alt="" aria-hidden="true" />
            )}
          </section>
        </section>
      ) : (
        <section className="resume-page about-page" aria-labelledby="about-page-title">
          <header className="resume-toolbar about-toolbar">
            <button className="resume-back-button" type="button" onClick={closeAbout}>
              <span aria-hidden="true">←</span>
              Go Back
            </button>
            <div className="resume-heading">
              <p>A Little More</p>
              <h1 id="about-page-title">About Me</h1>
            </div>
            <p className="about-toolbar-note">Chapter {aboutPageIndex + 1} of {aboutChapters.length}</p>
          </header>

          <div className="about-content">
            <ol className="about-timeline" aria-label="About Me timeline">
              {aboutChapters.map((chapter, index) => (
                <li
                  className={`${index === aboutPageIndex ? 'is-active' : ''}${index < aboutPageIndex ? ' is-complete' : ''}`}
                  key={chapter.title}
                >
                  <button
                    type="button"
                    aria-label={`Go to ${chapter.title}`}
                    aria-current={index === aboutPageIndex ? 'step' : undefined}
                    onClick={() => setAboutPageIndex(index)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ol>

            <article
              className={`about-chapter${aboutPageIndex === 0 ? ' is-first-chapter' : ''}${aboutPageIndex === 1 ? ' is-second-chapter' : ''}${aboutPageIndex === 2 ? ' is-third-chapter' : ''}${aboutPageIndex === 3 ? ' is-fourth-chapter' : ''}`}
              key={activeAboutChapter.title}
              aria-live="polite"
            >
              <p>Chapter {aboutPageIndex + 1}</p>
              <h2>{activeAboutChapter.title}</h2>
              {aboutPageIndex === 0 ? (
                <div className="about-first-page">
                  <div className="about-photo-collage" aria-label="Childhood and family photos">
                    <button
                      className="about-photo about-photo-parents"
                      type="button"
                      aria-label="View Serena’s parents together in a garden"
                      onClick={() => setSelectedAboutPhoto({ src: parentsPhoto, alt: 'Serena’s parents together in a garden' })}
                    >
                      <img src={parentsPhoto} alt="Serena’s parents together in a garden" />
                    </button>
                    <button
                      className="about-photo about-photo-child-left"
                      type="button"
                      aria-label="View Serena as a baby wearing a yellow costume"
                      onClick={() => setSelectedAboutPhoto({ src: childhoodYellow, alt: 'Serena as a baby wearing a yellow costume' })}
                    >
                      <img src={childhoodYellow} alt="Serena as a baby wearing a yellow costume" />
                    </button>
                    <button
                      className="about-photo about-photo-child-right"
                      type="button"
                      aria-label="View Serena as a baby wearing a chef costume"
                      onClick={() => setSelectedAboutPhoto({ src: childhoodChef, alt: 'Serena as a baby wearing a chef costume' })}
                    >
                      <img src={childhoodChef} alt="Serena as a baby wearing a chef costume" />
                    </button>
                  </div>

                  <div className="about-early-story">
                    <ul className="about-fact-list">
                      <li>Born in China</li>
                      <li>Moved to Vancouver with family at the age of 3</li>
                      <li>Went to Kindergarten in Vancouver</li>
                      <li>Moved back to China in Grade 1</li>
                    </ul>

                  </div>
                </div>
              ) : aboutPageIndex === 1 ? (
                <div className="about-second-page">
                  <div className="about-burnaby-story">
                    <p className="about-section-kicker">Burnaby · Grade 4–6</p>
                    <ul className="about-fact-list">
                      <li>Taylor Park Elementary School</li>
                      <li>Meaningful friendships</li>
                      <li>Cherished childhood memories</li>
                    </ul>
                  </div>

                  <button
                    className="about-memory-photo about-memory-letter"
                    type="button"
                    aria-label="View farewell letter from Serena’s classmates"
                    onClick={() => setSelectedAboutPhoto({ src: burnabyFarewellLetter, alt: 'Farewell letter from Serena’s classmates' })}
                  >
                    <img src={burnabyFarewellLetter} alt="Farewell letter from Serena’s classmates" />
                  </button>

                  <div className="about-memory-row" aria-label="Burnaby childhood memories">
                    <button
                      className="about-memory-photo"
                      type="button"
                      aria-label="View a childhood camping memory"
                      onClick={() => setSelectedAboutPhoto({ src: burnabyCamping, alt: 'A childhood camping memory' })}
                    >
                      <img src={burnabyCamping} alt="A childhood camping memory" />
                    </button>
                    <button
                      className="about-memory-photo"
                      type="button"
                      aria-label="View a Taylor Park field trip memory"
                      onClick={() => setSelectedAboutPhoto({ src: burnabyFieldTrip, alt: 'A Taylor Park field trip memory' })}
                    >
                      <img src={burnabyFieldTrip} alt="A Taylor Park field trip memory" />
                    </button>
                    <button
                      className="about-memory-photo"
                      type="button"
                      aria-label="View a childhood sleepover memory"
                      onClick={() => setSelectedAboutPhoto({ src: burnabySleepover, alt: 'A childhood sleepover memory' })}
                    >
                      <img src={burnabySleepover} alt="A childhood sleepover memory" />
                    </button>
                  </div>
                </div>
              ) : aboutPageIndex === 2 ? (
                <div className="about-third-page">
                  <div className="about-richmond-collage" aria-label="Richmond memories">
                    <button
                      className="about-richmond-photo about-richmond-photo-graduation"
                      type="button"
                      aria-label="View Grade 7 graduation memory"
                      onClick={() => setSelectedAboutPhoto({ src: richmondGraduation, alt: 'Grade 7 graduation memory' })}
                    >
                      <img src={richmondGraduation} alt="Grade 7 graduation memory" />
                    </button>
                    <button
                      className="about-richmond-photo about-richmond-photo-school"
                      type="button"
                      aria-label="View a high school welcome event"
                      onClick={() => setSelectedAboutPhoto({ src: richmondHighSchool, alt: 'A high school welcome event' })}
                    >
                      <img src={richmondHighSchool} alt="A high school welcome event" />
                    </button>
                    <div className="about-richmond-video-card">
                      <video
                        className="about-richmond-video"
                        controls
                        preload="metadata"
                        aria-label="Preview a Richmond memory video"
                      >
                        <source src={richmondMemoryVideo} type="video/mp4" />
                        Your browser does not support video playback.
                      </video>
                      <button
                        className="about-video-expand"
                        type="button"
                        aria-label="Enlarge Richmond memory video"
                        onClick={() => setIsAboutVideoExpanded(true)}
                      >
                        <span aria-hidden="true">⛶</span>
                      </button>
                    </div>
                    <button
                      className="about-richmond-photo about-richmond-photo-cooking"
                      type="button"
                      aria-label="View a family cooking memory"
                      onClick={() => setSelectedAboutPhoto({ src: richmondFamilyCooking, alt: 'A family cooking memory' })}
                    >
                      <img src={richmondFamilyCooking} alt="A family cooking memory" />
                    </button>
                    <button
                      className="about-richmond-photo about-richmond-photo-friends"
                      type="button"
                      aria-label="View a memory with friends"
                      onClick={() => setSelectedAboutPhoto({ src: richmondFriends, alt: 'A memory with friends' })}
                    >
                      <img src={richmondFriends} alt="A memory with friends" />
                    </button>
                  </div>

                  <div className="about-richmond-story">
                    <p className="about-section-kicker">Richmond · Grade 7</p>
                    <ul className="about-fact-list">
                      <li>Spul'u'kwuks Elementary School</li>
                      <li>Stepping out of my comfort zone</li>
                      <li>Adapting to a new environment</li>
                      <li>High school → UBC</li>
                    </ul>
                  </div>
                </div>
              ) : aboutPageIndex === 3 ? (
                <div className="about-reflection-page">
                  <p className="about-reflection-subtitle">Self-Reflection &amp; Personal Growth</p>

                  <div className="about-reflection-columns">
                    <section className="about-reflection-card about-strengths" aria-labelledby="about-strengths-title">
                      <h3 id="about-strengths-title">My Strengths</h3>
                      <ul>
                        <li><span aria-hidden="true">◇</span>Resilience</li>
                        <li><span aria-hidden="true">↻</span>Adaptability</li>
                        <li><span aria-hidden="true">▱</span>Fast Learner</li>
                        <li><span aria-hidden="true">✦</span>Independence</li>
                      </ul>
                    </section>

                    <section className="about-reflection-card about-growth" aria-labelledby="about-growth-title">
                      <h3 id="about-growth-title">Areas for Growth</h3>
                      <ul>
                        <li><span aria-hidden="true">♙</span>Introversion</li>
                        <li><span aria-hidden="true">♧</span>Building Relationships</li>
                        <li><span aria-hidden="true">↗</span>Leaving My Comfort Zone</li>
                        <li><span aria-hidden="true">◫</span>Communication</li>
                      </ul>
                    </section>
                  </div>

                  <p className="about-reflection-closing">
                    <span aria-hidden="true">❧</span>
                    Every new beginning has shaped who I am today.
                  </p>
                </div>
              ) : (
                <div className="about-chapter-placeholder">
                  <p>We’ll add this chapter’s story together next.</p>
                </div>
              )}
            </article>

            {aboutPageIndex < aboutChapters.length - 1 && (
              <button
                className="about-next-button"
                type="button"
                aria-label="Next page"
                onClick={showNextAboutPage}
              >
                <span>Next page</span>
                <span aria-hidden="true">→</span>
              </button>
            )}
          </div>

          {selectedAboutPhoto && (
            <div
              className="about-photo-lightbox"
              role="dialog"
              aria-modal="true"
              aria-label="Photo preview"
              onClick={(event) => {
                if (event.target === event.currentTarget) setSelectedAboutPhoto(null)
              }}
            >
              <button
                className="about-photo-close"
                type="button"
                aria-label="Close photo preview"
                onClick={() => setSelectedAboutPhoto(null)}
              >
                ×
              </button>
              <img src={selectedAboutPhoto.src} alt={selectedAboutPhoto.alt} />
            </div>
          )}

          {isAboutVideoExpanded && (
            <div
              className="about-photo-lightbox"
              role="dialog"
              aria-modal="true"
              aria-label="Video preview"
              onClick={(event) => {
                if (event.target === event.currentTarget) setIsAboutVideoExpanded(false)
              }}
            >
              <button
                className="about-photo-close"
                type="button"
                aria-label="Close video preview"
                onClick={() => setIsAboutVideoExpanded(false)}
              >
                ×
              </button>
              <video className="about-video-lightbox" controls autoPlay aria-label="Expanded Richmond memory video">
                <source src={richmondMemoryVideo} type="video/mp4" />
                Your browser does not support video playback.
              </video>
            </div>
          )}
        </section>
      )}

      {(isOpeningResume || isClosingResume) && (
        <div
          className={`page-turn-overlay${isClosingResume ? ' is-closing' : ''}`}
          aria-hidden="true"
        >
          <div className="turning-page" />
        </div>
      )}

      {(isOpeningCertification || isClosingCertification) && (
        <div
          className={`certification-spread-overlay${isClosingCertification ? ' is-closing' : ''}`}
          style={spreadStyle}
          aria-hidden="true"
        />
      )}

      {(isOpeningExperience || isClosingExperience) && (
        <div
          className={`work-experience-transition${isClosingExperience ? ' is-closing' : ''}`}
          style={spreadStyle}
          aria-hidden="true"
        >
          <div className="work-experience-spread" />
        </div>
      )}

      {(isOpeningProject || isClosingProject) && (
        <div
          className={`project-petal-transition${isClosingProject ? ' is-closing' : ''}`}
          style={spreadStyle}
          aria-hidden="true"
        >
          <div className="project-petal-fill" />
          {Array.from({ length: 10 }, (_, index) => (
            <span
              className="project-petal"
              style={{
                '--petal-index': index,
                '--petal-delay': `${index * 16}ms`,
                '--petal-close-delay': `${(9 - index) * 12}ms`,
              } as CSSProperties}
              key={index}
            />
          ))}
        </div>
      )}

      {(isOpeningAbout || isClosingAbout) && (
        <div
          className={`about-spread-overlay${isClosingAbout ? ' is-closing' : ''}`}
          style={spreadStyle}
          aria-hidden="true"
        />
      )}
    </main>
  )
}

export default App
