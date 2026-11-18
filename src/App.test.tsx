import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe('App', () => {
  it('renders the afternoon tea portfolio scene and navigation', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Serena Chen’s Portfolio' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Portfolio sections' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Projects/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open résumé' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open About Me' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open CompTIA Security+ certification' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open AWS Certified AI Practitioner certification' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open AIPGPT work experience' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open Empathia AI work experience' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open Yunjin Smart Technology work experience' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open Skechers work experience' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open HRC Fertility Center work experience' })).toBeInTheDocument()
    for (let projectNumber = 1; projectNumber <= 9; projectNumber += 1) {
      expect(screen.getByRole('button', { name: `Open Project ${projectNumber}` })).toBeInTheDocument()
    }
    expect(screen.getByAltText('Six cake slices arranged as a round cake')).toBeInTheDocument()
    expect(screen.getByAltText('Three colorful cake slices on a floral plate')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Two cherries on a floral saucer' })).toBeInTheDocument()
  })

  it('opens the resume preview and provides dated downloads', () => {
    vi.useFakeTimers()
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Open résumé' }))
    act(() => {
      vi.runAllTimers()
    })

    expect(screen.getByRole('heading', { name: 'Résumé' })).toBeInTheDocument()
    expect(screen.getByTitle('Serena Chen resume preview')).toHaveAttribute(
      'src',
      '/resume/serena-chen-resume.pdf#view=FitH',
    )

    const today = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Vancouver',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date())

    expect(screen.getByRole('link', { name: 'Download PDF' })).toHaveAttribute(
      'download',
      `Serena_Chen_${today}.pdf`,
    )
    expect(screen.getByRole('link', { name: 'Download Word' })).toHaveAttribute(
      'download',
      `Serena_Chen_${today}.docx`,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Go Back' }))

    expect(screen.getByRole('heading', { name: 'Serena Chen’s Portfolio' })).toBeInTheDocument()
    expect(document.querySelector('.page-turn-overlay.is-closing')).toBeInTheDocument()

    act(() => {
      vi.runAllTimers()
    })

    expect(document.querySelector('.page-turn-overlay')).not.toBeInTheDocument()
  })

  it('opens a certification from each cherry and returns with the reverse spread', () => {
    vi.useFakeTimers()
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Open CompTIA Security+ certification' }))
    expect(document.querySelector('.certification-spread-overlay')).toBeInTheDocument()

    act(() => {
      vi.runAllTimers()
    })

    expect(screen.getByRole('heading', { level: 1, name: 'CompTIA Security+' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Open Official Website/ })).toHaveAttribute(
      'href',
      'https://www.comptia.org/en-us/certifications/security/',
    )
    expect(screen.getByText('Threats, vulnerabilities, and mitigations')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Go Back' }))
    expect(document.querySelector('.certification-spread-overlay.is-closing')).toBeInTheDocument()

    act(() => {
      vi.runAllTimers()
    })

    fireEvent.click(screen.getByRole('button', { name: 'Open AWS Certified AI Practitioner certification' }))

    act(() => {
      vi.runAllTimers()
    })

    expect(screen.getByRole('heading', { level: 1, name: 'AWS AI Practitioner' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Open Official Website/ })).toHaveAttribute(
      'href',
      'https://aws.amazon.com/certification/certified-ai-practitioner/',
    )
    expect(screen.getByText('Generative AI and foundation models')).toBeInTheDocument()
  })

  it('opens a flower work experience page and returns to the scene', () => {
    vi.useFakeTimers()
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Open AIPGPT work experience' }))
    expect(document.querySelector('.work-experience-transition')).toBeInTheDocument()

    act(() => {
      vi.runAllTimers()
    })

    expect(screen.getByRole('heading', { level: 1, name: 'Work Experience' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Work experience timeline' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Show Work Experience 1: HRC Fertility Center' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Show Work Experience 2: Skechers' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Show Work Experience 3: Yunjin Smart Technology' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Show Work Experience 4: Empathia AI' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Show Work Experience 5: AIPGPT' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('heading', { level: 2, name: 'AIPGPT' })).toBeInTheDocument()
    expect(screen.getByText('Customer Support Engineer')).toBeInTheDocument()
    expect(document.querySelector('.work-experience-meta')).toHaveTextContent('BC, Canada · Remote')
    expect(screen.getByText('AI-generated video testing')).toBeInTheDocument()
    expect(screen.getByText('Postman')).toBeInTheDocument()
    expect(document.querySelector('.work-experience-card')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Open AIPGPT Internship Verification Letter' }))
    expect(screen.getByRole('dialog', { name: 'Work document preview' })).toBeInTheDocument()
    expect(screen.getByAltText('Preview of AIPGPT Internship Verification Letter')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Open full PDF in new tab' })).toHaveAttribute(
      'href',
      '/work-experience/aipgpt-verification.pdf',
    )
    fireEvent.click(screen.getByRole('button', { name: 'Close work document preview' }))

    fireEvent.click(screen.getByRole('button', { name: 'Show Work Experience 1: HRC Fertility Center' }))
    fireEvent.click(screen.getByRole('button', { name: /View Front desk workstation/ }))
    expect(screen.getByRole('dialog', { name: 'Work photo preview' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Close work photo preview' }))

    fireEvent.click(screen.getByRole('button', { name: 'Show Work Experience 2: Skechers' }))
    expect(screen.getByRole('heading', { level: 2, name: 'Skechers · McArthurGlen Outlet Store' })).toBeInTheDocument()
    expect(document.querySelector('.work-experience-meta')).toHaveTextContent('BC, Canada')
    expect(screen.getByText('Product recommendations and sales')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Show Work Experience 4: Empathia AI' }))
    expect(screen.getByRole('heading', { level: 2, name: 'Empathia AI' })).toBeInTheDocument()
    expect(document.querySelector('.work-experience-meta')).toHaveTextContent('BC, Canada · Remote')
    expect(screen.queryByText('California, USA')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open Empathia AI Employment Agreement' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /View Serena’s software development workspace/ })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Show Work Experience 3: Yunjin Smart Technology' }))
    expect(screen.getByRole('button', { name: 'Open Yunjin Smart Technology Internship Certificate' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /View Resource management interface/ })).toBeInTheDocument()
    expect(screen.getByText(/English translation: Serena Chen interned/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Go Back' }))
    expect(document.querySelector('.work-experience-transition.is-closing')).toBeInTheDocument()

    act(() => {
      vi.runAllTimers()
    })

    expect(screen.getByRole('heading', { name: 'Serena Chen’s Portfolio' })).toBeInTheDocument()
  })

  it('opens each cake as a project and returns with the reverse petal transition', () => {
    vi.useFakeTimers()
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Open Project 1' }))
    expect(document.querySelectorAll('.project-petal')).toHaveLength(10)

    act(() => {
      vi.runAllTimers()
    })

    expect(screen.getByRole('heading', { level: 1, name: 'Projects' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Project menu' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Interactive WebGL Sphere Game' })).toBeInTheDocument()
    expect(screen.getByTitle('Interactive WebGL sphere game')).toHaveAttribute(
      'src',
      '/projects/project-1/index.html',
    )
    expect(screen.getByRole('link', { name: 'Open full screen' })).toHaveAttribute(
      'href',
      '/projects/project-1/index.html',
    )
    expect(screen.getByRole('heading', { level: 2, name: 'User Guide' })).toBeInTheDocument()
    expect(
      screen.getByText(/If 1 or more bacteria grow to certain size, you will lose\./),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Download User Guide' })).toHaveAttribute(
      'href',
      '/projects/project-1/downloads/Serena_Chen_Project_1_User_Guide.docx',
    )
    expect(screen.getByRole('link', { name: 'Download Project ZIP File' })).toHaveAttribute(
      'href',
      '/projects/project-1/downloads/Serena_Chen_Project_1_Demo.zip',
    )
    expect(screen.getByRole('button', { name: 'Show Project 1' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('button', { name: 'Show Project 9' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Show Project 2' }))
    expect(screen.getByRole('heading', { level: 2, name: 'FamPlan' })).toBeInTheDocument()
    expect(screen.getByTitle('FamPlan prototype video')).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/qs2WD_q5hG0',
    )
    expect(screen.getByTitle('FamPlan project video')).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/mbW4mDufstQ',
    )
    expect(screen.getByRole('img', { name: 'Preview of the FamPlan main report first page' })).toHaveAttribute(
      'src',
      '/projects/project-2/Group13_Step4_Main_Report_preview.png',
    )
    expect(screen.getByRole('link', { name: 'View GitHub Repository' })).toHaveAttribute(
      'href',
      'https://github.com/SerenaChen7/COSC419B_2025W2',
    )
    expect(screen.getByRole('link', { name: 'Download Report' })).toHaveAttribute(
      'href',
      '/projects/project-2/Group13_Step4_Main_Report.pdf',
    )
    expect(screen.getByRole('link', { name: /Open Full Report/ })).toHaveAttribute(
      'href',
      '/projects/project-2/Group13_Step4_Main_Report.pdf',
    )

    fireEvent.click(screen.getByRole('button', { name: 'Show Project 9' }))
    expect(screen.getByRole('button', { name: 'Show Project 9' })).toHaveAttribute('aria-current', 'page')

    fireEvent.click(screen.getByRole('button', { name: 'Go Back' }))
    expect(document.querySelector('.project-petal-transition.is-closing')).toBeInTheDocument()

    act(() => {
      vi.runAllTimers()
    })

    expect(screen.getByRole('heading', { name: 'Serena Chen’s Portfolio' })).toBeInTheDocument()
  })

  it('plays the tea-pouring transition into the About Me page', () => {
    vi.useFakeTimers()
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Open About Me' }))

    expect(document.querySelector('.tea-scene.is-opening-about')).toBeInTheDocument()
    expect(document.querySelector('.tea-pour-stream')).toBeInTheDocument()
    expect(document.querySelector('.about-spread-overlay')).toBeInTheDocument()

    act(() => {
      vi.runAllTimers()
    })

    expect(screen.getByRole('heading', { level: 1, name: 'About Me' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Where My Story Began' })).toBeInTheDocument()
    expect(document.querySelector('.about-timeline li.is-active')).toHaveTextContent('1')
    expect(screen.queryByText('Before Age 3')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'View Serena as a baby wearing a yellow costume' }))
    expect(screen.getByRole('dialog', { name: 'Photo preview' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Close photo preview' }))
    expect(screen.queryByRole('dialog', { name: 'Photo preview' })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Next page' }))
    expect(screen.getByRole('heading', { level: 2, name: 'A Place I Still Remember' })).toBeInTheDocument()
    expect(document.querySelector('.about-timeline li.is-active')).toHaveTextContent('2')
    expect(screen.getByText('Burnaby · Grade 4–6')).toBeInTheDocument()
    expect(screen.getByText('Taylor Park Elementary School')).toBeInTheDocument()
    expect(screen.getByText('Meaningful friendships')).toBeInTheDocument()
    expect(screen.getByText('Cherished childhood memories')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'View farewell letter from Serena’s classmates' }))
    const farewellPreview = screen.getByRole('dialog', { name: 'Photo preview' })
    expect(farewellPreview).toBeInTheDocument()
    expect(within(farewellPreview).getByAltText('Farewell letter from Serena’s classmates')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Close photo preview' }))

    fireEvent.click(screen.getByRole('button', { name: 'Go to Another New Beginning' }))
    expect(screen.getByRole('heading', { level: 2, name: 'Another New Beginning' })).toBeInTheDocument()
    expect(screen.getByText('Richmond · Grade 7')).toBeInTheDocument()
    expect(screen.getByText("Spul'u'kwuks Elementary School")).toBeInTheDocument()
    expect(screen.getByText('Stepping out of my comfort zone')).toBeInTheDocument()
    expect(screen.getByText('Adapting to a new environment')).toBeInTheDocument()
    expect(screen.getByText('High school → UBC')).toBeInTheDocument()
    expect(screen.getByLabelText('Preview a Richmond memory video')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Enlarge Richmond memory video' }))
    expect(screen.getByRole('dialog', { name: 'Video preview' })).toBeInTheDocument()
    expect(screen.getByLabelText('Expanded Richmond memory video')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Close video preview' }))

    fireEvent.click(screen.getByRole('button', { name: 'View a memory with friends' }))
    expect(screen.getByRole('dialog', { name: 'Photo preview' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Close photo preview' }))

    fireEvent.click(screen.getByRole('button', { name: 'Go to How My Journey Shaped Me' }))
    expect(screen.getByRole('heading', { level: 2, name: 'How My Journey Shaped Me' })).toBeInTheDocument()
    expect(screen.getByText('Self-Reflection & Personal Growth')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'My Strengths' })).toBeInTheDocument()
    expect(screen.getByText('Resilience')).toBeInTheDocument()
    expect(screen.getByText('Adaptability')).toBeInTheDocument()
    expect(screen.getByText('Fast Learner')).toBeInTheDocument()
    expect(screen.getByText('Independence')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Areas for Growth' })).toBeInTheDocument()
    expect(screen.getByText('Introversion')).toBeInTheDocument()
    expect(screen.getByText('Building Relationships')).toBeInTheDocument()
    expect(screen.getByText('Leaving My Comfort Zone')).toBeInTheDocument()
    expect(screen.getByText('Communication')).toBeInTheDocument()
    expect(screen.getByText('Every new beginning has shaped who I am today.')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Next page' })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Go Back' }))
    expect(document.querySelector('.about-spread-overlay.is-closing')).toBeInTheDocument()

    act(() => {
      vi.runAllTimers()
    })

    expect(screen.getByRole('heading', { name: 'Serena Chen’s Portfolio' })).toBeInTheDocument()
  })
})
