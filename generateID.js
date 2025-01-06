export const generateRandomString = () => {
    // Generate two random uppercase characters
    const letters = String.fromCharCode(
      Math.floor(Math.random() * 26) + 65,
      Math.floor(Math.random() * 26) + 65
    );
  
    // Generate a random 4-digit number
    const digits = Math.floor(1000 + Math.random() * 9000).toString();
  
    // Combine them together
    const randomString = letters + digits;
  
    return randomString;
  }

  