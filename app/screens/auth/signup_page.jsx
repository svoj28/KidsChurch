import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { createUser } from '../../../backend/controllers/auth';

const SignupPage = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const response = await createUser(email, password, username);
            console.log('User created successfully:', response);
            // Navigate to the next screen or perform any other actions on successful sign-up
            navigation.navigate('Home'); // Example navigation
        } catch (error) {
            console.error('Error creating user:', error);
            Alert.alert('Sign Up Failed', 'Please check your details and try again.');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Sign Up</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10 }}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10 }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10 }}
            />
            <Button title="Sign Up" onPress={handleSignup} />
        </View>
    );
};

export default SignupPage;