import type { PointerEvent } from 'react'
import sceneBackground from './assets/afternoon-tea/scene-background-wall-hd.png'
import roundTable from './assets/afternoon-tea/round-table-tablecloth-hd.png'
import flowers from './assets/afternoon-tea/flowers-vase.png'
import dessertStand from './assets/afternoon-tea/dessert-stand.png'
import cake from './assets/afternoon-tea/cake.png'
import teapot from './assets/afternoon-tea/teapot.png'
import teaCup from './assets/afternoon-tea/tea-cup.png'
import plants from './assets/afternoon-tea/plants.png'
import candle from './assets/afternoon-tea/candle.png'
import cherries from './assets/afternoon-tea/cherries.png'
import menu from './assets/afternoon-tea/menu.png'
import envelope from './assets/afternoon-tea/envelope.png'
import chair from './assets/afternoon-tea/chair.png'
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

function App() {
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

  return (
    <main className="portfolio-shell" aria-label="Serena Chen portfolio home">
      <section
        className="tea-scene"
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

        <img className="scene-object flowers" src={flowers} alt="A floral vase with pink and white flowers" />
        <img className="scene-object dessert-stand" src={dessertStand} alt="A two-tier stand with five cupcakes" />
        <img className="scene-object cake" src={cake} alt="Six cake slices arranged as a round cake" />
        <img className="scene-object teapot" src={teapot} alt="A floral afternoon-tea pot" />
        <img className="scene-object tea-cup" src={teaCup} alt="A floral teacup filled with tea on a matching saucer" />
        <img className="scene-object plants" src={plants} alt="Two floral pots showing plants at different growth stages" />
        <img className="scene-object candle" src={candle} alt="A lit candle in a floral holder" />
        <img className="scene-object cherries" src={cherries} alt="Two cherries on a floral saucer" />
        <img className="scene-object menu" src={menu} alt="A floral afternoon-tea menu" />
        <img className="scene-object envelope" src={envelope} alt="A floral envelope with a gold seal" />
        <img className="scene-object chair" src={chair} alt="A dark wooden chair with purple upholstery" />

        <nav className="scene-navigation" aria-label="Portfolio sections">
          {navigation.map(({ label, className }) => (
            <button className={`nav-plaque ${className}`} type="button" key={label}>
              {label}
            </button>
          ))}
        </nav>

        <div className="paper-texture" aria-hidden="true" />
      </section>
    </main>
  )
}

export default App
