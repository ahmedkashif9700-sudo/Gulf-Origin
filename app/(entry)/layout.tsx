import type {Metadata} from 'next';
import '../globals.css';
export const metadata: Metadata = { title:'Gulf Origin International | A World of Taste', description:'Discover dates, nuts, coffee, saffron and spices at Gulf Origin International in Riyadh. Explore our collection in English and Arabic.', robots:{index:true,follow:true} };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
