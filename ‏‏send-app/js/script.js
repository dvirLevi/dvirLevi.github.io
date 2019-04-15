var namId;
var x;
if (!localStorage.getItem("xsave")) {
    x = 1;
}



Vue.component('menu-app', {
    props: ['close'],
    template: `<div class="row">
                  <div class="col-12">
                      <div class="div-menu" v-on:click.stop="buttAdd">
                         <div class="hamborger-menu">
                            <div></div>
                            <div></div>
                            <div></div>
                         </div>
                         <div class="div-menu-open" v-if="close">
                            <div class="in-open" v-on:click="$emit('openmodal')">
                            התוספות שלי
                            </div>
                            <div class="in-open" v-on:click="cleanStorage">
                            ניקוי כל הנתונים
                            </div>
                         </div>
                      </div>
                  </div>
               </div>`,
    data: function () {
        return {

        };
    },
    computed: {

    },
    methods: {
        buttAdd: function () {
            this.$emit('open');
        },
        cleanStorage() {
            localStorage.clear();
            location.reload();
        }

    }

});

Vue.component('select-add', {
    props: ['close', 'bread', 'spread', 'addspread', 'addbread', 'mybread', 'myspread', 'modal'],
    template: `<div class="row">
                  <div class="col-12 add" v-on:click="closeAll">
                      <div class="butt-add" v-on:click.stop="buttAdd2">
                          <div class="butt-add-menu2" v-if="manu2 && !close && addbread.length < 1 && !modal">
                               <div class="in-menu" v-for="bre in bread" v-on:click="$emit('addbre', bre)">
                               {{bre.breade}}
                               </div>
                               <div class="in-menu" v-for="mybr in mybread" v-on:click="$emit('addbre', mybr)">
                               {{mybr.breade}}
                               </div>
                          </div>
                          <img src="img/bread.png">
                      </div>
                      <div class="content-add">
                          <div class="temlet-drag" draggable="false">
                             <div class="bread-drag" v-for="add in addbread">
                             {{add.bread}}
                             </div>
                             <div class="win-spread-drag2">
                                <div class="scroll-spread-drag">
                                   <div class="spread-drag" v-for="add in addspread">
                                   {{add.spread}}
                                   </div>
                                </div>
                             </div>
                             <img src="img/hamb.png">
                             <div class="div-plus" v-if="addbread.length && addspread.length"  v-on:click="$emit('push-in-drag')">
                               <img class="plus" src="img/plus.png">
                             </div>
                          </div>
                      </div>
                      <div class="butt-add" v-on:click.stop="buttAdd">
                          <div class="butt-add-menu" v-if="manu && !close && addspread.length < 3 && !modal">
                              <div class="in-menu" v-for="spre in spread" v-on:click="$emit('addspre', spre)">
                              {{spre.spreade}}
                              </div>
                              <div class="in-menu" v-for="mysp in myspread" v-on:click="$emit('addspre', mysp)">
                              {{mysp.spreade}}
                              </div>
                          </div>
                          <img src="img/Spread.png">
                      </div>
                  </div>
               </div>`,
    data: function () {
        return {
            manu: false,
            manu2: false,
        };
    },
    computed: {

    },
    methods: {
        buttAdd: function () {
            this.manu = !this.manu;
            this.manu2 = false;

        },
        buttAdd2: function () {
            this.manu2 = !this.manu2;
            this.manu = false;
        },

        closeAll: function () {
            this.manu2 = false;
            this.manu = false;
        }
    }
});

Vue.component('drag-screen', {
    props: ['setsenw'],
    template: `<div class="row">
                  <div class="col-12 add">
                      <div class="contain-drag">
                         <div class="content-drag-add" v-for="set in setsenw" v-on:click="Drag">
                            <div class="temlet-drag" :draggable="drag" v-on:dragstart="$emit('dragf', set)">
                                <div class="x" v-on:click="$emit('clearset', set)"><img src="img/x.png"></div>
                                <div class="bread-drag">
                               {{set.bread}}
                                </div>
                                <div class="win-spread-drag" v-on:click.stop="noDrag">
                                   <div class="scroll-spread-drag">
                                      <div class="spread-drag">
                                      {{set.spread}}
                                      </div>
                                   </div>
                                </div>
                                <img src="img/hamb.png">
                            </div>
                         </div>
                     </div>
                  </div>
               </div>`,
    data: function () {
        return {
            drag: true,
        };
    },
    computed: {

    },
    methods: {
        noDrag: function () {
            this.drag = false;
        },
        Drag: function () {
            this.drag = true;
        }

    },
});

