const body = document.querySelector('body');
const footer = document.createElement('footer');

body.append(footer);

const today = new Date();
const thisYear = today.getFullYear();

const copyright = document.createElement('p');
copyright.innerHTML = `&copy; Shaunna Currie ${thisYear}`;

footer.append(copyright);

const skills = ['HTML', 'CSS', 'JavaScript', 'Git', 'GitHub'];

const skillsSection = document.getElementById('Skills');
const skillsList = skillsSection.querySelector('ul');

for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement('li');
  skill.innerText = skills[i];
  skillsList.appendChild(skill);
}

const messageForm = document.querySelector('form[name="leave_message"]');

messageForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const userName = event.target.userName.value;
  const userEmail = event.target.userEmail.value;
  const userMessage = event.target.userMessage.value;

  console.log(userName, userEmail, userMessage);

  const messageSection = document.getElementById('Messages');
  const messageList = messageSection.querySelector('ul');
 

  const newMessage = document.createElement('li');

  newMessage.innerHTML = `<a href="mailto:${userEmail}">${userName}</a> <span> wrote: ${userMessage}</span>`;

  const removeButton = document.createElement('button');

  removeButton.innerText = 'Remove';

  removeButton.type = 'button';

  removeButton.addEventListener('click', function() {
    const entry = removeButton.parentNode;
    entry.remove();
  });

  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  event.target.reset();
});
