chrome.storage.local.set({
  "current": "1",
  "1": "", "2": "", "3": "", "4": "", "5": "", "6": "", "7": "", "8": ""
});

function processCommands(command) {
  console.log(`Command: ${command}`);
  switch (command) {
    case "copy":
      chrome.tabs.executeScript({
        code: "window.getSelection().toString().replace(/\>/ig, '&#62;').replace(/\</ig, '&#60;')"
      }, function(selection) {
        chrome.storage.local.get(["current"], function(current) {
          chrome.storage.local.set({[current.current]: selection[0].toString()});
        });
      });
      break;
    case "paste":
      chrome.storage.local.get(["current"], function(current) {
        chrome.storage.local.get([current.current], function(val) {
          chrome.tabs.executeScript({
            code: `
function insertAtCursor(field, text) {
  var cursorPos = field.selectionStart;
  if (document.selection) {
    field.focus();
    document.selection.createRange().text = text;
  }
  else if (field.selectionStart || field.selectionStart == '0') {
    var startPos = field.selectionStart;
    var endPos = field.selectionEnd;
    field.value = field.value.substring(0, startPos) + text + field.value.substring(endPos, field.value.length);
  }
  else {
    field.value += text;
  }
  field.selectionEnd = cursorPos + text.length;
}
insertAtCursor(document.activeElement, ` + JSON.stringify(val[current.current]).replace(/&#62;/ig, ">").replace(/&#60;/ig, "<") + `);`
          });
        });
      });
      break;
    case "slot_one":
      chrome.storage.local.set({["current"]: "1"});
      break;
    case "slot_two":
      chrome.storage.local.set({["current"]: "2"});
      break;
    default:
      break;
  }
}

chrome.commands.onCommand.addListener(function(command) {
  processCommands(command);
});
