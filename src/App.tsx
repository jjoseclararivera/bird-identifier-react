import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { camera, image, settings } from 'ionicons/icons';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Preferences } from '@capacitor/preferences';
import { useTranslation } from 'react-i18next';

import Home from './pages/Home';
import Camera from './pages/Camera';
import Upload from './pages/Upload';
import Settings from './pages/Settings';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();
defineCustomElements(window);

const App: React.FC = () => {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loadDarkMode = async () => {
      const { value } = await Preferences.get({ key: 'darkMode' });
      setDarkMode(value === 'true');
    };
    loadDarkMode();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/camera">
              <Camera />
            </Route>
            <Route path="/upload">
              <Upload />
            </Route>
            <Route path="/settings">
              <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={camera} />
              <IonLabel>{t('Camera')}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="upload" href="/upload">
              <IonIcon icon={image} />
              <IonLabel>{t('Upload')}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings">
              <IonIcon icon={settings} />
              <IonLabel>{t('Settings')}</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;