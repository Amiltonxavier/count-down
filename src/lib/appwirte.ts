import { Client, Databases, ID } from "appwrite";
import { env } from "../env";
import type { ICycle } from "../interfaces";

//const client = new Client();
//client.setEndpoint("https://cloud.appwrite.io/v1");

const client = new Client()
  .setEndpoint(env.VITE_APP_APPWRITE_URL)
  .setProject("67ee92a6000a378fd6f5");
//.setSelfSigned(status: true);

const database = new Databases(client);

export const createNewTask = async (data: ICycle) => {
  const { id, minutesAmount, startDate, task, userId } = data;
  try {
    await database.createDocument(
      env.VITE_APP_DATABASE_ID,
      env.VITE_APP_COLLECTION_ID,
      id,
      { minutesAmount, startDate, task, userId }
    );
  } catch (err) {
    console.log(err);
  }
};

export const listDocuments = async () => {
  try {
    const response = await database.listDocuments(
      env.VITE_APP_DATABASE_ID,
      env.VITE_APP_COLLECTION_ID
    );
    return response.documents;
  } catch (err) {
    console.error("Erro ao listar documentos:", err);
    return [];
  }
};

export const updateDocument = async (
  documentId: string,
  data: Partial<ICycle>
) => {
  try {
    await database.updateDocument(
      env.VITE_APP_DATABASE_ID,
      env.VITE_APP_COLLECTION_ID,
      documentId,
      data
    );
  } catch (err) {
    console.error("Erro ao atualizar documento:", err);
  }
};

/* export const updateTask = async(data: {Task, }) => {
    try {
        await database.updateDocument(
            env.VITE_APP_DATABASE_ID,
            env.VITE_APP_COLLECTION_ID,
        )
    }catch(){

    }
} */
