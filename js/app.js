(function(){
  var d = document, root = d.documentElement, $ = function(s){ return d.querySelector(s); };
  root.classList.add('js');

  // Header background on scroll
  var header = $('#header');
  addEventListener('scroll', function(){ header.classList.toggle('scrolled', scrollY > 20); }, {passive:true});

  // Mobile drawer (native <dialog>)
  var drawer = $('#drawer'), menuBtn = $('#menuBtn');
  menuBtn.addEventListener('click', function(){ drawer.showModal(); menuBtn.setAttribute('aria-expanded','true'); });
  drawer.addEventListener('close', function(){ menuBtn.setAttribute('aria-expanded','false'); });
  drawer.addEventListener('click', function(e){ if (e.target === drawer || e.target.closest('a')) drawer.close(); });

  // Hero video: respect reduced motion / data saver
  // Shows: blurred preview (CSS) -> sharp poster -> video. If autoplay is blocked
  // (data saver, low-power mode, reduced motion) the poster stays and a tap plays it.
  var hv = $('#heroVideo'), hm = hv.parentNode, conn = navigator.connection;
  var lite = matchMedia('(prefers-reduced-motion: reduce)').matches || (conn && conn.saveData);
  var setPaused = function(){ hm.classList.toggle('paused', hv.paused); };
  hv.addEventListener('play', setPaused); hv.addEventListener('pause', setPaused);
  hv.addEventListener('click', function(){ if (hv.paused) { var p = hv.play(); if (p && p.catch) p.catch(function(){}); } else { hv.pause(); } });
  if (lite) { hv.removeAttribute('autoplay'); hv.preload = 'none'; hv.pause(); setPaused(); }
  else { var pr = hv.play(); if (pr && pr.catch) pr.catch(setPaused); }

  // Service links preselect the form
  var form = $('#bookForm');
  d.querySelectorAll('[data-service]').forEach(function(a){
    a.addEventListener('click', function(){ form.service.value = a.dataset.service; });
  });

  // Booking form -> WhatsApp
  try { form.date.min = new Date().toISOString().slice(0,10); } catch(e){}
  form.addEventListener('submit', function(e){
    e.preventDefault();
    // Plain text only: strip control characters and cap length. Values are URL-encoded, never put into the page.
    var clean = function(v, max){ return String(v).replace(/[\u0000-\u001F\u007F<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max); };
    var services = Array.prototype.map.call(form.service.options, function(o){ return o.value; });
    var service = services.indexOf(form.service.value) > -1 ? form.service.value : 'Not sure';
    var date = /^\d{4}-\d{2}-\d{2}$/.test(form.date.value) ? form.date.value : '';
    var t = ['Hi Aura Detailerz, I would like to book a session.',
             'Name: ' + clean(form.name.value, 60),
             'Vehicle: ' + clean(form.car.value, 60),
             'Service: ' + service];
    if (date) t.push('Preferred date: ' + date);
    var note = clean(form.note.value, 500);
    if (note) t.push('Notes: ' + note);
    window.open('https://wa.me/919037742115?text=' + encodeURIComponent(t.join('\n')), '_blank', 'noopener,noreferrer');
  });

  // Reels: one at a time, toggle play overlay
  var vids = d.querySelectorAll('.reel video');
  vids.forEach(function(v){
    v.addEventListener('play', function(){
      vids.forEach(function(o){ if (o !== v) o.pause(); });
      v.parentNode.classList.add('playing');
    });
    v.addEventListener('pause', function(){ v.parentNode.classList.remove('playing'); });
  });

  // Gallery lightbox (links work without JS)
  var lb = $('#lb'), lbImg = $('#lbImg');
  d.querySelectorAll('a.g').forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      lbImg.src = a.getAttribute('href'); lbImg.alt = a.querySelector('img').alt;
      lb.showModal();
    });
  });
  lb.addEventListener('click', function(e){ if (e.target !== lbImg) lb.close(); });

  // Reveal on scroll
  var els = d.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, {rootMargin:'0px 0px -40px 0px', threshold:.1});
    els.forEach(function(el){ io.observe(el); });
  } else { els.forEach(function(el){ el.classList.add('in'); }); }

  $('#year').textContent = new Date().getFullYear();
})();
