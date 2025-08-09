"use server";

import { cookies } from "next/headers";

export default async function Logout() {
  cookies().delete("connect.sid");
}
