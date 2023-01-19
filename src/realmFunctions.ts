import { realmConnector } from "./realm";
import * as Realm from "realm-web";
  
export async function createUser(email: string, password: string) {
  try {
    const user = await realmConnector.emailPasswordAuth.registerUser({ email, password });
    return user;
  } catch (err: any) {
    console.log("Failed to log in", err.message);
    return err;
  }
}

export async function logIn(email: string, password: string) {
  try {
    const user = await realmConnector.logIn(Realm.Credentials.emailPassword(email, password));
    console.log("Successfully logged in!", user.id);
    
    return user;
  } catch (err: any) {
    console.error("Failed to log in", err.message);
  }
}