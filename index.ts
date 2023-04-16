const form: HTMLFormElement = document.querySelector('#defineform')!;
const list: HTMLUListElement = document.querySelector('.list-unstyled')!;
const header: HTMLHeadingElement = document.querySelector('h1')!;

form.onsubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData(form); // forma data from form
  const text = formData.get('defineword') as string; // get the word user input

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`);
    const data = await response.json();

    header.innerText = text;

    list.innerHTML = '';
    data[0].meanings.forEach((meaning: any) => {
      const li = document.createElement('li');
      li.innerText = `${meaning.partOfSpeech} - ${meaning.definitions[0].definition}`;
      list.appendChild(li);
    });
  } catch (error) {
    console.log(error);
  }
};