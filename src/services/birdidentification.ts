import { Preferences } from '@capacitor/preferences';

export const identifyBird = async (imageData: string): Promise<string> => {
  // Simulación de la identificación del pájaro
  // En una implementación real, aquí se haría una llamada a la API de Google Gemini
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simula un retraso de red
  const birds = ['Gorrión', 'Petirrojo', 'Águila', 'Colibrí', 'Búho'];
  const identifiedBird = birds[Math.floor(Math.random() * birds.length)];
  
  // Save to history
  await saveToHistory(imageData, identifiedBird);
  
  return identifiedBird;
};

const saveToHistory = async (imageData: string, bird: string) => {
  const { value } = await Preferences.get({ key: 'birdHistory' });
  let history = value ? JSON.parse(value) : [];
  
  history.unshift({
    id: Date.now().toString(),
    image: imageData,
    bird: bird,
    date: new Date().toLocaleString()
  });
  
  // Keep only the last 10 items
  history = history.slice(0, 10);
  
  await Preferences.set({
    key: 'birdHistory',
    value: JSON.stringify(history)
  });
};