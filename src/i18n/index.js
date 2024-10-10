import { createI18n } from 'vue-i18n'
import es from './locales/es.json'
import eu from './locales/eu.json'

export default createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    messages: { es, eu },
    legacy: false,
    globalInjection:true
    
})