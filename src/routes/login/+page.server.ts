import jwt from 'jsonwebtoken';

import { realmConnector } from "../../realm";
import * as Realm from "realm-web";

const SECRET_KEY = 'mysecretkey';

import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  login: async ({request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    if (!email) {
			return fail(400, { email, missing: true });
		}
    if (realmConnector.currentUser) {
      return { success: true, email };
    }

    try {
      // use the Mongo Realm SDK to log in the user
      const credentials = Realm.Credentials.emailPassword(email, password);
      const user = await realmConnector.logIn(credentials);
      // create a JWT token using the user's ID as the payload
      const token = jwt.sign({ id: user.id }, SECRET_KEY);
      // return the JWT token to the client
      return { success: true, email };
    } catch (err) {
      console.error(err);
      return {error: 'Invalid email or password'};
    }
  },
  logout: async({request}) => {
    await realmConnector.currentUser?.logOut();
  }
};
