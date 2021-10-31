import React, { useRef, useEffect, useState } from "react"
import { Text, View, StyleSheet, StatusBar, TextInput, ScrollView, Button } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const styles = StyleSheet.create({
    center : {
        justifyContent: "center",
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
        flex: 1,
        width: "100%"  
    },
    titleText: {
        width: "100%",
        fontSize: 40,
        borderBottomWidth: 1,
        textAlign: "center",
        alignItems: "flex-start"
    },
    main: {
        flex: 9,
        justifyContent: "flex-start",
        // height: "auto",
        width: "100%"
    },
    input: {
        // height: "50%",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
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
    }

    
})

const Main = () => {

    const [phrase, setPhrase] = useState("")
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
            <View style={styles.title} >
                <Text style={[styles.center, styles.titleText]}>Word Counter</Text>
            </View>
            <View style={[styles.center, styles.main]} >
                <Text style={styles.instruction}>
                    Please type a sentence or phrase below to get started.  
                </Text>
                <View ref={inp} style={styles.input}>
                    <TextInput value={phrase} onChangeText={handleChange} onTouchStart={handlePress} editable={true} multiline numberOfLines={20} placeholder="Type or paste phrase" style={styles.textInput} />
                </View>
                <Button
                    
                    title='save'
                    onPress={save}
                />
                <Button 
                    title='show'
                    onPress={show}
                />
            </View>
        </ScrollView>
    )
}

export default Main