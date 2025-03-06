import { Client, Databases } from 'react-native-appwrite';
import { appwriteConfig } from '../../backend/db_appwrite';

// Initialize the client
const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);

const databases = new Databases(client);

export const updateDocument = async (documentId, updates) => {
    try {
        const updatedDocument = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.lessonsId,
            documentId,
            updates
        );
        return updatedDocument;
    } catch (error) {
        console.error('Error updating document:', error.message);
        throw new Error(`Document update failed: ${error.message}`);
    }
};

