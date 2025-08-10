// components/Benefits.js
export default function Benefits() {
  return (
    <div className="benefits-wrap">
      <div className="benefits container">
        <div className="benefit">
          <span className="icon">🚚</span>
          <div>
            <div className="title">Envío rápido</div>
            <div className="desc">A todo el país</div>
          </div>
        </div>

        <div className="benefit">
          <span className="icon">↩️</span>
          <div>
            <div className="title">Devoluciones 90 días</div>
            <div className="desc">Si hay problemas con tu pedido</div>
          </div>
        </div>

        <div className="benefit">
          <span className="icon">🔒</span>
          <div>
            <div className="title">Pago 100% seguro</div>
            <div className="desc">Cifrado y protegido</div>
          </div>
        </div>

        <div className="benefit">
          <span className="icon">💬</span>
          <div>
            <div className="title">Soporte 24/7</div>
            <div className="desc">Atención dedicada</div>
          </div>
        </div>

        <div className="benefit">
          <span className="icon">🎁</span>
          <div>
            <div className="title">Gift Service</div>
            <div className="desc">Envolvemos tu regalo</div>
          </div>
        </div>
      </div>
    </div>
  );
}
