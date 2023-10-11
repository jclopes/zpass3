
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("genbutton").click();
    }
});

function clipboardCopy() {
    // NOTE: Copy/past code needs to be inside the same function that was
    // triggered by a user action. Otherwise mobile devices wont do the
    // clipboard action.
    // make password text selected for copy/past
    var range = document.createRange();
    var out = document.getElementById('outinput');
    range.selectNodeContents(out);
    var s = window.getSelection();
    s.removeAllRanges();
    s.addRange(range);
    out.select();
    document.execCommand('copy');
}

async function genPass() {
    infoSet("... Processing ...");
    var keyword = document.getElementById('keyword').value;
    var uri = document.getElementById('uri').value;
    var out = document.getElementById('outinput');
    let promise = new Promise(function(resolve) {
        /* The promise and the setTimeout are required to allow the browser
           to render one last time before we block on zpass3() call. */
        setTimeout(function() {
            var genPass = zpass3(keyword, uri);
            infoSet("Ready");
            resolve(genPass);
        }, 0);
    });
    out.className = "inv";
    out.value = await promise;
    clipboardCopy();
}

function infoClear() {
    info = document.getElementById('info');
    info.innerHTML="&nbsp;"
}

function infoSet(message) {
    info = document.getElementById('info');
    info.innerHTML=message;
}

function showPass()
{
    var elem = document.getElementById('out');
    elem.className = "vis";
    elem.select();
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('genbutton')
        .addEventListener('click', genPass);
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('showbutton')
        .addEventListener('click', showPass);
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('copybutton')
        .addEventListener('click', clipboardCopy);
});

// Missing the infoSet: infoSet('Copied!');">


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('outinput')
        .addEventListener('focusout', infoClear);
});