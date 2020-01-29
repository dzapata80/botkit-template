//
// Command: help
//
module.exports = function (controller) {

    controller.hears( ['ayuda', 'help', 'help me', 'ayudame'], 'message,direct_message', async ( bot, message ) => {

        let markDown = '**Estos son los comandos con los que puedo ayudarte:**  \n';

        controller.commandHelp.sort( ( a,b ) => {

            return ( ( a.command < b.command ) ? -1 : ( ( a.command > b.command ) ? 1 : 0 ));
        });

        controller.commandHelp.forEach( element => {

            markDown += `**${ controller.checkAddMention( message.roomType, element.command ) }**: ${ element.text }  \n`
        });

        await bot.reply( message, { markdown: markDown } );

        // text += "\n- " + bot.appendMention(message, "storage") + ": store picked color as a user preference";
    });

    controller.commandHelp.push( { command: 'ayuda', text: 'commandos disponibles / descripción' } );
}
