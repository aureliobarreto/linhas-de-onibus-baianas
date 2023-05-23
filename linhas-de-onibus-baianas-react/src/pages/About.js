import ButtonAppBar from '../components/ButtonAppBar.js'
function About() {
  return (
    <div>

      <ButtonAppBar/>
      <h1> Sobre nós</h1>
      <p>Esta aplicação foi uma atividade da disciplina EXA844 Programação para Redes, ministrada pelo professor João Batista Rocha 
        na Universidade Estadual de Feira de Santana UEFS, no semestre 2023.1.

        Este projeto, faz uma consulta via crawler no site oficial da AGERBA <a>www.agerba2.ba.gov.br/transporte/index.asp</a>, coleta os dados
        de todas as linhas de ônibus baianas, salva em uma API e armazena todas as linhas em um banco de Dados, que é consumida por esta aplicação React front-end.
     </p>
     <h3>Desenvolvedores</h3>
      <ul>
        <li>Amanda Santos</li>
        <li>Aurélio Barreto</li>
      </ul>
    </div>
  )
}   

export default About