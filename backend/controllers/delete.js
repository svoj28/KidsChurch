import { Client, Databases } from 'react-native-appwrite';
import { appwriteConfig } from '../../backend/db_appwrite';

// Initialize the Appwrite client
const client = new Client()
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID

const databases = new Databases(client);

export const deleteLesson = async (lessonId) => {
    try {
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.lessonsId,
            lessonId
        );
        return { success: true, message: 'Task deleted successfully' };
    } catch (error) {
        console.error('Error deleting task:', error.message);
        throw new Error(`Task deletion failed: ${error.message}`);
    }
};