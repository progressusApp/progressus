// const fs = require('fs');

const _ = require('lodash');
const randomWords = require('random-words');

export const data = [];

// const generateData = () => {
for (let i = 0; i < 100; i++) {
  const title = randomWords(2).join(' ');
  const content = randomWords(20).join(' ');
  data.push({ id: i, categoryID: 0, title: title, contentType: 'text', content: content });
}
// };
console.log(data);
