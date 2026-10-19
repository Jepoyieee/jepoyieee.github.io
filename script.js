// Highlights the sidebar link of the section currently in view.
const links=[...document.querySelectorAll('nav.side a')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('active',l.hash==='#'+e.target.id))}}),{rootMargin:'-40% 0px -55% 0px'});
document.querySelectorAll('main section[id]').forEach(s=>io.observe(s));
