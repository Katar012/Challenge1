// @ts-ignore
import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonText,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea
} from '@ionic/react';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const FilesystemPage = () => {
  const [filename, setFilename] = useState<string>('test.txt');
  const [content, setContent] = useState<string>('Hello World!');
  const [fileContent, setFileContent] = useState<string>('');
  const [status, setStatus] = useState<string>('Ready');

  const handleWriteFile = async () => {
    try {
      await Filesystem.writeFile({
        path: filename,
        data: content,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });
      setStatus(`File "${filename}" written!`);
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  const handleReadFile = async () => {
    try {
      const result = await Filesystem.readFile({
        path: filename,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });
      setFileContent(typeof result.data === 'string' ? result.data : '');
      setStatus(`File "${filename}" read!`);
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  const handleDeleteFile = async () => {
    try {
      await Filesystem.deleteFile({
        path: filename,
        directory: Directory.Documents
      });
      setFileContent('');
      setStatus(`File "${filename}" deleted!`);
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Filesystem</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardContent>
            <IonText>{status}</IonText>
          </IonCardContent>
        </IonCard>

        <IonItem>
          <IonLabel>Filename:</IonLabel>
          <IonInput
            value={filename}
            onIonChange={(e: any) => setFilename(e.detail.value || '')}
            placeholder="Enter filename"
          />
        </IonItem>

        <IonItem>
          <IonLabel>Content to Write:</IonLabel>
        </IonItem>
        <IonTextarea
          value={content}
          onIonChange={(e: any) => setContent(e.detail.value || '')}
          placeholder="Enter content"
          className="ion-padding"
        />

        {fileContent && (
          <IonCard>
            <IonCardContent>
              <IonText>File Content:</IonText>
              <IonText>{fileContent}</IonText>
            </IonCardContent>
          </IonCard>
        )}

        <IonButton expand="block" onClick={handleWriteFile} className="ion-margin-top">
          Write File
        </IonButton>

        <IonButton expand="block" onClick={handleReadFile}>
          Read File
        </IonButton>

        <IonButton expand="block" onClick={handleDeleteFile} color="danger">
          Delete File
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default FilesystemPage;
