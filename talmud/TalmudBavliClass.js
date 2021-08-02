class TalmudBavli {
  getAllPages() {
    if (!this.allPages.length) this.createPages()
    return this.allPages
  }
  getSdarim() {
    return this.TalmudBavliTree
  }
  getSeder(sederId) {
    return this.TalmudBavliTree.filter((el) => {
      return el.id === sederId
    })[0]
  }
  getMasechet(masechetId) {
    for (let i in this.TalmudBavliTree) {
      for (let x in this.TalmudBavliTree[i].childrens) {
        if (this.TalmudBavliTree[i].childrens[x].id === masechetId) {
          return this.TalmudBavliTree[i].childrens[x]
        }
      }
    }
  }
  getMasechtotOfSeder(sederId) {
    return this.TalmudBavliTree.filter((el) => {
      return el.id === sederId
    })[0].childrens
  }
  getPagesOfMasechet(masechetId) {
    return this.getAllPages().filter((el) => {
      return el.masechetId === masechetId
    })
  }
  getPageByGlobalIndex(globalIndex) {
    return this.getAllPages()[globalIndex]
  }
  getPageByIndexPageIn(indexPageIn) {
    for (let i in this.getAllPages()) {
      for (let x in this.getAllPages()[i].pages) {
        if (this.getAllPages()[i].pages[x].indexPageIn === indexPageIn) {
          return this.getAllPages()[i]
        }
      }
    }
  }
  getPageByEnameAndIndexNumPage(Ename, indexNumPage) {
    return this.getAllPages().filter((el)=> {
      return el.masechetEname === Ename && el.indexNumPage === indexNumPage
    })[0]
  }
  allPages = []
  TalmudBavliTree = [{
    childrens: [{
      id: 0,
      name: "ברכות",
      Ename: "Berakhot",
      length: 63,
      sederId: 0,
      sortId: 0,
      ifLastPage: false,
      firstLetter: 0
    }],
    id: 0,
    name: "זרעים",
    Ename: "Zeraim",
    icon: require("@/assets/ass7.svg")
  }, {
    childrens: [{
        id: 1,
        name: "שבת",
        Ename: "Shabbat",
        length: 156,
        sederId: 1,
        sortId: 0,
        ifLastPage: true,
        firstLetter: 0
      }, {
        id: 2,
        name: "עירובין",
        Ename: "Eruvin",
        length: 104,
        sederId: 1,
        sortId: 1,
        ifLastPage: false,
        firstLetter: 0
      }, {
        id: 3,
        name: "פסחים",
        Ename: "Pesachim",
        length: 120,
        sederId: 1,
        sortId: 2,
        ifLastPage: true,
        firstLetter: 0
      }, {
        id: 4,
        name: "שקלים",
        Ename: "Shekalim",
        length: 21,
        sederId: 1,
        sortId: 3,
        ifLastPage: true,
        firstLetter: 0
      },
      {
        id: 6,
        name: "יומא",
        Ename: "Yoma",
        length: 87,
        sederId: 1,
        sortId: 5,
        ifLastPage: false,
        firstLetter: 0
      }, {
        id: 7,
        name: "סוכה",
        Ename: "Sukkah",
        length: 55,
        sederId: 1,
        sortId: 6,
        ifLastPage: true,
        firstLetter: 0
      }, {
        id: 8,
        name: "ביצה",
        Ename: "Beitzah",
        length: 39,
        sederId: 1,
        sortId: 7,
        ifLastPage: true,
        firstLetter: 0
      }, {
        id: 5,
        name: "ראש השנה",
        Ename: "Rosh Hashanah",
        length: 34,
        sederId: 1,
        sortId: 4,
        ifLastPage: false,
        firstLetter: 0
      }, {
        id: 9,
        name: "תענית",
        Ename: "Taanit",
        length: 30,
        sederId: 1,
        sortId: 8,
        ifLastPage: false,
        firstLetter: 0
      }, {
        id: 10,
        name: "מגילה",
        Ename: "Megillah",
        length: 31,
        sederId: 1,
        sortId: 9,
        ifLastPage: false,
        firstLetter: 0
      }, {
        id: 11,
        name: "מועד קטן",
        Ename: "Moed Katan",
        length: 28,
        sederId: 1,
        sortId: 10,
        ifLastPage: false,
        firstLetter: 0
      }, {
        id: 12,
        name: "חגיגה",
        Ename: "Chagigah",
        length: 26,
        sederId: 1,
        sortId: 11,
        ifLastPage: false,
        firstLetter: 0
      }
    ],
    id: 1,
    name: "מועד",
    Ename: "Moed",
    icon: require("@/assets/ass12.svg")
  }, {
    childrens: [{
      id: 13,
      name: "יבמות",
      Ename: "Yevamot",
      length: 121,
      sederId: 2,
      sortId: 0,
      ifLastPage: true,
      firstLetter: 0
    }, {
      id: 14,
      name: "כתובות",
      Ename: "Ketubot",
      length: 111,
      sederId: 2,
      sortId: 1,
      ifLastPage: true,
      firstLetter: 0
    }, {
      id: 15,
      name: "נדרים",
      Ename: "Nedarim",
      length: 90,
      sederId: 2,
      sortId: 2,
      ifLastPage: true,
      firstLetter: 0
    }, {
      id: 16,
      name: "נזיר",
      Ename: "Nazir",
      length: 65,
      sederId: 2,
      sortId: 3,
      ifLastPage: true,
      firstLetter: 0
    }, {
      id: 17,
      name: "סוטה",
      Ename: "Sotah",
      length: 48,
      sederId: 2,
      sortId: 4,
      ifLastPage: true,
      firstLetter: 0
    }, {
      id: 18,
      name: "גיטין",
      Ename: "Gittin",
      length: 89,
      sederId: 2,
      sortId: 5,
      ifLastPage: true,
      firstLetter: 0
    }, {
      id: 19,
      name: "קידושין",
      Ename: "Kiddushin",
      length: 81,
      sederId: 2,
      sortId: 6,
      ifLastPage: true,
      firstLetter: 0
    }],
    id: 2,
    name: "נשים",
    Ename: "Nashim",
    icon: require("@/assets/ass11.svg")
  }, {
    childrens: [{
      id: 20,
      name: "בבא קמא",
      Ename: "Bava Kamma",
      length: 118,
      sederId: 3,
      sortId: 0,
      ifLastPage: true,
      firstLetter: 0
    }, {
      id: 21,
      name: "בבא מציעא",
      Ename: "Bava Metzia",
      length: 118,
      sederId: 3,
      sortId: 1,
      ifLastPage: false,
      firstLetter: 0
    }, {
      id: 22,
      name: "בבא בתרא",
      Ename: "Bava Batra",
      length: 175,
      sederId: 3,
      sortId: 2,
      ifLastPage: true,
      firstLetter: 0
    }, {
      id: 23,
      name: "סנהדרין",
      Ename: "Sanhedrin",
      length: 112,
      sederId: 3,
      sortId: 3,
      ifLastPage: true,
      firstLetter: 0
    }, {
      id: 24,
      name: "מכות",
      Ename: "Makkot",
      length: 23,
      sederId: 3,
      sortId: 4,
      ifLastPage: true,
      firstLetter: 0
    }, {
      id: 25,
      name: "שבועות",
      Ename: "Shevuot",
      length: 48,
      sederId: 3,
      sortId: 5,
      ifLastPage: true,
      firstLetter: 0
    }, {
      id: 26,
      name: "עבודה זרה",
      Ename: "Avodah Zarah",
      length: 75,
      sederId: 3,
      sortId: 6,
      ifLastPage: true,
      firstLetter: 0
    }, {
      id: 27,
      name: "הוריות",
      Ename: "Horayot",
      length: 13,
      sederId: 3,
      sortId: 7,
      ifLastPage: false,
      firstLetter: 0
    }],
    id: 3,
    name: "נזיקין",
    Ename: "Nezikin",
    icon: require("@/assets/ass10.svg")
  }, {
    childrens: [{
      id: 28,
      name: "זבחים",
      Ename: "Zevachim",
      length: 119,
      sederId: 4,
      sortId: 0,
      ifLastPage: true,
      firstLetter: 0
    }, {
      id: 29,
      name: "מנחות",
      Ename: "Menachot",
      length: 109,
      sederId: 4,
      sortId: 1,
      ifLastPage: false,
      firstLetter: 0
    }, {
      id: 30,
      name: "חולין",
      Ename: "Chullin",
      length: 141,
      sederId: 4,
      sortId: 2,
      ifLastPage: false,
      firstLetter: 0
    }, {
      id: 31,
      name: "בכורות",
      Ename: "Bekhorot",
      length: 60,
      sederId: 4,
      sortId: 3,
      ifLastPage: false,
      firstLetter: 0
    }, {
      id: 32,
      name: "ערכין",
      Ename: "Arakhin",
      length: 33,
      sederId: 4,
      sortId: 4,
      ifLastPage: false,
      firstLetter: 0
    }, {
      id: 33,
      name: "תמורה",
      Ename: "Temurah",
      length: 33,
      sederId: 4,
      sortId: 5,
      ifLastPage: false,
      firstLetter: 0
    }, {
      id: 34,
      name: "כריתות",
      Ename: "Keritot",
      length: 27,
      sederId: 4,
      sortId: 6,
      ifLastPage: true,
      firstLetter: 0
    }, {
      id: 35,
      name: "מעילה",
      Ename: "Meilah",
      length: 21,
      sederId: 4,
      sortId: 7,
      ifLastPage: false,
      firstLetter: 0
    }, {
      id: 36,
      name: "קינים",
      Ename: "kinim",
      length: 4,
      sederId: 4,
      sortId: 8,
      ifLastPage: false,
      firstLetter: 20
    }, {
      id: 38,
      name: "תמיד",
      Ename: "Tamid",
      length: 9,
      sederId: 4,
      sortId: 10,
      ifLastPage: true,
      firstLetter: 23
    }, {
      id: 37,
      name: "מידות",
      Ename: "Middot",
      length: 4,
      sederId: 4,
      sortId: 9,
      ifLastPage: true,
      firstLetter: 32
    }],
    id: 4,
    name: "קדשים",
    Ename: "Kodashim",
    icon: require("@/assets/ass9.svg")
  }, {
    childrens: [{
      id: 39,
      name: "נדה",
      Ename: "Niddah",
      length: 72,
      sederId: 5,
      sortId: 0,
      ifLastPage: false,
      firstLetter: 0
    }],
    id: 5,
    name: "טהרות",
    Ename: "Tahorot",
    icon: require("@/assets/ass8.svg")
  }]
  Hpages = ["ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "יא", "יב", "יג", "יד", "טו", "טז", "יז", "יח", "יט", "כ", "כא", "כב", "כג", "כד", "כה", "כו", "כז", "כח", "כט", "ל", "לא", "לב", "לג", "לד", "לה", "לו", "לז", "לח", "לט", "מ", "מא", "מב", "מג", "מד", "מה", "מו", "מז", "מח", "מט", "נ", "נא", "נב", "נג", "נד", "נה", "נו", "נז", "נח", "נט", "ס", "סא", "סב", "סג", "סד", "סה", "סו", "סז", "סח", "סט", "ע", "עא", "עב", "עג", "עד", "עה", "עו", "עז", "עח", "עט", "פ", "פא", "פב", "פג", "פד", "פה", "פו", "פז", "פח", "פט", "צ", "צא", "צב", "צג", "צד", "צה", "צו", "צז", "צח", "צט", "ק", "קא", "קב", "קג", "קד", "קה", "קו", "קז", "קח", "קט", "קי", "קיא", "קיב", "קיג", "קיד", "קטו", "קטז", "קיז", "קיח", "קיט", "קכ", "קכא", "קכב", "קכג", "קכד", "קכה", "קכו", "קכז", "קכח", "קכט", "קל", "קלא", "קלב", "קלג", "קלד", "קלה", "קלו", "קלז", "קלח", "קלט", "קמ", "קמא", "קמב", "קמג", "קמד", "קמה", "קמו", "קמז", "קמח", "קמט", "קנ", "קנא", "קנב", "קנג", "קנד", "קנה", "קנו", "קנז", "קנח", "קנט", "קס", "קסא", "קסב", "קסג", "קסד", "קסה", "קסו", "קסז", "קסח", "קסט", "קע", "קעא", "קעב", "קעג", "קעד", "קעה", "קעו"]
  createPages() {
    let globalIndexNumPage = 0;
    let globalIndexNumPage2 = 0;
    for (let i in this.TalmudBavliTree) {
      for (let x in this.TalmudBavliTree[i].childrens) {
        for (let indexNumPage = 0; indexNumPage < this.TalmudBavliTree[i].childrens[x].length; indexNumPage++) {
          this.allPages.push({
            indexGlobalNumPage: globalIndexNumPage,
            indexNumPage: indexNumPage,
            letterPage: this.Hpages[indexNumPage + this.TalmudBavliTree[i].childrens[x].firstLetter],
            sederId: this.TalmudBavliTree[i].id,
            sederName: this.TalmudBavliTree[i].name,
            masechetId: this.TalmudBavliTree[i].childrens[x].id,
            masechetName: this.TalmudBavliTree[i].childrens[x].name,
            masechetEname: this.TalmudBavliTree[i].childrens[x].Ename,
            pages: (() => {                                                                                                                         // fix tamid problem
              if (!this.TalmudBavliTree[i].childrens[x].ifLastPage && indexNumPage * 2 + 1 === this.TalmudBavliTree[i].childrens[x].length * 2 - 1 || this.TalmudBavliTree[i].childrens[x].name === "תמיד" && this.Hpages[indexNumPage + this.TalmudBavliTree[i].childrens[x].firstLetter] === "כה") {
                return [{
                  page: "א",
                  img: `https://hatalmudhamuklat.herokuapp.com/scripts/get-page/${globalIndexNumPage2 + 1}`,
                  lesson: "https://kiryatmo.s3.eu-west-1.amazonaws.com/3873.mp3",
                  indexPageIn: (() => {
                    globalIndexNumPage2++
                    return globalIndexNumPage2 - 1
                  })()
                }]
              } else {
                // fix kinim problem
                if(this.TalmudBavliTree[i].childrens[x].name === "קינים" && this.Hpages[indexNumPage + this.TalmudBavliTree[i].childrens[x].firstLetter] === "כב") globalIndexNumPage2 = globalIndexNumPage2 - 1
                return [{
                    page: "א",
                    img: `https://hatalmudhamuklat.herokuapp.com/scripts/get-page/${globalIndexNumPage2 + 1}`,
                    lesson: "https://kiryatmo.s3.eu-west-1.amazonaws.com/3873.mp3",
                    indexPageIn: (() => {
                      globalIndexNumPage2++
                      return globalIndexNumPage2 - 1
                    })()
                  },
                  {
                    page: "ב",
                    img: `https://hatalmudhamuklat.herokuapp.com/scripts/get-page/${globalIndexNumPage2 + 1}`,
                    lesson: "https://kiryatmo.s3.eu-west-1.amazonaws.com/3873.mp3",
                    indexPageIn: (() => {
                      globalIndexNumPage2++
                      return globalIndexNumPage2 - 1
                    })()
                  }
                ]
              }
            })()
          })
          globalIndexNumPage++
        }
      }
    }
  }
}

const talmudBavli = new TalmudBavli()

export {
  talmudBavli,
  TalmudBavli
}