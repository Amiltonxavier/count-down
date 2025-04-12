import { Client, Databases, Models, Query } from "appwrite";
import { env } from "../env";

export interface ICycle extends Models.Document {
  id: string;
  minutesAmount: number;
  startDate: string;
  task: string;
  userId: string;
  finishedDate?: string;
  interruptedDate?: string;
}

//const client = new Client();
//client.setEndpoint("https://cloud.appwrite.io/v1");

const client = new Client()
  .setEndpoint(env.VITE_APP_APPWRITE_URL)
  .setProject("67ee92a6000a378fd6f5");
//.setSelfSigned(status: true);

const database = new Databases(client);

export const createNewTask = async ({
  id,
  minutesAmount,
  startDate,
  task,
  userId,
}: ICycle) => {
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

export const listDocuments = async (
  userId: string,
  page?: number
): Promise<ICycle[]> => {
  try {
    const response = await database.listDocuments(
      env.VITE_APP_DATABASE_ID,
      env.VITE_APP_COLLECTION_ID,
      [
        Query.equal("userId", userId),
        Query.limit(10),
        Query.orderDesc("$createdAt"),
        Query.offset(page ? page : 0),
      ]
    );
    return response.documents;
  } catch (err) {
    console.error("Erro ao listar documentos:", err);
    return [];
  }
};

export const updateDocument = async (data: Partial<ICycle>) => {
  const { id } = data;
  try {
    if (!id) {
      throw new Error("ID is required to update the document");
    }
    await database.updateDocument(
      env.VITE_APP_DATABASE_ID,
      env.VITE_APP_COLLECTION_ID,
      id,
      {
        minutesAmount: data.minutesAmount,
        startDate: data.startDate,
        task: data.task,
        userId: data.userId,
        finishedDate: data.finishedDate || undefined,
        interruptedDate: data.interruptedDate || undefined,
      }
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
