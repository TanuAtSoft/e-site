const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function getRandomIndex(length) {
    return Math.floor(Math.random() * length);
  }

  function generateRandomString(length) {
    let randomString = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = getRandomIndex(charactersLength);
      randomString += characters[randomIndex];
    }

    return randomString;
  }
  export {generateRandomString};