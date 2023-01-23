import { fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types';
import bcrypt from 'bcrypt'

import { db } from '$lib/database'

// using an enum for user roles to avoid typos
// if you're not using TypeScript use an object
enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const load = (async ({ params }) => {
  return {

  };
}) satisfies PageServerLoad;

/** @type {import('./$types').Actions} */

export const actions = {
  register: async ({ request }) => {
    const data = await request.formData()
    const username = data.get('username')
    const email = data.get('email')
    const password = data.get('password')
  
    if (
      typeof username !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !username ||
      !email ||
      !password
    ) {
      return fail(400, { invalid: true })
    }
  
    const user = await db.user.findUnique({
      where: { username },
    })
  
    if (user) {
      return fail(400, { user: true })
    }
  
    await db.user.create({
      data: {
        username,
        email,
        passwordHash: await bcrypt.hash(password, 10),
        userAuthToken: crypto.randomUUID(),
        role: { connect: { name: Roles.USER } },
      },
    })
  
    throw redirect(303, '/login')
  }
}

