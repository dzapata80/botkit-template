//
// Welcome message 
// sent as the bot is added to a Room
//
module.exports = function (controller) {

    controller.on( 'memberships.created', async( bot, message ) => {

        let markDown = `Hola , yo soy **${ controller.adapter.identity.displayName }** un bot para Preventa de Sonda Mexico!  \n`
        markDown += 'Escribe `ayuda` para saber mas acerca de mis habilidades.  ';

        if ( message.data.roomType == 'group' ) {

            markDown += `\n_Nota que este es un "grupo".\n  Y solo contestare si soy mencionada!  \n`
            markDown += `Para ayuda, entra: ${ controller.checkAddMention( message.data.roomType, 'ayuda' ) }_`
        }

        await bot.reply( message, { markdown : markDown} );
    });
}