import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import WelcomeScreen from './WelcomeScreen';
import AsyncStorage from "@react-native-async-storage/async-storage"



const slides = [
  {
    key: 1,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, quisquam"
    // title: 'Title 1',
    // text: 'Description.\nSay something cool',
    // image: require('./assets/1.jpg'),
    // backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    description: "Page 2"
    // title: 'Title 1',
    // text: 'Description.\nSay something cool',
    // image: require('./assets/1.jpg'),
    // backgroundColor: '#59b2ab',
  },
  {
    key: 3,
    description: "Page 3"
    // title: 'Title 1',
    // text: 'Description.\nSay something cool',
    // image: require('./assets/1.jpg'),
    // backgroundColor: '#59b2ab',
  }
];

const _renderItem = ({ item }) => {
    return (
      // <View style={styles.slide}>
      //   <Text style={styles.title}>{item.title}</Text>
      //   <Image source={item.image} />
      //   <Text style={styles.text}>{item.text}</Text>
      // </View>
      <WelcomeScreen description={item.description} />
    );
  }
  
const Slider = ({ navigation }) => {

    const _onDone = async () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    // setShowApp(false)
    try {
        await AsyncStorage.setItem("firstTime", "false")
        navigation.navigate("Main")
    } catch (e) {
        //Handle error
    }
  }

    return (
       <AppIntroSlider renderItem={_renderItem} data={slides} onDone={_onDone}/>
    )
}

export default Slider;