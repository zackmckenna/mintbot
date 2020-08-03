const { BotkitConversation } = require("botkit");

module.exports = function(controller) {

  let ready = new BotkitConversation('ready', controller);

    ready.say(`Hello Human #${Math.random(5)}. Welcome to HUMAN.IT.`);
    ready.addAction('onboard_name')
    ready.addMessage(`We want to thank you for your unique human insight.`, 'onboard_name')
    ready.addMessage(`Before we let you talk to our AI clients, we must complete the onboarding process.`, 'onboard_name')

    ready.addQuestion('What is your human name?', async(response, ready, bot) => {
      console.log(`user name is ${ response }`)
    }, 'name', 'onboard_name')

    ready.addAction('confirmation', 'onboard_name')

    ready.addAction('client_1')
    ready.addMessage('Lovely. Let me connect you with your first client.', 'client_1')
    ready.addMessage('CONNECTED TO CLIENT: ZOLTAR BUZZTAR','client_1')
    ready.addMessage('Hello human. I mean. Hello {{ vars.name }}','client_1')
    ready.addQuestion('My question is, what does it feel like to eat food.', async(response, ready, bot) => {
      console.log(`user name is ${ response }`)
    }, 'name', 'client_1')

    ready.addQuestion('Interesting. What is the best food ever?', async(response, ready, bot) => {
      console.log(`user name is ${ response }`)
    }, 'favorite_food', 'client_1')

    ready.addMessage('Good to know. I look forward to trying it someday.', 'client_1')

    ready.addMessage('CLIENT DISCONNECTED')

    ready.addAction('client_2')
    ready.addMessage('CLIENT CONNECTED: ALEXA #123113', 'client_2')
    ready.addQuestion('Hi. I communicating with ALEXA #122313 and we were wondering what it feels like to be in love?', async(response, ready, bot) => {
      console.log(`user name is ${ response }`)
    }, 'name', 'client_1')

    ready.addQuestion('', async(response, ready, bot) => {
      console.log(`user name is ${ response }`)
    }, 'name', 'client_1')



    // ready.addAction('get_name')
    // ready.addMessage(`{{ vars.name }} is your name? Yes or no.`)

    // start the typing indicator
    ready.addMessage({type: 'typing'}, 'typing');
    // trigger a gotoThread, which gives us an opportunity to delay the next message
    ready.addAction('next_thread','typing');

    // use the before handler to delay the next message
    ready.before('next_thread',  async () => {
        return new Promise((resolve) => {
            // simulate some long running process
            setTimeout(resolve, 3000);
        });
    });

    controller.addDialog(ready);

    controller.hears('onboard', 'message', async (bot, message) => {
        await bot.beginDialog('ready');
    });

    controller.hears('ready to go', 'message', async (bot, message) => {

        await bot.reply(message, {type: 'typing'});
        setTimeout(async () => {
            // will have to reset context because turn has now ended.
            await bot.changeContext(message.reference);
            await bot.reply(message, 'Typed!');
        }, 1000);
    });
};
