'use client';
import Image from 'next/image';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {categories, products, enquiry, unitLabel, productSurface, type Locale, type Product} from '../../lib/catalog';
gsap.registerPlugin(ScrollTrigger);

export default function Showcase({locale}:{locale:Locale}) {
 const ar=locale==='ar'; const [active,setActive]=useState(0); const [still,setStill]=useState(false); const [filter,setFilter]=useState('all'); const [query,setQuery]=useState(''); const [selected,setSelected]=useState<Product|null>(null);
 const stage=useRef<HTMLElement>(null); const root=useRef<HTMLDivElement>(null); const trigger=useRef<ScrollTrigger|null>(null); const activeRef=useRef(0); const dialog=useRef<HTMLDialogElement>(null);
 const c=categories[active], featured=products.find(p=>p.id===c.id)!;
 const t=(en:string,arabic:string)=>ar?arabic:en;
 useEffect(()=>{
  const media=gsap.matchMedia();
  const ctx=gsap.context(()=>{
   media.add('(prefers-reduced-motion: no-preference)',()=>{
    if(still) return;
    const cards=gsap.utils.toArray<HTMLElement>('.orbit-bowl'); const scene=stage.current!;
    const draw=(phase:number)=>{
     const index=Math.min(categories.length-1,Math.round(phase)); if(index!==activeRef.current){activeRef.current=index;setActive(index);}
     const mobile=window.innerWidth<760;const radius=Math.min(window.innerWidth*(mobile?.35:.31),440); const pitch=mobile?170:220;
     cards.forEach((el,i)=>{const delta=i-phase;const angle=delta*1.12;const depth=Math.cos(angle);const opacity=Math.max(0,1-Math.abs(delta)/3.2)*(Math.abs(delta)>.75?.78:1);const weight=Math.exp(-Math.abs(delta)*.3);gsap.set(el,{x:Math.sin(angle)*radius*(ar?-1:1),y:delta*pitch,z:depth*100,scale:(mobile?.75:1)*(0.65+depth*.35)*weight,rotation:Math.sin(angle)*-11,opacity:delta<-.75?opacity*.35:opacity,zIndex:Math.round(100+depth*50),visibility:opacity<.01?'hidden':'visible'});});
     const k=Math.min(Math.floor(phase),categories.length-2),f=phase-k;const color=gsap.utils.interpolate(categories[k].tint,categories[k+1].tint,f);gsap.set(scene,{'--scene-color':color,'--scene-deep':gsap.utils.interpolate(color,'#17271c',.48)});gsap.set('.glow-one',{x:Math.sin(phase*.7)*window.innerWidth*.18,y:Math.cos(phase*.8)*70,scale:1+Math.sin(phase)*.12});gsap.set('.glow-two',{x:Math.cos(phase*.55)*window.innerWidth*.15,y:Math.sin(phase*.7)*100});
     gsap.set('.category-backdrop',{x:Math.sin(phase*Math.PI)*18*(ar?-1:1)});
     gsap.set('.scene-progress',{scaleX:phase/(categories.length-1)});
    };
    const playhead={phase:0};
    const orbit=gsap.to(playhead,{phase:categories.length-1,ease:'none',onUpdate:()=>draw(playhead.phase),scrollTrigger:{trigger:scene,start:'top top',end:()=>'+='+((categories.length-1)*(window.innerWidth<760?520:660)),pin:true,scrub:.65,invalidateOnRefresh:true,onRefresh:self=>draw(self.progress*(categories.length-1))}});
    const scroll=orbit.scrollTrigger!;trigger.current=scroll;draw(scroll.progress*(categories.length-1));
    const intro=gsap.timeline().from('.header .brand, .header nav a, .header .language',{y:-12,opacity:0,duration:.55,stagger:.07,ease:'power2.out'}).from('.scene-intro > *',{y:26,opacity:0,duration:.8,stagger:.14,ease:'power3.out'},.15).from('.scene-controls, .scene-bottom',{y:18,opacity:0,duration:.7,stagger:.1,ease:'power2.out'},.5);
    return ()=>{intro.kill();orbit.kill();scroll.kill();trigger.current=null;};
   });
   media.add('(prefers-reduced-motion: no-preference)',()=>{
    if(still) return;
    ScrollTrigger.create({trigger:'#collection',start:'top bottom',end:'bottom top',toggleClass:{targets:'#collection',className:'atmosphere-active'}});
    const textTargets='#origin .eyebrow, #origin h2, #origin p, .stats > div, .collection-heading .eyebrow, .collection-heading h2, .collection-heading p, .collection-tools, .imagery-note, .contact-copy > *, footer > *';
    gsap.utils.toArray<HTMLElement>(textTargets).forEach(el=>gsap.from(el,{y:24,opacity:0,duration:.75,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 96%',once:true}}));
    gsap.fromTo('.contact-art img',{y:30},{y:-30,ease:'none',scrollTrigger:{trigger:'.contact',start:'top bottom',end:'bottom top',scrub:.8}});
   });
  },root);
  return ()=>{media.revert();ctx.revert();};
 },[ar,still]);
 useEffect(()=>{
  const media=gsap.matchMedia();
  const ctx=gsap.context(()=>{
   media.add('(prefers-reduced-motion: no-preference)',()=>{
    if(still) return;
    const grid=root.current!.querySelector('.product-grid')!;
    const columns=getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    gsap.utils.toArray<HTMLElement>('.product-card').forEach((card,i)=>{
     const column=i%columns;
     gsap.timeline({scrollTrigger:{trigger:card,start:'top 96%',once:true}})
      .from(card,{y:46,rotationX:5,opacity:0,duration:.75,delay:column*.07,ease:'power3.out'})
      .from(card.querySelectorAll('.card-category, h3, .card-footer'),{y:16,opacity:0,duration:.5,stagger:.08,ease:'power2.out'},.2+column*.07);
     gsap.timeline({scrollTrigger:{trigger:card,start:'top bottom',end:'bottom top',scrub:.5,toggleClass:'is-in-view'}})
      .fromTo(card.querySelector('.card-image'),{y:16,rotation:column%2===0?-2:2},{y:-12,rotation:0,ease:'none'},0)
      .fromTo(card.querySelector('.card-glow'),{xPercent:-18,yPercent:-12,scale:.9},{xPercent:18,yPercent:10,scale:1.15,ease:'none'},0);
    });
   });
  },root);
  return ()=>{media.revert();ctx.revert();};
 },[ar,still,filter,query]);
 useEffect(()=>{if(!trigger.current&&stage.current){const color=categories[active].tint;gsap.set(stage.current,{'--scene-color':color,'--scene-deep':gsap.utils.interpolate(color,'#17271c',.48)});}},[active,still]);
 useEffect(()=>{const frame=requestAnimationFrame(()=>ScrollTrigger.refresh());return ()=>cancelAnimationFrame(frame);},[filter,query]);
 useEffect(()=>{ if(selected&&!dialog.current?.open)dialog.current?.showModal(); },[selected]);
 function move(index:number){const n=Math.max(0,Math.min(categories.length-1,index));if(trigger.current){window.scrollTo({top:trigger.current.start+(trigger.current.end-trigger.current.start)*n/(categories.length-1),behavior:'instant'});}else{activeRef.current=n;setActive(n);}}
 const filtered=products.filter(p=>(filter==='all'||p.category===filter)&&`${p.name} ${p.arabic} ${p.category}`.toLowerCase().includes(query.toLowerCase()));
 return <div ref={root} dir={ar?'rtl':'ltr'} className={(ar?'site arabic':'site')+(still?' motion-off':'')}>
  <a className="skip-link" href="#collection">{t('Skip to collection','انتقل إلى المجموعة')}</a>
  <header className="header"><Link href={'/'+locale} className="brand" aria-label="Gulf Origin International"><span className="brand-mark">GO<span>•</span></span><span>{t('GULF ORIGIN','جلف أوريجن')}<small>{t('INTERNATIONAL','العالمية')}</small></span></Link><nav aria-label={t('Main navigation','التنقل الرئيسي')}><a href="#collection">{t('Collection','المجموعة')}</a><a href="#origin">{t('Our origin','من نحن')}</a><a href="#contact">{t('Contact','تواصل معنا')}</a></nav><Link className="language" href={ar?'/en':'/ar'} lang={ar?'en':'ar'}>{ar?'EN':'العربية'}</Link></header>
  <main>
   <section ref={stage} className={'spiral-scene'+(still?' still':'')} aria-label={t('Scroll through our collection','تصفح مجموعتنا')} style={{'--scene-color':categories[0].tint,'--scene-deep':gsap.utils.interpolate(categories[0].tint,'#17271c',.48)} as React.CSSProperties}>
    <div className="scene-glow glow-one" aria-hidden="true"/><div className="scene-glow glow-two" aria-hidden="true"/>
    <div className="scene-intro intro-item"><span className="eyebrow">{t('RIYADH, SAUDI ARABIA','الرياض، المملكة العربية السعودية')}</span><h1><span className="sr-only">{t('Premium dry fruits, dates, nuts, saffron and spices in Riyadh — Gulf Origin International','مكسرات وتمور وتوابل فاخرة في الرياض — جلف أوريجن العالمية')} </span><span aria-hidden="true">{t('A world of','عالم من')} <em>{t('taste.','النكهات.')}</em></span></h1><p>{t('Origin in every ingredient.','أصلٌ في كل مكوّن.')}</p></div>
    <div className="category-backdrop" aria-hidden="true" key={c.en}>{ar?c.ar:c.short}</div>
    <div className="bowl-stage" aria-hidden="true">{categories.map((cat,i)=>{const p=products.find(p=>p.id===cat.id)!;return <div className={'orbit-bowl '+(i===active?'is-active':'')} key={cat.id} data-index={i}><Image src={p.image} alt="" fill sizes="(max-width: 760px) 85vw, 600px" priority={i===0} loading={i<3?'eager':'lazy'}/></div>;})}</div>
    <div className="product-story intro-item" key={c.id}><span className="eyebrow">{t('THE COLLECTION','المجموعة')} <span className="tiny-rule"/></span><h2>{ar?featured.arabic:featured.name}</h2><p>{(ar?c.arabicLine:c.line).map((l,i)=><span key={i}>{l}<br/></span>)}</p><div className="featured-price"><strong>{featured.price}</strong><span>{t('SAR','ر.س')}<small>{unitLabel(featured,locale)}</small></span></div><button className="gold-button" onClick={()=>setSelected(featured)}>{t('Discover this product','اكتشف هذا المنتج')}</button></div>
    <div className="scene-controls intro-item"><span className="scene-count"><b>{String(active+1).padStart(2,'0')}</b> / {categories.length}</span><button onClick={()=>move(active-1)} disabled={active===0} aria-label={t('Previous category','الفئة السابقة')}>↑</button><button onClick={()=>move(active+1)} disabled={active===categories.length-1} aria-label={t('Next category','الفئة التالية')}>↓</button></div>
    <div className="scene-bottom intro-item"><span className="scroll-hint"><span className="scroll-line"/>{t('SCROLL TO EXPLORE','مرر للاكتشاف')}</span><div className="category-nav" aria-label={t('Choose category','اختر الفئة')}>{categories.map((cat,i)=><button key={cat.id} onClick={()=>move(i)} className={active===i?'current':''} aria-label={ar?cat.ar:cat.en} aria-pressed={active===i}><span/></button>)}</div><button className="motion-button" onClick={()=>setStill(s=>!s)} aria-pressed={still}>{still?t('Enable motion','تفعيل الحركة'):t('Less motion','تقليل الحركة')}</button></div>
    <div className="scene-progress"/>
   </section>
   <section id="origin" className="origin section-pad"><div className="eyebrow reveal">{t('GULF ORIGIN INTERNATIONAL','جلف أوريجن العالمية')}</div><div className="origin-grid"><h2 className="reveal">{t('From small ingredients,','من مكونات صغيرة،')}<br/><em>{t('beautiful moments.','لحظات جميلة.')}</em></h2><div className="reveal"><p>{t('The aroma of coffee. The warmth of spices. The sweetness of dates. Discover a world of ingredients, right here in Riyadh.','رائحة القهوة، ودفء التوابل، وحلاوة التمور. اكتشف عالماً من المكونات هنا في الرياض.')}</p><div className="stats"><div><strong>{t('Curated','مختارة')}</strong><span>{t('Handpicked selection','تشكيلة مختارة بعناية')}</span></div><div><strong>{categories.length}</strong><span>{t('Distinct collections','مجموعة متنوعة')}</span></div></div></div></div></section>
   <section id="collection" className="collection section-pad"><div className="collection-atmosphere" aria-hidden="true"><div className="collection-lights"><span className="collection-wash wash-gold"/><span className="collection-wash wash-sage"/><span className="collection-wash wash-earth"/></div></div><div className="collection-heading reveal"><div><span className="eyebrow">{t('FIND YOUR FAVOURITES','اكتشف ما تحب')}</span><h2>{t('The collection.','المجموعة.')}<em>{t(' Made to explore.','للاكتشاف.')}</em></h2></div><p>{t('Nuts, dates, coffee & more.','مكسرات وتمور وقهوة والمزيد.')}</p></div><div className="collection-tools"><label className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('Search the collection','ابحث في المجموعة')} aria-label={t('Search products','البحث عن المنتجات')}/></label><label className="category-select"><span>{t('Category','الفئة')}</span><select value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">{t('All collections','جميع المجموعات')}</option>{categories.map(cat=><option key={cat.en} value={cat.en}>{ar?cat.ar:cat.en}</option>)}</select></label></div>
    <div className="product-grid">{filtered.map(p=><button className="product-card" style={productSurface(p) as React.CSSProperties} onClick={()=>setSelected(p)} key={p.id}><span className="card-glow" aria-hidden="true"/><div className="card-image"><Image src={p.image} alt={ar?p.arabic:p.name} fill sizes="(max-width: 600px) 45vw, (max-width: 1000px) 30vw, 23vw"/></div><span className="card-category">{ar?categories.find(cat=>cat.en===p.category)?.ar:p.category}</span><h3>{ar?p.arabic:p.name}</h3><div className="card-footer"><span><b>{p.price}</b> {t('SAR','ر.س')} <small>{unitLabel(p,locale)}</small></span><span className="card-plus" aria-hidden="true">+</span></div></button>)}</div>{filtered.length===0&&<div className="empty"><p>{t('No products match your search.','لا توجد منتجات مطابقة لبحثك.')}</p><button className="gold-button" onClick={()=>{setQuery('');setFilter('all');}}>{t('Reset filters','إعادة ضبط البحث')}</button></div>}<p className="imagery-note">{t('Product imagery is AI-generated for illustration. Contact us to confirm availability and current prices.','صور المنتجات مولّدة بالذكاء الاصطناعي لأغراض توضيحية. تواصل معنا لتأكيد التوفر والأسعار الحالية.')}</p>
   </section>
   <section id="contact" className="contact"><div className="contact-art"><Image src="/hero.webp" alt={t('Illustrated spiral of dates, pistachios, saffron and spices over Riyadh','تصوير فني لتمور وفستق وزعفران وتوابل فوق الرياض')} fill sizes="(max-width: 760px) 100vw, 50vw"/></div><div className="contact-copy reveal"><span className="eyebrow">{t('FIND US IN RIYADH','تجدنا في الرياض')}</span><h2>{t('Your next','نكهتك')}<br/><em>{t('discovery awaits.','القادمة تنتظرك.')}</em></h2><p>{t('Ask about a product, explore our collection or simply say hello.','اسأل عن منتج، أو اكتشف مجموعتنا، أو تواصل معنا.')}</p><a className="gold-button" href="https://wa.me/966508275432" target="_blank" rel="noopener noreferrer">{t('Let’s talk on WhatsApp','تواصل عبر واتساب')}</a><a className="contact-number" dir="ltr" href="tel:+966508275432">+966 50 827 5432</a><a className="instagram" href="https://www.instagram.com/gulforigin26/" target="_blank" rel="noopener noreferrer">Instagram · @gulforigin26</a></div></section>
  </main>
  <footer><Link className="footer-brand" href={'/'+locale}>GULF ORIGIN <span>INTERNATIONAL</span></Link><span>{t('Riyadh, Saudi Arabia','الرياض، المملكة العربية السعودية')}</span><a href="#collection">{t('Explore the collection','اكتشف المجموعة')}</a></footer>
  <dialog ref={dialog} className="product-dialog" onClose={()=>setSelected(null)} onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close();}}>{selected&&<><button className="dialog-close" onClick={()=>dialog.current?.close()} aria-label={t('Close product details','إغلاق تفاصيل المنتج')}>×</button><div className="dialog-image"><Image src={selected.image} alt={ar?selected.arabic:selected.name} fill sizes="(max-width: 760px) 80vw, 400px"/></div><div className="dialog-copy"><span className="eyebrow">{ar?categories.find(cat=>cat.en===selected.category)?.ar:selected.category}</span><h2>{ar?selected.arabic:selected.name}</h2><p className="alternate-name" lang={ar?'en':'ar'} dir={ar?'ltr':'rtl'}>{ar?selected.name:selected.arabic}</p><div className="dialog-price">{selected.price} <span>{t('SAR','ر.س')} {unitLabel(selected,locale)}</span></div><a className="gold-button" href={enquiry(selected,locale)} target="_blank" rel="noopener noreferrer">{t('Enquire on WhatsApp','استفسر عبر واتساب')}</a><p className="dialog-note">{t('Contact us to confirm availability and current prices.','تواصل معنا لتأكيد التوفر والأسعار الحالية.')}</p></div></>}</dialog>
 </div>;
}
