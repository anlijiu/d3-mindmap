import flextree from './flextree.mjs'


const spacingVertical = 5;
const paddingX = 8;
const spacingHorizontal = 30;

const treeLayout = flextree()
  .nodeSize(node => {
    const width = node.data.width;
    const height = node.data.height;
    console.log([width, height])
    return [width, height];
  })
  .spacing((a, b) => {
    return 10;
    // return a.parent === b.parent ? spacingVertical : spacingVertical * 2;
  });

const data = {
  "nodeId": "mm-w5cior-1",
  "id": 1,
  "type": 0,
  "level": 0,
  "descr": "h1 title",
  "children": [
    {
      "nodeId": "mm-w5cior-2",
      "id": 2,
      "type": 2,
      "level": 1,
      "descr": "",
      "contents": [
        {
          "type": "text",
          "value": "alist 1 - 1\ntxt",
          "position": {
            "start": {
              "line": 4,
              "column": 3,
              "offset": 26
            },
            "end": {
              "line": 5,
              "column": 7,
              "offset": 44
            }
          }
        }
      ],
      "children": [],
      "width": 210.815625,
      "padding": 5,
      "section": 0,
      "height": 48.87999809265137
    },
    {
      "nodeId": "mm-w5cior-3",
      "id": 3,
      "type": 2,
      "level": 1,
      "descr": "",
      "contents": [
        {
          "type": "text",
          "value": "alist 1 - 2",
          "position": {
            "start": {
              "line": 6,
              "column": 3,
              "offset": 47
            },
            "end": {
              "line": 6,
              "column": 14,
              "offset": 58
            }
          }
        }
      ],
      "children": [],
      "width": 162.99375,
      "padding": 5,
      "section": 1,
      "height": 47.88999809265137
    },
    {
      "nodeId": "mm-w5cior-4",
      "id": 4,
      "type": 0,
      "level": 1,
      "descr": "h2 title",
      "children": [
        {
          "nodeId": "mm-w5cior-5",
          "id": 5,
          "type": 2,
          "level": 2,
          "descr": "",
          "contents": [
            {
              "type": "text",
              "value": "blist 2 - 1",
              "position": {
                "start": {
                  "line": 9,
                  "column": 3,
                  "offset": 78
                },
                "end": {
                  "line": 9,
                  "column": 14,
                  "offset": 89
                }
              }
            }
          ],
          "children": [],
          "width": 135.1875,
          "padding": 5,
          "section": 2,
          "height": 40.9
        },
        {
          "nodeId": "mm-w5cior-6",
          "id": 6,
          "type": 2,
          "level": 2,
          "descr": "",
          "contents": [
            {
              "type": "text",
              "value": "blist 2 - 2",
              "position": {
                "start": {
                  "line": 10,
                  "column": 3,
                  "offset": 92
                },
                "end": {
                  "line": 10,
                  "column": 14,
                  "offset": 103
                }
              }
            }
          ],
          "children": [],
          "width": 135.1875,
          "padding": 5,
          "section": 2,
          "height": 40.9
        },
        {
          "nodeId": "mm-w5cior-7",
          "id": 7,
          "type": 2,
          "level": 2,
          "descr": "",
          "contents": [
            {
              "type": "text",
              "value": "blist 3 ",
              "position": {
                "start": {
                  "line": 11,
                  "column": 3,
                  "offset": 106
                },
                "end": {
                  "line": 11,
                  "column": 11,
                  "offset": 114
                }
              }
            },
            {
              "type": "element",
              "tagName": "a",
              "properties": {
                "href": "http://localhost:4321"
              },
              "children": [
                {
                  "type": "text",
                  "value": "link",
                  "position": {
                    "start": {
                      "line": 11,
                      "column": 12,
                      "offset": 115
                    },
                    "end": {
                      "line": 11,
                      "column": 16,
                      "offset": 119
                    }
                  }
                }
              ],
              "position": {
                "start": {
                  "line": 11,
                  "column": 11,
                  "offset": 114
                },
                "end": {
                  "line": 11,
                  "column": 40,
                  "offset": 143
                }
              }
            }
          ],
          "children": [],
          "width": 102.3125,
          "padding": 5,
          "section": 2,
          "height": 66.9
        },
        {
          "nodeId": "mm-w5cior-8",
          "id": 8,
          "type": 0,
          "level": 2,
          "descr": "h3 title",
          "children": [
            {
              "nodeId": "mm-w5cior-9",
              "id": 9,
              "type": 0,
              "level": 3,
              "descr": "h4 - clist 1",
              "children": [
                {
                  "nodeId": "mm-w5cior-10",
                  "id": 10,
                  "type": 2,
                  "level": 4,
                  "descr": "",
                  "contents": [
                    {
                      "type": "text",
                      "value": "cccclist1-1",
                      "position": {
                        "start": {
                          "line": 14,
                          "column": 4,
                          "offset": 182
                        },
                        "end": {
                          "line": 14,
                          "column": 15,
                          "offset": 193
                        }
                      }
                    }
                  ],
                  "children": [],
                  "width": 127.515625,
                  "padding": 5,
                  "section": 2,
                  "height": 35.9
                },
                {
                  "nodeId": "mm-w5cior-11",
                  "id": 11,
                  "type": 2,
                  "level": 4,
                  "descr": "",
                  "contents": [
                    {
                      "type": "text",
                      "value": "cccclist1-2",
                      "position": {
                        "start": {
                          "line": 15,
                          "column": 4,
                          "offset": 197
                        },
                        "end": {
                          "line": 15,
                          "column": 15,
                          "offset": 208
                        }
                      }
                    }
                  ],
                  "children": [],
                  "width": 127.515625,
                  "padding": 5,
                  "section": 2,
                  "height": 35.9
                }
              ],
              "contents": [
                {
                  "type": "element",
                  "tagName": "h4",
                  "properties": {},
                  "children": [
                    {
                      "type": "text",
                      "value": "h4 - clist 1",
                      "position": {
                        "start": {
                          "line": 13,
                          "column": 6,
                          "offset": 166
                        },
                        "end": {
                          "line": 13,
                          "column": 18,
                          "offset": 178
                        }
                      }
                    }
                  ],
                  "position": {
                    "start": {
                      "line": 13,
                      "column": 1,
                      "offset": 161
                    },
                    "end": {
                      "line": 13,
                      "column": 18,
                      "offset": 178
                    }
                  }
                }
              ],
              "width": 136.359375,
              "padding": 5,
              "section": 2,
              "height": 37.9
            },
            {
              "nodeId": "mm-w5cior-12",
              "id": 12,
              "type": 0,
              "level": 3,
              "descr": "h4 - clist 2",
              "children": [
                {
                  "nodeId": "mm-w5cior-13",
                  "id": 13,
                  "type": 2,
                  "level": 4,
                  "descr": "",
                  "contents": [
                    {
                      "type": "text",
                      "value": "cccclist2-1",
                      "position": {
                        "start": {
                          "line": 17,
                          "column": 4,
                          "offset": 230
                        },
                        "end": {
                          "line": 17,
                          "column": 15,
                          "offset": 241
                        }
                      }
                    }
                  ],
                  "children": [],
                  "width": 127.515625,
                  "padding": 5,
                  "section": 2,
                  "height": 35.9
                },
                {
                  "nodeId": "mm-w5cior-14",
                  "id": 14,
                  "type": 2,
                  "level": 4,
                  "descr": "",
                  "contents": [
                    {
                      "type": "text",
                      "value": "cccclist2-2",
                      "position": {
                        "start": {
                          "line": 18,
                          "column": 4,
                          "offset": 245
                        },
                        "end": {
                          "line": 18,
                          "column": 15,
                          "offset": 256
                        }
                      }
                    }
                  ],
                  "children": [],
                  "width": 127.515625,
                  "padding": 5,
                  "section": 2,
                  "height": 35.9
                },
                {
                  "nodeId": "mm-w5cior-15",
                  "id": 15,
                  "type": 2,
                  "level": 4,
                  "descr": "",
                  "contents": [
                    {
                      "type": "element",
                      "tagName": "code",
                      "properties": {
                        "display": "inline"
                      },
                      "children": [
                        {
                          "type": "text",
                          "value": "inline code",
                          "position": {
                            "start": {
                              "line": 19,
                              "column": 4,
                              "offset": 260
                            },
                            "end": {
                              "line": 19,
                              "column": 17,
                              "offset": 273
                            }
                          }
                        }
                      ],
                      "position": {
                        "start": {
                          "line": 19,
                          "column": 4,
                          "offset": 260
                        },
                        "end": {
                          "line": 19,
                          "column": 17,
                          "offset": 273
                        }
                      }
                    }
                  ],
                  "children": [],
                  "width": 147.125,
                  "padding": 5,
                  "section": 2,
                  "height": 41.9
                },
                {
                  "nodeId": "mm-w5cior-16",
                  "id": 16,
                  "type": 2,
                  "level": 4,
                  "descr": "",
                  "contents": [
                    {
                      "type": "text",
                      "value": "xx",
                      "position": {
                        "start": {
                          "line": 20,
                          "column": 4,
                          "offset": 277
                        },
                        "end": {
                          "line": 20,
                          "column": 6,
                          "offset": 279
                        }
                      }
                    },
                    {
                      "type": "text",
                      "value": "\n"
                    },
                    {
                      "type": "element",
                      "tagName": "pre",
                      "properties": {
                        "style": "padding-top: .8571429em;padding-inline-end: 1.1428571em;padding-bottom: .8571429em;padding-inline-start: 1.1428571em;"
                      },
                      "children": [
                        {
                          "type": "element",
                          "tagName": "code",
                          "properties": {
                            "className": [
                              "language-javascript"
                            ]
                          },
                          "children": [
                            {
                              "type": "text",
                              "value": "console.log(\"code block\");\n"
                            }
                          ],
                          "position": {
                            "start": {
                              "line": 21,
                              "column": 4,
                              "offset": 283
                            },
                            "end": {
                              "line": 23,
                              "column": 7,
                              "offset": 334
                            }
                          }
                        }
                      ],
                      "position": {
                        "start": {
                          "line": 21,
                          "column": 4,
                          "offset": 283
                        },
                        "end": {
                          "line": 23,
                          "column": 7,
                          "offset": 334
                        }
                      }
                    },
                    {
                      "type": "text",
                      "value": "\n"
                    }
                  ],
                  "children": [],
                  "width": 327.703125,
                  "padding": 5,
                  "section": 2,
                  "height": 87.80625
                },
                {
                  "nodeId": "mm-w5cior-17",
                  "id": 17,
                  "type": 2,
                  "level": 4,
                  "descr": "",
                  "contents": [
                    {
                      "type": "text",
                      "value": "Katex - ",
                      "position": {
                        "start": {
                          "line": 24,
                          "column": 4,
                          "offset": 338
                        },
                        "end": {
                          "line": 24,
                          "column": 12,
                          "offset": 346
                        }
                      }
                    },
                    {
                      "type": "element",
                      "tagName": "mjx-container",
                      "properties": {
                        "className": [
                          "MathJax"
                        ],
                        "jax": "SVG",
                        "style": "font-size: 140%;"
                      },
                      "children": [
                        {
                          "type": "element",
                          "tagName": "svg",
                          "properties": {
                            "style": "vertical-align: -0.797ex;",
                            "xmlns": "http://www.w3.org/2000/svg",
                            "width": "14.815ex",
                            "height": "3.262ex",
                            "role": "img",
                            "focusable": "false",
                            "viewBox": "0 -1089.5 6548.3 1441.6",
                            "xmlnsXLink": "http://www.w3.org/1999/xlink"
                          },
                          "children": [
                            {
                              "type": "element",
                              "tagName": "defs",
                              "properties": {},
                              "children": [
                                {
                                  "type": "element",
                                  "tagName": "path",
                                  "properties": {
                                    "id": "MJX-1-TEX-I-1D465",
                                    "d": "M52 289Q59 331 106 386T222 442Q257 442 286 424T329 379Q371 442 430 442Q467 442 494 420T522 361Q522 332 508 314T481 292T458 288Q439 288 427 299T415 328Q415 374 465 391Q454 404 425 404Q412 404 406 402Q368 386 350 336Q290 115 290 78Q290 50 306 38T341 26Q378 26 414 59T463 140Q466 150 469 151T485 153H489Q504 153 504 145Q504 144 502 134Q486 77 440 33T333 -11Q263 -11 227 52Q186 -10 133 -10H127Q78 -10 57 16T35 71Q35 103 54 123T99 143Q142 143 142 101Q142 81 130 66T107 46T94 41L91 40Q91 39 97 36T113 29T132 26Q168 26 194 71Q203 87 217 139T245 247T261 313Q266 340 266 352Q266 380 251 392T217 404Q177 404 142 372T93 290Q91 281 88 280T72 278H58Q52 284 52 289Z"
                                  },
                                  "children": []
                                },
                                {
                                  "type": "element",
                                  "tagName": "path",
                                  "properties": {
                                    "id": "MJX-1-TEX-N-3D",
                                    "d": "M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56 332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z"
                                  },
                                  "children": []
                                },
                                {
                                  "type": "element",
                                  "tagName": "path",
                                  "properties": {
                                    "id": "MJX-1-TEX-N-2212",
                                    "d": "M84 237T84 250T98 270H679Q694 262 694 250T679 230H98Q84 237 84 250Z"
                                  },
                                  "children": []
                                },
                                {
                                  "type": "element",
                                  "tagName": "path",
                                  "properties": {
                                    "id": "MJX-1-TEX-I-1D44F",
                                    "d": "M73 647Q73 657 77 670T89 683Q90 683 161 688T234 694Q246 694 246 685T212 542Q204 508 195 472T180 418L176 399Q176 396 182 402Q231 442 283 442Q345 442 383 396T422 280Q422 169 343 79T173 -11Q123 -11 82 27T40 150V159Q40 180 48 217T97 414Q147 611 147 623T109 637Q104 637 101 637H96Q86 637 83 637T76 640T73 647ZM336 325V331Q336 405 275 405Q258 405 240 397T207 376T181 352T163 330L157 322L136 236Q114 150 114 114Q114 66 138 42Q154 26 178 26Q211 26 245 58Q270 81 285 114T318 219Q336 291 336 325Z"
                                  },
                                  "children": []
                                },
                                {
                                  "type": "element",
                                  "tagName": "path",
                                  "properties": {
                                    "id": "MJX-1-TEX-N-B1",
                                    "d": "M56 320T56 333T70 353H369V502Q369 651 371 655Q376 666 388 666Q402 666 405 654T409 596V500V353H707Q722 345 722 333Q722 320 707 313H409V40H707Q722 32 722 20T707 0H70Q56 7 56 20T70 40H369V313H70Q56 320 56 333Z"
                                  },
                                  "children": []
                                },
                                {
                                  "type": "element",
                                  "tagName": "path",
                                  "properties": {
                                    "id": "MJX-1-TEX-N-221A",
                                    "d": "M95 178Q89 178 81 186T72 200T103 230T169 280T207 309Q209 311 212 311H213Q219 311 227 294T281 177Q300 134 312 108L397 -77Q398 -77 501 136T707 565T814 786Q820 800 834 800Q841 800 846 794T853 782V776L620 293L385 -193Q381 -200 366 -200Q357 -200 354 -197Q352 -195 256 15L160 225L144 214Q129 202 113 190T95 178Z"
                                  },
                                  "children": []
                                },
                                {
                                  "type": "element",
                                  "tagName": "path",
                                  "properties": {
                                    "id": "MJX-1-TEX-N-32",
                                    "d": "M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z"
                                  },
                                  "children": []
                                },
                                {
                                  "type": "element",
                                  "tagName": "path",
                                  "properties": {
                                    "id": "MJX-1-TEX-N-34",
                                    "d": "M462 0Q444 3 333 3Q217 3 199 0H190V46H221Q241 46 248 46T265 48T279 53T286 61Q287 63 287 115V165H28V211L179 442Q332 674 334 675Q336 677 355 677H373L379 671V211H471V165H379V114Q379 73 379 66T385 54Q393 47 442 46H471V0H462ZM293 211V545L74 212L183 211H293Z"
                                  },
                                  "children": []
                                },
                                {
                                  "type": "element",
                                  "tagName": "path",
                                  "properties": {
                                    "id": "MJX-1-TEX-I-1D44E",
                                    "d": "M33 157Q33 258 109 349T280 441Q331 441 370 392Q386 422 416 422Q429 422 439 414T449 394Q449 381 412 234T374 68Q374 43 381 35T402 26Q411 27 422 35Q443 55 463 131Q469 151 473 152Q475 153 483 153H487Q506 153 506 144Q506 138 501 117T481 63T449 13Q436 0 417 -8Q409 -10 393 -10Q359 -10 336 5T306 36L300 51Q299 52 296 50Q294 48 292 46Q233 -10 172 -10Q117 -10 75 30T33 157ZM351 328Q351 334 346 350T323 385T277 405Q242 405 210 374T160 293Q131 214 119 129Q119 126 119 118T118 106Q118 61 136 44T179 26Q217 26 254 59T298 110Q300 114 325 217T351 328Z"
                                  },
                                  "children": []
                                },
                                {
                                  "type": "element",
                                  "tagName": "path",
                                  "properties": {
                                    "id": "MJX-1-TEX-I-1D450",
                                    "d": "M34 159Q34 268 120 355T306 442Q362 442 394 418T427 355Q427 326 408 306T360 285Q341 285 330 295T319 325T330 359T352 380T366 386H367Q367 388 361 392T340 400T306 404Q276 404 249 390Q228 381 206 359Q162 315 142 235T121 119Q121 73 147 50Q169 26 205 26H209Q321 26 394 111Q403 121 406 121Q410 121 419 112T429 98T420 83T391 55T346 25T282 0T202 -11Q127 -11 81 37T34 159Z"
                                  },
                                  "children": []
                                }
                              ]
                            },
                            {
                              "type": "element",
                              "tagName": "g",
                              "properties": {
                                "stroke": "currentColor",
                                "fill": "currentColor",
                                "strokeWidth": "0",
                                "transform": "scale(1,-1)"
                              },
                              "children": [
                                {
                                  "type": "element",
                                  "tagName": "g",
                                  "properties": {
                                    "dataMmlNode": "math"
                                  },
                                  "children": [
                                    {
                                      "type": "element",
                                      "tagName": "g",
                                      "properties": {
                                        "dataMmlNode": "mi"
                                      },
                                      "children": [
                                        {
                                          "type": "element",
                                          "tagName": "use",
                                          "properties": {
                                            "dataC": "1D465",
                                            "xLinkHref": "#MJX-1-TEX-I-1D465"
                                          },
                                          "children": []
                                        }
                                      ]
                                    },
                                    {
                                      "type": "element",
                                      "tagName": "g",
                                      "properties": {
                                        "dataMmlNode": "mo",
                                        "transform": "translate(849.8,0)"
                                      },
                                      "children": [
                                        {
                                          "type": "element",
                                          "tagName": "use",
                                          "properties": {
                                            "dataC": "3D",
                                            "xLinkHref": "#MJX-1-TEX-N-3D"
                                          },
                                          "children": []
                                        }
                                      ]
                                    },
                                    {
                                      "type": "element",
                                      "tagName": "g",
                                      "properties": {
                                        "dataMmlNode": "TeXAtom",
                                        "dataMjxTexclass": "ORD",
                                        "transform": "translate(1905.6,0)"
                                      },
                                      "children": [
                                        {
                                          "type": "element",
                                          "tagName": "g",
                                          "properties": {
                                            "dataMmlNode": "mfrac"
                                          },
                                          "children": [
                                            {
                                              "type": "element",
                                              "tagName": "g",
                                              "properties": {
                                                "dataMmlNode": "mrow",
                                                "transform": "translate(220,406.1) scale(0.707)"
                                              },
                                              "children": [
                                                {
                                                  "type": "element",
                                                  "tagName": "g",
                                                  "properties": {
                                                    "dataMmlNode": "mo"
                                                  },
                                                  "children": [
                                                    {
                                                      "type": "element",
                                                      "tagName": "use",
                                                      "properties": {
                                                        "dataC": "2212",
                                                        "xLinkHref": "#MJX-1-TEX-N-2212"
                                                      },
                                                      "children": []
                                                    }
                                                  ]
                                                },
                                                {
                                                  "type": "element",
                                                  "tagName": "g",
                                                  "properties": {
                                                    "dataMmlNode": "mi",
                                                    "transform": "translate(778,0)"
                                                  },
                                                  "children": [
                                                    {
                                                      "type": "element",
                                                      "tagName": "use",
                                                      "properties": {
                                                        "dataC": "1D44F",
                                                        "xLinkHref": "#MJX-1-TEX-I-1D44F"
                                                      },
                                                      "children": []
                                                    }
                                                  ]
                                                },
                                                {
                                                  "type": "element",
                                                  "tagName": "g",
                                                  "properties": {
                                                    "dataMmlNode": "mo",
                                                    "transform": "translate(1207,0)"
                                                  },
                                                  "children": [
                                                    {
                                                      "type": "element",
                                                      "tagName": "use",
                                                      "properties": {
                                                        "dataC": "B1",
                                                        "xLinkHref": "#MJX-1-TEX-N-B1"
                                                      },
                                                      "children": []
                                                    }
                                                  ]
                                                },
                                                {
                                                  "type": "element",
                                                  "tagName": "g",
                                                  "properties": {
                                                    "dataMmlNode": "msqrt",
                                                    "transform": "translate(1985,0)"
                                                  },
                                                  "children": [
                                                    {
                                                      "type": "element",
                                                      "tagName": "g",
                                                      "properties": {
                                                        "transform": "translate(853,0)"
                                                      },
                                                      "children": [
                                                        {
                                                          "type": "element",
                                                          "tagName": "g",
                                                          "properties": {
                                                            "dataMmlNode": "msup"
                                                          },
                                                          "children": [
                                                            {
                                                              "type": "element",
                                                              "tagName": "g",
                                                              "properties": {
                                                                "dataMmlNode": "mi"
                                                              },
                                                              "children": [
                                                                {
                                                                  "type": "element",
                                                                  "tagName": "use",
                                                                  "properties": {
                                                                    "dataC": "1D44F",
                                                                    "xLinkHref": "#MJX-1-TEX-I-1D44F"
                                                                  },
                                                                  "children": []
                                                                }
                                                              ]
                                                            },
                                                            {
                                                              "type": "element",
                                                              "tagName": "g",
                                                              "properties": {
                                                                "dataMmlNode": "mn",
                                                                "transform": "translate(462,289) scale(0.707)"
                                                              },
                                                              "children": [
                                                                {
                                                                  "type": "element",
                                                                  "tagName": "use",
                                                                  "properties": {
                                                                    "dataC": "32",
                                                                    "xLinkHref": "#MJX-1-TEX-N-32"
                                                                  },
                                                                  "children": []
                                                                }
                                                              ]
                                                            }
                                                          ]
                                                        },
                                                        {
                                                          "type": "element",
                                                          "tagName": "g",
                                                          "properties": {
                                                            "dataMmlNode": "mo",
                                                            "transform": "translate(865.6,0)"
                                                          },
                                                          "children": [
                                                            {
                                                              "type": "element",
                                                              "tagName": "use",
                                                              "properties": {
                                                                "dataC": "2212",
                                                                "xLinkHref": "#MJX-1-TEX-N-2212"
                                                              },
                                                              "children": []
                                                            }
                                                          ]
                                                        },
                                                        {
                                                          "type": "element",
                                                          "tagName": "g",
                                                          "properties": {
                                                            "dataMmlNode": "mn",
                                                            "transform": "translate(1643.6,0)"
                                                          },
                                                          "children": [
                                                            {
                                                              "type": "element",
                                                              "tagName": "use",
                                                              "properties": {
                                                                "dataC": "34",
                                                                "xLinkHref": "#MJX-1-TEX-N-34"
                                                              },
                                                              "children": []
                                                            }
                                                          ]
                                                        },
                                                        {
                                                          "type": "element",
                                                          "tagName": "g",
                                                          "properties": {
                                                            "dataMmlNode": "mi",
                                                            "transform": "translate(2143.6,0)"
                                                          },
                                                          "children": [
                                                            {
                                                              "type": "element",
                                                              "tagName": "use",
                                                              "properties": {
                                                                "dataC": "1D44E",
                                                                "xLinkHref": "#MJX-1-TEX-I-1D44E"
                                                              },
                                                              "children": []
                                                            }
                                                          ]
                                                        },
                                                        {
                                                          "type": "element",
                                                          "tagName": "g",
                                                          "properties": {
                                                            "dataMmlNode": "mi",
                                                            "transform": "translate(2672.6,0)"
                                                          },
                                                          "children": [
                                                            {
                                                              "type": "element",
                                                              "tagName": "use",
                                                              "properties": {
                                                                "dataC": "1D450",
                                                                "xLinkHref": "#MJX-1-TEX-I-1D450"
                                                              },
                                                              "children": []
                                                            }
                                                          ]
                                                        }
                                                      ]
                                                    },
                                                    {
                                                      "type": "element",
                                                      "tagName": "g",
                                                      "properties": {
                                                        "dataMmlNode": "mo",
                                                        "transform": "translate(0,88.9)"
                                                      },
                                                      "children": [
                                                        {
                                                          "type": "element",
                                                          "tagName": "use",
                                                          "properties": {
                                                            "dataC": "221A",
                                                            "xLinkHref": "#MJX-1-TEX-N-221A"
                                                          },
                                                          "children": []
                                                        }
                                                      ]
                                                    },
                                                    {
                                                      "type": "element",
                                                      "tagName": "rect",
                                                      "properties": {
                                                        "width": "3105.6",
                                                        "height": "42.4",
                                                        "x": "853",
                                                        "y": "846.5"
                                                      },
                                                      "children": []
                                                    }
                                                  ]
                                                }
                                              ]
                                            },
                                            {
                                              "type": "element",
                                              "tagName": "g",
                                              "properties": {
                                                "dataMmlNode": "mrow",
                                                "transform": "translate(1957.6,-345) scale(0.707)"
                                              },
                                              "children": [
                                                {
                                                  "type": "element",
                                                  "tagName": "g",
                                                  "properties": {
                                                    "dataMmlNode": "mn"
                                                  },
                                                  "children": [
                                                    {
                                                      "type": "element",
                                                      "tagName": "use",
                                                      "properties": {
                                                        "dataC": "32",
                                                        "xLinkHref": "#MJX-1-TEX-N-32"
                                                      },
                                                      "children": []
                                                    }
                                                  ]
                                                },
                                                {
                                                  "type": "element",
                                                  "tagName": "g",
                                                  "properties": {
                                                    "dataMmlNode": "mi",
                                                    "transform": "translate(500,0)"
                                                  },
                                                  "children": [
                                                    {
                                                      "type": "element",
                                                      "tagName": "use",
                                                      "properties": {
                                                        "dataC": "1D44E",
                                                        "xLinkHref": "#MJX-1-TEX-I-1D44E"
                                                      },
                                                      "children": []
                                                    }
                                                  ]
                                                }
                                              ]
                                            },
                                            {
                                              "type": "element",
                                              "tagName": "rect",
                                              "properties": {
                                                "width": "4402.7",
                                                "height": "60",
                                                "x": "120",
                                                "y": "220"
                                              },
                                              "children": []
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "children": [],
                  "width": 221.6875,
                  "padding": 5,
                  "section": 2,
                  "height": 75.071875
                },
                {
                  "nodeId": "mm-w5cior-18",
                  "id": 18,
                  "type": 2,
                  "level": 4,
                  "descr": "",
                  "contents": [
                    {
                      "type": "text",
                      "value": "Block Katex - ",
                      "position": {
                        "start": {
                          "line": 25,
                          "column": 4,
                          "offset": 388
                        },
                        "end": {
                          "line": 25,
                          "column": 18,
                          "offset": 402
                        }
                      }
                    },
                    {
                      "type": "element",
                      "tagName": "mjx-container",
                      "properties": {
                        "className": [
                          "MathJax"
                        ],
                        "jax": "SVG",
                        "style": "font-size: 140%;"
                      },
                      "children": [
                        {
                          "type": "element",
                          "tagName": "svg",
                          "properties": {
                            "style": "vertical-align: -0.797ex;",
                            "xmlns": "http://www.w3.org/2000/svg",
                            "width": "14.815ex",
                            "height": "3.262ex",
                            "role": "img",
                            "focusable": "false",
                            "viewBox": "0 -1089.5 6548.3 1441.6",
                            "xmlnsXLink": "http://www.w3.org/1999/xlink"
                          },
                          "children": [
                            {
                              "type": "element",
                              "tagName": "defs",
                              "properties": {},
                              "children": [
                                {
                                  "type": "element",
                                  "tagName": "path",
                                  "properties": {
                                    "id": "MJX-2-TEX-I-1D465",
                                    "d": "M52 289Q59 331 106 386T222 442Q257 442 286 424T329 379Q371 442 430 442Q467 442 494 420T522 361Q522 332 508 314T481 292T458 288Q439 288 427 299T415 328Q415 374 465 391Q454 404 425 404Q412 404 406 402Q368 386 350 336Q290 115 290 78Q290 50 306 38T341 26Q378 26 414 59T463 140Q466 150 469 151T485 153H489Q504 153 504 145Q504 144 502 134Q486 77 440 33T333 -11Q263 -11 227 52Q186 -10 133 -10H127Q78 -10 57 16T35 71Q35 103 54 123T99 143Q142 143 142 101Q142 81 130 66T107 46T94 41L91 40Q91 39 97 36T113 29T132 26Q168 26 194 71Q203 87 217 139T245 247T261 313Q266 340 266 352Q266 380 251 392T217 404Q177 404 142 372T93 290Q91 281 88 280T72 278H58Q52 284 52 289Z"
                                  },
                                  "children": []
                                },
                                {
                                  "type": "element",
                                  "tagName": "path",
                                  "properties": {
                                    "id": "MJX-2-TEX-N-3D",
                                    "d": "M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56 332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z"
                                  },
                                  "children": []
                                },
                                {
                                  "type": "element",
                                  "tagName": "path",
                                  "properties": {
                                    "id": "MJX-2-TEX-N-2212",
                                    "d": "M84 237T84 250T98 270H679Q694 262 694 250T679 230H98Q84 237 84 250Z"
                                  },
                                  "children": []
                                },
                                {
                                  "type": "element",
                                  "tagName": "path",
                                  "properties": {
                                    "id": "MJX-2-TEX-I-1D44F",
                                    "d": "M73 647Q73 657 77 670T89 683Q90 683 161 688T234 694Q246 694 246 685T212 542Q204 508 195 472T180 418L176 399Q176 396 182 402Q231 442 283 442Q345 442 383 396T422 280Q422 169 343 79T173 -11Q123 -11 82 27T40 150V159Q40 180 48 217T97 414Q147 611 147 623T109 637Q104 637 101 637H96Q86 637 83 637T76 640T73 647ZM336 325V331Q336 405 275 405Q258 405 240 397T207 376T181 352T163 330L157 322L136 236Q114 150 114 114Q114 66 138 42Q154 26 178 26Q211 26 245 58Q270 81 285 114T318 219Q336 291 336 325Z"
                                  },
                                  "children": []
                                },
                                {
                                  "type": "element",
                                  "tagName": "path",
                                  "properties": {
                                    "id": "MJX-2-TEX-N-B1",
                                    "d": "M56 320T56 333T70 353H369V502Q369 651 371 655Q376 666 388 666Q402 666 405 654T409 596V500V353H707Q722 345 722 333Q722 320 707 313H409V40H707Q722 32 722 20T707 0H70Q56 7 56 20T70 40H369V313H70Q56 320 56 333Z"
                                  },
                                  "children": []
                                },
                                {
                                  "type": "element",
                                  "tagName": "path",
                                  "properties": {
                                    "id": "MJX-2-TEX-N-221A",
                                    "d": "M95 178Q89 178 81 186T72 200T103 230T169 280T207 309Q209 311 212 311H213Q219 311 227 294T281 177Q300 134 312 108L397 -77Q398 -77 501 136T707 565T814 786Q820 800 834 800Q841 800 846 794T853 782V776L620 293L385 -193Q381 -200 366 -200Q357 -200 354 -197Q352 -195 256 15L160 225L144 214Q129 202 113 190T95 178Z"
                                  },
                                  "children": []
                                },
                                {
                                  "type": "element",
                                  "tagName": "path",
                                  "properties": {
                                    "id": "MJX-2-TEX-N-32",
                                    "d": "M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z"
                                  },
                                  "children": []
                                },
                                {
                                  "type": "element",
                                  "tagName": "path",
                                  "properties": {
                                    "id": "MJX-2-TEX-N-34",
                                    "d": "M462 0Q444 3 333 3Q217 3 199 0H190V46H221Q241 46 248 46T265 48T279 53T286 61Q287 63 287 115V165H28V211L179 442Q332 674 334 675Q336 677 355 677H373L379 671V211H471V165H379V114Q379 73 379 66T385 54Q393 47 442 46H471V0H462ZM293 211V545L74 212L183 211H293Z"
                                  },
                                  "children": []
                                },
                                {
                                  "type": "element",
                                  "tagName": "path",
                                  "properties": {
                                    "id": "MJX-2-TEX-I-1D44E",
                                    "d": "M33 157Q33 258 109 349T280 441Q331 441 370 392Q386 422 416 422Q429 422 439 414T449 394Q449 381 412 234T374 68Q374 43 381 35T402 26Q411 27 422 35Q443 55 463 131Q469 151 473 152Q475 153 483 153H487Q506 153 506 144Q506 138 501 117T481 63T449 13Q436 0 417 -8Q409 -10 393 -10Q359 -10 336 5T306 36L300 51Q299 52 296 50Q294 48 292 46Q233 -10 172 -10Q117 -10 75 30T33 157ZM351 328Q351 334 346 350T323 385T277 405Q242 405 210 374T160 293Q131 214 119 129Q119 126 119 118T118 106Q118 61 136 44T179 26Q217 26 254 59T298 110Q300 114 325 217T351 328Z"
                                  },
                                  "children": []
                                },
                                {
                                  "type": "element",
                                  "tagName": "path",
                                  "properties": {
                                    "id": "MJX-2-TEX-I-1D450",
                                    "d": "M34 159Q34 268 120 355T306 442Q362 442 394 418T427 355Q427 326 408 306T360 285Q341 285 330 295T319 325T330 359T352 380T366 386H367Q367 388 361 392T340 400T306 404Q276 404 249 390Q228 381 206 359Q162 315 142 235T121 119Q121 73 147 50Q169 26 205 26H209Q321 26 394 111Q403 121 406 121Q410 121 419 112T429 98T420 83T391 55T346 25T282 0T202 -11Q127 -11 81 37T34 159Z"
                                  },
                                  "children": []
                                }
                              ]
                            },
                            {
                              "type": "element",
                              "tagName": "g",
                              "properties": {
                                "stroke": "currentColor",
                                "fill": "currentColor",
                                "strokeWidth": "0",
                                "transform": "scale(1,-1)"
                              },
                              "children": [
                                {
                                  "type": "element",
                                  "tagName": "g",
                                  "properties": {
                                    "dataMmlNode": "math"
                                  },
                                  "children": [
                                    {
                                      "type": "element",
                                      "tagName": "g",
                                      "properties": {
                                        "dataMmlNode": "mi"
                                      },
                                      "children": [
                                        {
                                          "type": "element",
                                          "tagName": "use",
                                          "properties": {
                                            "dataC": "1D465",
                                            "xLinkHref": "#MJX-2-TEX-I-1D465"
                                          },
                                          "children": []
                                        }
                                      ]
                                    },
                                    {
                                      "type": "element",
                                      "tagName": "g",
                                      "properties": {
                                        "dataMmlNode": "mo",
                                        "transform": "translate(849.8,0)"
                                      },
                                      "children": [
                                        {
                                          "type": "element",
                                          "tagName": "use",
                                          "properties": {
                                            "dataC": "3D",
                                            "xLinkHref": "#MJX-2-TEX-N-3D"
                                          },
                                          "children": []
                                        }
                                      ]
                                    },
                                    {
                                      "type": "element",
                                      "tagName": "g",
                                      "properties": {
                                        "dataMmlNode": "TeXAtom",
                                        "dataMjxTexclass": "ORD",
                                        "transform": "translate(1905.6,0)"
                                      },
                                      "children": [
                                        {
                                          "type": "element",
                                          "tagName": "g",
                                          "properties": {
                                            "dataMmlNode": "mfrac"
                                          },
                                          "children": [
                                            {
                                              "type": "element",
                                              "tagName": "g",
                                              "properties": {
                                                "dataMmlNode": "mrow",
                                                "transform": "translate(220,406.1) scale(0.707)"
                                              },
                                              "children": [
                                                {
                                                  "type": "element",
                                                  "tagName": "g",
                                                  "properties": {
                                                    "dataMmlNode": "mo"
                                                  },
                                                  "children": [
                                                    {
                                                      "type": "element",
                                                      "tagName": "use",
                                                      "properties": {
                                                        "dataC": "2212",
                                                        "xLinkHref": "#MJX-2-TEX-N-2212"
                                                      },
                                                      "children": []
                                                    }
                                                  ]
                                                },
                                                {
                                                  "type": "element",
                                                  "tagName": "g",
                                                  "properties": {
                                                    "dataMmlNode": "mi",
                                                    "transform": "translate(778,0)"
                                                  },
                                                  "children": [
                                                    {
                                                      "type": "element",
                                                      "tagName": "use",
                                                      "properties": {
                                                        "dataC": "1D44F",
                                                        "xLinkHref": "#MJX-2-TEX-I-1D44F"
                                                      },
                                                      "children": []
                                                    }
                                                  ]
                                                },
                                                {
                                                  "type": "element",
                                                  "tagName": "g",
                                                  "properties": {
                                                    "dataMmlNode": "mo",
                                                    "transform": "translate(1207,0)"
                                                  },
                                                  "children": [
                                                    {
                                                      "type": "element",
                                                      "tagName": "use",
                                                      "properties": {
                                                        "dataC": "B1",
                                                        "xLinkHref": "#MJX-2-TEX-N-B1"
                                                      },
                                                      "children": []
                                                    }
                                                  ]
                                                },
                                                {
                                                  "type": "element",
                                                  "tagName": "g",
                                                  "properties": {
                                                    "dataMmlNode": "msqrt",
                                                    "transform": "translate(1985,0)"
                                                  },
                                                  "children": [
                                                    {
                                                      "type": "element",
                                                      "tagName": "g",
                                                      "properties": {
                                                        "transform": "translate(853,0)"
                                                      },
                                                      "children": [
                                                        {
                                                          "type": "element",
                                                          "tagName": "g",
                                                          "properties": {
                                                            "dataMmlNode": "msup"
                                                          },
                                                          "children": [
                                                            {
                                                              "type": "element",
                                                              "tagName": "g",
                                                              "properties": {
                                                                "dataMmlNode": "mi"
                                                              },
                                                              "children": [
                                                                {
                                                                  "type": "element",
                                                                  "tagName": "use",
                                                                  "properties": {
                                                                    "dataC": "1D44F",
                                                                    "xLinkHref": "#MJX-2-TEX-I-1D44F"
                                                                  },
                                                                  "children": []
                                                                }
                                                              ]
                                                            },
                                                            {
                                                              "type": "element",
                                                              "tagName": "g",
                                                              "properties": {
                                                                "dataMmlNode": "mn",
                                                                "transform": "translate(462,289) scale(0.707)"
                                                              },
                                                              "children": [
                                                                {
                                                                  "type": "element",
                                                                  "tagName": "use",
                                                                  "properties": {
                                                                    "dataC": "32",
                                                                    "xLinkHref": "#MJX-2-TEX-N-32"
                                                                  },
                                                                  "children": []
                                                                }
                                                              ]
                                                            }
                                                          ]
                                                        },
                                                        {
                                                          "type": "element",
                                                          "tagName": "g",
                                                          "properties": {
                                                            "dataMmlNode": "mo",
                                                            "transform": "translate(865.6,0)"
                                                          },
                                                          "children": [
                                                            {
                                                              "type": "element",
                                                              "tagName": "use",
                                                              "properties": {
                                                                "dataC": "2212",
                                                                "xLinkHref": "#MJX-2-TEX-N-2212"
                                                              },
                                                              "children": []
                                                            }
                                                          ]
                                                        },
                                                        {
                                                          "type": "element",
                                                          "tagName": "g",
                                                          "properties": {
                                                            "dataMmlNode": "mn",
                                                            "transform": "translate(1643.6,0)"
                                                          },
                                                          "children": [
                                                            {
                                                              "type": "element",
                                                              "tagName": "use",
                                                              "properties": {
                                                                "dataC": "34",
                                                                "xLinkHref": "#MJX-2-TEX-N-34"
                                                              },
                                                              "children": []
                                                            }
                                                          ]
                                                        },
                                                        {
                                                          "type": "element",
                                                          "tagName": "g",
                                                          "properties": {
                                                            "dataMmlNode": "mi",
                                                            "transform": "translate(2143.6,0)"
                                                          },
                                                          "children": [
                                                            {
                                                              "type": "element",
                                                              "tagName": "use",
                                                              "properties": {
                                                                "dataC": "1D44E",
                                                                "xLinkHref": "#MJX-2-TEX-I-1D44E"
                                                              },
                                                              "children": []
                                                            }
                                                          ]
                                                        },
                                                        {
                                                          "type": "element",
                                                          "tagName": "g",
                                                          "properties": {
                                                            "dataMmlNode": "mi",
                                                            "transform": "translate(2672.6,0)"
                                                          },
                                                          "children": [
                                                            {
                                                              "type": "element",
                                                              "tagName": "use",
                                                              "properties": {
                                                                "dataC": "1D450",
                                                                "xLinkHref": "#MJX-2-TEX-I-1D450"
                                                              },
                                                              "children": []
                                                            }
                                                          ]
                                                        }
                                                      ]
                                                    },
                                                    {
                                                      "type": "element",
                                                      "tagName": "g",
                                                      "properties": {
                                                        "dataMmlNode": "mo",
                                                        "transform": "translate(0,88.9)"
                                                      },
                                                      "children": [
                                                        {
                                                          "type": "element",
                                                          "tagName": "use",
                                                          "properties": {
                                                            "dataC": "221A",
                                                            "xLinkHref": "#MJX-2-TEX-N-221A"
                                                          },
                                                          "children": []
                                                        }
                                                      ]
                                                    },
                                                    {
                                                      "type": "element",
                                                      "tagName": "rect",
                                                      "properties": {
                                                        "width": "3105.6",
                                                        "height": "42.4",
                                                        "x": "853",
                                                        "y": "846.5"
                                                      },
                                                      "children": []
                                                    }
                                                  ]
                                                }
                                              ]
                                            },
                                            {
                                              "type": "element",
                                              "tagName": "g",
                                              "properties": {
                                                "dataMmlNode": "mrow",
                                                "transform": "translate(1957.6,-345) scale(0.707)"
                                              },
                                              "children": [
                                                {
                                                  "type": "element",
                                                  "tagName": "g",
                                                  "properties": {
                                                    "dataMmlNode": "mn"
                                                  },
                                                  "children": [
                                                    {
                                                      "type": "element",
                                                      "tagName": "use",
                                                      "properties": {
                                                        "dataC": "32",
                                                        "xLinkHref": "#MJX-2-TEX-N-32"
                                                      },
                                                      "children": []
                                                    }
                                                  ]
                                                },
                                                {
                                                  "type": "element",
                                                  "tagName": "g",
                                                  "properties": {
                                                    "dataMmlNode": "mi",
                                                    "transform": "translate(500,0)"
                                                  },
                                                  "children": [
                                                    {
                                                      "type": "element",
                                                      "tagName": "use",
                                                      "properties": {
                                                        "dataC": "1D44E",
                                                        "xLinkHref": "#MJX-2-TEX-I-1D44E"
                                                      },
                                                      "children": []
                                                    }
                                                  ]
                                                }
                                              ]
                                            },
                                            {
                                              "type": "element",
                                              "tagName": "rect",
                                              "properties": {
                                                "width": "4402.7",
                                                "height": "60",
                                                "x": "120",
                                                "y": "220"
                                              },
                                              "children": []
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "children": [],
                  "width": 221.6875,
                  "padding": 5,
                  "section": 2,
                  "height": 75.071875
                },
                {
                  "nodeId": "mm-w5cior-19",
                  "id": 19,
                  "type": 0,
                  "level": 4,
                  "descr": "h5 title",
                  "children": [
                    {
                      "nodeId": "mm-w5cior-20",
                      "id": 20,
                      "type": 2,
                      "level": 5,
                      "descr": "",
                      "contents": [
                        {
                          "type": "text",
                          "value": "ddddd 1",
                          "position": {
                            "start": {
                              "line": 28,
                              "column": 3,
                              "offset": 461
                            },
                            "end": {
                              "line": 28,
                              "column": 10,
                              "offset": 468
                            }
                          }
                        }
                      ],
                      "children": [],
                      "width": 99.28125,
                      "padding": 5,
                      "section": 2,
                      "height": 33.9
                    },
                    {
                      "nodeId": "mm-w5cior-21",
                      "id": 21,
                      "type": 2,
                      "level": 5,
                      "descr": "",
                      "contents": [
                        {
                          "type": "text",
                          "value": "ddddd 2",
                          "position": {
                            "start": {
                              "line": 29,
                              "column": 3,
                              "offset": 471
                            },
                            "end": {
                              "line": 29,
                              "column": 10,
                              "offset": 478
                            }
                          }
                        },
                        {
                          "type": "text",
                          "value": "\n"
                        },
                        {
                          "type": "text",
                          "value": "\n"
                        }
                      ],
                      "children": [
                        {
                          "nodeId": "mm-w5cior-22",
                          "id": 22,
                          "type": 2,
                          "level": 6,
                          "descr": "",
                          "contents": [
                            {
                              "type": "text",
                              "value": "eeee1",
                              "position": {
                                "start": {
                                  "line": 30,
                                  "column": 6,
                                  "offset": 484
                                },
                                "end": {
                                  "line": 30,
                                  "column": 11,
                                  "offset": 489
                                }
                              }
                            }
                          ],
                          "children": [],
                          "width": 84.796875,
                          "padding": 5,
                          "section": 2,
                          "height": 33.9
                        },
                        {
                          "nodeId": "mm-w5cior-23",
                          "id": 23,
                          "type": 2,
                          "level": 6,
                          "descr": "",
                          "contents": [
                            {
                              "type": "text",
                              "value": "eeee2",
                              "position": {
                                "start": {
                                  "line": 31,
                                  "column": 6,
                                  "offset": 495
                                },
                                "end": {
                                  "line": 31,
                                  "column": 11,
                                  "offset": 500
                                }
                              }
                            }
                          ],
                          "children": [],
                          "width": 84.796875,
                          "padding": 5,
                          "section": 2,
                          "height": 33.9
                        }
                      ],
                      "width": 99.28125,
                      "padding": 5,
                      "section": 2,
                      "height": 33.9
                    }
                  ],
                  "contents": [
                    {
                      "type": "element",
                      "tagName": "h5",
                      "properties": {},
                      "children": [
                        {
                          "type": "text",
                          "value": "h5 title",
                          "position": {
                            "start": {
                              "line": 27,
                              "column": 7,
                              "offset": 450
                            },
                            "end": {
                              "line": 27,
                              "column": 15,
                              "offset": 458
                            }
                          }
                        }
                      ],
                      "position": {
                        "start": {
                          "line": 27,
                          "column": 1,
                          "offset": 444
                        },
                        "end": {
                          "line": 27,
                          "column": 15,
                          "offset": 458
                        }
                      }
                    }
                  ],
                  "width": 100.912109375,
                  "padding": 5,
                  "section": 2,
                  "height": 35.9
                }
              ],
              "contents": [
                {
                  "type": "element",
                  "tagName": "h4",
                  "properties": {},
                  "children": [
                    {
                      "type": "text",
                      "value": "h4 - clist 2",
                      "position": {
                        "start": {
                          "line": 16,
                          "column": 6,
                          "offset": 214
                        },
                        "end": {
                          "line": 16,
                          "column": 18,
                          "offset": 226
                        }
                      }
                    }
                  ],
                  "position": {
                    "start": {
                      "line": 16,
                      "column": 1,
                      "offset": 209
                    },
                    "end": {
                      "line": 16,
                      "column": 18,
                      "offset": 226
                    }
                  }
                }
              ],
              "width": 136.359375,
              "padding": 5,
              "section": 2,
              "height": 37.9
            }
          ],
          "contents": [
            {
              "type": "element",
              "tagName": "h3",
              "properties": {},
              "children": [
                {
                  "type": "text",
                  "value": "h3 ",
                  "position": {
                    "start": {
                      "line": 12,
                      "column": 5,
                      "offset": 148
                    },
                    "end": {
                      "line": 12,
                      "column": 8,
                      "offset": 151
                    }
                  }
                },
                {
                  "type": "element",
                  "tagName": "del",
                  "properties": {},
                  "children": [
                    {
                      "type": "text",
                      "value": "title",
                      "position": {
                        "start": {
                          "line": 12,
                          "column": 10,
                          "offset": 153
                        },
                        "end": {
                          "line": 12,
                          "column": 15,
                          "offset": 158
                        }
                      }
                    }
                  ],
                  "position": {
                    "start": {
                      "line": 12,
                      "column": 8,
                      "offset": 151
                    },
                    "end": {
                      "line": 12,
                      "column": 17,
                      "offset": 160
                    }
                  }
                }
              ],
              "position": {
                "start": {
                  "line": 12,
                  "column": 1,
                  "offset": 144
                },
                "end": {
                  "line": 12,
                  "column": 17,
                  "offset": 160
                }
              }
            }
          ],
          "width": 113.90625,
          "padding": 5,
          "section": 2,
          "height": 40.9
        }
      ],
      "contents": [
        {
          "type": "element",
          "tagName": "h2",
          "properties": {},
          "children": [
            {
              "type": "text",
              "value": "h2 ",
              "position": {
                "start": {
                  "line": 8,
                  "column": 4,
                  "offset": 63
                },
                "end": {
                  "line": 8,
                  "column": 7,
                  "offset": 66
                }
              }
            },
            {
              "type": "element",
              "tagName": "strong",
              "properties": {},
              "children": [
                {
                  "type": "text",
                  "value": "title",
                  "position": {
                    "start": {
                      "line": 8,
                      "column": 9,
                      "offset": 68
                    },
                    "end": {
                      "line": 8,
                      "column": 14,
                      "offset": 73
                    }
                  }
                }
              ],
              "position": {
                "start": {
                  "line": 8,
                  "column": 7,
                  "offset": 66
                },
                "end": {
                  "line": 8,
                  "column": 16,
                  "offset": 75
                }
              }
            }
          ],
          "position": {
            "start": {
              "line": 8,
              "column": 1,
              "offset": 60
            },
            "end": {
              "line": 8,
              "column": 16,
              "offset": 75
            }
          }
        }
      ],
      "width": 133.640625,
      "padding": 5,
      "section": 2,
      "height": 46.899998092651366
    }
  ],
  "contents": [
    {
      "type": "element",
      "tagName": "h1",
      "properties": {},
      "children": [
        {
          "type": "text",
          "value": "h1 ",
          "position": {
            "start": {
              "line": 1,
              "column": 3,
              "offset": 2
            },
            "end": {
              "line": 1,
              "column": 6,
              "offset": 5
            }
          }
        },
        {
          "type": "element",
          "tagName": "em",
          "properties": {},
          "children": [
            {
              "type": "text",
              "value": "title",
              "position": {
                "start": {
                  "line": 1,
                  "column": 7,
                  "offset": 6
                },
                "end": {
                  "line": 1,
                  "column": 12,
                  "offset": 11
                }
              }
            }
          ],
          "position": {
            "start": {
              "line": 1,
              "column": 6,
              "offset": 5
            },
            "end": {
              "line": 1,
              "column": 13,
              "offset": 12
            }
          }
        }
      ],
      "position": {
        "start": {
          "line": 1,
          "column": 1,
          "offset": 0
        },
        "end": {
          "line": 1,
          "column": 13,
          "offset": 12
        }
      }
    }
  ],
  "width": 175.996875,
  "padding": 5,
  "section": -1,
  "height": 61.870000000000005
};

const tree = treeLayout.hierarchy(data);

console.log('111 tree:', tree)
treeLayout(tree);
console.log('222', tree);
