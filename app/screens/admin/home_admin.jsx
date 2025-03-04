import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import NavBar from '../../system_components/nav_bar'; // Adjust the path if NavBar is in a different folder

const HomeScreen = ({ navigation }) => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Use the NavBar component here */}
            <NavBar router={router} />

            <Text style={styles.title}>Welcome to Kids Church</Text>
            <Button title="Lessons" onPress={() => navigation.navigate('Nav1')} />
            <Button title="Games" onPress={() => navigation.navigate('Nav2')} />
            <Button title="Crafts" onPress={() => navigation.navigate('Nav3')} />
            <Button title="Songs" onPress={() => navigation.navigate('Nav4')} />
            <Button title="Dance" onPress={() => navigation.navigate('Nav5')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default HomeScreen;
