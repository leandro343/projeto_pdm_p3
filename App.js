import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView, Linking } from 'react-native';
import axios from 'axios';

export default function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const fetchByName = async () => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${query}`);
      setData(response.data[0]);
      setError('');
    } catch (err) {
      setError('País não encontrado!');
      setData(null);
    }
  };

  const fetchByCapital = async () => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/capital/${query}`);
      setData(response.data[0]);
      setError('');
    } catch (err) {
      setError('Capital não encontrada!');
      setData(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Informações sobre Países</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Digite o nome ou capital"
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
      
      <View style={styles.buttons}>
        <Button title="Buscar por Nome" onPress={fetchByName} />
        <Button title="Buscar por Capital" onPress={fetchByCapital} />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {data && (
        <View style={styles.result}>
          <Text style={styles.info}><Text style={styles.label}>Nome Comum:</Text> {data.name.common}</Text>
          <Text style={styles.info}><Text style={styles.label}>Nome Oficial:</Text> {data.name.official}</Text>
          <Text style={styles.info}><Text style={styles.label}>Nome em Russo:</Text> {data.translations.rus.common}</Text>
          <Text style={styles.info}>
            <Text style={styles.label}>Mapa:</Text> 
            <Text style={styles.link} onPress={() => Linking.openURL(data.maps.openStreetMaps)}> Ver no OpenStreetMap</Text>
          </Text>
          <Text style={styles.info}><Text style={styles.label}>Bandeira:</Text></Text>
          <Image source={{ uri: data.flags.png }} style={styles.flag} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center',  
    padding: 20,
    backgroundColor: '#fff',
    minHeight: '100vh',  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    width: '80%',  
  },
  buttons: {
    flexDirection: 'column',  
    justifyContent: 'flex-start',  
    marginBottom: 20,
    width: '80%',  
    gap: 10,  
  },
  
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    width: '80%', 
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  flag: {
    width: 150,
    height: 100,
    marginTop: 10,
  },
});
