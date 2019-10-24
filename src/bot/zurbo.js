const messenger = require('../channel/messenger');
const dialogflow = require('../nlp/dialogflow');
// TODO: move this outside of this class
const userService = require('../persistence/services/user-service');

class Zurbo {

  async processFreeText(event) {
    let user = await userService.findByFacebookId(event.sender.id);
    if (!user) {
      const profile = await messenger.getUserProfileData(event.sender.id);
      await userService.create({
        first_name: profile.first_name,
        last_name: profile.last_name,
        locale: profile.locale,
        profile_pic: profile.profile_pic,
        timezone: profile.timezone,
        facebook_id: profile.id,
        gender: profile.gender
      });
    }

    if (en que contexto estoy) 1. tengo el context prompt seteado
    const intent = await dialogflow.detectIntent({ event, user });

    //TODO: Update! This is just for testing propose.
    const result = intent ? 'Holis!' : `echo ${event.message.text}`;

    // le mando al convo manager el intent y me devuelve 1 nodo
    // veo que hacer con ese nodo segun corresponda si es que tengo que hacer algo
    // llamo al facebook msg creator con nodo
    // mando el msg
    await messenger.sendMessage(event.sender.id, { 'text': result });
  }
}

module.exports = new Zurbo();



tiempo

paso 1. le pido al flaco una location
--> seteo mi context a que le pedi una location
el flaco manda texto
--> el bot valida que el texto corresponde una location esto es un nodo de validacion que viene del nodo anterior  aca que valide el lugar valido cuando es
--> es una location valida esto tmb apunta a otro nodo que es el de decime el dia aca que valide el dia guardo que dia es
--> seteo el context a que le pregunte el dia y le mando el texto de este nodo al usuario eg decime pa cuando
el flaco manda mas text
-- valido el dia y es valido me voy al siguiente nodo de este flow
--> el nodo del flow es una function
-- ejecuto el nodo de la function con la data que guarde en el context del pibe clase.nombre
aca se termino y yo le pase la data al user, le pregunto si esta ok, la borro
