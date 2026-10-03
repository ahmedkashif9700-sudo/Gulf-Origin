import type {Metadata} from 'next';
import '../globals.css';
export const metadata: Metadata = { description:'Explore Gulf Origin International in Riyadh: dates, nuts, coffee, saffron and spices. Discover our products in Arabic and English.',robots:{index:true,follow:true} };
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}) { const {locale}=await params;return <html lang={locale} dir={locale==='ar'?'rtl':'ltr'}><body>{children}</body></html>; }
