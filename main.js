"use strict"
const issueForm = document.getElementById('issue-form');
issueForm.addEventListener('submit', createIssue);

// Create a new ticket and dispaly it to the page
function createIssue(event) {
  event.preventDefault();
  const id = chance.guid();
  const desc = document.getElementById('issue-desc').value;
  const priority = document.getElementById('issue-priority').value;
  const worker = document.getElementById('issue-worker').value;
  const dateOfIssue = document.getElementById('date-of-issue').value;
  const requestorEmail = document.getElementById('issue-requestor').value;
  const status = 'Open';
  const newIssue = { id, desc, priority, worker, status, dateOfIssue,requestorEmail };
  // Initialize localStorage if empty
  if (localStorage.getItem('issues') === null) {
    const issues = [newIssue];
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const updatedIssues = [...issues, newIssue];
    console.log(updatedIssues);
    localStorage.setItem('issues', JSON.stringify(updatedIssues));
  }
  issueForm.reset();
  issueForm.querySelector('#issue-desc').focus();
  fetchIssues();
}

// Load past issues to the page
function fetchIssues() {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issues-list');
  issuesList.innerHTML = '';

  [...issues].forEach((issue) => {
    const newIssue = issueElement(issue);
    issuesList.innerHTML += newIssue;
  })
}

// Mark the ticke as closed
function closeIssue(id) {
  event.target.disabled = true;
  const issues = JSON.parse(localStorage.getItem('issues'));

  const updatedIssues = issues.map(issue => {
    if (issue.id === id) issue.status = 'Closed';
    return issue;
  })

  localStorage.setItem('issues', JSON.stringify(updatedIssues));
  fetchIssues();
}

// Remove the ticket from the webpage
function deleteIssue(id) {
  const issues = JSON.parse(localStorage.getItem('issues'));

  const updatedIssues = issues.filter(issue => issue.id !== id);
  localStorage.setItem('issues', JSON.stringify(updatedIssues));
  fetchIssues();
}

function getPriorityClass(priority) {
  let classList = 'badge ';
  if (priority === 'High') classList += 'badge-success';
  else if (priority === 'Medium') classList += 'badge-warning';
  else if (priority === 'Low') classList += 'badge-secondary';
  return classList;
}

function getStatusClass(status) {
  let classList = 'badge ';
  if (status === 'Open') classList += 'badge-info';
  else if (status === 'Closed') classList += 'badge-secondary';
  return classList;
}



// Format Issue - HTML element
const issueElement = (issue) => {
  const { id, desc, priority, worker, status, dateOfIssue,requestorEmail } = issue;
  return `
          <div class="rounded p-3 border bg-light mb-2">
            <h6>Issue ID: ${id}</h6>
            <h5 class="${getStatusClass(status)}">${status}</h5>
            <p class="${getPriorityClass(priority)}"><i class="fas fa-clock"></i> ${priority} Priority</p>
            <h3>${desc}</h3>
            <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
            </svg><i class="bi bi-envelope-fill"></i> Requestor: ${requestorEmail}</p>
            <p><i class="fas fa-address-card"></i> Assigned To: ${worker}</p>
            <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event-fill" viewBox="0 0 16 16">
            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"></path>
            </svg></i> Date of Issue: ${dateOfIssue}</p>
            <a href="#" onclick="closeIssue('${id}')" class="btn btn-warning">Close</a>
            <a href="#" onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>
          </div>`

}