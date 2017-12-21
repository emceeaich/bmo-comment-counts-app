/*
  Fetch the /bugs endpoint on the server and draw the list
*/

const buglist = document.querySelector('.buglist');

function updateBugList() {
  fetch('/bugs')
  .then(response => {
    if(response.ok) {
      response.json()
      .then(body => {
        // clean up 
        buglist.innerHTML = '';
        
        if(body.message) {
          buglist.insertAdjacentHTML('beforeend', `<li>${body.message}</li>`);
          setTimeout(updateBugList, 1000*60); // try again in a minute
        }
        else {
          body.bugs.forEach(bug => {
            buglist.insertAdjacentHTML('beforeend', `<li>
            <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=${bug.id}" target="_blank">${bug.id}</a>, 
            <em>${bug.summary},</em> 
            ${bug.product}::${bug.component},
            <strong>${bug.comments}</strong>
            </li>`)          
          });
        }
      })
    }
  });
}

updateBugList();