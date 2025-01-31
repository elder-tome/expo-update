import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Updates from "expo-updates";
import { useEffect, useState } from 'react';

export default function App() {

  const [updating, setUpdating] = useState(false);

  const checkForUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      
      if (update.isAvailable) {
        setUpdating(true);

        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();

        setUpdating(false);
      }
    } catch (error) {
      console.error("Erro ao buscar atualizações:", error);
    }
  };
  
  useEffect(() => {
    checkForUpdates();
  }, []);

  return (
    <View style={styles.container}>
      {
        updating && <Text>Atualizando...</Text>
      }
      <Text>Versão 1.0.9</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
