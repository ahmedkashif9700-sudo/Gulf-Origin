import raw from '../public/catalog.json';
export type Locale = 'en' | 'ar';
export type Product = { id: number; category: string; name: string; arabic: string; price: number; unit: string; image: string };
const missingArabic: Record<number,string> = {9:'قهوة بري',10:'قهوة هرري',11:'قهوة لقمتـي',12:'قهوة خولاني',13:'قهوة تركية',14:'عدس أحمر',15:'ماش',16:'حمص مجروش',17:'حمص أسود',18:'عدس أصفر',19:'عدس تور',20:'بازلاء خضراء',21:'عدس كامل',22:'زعفران ١٫٥ غرام',23:'زعفران ٣ غرام',24:'خيوط زعفران ١ غرام'};
export const products: Product[] = raw.map(p => ({...p, arabic:p.arabic || missingArabic[p.id], image:'/'+p.image}));
export const categories = [
 {en:'Pistachios',ar:'الفستق',short:'Pistachios',id:3,tint:'#4d6846',line:['A little crunch.','A world of flavour.'],arabicLine:['قرمشة لذيذة.','عالم من النكهات.']},
 {en:'Dates',ar:'التمور',short:'Dates',id:50,tint:'#78513e',line:['Treasured dates.','Naturally memorable.'],arabicLine:['تمور مميزة.','مذاق لا يُنسى.']},
 {en:'Almonds',ar:'اللوز',short:'Almonds',id:7,tint:'#987347',line:['The simple pleasure','of a perfect crunch.'],arabicLine:['متعة بسيطة','وقرمشة لذيذة.']},
 {en:'Saffron',ar:'الزعفران',short:'Saffron',id:22,tint:'#aa4d36',line:['Golden threads.','Extraordinary flavour.'],arabicLine:['خيوط ذهبية.','نكهة استثنائية.']},
 {en:'Cardamom',ar:'الهيل',short:'Cardamom',id:29,tint:'#587449',line:['Small pods.','Beautiful aroma.'],arabicLine:['حبات صغيرة.','رائحة مميزة.']},
 {en:'Coffee / Ghawa',ar:'القهوة',short:'Coffee',id:12,tint:'#755441',line:['For your daily ritual.','For shared moments.'],arabicLine:['لطقوسك اليومية.','وللحظات تجمعنا.']},
 {en:'Raisins',ar:'الزبيب',short:'Raisins',id:1,tint:'#88613e',line:['A naturally sweet','little discovery.'],arabicLine:['حلاوة طبيعية','تستحق الاكتشاف.']},
 {en:'Spices',ar:'التوابل',short:'Spices',id:32,tint:'#a75539',line:['Bring every recipe','to life.'],arabicLine:['أضف إلى كل وصفة','نكهة الحياة.']},
 {en:'Lentils & Pulses',ar:'العدس والبقوليات',short:'Pulses',id:14,tint:'#8a813f',line:['Everyday ingredients.','Endless possibilities.'],arabicLine:['مكونات يومية.','خيارات لا تنتهي.']},
 {en:'Fenugreek, Bay Leaves & Cinnamon',ar:'الحلبة والغار والقرفة',short:'Herbs',id:47,tint:'#817447',line:['Warm notes.','Lasting impressions.'],arabicLine:['نكهات دافئة.','وأثر يدوم.']},
 {en:'Onion',ar:'البصل',short:'Onion',id:26,tint:'#a1814e',line:['The foundation','of good flavour.'],arabicLine:['أساس','النكهة اللذيذة.']},
];
export function unitLabel(p: Product, locale: Locale) { if(locale==='en') return p.unit === 'kg' ? '/ kg' : `/ ${p.unit}`; return p.unit==='kg'?'/ كغ':p.unit==='250g'?'/ ٢٥٠ غرام':`/ عبوة ${p.unit.replace(' pack','').replace('g',' غرام')}`; }
export function enquiry(p: Product, locale: Locale) { return 'https://wa.me/966508275432?text='+encodeURIComponent(locale==='ar'?`مرحباً، أود الاستفسار عن ${p.arabic} (${p.price} ر.س ${unitLabel(p,locale)}).`:`Hello Gulf Origin, I would like to enquire about ${p.name} (${p.price} SAR ${unitLabel(p,locale)}).`); }

// Hero-inspired colors with a brighter image area and a deep, readable text area.
const productHues: Record<string,[number,number]> = {'Pistachios':[91,28],'Dates':[26,32],'Almonds':[32,32],'Saffron':[12,43],'Cardamom':[99,26],'Coffee / Ghawa':[25,25],'Raisins':[32,32],'Spices':[28,35],'Lentils & Pulses':[49,32],'Fenugreek, Bay Leaves & Cinnamon':[75,26],'Onion':[35,32]};
const ingredientHues: Record<number,[number,number]> = {
  2:[315,17],4:[82,30],6:[39,32],14:[19,40],15:[63,33],16:[40,38],17:[22,24],18:[47,43],19:[44,38],20:[95,28],21:[28,25],
  25:[324,20],27:[43,34],28:[24,20],31:[20,35],32:[18,34],33:[42,32],34:[30,14],35:[43,28],36:[28,14],37:[36,25],38:[36,22],39:[36,43],40:[39,43],41:[42,46],42:[36,27],43:[40,28],44:[48,30],45:[82,26],46:[91,24],47:[24,35],48:[23,34],50:[315,17],52:[40,36],55:[26,30],56:[43,28],57:[78,30]
};
export function productSurface(p: Product) {
 const [hue,saturation]=ingredientHues[p.id] || productHues[p.category] || [38,30];
 const shift=(p.id%3-1)*2;
 return {
  '--product-tint':`hsl(${hue+shift} ${saturation}% 40%)`,
  '--product-deep':`hsl(${hue+shift} ${Math.max(saturation-6,10)}% 25%)`,
  '--product-glow':`hsl(${hue+shift} ${saturation+3}% 65%)`,
  '--light-delay':`${-(p.id%7)*1.7}s`
 };
}
