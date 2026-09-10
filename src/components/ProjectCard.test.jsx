import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProjectCard from './ProjectCard'

test('renders project content and detail link', () => {
  const project={title:'Beacon',slug:'beacon',short_description:'Trusted analytics.',tech_stack:[{id:1,name:'Django'}]}
  render(<MemoryRouter><ProjectCard project={project}/></MemoryRouter>)
  expect(screen.getByRole('heading',{name:'Beacon'})).toBeInTheDocument()
  expect(screen.getByRole('link',{name:'Beacon'})).toHaveAttribute('href','/projects/beacon')
  expect(screen.getByText('Django')).toBeInTheDocument()
})

// The whole card is clickable via a stretched-link overlay (`after:inset-0` on the
// link). That overlay only covers the card if an ancestor inside the card is
// positioned; without it the overlay resolves against the initial containing block
// and every card below the fold stops responding outside the title text.
test('stretched link overlay is anchored to the card', () => {
  const project={title:'Beacon',slug:'beacon',short_description:'Trusted analytics.',tech_stack:[{id:1,name:'Django'}]}
  render(<MemoryRouter><ProjectCard project={project}/></MemoryRouter>)
  const link=screen.getByRole('link',{name:'Beacon'})
  expect(link.className).toMatch(/after:inset-0/)
  const card=link.closest('article')
  expect(card).not.toBeNull()
  expect(card.className).toMatch(/(^|\s)relative(\s|$)/)
  // The overlay must not be able to escape the card to some outer containing block.
  expect(link.closest('.relative')).toBe(card)
})
