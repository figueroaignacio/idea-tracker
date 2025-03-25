export async function generatePassword(length: number) {
  try {
    const response = await fetch(
      `http://localhost:3000/passwords/generate?length=${length}`
    );

    if (!response.ok) {
      throw new Error("Failed to generate password");
    }

    const data = await response.json();
    return data.password;
  } catch (error) {
    console.error(error);
    return "";
  }
}
