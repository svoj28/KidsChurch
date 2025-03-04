import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, Settings } from 'lucide-react-native';

const NavBar = ({ router }) => {
    return (
        <View style={styles.navBar}>
            <TouchableOpacity style={styles.navItem} onPress={() => router.push("screens/admin/home_admin")}>
                <Home size={24} color="#007bff" />
                <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => router.push("screens/admin/settings_admin")}>
                <Settings size={24} color="#007bff" />
                <Text style={styles.navText}>Settings</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    navItem: {
        alignItems: 'center',
        paddingVertical: 5,
    },
    navText: {
        fontSize: 14,
        color: '#007bff',
        marginTop: 2,
    },
});

export default NavBar;
