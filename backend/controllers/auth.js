import { Client, Account, ID } from 'react-native-appwrite';
import {appwriteConfig} from '../../backend/db_appwrite'

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);

export const createUser = async (email, password, name) => {
    try {
        const response = await account.create(ID.unique(), email, password, name);
        console.log('User created successfully:', response);
        return response;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export function signInUser(email, password) {
    return new Promise((resolve, reject) => {
        account.createEmailPasswordSession(email, password)
            .then(function(response) {
                resolve(response); 
            })
            .catch(function(error) {
                console.error("Sign-in failed:", error.message); 
                reject(new Error(`Sign-in failed: ${error.message}. Please check your credentials.`)); // Reject with the error message
            });
    });
}

export const logout = async () => {
    try {
        const sessions = await account.listSessions();
        
        if (sessions.sessions.length > 0) {
            await account.deleteSession('current');
            console.log('Logout successful');
            return { success: true, message: 'Logout successful' };
        } else {
            console.log('No active session to log out');
            return { success: false, message: 'No active session found' }; 
        }
    } catch (error) {
        console.error('Logout failed:', error.message);
        return { success: false, message: error.message };
    }
};

export const getCurrentUser = async () => {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        throw new Error('Failed to fetch current user');
    }
};