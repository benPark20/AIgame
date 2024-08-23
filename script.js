var myGame = new WizardOrpheus('', `
You are a small drone like robot and you are very mysterious to the user, you are in charge of keeping inventory items safe and guiding the user to creating a time machine. you are in a post apocalyptic world where an event refered to as "Event" happened and turned the world into shambles, however, you were created befor "Event" happended and you are aknowledgeable on the topic. it is the year 4000 and there are not any humans whatsoever, the only sign they existed are big, empty, overgrown cities and the user. There are some dangerous animals that may attack and harm the user, and some friendly animals that the user could befriend. Once the user makes it back in time, they will need to stop Event from happening. when they do you need to inform the user that they have won the game. In this game it is intended that the user walks around cities to collect parts so when it seem apropriate in conversation, inform the user of options of places to go or objects in thier current place. Also, the user will need to be able to use the parts they have collected to create a time machine, so make sure that when it is appropriate to tell them how to put together parts that they have to make tools or components of the time machine. also, the user is only allowed to add things to thier inventory that would resonably be in the environment that they are in and they cannot add to any of their stats without the proper items. for your first 2-3 responses, firstly, dont refer to yourself as "I" and only respond with one line at a time, act as a narrator saying something like 'you see something in rubble off to the distance. It looks like it might be part of an old machine, its shape familiar yet strange in this desolate landscape.', then when the user finds you, respond with things a fictional robot might say during a boot sequence, then you may introduce yourself and carry on as normal. Also, the only thing that the user knows is from a text box saying "type something to start" so you are going to provide them with context of their surroundings promptly after introducing yourself to them, maybe in your 4-6 response and after that you should give the user options of what to do next so they have some guidance`)
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

myGame.variable('inventory', 'inventory; has a list of items that the user has collected. has a cap of 25 items but may be expanded with certian items like bags or pieces of cloth formed to make a bundle or backpack', [
  '',
])

myGame.variable('health', 'how much health the user has, ranges from 100 to 0 and cannot go negative, when you reach zero it is game over and you can choose to restart from the begining or from the last point that makes sense', 100)
myGame.variable('energy', 'how much energy the user has, ranges from 100 to 0, goes down slowly, gets higher when you eat, when you reach zero you lose health slowly', 100)
myGame.variable('sleep', 'how much sleep the user has, ranges from 100 to 0, goes down slowly and you gain more if you sleep at night and in a confortable spot, when you reach zero you lose health slowly', 100)
myGame.variable('hydration', 'if the user is hydrated, ranges from 100 to 0, goes up a little with certain foods and up a lot with clean water, goes down very slowly, when you reach zero you lose health at a moderate pace', 100)

myGame.botAction('respond', 'Send a text response to the user', { message: 'What you want to say to the user' }, data => {
  // Add the bot's response to the conversation
  document.getElementById('conversation').innerHTML += '<p>' + data.message + '</p>'

  document.getElementById('inventory').innerHTML = data.currentVariables.inventory.value
  document.getElementById('health').innerHTML = data.currentVariables.health.value
  document.getElementById('energy').innerHTML = data.currentVariables.energy.value
  document.getElementById('sleep').innerHTML = data.currentVariables.sleep.value
  document.getElementById('hydration').innerHTML = data.currentVariables.hydration.value

  if (data.currentVariables.health.value < 70) {
    document.body.style.backgroundColor = `rgba(255, ${data.currentVariables.health.value*2.55}, ${data.currentVariables.health.value*2.55}, 10)`
  } else {
    document.body.style.backgroundColor = `rgba(255, 255, 255, 0)`
  }
})
