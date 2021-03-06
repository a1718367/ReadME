const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");
const markdown = require("./utils/generateMarkdown.js")

const writeFileAsunc = util.promisify(fs.writeFile);

const initquestion = [
{
    message: "Enter your GitHub username:",
    type: "input",
    name: "username",
    
},
{
    message: "Enter Repository name for Readme: ",
    type: "input",
    name: "gitreponame",
    
},
];

const rmquestion = [
    {
        message: "Title for the Project :",
        type: "input",
        name: "title",
    },
    {
        message: "Description for the Repository:",
        type: "input",
        name: "desc",
    },
    {
        message: "Infomation on Installation :",
        type: "input",
        name: "install",
    },
    {
        message: "What is the purpose of the Project? :",
        type: "input",
        name: "usage",
    },
    {
        message: "License infomation :",
        type: "input",
        name: "license",
    },
    {
        message: "Contributing party's Information :",
        type: "input",
        name: "contribution",
    },
    {
        message: "Testing Information :",
        type: "input",
        name: "test",
    },
    {
        message: "Link to Project :",
        type: "input",
        name: "url",
    }
]

function gituserinput(){
    return inquirer.prompt(initquestion);
}
function rmquserinput(){
    return inquirer.prompt(rmquestion);

}

function checkgit(ans){
    const gituser = ans.username;
    const gitrepo = ans.gitreponame;
    const queryUrl = `https://api.github.com/users/${gituser}/repos?per_page=100`;
    const emailUrl = `https://api.github.com/users/${gituser}`;
    if (gituser == "" ){
        console.log("Username Needed.");
    }else if(gitrepo == ""){
        console.log("Repository Name Needed.")
    }else{
        axios.all([
            axios.get(queryUrl),
            axios.get(emailUrl)])
            .then((resArr)=>{
            const reponame = resArr[0].data.map(function(repo){return repo.name;});
            const lcreponame = reponame.map(function(lc){return lc.toLowerCase();})
            let g = lcreponame.indexOf(gitrepo);
            const email = resArr[1].data;
        if(reponame == ""){console.log("Invalid Github Name.")}
        else if(g==-1){console.log("Repository Not in your Github.")}
        else{rmquserinput()
            .then((res)=>{
            const rmans = res;
            console.log(rmans);
            const readme = markdown(rmans, email);
            writeFileAsunc("ReadMe.md", readme).then(function(){
                console.log("Successfully Generated ReadMe.md file")
            })

            
        });}
        })
    }
}


async function init(){
try {
    const iniask = await gituserinput();
    checkgit(iniask);
    
    
} catch (error) {
    console.log(error)
}
}

init();
