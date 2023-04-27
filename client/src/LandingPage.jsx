/* eslint-disable no-unused-vars */
import React from 'react'
import BeneList from './BeneList'
import "./LandingPage.scss"

export default function LandingPage() {
  return (
    <div className='LandingPage'>
<h2>Consignação IRS: como ser solidário sem custos?</h2>
<section className="paragraphs">
    <p>
    A consignação do IRS é uma forma de ser solidário sem qualquer custo adicional. Ao optar por esta medida, está a doar 0,5% do imposto sobre o rendimento das pessoas singulares liquidado, a uma pessoa coletiva de utilidade pública que desenvolva atividades de natureza e interesse cultural. Esta quota pode ser destinada a uma associação solidária elegível para este efeito.
    </p><p>
    Para consignar o IRS, pode fazê-lo através do Portal das Finanças até ao dia 31 de março ou durante o período de entrega da declaração de IRS, que decorre entre 1 de abril e 30 de junho de 2023.
    </p><p>
    Se optar por consignar antes de 31 de março, basta aceder à secção “Comunicar entidade a consignar IRS/IVA” no Portal das Finanças, escolher a entidade que pretende apoiar e submeter o processo.
    </p><p>
    Caso opte por consignar durante o preenchimento da declaração de IRS, deve preencher os dados solicitados no Quadro 11 do anexo “Rosto” no Modelo 3. Se optar pelo IRS Automático, a consignação é feita na secção “Pré Liquidação”. Deve escolher a entidade que pretende apoiar, indicar o NIF da entidade e selecionar se pretende consignar “IRS” ou “IVA” ou ambos.
    </p><p>
    As entidades elegíveis para beneficiar da consignação IRS incluem instituições particulares de solidariedade social, pessoas coletivas de utilidade pública, instituições culturais com estatuto de utilidade pública, pessoas coletivas de utilidade pública de fins ambientais e instituições religiosas.
    </p><p>
    Para escolher a instituição que pretende apoiar, pode consultar a lista disponibilizada pela Autoridade Tributária e Aduaneira (AT) no Portal das Finanças. 
    <br />
    Nesta lista estão as entidades que podem beneficiar da consignação IRS de 0,5% e da consignação do IVA.
    </p>
</section>

<BeneList />
<section className="paragraphs">
    <p>
    O caso do Martim
    <br />
    No cálculo do IRS de 2022 a entregar em 2023, o Martim apurou um IRS liquidado no valor de 12 mil euros e um reembolso de 1.500 euros. Se optar por fazer a consignação do IRS liquidado a uma associação, esta receberá 0,5% desse valor, ou seja, 60 euros (12.000 x 0,5%).
    </p><p>
    Se o Martim decidir não consignar o IRS, terá à mesma um reembolso de 1.500 euros, no entanto em vez de os 60 euros serem doados a favor de uma instituição, são recebidos pelo Estado.
    </p><p>
    Ao optar pela consignação do IRS nunca sai a perder e pode fazer a diferença ao ajudar quem mais precisa.
    </p><p>
    Sabia que também pode consignar o IVA?
    <br />
    Para além de poder consignar o IRS e doar 0,5% do valor liquidado a uma entidade à sua escolha, pode oferecer, à mesma organização, o valor da sua dedução do IVA.
    </p><p>
    No entanto, tenha em atenção que, ao contrário do que acontece com o IRS, a consignação do IVA representa um custo para si na medida em que deixa receber o reembolso referente aos 15% de IVA que pagou em faturas de oficinas de automóveis, restauração, alojamento, cabeleireiros, institutos de beleza e veterinários e 100% do IVA pago em faturas de passes sociais.
    </p><p>
    Desta forma, em vez de pagar menos imposto por via da dedução do IVA suportado pelas faturas solicitadas ao longo do ano de 2022, contribui para apoiar a organização escolhida por si, com o montante correspondente ao desconto que teria.
    </p><p>
    No entanto, ao optar pela consignação do IRS nunca sai a perder e pode fazer a diferença ao ajudar quem mais precisa. Quando estiver a preencher a sua declaração referente a este imposto, não se esqueça de consignar o IRS.
    </p>
</section>
    </div>
  )
}
