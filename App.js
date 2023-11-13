import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const App = () => {
  const API_KEY = 'd0df428ee113c87d7cbc6b14d7b0e3a8';

  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [umidade, setUmidade] = useState(null);
  const [hPa, setHPa] = useState(null);
  const [VelocidadeVento, setVelocidadeVento] = useState(null);
  const [IDtest, setIDtest] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`)
          .then(response => {
            console.log(response.data);
            setCurrentTemperature(response.data.main.temp);
            setLocationName(response.data.name);
            setUmidade(response.data.main.humidity);
            setHPa(response.data.main.pressure);
            setVelocidadeVento(response.data.wind.speed);
            setIDtest(response.data.main.humidity);
          })
          .catch(error => {
            console.log(error);
          });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  return (
    <View style={styles.container}>
      {/* Menu no topo */}
      <View style={styles.menu}>
        <View style={styles.iconWrapper}>
          <Icon name="map-marker" size={24} color="white" style={styles.smallIcon} />
        </View>
        <Text style={styles.locationText}>{locationName || 'Carregando...'}</Text>
        <View style={styles.iconWrapper}>
          <Icon name="bell" size={24} color="white" style={styles.largeIcon} />
        </View>
      </View>


      <View style={styles.header}>
        <Icon name="sun-o" size={48} color="white" />
        <Text style={styles.currentTemperature}>{currentTemperature ? `${Math.round(currentTemperature - 273.15)}°C` : 'Loading...'}</Text>
        <Text style={styles.locationText}>{IDtest || 'Carregando...'}</Text>
        <View style={styles.climaAtual}>
          <Text style={styles.tempo_tipo}>Precipitação</Text>
          <View style={styles.maxMin}>
            <Text style={styles.maxMinText}>Máxima: 31°C</Text>
            <Text style={styles.maxMinText}>Mínima: 25°C</Text>
          </View>
        </View>
      </View>

      <View style={styles.weatherDetails2}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Icon2 name="water" size={24} color="white" style={styles.icon}/>
            <Text style={styles.detailText}> {umidade || '...'}%</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="compress" size={24} color="white" style={styles.icon} />
            <Text style={styles.detailText}> {hPa || '...'}hPA</Text>
          </View>
          <View style={styles.detailItem}>
            <Feather name="wind" size={24} color="white" style={styles.icon}/>
            <Text style={styles.detailText}> {VelocidadeVento || '...'}m/s</Text>
          </View>
        </View>
      </View>

      <View style={styles.weatherDetails2}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Icon2 name="water" size={24} color="white" style={styles.icon}/>
            <Text style={styles.detailText}> {umidade || '...'}%</Text>
          </View>
        </View>
      </View>

      <View style={styles.hourlyForecast}>
        <Text style={styles.forecastTitle}>Hoje</Text>
        <View style={styles.hourlyForecastContainer}>
          <View style={styles.hourBlock}>
            <Text style={styles.hourText}>11:00</Text>
            <Icon name="sun-o" size={38} color="white" />
            <Text style={styles.detailText}>31°C</Text>
          </View>
          <View style={styles.hourBlock}>
            <Text style={styles.hourText}>12:00</Text>
            <Icon name="sun-o" size={38} color="white" />
            <Text style={styles.detailText}>32°C</Text>
          </View>
          <View style={styles.hourBlock}>
            <Text style={styles.hourText}>13:00</Text>
            <Icon name="sun-o" size={38} color="white" />
            <Text style={styles.detailText}>33°C</Text>
          </View>
          <View style={styles.hourBlock}>
            <Text style={styles.hourText}>14:00</Text>
            <Icon name="sun-o" size={38} color="white" />
            <Text style={styles.detailText}>34°C</Text>
          </View>
        </View>
      </View>

      <View style={styles.dailyForecast}>
        <Text style={styles.forecastTitle}>Previsão para os Próximos Dias</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkblue',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  chance_de_Chuva: {
    fontSize: 18,
    color: 'white',
  },
  sensaçãoTermica: {
    fontSize: 18,
    color: 'white',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  velocidadeDoVento: {
    fontSize: 18,
    color: 'white',
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  weatherDetails2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
  },
  currentTemperature: {
    fontSize: 48,
    color: 'white',
  },
  detailText: {
    fontSize: 16,
    color: 'white',
  },
  transparentBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    flex: 0.8,
  },
  hourlyForecast: {
    marginTop: 20,
    flex: 1,
    width: '90%',
  },
  forecastTitle: {
    fontSize: 24,
    color: 'white',
  },
  dailyForecast: {
    marginTop: 20,
    flex: 1,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 40,
    width: '100%',
  },
  locationText: {
    fontSize: 18,
    color: 'white',
    flex: 1,
  },
  iconWrapper: {
    width: 30,
  },
  smallIcon: {
    width: '100%',
  },
  largeIcon: {
    width: '100%',
  },
  climaAtual: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempo_tipo: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  maxMin: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  maxMinText: {
    fontSize: 16,
    color: 'white',
    marginHorizontal: 10,
  },
  hourlyForecastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hourBlock: {
    alignItems: 'center',
  },
  hourText: {
    fontSize: 18,
    color: 'white',
  },
  detailText: {
    fontSize: 18,
    color: 'white',
  },
});

export default App;
