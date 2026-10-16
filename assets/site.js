// Google Ads: rastreia cliques no WhatsApp (mesmo comportamento do site original)
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
window.gtag('js', new Date());
window.gtag('config', 'AW-18330464995');

document.addEventListener('click', function (event) {
  var link = event.target && event.target.closest && event.target.closest('a[href*="wa.me/"]');
  if (!link) return;
  window.gtag('event', 'whatsapp_click', {
    send_to: 'AW-18330464995',
    event_category: 'contact',
    event_label: window.location.pathname,
    link_url: link.href,
    transport_type: 'beacon'
  });
}, true);

// Menu padronizado nas páginas internas + menu para celular em todas as páginas
var NAV = [
  ['/', 'Início'], ['/direito-de-familia/', 'Família'], ['/sucessoes/', 'Sucessões'],
  ['/direito-civil/', 'Civil'], ['/direito-digital/', 'Digital'], ['/artigos/', 'Artigos'],
  ['/central-juridica/', 'Central Jurídica'], ['/contato/', 'Contato']
];
var MOBILE = [
  ['/', 'Início'], ['/direito-de-familia/', 'Direito de Família'], ['/sucessoes/', 'Sucessões e Inventário'],
  ['/direito-civil/', 'Direito Civil'], ['/central-juridica/consumidor/', 'Direito do Consumidor'],
  ['/central-juridica/direito-medico/', 'Direito Médico'], ['/direito-digital/', 'Direito Digital'],
  ['/artigos/', 'Artigos'], ['/central-juridica/', 'Central Jurídica'], ['/contato/', 'Contato']
];
function norm(p) { return p.replace(/\/+$/, '') || '/'; }
document.addEventListener('DOMContentLoaded', function () {
  var here = norm(location.pathname);
  var nav = document.querySelector('.desktop-nav');
  var isHome = here === '/';
  if (nav && !isHome) {
    nav.innerHTML = NAV.map(function (n) {
      var active = norm(n[0]) === here || (n[0] !== '/' && here.indexOf(norm(n[0])) === 0);
      return '<a href="' + n[0] + '"' + (active ? ' aria-current="page"' : '') + '>' + n[1] + '</a>';
    }).join('');
  }
  var inner = document.querySelector('.header-inner');
  if (!inner || document.querySelector('.menu-toggle')) return;
  var btn = document.createElement('button');
  btn.className = 'menu-toggle'; btn.type = 'button';
  btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'mobile-menu');
  btn.innerHTML = '<span></span><span></span><span></span><b>Menu</b>';
  var panel = document.createElement('nav');
  panel.id = 'mobile-menu'; panel.className = 'mobile-menu'; panel.setAttribute('aria-label', 'Menu');
  panel.innerHTML = MOBILE.map(function (n) { return '<a href="' + n[0] + '">' + n[1] + '</a>'; }).join('') +
    '<a class="mobile-menu-cta" href="https://wa.me/5511940776679?text=' +
    encodeURIComponent('Olá, Dr. Mateus. Encontrei seu site e gostaria de conversar sobre uma questão jurídica.') +
    '" target="_blank" rel="noreferrer">Conversar pelo WhatsApp ↗</a>';
  inner.appendChild(btn); document.body.appendChild(panel);
  function toggle(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.documentElement.classList.toggle('menu-open', open);
  }
  btn.addEventListener('click', function () { toggle(btn.getAttribute('aria-expanded') !== 'true'); });
  panel.addEventListener('click', function (e) { if (e.target.tagName === 'A') toggle(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });
});

// Formulário de triagem (página Contato): monta a mensagem e abre o WhatsApp
document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('form.triage-form');
  if (!form) return;
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var select = form.querySelector('select');
    var assunto = select.value || select.options[select.selectedIndex].text;
    var processo = (form.querySelector('input[name="processo"]:checked') || {}).value || 'Não';
    var prazo = (form.querySelector('input[name="prazo"]:checked') || {}).value || 'Não';
    var resumo = form.querySelector('textarea').value.trim();
    var msg = 'Olá, Dr. Mateus. Encontrei seu site. Meu assunto é ' + assunto +
      '. Já existe processo: ' + processo +
      '. Existe audiência ou prazo informado: ' + prazo +
      '. Resumo: ' + (resumo || 'Prefiro explicar durante o atendimento.');
    window.open('https://wa.me/5511940776679?text=' + encodeURIComponent(msg), '_blank', 'noopener,noreferrer');
  });
});
