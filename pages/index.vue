<template>
  <div>
  <v-row justify="center" class='mb-16 pb-9' align="center">
    <v-col cols="12" sm="8" md="12">
      <div  class='text-center my-5'>
        <img width='400' :src='$icon(512)'/>
        <h1 class='display-4 mb-3'>Campus Central</h1>
        <h1 class='display-2 grey--text'>All of your Schoology struggles, solved.</h1>
      </div>

    </v-col>
  </v-row>
    <div style='width: 100%;background-color: #c0c1cf'>
      <v-row  class='py-16'>
        <v-col cols='4' class='ml-16'>
          <v-card elevation='6' color='tertiary'>
            <v-system-bar color='secondary' />
            <v-row>
              <v-col class='pb-0' cols='5' >
                <v-list height='100%' nav color='accent'>
                  <v-list-item>

                      <img width='40px' src='https://cdn.discordapp.com/emojis/741411636111343657.png?v=1'/>

                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content >
                      <v-list-item-title class='title'>
                        Senor Lemonthink
                      </v-list-item-title>
                      <v-list-item-subtitle>sourthoughts@pausd.us</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item  class='accent darken-1  elevation-3 ' style='cursor: default;transform: translate(-40px,0)'>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-book
                      </v-icon>
                      </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        Courses
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item   class='accent darken-1 elevation-3' style='cursor: default;transform: translate(-20px,0)'>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-email
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        Messages
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols='7'>
                <v-list nav color='transparent'>
                  <v-list-item class='v-list-item--active v-list-item--link' style='cursor: default' two-line>
                    <v-list-item-content>
                      <v-list-item-title>
                        AP SELF Honors
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        Charlie Brown
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-chevron-right
                      </v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                  <v-list-item  style='cursor: default' two-line>
                    <v-list-item-content>
                      <v-list-item-title>
                        World English
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        Lucy Steppers
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-chevron-right
                      </v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>

          </v-card>
        </v-col>
        <v-col cols='1'></v-col>
        <v-col cols='5' class='ml-16 theme--light'>
          <v-sheet color='transparent' light>
            <h1 class='display-2'>Easy Access</h1>
            <p class='headline mt-3'>
              Designed with ease in mind, everything you'll ever need is at most two clicks away.
            </p>
          </v-sheet>

        </v-col>
      </v-row>
      <v-row class='py-16 '>
        <v-col  cols='12'>
          <v-container class='text-center'>
            <v-sheet color='transparent' light>
              <h1 class='display-3 mb-8'>Break Free of Hassles</h1>
              <v-btn rounded color='accent' href='/api/auth' x-large>
                Enter Campus
              </v-btn>
            </v-sheet>

          </v-container>
        </v-col>


      </v-row>
    </div>
  </div>

</template>

<script>

export default {
  middleware:'storeUser'
}
</script>
