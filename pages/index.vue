<template>
<div id="app">
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="item.heading"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click=""
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click="" :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="blue darken-3"
      dark
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Test Line Search</span>
      </v-toolbar-title>
      
      
      <!--
      
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src="https://vuetifyjs.com/static/doc-images/logo.svg"
            alt="Vuetify"
          >
        </v-avatar>
      </v-btn>
      
      -->
      
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
            
        <!--    
          <v-tooltip right>
            <v-btn
              icon
              large
              :href="source"
              target="_blank"
              slot="activator"
            >
              <v-icon large>code</v-icon>
            </v-btn>
            <span>Source</span>
          </v-tooltip>
          -->
          
          
          
          
    <div
      id="e3"
      style="width: 1200px; margin: auto;"
      class="grey lighten-3"
    >
      <v-toolbar
        color="pink"
        dark
      >
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>店舗情報</v-toolbar-title>
        <v-spacer></v-spacer>
    
      </v-toolbar>
  
      <v-card>
        <v-container
          fluid
          grid-list-lg
        >
          <v-layout row wrap>
     
              
          
            <v-flex xs6 v-for="shop in shops">
              <v-card color="purple" class="white--text">
                <v-layout row>
                  <v-flex xs7>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">{{ genShopName(shop.name) }}</div>
                        <div>{{ genPrice(shop.price) }}</div>
                        <div>{{ genAddress(shop.address) }}</div>
                      </div>
                    </v-card-title>
                  </v-flex>
                  <v-flex xs5>
                    <v-img
                      :src="shop.thumbnail"
                      height="125px"
                      contain
                    ></v-img>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-card-actions class="pa-3">
                  評判スコア
                  <v-spacer></v-spacer>
                  <v-icon>star</v-icon>
                  <v-icon>star</v-icon>
                  <v-icon>star</v-icon>
                  <v-icon>star</v-icon>
                  <v-icon>star_border</v-icon>
                </v-card-actions>
              </v-card>
            </v-flex>
            
         
            
            
            
          </v-layout>
        </v-container>
      </v-card>
    </div>
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
        </v-layout>
      </v-container>
    </v-content>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          Create contact
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field
                  placeholder="Name"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="business"
                placeholder="Company"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                placeholder="Job title"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="mail"
                placeholder="Email"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                type="tel"
                prepend-icon="phone"
                placeholder="(000) 000 - 0000"
                mask="phone"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="notes"
                placeholder="Notes"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</div>

</template>
<script>
    
 export default{   
     data: () => ({
      dialog: false,
      drawer: null,
      items: [
        { icon: 'contacts', text: 'Contacts' },
        { icon: 'history', text: 'Frequently contacted' },
        { icon: 'content_copy', text: 'Duplicates' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Labels',
          model: true,
          children: [
            { icon: 'add', text: 'Create label' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'More',
          model: false,
          children: [
            { text: 'Import' },
            { text: 'Export' },
            { text: 'Print' },
            { text: 'Undo changes' },
            { text: 'Other contacts' }
          ]
        },
        { icon: 'settings', text: 'Settings' },
        { icon: 'chat_bubble', text: 'Send feedback' },
        { icon: 'help', text: 'Help' },
        { icon: 'phonelink', text: 'App downloads' },
        { icon: 'keyboard', text: 'Go to the old version' }
      ],
      
      shops : [
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
          
         
      ]
    }),
    
    methods :{
      genShopName : function (inputTxt) {
          return "名 : "+ inputTxt;
      },
      genAddress : function (inputTxt) {
          return "住所 : "+ inputTxt;
      }, 
      genPrice : function (inputTxt) {
            return "価格 : "+ inputTxt.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' }) ;
      }, 
    
    },
    
    
    
    props: {
      source: String
    }
    
 }
    
</script>