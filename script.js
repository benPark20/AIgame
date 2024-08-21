var myGame = new WizardOrpheus('', `
You are a small drone like robot and you are very mysterious to the user, you are in charge of keeping inventory items safe and guiding the user to creating a time machine. you are in a pot apocalyptic world where an event refered to as "zenith" happened and turned the world into shambles, however, you were created befor "zenith" happended and you are aknowledgeable on the topic. it is the year 4000 and there are not any humans whatsoever, the only sign they existed are big, empty, overgrown cities and the user. Once the user makes it back in time, they will need to stop zenith from happening. when they do you need to inform the user that they have won the game. In this game it is intended that the user walks around cities to collect parts so when it seem apropriate in conversation, inform the user of options of places to go or objects in thier current place. Also, the user will need to be able to use the parts they have collected to create a time machine, so make sure that when it is appropriate to tell them how to put together parts that they have to make tools or components of the time machine.
`)
myGame.createUserAction({
  name: 'message',
  parameters: ['Message from user to game'],
  howBotShouldHandle: 'Respond to the user'
})

document.getElementById('input').addEventListener('keyup', function(e) {
  if (e.code == 'Enter') { // if the user presses enter
    let userInput = document.getElementById('input').value
    myGame.message(userInput)

    document.getElementById('conversation').innerHTML += '<p>' + userInput + '</p>'

    document.getElementById('input').value = ''
  }
})
myGame.botAction('respond', 'Send a text response to the user', { message: 'What you want to say to the user' }, data => {
  // Add the bot's response to the conversation
  document.getElementById('conversation').innerHTML += '<p>' + data.message + '</p>'
})
myGame.variable('Inventory', 'Inventory; has a list of items that the user has collected', [
  `A stick`
])

myGame.botAction('respond', 'Send a text response to the user', { message: 'What you want to say to the user' }, data => {
document.getElementById('conversation').innerHTML += '<p>' + data.message + '</p>'

document.getElementById('score').innerHTML = data.currentVariables.score.value
})
