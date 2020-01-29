//
// Respond to various 'hello' words, attach file by URL and from local file system
var fs = require('fs');

module.exports = function( controller ) {

    controller.hears( [ 'hi','hello','howdy','hey','aloha','hola','bonjour','oi' ], 'message,direct_message', async ( bot,message ) => {

        await bot.reply( message,'Hola!' );
        await bot.reply( message, { markdown: 'Intenta escribiendo "ayuda" para ver mis comandos.' } );
      });

    controller.hears( 'gatito', 'message,direct_message', async ( bot,message ) => {

        await bot.reply( message, {
            text: 'Aww!',
            files: [ 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Youngkitten.JPG/220px-Youngkitten.JPG' ]
        });
    })

    controller.hears( 'local', 'message,direct_message' , async ( bot,message ) => {
        await bot.reply( message, {
            text: 'The source code',
            files: [ fs.createReadStream( './bot.js' ) ]
        })
    })

    controller.commandHelp.push( { command: 'hello', text: 'Hola!' } );
    controller.commandHelp.push( { command: 'url', text: 'Attach a file via URL' } );
    controller.commandHelp.push( { command: 'local', text: 'Attach a file from the local file system' } );

}
