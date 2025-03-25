export async function generatePassword(length: number) {
  try {
    const response = await fetch(
      "http://localhost:3000/api/passwords/generate",
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Error generating the password");
    }

    const data = await response.json();
    return data.password;
  } catch (error) {
    throw new Error("Error generating the password");
  }
}
