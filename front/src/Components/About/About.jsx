import "../About/About.css"
import { Link } from "react-router-dom"
const About = () => {
    return(
        <div className="about">
           
                <Link to="/home" className="shadow__btn">HOME</Link>
               
           <div className="aboutContainer">
            <div className="contenedorText">
              <h1>Valentina Perez</h1>
              <h2>Full Stack Developer</h2>
            <div className="parraforContenedor" >
            <p>Soy Valentina Perez. Desde que puedo recordar, siempre he estado fascinada por la tecnología. Sin embargo, en mis primeros años, decidí recorrer los caminos del diseño y el marketing. No fue sino hasta que me uní a Henry que mi perspectiva cambió radicalmente. Ahí, fui introducida al mundo del desarrollo web. A pesar de mi trasfondo en diseño, descubrí una profunda pasion por la programación, una que combina lógica y creatividad de maneras que nunca imaginé. Cada dia, sigo creciendo y expandiendo mis conocimientos en el area.</p>

            </div> 
            
        </div>
    </div>
</div>
)
}

export default About;