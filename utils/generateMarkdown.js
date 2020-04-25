function generateMarkdown(data,email) {
  return `
## Title: 
${data.title}

## Description:
${data.desc}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contritors](#contribution)
- [Testing](#test)

## Installation
${data.install}
## Usage
${data.usage}
## License
${data.license}
## Contributing
${data.contribution}
## Tests
${data.test}

## Contacts
### Author: ${email.name}
### Email: ${email.email}
<img scr = ${email.avatar_url} alt="Profile">
`;
}

module.exports = generateMarkdown;
