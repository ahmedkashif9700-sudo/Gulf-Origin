import { notFound } from 'next/navigation';
import type {Metadata} from 'next';
import Showcase from './showcase';
export const dynamicParams = false;
export function generateStaticParams(){ return [{locale:'en'},{locale:'ar'}]; }
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const {locale}=await params;
  const ar=locale==='ar';
  return {
    title: ar
      ? 'جلف أوريجن العالمية | مكسرات وتمور وتوابل في الرياض'
      : 'Gulf Origin International | Dry Fruits, Dates & Spices in Riyadh',
    description: ar
      ? 'مكسرات وتمور وزعفران وتوابل فاخرة في الرياض — جلف أوريجن العالمية، محمصة وعطارة في حي الزهراء. خصم 10% على أول طلب + توصيل مجاني.'
      : 'Premium dry fruits, dates, nuts, saffron and spices in Riyadh — Gulf Origin International roastery in Al Zahra. 10% OFF your first order + FREE delivery.',
    alternates:{canonical:`/${locale}`,languages:{en:'/en',ar:'/ar'}},
    openGraph:{
      url:`https://gulforigin.vercel.app/${locale}`,
      locale: ar?'ar_SA':'en_SA',
    },
  };
}
export default async function Page({params}:{params:Promise<{locale:string}>}) { const {locale}=await params; if(locale!=='en'&&locale!=='ar') notFound(); return <Showcase locale={locale}/>; }
