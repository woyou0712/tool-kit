export default function (str: string) {
  return new Promise((next, error) => {
    try {
      let input = document.createElement("input");
      document.body.appendChild(input)
      input.value = str;
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      next(true)
    } catch (e) {
      error(e)
    }
  })

}