module.exports = function (str) {
  return new Promise((next, error) => {
    let input = document.createElement("input");
    try {
      document.body.appendChild(input)
      input.value = str;
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      next("ε€εΆζε")
    } catch (e) {
      error(e);
    }
  })
}