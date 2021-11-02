import React, { useRef, useEffect, useState } from "react"
import { Text, View, StyleSheet, StatusBar, TextInput, ScrollView, Button, Pressable } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const saveIcon = <FontAwesome5 name={'save'} size={15} style={{marginRight: 10}} color="#fff" />;
const readIcon = <FontAwesome5 name={'play'} size={15} style={{marginRight: 10}} color="#fff" />;
const lightModeIcon = <FontAwesome5 name={'sun'} size={25} color="#000" solid/>;
// const darkModeIcon = <FontAwesome5 name={'moon'} size={25} color="#000" solid/>;

const styles = StyleSheet.create({
    center : {
        justifyContent: "flex-start",
        alignItems: "center",
    },
    pad: {
        padding: 12
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
        // marginBottom: 12
    },
    textInput: {
        textAlignVertical: 'top',
        // width: "100%",
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
        paddingVertical: 12,
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
    const [ Words, setWords ] = useState(20)
    const inp = useRef(null)

    const handlePress = () => {
        inp.current.focus()
    }

    const handleChange = (text) => {
        // alert(text)
        // storeStr(text)
        setPhrase(text)
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

    const show = async () => {
        await getStoreStr()
        alert(phrase)
    }

    useEffect(() => {
        getStoreStr()
    },[])
    
    return(
        <ScrollView contentContainerStyle={[styles.center, styles.pad, styles.container]}>
            <StatusBar hidden={true} backgroundColor="#4B3869" />
            <View style={[styles.margB, styles.title]} >
                <View style={[styles.titleContainer, styles.wid100, {flexDirection: "row", }]}>
                    <Text style={{flex: 1}}></Text>
                    <Text style={styles.titleText}>Word Counter</Text>
                    <View style={styles.modeIcon}>
                        {lightModeIcon}
                    </View>
                </View>
            </View>
            <View style={[styles.center, styles.main]} >
                <Text style={styles.instruction}>
                    Please type a sentence or phrase below to get started.  
                </Text>
                <View ref={inp} style={[styles.margB, styles.input]}>
                    <TextInput value={phrase} onChangeText={handleChange} onTouchStart={handlePress} editable={true} multiline numberOfLines={20} placeholder="Type or paste phrase" style={styles.textInput} />
                </View>
                <View style={[styles.margB, styles.wid100]}>
                    <Text style={{fontSize: 30}} >Count: {Words}</Text>
                </View>
            </View>
            <View style={{width: "100%"}}>
                <View style={styles.saveParent}>

                <Pressable style={[styles.margB, styles.button]} onPress={save}>
                    <View style={{flexDirection: "row"}}>
                        {saveIcon}
                        <Text style={styles.text} >
                            Save
                        </Text>
                    </View>
                </Pressable>
                <Pressable style={styles.button} onPress={show}>
                    <View style={{flexDirection: "row"}} >
                        {readIcon}
                        <Text style={styles.text}>
                            Show
                        </Text>
                    </View>
                </Pressable>
                {/* <Button
                    
                    title='save'
                    onPress={save}
                />
                <Button 
                    title='show'
                    onPress={show}
                /> */}
                </View>
            </View>
        </ScrollView>
    )
}

export default Main