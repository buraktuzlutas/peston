import i18next from 'i18next'

const resources = {
  tr: {
    translation: require('./locales/tr.json')
  },
  en: {
    translation: require('./locales/en.json')
  }
}

i18next.init({
  resources,
  lng: 'tr',
  fallbackLng: 'tr'
}) 