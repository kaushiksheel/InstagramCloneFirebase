import { themeState } from "@/pages/_app"
import { selector } from "recoil"









export const currentThemeState=selector({
    key:'currentThemeState',
    get:({get})=>{
        const theme=get(themeState)
        return theme
    }
})
