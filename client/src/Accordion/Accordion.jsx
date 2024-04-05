import './Accordion.scss'
export default function Accordion() {
  return (
    
<div className="Accordion">
  <div className="main-title">Consignação IRS solidário 2024</div>
  <input type="radio" id="radioYour Account" name="accordion" defaultChecked/>
  <label className="item" htmlFor="radioYour Account">
    <div className="title">Quem pode beneficiar da consignação?</div>
    <div className="content">As entidades elegíveis para beneficiar da consignação IRS incluem instituições particulares de solidariedade social, pessoas coletivas de utilidade pública, instituições culturais com estatuto de utilidade pública, pessoas coletivas de utilidade pública de fins ambientais e instituições religiosas.</div>
  </label>
  <input type="radio" id="radioPayment &amp; Pricing" name="accordion"/>
  <label className="item" htmlFor="radioPayment &amp; Pricing">
    <div className="title">Que diferença faz consignar o IRS?</div>
    <div className="content">Sabia que em vez de dar todo o seu imposto ao Estado, pode doar uma parte a uma instituição de solidariedade à sua escolha, sem qualquer custo? Ao optar pela consignação do IRS nunca sai a perder e pode fazer a diferença ao ajudar quem mais precisa.</div>
  </label>
  <input type="radio" id="radioReturns &amp; Refunds" name="accordion"/>
  <label className="item" htmlFor="radioReturns &amp; Refunds">
    <div className="title">Sabia que também pode consignar o IVA?</div>
    <div className="content">Para além de poder consignar o IRS e doar 0,5% do valor liquidado a uma entidade à sua escolha, pode oferecer, à mesma organização, o valor da sua dedução do IVA.</div>
  </label>
  <input type="radio" id="radioShipping &amp; Pickup" name="accordion"/>
  <label className="item" htmlFor="radioShipping &amp; Pickup">
    <div className="title">Como escolher a instituição a ajudar?</div>
    <div className="content">Para escolher a instituição que pretende apoiar, pode consultar a lista disponibilizada pela Autoridade Tributária e Aduaneira (AT) no Portal das Finanças. Nesta lista estão as entidades que podem beneficiar da consignação IRS de 0,5% e da consignação do IVA.</div>
  </label>
  <input type="radio" id="radioViewing &amp; Changing Orders" name="accordion"/>
  <label className="item" htmlFor="radioViewing &amp; Changing Orders">
    <div className="title">Qual o valor do donativo ao consignar 0.5% do IRS? </div>
    <div className="content">
      Imposto apurado = imposto liquidado = 6.000 €
      <br /> Retenção e pagamento por conta = 6.500 €
      <br />Valor apurado para reembolso = 500 €
      <br />Montante da consignação de 0,5% sobre o imposto liquidado = 30 € (6.000 € x 0,5% = 30 €).
      <br />Neste caso, este contribuinte irá receber o reembolso de 500 € e a instituição receberá 30 € do imposto total devido ao Estado.
      <br />Uma forma muito prática de fazer um donativo sem qualquer custo para o contribuinte.
    </div>
  </label>
</div>
  )
}
