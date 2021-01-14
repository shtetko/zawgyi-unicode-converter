/* reguster service worker */
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js")
            .then((registration) => {
                console.log(`Registration successfully with scope: ${ registration.scope }`);
            }, (error) => {
                console.log(`Regustration failed: ${ error }`);
            })
    });
}

const unicodeText = document.getElementById("unicode-text");
const zawgyiText = document.getElementById("zawgyi-text");

const converterActiveMode = evt => {
  let mode = evt.target.name;
  let text = evt.target.value;
  
  switch (mode) {
    case "unicode-text":
      zawgyiText.value = Rabbit.uni2zg(text);
      break;
      
    case "zawgyi-text":
      unicodeText.value = Rabbit.zg2uni(text);
      break;
  }
}

const onCopyBtnClicked = btnName => {
  switch (btnName) {
    case "unicode":
      copy(unicodeText);
      break;
      
    case "zawgyi":
      copy(zawgyiText);
      break;
  }
}

const onCutBtnClicked = btnName => {
  switch(btnName) {
    case "unicode":
      cut(unicodeText);
      break;
  
    case "zawgyi":
      cut(zawgyiText);
      break;
  }
}

const onClearBtnClicked = btnName => {
  switch(btnName) {
    case "unicode":
      unicodeText.value = "";
      break;
      
    case "zawgyi":
      zawgyiText.value = "";
      break;
  }
}

const copy = text => {
  text.select();
  text.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

const cut = text => {
  text.select();
  text.setSelectionRange(0, 99999);
  document.execCommand("cut");
}

unicodeText.addEventListener("keyup", converterActiveMode, false);
unicodeText.addEventListener("blur", converterActiveMode, false);
zawgyiText.addEventListener("keyup", converterActiveMode, false);
zawgyiText.addEventListener("blur", converterActiveMode, false);