Vue.component('dey-row', {
    props: [''],
    template: `<div class="row">
                  <div class="col-12 add">
                      <div class="dey-row">
                      <div class="dey-sticky">שם ילד</div>
                      <div class="dey">ראשון</div>
                      <div class="dey">שני</div>
                      <div class="dey">שלישי</div>
                      <div class="dey">רביעי</div>
                      <div class="dey">חמישי</div>
                      <div class="dey">שישי</div>
                      </div>
                  </div>
               </div>`,
    computed: {

    },
    methods: {

    }
});

Vue.component('mame-child', {
    props: ['chi'],
    template: `<div class="child">
                  <div class="x" v-on:click="$emit('dchild', chi)"><img src="img/x.png"></div>
                  <p v-if="!inpActiv" v-on:click="inpActivTrue">{{chi.boy}}</p>
                  <input v-if="inpActiv" v-model="mess" v-on:keyup.enter="addName" v-on:blur="addName" placeholder="הוסף שם">
               </div>`,
    data: function () {
        return {
            inpActiv: "",
            mess: "",
        }
    },
    mounted: function () {
        if (localStorage.getItem("child") && !this.chi.boy == "") {
            this.inpActiv = false;
        } else {
            this.inpActiv = true;
        }
    },
    computed: {

    },
    methods: {
        addName: function () {
            this.$emit('pushname', this.chi, this.mess)
            if (!this.chi.boy == "") {
                this.inpActiv = false;
            }
        },
        inpActivTrue: function () {
            this.inpActiv = true;
        },

    }
});

Vue.component('send-table', {
    props: ['storeset', 'savedrag'],
    template: `<div class="row">
                  <div class="col-12">
                  <div class="push-scroll">
                  <div class="scroll">
                  <dey-row></dey-row>
                      <div class="push-child">
                           <mame-child v-on:pushname="pushname" v-for="chi in child" v-bind:chi="chi" :key="chi.id" v-on:dchild="dchild"></mame-child>
                      </div>
                      <div class="push-dey" v-for="chil in child" :key="chil.id">
                           <dey-in-table v-for="de in dey" v-bind:storeset="storeset" v-bind:de="de" v-bind:chil="chil" v-bind:savedrag="savedrag" v-on:cleanstoreset="$emit('cleanstoreset')"></dey-in-table>
                      </div>
                      
                      </div>
                      </div>
                      <div class="plus-child">
                         <div class="circel-plus">
                           <img src="img/plus.png" v-on:click="addChild">
                         </div>  
                      </div>
                  </div>
               </div>`,
    data: function () {
        return {
            child: [{
                boy: "",
                id: 0,
            }],

            dey: [{
                    id: 1
                },
                {
                    id: 2
                },
                {
                    id: 3
                },
                {
                    id: 4
                },
                {
                    id: 5
                },
                {
                    id: 6
                },

            ],
        };
    },
    created() {
        if (localStorage.getItem("child")) {
            this.child = JSON.parse(localStorage.getItem("child"));
        }
    },

    mounted: function () {
       
        if (localStorage.getItem("namId")) {
            namId = JSON.parse(localStorage.getItem("namId")) + 1;
        } else {
            namId = 1
        }
    },
    computed: {

    },
    methods: {
        addChild: function () {
            this.child.push({
                boy: "",
                id: namId,
            })
            this.saveStorage();
            namId++
        },
        pushname: function (chi, mess) {
            var n = this.child.indexOf(chi);
            this.child[n].boy = mess;
            this.saveStorage();
        },
        dchild: function (chi) {
            var n = this.child.indexOf(chi);
            this.child.splice(n, 1);
            this.saveStorage();
        },
        saveStorage: function () {
            localStorage.setItem("child", JSON.stringify(this.child));
            localStorage.setItem("namId", JSON.stringify(namId));
        }


    }
});

