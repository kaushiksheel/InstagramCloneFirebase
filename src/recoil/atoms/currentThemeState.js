import { selector ,atom} from "recoil"





const themeState = atom({
    key: 'themeState',
    default: false,
  });
  






export const currentThemeState=selector({
    key:'themeState',
    get:({get})=>{
        const theme=get(themeState)
        return theme
    }
})
