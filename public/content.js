// Listen for key events on the webpage
var i=0;
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
      console.log('Up Arrow Pressed on Page!');
      // Send message to background script
    chrome.storage.local.get('myDataKey', (result) => {
        if (result.myDataKey) {
            if(i>0){
                i--;
            }
        console.log(document.getElementById('custom-message').value=result.myDataKey[i].note)
         console.log(result.myDataKey[i].note)
        } else { console.log("No data found in chrome.storage");
        }
      });
     
      let s = JSON.parse(localStorage.getItem('myTemp'))
      console.log(s)
    }
    
    if (event.key === 'ArrowDown') {
      console.log('Down Arrow Pressed on Page!');
      // Send message to background script
      chrome.runtime.sendMessage({ type: 'arrowDownPressed' });
      chrome.storage.local.get('myDataKey', (result) => {
        if (result.myDataKey) {
            if(i<result.myDataKey.length){
                i++;
            }
            console.log(document.getElementById('custom-message').value=result.myDataKey[i].note)
         console.log(result.myDataKey[i].note)  
        } else { console.log("No data found in chrome.storage");
        }
        
      });
    }
  });
  