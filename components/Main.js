import React, { useRef, useEffect, useState } from "react"
import { Text, View, StyleSheet, StatusBar, TextInput, ScrollView, Pressable } from "react-native"
import Tts from 'react-native-tts';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from "@react-native-async-storage/async-storage"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { countWords } from './helpers'

const saveIcon = <FontAwesome5 name={'save'} size={15} style={{marginRight: 10}} color="#fff" />;
const readIcon = <FontAwesome5 name={'play'} size={15} style={{marginRight: 10}} color="#fff" />;
const lightModeIcon = <FontAwesome5 name={'sun'} size={25} color="#000" solid/>;
const darkModeIcon = <FontAwesome5 name={'moon'} size={25} color="#BBBBBB" solid/>;

const styles = StyleSheet.create({
    center : {
        justifyContent: "flex-start",
        alignItems: "center",
    },
    pad: {
        paddingTop: 12,
        paddingHorizontal: 20
    },
    darkBG: {
        backgroundColor: "#0A043C"
    },
    darkFont: {
        color: "#BBBBBB",
    },
    lightFont: {
        color: "#000000",
    },
    darkTextInput: {
        borderColor: "#bbbbbb"
    },
    darkTitleContainer: {
        borderBottomColor: "#fff"
    },
    container: {
        flex: 1,
        backgroundColor: "#FFE3D8",    
    },
    title: {
        // flex: 1,
        width: "100%",
        // marginBottom: 12 
    },
    titleContainer: {
        width: "100%",
        // fontSize: 40,
        borderBottomWidth: 1,
        // textAlign: "center",
        // alignItems: "flex-start"
    },
    titleText: {
        textAlign: "center",
        fontSize: 35,
        flex: 5
    },
    main: {
        // flex: 3,
        // justifyContent: "flex-start",        
        // height: "auto",
        width: "100%",
    },
    input: {
        // height: "50%",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        maxHeight: 300,
        // marginBottom: 12
    },
    textInput: {
        textAlignVertical: 'top',
        width: "100%",
        // height: "100%",
    },
    instruction: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10
    },
    margB: {
        marginBottom: 12
    },
    saveParent: {
        // flexDirection: "row",
        justifyContent: "space-between"
    },
    wid100: {
        width: "100%"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 62,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#03506F',
    },
        text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    modeIcon: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end"
    }
    
})

const Main = () => {

    const [phrase, setPhrase] = useState("")
    const [ Words, setWords ] = useState(0)
    const [ theme, setTheme ] = useState("light")
    const inp = useRef(null)

    const handlePress = () => {
        inp.current.focus()
    }

    const handleChange = (text) => {
        // alert(text)
        // storeStr(text)
        setPhrase(text)
        // alert(countWords(text))
        const words = countWords(text)
        setWords(words)
    }

    const storeStr = async (str) => {
        try {
           await AsyncStorage.setItem("phrase", str) 
        } catch (error) {
           alert(error) 
        }
    }

    const getStoreStr = async () => {
        try {
            const phrase = await AsyncStorage.getItem("phrase")
            if (phrase  !== null) {
                setPhrase(phrase)
            }
            } catch (e) {
            //Handle Error
        }
    }

    const save = async () => {
        await storeStr(phrase)
        alert("saved")
    }

    const read = async () => {
        await getStoreStr()
        Tts.getInitStatus().then(() => {
            Tts.speak(phrase);
        });
    }

    const handleTheme = () => {
        // alert("toggled")
        setTheme(prev => prev == "dark" ? "light" : "dark")
    }

    useEffect(() => {
        getStoreStr()
    },[])
    
    return(
        <ScrollView contentContainerStyle={[styles.center, styles.pad, styles.container, theme == "dark" && styles.darkBG]}>
            <StatusBar hidden={true} backgroundColor="#4B3869" />
            <View style={[styles.margB, styles.title]} >
                <View style={[styles.titleContainer, styles.wid100, theme == "dark" && styles.darkTitleContainer, {flexDirection: "row", }]}>
                    <Text style={{flex: 1}}></Text>
                    <Text style={[styles.titleText,  theme == "dark" && styles.darkFont]}>Word Counter</Text>
                    <View style={styles.modeIcon}>
                        <Pressable onPress={handleTheme} >
                            {theme == "dark" ? darkModeIcon : lightModeIcon}
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={[styles.center, styles.main]} >
                <Text style={[styles.instruction, theme == "dark" && styles.darkFont]}>
                    Please type a sentence or phrase below to get started.  
                </Text>
                <View ref={inp} style={[styles.margB, styles.input,  theme == "dark" && styles.darkTextInput]}>
                    <TextInput value={phrase} onChangeText={handleChange} onTouchStart={handlePress} editable={true} multiline numberOfLines={20} placeholder="Type or paste phrase" placeholderTextColor={theme == "dark" ? `#bbbbbb` : "#000000"} style={[styles.textInput, theme == "dark" ? styles.darkFont : styles.lightFont]} />
                </View>
                <View style={[styles.margB, styles.wid100]}>
                    <Text style={[{fontSize: 30}, theme == "dark" && styles.darkFont]} >Count: {Words}</Text>
                </View>
            </View>
            <View style={{width: "100%"}}>
                <View style={styles.saveParent}>
                <Animatable.View 
                    animation="bounceInLeft" 
                    delay={100}
                    >
                    <Pressable style={[styles.margB, styles.button]} onPress={save}>
                        <View style={{flexDirection: "row"}}>
                            {saveIcon}
                            <Text style={styles.text} >
                                Save
                            </Text>
                        </View>
                    </Pressable>
                </Animatable.View>
                <Animatable.View 
                    animation="bounceInRight"
                    delay={500}
                    >
                    <Pressable style={styles.button} onPress={read}>
                        <View style={{flexDirection: "row"}} >
                            {readIcon}
                            <Text style={styles.text}>
                                Read
                            </Text>
                        </View>
                    </Pressable>
                </Animatable.View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Main