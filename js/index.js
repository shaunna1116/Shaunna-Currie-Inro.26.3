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