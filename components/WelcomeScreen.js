import React from "react"
import { StyleSheet, View, Text } from "react-native"

const WelcomeScreen = ({ description }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#664E88",
            padding: 20,
            justifyContent: "center",
            alignItems: "center"
        },
        subHeader: {
            color: "#fff",
            fontSize: 40,
            paddingBottom: 10
        },
        description: {
            color: "#fff",
            fontSize: 20,
            textAlign: "center"
        }
    });

    return (
        <View style={styles.container} >
            <Text style={styles.subHeader}>
                Word Counter
            </Text>
            <Text style={styles.description}>
                { description }
            </Text>
        </View>
    )
}

export default WelcomeScreen