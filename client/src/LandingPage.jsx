/* eslint-disable no-unused-vars */
import React from 'react'
import BeneList from './BeneList'
import "./LandingPage.scss"
import BoldFirstLetter from './BoldFirstLetter'

export default function LandingPage() {
    return (
      <div className='LandingPage'>

<section className="info">
    <span>Ver lista no site da Autoridade Tributária: </span>
    <a href="https://info.portaldasfinancas.gov.pt/pt/apoio_contribuinte/IRS/Pages/IRS_entidades_beneficiarias_consignacao.aspx" 
    target="_blank" rel="noopener noreferrer">https://info.portaldasfinancas.gov.pt</a>
</section>
    <p className='infoP'>
        A informação é directamente extraída da lista disponibilizada pela AT em formato Excel e disponibilizada aqui com filtros para o ajudar a ajudar uma instituição solidária. 
    </p>
<BeneList />
    </div>
  )
}