Vue.component('dey-in-table', {
    props: ['storeset', 'chil', 'de', 'savedrag'],
    template: `<div class="dey-in" v-on:dragover="prev" v-on:drop="drops">
                    <div class="content-drag-table" v-for="set in setDey">
                        <div class="x-2" v-on:click="deletedrop"><img src="img/x.png"></div>
                        <div class="temlet-drag">
                            <div class="bread-drag2">
                            {{set.bread}}
                            </div>
                            <div class="win-spread-drag">
                                <div class="scroll-spread-drag">
                                    <div class="spread-drag2">
                                    {{set.spread}}
                                    </div>
                                </div>
                            </div>
                            <img src="img/hamb.png">
                        </div>
                   </div> 
               </div>`,
    data: function () {
        return {
            setDey: [],
            xsave: "",
            dragtak: [],
            dragdelete: [],
        }
    },
    mounted: function () {
        for (var y = 1; y < this.savedrag.length + 6; y++) {
            this.dragtak = JSON.parse(localStorage.getItem("setDey" + y));
            if (this.dragtak) {
                if (this.dragtak[0].id1 == this.chil.id && this.dragtak[0].id2 == this.de.id) {
                    this.setDey = this.dragtak;
                }
            }
        }

        if (localStorage.getItem("xsave")) {
            this.xsave = JSON.parse(localStorage.getItem("xsave"));
            x = this.xsave + 1;
        }
    },
    computed: {

    },
    methods: {
        prev: function (event) {
            if (this.setDey.length < 1) {
                event.preventDefault();
            }
        },

        drops: function () {
            if (this.setDey.length < 1) {
                this.setDey.push({
                    bread: this.storeset[0].bread,
                    spread: this.storeset[0].spread,
                    id1: this.chil.id,
                    id2: this.de.id,
                });

                this.xsave = x;
                this.$emit('cleanstoreset');
                this.addstorag()
            }
        },
        deletedrop: function () {
            this.setDey = [];

            for (var y = 1; y < this.savedrag.length + 1; y++) {
                this.dragdelete = JSON.parse(localStorage.getItem("setDey" + y));
                if (this.dragdelete) {
                    if (this.dragdelete[0].id1 == this.chil.id && this.dragdelete[0].id2 == this.de.id) {
                        localStorage.removeItem("setDey" + y);
                    }
                }
            }
        },
        addstorag: function () {
            localStorage.setItem("setDey" + x, JSON.stringify(this.setDey));
            localStorage.setItem("xsave", JSON.stringify(this.xsave));
            x++
        },
    }
});

Vue.component('dey-row', {
    props: [''],
    template: `<div class="row row-add2">
                  <div class="col-12 add2">
                      <div class="dey-row">
                      <div class="dey-sticky">שם ילד</div>
                      <div class="dey">ראשון</div>
                      <div class="dey">שני</div>
                      <div class="dey">שלישי</div>
                      <div class="dey">רביעי</div>
                      <div class="dey">חמישי</div>
                      <div class="dey">שישי</div>
                      </div>
                  </div>
               </div>`,
    computed: {

    },
    methods: {

    }
});

Vue.component('modal-l', {
    props: ['myspread', 'mybread'],
    template: `<div class="modal" v-on:click.self="$emit('closemodal')">

                    <!-- Modal content -->
                    <div class="modal-content">
                    <div class="my-x" v-on:click="$emit('closemodal')"><img src="img/x.png"></div>
                    <div class="content-add-my">
                    <div class="add-my">
                       <p>הוספת סוג לחם</p>
                       <div class="my-list">
                          <div class="in-menu" v-for="mybr in mybread">
                              <div class="my-x-in" v-on:click="$emit('deletebread', mybr)"><img src="img/x.png"></div>
                                {{mybr.breade}}
                           </div>
                       </div>
                       <div class="my-list">
                           <input v-model="massbread" placeholder="הוסף לחם" v-on:keyup.enter="addbread" v-on:blur="addbread">
                           <div class="circel-plus-my" v-on:click="addbread">
                               <img src="img/plus.png">
                           </div>
                       </div>
                    </div>
                    <div class="add-my">
                       <p>הוספת סוג ממרח</p>
                       <div class="my-list">
                          <div class="in-menu" v-for="mysp in myspread">
                             <div class="my-x-in" v-on:click="$emit('deletespread', mysp)"><img src="img/x.png"></div>
                                {{mysp.spreade}}
                           </div>
                       </div>
                       <div class="my-list">
                           <input v-model="massspread" placeholder="הוסף ממרח" v-on:keyup.enter="addspread" v-on:blur="addspread">
                           <div class="circel-plus-my" v-on:click="addspread">
                               <img src="img/plus.png">
                           </div>
                       </div>
                       </div>
                    </div>
                    </div>
                
                </div>`,
    data: function () {
        return {
            massbread: "",
            massspread: "",
        }
    },
    mounted: function () {},
    computed: {

    },
    methods: {
        addbread: function () {
            if (!this.massbread == "") {
                this.$emit('addmybread', this.massbread);
            }
            this.massbread = "";
        },
        addspread: function () {
            if (!this.massspread == "") {
                this.$emit('addmyspread', this.massspread);
            }
            this.massspread = "";
        },
    }
});




