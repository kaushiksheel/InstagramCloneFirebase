
import { currentThemeState } from "@/recoil/atoms/currentThemeState";
import { CssBaseline, ThemeProvider as ThemePrvdr,createTheme  } from "@mui/material"
import {  useRecoilValue } from "recoil"




export const ThemeProvider=({children})=>{
const darkMode=useRecoilValue(currentThemeState)



const theme = createTheme({
    typography: {
      fontFamily: 'Open Sans, Arial',
    },
    
    components: {
      MuiCssBaseline: {
      
      },
  
    },
    palette:{
      'mode':darkMode?"dark":"light"
    },
    
  });



return (
    <ThemePrvdr  theme={theme} darkMode={darkMode} >
<CssBaseline el/>
{children}
</ThemePrvdr>
)
}

