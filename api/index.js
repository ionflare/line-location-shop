
/*
require('./config/config.js') //config for mongodb, jws

const ObjectId = require('mongoose').Types.ObjectId; 
const { mongoose } = require('./db/mongoose');
const { MailBox } = require("./models/mailbox")
const { BookInfo } = require("./models/bookinfo")
const { User } = require("./models/user")
const Client = require('@line/bot-sdk').Client;
*/

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
 channelAccessToken:  process.env.LINE_MESSAGE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_MESSAGE_CHANNEL_SECRET
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();


app.get('/webhook', async(req,res)=>{
    
   //req.session.current_user = null;
   res.send("xxx" );
 
})



// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  
  /*  
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  */
  
  
  if (event.type !== 'message' ) {
    // ignore non-text-message event
    client.replyMessage(event.replyToken,  { type: 'text', text: "ERROR : Input message is not text or location." });
    return Promise.resolve(null);
  }
  if(!(event.message.type == 'text' || event.message.type == 'location'))
  {
    client.replyMessage(event.replyToken,  { type: 'text', text: "ERROR : Input message is not text or location." });
    
      return Promise.resolve(null);
  }
  /*
   await clientBot.pushMessage(token_response.id_token.sub,{
        type:'text',
        text:"อิอิ"
     })
  */
  
  
  
  
  
   return client.replyMessage(event.replyToken,  { type: 'text', text: "一番の近い店舗は" + shops[0].name });
  
 
 
    /*
    User.findOne({
         username : event.source.userId
        }).then((sender_user)=>{
            BookInfo.findOne({customer_id  : sender_user._id},
             {}, { sort: { 'lastupdate': -1 }}
            ).then((booking_info)=>{ 
                User.findOne({ _id : new ObjectId(booking_info.provider_id) }).then((provider_user)=>{
                    //Add data to db
                    
                    
                    var MsgInfo= "";
                    if(event.message.type == 'text')
                    {
                        MsgInfo = event.message.text;
                    }
                    else if(event.message.type == 'location')
                    {
                        MsgInfo = "address="+ event.message.address +
                        "&latitude="+event.message.latitude+
                        "&longitude="+event.message.longitude;
                    }
                    
                    
                    var _mailbox = new MailBox({
                        
                        from_user_web_id : sender_user._id,
                        from_user_line_id :  event.source.userId,
                        from_user_web_displayName : sender_user.displayName,
                        from_user_src_imageProfile : sender_user.picture,
                        to_user_web_id : provider_user._id,
                        to_user_line_id : "",
                        to_user_web_displayName : provider_user.displayName,
                        messageType : event.message.type,
                        messageInfo : MsgInfo,
                        IsSeen : false,
                        lastupdate : new Date().getTime(),
                        
                        
                        });
                    return _mailbox.save();
                    
                }).catch((e)=> { 
                    return client.replyMessage(event.replyToken,  { type: 'text', text: "This is message from system : Errors occured while searching provider info." });
                 } );
                
            }).catch((e)=> { 
                return client.replyMessage(event.replyToken,  { type: 'text', text: "This is message from system : Can not contact to providers because You did not booked any service yet." });
            } );
            
      
    }).catch((e)=> { 
        return client.replyMessage(event.replyToken,  { type: 'text', text: "This is message from system : Your line account is not registered for this service." });
            } );
    
    */
    
    
  
}



const shops = [
          { name    : '一番ラーメン', 
            thumbnail   :  'http://www.foodpoi.com/wp-content/uploads/2007/11/ichiban-ramen.JPG',
            address : '〒060-0001 北海道札幌市中央区北１条西２丁目',
            latitude : 43.063827,
            longitude : 141.354205,
            price   : 5000 ,
            rate    : 5
          },
           { name    : 'KFC', 
            thumbnail   :  'https://pbs.twimg.com/profile_images/925714187023663104/YPFF21Lu_400x400.jpg',
            address : '〒112-0014 東京都文京区関口１丁目４７−12',
            latitude : 35.709947, 
            longitude : 139.731722,
            price   : 3000,
            rate    : 4
          },
           { name    : "McDonald's", 
            thumbnail   :  'https://f.ptcdn.info/369/024/000/1413031329-Mcdonalds9-o.png',
            address : '〒781-5233 高知県香南市野市町大谷７３８',
            latitude : 33.570272,
            longitude :  133.707993,
            price   : 1500,
            rate    : 3
          },
           { name    : 'SubWay', 
            thumbnail   :  'https://pbs.twimg.com/profile_images/881641760643923969/wsI1fGIn_400x400.jpg',
            address : '〒860-0845 熊本県熊本市中央区上通町２−３',
            latitude : 32.803672, 
            longitude : 130.711610,
            price   : 1000,
            rate    : 2
          },
           { name    : 'Pizza Hut', 
            thumbnail   :  'https://upload.wikimedia.org/wikipedia/th/3/3a/Pizza_Hut.png',
            address : '〒905-1504 沖縄県国頭郡国頭村安波',
            latitude : 26.729049, 
            longitude : 128.296591,
            price   : 500,
            rate    : 1
          },
      ];






module.exports = {
    path: '/api',
    handler: app
}