import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import NavBar from '../../system_components/nav_bar'; 
import { useRouter } from 'expo-router';

const SettingsAdmin = () => {
    const router = useRouter();
    
    const handleEditProfile = () => {
        // Handle edit profile action
    };

    const handleLogout = async () => {
        await logout();
        router.push("screens/auth/signin_page");
    };

    return (
        <View style={styles.container}>
            <NavBar router={router} />
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: 'https://example.com/avatar.jpg' }}
                    style={styles.avatar}
                />
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.email}>john.doe@example.com</Text>
            </View>
            <Button title="Edit Profile" onPress={handleEditProfile} />
            <View style={styles.logoutContainer}>
                <Button title="Logout" onPress={handleLogout} color="red" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 16,
        color: 'gray',
    },
    logoutContainer: {
        marginBottom: 20,
    },
});

export default SettingsAdmin;