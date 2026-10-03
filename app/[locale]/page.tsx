import { notFound } from 'next/navigation';
import type {Metadata} from 'next';
import Showcase from './showcase';
export const dynamicParams = false;
export function generateStaticParams(){ return [{locale:'en'},{locale:'ar'}]; }
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;return {title:locale==='ar'?'جلف أوريجن العالمية | عالم من النكهات':'Gulf Origin International | A World of Taste',alternates:{languages:{en:'/en',ar:'/ar'}}};}
export default async function Page({params}:{params:Promise<{locale:string}>}) { const {locale}=await params; if(locale!=='en'&&locale!=='ar') notFound(); return <Showcase locale={locale}/>; }
