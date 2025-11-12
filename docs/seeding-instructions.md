
# Firestore Data Seeding Instructions

This document explains how to populate your Firestore database with the `featured_universities.json` data.

## Method 1: Using the Firebase Console (Manual Upload)

This is the simplest method for a one-time import.

1.  **Navigate to your Firestore Database:**
    *   Open your Firebase project console.
    *   Go to the **Firestore Database** section from the left-hand navigation.

2.  **Start a new collection:**
    *   Click on **"+ Start collection"**.
    *   Enter `featured_universities` as the **Collection ID**. Click **Next**.

3.  **Add the first document (auto-ID):**
    *   Click **"Auto-ID"** for the Document ID. Firestore will generate a unique ID for you.
    *   Copy the content of the *first* university object from the `src/lib/featured-universities.json` file.
    *   Paste the fields and values into the Firestore UI. Make sure the data types are correct (e.g., `premium` is a boolean, `highlights` is an array).
    *   Click **Save**.

4.  **Import the rest of the data:**
    *   Unfortunately, the Firebase Console does not support bulk importing JSON files directly. To add the remaining 99 universities, you would need to either add them manually one by one (not recommended) or use a script.

> **Note:** Due to the limitations of the console, using a script is highly recommended for importing all 100 universities.

## Method 2: Using a Node.js script (Recommended for bulk import)

This method is more robust and suitable for importing the entire dataset.

### Prerequisites

*   You must have **Node.js** and **npm** installed on your local machine.
*   You need to have the **Firebase CLI** installed (`npm install -g firebase-tools`) and be logged in (`firebase login`).
*   You need to set up a Firebase Admin SDK service account for your project.

### Steps:

1.  **Generate a Service Account Key:**
    *   In your Firebase project console, go to **Project settings** (click the gear icon).
    *   Go to the **"Service accounts"** tab.
    *   Click **"Generate new private key"**. A JSON file will be downloaded. Rename this file to `serviceAccountKey.json` and move it to a secure location in your project's root directory (make sure to add `serviceAccountKey.json` to your `.gitignore` file to avoid committing it to source control).

2.  **Create an import script:**
    *   Create a new file in your project's root directory named `import-data.js`.
    *   Paste the following code into `import-data.js`:

    ```javascript
    const admin = require('firebase-admin');
    const serviceAccount = require('./serviceAccountKey.json');
    const universityData = require('./src/lib/featured-universities.json');

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    const db = admin.firestore();
    const collectionRef = db.collection('featured_universities');

    async function importData() {
      console.log('Starting data import...');

      const batch = db.batch();

      universityData.forEach((uni) => {
        // Use the 'id' from your JSON as the document ID in Firestore
        const docRef = collectionRef.doc(uni.id);
        batch.set(docRef, uni);
      });

      await batch.commit();
      console.log(`Successfully imported ${universityData.length} universities.`);
    }

    importData().catch(error => {
      console.error('Error importing data:', error);
    });
    ```

3.  **Install `firebase-admin`:**
    *   Open your terminal in the project's root directory and run:
        ```sh
        npm install firebase-admin
        ```

4.  **Run the import script:**
    *   In your terminal, run the script using Node.js:
        ```sh
        node import-data.js
        ```

    *   The script will connect to your Firestore database and upload all 100 university documents from `featured-universities.json` into the `featured_universities` collection.

---

## How to Update Tuition and Other Data Later

University data, especially tuition fees, changes over time.

*   **Manual Update:** For small changes, the easiest way is to find the specific university document in the Firestore console and edit the fields directly.
*   **Re-running the Script:** For bulk updates, you can modify the `featured-universities.json` file with the new information and re-run the import script. The `batch.set()` command will overwrite existing documents with the same ID, effectively updating them. Remember to update the `last_verified` date when you do.
