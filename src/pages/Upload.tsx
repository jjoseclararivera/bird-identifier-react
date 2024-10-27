import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { identifyBird } from '../services/Birdidentification';

const Upload: React.FC = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [birdIdentification, setBirdIdentification] = useState<string | undefined>(undefined);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
        const identification = await identifyBird(result);
        setBirdIdentification(identification);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('Upload')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} id="fileInput" />
        <IonButton expand="block" onClick={() => document.getElementById('fileInput')?.click()}>
          {t('Select Image')}
        </IonButton>
        {selectedImage && <IonImg src={selectedImage} />}
        {birdIdentification && (
          <div className="ion-padding">
            <h2>{t('Identification Result')}</h2>
            <p>{birdIdentification}</p>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Upload;