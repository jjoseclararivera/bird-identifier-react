import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonThumbnail, IonImg } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { Preferences } from '@capacitor/preferences';

interface HistoryItem {
  id: string;
  image: string;
  bird: string;
  date: string;
}

const History: React.FC = () => {
  const { t } = useTranslation();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const { value } = await Preferences.get({ key: 'birdHistory' });
    if (value) {
      setHistory(JSON.parse(value));
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('History')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {history.map((item) => (
            <IonItem key={item.id}>
              <IonThumbnail slot="start">
                <IonImg src={item.image} />
              </IonThumbnail>
              <IonLabel>
                <h2>{item.bird}</h2>
                <p>{item.date}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default History;