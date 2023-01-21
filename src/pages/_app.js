import { ThemeProvider } from '@/Context/ThemeProvider'
import '@/styles/globals.css'
import { atom, RecoilRoot } from 'recoil'


export const themeState = atom({
  key: 'themeState',
  default: false,
});
export default function App({ Component, pageProps }) {


  
  return <RecoilRoot>
    <ThemeProvider>
    <Component {...pageProps} />
  </ThemeProvider>
    </RecoilRoot>
}
