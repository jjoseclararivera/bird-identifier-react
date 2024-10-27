import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Preferences } from '@capacitor/preferences';

const resources = {
  en: {
    translation: {
      'Bird Identifier': 'Bird Identifier',
      'Camera': 'Camera',
      'Upload': 'Upload',
      'Settings': 'Settings',
      'Take Picture': 'Take Picture',
      'Select Image': 'Select Image',
      'Dark Mode': 'Dark Mode',
      'Language': 'Language',
    }
  },
  es: {
    translation: {
      'Bird Identifier': 'Identificador de Aves',
      'Camera': 'Cámara',
      'Upload': 'Subir',
      'Settings': 'Ajustes',
      'Take Picture': 'Tomar Foto',
      'Select Image': 'Seleccionar Imagen',
      'Dark Mode': 'Modo Oscuro',
      'Language': 'Idioma',
    }
  }
};

const loadLanguage = async () => {
  const { value } = await Preferences.get({ key: 'language' });
  return value || 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: loadLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;