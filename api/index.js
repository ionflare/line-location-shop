
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

const shops = [
         
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
           {
            name    : '一番ラーメン', 
            thumbnail   :  'https://images-na.ssl-images-amazon.com/images/I/51S8PMEF8WL.jpg',
            address : '〒060-0001 北海道札幌市中央区北１条西２丁目',
            latitude : 43.063827,
            longitude : 141.354205,
            price   : 5000,
            rate    : 5
          },
      ];





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
  
  
  if(event.message.type == 'location')
  {
      
     var shopResult =  CalDistanceKm(shops , event.message.latitude, event.message.longitude, 500);
    
    /*
     return client.replyMessage(event.replyToken,  { type: 'text', text: "la :" + event.message.latitude + " , long :" 
     + event.message.longitude + "shop1 : " + shops[0].latitude + " ... long : " + shops[0].longitude + " .d :" +ss});
    */
    //return client.replyMessage(event.replyToken,  { type: 'text', text:  ss[0].name +  " -" + ss[0].distance  });
    
    
    if(shopResult.length > 0)
    {
         return    client.replyMessage(event.replyToken, 
      {
        "type": "template",
          "altText": "結果",
          "template": {
          "type": "carousel",
          "columns":  genCorusel(shopResult),
          
              "imageAspectRatio": "rectangle",
              "imageSize": "cover"
          }
         }
         );
        
    }
    else
    {
        return client.replyMessage(event.replyToken,  { type: 'text', text:  "500KM 以内店がありません。"  });
    }
    
    
  
   
  }
  
  if(event.message.type == 'text')
  {
      return    client.replyMessage(event.replyToken, 
      {
        "type": "template",
          "altText": "this is a carousel template",
          "template": {
              "type": "carousel",
              "columns": [
                  {
                    "thumbnailImageUrl": "https://example.com/bot/images/item1.jpg",
            "imageBackgroundColor": "#FFFFFF",
            "title": "this is test menu",
            "text": "test description",
            "defaultAction": {
                "type": "uri",
                "label": "View detail",
                "uri": "http://example.com/page/123"
            },
            "actions": [
                {
                      "type": "uri",
                    "label": "Open QR Code reader",
                    "uri": "line://nv/QRCodeReader"
               
                },
                {
                     "type": "uri",
                    "label": "Liff",
                    "uri": "line://app/1550488155-bE5G4nVY"
                },
                {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "https://test-liff-1.herokuapp.com"
                }
            ]
          },
         
        ],
              "imageAspectRatio": "rectangle",
              "imageSize": "cover"
          }
         }
         );
  }
  
  
  
  /*
   await clientBot.pushMessage(token_response.id_token.sub,{
        type:'text',
        text:"อิอิ"
     })
  */
 
  
  
   
  
 
 
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

function CalDistanceKm(inputArrayLocation,userLa,userLong, maxDis) {

        
        let res  = [];
       for(var idx =0; idx<inputArrayLocation.length; idx++ )
        {    let R = 6371; // Radius of the earth in km
            let dLat = deg2rad(inputArrayLocation[idx].latitude - userLa);  // deg2rad below
            let dLon = deg2rad(inputArrayLocation[idx].longitude - userLong); 
            let a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(userLa)) * Math.cos(deg2rad(inputArrayLocation[idx].latitude)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            let d = R * c; 
            if(d < maxDis)
            {
                inputArrayLocation[idx].distance = d;
                //inputArrayLocation[idx].push({distance : d});
                res.push(inputArrayLocation[idx]);
            }
        }
        return res;
    
}







function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function genCorusel(inputArray) {
    
    let col = [];
      for(var idx =0; idx<inputArray.length; idx++ )
        {   
            col.push(
                 {
                    "thumbnailImageUrl": inputArray[idx].thumbnail,
                    "imageBackgroundColor": "#FFFFFF",
                    "title": inputArray[idx].name,
                    "text":  "価格 : "+inputArray[idx].price +"円. 住所 : "+inputArray[idx].address +".  距離 : " + inputArray[idx].distance.toFixed(2) + "KM",
                    "defaultAction": {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/123"
                    },
                    "actions": [
                         {
                            "type": "uri",
                            "label": "詳細",
                            "uri": "https://line-location-shop.herokuapp.com/"
                       
                        },
                        {
                            "type": "uri",
                            "label": "予約",
                            "uri": "https://line-location-shop.herokuapp.com/"
                       
                        }
                    ]
                  }
                
                );
        }
    return col;
 
}



module.exports = {
    path: '/api',
    handler: app
}