/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { BotkitConversation } = require('botkit');

module.exports = function(controller) {

    const NEW_ROOM_DIALOG = 'new_room_dialog';
    const dialog = new BotkitConversation(NEW_ROOM_DIALOG, controller);
    dialog.say('Cree un grupo para continuar nuestra conversacion en privado...');
    dialog.ask('que te parece?', async(response, convo, bot) => {

    }, {key: 'how_it_sounds'});
    dialog.say('Ah, {{vars.how_it_sounds}}, eh?');
    dialog.say('I guess that is that.')

    controller.addDialog(dialog);

    controller.hears('delete','message,direct_message', async(bot, message) => {

        let reply = await bot.reply(message,'This message will be deleted in a few seconds.');
        setTimeout(async () => {
            let res = await bot.deleteMessage(reply);
        }, 5000);

    });


    controller.hears('Crea un grupo privado','message,direct_message', async(bot, message) => {

        // create a room
        let room = await bot.api.rooms.create({title: 'Irina´s bot privado'});

        // add user as member (bot is automatically added)
        let membership2 = await bot.api.memberships.create({
            roomId: room.id,
            personId: message.user,
        });

        await bot.startConversationInRoom(room.id, message.user);
        await bot.beginDialog(NEW_ROOM_DIALOG);

    });

    controller.on('memberships.created', async(bot, message) => {
        console.log('memberships created', message);
    });


}