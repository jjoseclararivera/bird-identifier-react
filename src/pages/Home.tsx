import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('Bird Identifier')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{t('Bird Identifier')}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="ion-padding">
          <h2>{t('Welcome')}</h2>
          <p>{t('Take a picture or upload an image to identify birds!')}</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;