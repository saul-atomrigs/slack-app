import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import moment from 'moment'

export default function DateSeparator({ message }) {
    return (
        <View style={styles.container}>
            <Text style={styles.date}>{moment(message.date).calendar()}</Text>
            <View style={styles.line} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginBottom: 10,
        marginTop: 10,
    },
    date: {
        fontWeight: 'bold',
        paddingBottom: 5,
        fontSize: 12,
    },
    line: {
        flex: 1,
        height: 0.5,
        backgroundColor: '#E8E8E8',
    },
})
