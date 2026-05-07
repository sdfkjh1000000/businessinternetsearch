(function() {
  var consent;
  try { consent = localStorage.getItem('consent'); } catch(e) { return; }

  function injectTurnstile() {
    if (!document.querySelector('.cf-turnstile')) return;
    var s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    s.async = true; s.defer = true;
    document.head.appendChild(s);
  }

  function disableForm(showNotice) {
    var widget = document.querySelector('.cf-turnstile');
    if (!widget) return;
    var btn = document.getElementById('submitBtn');
    if (btn) btn.disabled = true;
    if (!showNotice) return;
    var notice = document.createElement('p');
    notice.className = 'consent-form-notice';
    notice.innerHTML = 'You declined the privacy notice, so the quote form (which uses Cloudflare Turnstile for spam protection) is disabled. Email <a href="mailto:quotes@businessinternetsearch.sdfkjh.com">quotes@businessinternetsearch.sdfkjh.com</a> directly, or clear this site’s storage in your browser to change your choice.';
    widget.parentNode.insertBefore(notice, widget);
  }

  function build() {
    if (consent === 'accept') { injectTurnstile(); return; }
    if (consent === 'reject') { disableForm(true); return; }

    disableForm(false);

    var banner = document.createElement('div');
    banner.className = 'consent-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Privacy notice');
    banner.innerHTML =
      '<div class="consent-inner">' +
        '<p class="consent-text">This site uses <strong>Cloudflare Turnstile</strong> on the quote form (anti-spam). Until you choose, it hasn’t loaded and the form is disabled. The site is hosted on Cloudflare. <a href="/privacy.html">Privacy</a> &middot; <a href="/do-not-sell.html">Do Not Sell</a></p>' +
        '<div class="consent-actions">' +
          '<button type="button" class="consent-btn consent-decline" data-consent="reject">Decline</button>' +
          '<button type="button" class="consent-btn consent-accept" data-consent="accept">Accept</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);

    banner.addEventListener('click', function(e) {
      var t = e.target.closest('[data-consent]');
      if (!t) return;
      try { localStorage.setItem('consent', t.getAttribute('data-consent')); } catch(err) {}
      location.reload();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
