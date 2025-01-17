import { sql } from './connect';

export type User = {
  id: number;
  username: string;
  passwordHash: string;
  first_name: string;
  last_name: string;
  email_address: string;
};

export async function getUserByUsername(username: string) {
  if (!username) return undefined;

  const [user] = await sql<{ id: number; username: string }[]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      users.username = ${username}
  `;

  return user;
}

export async function getUserWithPasswordHashByUsername(username: string) {
  if (!username) return undefined;

  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      users.username = ${username}
  `;

  return user;
}

// export async function getUserBySessionToken(token: string) {
//   if (!token) return undefined;

//   const [user] = await sql<{ id: number; username: string }[]>`
//     SELECT
//       users.id,
//       users.username
//     FROM
//       users
//     INNER JOIN
//       sessions ON (
//         sessions.token = ${token} AND
//         sessions.user_id = users.id AND
//         sessions.expiry_timestamp > now()
//       )
//   `;

//   return user;
// }

export async function createUser(username: string, password_hash: string) {
  const [userWithoutPassword] = await sql<{ id: number; username: string }[]>`
    INSERT INTO users
      (username, password_hash)
    VALUES
      (${username}, ${password_hash})
    RETURNING
      id,
      username
  `;

  return userWithoutPassword!;
}
