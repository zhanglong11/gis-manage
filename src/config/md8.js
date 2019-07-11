export const addLock=(char)=>{
    let keyBoard='1qaz2wsx3edc4rfv5tgb6yhn7ujm8ik9ol0pQAZWSXEDCRFVTGBYHNUJMIKOLP~!@#$%^&*()-+[]{}:;,.<>?';
    let oldStr='';
    char.split('').map(u=>{
        if(keyBoard.indexOf(u)>9){
            oldStr+=`02${keyBoard.indexOf(u)}`
        }else{
            oldStr+=`010${keyBoard.indexOf(u)}`
        }
    })
    return oldStr
}

export const freeLock=(char)=>{
    let newUser='';
    let keyBoard='1qaz2wsx3edc4rfv5tgb6yhn7ujm8ik9ol0pQAZWSXEDCRFVTGBYHNUJMIKOLP~!@#$%^&*()-+[]{}:;,.<>?';
    for(let i =0;i<char.length;i+=4){
        let c=char.substr(i,4);
        if(c.substr(0,2)==='01'){
            newUser+=keyBoard.substr(char.substr(i+2,2).substr(1),1)
        }else if(c.substr(0,2)==='02'){
            newUser+=keyBoard.substr(char.substr(i+2,2).substr(0),1)
        }
    }
    return newUser
}