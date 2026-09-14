// Create the footer and display the current year
const body = document.querySelector('body');
const footer = document.createElement('footer');

body.append(footer);

const today = new Date();
const thisYear = today.getFullYear();

const copyright = document.createElement('p');
copyright.innerHTML = `&copy; Shaunna Currie ${thisYear}`;

footer.append(copyright);

// Add skills to the Skills section
const skills = ['HTML', 'CSS', 'JavaScript', 'Git', 'GitHub'];

const skillsSection = document.getElementById('Skills');
const skillsList = skillsSection.querySelector('ul');

for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement('li');
  skill.innerText = skills[i];
  skillsList.appendChild(skill);
}


// Handle the Leave a Message form
const messageForm = document.querySelector('form[name="leave_message"]');

messageForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const userName = event.target.usersName.value;
  const userEmail = event.target.usersEmail.value;
  const userMessage = event.target.usersMessage.value;

  console.log(userName, userEmail, userMessage);

  const messageSection = document.getElementById('messages');
  const messageList = messageSection.querySelector('ul');
 

  const newMessage = document.createElement('li');

newMessage.innerHTML = `
    <a href="mailto:${userEmail}">${userName}</a>
    <span>${userMessage}</span>
`;
  const removeButton = document.createElement('button');

  removeButton.innerText = 'remove';

  removeButton.type = 'button';

  // Remove the message when the remove button is clicked
  removeButton.addEventListener('click', function() {
    const entry = removeButton.parentNode;
    entry.remove();
  });

  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  event.target.reset();
});


// Fetch and display GitHub repositories
fetch("https://api.github.com/users/shaunna1116/repos")
.then(function(response) {
  return response.json();
})

.then(function(data) {
  let repositories = data;
  console.log(repositories);

  let projectSection = document.getElementById('Projects');
  let projectList = projectSection.querySelector('ul');
  console.log(projectList);

  for (let i = 0; i < repositories.length; i++) {
    const project = document.createElement('li');
    project.innerText = repositories[i].name;
    projectList.appendChild(project);
  }
})

.catch(function(error) {
  console.error('Error fetching repositories:', error);
});


