const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");

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
        message: "Enter your GitHub username:",
        type: "input",
        name: "username",
    }
]

function userinput(){
    return inquirer.prompt(initquestion);
}

function checkgit(ans){
    const gituser = ans.username;
    const gitrepo = ans.gitreponame;
    const queryUrl = `https://api.github.com/users/${gituser}`;
    try {
        if (gituser == "") throw "Username Needed";
        else if (gitrepo == "") throw "Repository Name Needed";
        else{
            axios.get(queryUrl).then((res)=>{
                console.log(res.data.name);
                // const reponame = res.data.map(function(repo){return repo.name;});
                // const lcreponame = reponame.map(function(lc){return lc.toLowerCase();})
                // let g = lcreponame.indexOf(gitrepo);
                // try {
                //     if(reponame == "") throw "Invalid Github Name";
                //     if(g == -1) throw "Repository Not on GitHhub, Create New Repo";
                // } catch (err) {
                //     console.log(err);
                // }
                // console.log(lcreponame)    
            })  
        }

    } catch (error) {
        console.log(error)
    }

}


function writeToFile(fileName, data) {
}



async function init(){
    try{
        const ask = await userinput();
        checkgit(ask)

    }
    catch(err){
        console.log(err)
    }
    
}

init();




//###### Redundant ######//

// function init() {
//     inquirer.prompt(questions)
//     .then(function({username}){
//         const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

//      axios.get(queryUrl).then((res)=>{
//          const reponame = res.data.map(function(repo){return repo.name;});
//          console.log(reponame);
//      })   
//     })

// }

// return inquirer.prompt(questions)
// .then(function(response){
//     const gituser = response.username;
//     const gitrepo = response.gitreponame;
//     const queryUrl = `https://api.github.com/users/${gituser}/repos?per_page=100`;
//     console.log(gituser,gitrepo);



// })

    // const queryUrl = `https://api.github.com/users/${gituser}/repos?per_page=100`;
    // console.log(gituser,gitrepo);
    // const lc = gitrepo.toLowerCase();
    // console.log(lc);
    // axios.get(queryUrl).then((res)=>{
    // const reponame = res.data.map(function(repo){return repo.name;});
    // let g = reponame.indexOf(gitrepo);
    // if(g == -1){(console.log("Repository Not on GitHhub, Create New Repo"))}
    // })