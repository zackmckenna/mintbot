/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function(controller) {

    controller.hears('sample','message,direct_message', async(bot, message) => {
        await bot.reply(message, 'I heard a sample message.');
    });

    controller.on('message,direct_message', async(bot, message) => {
        await bot.reply(message, `Echo: ${ message.text }`);
    });

    controller.hears('who', 'message,direct_message', async(bot, message) => {
        await bot.reply(message, 'who am I?  I should be asking who are you.')
    })

    controller.hears(['hi','hello','howdy','hey','aloha','hola','bonjour','oi'],['message'], async (bot,message) => {

        // do something to respond to message
        await bot.reply(message,'Oh hai there!');

      });
}
