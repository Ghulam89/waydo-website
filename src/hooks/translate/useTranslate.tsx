import { DictionaryType } from './translate.interface'
import enLocale from '@locales/en.json'
import esLocale from '@locales/es.json'
import { useAppSelector } from '@redux/store'
import { Locale } from '../../../i18n.config'

const dictionaries: Record<Locale, any> = {
    en: () => enLocale,
    es: () => esLocale,
}

function useTranslate(topic: string) {

    let langStorage: Locale | null = null;
    if (typeof window !== 'undefined' && window.localStorage) {
        langStorage = localStorage.getItem('lang') as Locale | null;
    }

    const { lang } = useAppSelector(x => x.language)

    const dic: DictionaryType = dictionaries[langStorage || lang]()

    return {
        t: (key: string) => dic[topic]?.[key] || key,
        lang: langStorage || lang
    }
}

export default useTranslate