new Vue({
    el: '#app',
    data: {
        close: false,
        bread: [{
                breade: "לחם"
            },
            {
                breade: "פיתה"
            },
            {
                breade: "באגט"
            },
            {
                breade: "לחמניה"
            },
            {
                breade: "לחם מלא"
            },
            {
                breade: "בייגל"
            },

        ],
        spread: [{
                spreade: "שוקולד"
            },
            {
                spreade: "חומוס"
            },
            {
                spreade: "טחינה"
            },
            {
                spreade: "חרדל"
            },
            {
                spreade: "קטשופ"
            },
            {
                spreade: "חלווה"
            },

        ],
        addspread: [],
        addbread: [],
        setsenw: [],
        storeset: [],
        savedrag: [],
        myspread: [],
        mybread: [],
        modal: false,
    },
    created() {
        if (localStorage.getItem("savedrag")) {
            this.savedrag = JSON.parse(localStorage.getItem("savedrag"));
        }
    },
    mounted: function () {
        if (localStorage.getItem("setsenw")) {
            this.setsenw = JSON.parse(localStorage.getItem("setsenw"));
        }
        if (localStorage.getItem("mybread")) {
            this.mybread = JSON.parse(localStorage.getItem("mybread"));
        }
        if (localStorage.getItem("myspread")) {
            this.myspread = JSON.parse(localStorage.getItem("myspread"));
        }
    },
    computed: {

    },
    methods: {
        closef() {
            this.close = false
        },
        closet() {
            this.close = !this.close
        },
        addspre(spre) {
            this.addspread.push({
                spread: spre.spreade
            })
        },
        addbre(bre) {
            this.addbread.push({
                bread: bre.breade
            })
        },
        pushInDrag() {
            var n;
            if (this.addspread[0]) {
                var m = this.addspread[0].spread;
                n = m;
            }
            if (this.addspread[1]) {
                var m = this.addspread[0].spread;
                var c = this.addspread[1].spread;
                n = m + " " + c;
            }
            if (this.addspread[2]) {
                var m = this.addspread[0].spread;
                var c = this.addspread[1].spread;
                var v = this.addspread[2].spread;
                n = m + " " + c + " " + v;
            }

            this.setsenw.push({
                spread: n,
                bread: this.addbread[0].bread,
            });

            this.addbread = [];
            this.addspread = [];
            this.saveStorage();
        },
        dragf(set) {
            this.storeset.push({
                bread: set.bread,
                spread: set.spread
            })
        },
        cleanstoreset() {
            this.storeset = [];
            this.savedrag.push(1);
            this.saveStorage();
        },
        clearset(set) {
            var n = this.setsenw.indexOf(set);
            this.setsenw.splice(n, 1)
            this.saveStorage();
        },
        openmodal() {
            this.modal = true;
        },
        closemodal() {
            this.modal = false;
        },
        addmybread(massbread) {
            this.mybread.push({
                breade: massbread
            });
            this.saveStorage();
        },
        addmyspread(massspread) {
            this.myspread.push({
                spreade: massspread
            });
            this.saveStorage();
        },
        deletespread(mysp) {
            var n = this.myspread.indexOf(mysp);
            this.myspread.splice(n, 1);
            this.saveStorage();
        },
        deletebread(mybr) {
            var n = this.mybread.indexOf(mybr);
            this.mybread.splice(n, 1);
            this.saveStorage();
        },
        saveStorage() {
            localStorage.setItem("setsenw", JSON.stringify(this.setsenw));
            localStorage.setItem("savedrag", JSON.stringify(this.savedrag));
            localStorage.setItem("mybread", JSON.stringify(this.mybread));
            localStorage.setItem("myspread", JSON.stringify(this.myspread));
        },
    },

})