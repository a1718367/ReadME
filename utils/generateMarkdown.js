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
- [Contributors](#contributing)
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
<img src = "${email.avatar_url}" alt="Profile" width="100"/>

![coverage](https://img.shields.io/static/v1?label=hireable&message=${email.hireable}&color=<brightgreen>)
`;
}

module.exports = generateMarkdown;
