let arrColor = ["blue", "black", "white", "green","yellow", "red"];

let ul = document.createElement("ul");

for (let i = 0; i <arrColor.length; i++){
    let li = document.createElement("li");
    li.innerText = arrColor[i];
    li.style.color = arrColor[i];
    ul.appendChild(li);
}

document.body.appendChild(ul);