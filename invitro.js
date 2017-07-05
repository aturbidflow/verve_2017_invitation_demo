window.demo = function()
{
	var engine = new Engine(),
		$config =
			{
				path: './assets/',
				mapZoom: 1,
				audio: (new Audio().canPlayType('audio/mp3') === '') ? 'ogg' : 'mp3'
			},
		assets = 
			{
				audio: [ 'invitro', 'search', 'in', 'out', 'found' ],
				images: [ 'map0.png', 'map1.png', 'map2.png', 'grach.png', 'demo.png', 'retro.png', 'bug.png', 'verve2017.png' ]
			},
		storage = {}

	/* DEMO */

	window.addEventListener('resize', function (){
		engine.init()
	})

	engine.init()
	engine.audio.list(assets.audio)
	engine.image.list(assets.images)

	engine.audio.acts({
		'1.0': 
			{
				pre: function ( state )
					{
						state.r = 0
						state.g = 0
						state.b = 0
					},
				frame: function ( state )
					{
						storage.bg = 'rgb(' + Math.round(state.r) + ',' + Math.round(state.g) + ',' + Math.round(state.b) + ')'

						engine.cls( storage.bg )

						state.r += 0.2
						state.g += 0.3
						state.b += 0.31
					}
			},
		'4.0': Glitcher(5, {
				pre: function ( state )
					{
						state.a = 0
						storage.mapOffset = [820, 168]
						state.scale = $config.mapZoom

						engine.audio.play(2, false)

						state.offset = {
							x: storage.mapOffset[0] * $config.mapZoom * -1,
							y: storage.mapOffset[1] * $config.mapZoom  * -1
						}
					},
				frame: function ( state )
					{
						state.alpha = state.a
						state.a += 0.01

						storage.mapOffset[0] += 0.1 * $config.mapZoom 
						storage.mapOffset[1] -= 0.05 * $config.mapZoom 

						state.offset = {
							x: storage.mapOffset[0] * $config.mapZoom  * -1,
							y: storage.mapOffset[1] * $config.mapZoom  * -1
						}
					},
				add: function ( state )
					{
						var text = "......".substr(0, Math.round(state.frame / 10))
						engine.text(text, storage.monofont + "px monospace", 30, storage.height - storage.monofont, '#fff')
					}
			}),
		'8.0': MoveMap([320, 208], 2.4, function ( state ) {
				var text = "Searching...".substr(0, Math.round(state.frame / 3))
				engine.text(text, storage.monofont + "px monospace", 30, storage.height - storage.monofont, '#fff')
			}),
		'10.5': MoveMap([341, 272], 2.5, _searchingText),
		'13.0': MoveMap([341, 471], 0.5, _searchingText),
		'13.5': MoveMap([341, 458], 3, _searchingText),
		'16.5': MoveMap([736, 536], 1.5, _searchingText),
		'18.0': MoveMap([742, 540], 2.5, _searchingText),
		'20.5': MoveMap([524, 689], 3.5, _searchingText),
		'22.0': MoveMap([499, 659], 2.5, _searchingText),
		'27.5': MoveMap([399, 769], 2.5, _searchingText),
		'30.0': MoveMap([415, 753], 2.5, _searchingText),
		'32.5': MoveMap([415, 935], 2.0, function ( state ) {
				engine.audio.stop(1)
				engine.audio.play(4)
				_receivingText(state, false)
			}),
		'33.5': MoveMap([416, 936], 1.0, function ( state ) {
				engine.audio.stop(1)
				_receivingText(state, false)
			}),
		'34.5': Glitcher(5, {
				pre: function ( state )
					{
						state.alpha = 1
						state.subalpha = 0
						state.scale = 1
						state.subscale = 0.5

						engine.audio.play(2)

						state.offset =
							{
								x: -storage.mapOffset[0] * state.scale,
								y: -storage.mapOffset[1] * state.scale
							}
					},
				frame: function ( state )
					{
						;(state.subscale < 1) && (state.subscale += 0.05)
						;(state.subalpha < 1) && (state.subalpha += 0.1)
						;(state.alpha > 1) && (state.alpha -= 0.1)
					},
				add: function ( state )
					{
						engine.sprt({
								index: 6,
								x: 640 - storage.width / 2 / state.subscale,
								y: 320 - storage.height / 2 / state.subscale,
								width: storage.width / state.subscale,
								height: storage.height / state.subscale
							},
							{
								x: 0,
								y: 0,
								width: storage.width,
								height: storage.height
							}, 
							{
								alpha: state.subalpha
							})

						_receivingText(state ,false)
					}
			}),
		'35.0': Glitcher(6, {
				pre: function ( state )
					{
						state.scale = 2

						state.offset = {
							x: -640,
							y: -320
						}
					},
				frame: function ( state )
					{
					},
				add: function ( state )
					{
						_receivingText(state ,false)
					}
			}),
		'36.5': Glitcher(6, {
				pre: function ( state )
					{
						state.alpha = 1
						state.subalpha = 0
						state.scale = 2
						state.subscale = 0.5

						engine.audio.stop(1)
						engine.audio.play(2)

						state.offset = {
							x: -640,
							y: -320
						}
					},
				frame: function ( state )
					{
						;(state.subscale < 1) && (state.subscale += 0.05)
						;(state.subalpha < 1) && (state.subalpha += 0.1)
						;(state.alpha > 0) && (state.alpha -= 0.1)
					},
				add: function ( state )
					{
						engine.sprt({
								index: 7,
								x: 1280 / 2 - storage.width / 2 / state.subscale,
								y: 640 / 2 - storage.height / 2 / state.subscale,
								width: storage.width / state.subscale,
								height: storage.height / state.subscale
							},
							{
								x: 0,
								y: 0,
								width: storage.width,
								height: storage.height
							}, 
							{
								alpha: state.subalpha
							})

						_receivingText(state ,false)
					}
			}),
		'37.0': Glitcher(7, {
				pre: function ( state )
					{
						state.scale = 2
						state.err = 1

						state.offset = {
							x: -640,
							y: -320
						}

						engine.audio.play(4)
					},
				frame: function ( state )
					{
					},
				add: function ( state )
					{

						var frame = state.frame / 2

						_receivingText(state ,true)

						engine.text("NAME: { CENSORED }".substr(0, (frame)/2), storage.monofont + "px monospace", 30, storage.monofont * 2, '#fff')

						;(frame > 20) && (engine.text("PLACE: UNKNOWN".substr(0, (frame - 20)/2), storage.monofont + "px monospace", 30, storage.monofont * 3, '#fff'))
						;(frame > 60 && frame < 65) && (engine.audio.play(4))
						;(frame > 60) && (engine.text("CITY: VORONEZH".substr(0, (frame - 60)/2), storage.monofont + "px monospace", 30, storage.monofont * 4, '#fff'))
						;(frame > 100 && frame < 110) && (engine.text("TYPE: ...".substr(0, (frame - 100)/2), storage.monofont + "px monospace", 30, storage.monofont * 5, '#fff'))
						;(frame > 110 && frame < 120) && (engine.text("TYPE: ...demoparty", storage.monofont + "px monospace", 30, storage.monofont * 5, '#fff'))
						;(frame > 120 && frame < 130) && (engine.text("TYPE: ...demopartyconvent", storage.monofont + "px monospace", 30, storage.monofont * 5, '#fff'))
						;(frame > 130 && frame < 140) && (engine.text("TYPE: ...demopartyconventeducation", storage.monofont + "px monospace", 30, storage.monofont * 5, '#fff'))
						;(frame > 140 && frame < 150) && (engine.text("TYPE: ...demopartyconventeducationafterparty", storage.monofont + "px monospace", 30, storage.monofont * 5, '#fff'))
						;(frame > 150 && frame < 160) && (engine.text("TYPE: ...demopartyconventeducationafterpartyexposition", storage.monofont + "px monospace", 30, storage.monofont * 5, '#fff'))
						if(frame > 160) {
							engine.text("TYPE: ...demopartyconventeducationafterpartyexposition" + Array(state.err).join(' ЕГГОГ '), storage.monofont + "px monospace", 30, storage.monofont * 5, '#f00')
							state.err = (state.err < 100) ? state.err + 1 : 90
						}
						for (var i = 0; i < Math.round(state.err / 10); i++ )
						{
							engine.text(Array(state.err - Math.floor(state.err / 10) * 10).join(' ЕГГОГ '), storage.monofont + "px monospace", 30, storage.monofont * 6 + i * storage.monofont, '#f00')
						}

						if (storage.alarm)
						{
							engine.text('ALARMA', storage.width / 10 + "px 'AFMC Font'", storage.width / 2, storage.height / 2 + storage.width / 20, 'red', 'center')
						}
					}
			}),
		'55.0':
			{
				hold: true,
				pre: function ( state )
					{
						storage.alarm = true
					},
				frame: function () {}
			},
		'55.5':
			{
				hold: true,
				pre: function ( state )
					{
						storage.alarm = false
					},
				frame: function () {}
			},
		'56.25':
			{
				hold: true,
				pre: function ( state )
					{
						storage.alarm = true
					},
				frame: function () {}
			},
		'56.75':
			{
				hold: true,
				pre: function ( state )
					{
						storage.alarm = false
					},
				frame: function () {}
			},
		'57.75':
			{
				hold: true,
				pre: function ( state )
					{
						storage.alarm = true
					},
				frame: function () {}
			},
		'58.25':
			{
				hold: true,
				pre: function ( state )
					{
						storage.alarm = false
					},
				frame: function () {}
			},
		'59.0':
			{
				hold: true,
				pre: function ( state )
					{
						storage.alarm = true
					},
				frame: function () {}
			},
		'59.5':
			{
				hold: true,
				pre: function ( state )
					{
						storage.alarm = false
					},
				frame: function () {}
			},
		'60.5':
			{
				pre: function ( state )
					{
						engine.flush()
					},
				frame: function () {
					engine.cls('#000')
					engine.text('STOP', storage.width / 15 + "px 'AFMC Font'", 30, storage.height / 2, '#ed1c24')
				}
			},
		'61.0':
			{
				pre: function ( state )
					{
					},
				frame: function () {
						engine.cls('#000')
					engine.text('STOP', storage.width / 15 + "px 'AFMC Font'", 30, storage.height / 2, '#ed1c24')
					engine.text('TALK', storage.width / 25 + "px 'AFMC Font'", storage.width / 2, storage.height / 2 - storage.width / 60, 'white')
				}
			},
		'61.5':
			{
				pre: function ( state )
					{
					},
				frame: function () {
						engine.cls('#000')
					engine.text('STOP', storage.width / 15 + "px 'AFMC Font'", 30, storage.height / 2, '#ed1c24')
					engine.text('TALK', storage.width / 25 + "px 'AFMC Font'", storage.width / 2, storage.height / 2 - storage.width / 60, 'white')
					engine.text('TALKING', storage.width / 25 + "px 'AFMC Font'", storage.width / 2, storage.height / 2 - storage.width / 60, 'white')
				}
			},
		'61.75':
			{
				pre: function ( state )
					{
					},
				frame: function () {
						engine.cls('#000')
					engine.text('STOP', storage.width / 15 + "px 'AFMC Font'", 30, storage.height / 2, '#ed1c24')
					engine.text('TALK', storage.width / 25 + "px 'AFMC Font'", storage.width / 2, storage.height / 2 - storage.width / 60, 'white')
					engine.text('TALKING', storage.width / 25 + "px 'AFMC Font'", storage.width / 2, storage.height / 2 - storage.width / 60, 'white')
					engine.text('START', storage.width / 15 + "px 'AFMC Font'", 30, storage.height / 2 + storage.width / 15, '#7bd021')
				}
			},
		'62.5':
			{
				pre: function ( state )
					{
					},
				frame: function () {
						engine.cls('#000')
					engine.text('STOP', storage.width / 15 + "px 'AFMC Font'", 30, storage.height / 2, '#ed1c24')
					engine.text('TALK', storage.width / 25 + "px 'AFMC Font'", storage.width / 2, storage.height / 2 - storage.width / 60, 'white')
					engine.text('TALKING', storage.width / 25 + "px 'AFMC Font'", storage.width / 2, storage.height / 2 - storage.width / 60, 'white')
					engine.text('START', storage.width / 15 + "px 'AFMC Font'", 30, storage.height / 2 + storage.width / 15, '#7bd021')
					engine.text('MU', storage.width / 20 + "px 'AFMC Font'", storage.width / 2 + storage.width / 15, storage.height / 2 + storage.width / 20, '#48e9e9')
				}
			},
		'62.75':
			{
				pre: function ( state )
					{
					},
				frame: function () {
						engine.cls('#000')
					engine.text('STOP', storage.width / 15 + "px 'AFMC Font'", 30, storage.height / 2, '#ed1c24')
					engine.text('TALK', storage.width / 25 + "px 'AFMC Font'", storage.width / 2, storage.height / 2 - storage.width / 60, 'white')
					engine.text('TALKING', storage.width / 25 + "px 'AFMC Font'", storage.width / 2, storage.height / 2 - storage.width / 60, 'white')
					engine.text('START', storage.width / 15 + "px 'AFMC Font'", 30, storage.height / 2 + storage.width / 15, '#7bd021')
					engine.text('..._SIC', storage.width / 20 + "px 'AFMC Font'", storage.width / 2 + storage.width / 15, storage.height / 2 + storage.width / 20, '#f7941d')
					engine.text('MU', storage.width / 20 + "px 'AFMC Font'", storage.width / 2 + storage.width / 15, storage.height / 2 + storage.width / 20, '#48e9e9')
				}
			},
		'63.25':
			{
				pre: function ( state )
					{
						state.rects = []
						state.clear = {
							r: 43,
							g: 32,
							b: 49
						}
						engine.flush()
					},
				frame: function ( state )
					{
						engine.cls('rgb(' + state.clear.r + ',' + state.clear.g + ',' + state.clear.b + ')')

						storage.rects = state.rects
						storage.clear = state.clear
					}
			},
		'63.5':
			{
				pre: function ( state )
					{
						state.rects = storage.rects
						state.clear = storage.clear

						state.opacity = 0

						for (var i = 0; i < 100; i++)
						{
							state.rects.push({
								x: Math.random() * storage.width, 
								y: Math.random() * storage.height,
								size: storage.height / 10,
								color: 'rgb(' + Math.round(Math.random() * 3) * 85 + ','  + Math.round(Math.random() * 3) * 85 + ',' + Math.round(Math.random() * 3) * 85 + ')',
								speed: Math.random() * 40 + 10,
								mode: 'color-dodge',
								alpha: 0.2,
								angle: Math.random() * 360
							})
						}
					},
				frame: function ( state )
					{
						_boxes(state, [1, 0], true, true)

						engine.text('HELLO'.substr(0, Math.round(state.frame / 3)), storage.width / 20 + "px 'AFMC Font'", storage.width, storage.height / 4, '#fff', 'right', state.opacity)
						state.opacity = (state.opacity < 1) ? state.opacity + 0.01 : 1

						storage.rects = state.rects
						storage.clear = state.clear
					}
			},
		'66.25':
			{
				pre: function ( state )
					{
						state.rects = storage.rects
						state.clear = storage.clear

						engine.flush()

						state.opacity = 0
					},
				frame: function ( state )
					{
						_boxes(state, [1, -1], true, true)
						
						engine.text('HELLO', storage.width / 20 + "px 'AFMC Font'", storage.width, storage.height / 4, '#fff', 'right', 1)
						engine.text('We proudly introduce'.substr(0, Math.round(state.frame / 3)), storage.width / 40 + "px 'AFMC Font'", storage.width, storage.height / 4 + storage.height / 10, '#fff', 'right', state.opacity)

						state.opacity = (state.opacity < 1) ? state.opacity + 0.01 : 1

						storage.rects = state.rects
						storage.clear = state.clear
					}
			},
		'69.0':
			{
				pre: function ( state )
					{
						state.rects = storage.rects
						state.clear = storage.clear

						engine.flush()

						state.opacity = 0
					},
				frame: function ( state )
					{
						_boxes(state, [-0.5, 1], false, false)

						engine.text('HELLO', storage.width / 20 + "px 'AFMC Font'", storage.width, storage.height / 4, '#fff', 'right', 1)
						engine.text('We proudly introduce', storage.width / 40 + "px 'AFMC Font'", storage.width, storage.height / 4 + storage.height / 10, '#fff', 'right', 1)
						engine.text('the extra mainstream'.substr(0, Math.round(state.frame / 3)), storage.width / 40 + "px 'AFMC Font'", storage.width, storage.height / 4 + (storage.height / 10) * 2, '#fff', 'right', state.opacity)

						state.opacity = (state.opacity < 1) ? state.opacity + 0.01 : 1

						storage.rects = state.rects
						storage.clear = state.clear
					}
			},
		'71.75':
			{
				pre: function ( state )
					{
						state.rects = storage.rects
						state.clear = storage.clear

						engine.flush()

						state.opacity = 0
					},
				frame: function ( state )
					{
						_boxes(state, [1, 1], true, false)

						engine.text('HELLO', storage.width / 20 + "px 'AFMC Font'", storage.width, storage.height / 4, '#fff', 'right', 1)
						engine.text('We proudly introduce', storage.width / 40 + "px 'AFMC Font'", storage.width, storage.height / 4 + storage.height / 10, '#fff', 'right', 1)
						engine.text('the extra mainstream', storage.width / 40 + "px 'AFMC Font'", storage.width, storage.height / 4 + (storage.height / 10) * 2, '#fff', 'right', 1)
						engine.text('and super boring'.substr(0, Math.round(state.frame / 3)), storage.width / 40 + "px 'AFMC Font'", storage.width, storage.height / 4 + (storage.height / 10) * 3, '#fff', 'right', state.opacity)

						state.opacity = (state.opacity < 1) ? state.opacity + 0.01 : 1

						storage.rects = state.rects
						storage.clear = state.clear
					}
			},
		'74.5':
			{
				pre: function ( state )
					{
						state.rects = storage.rects
						state.clear = storage.clear

						engine.flush()

						for (var i = 0; i < state.rects.length; i++)
						{
							state.rects[i].alpha = 0.7
						}

						state.opacity = 0
					},
				frame: function ( state )
					{
						_boxes(state, [1, 1], (state.frame % 11 === 0), true)

						engine.text('HELLO', storage.width / 20 + "px 'AFMC Font'", storage.width, storage.height / 4, '#fff', 'right', 1)
						engine.text('We proudly introduce', storage.width / 40 + "px 'AFMC Font'", storage.width, storage.height / 4 + storage.height / 10, '#fff', 'right', 1)
						engine.text('the extra mainstream', storage.width / 40 + "px 'AFMC Font'", storage.width, storage.height / 4 + (storage.height / 10) * 2, '#fff', 'right', 1)
						engine.text('and super boring', storage.width / 40 + "px 'AFMC Font'", storage.width, storage.height / 4 + (storage.height / 10) * 3, '#fff', 'right', 1)
						engine.text('PARTY', storage.width / 20 + "px 'AFMC Font'", storage.width, storage.height / 4 + (storage.height / 10) * 5, '#fff', 'right', state.opacity)

						state.opacity = (state.opacity < 1) ? state.opacity + 0.01 : 1

						storage.rects = state.rects
						storage.clear = state.clear
					}
			},
		'77.25':
			{
				pre: function ( state )
					{
						state.rects = storage.rects
						state.clear = storage.clear

						engine.flush()
					},
				frame: function ( state )
					{
						_boxes(state, [1, 1], (state.frame % 11 === 0), true)

						engine.text('HELLO', storage.width / 20 + "px 'AFMC Font'", storage.width, storage.height / 4 + state.glitch, 'rgb(' + state.clear.r + ',' + state.clear.g + ',' + state.clear.b + ')', 'right', 1)
						engine.text('We proudly introduce', storage.width / 40 + "px 'AFMC Font'", storage.width, storage.height / 4 + storage.height / 10 + state.glitch, 'rgb(' + state.clear.r + ',' + state.clear.g + ',' + state.clear.b + ')', 'right', 1)
						engine.text('the extra mainstream', storage.width / 40 + "px 'AFMC Font'", storage.width, storage.height / 4 + (storage.height / 10) * 2 + state.glitch, 'rgb(' + state.clear.r + ',' + state.clear.g + ',' + state.clear.b + ')', 'right', 1)
						engine.text('and super boring', storage.width / 40 + "px 'AFMC Font'", storage.width, storage.height / 4 + (storage.height / 10) * 3 + state.glitch, 'rgb(' + state.clear.r + ',' + state.clear.g + ',' + state.clear.b + ')', 'right', 1)
						engine.text('PARTY', storage.width / 20 + "px 'AFMC Font'", storage.width, storage.height / 4 + (storage.height / 10) * 5 + state.glitch, 'rgb(' + state.clear.r + ',' + state.clear.g + ',' + state.clear.b + ')', 'right', 1)

						state.glitch = Math.random() * 10 - 5

						engine.text('HELLO', storage.width / 20 + "px 'AFMC Font'", storage.width, storage.height / 4 + state.glitch, '#fff', 'right', 1)
						engine.text('We proudly introduce', storage.width / 40 + "px 'AFMC Font'", storage.width, storage.height / 4 + storage.height / 10 + state.glitch, '#fff', 'right', 1)
						engine.text('the extra mainstream', storage.width / 40 + "px 'AFMC Font'", storage.width, storage.height / 4 + (storage.height / 10) * 2 + state.glitch, '#fff', 'right', 1)
						engine.text('and super boring', storage.width / 40 + "px 'AFMC Font'", storage.width, storage.height / 4 + (storage.height / 10) * 3 + state.glitch, '#fff', 'right', 1)
						engine.text('PARTY', storage.width / 20 + "px 'AFMC Font'", storage.width, storage.height / 4 + (storage.height / 10) * 5 + state.glitch, '#fff', 'right', 1)

						storage.rects = state.rects
						storage.clear = state.clear
					}
			},
		'79.75':
			{
				pre: function ( state )
					{
						state.rects = storage.rects
						state.clear = storage.clear

						engine.flush()
					},
				frame: function ( state )
					{
						_boxes(state, [1, 1], (state.frame % 11 === 0), true, 0.5)

						engine.text('HELLO', storage.width / 20 + "px 'AFMC Font'", storage.width, storage.height / 4 + state.glitch, 'rgb(' + state.clear.r + ',' + state.clear.g + ',' + state.clear.b + ')', 'right', 1)
						engine.text('We proudly introduce', storage.width / 40 + "px 'AFMC Font'", storage.width, storage.height / 4 + storage.height / 10 + state.glitch, 'rgb(' + state.clear.r + ',' + state.clear.g + ',' + state.clear.b + ')', 'right', 1)
						engine.text('the extra mainstream', storage.width / 40 + "px 'AFMC Font'", storage.width, storage.height / 4 + (storage.height / 10) * 2 + state.glitch, 'rgb(' + state.clear.r + ',' + state.clear.g + ',' + state.clear.b + ')', 'right', 1)
						engine.text('and super boring', storage.width / 40 + "px 'AFMC Font'", storage.width, storage.height / 4 + (storage.height / 10) * 3 + state.glitch, 'rgb(' + state.clear.r + ',' + state.clear.g + ',' + state.clear.b + ')', 'right', 1)
						engine.text('PARTY', storage.width / 20 + "px 'AFMC Font'", storage.width, storage.height / 4 + (storage.height / 10) * 5 + state.glitch, 'rgb(' + state.clear.r + ',' + state.clear.g + ',' + state.clear.b + ')', 'right', 1)

						state.glitch = Math.random() * 10 - 5
						state.subglitch = Math.random() * 10 - 5

						engine.text('HELLO', storage.width / 20 + "px 'AFMC Font'", storage.width, storage.height / 4 + state.glitch, '#fff', 'right', 1)
						engine.text('We proudly introduce', storage.width / 40 + "px 'AFMC Font'", storage.width, storage.height / 4 + storage.height / 10 + state.glitch, '#fff', 'right', 1)
						engine.text('the extra mainstream', storage.width / 40 + "px 'AFMC Font'", storage.width, storage.height / 4 + (storage.height / 10) * 2 + state.glitch, '#fff', 'right', 1)
						engine.text('and super boring', storage.width / 40 + "px 'AFMC Font'", storage.width, storage.height / 4 + (storage.height / 10) * 3 + state.glitch, '#fff', 'right', 1)
						engine.text('PARTY', storage.width / 20 + "px 'AFMC Font'", storage.width, storage.height / 4 + (storage.height / 10) * 5 + state.glitch, '#fff', 'right', 1)

						;(state.frame % 11 === 0 && Math.random() > 0.7) && (engine.sprite(8, [0, 53 - state.subglitch], 1, 1))
					}
			},
		'85.0':
			{
				pre: function ( state )
					{
						state.cut = 0

						engine.flush()
					},
				frame: function ( state ) 
					{
						var text = 'And you are invited'.substr(0, state.cut)

						;(state.frame % 6 < 3) ? (text += '|') : (text += ' ')

						engine.cls('#000')
						engine.text(text, storage.width / 40 + "px monospace", storage.width / 2, storage.height / 2, '#fff', 'center', 1)

						;(state.frame % 3 === 0) && (state.cut++)
					}
			},
		'87.0':
			{
				pre: function ( state )
					{
					},
				frame: function ( state ) 
					{
						var text = 'And you are invited'

						;(state.frame % 6 < 3) ? (text += '|') : (text += ' ')

						;(state.frame % 11 === 0) ? engine.cls('#fff') : engine.cls('#000')
						engine.text(text, storage.width / 40 + "px monospace", storage.width / 2, storage.height / 2, '#fff', 'center', 1)
					}
			},
		'88.0':
			{
				pre: function ( state )
					{
						var i

						state.splats = [storage.height / 4, storage.height / 2, storage.height]
						state.mults = [5, 2, 5]

						state.circles = []

						for (i = 0; i < 50; i++)
						{
							state.circles.push({
								x: Math.random() * storage.width,
								y: Math.random() * storage.height / 2 + storage.height / 4,
								radius: Math.random() * 30 + 20,
								color: '#fff',
								mode: 'overlay',
								alpha: 0.3
							})
						}

						state.wave = []

						for (i = 0; i < storage.width / 20; i++)
						{
							state.wave.push({
								x: i * 20 + 5,
								y: storage.height / 2,
								radius: 2,
								color: '#fbaf5d',
								mode: 'color-dodge',
								alpha: 0.7
							})
						}

						state.offset = 0
						state.sprite = 1

						state.scroll = storage.width + 100
					},
				frame: function ( state ) 
					{
						_circles ( state )

						state.glitch = (Math.random() * 20) - 10
						;(Math.random() > 0.8) && (state.sprite = Math.abs(state.sprite - 1))
						var mode = 'normal'

						engine.sprite(9 + state.sprite, [0 + state.glitch * (Math.random() * 10), storage.height / 2 - (166 ) / 2 + state.glitch], 1, 0.3, 'screen')

						engine.sprite(9 + state.sprite, [0 - state.glitch * (Math.random() * 10), storage.height / 2 - (166 ) / 2 + state.glitch], 1, 0.3, 'screen')

						engine.sprite(9 + state.sprite, [0, storage.height / 2 - (166 ) / 2 + state.glitch + 5], 1, 1, 'destination-out')

						engine.sprite(9 + state.sprite, [0, storage.height / 2 - (166 ) / 2 + state.glitch], 1, 1,mode)

						engine.text('chiptune - multichannel - soundtracks - pixelart - digital art - photo -  demo - net-art - games - video & animation', storage.width / 40 + "px 'AFMC Font'", state.scroll, storage.height / 4 * 3.2, '#fff', 'left', 1)

						state.scroll -= 8
					}
			},
		'99.0':
			{
				pre: function ( state )
					{
						state.size = 20
						state.bars = []
						state.offset = 0

						var i

						for (i = 0; i < storage.height / state.size; i++)
						{
							state.bars[i] = 
								{
									x: -storage.width / 2,
									y: i * state.size - state.size / 2,
									width: storage.width,
									height: state.size,
									color: [Math.round(Math.random() * 192) + 63, 0, Math.round(Math.random() * 192) + 63]
								}
						}

						state.circles = []

						for (i = 0; i < 16; i++)
						{
							state.circles.push({
								x: 0,
								y: 0,
								radius: 5,
								color: '#fff',
								mode: 'screen',
								alpha: 0.7
							})
						}

						state.limiter = 8
					},
				frame: function ( state )
					{
						var i, t

						state.glitch = Math.random() * 20 - 10

						for (i = 0; i < state.bars.length; i++)
						{
							engine.rect(state.bars[i])
							state.bars[i].color = [Math.round(Math.sin((state.frame / 10 * (i + 1) + i) * 10) * 127) + 127, 0, Math.round(Math.cos(Math.sqrt(state.frame) * 10 + i) * 127) + 127]
						}

						_circleFunc(state)

						engine.text('REMOTE', storage.width / 20 + "px 'AFMC Font'", storage.width - 40, storage.height / 4 * 1.5 + state.glitch, '#fff', 'right', 1, 'overlay')
						engine.text('PARTICIPATION', storage.width / 43 + "px 'AFMC Font'", storage.width - 40, storage.height / 4 * 2 + state.glitch, '#fff', 'right', 1, 'overlay')
						engine.text('A L L O W E D', storage.width / 40 + "px 'AFMC Font'", storage.width - 40, storage.height / 4 * 2.5 + state.glitch, '#fff', 'right', 1, 'overlay')
						engine.text('A L L O W E D', storage.width / 40 + "px 'AFMC Font'", storage.width - 38, storage.height / 4 * 2.5 + state.glitch, '#fff', 'right', 1, 'overlay')

						state.limiter -= 0.02

						storage.limiter = state.limiter
						storage.circles = state.circles
						storage.bars = state.bars
					}
			},
		'104.5':
			{
				pre: function ( state )
					{
						state.size = 60
						state.bars = storage.bars
						state.circles = storage.circles
						state.limiter = storage.limiter
						state.offset = 0
					},
				frame: function ( state )
					{
						var i, t

						state.glitch = Math.random() * 20 - 10

						for (i = 0; i < state.bars.length; i++)
						{
							engine.rect(state.bars[i])
							state.bars[i].color = [Math.round(Math.sin((state.frame / 10 * (i + 1) + i) * 10) * 127) + 127, 0, Math.round(Math.cos(Math.sqrt(state.frame) * 10 + i) * 127) + 127]
						}

						_circleFunc(state)

						engine.text('BIG', storage.width / 15 + "px 'AFMC Font'", storage.width - 40, storage.height / 4 * 1.5 + state.glitch, '#fff', 'right', 1, 'overlay')
						engine.text('SCREEN', storage.width / 30 + "px 'AFMC Font'", storage.width - 40, storage.height / 4 * 2 + state.glitch, '#fff', 'right', 1, 'overlay')
						engine.text('REAL', storage.width / 20 + "px 'AFMC Font'", storage.width - 40, storage.height / 4 * 2.75 + state.glitch, '#fff', 'right', 1, 'overlay')
						engine.text('HARDWARE', storage.width / 39 + "px 'AFMC Font'", storage.width - 35, storage.height / 4 * 3 + state.glitch, '#fff', 'right', 1, 'overlay')

						state.limiter -= 0.02

						storage.limiter = state.limiter
						storage.circles = state.circles
					}
			},
		'110.0':
			{
				pre: function ( state )
					{
						state.circles = storage.circles
						state.limiter = storage.limiter
						state.offset = 0
					},
				frame: function ( state )
					{
						engine.cls('rgba(0,0,0,0.2)')

						_circleFunc(state)

						engine.text('BUT', storage.width / 20 + "px 'AFMC Font'", - 120 + state.offset, storage.height / 4 * 1.5, '#fff', 'left', 1, 'overlay')

						state.limiter -= 0.02
						state.offset += 5

						storage.limiter = state.limiter
						storage.circles = state.circles
						storage.offset = state.offset
					}
			},
		'111.5':
			{
				pre: function ( state )
					{
						state.circles = storage.circles
						state.limiter = storage.limiter
						state.offset = storage.offset
					},
				frame: function ( state )
					{

						engine.cls('rgba(0,0,0,0.2)')
						_circleFunc(state)

						engine.text('BUT', storage.width / 20 + "px 'AFMC Font'", - 120 + state.offset, storage.height / 4 * 1.5, '#fff', 'left', 1, 'overlay')

						engine.text('THIS', storage.width / 40 + "px 'AFMC Font'", - 120 + state.offset, storage.height / 4 * 2, '#00ffff', 'left', 1, 'overlay')

						;(state.frame > 11) && (engine.text('IS NOT', storage.width / 40 + "px 'AFMC Font'", - 120 + state.offset, storage.height / 4 * 2.25, '#00ff00', 'left', 1, 'overlay'))

						;(state.frame > 22) && (engine.text('ONLY', storage.width / 40 + "px 'AFMC Font'", - 120 + state.offset, storage.height / 4 * 2.5, '#ffff00', 'left', 1, 'overlay'))

						;(state.frame > 28) && (engine.text('DEMOPARTY', storage.width / 40 + "px 'AFMC Font'", - 120 + state.offset, storage.height / 4 * 2.75, '#ff0000', 'left', 1, 'overlay'))

						state.limiter -= 0.02

						storage.limiter = state.limiter
						storage.circles = state.circles
					}
			},
		'112.75':
			{
				pre: function ( state )
					{
						state.circles = storage.circles
						state.limiter = storage.limiter
						state.offset = storage.offset
					},
				frame: function ( state )
					{
						engine.cls('rgba(0,0,0,0.2)')
						_circleFunc(state)

						state.limiter -= 0.02
						state.offset -= 35

						storage.limiter = state.limiter
						storage.circles = state.circles
						storage.offset = state.offset
					}
			},
		'113.0':
			{
				pre: function ( state )
					{
						state.circles = storage.circles
						state.limiter = storage.limiter
						state.offset = storage.offset
						state.opacity = 1
					},
				frame: function ( state )
					{
						if (state.frame % 11 === 0)
						{
							engine.init()
							state.opacity = 1
						}

						engine.cls('rgba(0,0,0,0.2)')

						for (var i = 0; i < state.circles[i].length; i++)
						{
							state.circles[i].color = 'rgb(' + (Math.round(Math.random() * 127) + 127) + ',' + (Math.round(Math.random() * 127) + 127) + ',' + (Math.round(Math.random() * 127) + 127) + ')'
						}

						_circleFunc(state)

						state.limiter -= 0.02
						state.opacity -= 0.01

						storage.limiter = state.limiter
						storage.circles = state.circles

						engine.text('SMALL', storage.width / 15 + "px 'AFMC Font'", storage.width - 40, storage.height / 4 * 1.5, '#fff', 'right', state.opacity, 'normal')
						engine.text('ARTS', storage.width / 20 + "px 'AFMC Font'", storage.width - 40, storage.height / 4 * 2, '#fff', 'right', state.opacity, 'normal')
						engine.text('FESTIVAL', storage.width / 30 + "px 'AFMC Font'", storage.width - 40, storage.height / 4 * 2.5, '#fff', 'right', state.opacity, 'normal')

						engine.rotate(Math.sin(state.frame / 2))
					}
			},
		'118.0':
			{
				pre: function ( state )
					{
						state.circles = storage.circles
						state.limiter = storage.limiter
						state.offset = storage.offset
					},
				frame: function ( state )
					{
						_circleFunc(state)

						state.limiter -= 0.02
						state.offset += 35

						storage.limiter = state.limiter
						storage.circles = state.circles
						storage.offset = state.offset

						engine.rotate(Math.sin(state.frame / 2))
					}
			},
		'118.25':
			{
				pre: function ( state )
					{
						state.circles = storage.circles
						state.limiter = storage.limiter
						state.offset = storage.offset
						state.opacity = 1
					},
				frame: function ( state )
					{
						if (state.frame % 11 === 0)
						{
							engine.init()
							state.opacity = 1
						}

						engine.cls('rgba(0,0,0,0.2)')

						_circleFunc(state)

						state.limiter -= 0.02
						state.opacity -= 0.01

						storage.limiter = state.limiter
						storage.circles = state.circles

						engine.text('DIY', storage.width / 15 + "px 'AFMC Font'", 40, storage.height / 4 * 1.25, '#fff', 'left', state.opacity, 'normal')
						engine.text('ELECTRONICS', storage.width / 35 + "px 'AFMC Font'", 40, storage.height / 4 * 1.75, '#fff', 'left', state.opacity, 'normal')
						engine.text('RETRO', storage.width / 20 + "px 'AFMC Font'", 40, storage.height / 4 * 2.5, '#fff', 'left', state.opacity, 'normal')
						engine.text('EXPO', storage.width / 18 + "px 'AFMC Font'", 40, storage.height / 4 * 3, '#fff', 'left', state.opacity, 'normal')

						engine.rotate(Math.sin(state.frame / 2))
					}
			},
		'123.5':
			{
				pre: function ( state )
					{
						state.circles = storage.circles
						state.limiter = storage.limiter
						state.offset = storage.offset
					},
				frame: function ( state )
					{
						_circleFunc(state)

						state.limiter -= 0.02
						state.offset -= 35

						storage.limiter = state.limiter
						storage.circles = state.circles
						storage.offset = state.offset

						engine.rotate(Math.sin(state.frame / 2))
					}
			},
		'123.75':
			{
				pre: function ( state )
					{
						state.circles = storage.circles
						state.limiter = storage.limiter
						state.offset = storage.offset
						state.opacity = 1
					},
				frame: function ( state )
					{
						if (state.frame % 11 === 0)
						{
							engine.init()
							state.opacity = 1
						}

						engine.cls('rgba(0,0,0,0.2)')

						for (var i = 0; i < state.circles[i].length; i++)
						{
							state.circles[i].color = 'rgb(' + (Math.round(Math.random() * 127) + 127) + ',' + (Math.round(Math.random() * 127) + 127) + ',' + (Math.round(Math.random() * 127) + 127) + ')'
						}

						_circleFunc(state)

						state.limiter -= 0.02
						state.opacity -= 0.01

						storage.limiter = state.limiter
						storage.circles = state.circles

						engine.text('COSPLAY', storage.width / 20 + "px 'AFMC Font'", storage.width - 40, storage.height / 4 * 1.5, '#fff', 'right', state.opacity, 'normal')
						engine.text('PHOTO AND ARTS', storage.width / 40 + "px 'AFMC Font'", storage.width - 40, storage.height / 4 * 2, '#fff', 'right', state.opacity, 'normal')
						engine.text('GALLERY', storage.width / 30 + "px 'AFMC Font'", storage.width - 40, storage.height / 4 * 2.5, '#fff', 'right', state.opacity, 'normal')

						engine.rotate(Math.sin(state.frame / 2))
					}
			},
		'129.0':
			{
				pre: function ( state )
					{
						state.circles = storage.circles
						state.limiter = storage.limiter
						state.offset = storage.offset
					},
				frame: function ( state )
					{
						_circleFunc(state)

						state.limiter -= 0.02
						state.offset += 35

						storage.limiter = state.limiter
						storage.circles = state.circles
						storage.offset = state.offset

						engine.rotate(Math.sin(state.frame / 2))
					}
			},
		'129.25':
			{
				pre: function ( state )
					{
						state.circles = storage.circles
						state.limiter = storage.limiter
						state.offset = storage.offset
						state.opacity = 1
					},
				frame: function ( state )
					{
						if (state.frame % 11 === 0)
						{
							engine.init()
							state.opacity = 1
						}

						engine.cls('rgba(0,0,0,0.2)')

						_circleFunc(state)

						state.limiter -= 0.02
						state.opacity -= 0.01

						storage.limiter = state.limiter
						storage.circles = state.circles

						engine.text('AND', storage.width / 15 + "px 'AFMC Font'", 40, storage.height / 4 * 1.25, '#fff', 'left', state.opacity, 'normal')
						engine.text('A LOT OF', storage.width / 35 + "px 'AFMC Font'", 40, storage.height / 4 * 1.75, '#fff', 'left', state.opacity, 'normal')
						engine.text('OTHER', storage.width / 20 + "px 'AFMC Font'", 40, storage.height / 4 * 2.5, '#fff', 'left', state.opacity, 'normal')
						engine.text('STUFF', storage.width / 18 + "px 'AFMC Font'", 40, storage.height / 4 * 3, '#fff', 'left', state.opacity, 'normal')

						engine.rotate(Math.sin(state.frame / 2))
					}
			},
		'133.25':
			{
				pre: function ( state )
					{
						state.circles = storage.circles
						state.limiter = storage.limiter
						state.offset = storage.offset
					},
				frame: function ( state )
					{
						_circleFunc(state)

						state.limiter -= 0.02
						state.offset -= 30

						storage.limiter = state.limiter
						storage.circles = state.circles
						storage.offset = state.offset

						engine.rotate(Math.sin(state.frame / 2))
					}
			},
		'134.5':
			{
				pre: function ( state )
					{
						var size = 32

						state.pixels = []

						for (var y = 0; y < storage.height / size; y++)
						{
							for (var x = 0; x < storage.width / size; x++)
							{
								state.pixels.push({
									x: x * size - size / 2,
									y: y * size - size / 2,
									size: size,
									color: [(Math.random() > 0.5) ? 255 : 0, (Math.random() > 0.5) ? 255 : 0, (Math.random() > 0.5) ? 255 : 0],
									mode: 'normal',
									alpha: 0.2,
									speed: Math.round(Math.random() * 10) / 10
								})
							}
						}
					},
				frame: function ( state )
					{
						_pixels(state)

						storage.pixels = state.pixels
					}
			},
		'137.5':
			{
				pre: function ( state )
					{
						state.pixels = storage.pixels
					},
				frame: function ( state )
					{
						_pixels(state)

						_stroked('Greetings to everyone', storage.height / 6 * 2,  storage.width / 30)
						_stroked('at DiHalt', storage.height / 6 * 2.75, storage.width / 30)

						storage.pixels = state.pixels
					}
			},
		'140.25':
			{
				pre: function ( state )
					{
						state.pixels = storage.pixels
					},
				frame: function ( state )
					{
						_pixels(state)

						_stroked('Greetings to everyone', storage.height / 6 * 2,  storage.width / 30)
						_stroked('at DiHalt', storage.height / 6 * 2.75, storage.width / 30)
						_stroked('Hi Multimatograf', storage.height / 6 * 4, storage.width / 35)

						storage.pixels = state.pixels
					}
			},
		'143.0':
			{
				pre: function ( state )
					{
						state.pixels = storage.pixels
					},
				frame: function ( state )
					{
						_pixels(state)

						_stroked('Greetings to everyone', storage.height / 6 * 2,  storage.width / 30)
						_stroked('at DiHalt', storage.height / 6 * 2.75, storage.width / 30)
						_stroked('Hi Multimatograf', storage.height / 6 * 4, storage.width / 35)
						_stroked('and Chaos Constructions', storage.height / 6 * 4.75, storage.width / 40)

						storage.pixels = state.pixels
					}
			},
		'145.75':
			{
				pre: function ( state )
					{
						state.pixels = storage.pixels

						state.offset = storage.height + storage.width / 40 * 2
						storage.rotation = 0
						storage.screenoff = -100
						state.mult = 1
						state.movin = storage.width / 6

						state.colors = ['#000', '#333', '#666', '#333', '#666', '#999']
					},
				frame: function ( state )
					{
						_pixels(state)

						var glitch = Math.random() * 20 - 10

						_twister(storage.screenoff, state)
						_twister(storage.width - storage.screenoff, state)

						_stroked('Greetings to everyone', storage.height / 6 * 2,  storage.width / 30)
						_stroked('at DiHalt', storage.height / 6 * 2.75, storage.width / 30)
						_stroked('Hi Multimatograf', storage.height / 6 * 4, storage.width / 35)
						_stroked('and Chaos Constructions', storage.height / 6 * 4.75, storage.width / 40)
						_stroked('AND YOU', storage.height / 2 + glitch, storage.width / 15)

						storage.screenoff += 7

						storage.pixels = state.pixels
					}
			},
		'148.75':
			{
				pre: function ( state )
					{
						state.greets = ['nyuk', 'n1k-o', 'sq', 'kowalski', 'vbi', 'DenisGrachev', 'nodeus', 'quiet', 'Vinnny', 'shuran33', 'lilka', 'random', 'raider', 'wbr', 'wbcbz7', 'true-grue', 'g0blinish', 'moroz1999', 'Vassa', 'shiru', 'diver', 'prof', 'introspec', 'Nuts_', 'scalesmann', 'BlastOff', 'dman', 'Kakos_nonos', 'John Norton Irr', 'brightentayle', 'ShaMAN', 'oisee', 'orgamism', 'Vitamin', 'mr_r0ckers', 'Buddy', 'kotsoft', 'tsl', 'trefi', 'DimkaM', 'mihhru', 'C-jeff', 'Purely Grey', 'mmcm', 'Flast', 'elfh', 'Pheel', 'r0bat', 'G.D.', 'Misha Pertsovsky', 'dimidrol', 'lowpolybrain', 'kloyana', 'Sasha Marinova', 'pixelrat', 'hexonoize', 'tmk', 'draggs connor', 'timetomeetthedevil'].sort(function( a, b ) {
								return (a.toLowerCase() > b.toLowerCase()) ? 1 : -1
							})

						state.offset = storage.height + storage.width / 40 * 2
						storage.rotation = 0
						storage.screenoff = storage.width / 6
						state.mult = 1
						state.colors = ['#0ff', '#f00', '#f0f', '#0f0', '#ff0', '#fff']

						engine.cls('#fff')
					},
				frame: function ( state )
					{
						var x,y, width, count,
							font

						engine.cls('#000')

						for (i = 0; i < 6; i++)
						{
							width = i * 5
							count = 40

							for (y = 0; y < count; y++)
							{
								engine.rect({
									x: -storage.width / 2,
									y: y * width * 10 + width * (Math.cos(state.frame / width) * 5),
									width: storage.width,
									height: width,
									alpha: i / 20,
									color: '#f00',
									mode: 'normal'
								})

								engine.rect({
									y: -storage.height / 2,
									x: y * width * 10 + width * (Math.sin(state.frame / width) * 5),
									width: width,
									height: storage.height,
									alpha: i / 20,
									color: '#f00',
									mode: 'normal'
								})
							}
						}

						_twister(storage.screenoff, state)
						_twister(storage.width - storage.screenoff, state)

						for (i = 0; i < state.greets.length; i++)
						{
							font = (state.greets[i].length > 12)
								? storage.width / 50
								: storage.width / 40

							engine.text(state.greets[i].toUpperCase(), font + "px 'AFMC Font'", storage.width / 2, state.offset + i * storage.width / 40 * 4, '#fff', 'center', 1, 'normal')
						}

						state.offset -= storage.height / 75
					}
			},
		'179.0':
			{
				pre: function ( state )
					{
						state.current = 0
						state.stuff = [10, 10, 10, 10]
					},
				frame: function ( state )
					{
						engine.cls('rgba(0,0,0,0.2)')

						for (var i = 0; i < state.stuff.length; i++)
						{
							switch (i)
							{
								case 0:
									engine.sprite(11, [storage.width / 2 - 76 * state.stuff[i], 0], state.stuff[i], 1 / (state.stuff[i] * state.stuff[i]))
									break;
								case 1:
									engine.text('9th of September 2017', (storage.width / 30 * state.stuff[i]) + "px 'AFMC Font'",storage.width / 2, storage.height / 2 - storage.height / 20, '#fff', 'center', 1 / (state.stuff[i] * state.stuff[i]), 'normal')
									break;
								case 2:
									engine.text('VORONEZH', (storage.width / 20 * state.stuff[i]) + "px 'AFMC Font'",storage.width / 2, storage.height / 2 + storage.height / 6 - storage.height / 20, '#fff', 'center', 1 / (state.stuff[i] * state.stuff[i]), 'normal')
									break;
								case 3:
									engine.sprite(12, [storage.width / 2 - 110 * state.stuff[i], storage.height / 4 * 3], state.stuff[i], 1 / (state.stuff[i] * state.stuff[i]))
									break;
							}
						}

						if (state.current < state.stuff.length)
						{
							state.stuff[state.current] -= 0.5
							;(state.stuff[state.current] <= 1) && (state.stuff[state.current] = 1, state.current++)
						}
					}
			}
	})

	engine.audio.play(0)

	/* CLASSES */

	function Engine ()
	{
		var $engine = this,
			$screen = document.getElementById('screen'),
			$ctx,
			$grainCanvas = document.createElement('canvas')

		$screen.style.cursor = 'none'

	    $grainCanvas.width = 64
		$grainCanvas.height = 64

    	var $grainCtx = $grainCanvas.getContext('2d'),
    		$grain = $grainCtx.createImageData(64, 64)

		$grainCtx = $grainCanvas.getContext('2d')
		$grain = $grainCtx.createImageData(64, 64)

	    var value = 0, i, j = 0

	    for (i = 0; i < 16384; i += 4) 
	    {
	        value = (j % 2 === 0) ? 50 : 0

	        $grain.data[i    ] = value
	        $grain.data[i + 1] = value
	        $grain.data[i + 2] = value
	        $grain.data[i + 3] = (j % 2 === 0) ? 50 : 0
	        j++
	    }

	    $grainCtx.putImageData($grain, 0, 0)

    	$engine.flush = function ()
    		{
    			$screen.width = $screen.width - 1
    			storage = {}
    			$engine.init()
    		}

		$engine.init = function ()
			{
				var zoom = 1

				$screen.width = 640
				$screen.height = 320

				;(window.innerHeight > window.innerWidth / 2)
					? (zoom = window.innerWidth / $screen.width)
					: (zoom = window.innerHeight / $screen.height)

				$screen.style.transform = 'translate(-50%,-50%) scale(' + zoom + ')'					

				storage.width = $screen.width
				storage.height = $screen.height
				storage.monofont = storage.height / 20

				$ctx =  $screen.getContext('2d') 
			}

		$engine.cls = function ( color )
			{
				$ctx.globalAlpha = 1
				$ctx.globalCompositeOperation = 'normal'
				$ctx.fillStyle = color
				$ctx.fillRect(0, 0, $screen.width, $screen.height)
			}

		$engine.sprite = function ( index, position, scale, opacity, mode, filter, angle )
			{
				;(mode === undefined) && (mode = 'normal')
				;(filter === undefined) && (filter = 'none')
				;(opacity === undefined) && (opacity = 1)

				$ctx.globalAlpha = opacity
				$ctx.globalCompositeOperation = mode
				$ctx.filter = filter

				image = $engine.loader.data[index]

				$ctx.drawImage(image, Math.round(position[0]), Math.round(position[1]), image.width * scale, image.height  * scale)
			}

		$engine.sprt = function ( source, target, params )
			{
				params =
					{
						mode: params.mode || 'normal',
						filter: params.filter || 'none',
						alpha: params.alpha || 1
					}

				$ctx.globalAlpha = params.alpha
				$ctx.globalCompositeOperation = params.mode
				$ctx.filter = params.filter

				$ctx.drawImage(
					$engine.loader.data[source.index], 
					source.x, 
					source.y, 
					source.width,
					source.height,
					target.x, 
					target.y, 
					target.width, 
					target.height
				)
			}

		$engine.text = function ( string, font, x, y, color, align, opacity, filter, mode )
			{
				;(!align) && (align = 'left')
				;(mode === undefined) && (mode = 'normal')
				;(filter === undefined) && (filter = 'none')
				;(opacity === undefined) && (opacity = 1)

				$ctx.font = font
				$ctx.fillStyle = color
				$ctx.globalAlpha = opacity
				$ctx.globalCompositeOperation = mode
				$ctx.filter = filter
				$ctx.textAlign = align
				$ctx.fillText(string, x, y)
			}

		$engine.rotate = function ( angle )
			{
				$ctx.translate(storage.width / 2, storage.height / 2)
				$ctx.rotate(angle * Math.PI / 180)
				$ctx.translate(-storage.width / 2, -storage.height / 2)
			}

		$engine.save = function()
			{
				$ctx.save()
			}

		$engine.restore = function ()
			{
				$ctx.restore()
			}

		$engine.rect = function ( params, translate, moverect )
			{
				;(translate === undefined) && (translate = true)
				;(moverect === undefined) && (moverect = true)

				if (params.size)
				{
					params.width = params.size
					params.height = params.size
				}

				;(params.color instanceof Array) && (params.color = 'rgb(' + params.color[0] + ',' + params.color[1] + ',' + params.color[2] + ')')

				$ctx.save()
				$ctx.globalAlpha = (params.alpha !== undefined) ? params.alpha : 1
				$ctx.globalCompositeOperation = params.mode
		      	$ctx.fillStyle = params.color
		      	;(translate) && ($ctx.translate(params.x + params.width / 2, params.y + params.height / 2))
		      	;(params.angle) ? ($ctx.rotate(params.angle * Math.PI / 180)) : ($ctx.rotate(0))
		    	;(moverect)
		    		? ($ctx.fillRect(0, 0, params.width, params.height))
		    		: ($ctx.fillRect(params.x - params.width / 2, params.y - params.height / 2, params.width, params.height))
		      	;(translate) && ($ctx.translate(-(params.x + params.width / 2), -(params.y + params.height / 2)))
				$ctx.restore()
			}

		$engine.circle = function ( params )
			{
				$ctx.save()
      			$ctx.beginPath()

				$ctx.globalAlpha = (params.alpha !== undefined) ? params.alpha : 1
				$ctx.globalCompositeOperation = (params.mode !== undefined) ? params.mode : 'normal'
	      		$ctx.fillStyle = params.color

				$ctx.arc(params.x, params.y, params.radius, 0, 2 * Math.PI, false)
    			$ctx.fill()

				$ctx.restore()
			}

		$engine.splat = function ( x, y, radius, color, mode )
			{
				$ctx.save()
				$ctx.globalCompositeOperation = mode

				var grd = $ctx.createRadialGradient( x, y, 0, x, y, radius)

				grd.addColorStop(0,'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ', 1)')
				grd.addColorStop(1,'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ', 0)')

				$ctx.fillStyle = grd
				$ctx.fillRect(0, 0, storage.width, storage.height)

				$ctx.restore()
			}

		$engine.get = function ( x, y, w, h )
			{
				return $ctx.getImageData(x,y,w,h)
			}

		$engine.draw = function ( data, x, y )
			{
				$ctx.putImageData(data, x, y)
			}

		$engine.state = function ( handler )
			{
				var state = {
						frame: 0
					},
					_interval

				if ($engine._state && !handler.hold)
				{
					$engine.init()
					clearInterval($engine._state)
				}

				handler.pre(state)

				_interval = setInterval(function(){
					state.frame++
					$ctx.globalCompositeOperation = 'normal'
					$ctx.globalAlpha = 1
					handler.frame(state)
					$engine.grain()
				},32)

				;(!handler.hold) && ($engine._state = _interval)
			}

		$engine.grain = function ()
			{
			    $ctx.fillStyle = $ctx.createPattern($grainCanvas, 'repeat')
				$ctx.globalCompositeOperation = 'normal'
				$ctx.globalAlpha = 0.5
				$ctx.filter = 'none'
			    $ctx.fillRect(0, 0, $screen.width, $screen.height)
			}

		$engine.loader = new Loader()
		$engine.audio = new AudioCollection($engine.loader)
		$engine.image = new ImageCollection($engine.loader)
	}

	function Loader ()
	{
		var $loader = this
		$loader.data = []

		$loader.load = function ( src )
		{
			$loader.data.push(src)
		}
	}

	function ImageCollection ( $ldr )
	{
		var $ic = this

		$ic.list = function ( list )
		{
			for (var i = 0; i < list.length; i++)
			{
				$ldr.load($ic.load(list[i]))
			}
		}

		$ic.load = function ( image )
		{
			var img = new Image(),
				canvas = document.createElement('canvas')

			img.onload = function ()
				{
					canvas.width = img.width
					canvas.height = img.height

					canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height)
				}

			img.src = $config.path + image

			return canvas
		}
	}

	function AudioCollection ( $ldr )
	{
		var $ac = this,
			_indexes = [],
			_funcs = [],
			currentWatch = 0

		$ac.list = function ( list )
		{
			for (var i = 0; i < list.length; i++)
			{
				$ldr.load($ac.load(list[i]))
			}
		}

		$ac.load = function ( audio )
		{
			var aud = new Audio($config.path + audio + '.' + $config.audio)
			aud.preload = false

			return aud
		}

		$ac.loop = function ( index )
		{
			$ldr.data[index].loop = true
		}

		$ac.stop = function ( index )
		{
			$ldr.data[index].pause()
			$ldr.data[index].loop = false
		}

		$ac.play = function ( index, watch, time, stop )
		{
			;(watch === undefined) && (watch = true)
			$ldr.data[index].play()
			;(time) && ($ldr.data[index].currentTime = time, currentWatch = _indexes.indexOf(time))
			;(watch) && ($ac.watch($ldr.data[index], stop))
		}

		$ac.watch = function ( audio, stop )
		{
			var watcher = setInterval(function(){
				var time = Math.floor(audio.currentTime * 4) / 4,
					act = currentWatch,
					isTime = (time >= parseFloat(_indexes[act]))

				if (time >= stop) return

				if (isTime)
				{
						engine.state(_funcs[act])
						currentWatch++
				}

				;(audio.ended) && (clearInterval(watcher))
			},250)
		}

		$ac.acts = function ( list )
		{
			for (var time in list)
			{
				_indexes.push(parseFloat(time))
				_funcs.push(list[time])
			}
		}
	}

	function Glitcher ( spriteIndex, handlers )
	{
		function g_render ( state ) 
			{
				var x0 = state.amplitude,
					x1, x2, x3

				state.curoffset = { x: 0, y: 0 }

				;(Math.random() >= 0.7) && (x0 *= 10)

				state.curoffset.x = state.offset.x + storage.width / 2
				state.curoffset.y = state.offset.y + storage.height / 2

				x1 = state.curoffset.x + Math.random() * 5
				x2 = x1 + x0
				x3 = x1 - x0

				engine.cls(storage.bg)

				switch (state.channel) 
				{
					case 0:
						g_channels(x1, x2, x3, state)
						break
					case 1:
						g_channels(x2, x3, x1, state)
						break
					case 2:
						g_channels(x3, x1, x2, state)
						break
				}

				g_scanline(state)
				;(Math.floor(Math.random() * 2) > 1) && (g_scanline(state))

				;(handlers.add) && (handlers.add(state))
			}

		function g_channels ( x1, x2, x3, state ) 
			{
				engine.sprt({
						index: spriteIndex,
						x: -x1,
						y: -state.curoffset.y,
						width: storage.width,
						height: storage.height
					},
					{
						x: 0,
						y: 0,
						width: storage.width,
						height: storage.height
					},
					{
						alpha: state.alpha
					})

				engine.sprt({
						index: spriteIndex,
						x: -x2,
						y: -state.curoffset.y,
						width: storage.width,
						height: storage.height
					},
					{
						x: 0,
						y: 0,
						width: storage.width,
						height: storage.height
					},
					{
						alpha: state.alpha / 2,
						mode: 'screen',
						filter: 'hue-rotate(180deg)'
					})

				engine.sprt({
						index: spriteIndex,
						x: -x3,
						y: -state.curoffset.y,
						width: storage.width,
						height: storage.height
					},
					{
						x: 0,
						y: 0,
						width: storage.width,
						height: storage.height
					},
					{
						alpha: state.alpha / 2,
						mode: 'screen',
						filter: 'hue-rotate(270deg)'
					})
			}

		function g_scanline ( state ) 
			{
				var y = storage.height * Math.random() >> 0,
					o = engine.get(0, y, storage.width, 100),
					d = o.data,
					i = d.length,
					s = 10 + 20 * Math.random() >> 0,
					x = -15 + 15 * 2 * Math.random() >> 0

				while (i-- > 0) 
				{
					d[i] += s
				}

				engine.draw(o, x, y)
			}

		return {
			pre: function ( state )
				{
					state.channel = 0
					state.phase = 0.0
					state.phaseStep = 0.5

					state.amplitude = 0.0
					state.amplitudeBase = 2.0
					state.amplitudeRange = 3.0
					state.alphaMin = 0.6

					;(handlers.pre) && (handlers.pre(state))
				},
			frame: function ( state )
				{
					state.phase += state.phaseStep

			        if (state.phase > 1) 
			        {
			          state.phase = 0.0
			          state.channel = (state.channel === 2) ? 0 : state.channel + 1
			          state.amplitude = state.amplitudeBase + (state.amplitudeRange * Math.random())
			        }

					state.alpha = state.alphaMin + ((1 - state.alphaMin) * Math.random())
			        ;(handlers.frame) && (handlers.frame(state))

			        g_render(state)
				}
		}
	}

	function MoveMap ( to, time, add )
	{
		var frames = Math.round(time * 1000 / 15),
			step

		;(storage.mapOffset === undefined) && (storage.mapOffset = [416, 936])

		return Glitcher(5, {
				pre: function ( state )
					{
						state.scale = $config.mapZoom

						engine.audio.loop(1)
						
						if (!$config.loop)
						{
							engine.audio.play(1)
							$config.loop = true
						}

						;(storage.mapOffset === undefined) && (storage.mapOffset = [-storage.width / 2, -storage.height / 2])
						step = 
							{
								x: (to[0] - storage.mapOffset[0]) / frames,
								y: (to[1] - storage.mapOffset[1]) / frames
							}

						;(Math.abs(step.x) > 3 || Math.abs(step.y) > 3) && (engine.audio.play(3))

						state.offset = {
							x: storage.mapOffset[0] * $config.mapZoom  * -1,
							y: storage.mapOffset[1] * $config.mapZoom  * -1
						}
					},
				frame: function ( state )
					{
						storage.mapOffset[0] += step.x * $config.mapZoom 
						storage.mapOffset[1] += step.y * $config.mapZoom 

						state.offset = {
							x: storage.mapOffset[0] * $config.mapZoom  * -1,
							y: storage.mapOffset[1] * $config.mapZoom  * -1
						}

					},
				add: add
			})
	}

	function _searchingText ( state ) 
		{
			var text = "Searching...".substr(0, 9 + Math.round(state.frame / 3 % 3))
			engine.text(text, storage.monofont + "px monospace", 30, storage.height - storage.monofont, '#fff')
		}

	function _boxes ( state, move, translate, moverect, fade )
		{
			;(fade === undefined) && (fade = 0.1)

			if (state.frame % 22 === 0 || state.frame < 5)
			{
				state.clear =
					{
						r: 255,
						g: 138,
						b: 0
					}

				fade = 0.5
			}

			engine.cls('rgba(' + state.clear.r + ',' + state.clear.g + ',' + state.clear.b + ',' + fade + ')')

			for (var i = 0; i < state.rects.length; i++)
			{
				engine.rect(state.rects[i], translate, moverect)

				state.rects[i].angle += state.rects[i].speed / 10

				state.rects[i].x -= move[0] * state.rects[i].speed
				state.rects[i].y -= move[1] * state.rects[i].speed

				;(state.rects[i].x < -storage.height / 10) && (state.rects[i].x = storage.width + storage.height / 10)
				;(state.rects[i].y < -storage.height / 10) && (state.rects[i].y = storage.height + storage.height / 10)
				;(state.rects[i].x > storage.width + storage.height / 10) && (state.rects[i].x = -storage.height / 10)
				;(state.rects[i].y > storage.height + storage.height / 10) && (state.rects[i].y = -storage.height / 10)
			}

			;(state.clear.r > 43) ? (state.clear.r -= 20) : (state.clear.r = 43)
			;(state.clear.g > 32) ? (state.clear.g -= 20) : (state.clear.g = 32)
			;(state.clear.b < 49) ? (state.clear.b += 5) : (state.clear.b = 49)

		}

	function _circles ( state )
		{
			var i

			engine.cls('#142838')
			engine.splat(storage.width / 4 - state.offset, storage.height, state.splats[0], [123,0,70], 'screen')
			engine.splat(storage.width / 4 * 3 - state.offset, storage.height / 8, state.splats[1], [163,98,9], 'screen')
			engine.splat(0 - state.offset, 0, state.splats[2] * 2, [0,144,188], 'screen')

			for (i = 0; i < state.splats.length; i++)
			{
				state.splats[i] += state.mults[i]
				;(state.splats[i] > storage.height * 2 || state.splats[i] < storage.height / 4 || Math.random() > 0.95) && (state.mults[i] *= -1)
			}

			for (i = 0; i < state.wave.length; i++)
			{
				state.wave[i].y = storage.height / 2 + Math.sin(state.frame / 5 + i / 10) * 50 + Math.sin(state.frame / 5 + Math.tan(i)) * 50

				var h = Math.abs((storage.height / 2 - state.wave[i].y) / (storage.height / 2)) + 0.5

				engine.circle({
					x: state.wave[i].x - state.offset,
					y: state.wave[i].y,
					radius: Math.abs(Math.cos(state.frame / 5) * 10) * 5 + 10,
					color: 'rgb(' + 251 + ',' + Math.round(175 * h) + ',' + Math.round(93 * h) + ')',
					mode: 'overlay',
					alpha: 0.5
				})

				engine.circle({
					x: state.wave[i].x - state.offset,
					y: state.wave[i].y,
					radius: state.wave[i].radius,
					color: state.wave[i].color,
					mode: state.wave[i].mode,
					alpha: state.wave[i].alpha
				})

				if (i > 0)
				{
					engine.circle({
						x: state.wave[i].x + 15- state.offset,
						y: (state.wave[i].y + state.wave[i - 1].y) / 2,
						radius: 2,
						color: state.wave[i].color,
						mode: state.wave[i].mode,
						alpha: state.wave[i].alpha
					})
				}
			}

			for (i = 0; i < state.circles.length; i++)
			{
				engine.circle({
					x: state.circles[i].x - state.offset,
					y: state.circles[i].y,
					radius: state.circles[i].radius,
					color: state.circles[i].color,
					mode: state.circles[i].mode,
					alpha: state.circles[i].alpha
				})

				state.circles[i].radius--
				if (state.circles[i].radius < 10)
				{
					state.circles[i].radius = Math.random() * 30 + 20
					state.circles[i].x = Math.random() * storage.width
					state.circles[i].y = Math.random() * storage.height / 2 + storage.height / 4
				}
			}

			storage.splats = state.splats
			storage.mults = state.mults
			storage.circles = state.circles
			storage.wave = state.wave
		}

	function _circleFunc ( state )
		{
			for (var i = 0; i < state.circles.length; i++)
			{
				t = state.frame / 20 + (i * (Math.PI / Math.abs(state.limiter)))

				state.circles[i].x = (4 * Math.cos(t) + 2 * Math.cos(6 * t)) * (10 + Math.sin(state.frame / 5) * 5) + storage.width / 4 + state.offset * 1.5
				state.circles[i].y = (4 * Math.sin(t) + 2 * Math.sin(6 * t)) * (10 + Math.sin(state.frame / 5) * 5) + storage.height / 2
				state.circles[i].radius = Math.sin(state.frame / 2) * 10 + 10 + Math.abs(Math.sin(state.frame / 5) * 2)
				engine.circle(state.circles[i])
			}
		}

	function _pixels ( state )
		{
			for (var i = 0; i < state.pixels.length; i++)
			{
				engine.rect(state.pixels[i])
				state.pixels[i].size -= state.pixels[i].speed
				state.pixels[i].x += state.pixels[i].speed
				state.pixels[i].y += state.pixels[i].speed

				;(state.pixels[i].size < 5 || state.pixels[i].size > 32) && (state.pixels[i].speed *= -1)
				if (state.frame % 11 === 0)
				{
					state.pixels[i].color = [(Math.random() > 0.5) ? 255 : 0, (Math.random() > 0.5) ? 255 : 0, (Math.random() > 0.5) ? 255 : 0]
				}
			}
		}

	function _stroked ( text, offset, size )
		{
			engine.text(text, size + "px 'AFMC Font'", storage.width / 2, offset + 2, '#000', 'center', 1)
			engine.text(text, size + "px 'AFMC Font'", storage.width / 2, offset - 2, '#000', 'center', 1)
			engine.text(text, size + "px 'AFMC Font'", storage.width / 2 - 2, offset, '#000', 'center', 1)
			engine.text(text, size + "px 'AFMC Font'", storage.width / 2 + 2, offset, '#000', 'center', 1)
			engine.text(text, size + "px 'AFMC Font'", storage.width / 2, offset, '#fff', 'center', 1)
		}

	function _twister ( position, state )
		{
			var t,i,c,offset = 0,
				count = 0,
				size = 32,
				frameoffset = 10

			;((state.frame - frameoffset) % 21.5 > 0 && (state.frame - frameoffset) % 21.5 < 2) && (state.mult = 2)

			for (c = 0; c < 3; c++)
			{
				offset = c * 8
				count = storage.height / size
				wide = Math.min(100, Math.sin(storage.rotation * Math.PI / 180) * 20)

				for (i = 0; i < count; i++)
				{
					t = state.frame / 5
					cursize = 16 * Math.abs(Math.sin(t + i)) + 16

					engine.rect({
						x: position + Math.sin(t + i) * 10 * state.mult - cursize,
						y: i * size + offset - (count / 2 - (i / count) * count) * wide  - cursize + 16,
						size: cursize,
						mode: 'normal',
						alpha: 0.7,
						color: state.colors[c + 3]
					})
				}

				for (i = 0; i < count; i++)
				{
					t = state.frame / 5
					cursize = 16 * Math.abs(Math.cos(t + i)) + 16

					engine.rect({
						x: position + Math.cos(t + i - (offset / 16)) * 50 * state.mult - cursize,
						y: i * size + offset - (count / 2 - (i / count) * count) * wide - cursize + 16,
						size: cursize,
						mode: (Math.sin(t + i - (offset / 16)) > 0) ? 'normal' : 'screen',
						alpha: 0.7,
						color: state.colors[c]
					})
				}
			}

			;(state.mult > 1) && (state.mult -= 0.1)
		}

	function _receivingText ( state, done )
		{
			engine.text("Searching...done", storage.monofont + "px monospace", 30, storage.height  - storage.monofont * 2, '#fff')

			;(done)
				? engine.text("Receiving target information...done", storage.monofont + "px monospace", 30, storage.height - storage.monofont, '#fff')
				: engine.text("Receiving target information...".substr(0, 28 + Math.round(state.frame % 4)), storage.monofont + "px monospace", 30, storage.height - storage.monofont, '#fff')
		}
}