/* eslint-disable no-unused-vars */
import React from 'react'
import BeneList from './BeneList'
import "./LandingPage.scss"
import BoldFirstLetter from './BoldFirstLetter'

export default function LandingPage() {
    return (
      <div className='LandingPage'>
<h2>Consignação IRS: como ser solidário sem custos?</h2>

<section className="paragraphs">
    <BoldFirstLetter>
        As entidades elegíveis para beneficiar da consignação IRS incluem instituições particulares de solidariedade social, pessoas coletivas de utilidade pública, instituições culturais com estatuto de utilidade pública, pessoas coletivas de utilidade pública de fins ambientais e instituições religiosas.
    </BoldFirstLetter><BoldFirstLetter>
    Ao optar pela consignação do IRS nunca sai a perder e pode fazer a diferença ao ajudar quem mais precisa.
    </BoldFirstLetter><BoldFirstLetter>
    Sabia que também pode consignar o IVA?
    Para além de poder consignar o IRS e doar 0,5% do valor liquidado a uma entidade à sua escolha, pode oferecer, à mesma organização, o valor da sua dedução do IVA.
    </BoldFirstLetter>
</section>

<section className="paragraphs">
    <BoldFirstLetter>
    Para escolher a instituição que pretende apoiar, pode consultar a lista disponibilizada pela Autoridade Tributária e Aduaneira (AT) no Portal das Finanças. 
    Nesta lista estão as entidades que podem beneficiar da consignação IRS de 0,5% e da consignação do IVA.
    </BoldFirstLetter>
    <BoldFirstLetter>
        Para facilitar a procura e validar NIFs autorizados, apresento essa lista nesta webApp onde podemos filtrar as entidades beneficiárias ou apenas pedir uma escolha completamente ao acaso. 
    </BoldFirstLetter>
</section>
<section className="info">
    <span>Ver lista no site da Autoridade Tributária: </span>
    <a href="https://info.portaldasfinancas.gov.pt/pt/apoio_contribuinte/IRS/Pages/IRS_entidades_beneficiarias_consignacao.aspx" 
    target="_blank" rel="noopener noreferrer">https://info.portaldasfinancas.gov.pt</a>
</section>
<BeneList />
    </div>
  )
}
