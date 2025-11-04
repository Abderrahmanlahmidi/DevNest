import Navbar from '../content/home/navbar'
import Hero from '../content/home/hero'
import Skills from '../content/home/skills'
import Projects from '../content/home/projects'
import Competences from '../content/home/competences'
import Experiences from '../content/home/experiences'
import Footer from '../content/home/footer'

export default function Home() {

  
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Skills/>
      <Projects/> 
      <Competences/>
      <Experiences/>
      <Footer/>
    </div>
  )
}
