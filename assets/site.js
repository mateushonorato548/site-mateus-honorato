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
