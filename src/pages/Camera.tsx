import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg } from '@ionic/react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { useTranslation } from 'react-i18next';

const CameraPage: React.FC = () => {
  const { t } = useTranslation();
  const [photo, setPhoto] = useState<string | undefined>(undefined);

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    setPhoto(image.webPath);
    // Here you would call the Google Gemini API to identify the bird
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('Camera')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={takePicture}>{t('Take Picture')}</IonButton>
        {photo && <IonImg src={photo} />}
      </IonContent>
    </IonPage>
  );
};

export default CameraPage;