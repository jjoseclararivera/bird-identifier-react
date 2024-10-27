import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonToggle, IonSelect, IonSelectOption } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { Preferences } from '@capacitor/preferences';

interface SettingsProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({ darkMode, setDarkMode }) => {
  const { t, i18n } = useTranslation();

  const handleDarkModeChange = (event: CustomEvent) => {
    const isDark = event.detail.checked;
    setDarkMode(isDark);
    Preferences.set({ key: 'darkMode', value: isDark.toString() });
  };

  const handleLanguageChange = (event: CustomEvent) => {
    const lang = event.detail.value;
    i18n.changeLanguage(lang);
    Preferences.set({ key: 'language', value: lang });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('Settings')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel>{t('Dark Mode')}</IonLabel>
            <IonToggle checked={darkMode} onIonChange={handleDarkModeChange} />
          </IonItem>
          <IonItem>
            <IonLabel>{t('Language')}</IonLabel>
            <IonSelect value={i18n.language} onIonChange={handleLanguageChange}>
              <IonSelectOption value="en">English</IonSelectOption>
              <IonSelectOption value="es">Español</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;