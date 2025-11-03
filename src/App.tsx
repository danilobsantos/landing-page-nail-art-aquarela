import React, { useMemo, useState } from "react";

export function getStaticTextSnippets() {
  return {
    ctaPrice: "R$ 19,90",
    videoTitle: "Apresentação do curso - Thayná Placedino",
    courseTitle: "Curso Nail Art Aquarela",
  };
}
export const __expected = { ctaPrice: "R$ 19,90" };
export function getImageCandidates() {
  const base = "/assets/5DBD4F0C-58BE-4808-8BFA-5881266DAD02";
  return [`${base}.heic`, `${base}.jpg`, `${base}.jpeg`, `${base}.png`];
}
export function getAquarelaBgTestConfig() {
  return { expectedBlurPx: 100, expectedMaxTranslatePx: 24, expectedOpacity: 0.18 };
}
export function getAquarelaBgTestConfigEnhanced() {
  return { expectedBlurPx: 80, expectedMaxTranslatePx: 56, expectedOpacity: 0.26 };
}
export const __aquarelaSelectors = {
  layer: ".aquarela-bg",
  blobs: [".aquarela-bg .b1", ".aquarela-bg .b2", ".aquarela-bg .b3", ".aquarela-bg .b4"],
};

export default function App() {
  const candidates = useMemo(() => getImageCandidates(), []);
  const watercolorPlaceholder = useMemo(() => {
    const svg = encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'>
        <defs>
          <linearGradient id='g1' x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0%' stop-color='#F8C8DC'/>
            <stop offset='50%' stop-color='#D9C8F8'/>
            <stop offset='100%' stop-color='#B7DFF5'/>
          </linearGradient>
        </defs>
        <rect width='400' height='500' fill='#fff'/>
        <circle cx='120' cy='120' r='110' fill='url(#g1)' opacity='.55'/>
        <circle cx='300' cy='210' r='140' fill='#C9F5E1' opacity='.45'/>
        <circle cx='200' cy='380' r='120' fill='#B7DFF5' opacity='.35'/>
        <text x='50%' y='50%' text-anchor='middle' fill='#334155' font-size='20'>Foto da</text>
        <text x='50%' y='56%' text-anchor='middle' fill='#0f172a' font-size='24' font-weight='700'>Thayná Placedino</text>
      </svg>
    `);
    return `data:image/svg+xml;charset=utf-8,${svg}`;
  }, []);
  const [imgIndex, setImgIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState<string>(candidates[0] ?? watercolorPlaceholder);
  function handleImgError() {
    const next = imgIndex + 1;
    if (next < candidates.length) { setImgIndex(next); setImgSrc(candidates[next]); }
    else { setImgSrc(watercolorPlaceholder); }
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-[#F8C8DC] selection:text-slate-900 scroll-smooth">
      {/* Button effects */}
      <style>{`
        .btn-aquarela{background:linear-gradient(120deg,#F8C8DC,#D9C8F8,#B7DFF5,#C9F5E1,#F8C8DC);background-size:300% 300%;transition:background-position .6s ease,transform .2s ease,box-shadow .3s ease}
        .btn-aquarela:hover{background-position:100% 0%;transform:translateY(-1px);box-shadow:0 10px 25px rgba(217,200,248,.45)}
        .btn-aquarela:active{transform:translateY(0)}
        .btn-aquarela-outline{border:2px solid transparent;background:
          linear-gradient(#fff,#fff) padding-box,
          linear-gradient(120deg,#F8C8DC,#D9C8F8,#B7DFF5,#C9F5E1,#F8C8DC) border-box;
          background-size:300% 300%;transition:background-position .6s ease,transform .2s ease}
        .btn-aquarela-outline:hover{background-position:100% 0%;transform:translateY(-1px)}

        .border-outline{border:2px solid transparent;background:
          linear-gradient(#fff,#fff) padding-box,
          linear-gradient(120deg,#F8C8DC,#D9C8F8,#B7DFF5,#C9F5E1,#F8C8DC) border-box;
          background-size:300% 300%;transition:background-position .6s ease,transform .2s ease}

        /* sublinhado aquarela — multilinha, suave e com leve blur */
        .u-aquarela{
          position: relative;
          display: inline;
          background:
            linear-gradient(90deg,var(--aq1),var(--aq2),var(--aq3),var(--aq4)) no-repeat;
          /* altura e posição da “pincelada” */
          background-size: 100% 0.42em;          /* espessura da faixa */
          background-position: 0 88%;             /* quão perto da linha de base */
          border-radius: .15em;                    /* cantos arredondados da tinta */
          padding-bottom: .05em;                   /* dá espaço p/ a faixa */
          box-decoration-break: clone;             /* funciona em quebras de linha */
          -webkit-box-decoration-break: clone;
          filter: none;
        }

        /* textura/softness opcional: ativa um pouquinho de blur na faixa */
        .u-aquarela-soft{
          filter: blur(0.3px) saturate(0.98);
          opacity: 0.92;
        }

        /* versão “grossinha” (se quiser mais destaque em títulos) */
        .u-aquarela-lg{
          background-size: 100% 0.55em;
          background-position: 0 85%;
        }

        
      `}</style>

      {/* Watercolor background (enhanced) */}
      <style>{`
        :root{
          --aq1:#F8C8DC; --aq2:#D9C8F8; --aq3:#B7DFF5; --aq4:#C9F5E1;
        }
        .aquarela-bg{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;isolation:isolate}
        .aquarela-bg::before{content:"";position:absolute;inset:-20%;background:conic-gradient(from 0deg,var(--aq1),var(--aq2),var(--aq3),var(--aq4),var(--aq1));filter:blur(75px);opacity:.25;animation:spin 100s linear infinite}
        .aquarela-bg .blob{position:absolute;border-radius:9999px;filter:blur(65px);opacity:.35;will-change:transform}
        .aquarela-bg .b1{background:radial-gradient(closest-side,var(--aq1),transparent 65%);width:52rem;height:52rem;left:-8rem;top:-12rem;animation:drift1 18s ease-in-out infinite alternate}
        .aquarela-bg .b2{background:radial-gradient(closest-side,var(--aq2),transparent 65%);width:48rem;height:48rem;right:-6rem;bottom:-10rem;animation:drift2 20s ease-in-out infinite alternate}
        .aquarela-bg .b3{background:radial-gradient(closest-side,var(--aq3),transparent 65%);width:44rem;height:44rem;left:50%;top:30%;transform:translateX(-50%);animation:drift3 22s ease-in-out infinite alternate}
        .aquarela-bg .b4{background:radial-gradient(closest-side,var(--aq4),transparent 65%);width:42rem;height:42rem;left:18%;bottom:18%;animation:drift4 20s ease-in-out infinite alternate}
        .aquarela-bg .noise{position:absolute;inset:-50%;opacity:.035;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='120' height='120' filter='url(%23n)' opacity='0.9'/></svg>");background-size:280px 280px;mix-blend-mode:multiply;animation:noiseMove 12s linear infinite}
        @keyframes drift1{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(56px,40px,0)}}
        @keyframes drift2{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(-48px,32px,0)}}
        @keyframes drift3{0%{transform:translate3d(-50%,0,0)}100%{transform:translate3d(calc(-50% + 36px),-40px,0)}}
        @keyframes drift4{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(-40px,-36px,0)}}
        @keyframes noiseMove{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(60px,0,0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @media (prefers-reduced-motion: reduce){
          .aquarela-bg::before,.aquarela-bg .blob,.aquarela-bg .noise{animation:none}
        }
      `}</style>

      <div className="aquarela-bg">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
        <div className="blob b4" />
        <div className="noise" />
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-slate-200/60">
        <nav className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full" style={{ background: "conic-gradient(from 90deg,#F8C8DC,#D9C8F8,#B7DFF5,#C9F5E1,#F8C8DC)" }} />
            <p className="font-semibold tracking-tight">Thayná Placedino - Nail Art Aquarela</p>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#video" className="hover:text-slate-900/80">Professora</a>
            <a href="#conteudo" className="hover:text-slate-900/80">Conteúdo</a>
            <a href="#depoimentos" className="hover:text-slate-900/80">Depoimentos</a>
            <a href="#bonus" className="hover:text-slate-900/80">Bônus</a>
            <a href="https://pay.kiwify.com.br/86tG4Pn" className="inline-flex items-center gap-2 rounded-xl px-4 py-2 shadow-md btn-aquarela">Inscreva-se</a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-26 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs tracking-widest uppercase font-medium text-slate-600">Curso online</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-serif leading-tight">
              Curso <span className="u-aquarela u-aquarela-lg u-aquarela-soft">Nail Art Aquarela</span></h1>
            <p className="mt-5 text-lg text-slate-700">
              Transforme sua arte em uma <strong>fonte de renda extra </strong>e se torne uma referência no mundo das unhas.
              Metodologia prática e simples, encante suas clientes com decorações exclusivas com a técnica Aquarela!
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="https://pay.kiwify.com.br/86tG4Pn" className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-base font-medium shadow-lg hover:shadow-xl transition btn-aquarela">Quero me inscrever</a>
              <a href="#conteudo" className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-base font-medium btn-aquarela-outline">Ver conteúdo</a>
            </div>
            <ul className="mt-6 text-sm text-slate-600 space-y-1">
              <li>• Acesso vitalício • Certificado • Suporte em grupo</li>
            </ul>
          </div>

          {/* Foto real da professora com fallback */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-[2rem] shadow-2xl overflow-hidden border border-white/70">
              <img src={imgSrc} onError={handleImgError} alt="Professora Thayná Placedino - Curso Nail Designer Aquarela" className="object-cover w-full h-full" />
            </div>
            <div className="absolute -bottom-5 -left-6 rotate-[-6deg] bg-white rounded-2xl px-4 py-2 shadow-md border-outline">
              <p className="text-xs">+600 alunas formadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* VÍDEO */}
      <section id="video" className="py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-serif">Assista: mensagem da professora</h2>
          <p className="mt-2 text-slate-700 max-w-2xl">Conheça a <strong>Thayná Placedino</strong> e entenda como a técnica aquarela vai elevar o seu nível profissional.</p>
          <div className="mt-6 relative w-full max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/70">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/XBb15IWww6s?rel=0&modestbranding=1&controls=1"
              title="Apresentação do curso - Thayná Placedino"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

          </div>
        </div>
      </section>

      {/* SOBRE A PROFESSORA */}
      <section id="sobre" className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid md:grid-cols-2 gap-10 items-start">
          <div className="bg-white/70 border-outline rounded-3xl p-6 shadow-sm border-outline">
            <h2 className="text-2xl font-serif">Sobre <span className="text-slate-900">Thayná Placedino</span></h2>
            <p className="mt-4 text-slate-700">
              Nail Designer há 8 anos, Thayná é referência em unhas decoradas. Sua didática é simples,
              do iniciante ao avançado levando profissionais para o próximo nível.
            </p>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
              <li className="rounded-xl border-outline bg-white p-3">🎨 Metodologia prática</li>
              <li className="rounded-xl border-outline bg-white p-3">💬 Suporte em grupo</li>
              <li className="rounded-xl border-outline bg-white p-3">📜 Certificado</li>
            </ul>
          </div>

          <div className="rounded-[2rem] h-full border-outline bg-white/70 p-6 shadow-sm border-outline">
            <h3 className="text-xl font-semibold">Para quem é</h3>
            <ul className="mt-3 space-y-2 text-slate-700">
              <li>• Nail Designer iniciantes</li>
              <li>• ⁠Profissionais querem oferecer um diferencial</li>
              <li>• ⁠Para quem busca aumentar seu faturamento</li>
              <li>• ⁠Para quem quer se Destacar no mercado das unhas</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section id="conteudo" className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-serif">O que você vai aprender</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              { t: "Fundamentos da aquarela", d: "Aprenda a dominar a água, o pigmento para criar efeitos leves, delicados e controlados em cada traço." },
              { t: "Pinceladas e traços finos", d: "Desenvolva precisão e elegância em flores, folhas e contornos sutis, o segredo por trás de um acabamento artístico impecável." },
              { t: "Composição e harmonias", d: "Descubra como criar combinações de cores equilibradas e composições visuais encantadoras que valorizam cada unha como uma verdadeira obra de arte." },
              { t: "Correções e durabilidade", d: "Garanta resultados perfeitos e duradouros com técnicas de correção que mantêm sua arte intacta por muito mais tempo." },
            ].map((m, i) => (
              <div key={i} className="rounded-2xl bg-white/80 p-5 shadow-sm border-outline">
                <h3 className="font-medium">{m.t}</h3>
                <p className="mt-2 text-sm text-slate-700">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section id="depoimentos" className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-serif">Depoimentos</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              { n: "Ana Luiza", t: "Nunca imaginei que conseguiria flores tão realistas!" },
              { n: "Camila Souza", t: "Método fácil, divertido e inspirador." },
              { n: "Bianca Rocha", t: "Meu ticket médio subiu em 40% com aquarela!" },
            ].map((d, i) => (
              <figure key={i} className="rounded-2xl border-outline bg-white/80 p-5 shadow-sm">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M7.17 6.17A5 5 0 0 1 12 2v4a3 3 0 0 0-3 3v1h3v6H6v-7a5 5 0 0 1 1.17-3.83ZM17.17 6.17A5 5 0 0 1 22 2v4a3 3 0 0 0-3 3v1h3v6h-6v-7a5 5 0 0 1 1.17-3.83Z" />
                </svg>
                <blockquote className="mt-3 text-slate-700">“{d.t}”</blockquote>
                <figcaption className="mt-3 text-sm text-slate-600">— {d.n}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* BÔNUS + GARANTIA */}
      <section id="bonus" className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-serif">Bônus e garantia</h2>
          <div className="mt-6 grid md:grid-cols-1 gap-6">
            <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-8">
              <div className="rounded-2xl border-outline bg-white/80 p-6 shadow-sm">
                <h3 className="text-2xl font-serif">Bônus Exclusivos</h3>
                <ul className="mt-4 space-y-2 text-slate-700">
                  <li>• Acesso vitalício</li>
                  <li>• Grupo privado de alunas</li>
                  <li>• Certificado digital</li>
                  <li>• Atualizações gratuitas</li>
                </ul>
              </div>
              <div className="rounded-2xl border-outline bg-white/80 p-6 shadow-sm">
                <h3 className="text-2xl font-serif">Garantia de 7 dias</h3>
                <p className="mt-3 text-slate-700">Se você não amar o curso, devolvemos 100% do valor dentro de 7 dias. Simples assim.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREÇO / CTA */}
      <section id="inscricao" className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-3xl border-outline bg-white/80 p-8 shadow-lg grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-serif">Garanta sua vaga</h3>
              <p className="mt-2 text-slate-700">Acesso imediato ao conteúdo, atualizações e comunidade.</p>
              <ul className="mt-3 text-sm text-slate-600 space-y-1">
                <li>• Pagamento único • Acesso vitalício • Certificado</li>
              </ul>
            </div>
            <div className="md:text-right">
              <p className="text-3xl font-semibold">R$ 19,90</p>
              <a href="https://pay.kiwify.com.br/86tG4Pn" className="mt-3 inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-medium text white shadow-lg hover:shadow-xl transition w-full md:w-auto btn-aquarela">Quero me inscrever</a>
              <p className="mt-2 text-xs text-slate-500">Garantia de 7 dias</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-serif">Perguntas frequentes</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {[
              { q: "Por quanto tempo tenho acesso?", a: "Acesso vitalício, incluindo futuras atualizações." },
              { q: "Como recebo o certificado?", a: "Ao concluir as aulas e atividades, o certificado é liberado automaticamente." },
              { q: "Preciso ter experiência?", a: "Não. O curso vai do básico ao avançado, com exercícios guiados." },
              { q: "Há suporte?", a: "Sim, via grupo privado de alunas." },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border-outline bg-white/80 p-5 shadow-sm">
                <p className="font-medium">{f.q}</p>
                <p className="mt-1 text-sm text-slate-700">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 text-sm text-slate-600 grid md:grid-cols-2 gap-4">
          <a href="https://devstudio.com.br" className="hover:text-violet-600">© 2025 Thayná Placedino | Desenvolvido por DevStudio - Inovação Digital</a>
          <p className="md:text-right">Política de Privacidade • Suporte • Instagram</p>
        </div>
      </footer>
    </div>
  );
}
