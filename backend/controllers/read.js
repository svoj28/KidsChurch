import { Client, Databases } from 'react-native-appwrite';
import { appwriteConfig } from '../../backend/db_appwrite';

const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);

const databases = new Databases(client);

export const getLessons = async () => {
    try {
        const response = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.lessonsId
        );
        console.log('Response from Appwrite:', response); // Debug log
        return response.documents;
    } catch (error) {
        console.error('Error fetching lessons:', error); // Debug log
        throw error;
    }
};

export const getLessonsById = async (lessonId) => {
    try {
        const lesson = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.lessonsId,
            lessonId
        );
        return lesson;
    } catch (error) {
        console.error('Error fetching task:', error.message);
        throw new Error(`Fetching task failed: ${error.message}`);
    }
};