import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
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
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [iconUrl, setIconUrl] = useState(null);
  const [nuvens, setNuvens] = useState(null);
  const [direcaoVento, setDirecaoVento] = useState(null);
  const [tempMax, setTempMax] = useState(null);
  const [tempMin, setTempMin] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`)
          .then(response => {
            console.log(response.data);
            setCurrentTemperature(response.data.list[0].main.temp);
            setLocationName(response.data.city.name);
            setUmidade(response.data.list[0].main.humidity);
            setHPa(response.data.list[0].main.pressure);
            setVelocidadeVento(response.data.list[0].wind.speed);
            setNuvens(response.data.list[0].clouds.all);
            setDirecaoVento(response.data.list[0].wind.deg);
            setTempMax(response.data.list[0].main.temp_max);
            setTempMin(response.data.list[0].main.temp_min);

            setWeatherIcon(response.data.list[0].weather[0].icon);
            const newIconUrl = `https://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`;
            setIconUrl(newIconUrl);

            const hourlyData = response.data.list.slice(0, 4);
            setHourlyForecast(hourlyData);
          })
          .catch(error => {
            console.log(error);
          });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  const getIconName = (direction) => {
    if (direction >= 45 && direction < 135) {
      return 'arrow-down';
    } else if (direction >= 135 && direction < 225) {
      return 'arrow-left';
    } else if (direction >= 225 && direction < 315) {
      return 'arrow-up';
    } else {
      return 'arrow-right';
    }
  };

  return (
    <View style={styles.container}>
      {/* Menu no topo */}
      <View style={styles.menu}>
        <View style={styles.iconWrapper}>
          <FontAwesome name="map-marker" size={24} color="white" style={styles.smallIcon} />
        </View>
        <Text style={styles.locationText}>{locationName}</Text>
        <View style={styles.iconWrapper}>
          <FontAwesome name="bell" size={24} color="white" style={styles.largeIcon} />
        </View>
      </View>

      <View style={styles.header}>
        <Image
          style={{ width: 150, height: 100 }}
          source={{ uri: iconUrl }}
        />
        <Text style={styles.currentTemperature}>{currentTemperature ? `${Math.round(currentTemperature - 273.15)}°C` : 'Loading...'}</Text>
        <View style={styles.climaAtual}>
          <Text style={styles.tempo_tipo}>Precipitação</Text>
          <View style={styles.maxMin}>
            {/* <Text style={styles.maxMinText}><Entypo name="cloud" size={24} color="white" /> {nuvens}%</Text>
            <Text style={styles.maxMinText}><FontAwesome name={getIconName(direcaoVento)} size={24} color="white" /> {direcaoVento}°</Text>*/}
            <Text style={styles.maxMinText}>Max.: {tempMax ? `${Math.round(tempMax - 273.15)}°` : '...'}  Min.: {tempMin ? `${Math.round(tempMin - 273.15)}°` : '...'} </Text>
          </View>
        </View>
      </View>

      <View style={styles.weatherDetails2}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Entypo name="water" size={20} color="white" style={styles.icon} />
            <Text style={styles.detailText}> {umidade || '...'}%</Text>
          </View>
          <View style={styles.detailItem}>
            <FontAwesome name="compress" size={20} color="white" style={styles.icon} />
            <Text style={styles.detailText}> {hPa || '...'}hPA</Text>
          </View>
          <View style={styles.detailItem}>
            <Feather name="wind" size={20} color="white" style={styles.icon} />
            <Text style={styles.detailText}> {VelocidadeVento || '...'}m/s</Text>
          </View>
        </View>
      </View>

      <View style={styles.hourlyForecast}>
        <Text style={styles.forecastTitle}>Clima nas Próximas Horas</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {hourlyForecast.map((item, index) => (
            <View key={index} style={styles.hourBlock}>
              <Text style={styles.hourText}>{item.dt_txt.split(' ')[1].slice(0, -3)}</Text>
              <Text style={styles.detailText}>{`${Math.round(item.main.temp - 273.15)}°C`}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.dailyForecast}>
        <Text style={styles.forecastTitle}></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3250',
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
    justifyContent: 'space-evenly',
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    width: '90%',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
  },
  currentTemperature: {
    fontWeight: 'bold',
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
    width: '100%',
  },
  forecastTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
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
  },
  hourlyForecastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hourText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  hourlyForecast: {
    marginTop: 20,
  },
  hourBlock: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  detailText: {
    fontSize: 16,
    color: 'white',
  },

});

export default App;
