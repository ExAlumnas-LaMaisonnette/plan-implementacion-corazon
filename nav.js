/* Navegador lateral: páginas del sitio con sus secciones; marca la página actual y la sección visible. */
(function(){
  var PAGES=[
    {href:'./',file:'index.html',title:'Plan de implementación',sub:'Proyecto Corazón · 90 años',secs:[['s1','01','Sentido de esta etapa'],['s2','02','Una obra construida desde la comunidad'],['s3','03','Concepto de la instalación final'],['s4','04','Activación de la comunidad'],['s5','05','Implementación y montaje'],['s6','06','Equipo responsable'],['s7','07','Apoyos requeridos al colegio'],['s8','08','Próximos pasos'],['s9','09','Permanencia posterior a la Velada Cultural']]},
    {href:'renders.html',file:'renders.html',title:'Renders',sub:'Entrada, pasillo y espacio inmersivo',secs:[['entrada','01','Entrada'],['pasillo','02','Pasillo'],['inmersiva','03','Espacio inmersivo']]},
    {href:'pergola.html',file:'pergola.html',title:'Pérgola',sub:'Estructura del espacio inmersivo',secs:[['donde','01','Dónde va'],['estructura','02','La estructura'],['vistas','03','Vistas 3D'],['fichas','04','Fichas técnicas'],['presupuesto','05','Presupuesto de materiales']]},
    {href:'https://exalumnas-lamaisonnette.github.io/presupuesto-corazon/',title:'Presupuesto',sub:'Sitio del presupuesto',ext:true,secs:[]}
  ];
  var path=location.pathname.split('/').pop()||'index.html';
  var nav=document.createElement('nav');nav.className='sidenav';nav.setAttribute('aria-label','Páginas del sitio');
  var html='<a class="sn-brand" href="./"><img src="renders/logo.png" alt="La Maisonnette 90 años"><b>El Corazón de La Maisonnette</b><span>Proyecto 90 años</span></a><ul>';
  PAGES.forEach(function(p){
    var cur=!p.ext&&p.file===path;
    html+='<li class="page'+(cur?' current':'')+'"><a class="p" href="'+p.href+'"'+(p.ext?' target="_blank" rel="noopener"':'')+'>'+p.title+(p.ext?'<span class="ext">↗</span>':'')+'</a>';
    if(p.secs.length){html+='<ul class="secs">'+p.secs.map(function(s){return '<li><a class="s" href="'+(cur?'':p.href)+'#'+s[0]+'"><span class="n">'+s[1]+'</span>'+s[2]+'</a></li>';}).join('')+'</ul>';}
    html+='</li>';
  });
  html+='</ul><div class="sn-foot">Proyecto “El Corazón de La Maisonnette” · 90 años</div>';
  nav.innerHTML=html;
  var btn=document.createElement('button');btn.className='sn-toggle';btn.type='button';btn.setAttribute('aria-label','Abrir navegación');btn.innerHTML='<span aria-hidden="true" style="font-size:18px;line-height:1">☰</span>Menú';
  document.body.appendChild(nav);document.body.appendChild(btn);
  var ABRIR='<span aria-hidden="true" style="font-size:18px;line-height:1">☰</span>Menú', CERRAR='<span aria-hidden="true" style="font-size:16px;line-height:1">✕</span>Cerrar';
  function close(){nav.classList.remove('open');btn.innerHTML=ABRIR;}
  btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.innerHTML=o?CERRAR:ABRIR;});
  nav.addEventListener('click',function(e){if(e.target.closest('a'))close();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  document.addEventListener('click',function(e){if(nav.classList.contains('open')&&!nav.contains(e.target)&&e.target!==btn)close();});
  // sección visible
  var links={};nav.querySelectorAll('li.current a.s').forEach(function(a){links[a.getAttribute('href').slice(1)]=a;});
  var ids=Object.keys(links);if(!ids.length||!('IntersectionObserver' in window))return;
  var visible={};
  var io=new IntersectionObserver(function(es){es.forEach(function(en){visible[en.target.id]=en.isIntersecting?en.boundingClientRect.top:null;});
    var best=null;ids.forEach(function(id){var t=visible[id];if(t===null||t===undefined)return;if(best===null||Math.abs(t-120)<Math.abs(visible[best]-120))best=id;});
    if(best){ids.forEach(function(id){links[id].classList.toggle('active',id===best);});}
  },{rootMargin:'-10% 0px -55% 0px',threshold:[0,0.2,0.5,1]});
  ids.forEach(function(id){var el=document.getElementById(id);if(el)io.observe(el);});
})();
