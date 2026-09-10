import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Home from '../pages/Home'
import ProjectDetail from '../pages/ProjectDetail'
import Projects from '../pages/Projects'
import { featuredProjects, profile, projects } from '../data/portfolio'

// Derived from the data rather than hardcoded, so editing content does not break these.
const onHome=featuredProjects.slice(0,4)
const countBy=(name)=>projects.filter(p=>p.tech_stack.some(t=>t.name===name)).length
const uniqueTech=[...new Set(projects.flatMap(p=>p.tech_stack.map(t=>t.name)))].find(n=>countBy(n)===1)

const at = (path, element, route = path) => render(
  <HelmetProvider><MemoryRouter initialEntries={[path]}><Routes><Route path={route} element={element}/></Routes></MemoryRouter></HelmetProvider>
)

test('home renders profile identity and every featured project it has room for', () => {
  at('/', <Home/>)
  expect(screen.getByText(profile.name)).toBeInTheDocument()
  expect(screen.getByText(profile.tagline)).toBeInTheDocument()
  expect(onHome.length).toBeGreaterThan(0)
  onHome.forEach(p => expect(screen.getByRole('heading',{name:p.title})).toBeInTheDocument())
})

test('about renders bio, every skill, all experience and education', () => {
  at('/about', <About/>)
  expect(screen.getByText(profile.bio)).toBeInTheDocument()
  profile.skills.forEach(s => expect(screen.getByText(s.name)).toBeInTheDocument())
  // Two roles at the same employer, so the company name is expected more than once.
  profile.experience.forEach(e => expect(screen.getAllByText(e.company).length).toBeGreaterThan(0))
  profile.education.forEach(e => expect(screen.getByText(e.institution)).toBeInTheDocument())
  profile.achievements.forEach(a => expect(screen.getByRole('heading',{name:a.title})).toBeInTheDocument())
  profile.certifications.forEach(c => expect(screen.getByRole('heading',{name:c.name})).toBeInTheDocument())
  expect(screen.getByText(new RegExp(`In the field since ${profile.in_field_since}`))).toBeInTheDocument()
})

test('projects lists every project and narrows to one when filtered', async () => {
  const user = userEvent.setup()
  at('/projects', <Projects/>)
  expect(screen.getByText(`${projects.length} projects in view`)).toBeInTheDocument()
  projects.forEach(p => expect(screen.getByRole('heading',{name:p.title})).toBeInTheDocument())

  const only=projects.find(p=>p.tech_stack.some(t=>t.name===uniqueTech))
  await user.click(screen.getByRole('button',{name:uniqueTech}))
  expect(screen.getByText('1 project in view')).toBeInTheDocument()
  expect(screen.getByRole('heading',{name:only.title})).toBeInTheDocument()
  projects.filter(p=>p.slug!==only.slug).forEach(p =>
    expect(screen.queryByRole('heading',{name:p.title})).not.toBeInTheDocument())
})

test.each(projects.map(p=>[p.slug,p]))('project detail renders the %s case study', (slug, project) => {
  at(`/projects/${slug}`, <ProjectDetail/>, '/projects/:slug')
  expect(screen.getByRole('heading',{name:project.title})).toBeInTheDocument()
  expect(screen.getByText(project.problem)).toBeInTheDocument()
  expect(screen.getByText(project.solution)).toBeInTheDocument()
  expect(screen.getByText(project.challenges)).toBeInTheDocument()
  expect(screen.getByText(project.learnings)).toBeInTheDocument()
  // The hackathon model has no public repository, so the button is absent by design.
  if (project.github_url)
    expect(screen.getByRole('link',{name:/Source code/})).toHaveAttribute('href',project.github_url)
  else
    expect(screen.queryByRole('link',{name:/Source code/})).not.toBeInTheDocument()
  // The detail page is deliberately image-free.
  expect(screen.queryAllByRole('img')).toHaveLength(0)
})

test('project detail shows a not-found state for an unknown slug', () => {
  at('/projects/does-not-exist', <ProjectDetail/>, '/projects/:slug')
  expect(screen.getByRole('heading',{name:'Project not found.'})).toBeInTheDocument()
})

test('contact form hands a valid enquiry to a prefilled mailto link', async () => {
  const user = userEvent.setup()
  const assigned = []
  delete window.location
  window.location = { set href(v){ assigned.push(v) }, get href(){ return assigned.at(-1) ?? '' } }
  at('/contact', <Contact/>)
  await user.type(screen.getByPlaceholderText('Your name'),'Dana Ito')
  await user.type(screen.getByPlaceholderText('you@company.com'),'dana@example.com')
  await user.type(screen.getByPlaceholderText('A cloud or network project'),'API review')
  await user.type(screen.getByPlaceholderText(/What are you running/),'We need help hardening an AWS network before the audit next month.')
  await user.click(screen.getByRole('button',{name:/send enquiry/i}))
  expect(assigned).toHaveLength(1)
  const url = new URL(assigned[0])
  expect(url.protocol).toBe('mailto:')
  expect(url.pathname).toBe(profile.email)
  expect(url.searchParams.get('subject')).toBe('API review')
  expect(url.searchParams.get('body')).toContain('hardening an AWS network')
  expect(url.searchParams.get('body')).toContain('dana@example.com')
  expect(await screen.findByText(/email client should be opening/)).toBeInTheDocument()
})
