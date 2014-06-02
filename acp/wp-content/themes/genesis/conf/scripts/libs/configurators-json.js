var configurators = {
    gutters: [
        {
            name: 'Roll Out Gutter',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/profiles/new/rollout.jpg',
            dimensions: {
                waterline: true,
                wallHeight: true,
                curbWidth: false,
                gutterWidth: false,
                bullnoseRadius: false,
                seatDepth: false,
                seatToFloor: false,
                seatWidth: false
            }
        },
        {
            name: 'Partially Recessed',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/profiles/new/partially-recessed.jpg',
            dimensions: {
                waterline: true,
                wallHeight: true,
                curbWidth: false,
                gutterWidth: false,
                bullnoseRadius: false,
                seatDepth: false,
                seatToFloor: false,
                seatWidth: false
            }
        },
        {
            name: 'Fully Recessed',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/profiles/new/fully-recessed.jpg',
            dimensions: {
                waterline: true,
                wallHeight: true,
                curbWidth: false,
                gutterWidth: false,
                bullnoseRadius: false,
                seatDepth: false,
                seatToFloor: false,
                seatWidth: false
            }
        },
        {
            name: 'Bull Nose',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/profiles/new/bullnose.jpg',
            dimensions: {
                waterline: true,
                wallHeight: true,
                curbWidth: true,
                gutterWidth: false,
                bullnoseRadius: false,
                seatDepth: false,
                seatToFloor: false,
                seatWidth: false
            }
        },
        {
            name: 'Fully Recessed W/ Curb',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/profiles/new/fully-recessed-with-curb.jpg',
            dimensions: {
                waterline: true,
                wallHeight: true,
                curbWidth: true,
                gutterWidth: true,
                bullnoseRadius: false,
                seatDepth: false,
                seatToFloor: false,
                seatWidth: false
            }
        },
        {
            name: 'Flush W/ Pool Deck',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/profiles/new/flush.jpg',
            dimensions: {
                waterline: false,
                wallHeight: true,
                curbWidth: false,
                gutterWidth: false,
                bullnoseRadius: false,
                seatDepth: false,
                seatToFloor: false,
                seatWidth: false
            }
        },
        {
            name: 'Raised Pool/Spa',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/profiles/new/raised-pool-and-spa.jpg',
            dimensions: {
                waterline: true,
                wallHeight: false,
                curbWidth: true,
                gutterWidth: true,
                bullnoseRadius: true,
                seatDepth: true,
                seatToFloor: false,
                seatWidth: false
            }
        },
        {
            name: 'Florida Roll Out',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/profiles/new/florida-rollout.jpg',
            dimensions: {
                waterline: true,
                wallHeight: true,
                curbWidth: true,
                gutterWidth: true,
                bullnoseRadius: false,
                seatDepth: false,
                seatToFloor: false,
                seatWidth: false
            }
        }
       /* {
            name: 'Bull Nose Coping',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/gutter/bull-nose-coping.jpg',
            dimensions: {
                waterline: true,
                wallHeight: true,
                curbWidth: true,
                gutterWidth: false,
                bullnoseRadius: true,
                seatDepth: false,
                seatToFloor: false,
                seatWidth: false
            }
        },
        {
            name: 'Florida Rollout with Curb',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/gutter/florida-rollout-with-curb.jpg',
            dimensions: {
                waterline: true,
                wallHeight: true,
                curbWidth: true,
                gutterWidth: true,
                bullnoseRadius: false,
                seatDepth: false,
                seatToFloor: false,
                seatWidth: false
            }
        } */
    ],
    lifts: [
        {
            name: 'Pro Pool XR',
			desc: 'ADA requirements must be confirmed prior to lift installation.  Please call Aqua Creek Products at 888-687-3552',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/lift/Pro_Pool_XR.jpg',
            pdfUrl: '',
            type: 'portable',
            fullyRecessedGutter: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 8
                },
                wallHeight: {
                    min: 0,
                    max: 24
                }
            },
            fullyRecessedGutterWithParapet: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 8
                },
                wallHeight: {
                    min: 0,
                    max: 24
                }
            },
            partiallyRecessed: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 8
                },
                wallHeight: {
                    min: 0,
                    max: 32
                }
            },
            standardBackyardPool: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 10
                },
                wallHeight: {
                    min: 0,
                    max: 21
                },
                curbWidth: {
                    min: 0,
                    max: 39
                }
            },
            rollOutGutter: {
                supports: false,
                waterline: {
                    min: 0,
                    max: 16
                },
                gutterWidth: {
                    min: 0,
                    max: 23.5
                }
            },
            aboveGroundSpa: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                seatDepth: {
                    min: -1,
                    max: -1
                },
                seatToFloor: {
                    min: -1,
                    max: -1
                },
                seatWidth: {
                    min: -1,
                    max: -1
                }
            },
            
            flushGutter: {
                supports: false,
                gutterWidth: {
                    min: 0,
                    max: 24
                }
            },
            bullNoseCoping: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 11.5
                },
                wallHeight: {
                    min: 0,
                    max: 5
                },
                curbWidth: {
                    min: 0,
                    max: 24
                },
                bullnoseRadius: {
                    min: 0,
                    max: 2
                }
            },
            inGroundSpa: {
                supports: false,
                waterline: {
                    min: 0,
                    max: 12
                },
                curbWidth: {
                    min: 0,
                    max: 18,
                },
                seatDepth: {
                    min: 10,
                    max: 36
                },
                seatToFloor: {
                    min: 20,
                    max: 60
                },
                seatWidth: {
                    min: 0,
                    max: 12
                }
            },
            floridaRollout: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 11.5
                },
                wallHeight: {
                    min: 0,
                    max: 5
                },
                curbWidth: {
                    min: 0,
                    max: 21.5
                },
                gutterWidth: {
                    min: 0,
                    max: 21.5
                }
            },
            accessories: {
                armRests: true,
                covers: true,
                caddy: false,
                spineboardAttachment: true,
                stabilityVest: true,
                seatPad: true,
                foldingSeat: false,
                poolLiftSign: true,
                wheelAWay: false
            }
        },
        {
            name: 'Pathfinder',
			desc: 'ADA requirements must be confirmed prior to lift installation.  Please call Aqua Creek Products at 888-687-3552',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/lift/pathfinder.jpg',
            pdfUrl: '',
            type: 'portable',
            fullyRecessedGutter: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 11.5
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            fullyRecessedGutterWithParapet: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 11.5
                },
                wallHeight: {
                    min: 0,
                    max: 5
                },
                curbWidth: {
                    min: 0,
                    max: 21.5
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            partiallyRecessed: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 11.5
                },
                gutterWidth: {
                    min: 0,
                    max: 23.5
                }
            },
            aboveGroundSpa: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                seatDepth: {
                    min: -1,
                    max: -1
                },
                seatToFloor: {
                    min: -1,
                    max: -1
                },
                seatWidth: {
                    min: -1,
                    max: -1
                }
            },
            rollOutGutter: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 11.5
                },
                gutterWidth: {
                    min: 0,
                    max: 23.5
                }
            },
            flushGutter: {
                supports: true,
                gutterWidth: {
                    min: 0,
                    max: 24
                }
            },
            standardBackyardPool: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 11.5
                }
            },
            bullNoseCoping: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 11.5
                },
                wallHeight: {
                    min: 0,
                    max: 5
                },
                curbWidth: {
                    min: 0,
                    max: 24
                },
                bullnoseRadius: {
                    min: 0,
                    max: 2
                }
            },
            inGroundSpa: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 12
                },
                curbWidth: {
                    min: 0,
                    max: 18,
                },
                seatDepth: {
                    min: 10,
                    max: 36
                },
                seatToFloor: {
                    min: 20,
                    max: 60
                },
                seatWidth: {
                    min: 0,
                    max: 12
                }
            },
            floridaRollout: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 11.5
                },
                wallHeight: {
                    min: 0,
                    max: 5
                },
                curbWidth: {
                    min: 0,
                    max: 21.5
                },
                gutterWidth: {
                    min: 0,
                    max: 21.5
                }
            },
            accessories: {
                armRests: true,
                covers: true,
                caddy: false,
                spineboardAttachment: true,
                stabilityVest: true,
                seatPad: true,
                foldingSeat: false,
                poolLiftSign: true,
                wheelAWay: false
            }
        },
        {
            name: 'The Scout',
			desc: 'ADA requirements must be confirmed prior to lift installation.  Please call Aqua Creek Products at 888-687-3552',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/lift/The_Scout.jpg',
            pdfUrl: '',
            type: 'portable',
            fullyRecessedGutter: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            fullyRecessedGutterWithParapet: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 7
                },
                wallHeight: {
                    min: 5,
                    max: 42
                },
                curbWidth: {
                    min: 0,
                    max: 14
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            partiallyRecessed: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            aboveGroundSpa: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 12
                },
                wallHeight: {
                    min: 0,
                    max: 42
                },
                curbWidth: {
                    min: 0,
                    max: 22
                },
                seatDepth: {
                    min: 0,
                    max: 28
                },
                seatToFloor: {
                    min: 0,
                    max: 18
                },
                seatWidth: {
                    min: 0,
                    max: 16
                }
            },
            rollOutGutter: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            flushGutter: {
                supports: false,
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            standardBackyardPool: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                }
            },
            bullNoseCoping: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                bullnoseRadius: {
                    min: -1,
                    max: -1
                }
            },
            inGroundSpa: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1,
                },
                seatDepth: {
                    min: -1,
                    max: -1
                },
                seatToFloor: {
                    min: -1,
                    max: -1
                },
                seatWidth: {
                    min: -1,
                    max: -1
                }
            },
            floridaRollout: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            accessories: {
                armRests: true,
                covers: true,
                caddy: false,
                spineboardAttachment: true,
                stabilityVest: true,
                seatPad: true,
                foldingSeat: false,
                poolLiftSign: true,
                wheelAWay: false
            }
        },
        {
            name: 'Scout Hi Lift',
			desc: 'ADA requirements must be confirmed prior to lift installation.  Please call Aqua Creek Products at 888-687-3552',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/lift/The_Scout.jpg',
            pdfUrl: '',
            type: 'portable',
            fullyRecessedGutter: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            fullyRecessedGutterWithParapet: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            partiallyRecessed: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            aboveGroundSpa: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 12
                },
                wallHeight: {
                    min: 5,
                    max: 48
                },
                curbWidth: {
                    min: 0,
                    max: 24
                },
                seatDepth: {
                    min: 0,
                    max: 28
                },
                seatToFloor: {
                    min: 20,
                    max: 60
                },
                seatWidth: {
                    min: 0,
                    max: 12
                }
            },
            rollOutGutter: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            flushGutter: {
                supports: false,
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            standardBackyardPool: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                }
            },
            bullNoseCoping: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                bullnoseRadius: {
                    min: -1,
                    max: -1
                }
            },
            inGroundSpa: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1,
                },
                seatDepth: {
                    min: -1,
                    max: -1
                },
                seatToFloor: {
                    min: -1,
                    max: -1
                },
                seatWidth: {
                    min: -1,
                    max: -1
                }
            },
            floridaRollout: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            accessories: {
                armRests: true,
                covers: true,
                caddy: false,
                spineboardAttachment: true,
                stabilityVest: true,
                seatPad: true,
                foldingSeat: false,
                poolLiftSign: true,
                wheelAWay: false
            }
        },
        {
            name: 'The Ranger',
			desc: 'ADA requirements must be confirmed prior to lift installation.  Please call Aqua Creek Products at 888-687-3552',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/lift/Ranger.jpg',
            pdfUrl: '',
            type: 'flanged',
            fullyRecessedGutter: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 11.5
                },
                gutterWidth: {
                    min: 11.5,
                    max: 21.5
                }
            },
            fullyRecessedGutterWithParapet: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 10.5
                },
                wallHeight: {
                    min: 0,
                    max: 5
                },
                curbWidth: {
                    min: 0,
                    max: 20
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            partiallyRecessed: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 11.5
                },
                gutterWidth: {
                    min: 0,
                    max: 22
                }
            },
            aboveGroundSpa: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                seatDepth: {
                    min: -1,
                    max: -1
                },
                seatToFloor: {
                    min: -1,
                    max: -1
                },
                seatWidth: {
                    min: -1,
                    max: -1
                }
            },
            rollOutGutter: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 11.5
                },
                gutterWidth: {
                    min: 0,
                    max: 22
                }
            },
            flushGutter: {
                supports: true,
                gutterWidth: {
                    min: 0,
                    max: 22
                }
            },
            standardBackyardPool: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 11.5
                }
            },
            bullNoseCoping: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 10.5
                },
                wallHeight: {
                    min: 0,
                    max: 5
                },
                curbWidth: {
                    min: 0,
                    max: 20
                },
                bullnoseRadius: {
                    min: -1,
                    max: -1
                }
            },
            inGroundSpa: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 12
                },
                curbWidth: {
                    min: 0,
                    max: 25,
                },
                seatDepth: {
                    min: 0,
                    max: 22
                },
                seatToFloor: {
                    min: 20,
                    max: 60
                },
                seatWidth: {
                    min: 0,
                    max: 12
                }
            },
            floridaRollout: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 10.5
                },
                wallHeight: {
                    min: 0,
                    max: 5
                },
                curbWidth: {
                    min: 0,
                    max: 20
                },
                gutterWidth: {
                    min: 0,
                    max: 20
                }
            },
            accessories: {
                armRests: true,
                covers: true,
                caddy: true,
                spineboardAttachment: true,
                stabilityVest: true,
                seatPad: true,
                foldingSeat: false,
                poolLiftSign: true,
                wheelAWay: false
            }
        },
        {
            name: 'The Patriot',
			desc: 'ADA requirements must be confirmed prior to lift installation.  Please call Aqua Creek Products at 888-687-3552',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/lift/Patriot.jpg',
            pdfUrl: '',
            type: 'flanged',
            fullyRecessedGutter: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 11.5
                },
                gutterWidth: {
                    min: 11.5,
                    max: 21.5
                }
            },
            fullyRecessedGutterWithParapet: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 10.5
                },
                wallHeight: {
                    min: 0,
                    max: 5
                },
                curbWidth: {
                    min: 0,
                    max: 20
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            partiallyRecessed: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 11.5
                },
                gutterWidth: {
                    min: 0,
                    max: 22
                }
            },
            aboveGroundSpa: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                seatDepth: {
                    min: -1,
                    max: -1
                },
                seatToFloor: {
                    min: -1,
                    max: -1
                },
                seatWidth: {
                    min: -1,
                    max: -1
                }
            },
            rollOutGutter: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 11.5
                },
                gutterWidth: {
                    min: 0,
                    max: 22
                }
            },
            flushGutter: {
                supports: true,
                gutterWidth: {
                    min: 0,
                    max: 22
                }
            },
            standardBackyardPool: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 11.5
                }
            },
            bullNoseCoping: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 10.5
                },
                wallHeight: {
                    min: 0,
                    max: 5
                },
                curbWidth: {
                    min: 0,
                    max: 20
                },
                bullnoseRadius: {
                    min: -1,
                    max: -1
                }
            },
            inGroundSpa: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 12
                },
                curbWidth: {
                    min: 0,
                    max: 25,
                },
                seatDepth: {
                    min: 0,
                    max: 22
                },
                seatToFloor: {
                    min: 20,
                    max: 60
                },
                seatWidth: {
                    min: 0,
                    max: 12
                }
            },
            floridaRollout: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 10.5
                },
                wallHeight: {
                    min: 0,
                    max: 5
                },
                curbWidth: {
                    min: 0,
                    max: 20
                },
                gutterWidth: {
                    min: 0,
                    max: 20
                }
            },
            accessories: {
                armRests: true,
                covers: true,
                caddy: true,
                spineboardAttachment: true,
                stabilityVest: true,
                seatPad: true,
                foldingSeat: false,
                poolLiftSign: true,
                wheelAWay: false
            }
        },
        {
            name: 'The Pro Pool',
			desc: 'ADA requirements must be confirmed prior to lift installation.  Please call Aqua Creek Products at 888-687-3552',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/lift/ProPoolCS.jpg',
            pdfUrl: '',
            type: 'flanged',
            fullyRecessedGutter: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            fullyRecessedGutterWithParapet: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 10.5
                },
                wallHeight: {
                    min: 5,
                    max: 44
                },
                curbWidth: {
                    min: 0,
                    max: 18
                },
                gutterWidth: {
                    min: 15.5,
                    max: 26.5
                }
            },
            partiallyRecessed: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            aboveGroundSpa: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 10
                },
                wallHeight: {
                    min: 0,
                    max: 42
                },
                curbWidth: {
                    min: 0,
                    max: 18
                },
                seatDepth: {
                    min: 18,
                    max: 36
                },
                seatToFloor: {
                    min: 9,
                    max: 60
                },
                seatWidth: {
                    min: 12,
                    max: 36
                }
            },
            rollOutGutter: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            flushGutter: {
                supports: false,
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            standardBackyardPool: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                }
            },
            bullNoseCoping: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                bullnoseRadius: {
                    min: -1,
                    max: -1
                }
            },
            inGroundSpa: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1,
                },
                seatDepth: {
                    min: -1,
                    max: -1
                },
                seatToFloor: {
                    min: -1,
                    max: -1
                },
                seatWidth: {
                    min: -1,
                    max: -1
                }
            },
            floridaRollout: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            accessories: {
                armRests: true,
                covers: true,
                caddy: true,
                spineboardAttachment: true,
                stabilityVest: true,
                seatPad: true,
                foldingSeat: false,
                poolLiftSign: true,
                wheelAWay: false
            }
        },
        {
            name: 'Pro Pool Ext 23',
			desc: 'ADA requirements must be confirmed prior to lift installation.  Please call Aqua Creek Products at 888-687-3552',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/lift/ProPoolCS.jpg',
            pdfUrl: '',
            type: 'flanged',
            fullyRecessedGutter: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 23
                },
                gutterWidth: {
                    min: 0,
                    max: 37.5
                }
            },
            fullyRecessedGutterWithParapet: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 23
                },
                wallHeight: {
                    min: 0,
                    max: 6
                },
                curbWidth: {
                    min: 0,
                    max: 38
                },
                gutterWidth: {
                    min: 15,
                    max: 37.5
                }
            },
            partiallyRecessed: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 23
                },
                gutterWidth: {
                    min: 0,
                    max: 37.5
                }
            },
            aboveGroundSpa: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                seatDepth: {
                    min: -1,
                    max: -1
                },
                seatToFloor: {
                    min: -1,
                    max: -1
                },
                seatWidth: {
                    min: -1,
                    max: -1
                }
            },
            rollOutGutter: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 23
                },
                gutterWidth: {
                    min: 0,
                    max: 37.5
                }
            },
            flushGutter: {
                supports: true,
                gutterWidth: {
                    min: 0,
                    max: 38
                }
            },
            standardBackyardPool: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                }
            },
            bullNoseCoping: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 23
                },
                wallHeight: {
                    min: 0,
                    max: 6
                },
                curbWidth: {
                    min: 0,
                    max: 38
                },
                bullnoseRadius: {
                    min: 15,
                    max: 37.5
                }
            },
            inGroundSpa: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1,
                },
                seatDepth: {
                    min: -1,
                    max: -1
                },
                seatToFloor: {
                    min: -1,
                    max: -1
                },
                seatWidth: {
                    min: -1,
                    max: -1
                }
            },
            floridaRollout: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 23
                },
                wallHeight: {
                    min: 0,
                    max: 6
                },
                curbWidth: {
                    min: 0,
                    max: 38
                },
                gutterWidth: {
                    min: 0,
                    max: 38
                }
            },
            accessories: {
                armRests: true,
                covers: true,
                caddy: true,
                spineboardAttachment: true,
                stabilityVest: true,
                seatPad: true,
                foldingSeat: false,
                poolLiftSign: true,
                wheelAWay: false
            }
        },
        {
            name: 'Pro Pool Ext 26',
			desc: 'ADA requirements must be confirmed prior to lift installation.  Please call Aqua Creek Products at 888-687-3552',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/lift/ProPoolCS.jpg',
            pdfUrl: '',
            type: 'flanged',
            fullyRecessedGutter: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            fullyRecessedGutterWithParapet: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 22
                },
                wallHeight: {
                    min: 0,
                    max: 50
                },
                curbWidth: {
                    min: 0,
                    max: 34
                },
                gutterWidth: {
                    min: 23.5,
                    max: 43.5
                }
            },
            partiallyRecessed: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            aboveGroundSpa: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                seatDepth: {
                    min: -1,
                    max: -1
                },
                seatToFloor: {
                    min: -1,
                    max: -1
                },
                seatWidth: {
                    min: -1,
                    max: -1
                }
            },
            rollOutGutter: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            flushGutter: {
                supports: false,
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            standardBackyardPool: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                }
            },
            bullNoseCoping: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                bullnoseRadius: {
                    min: -1,
                    max: -1
                }
            },
            inGroundSpa: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1,
                },
                seatDepth: {
                    min: -1,
                    max: -1
                },
                seatToFloor: {
                    min: -1,
                    max: -1
                },
                seatWidth: {
                    min: -1,
                    max: -1
                }
            },
            floridaRollout: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 22
                },
                wallHeight: {
                    min: 0,
                    max: 50
                },
                curbWidth: {
                    min: 0,
                    max: 34
                },
                gutterWidth: {
                    min: 0,
                    max: 34
                }
            },
            accessories: {
                armRests: true,
                covers: true,
                caddy: true,
                spineboardAttachment: true,
                stabilityVest: true,
                seatPad: true,
                foldingSeat: false,
                poolLiftSign: true,
                wheelAWay: false
            }
        },
        {
            name: 'ProPoolDD',
			desc: 'ADA requirements must be confirmed prior to lift installation.  Please call Aqua Creek Products at 888-687-3552',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/lift/ProPoolCS.jpg',
            pdfUrl: '',
            type: 'flanged',
            fullyRecessedGutter: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            fullyRecessedGutterWithParapet: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            partiallyRecessed: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            aboveGroundSpa: {
                supports: true,
                waterline: {
                    min: 8,
                    max: 12
                },
                wallHeight: {
                    min: 45,
                    max: 50
                },
                curbWidth: {
                    min: 30,
                    max: 33
                },
                seatDepth: {
                    min: 0,
                    max: 32
                },
                seatToFloor: {
                    min: 8,
                    max: 60
                },
                seatWidth: {
                    min: 0,
                    max: 12
                }
            },
            rollOutGutter: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            flushGutter: {
                supports: false,
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            standardBackyardPool: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                }
            },
            bullNoseCoping: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                bullnoseRadius: {
                    min: -1,
                    max: -1
                }
            },
            inGroundSpa: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1,
                },
                seatDepth: {
                    min: -1,
                    max: -1
                },
                seatToFloor: {
                    min: -1,
                    max: -1
                },
                seatWidth: {
                    min: -1,
                    max: -1
                }
            },
            floridaRollout: {
                supports: false,
                waterline: {
                    min: 1,
                    max: 22
                },
                wallHeight: {
                    min: 0,
                    max: 50
                },
                curbWidth: {
                    min: 0,
                    max: 34
                },
                gutterWidth: {
                    min: 0,
                    max: 34
                }
            },
            accessories: {
                armRests: true,
                covers: true,
                caddy: true,
                spineboardAttachment: true,
                stabilityVest: true,
                seatPad: true,
                foldingSeat: false,
                poolLiftSign: true,
                wheelAWay: false
            }
        },
        {
            name: 'The Revolution',
			desc: 'ADA requirements must be confirmed prior to lift installation.  Please call Aqua Creek Products at 888-687-3552',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/lift/The_Revolution.jpg',
            pdfUrl: '',
            type: 'flanged',
            fullyRecessedGutter: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            fullyRecessedGutterWithParapet: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            partiallyRecessed: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            aboveGroundSpa: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 12
                },
                wallHeight: {
                    min: 5,
                    max: 40
                },
                curbWidth: {
                    min: 0,
                    max: 18
                },
                seatDepth: {
                    min: 0,
                    max: 32
                },
                seatToFloor: {
                    min: 0,
                    max: 60
                },
                seatWidth: {
                    min: 12,
                    max: 36
                }
            },
            rollOutGutter: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            flushGutter: {
                supports: false,
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            standardBackyardPool: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                }
            },
            bullNoseCoping: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                bullnoseRadius: {
                    min: -1,
                    max: -1
                }
            },
            inGroundSpa: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1,
                },
                seatDepth: {
                    min: -1,
                    max: -1
                },
                seatToFloor: {
                    min: -1,
                    max: -1
                },
                seatWidth: {
                    min: -1,
                    max: -1
                }
            },
            floridaRollout: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            accessories: {
                armRests: true,
                covers: true,
                caddy: true,
                spineboardAttachment: true,
                stabilityVest: true,
                seatPad: true,
                foldingSeat: false,
                poolLiftSign: true,
                wheelAWay: false
            }
        },
        {
            name: 'The Revoolution DD',
			desc: 'ADA requirements must be confirmed prior to lift installation.  Please call Aqua Creek Products at 888-687-3552',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/lift/The_Revolution.jpg',
            pdfUrl: '',
            type: 'flanged',
            fullyRecessedGutter: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 8
                },
                gutterWidth: {
                    min: 0,
                    max: 24
                }
            },
            fullyRecessedGutterWithParapet: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            partiallyRecessed: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 8
                },
                gutterWidth: {
                    min: 0,
                    max: 17
                }
            },
            aboveGroundSpa: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                seatDepth: {
                    min: -1,
                    max: -1
                },
                seatToFloor: {
                    min: -1,
                    max: -1
                },
                seatWidth: {
                    min: -1,
                    max: -1
                }
            },
            rollOutGutter: {
                supports: true,
                waterline: {
                    min: 1,
                    max: 8
                },
                gutterWidth: {
                    min: 0,
                    max: 17
                }
            },
            flushGutter: {
                supports: true,
                gutterWidth: {
                    min: 0,
                    max: 17
                }
            },
            standardBackyardPool: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 17
                }
            },
            bullNoseCoping: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                bullnoseRadius: {
                    min: -1,
                    max: -1
                }
            },
            inGroundSpa: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 8
                },
                curbWidth: {
                    min: 0,
                    max: 24,
                },
                seatDepth: {
                    min: 0,
                    max: 26
                },
                seatToFloor: {
                    min: 10,
                    max: 60
                },
                seatWidth: {
                    min: 0,
                    max: 14
                }
            },
            floridaRollout: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            accessories: {
                armRests: true,
                covers: true,
                caddy: true,
                spineboardAttachment: true,
                stabilityVest: true,
                seatPad: true,
                foldingSeat: false,
                poolLiftSign: true,
                wheelAWay: false
            }
        },
        {
            name: 'Rev Spa',
			desc: 'ADA requirements must be confirmed prior to lift installation.  Please call Aqua Creek Products at 888-687-3552',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/lift/The_Revolution.jpg',
            pdfUrl: '',
            type: 'flanged',
            fullyRecessedGutter: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 8
                },
                gutterWidth: {
                    min: 0,
                    max: 8
                }
            },
            fullyRecessedGutterWithParapet: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            partiallyRecessed: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 8
                },
                gutterWidth: {
                    min: 0,
                    max: 8
                }
            },
            aboveGroundSpa: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                seatDepth: {
                    min: -1,
                    max: -1
                },
                seatToFloor: {
                    min: -1,
                    max: -1
                },
                seatWidth: {
                    min: -1,
                    max: -1
                }
            },
            rollOutGutter: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 8
                },
                gutterWidth: {
                    min: 0,
                    max: 8
                }
            },
            flushGutter: {
                supports: true,
                gutterWidth: {
                    min: 0,
                    max: 8
                }
            },
            standardBackyardPool: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 17
                }
            },
            bullNoseCoping: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                bullnoseRadius: {
                    min: -1,
                    max: -1
                }
            },
            inGroundSpa: {
                supports: true,
                waterline: {
                    min: 0,
                    max: 8
                },
                curbWidth: {
                    min: 0,
                    max: 24,
                },
                seatDepth: {
                    min: 0,
                    max: 26
                },
                seatToFloor: {
                    min: 10,
                    max: 60
                },
                seatWidth: {
                    min: 0,
                    max: 14
                }
            },
            floridaRollout: {
                supports: false,
                waterline: {
                    min: -1,
                    max: -1
                },
                wallHeight: {
                    min: -1,
                    max: -1
                },
                curbWidth: {
                    min: -1,
                    max: -1
                },
                gutterWidth: {
                    min: -1,
                    max: -1
                }
            },
            accessories: {
                armRests: true,
                covers: true,
                caddy: false,
                spineboardAttachment: false,
                stabilityVest: true,
                seatPad: true,
                foldingSeat: true,
                poolLiftSign: true,
                wheelAWay: true
            }
        },
        {
        name: 'The Titan 600 Lift',
		desc: 'ADA requirements must be confirmed prior to lift installation.  Please call Aqua Creek Products at 888-687-3552',	
        imageUrl: '/wp-content/themes/genesis/conf/css/images/config/lift/Titan.jpg',
        pdfUrl: '',
        type: 'flanged',
        fullyRecessedGutter: {
            supports: true,
            waterline: {
                min: 0,
                max: 8
            },
            gutterWidth: {
                min: 0,
                max: 8
            }
        },
        fullyRecessedGutterWithParapet: {
            supports: false,
            waterline: {
                min: -1,
                max: -1
            },
            wallHeight: {
                min: -1,
                max: -1
            },
            curbWidth: {
                min: -1,
                max: -1
            },
            gutterWidth: {
                min: -1,
                max: -1
            }
        },
        partiallyRecessed: {
            supports: true,
            waterline: {
                min: 0,
                max: 8
            },
            gutterWidth: {
                min: 0,
                max: 8
            }
        },
        aboveGroundSpa: {
            supports: false,
            waterline: {
                min: -1,
                max: -1
            },
            wallHeight: {
                min: -1,
                max: -1
            },
            curbWidth: {
                min: -1,
                max: -1
            },
            seatDepth: {
                min: -1,
                max: -1
            },
            seatToFloor: {
                min: -1,
                max: -1
            },
            seatWidth: {
                min: -1,
                max: -1
            }
        },
        rollOutGutter: {
            supports: true,
            waterline: {
                min: 0,
                max: 8
            },
            gutterWidth: {
                min: 0,
                max: 8
            }
        },
        flushGutter: {
            supports: true,
            gutterWidth: {
                min: 0,
                max: 8
            }
        },
        standardBackyardPool: {
            supports: true,
            waterline: {
                min: 0,
                max: 17
            }
        },
        bullNoseCoping: {
            supports: false,
            waterline: {
                min: -1,
                max: -1
            },
            wallHeight: {
                min: -1,
                max: -1
            },
            curbWidth: {
                min: -1,
                max: -1
            },
            bullnoseRadius: {
                min: -1,
                max: -1
            }
        },
        inGroundSpa: {
            supports: true,
            waterline: {
                min: 0,
                max: 8
            },
            curbWidth: {
                min: 0,
                max: 24,
            },
            seatDepth: {
                min: 0,
                max: 26
            },
            seatToFloor: {
                min: 10,
                max: 60
            },
            seatWidth: {
                min: 0,
                max: 14
            }
        },
        floridaRollout: {
            supports: false,
            waterline: {
                min: -1,
                max: -1
            },
            wallHeight: {
                min: -1,
                max: -1
            },
            curbWidth: {
                min: -1,
                max: -1
            },
            gutterWidth: {
                min: -1,
                max: -1
            }
        },
        accessories: {
            armRests: true,
            covers: true,
            caddy: false,
            spineboardAttachment: false,
            stabilityVest: true,
            seatPad: true,
            foldingSeat: true,
            poolLiftSign: true,
            wheelAWay: true
        }
    }
    ],
    blocks: [
        {
            name: 'Legacy Launch',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/block/legacy-launch.jpg',
            pdfUrl: 'http://www.srsmith.com/media/126991/legacy-launch-specifications-0813.pdf',
            dimensions: {
                waterDepth: {
                    min: 48,
                    max: -1
                },
                deckToWaterHeight: {
                    min: 0,
                    max: 12
                },
                heightAboveWater: {
                    min: 18,
                    max: 29.5
                },
                heightOfBlockAboveDeck: {
                    min: 17,
                    max: 30
                },
                setback: {
                    min: 21,
                    max: 26
                }
            },
            anchor: {
                rockSolidSinglePost: true,
                rockSolidDualPost: false,
                dualPostAnchor: false,
                flushAnchors: false
            },
            backstrokeHandle: {
                hHandle: true,
                uHandle: true,
                horizontalHandle: true,
                angledHandle: true,
                standardCrossbar: false
            },
            frameColors: {
                stainlessSteel: false,
                pearlWhite: true,
                taupe: true,
                rockGray: true,
                silverGray: true,
                royalBlue: true,
                customPC: true
            },
            customization: {
                footboardLogo: true,
                coloredTread: true
            },
            accessories: {
                cover: false,
                sideHandles: true
            }
        },
        {
            name: 'Legacy Launch Long Reach',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/block/legacy-launch-long-reach.jpg',
            pdfUrl: 'http://www.srsmith.com/media/126991/legacy-launch-specifications-0813.pdf',
            dimensions: {
                waterDepth: {
                    min: 48,
                    max: -1
                },
                deckToWaterHeight: {
                    min: 0,
                    max: 12
                },
                heightAboveWater: {
                    min: 18,
                    max: 29.5
                },
                heightOfBlockAboveDeck: {
                    min: 20,
                    max: 30
                },
                setback: {
                    min: 30,
                    max: 40
                }
            },
            anchor: {
                rockSolidSinglePost: true,
                rockSolidDualPost: false,
                dualPostAnchor: false,
                flushAnchors: false
            },
            backstrokeHandle: {
                hHandle: true,
                uHandle: true,
                horizontalHandle: true,
                angledHandle: true,
                standardCrossbar: false
            },
            frameColors: {
                stainlessSteel: false,
                pearlWhite: true,
                taupe: true,
                rockGray: true,
                silverGray: true,
                royalBlue: true,
                customPC: true
            },
            customization: {
                footboardLogo: true,
                coloredTread: true
            },
            accessories: {
                cover: true,
                sideHandles: true
            }
        },
        {
            name: 'Legacy',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/block/legacy.jpg',
            pdfUrl: 'http://www.srsmith.com/media/126988/legacy-specifications-0813.pdf',
            dimensions: {
                waterDepth: {
                    min: 48,
                    max: -1
                },
                deckToWaterHeight: {
                    min: 0,
                    max: 12
                },
                heightAboveWater: {
                    min: 18,
                    max: 29.5
                },
                heightOfBlockAboveDeck: {
                    min: 17,
                    max: 30
                },
                setback: {
                    min: 21,
                    max: 26
                }
            },
            anchor: {
                rockSolidSinglePost: true,
                rockSolidDualPost: false,
                dualPostAnchor: false,
                flushAnchors: false
            },
            backstrokeHandle: {
                hHandle: true,
                uHandle: true,
                horizontalHandle: true,
                angledHandle: true,
                standardCrossbar: false
            },
            frameColors: {
                stainlessSteel: false,
                pearlWhite: true,
                taupe: true,
                rockGray: true,
                silverGray: true,
                royalBlue: true,
                customPC: true
            },
            customization: {
                footboardLogo: true,
                coloredTread: true
            },
            accessories: {
                cover: false,
                sideHandles: true
            }
        },
        {
            name: 'Legacy Long Reach',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/block/legacy-launch-long-reach.jpg',
            pdfUrl: 'http://www.srsmith.com/media/126990/legacy-long-reach-specifications-0813.pdf',
            dimensions: {
                waterDepth: {
                    min: 48,
                    max: -1
                },
                deckToWaterHeight: {
                    min: 0,
                    max: 12
                },
                heightAboveWater: {
                    min: 18,
                    max: 29.5
                },
                heightOfBlockAboveDeck: {
                    min: 20,
                    max: 30
                },
                setback: {
                    min: 30,
                    max: 40
                }
            },
            anchor: {
                rockSolidSinglePost: true,
                rockSolidDualPost: false,
                dualPostAnchor: false,
                flushAnchors: false
            },
            backstrokeHandle: {
                hHandle: true,
                uHandle: true,
                horizontalHandle: true,
                angledHandle: true,
                standardCrossbar: false
            },
            frameColors: {
                stainlessSteel: false,
                pearlWhite: true,
                taupe: true,
                rockGray: true,
                silverGray: true,
                royalBlue: true,
                customPC: true
            },
            customization: {
                footboardLogo: true,
                coloredTread: true
            },
            accessories: {
                cover: true,
                sideHandles: true
            }
        },
        {
            name: 'Legacy Side Mount',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/block/legacy-side-mount.jpg',
            pdfUrl: 'http://www.srsmith.com/media/126989/legacy-sidemount-specifications-0813.pdf',
            dimensions: {
                waterDepth: {
                    min: 48,
                    max: -1
                },
                deckToWaterHeight: {
                    min: 0,
                    max: 18
                },
                heightAboveWater: {
                    min: 18,
                    max: 29.5
                },
                heightOfBlockAboveDeck: {
                    min: 17,
                    max: 30
                },
                setback: {
                    min: 21,
                    max: 26
                }
            },
            anchor: {
                rockSolidSinglePost: true,
                rockSolidDualPost: false,
                dualPostAnchor: false,
                flushAnchors: false
            },
            backstrokeHandle: {
                hHandle: true,
                uHandle: true,
                horizontalHandle: true,
                angledHandle: true,
                standardCrossbar: false
            },
            frameColors: {
                stainlessSteel: false,
                pearlWhite: true,
                taupe: true,
                rockGray: true,
                silverGray: true,
                royalBlue: true,
                customPC: true
            },
            customization: {
                footboardLogo: true,
                coloredTread: true
            },
            accessories: {
                cover: true,
                sideHandles: true
            }
        },
        {
            name: 'Universal',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/block/universal.jpg',
            pdfUrl: 'http://www.srsmith.com/media/126985/universal-specifications-0813.pdf',
            dimensions: {
                waterDepth: {
                    min: 48,
                    max: -1
                },
                deckToWaterHeight: {
                    min: 0,
                    max: 12
                },
                heightAboveWater: {
                    min: 18,
                    max: 29.5
                },
                heightOfBlockAboveDeck: {
                    min: 19,
                    max: 30
                },
                setback: {
                    min: 21,
                    max: 26
                }
            },
            anchor: {
                rockSolidSinglePost: true,
                rockSolidDualPost: false,
                dualPostAnchor: false,
                flushAnchors: false
            },
            backstrokeHandle: {
                hHandle: true,
                uHandle: true,
                horizontalHandle: true,
                angledHandle: true,
                standardCrossbar: false
            },
            frameColors: {
                stainlessSteel: false,
                pearlWhite: true,
                taupe: true,
                rockGray: true,
                silverGray: true,
                royalBlue: true,
                customPC: true
            },
            customization: {
                footboardLogo: false,
                coloredTread: true
            },
            accessories: {
                cover: true,
                sideHandles: true
            }
        },
        {
            name: 'Legacy II Side Mount',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/block/legacy-ii-side-mount.jpg',
            pdfUrl: 'http://www.srsmith.com/media/126993/legacy-ii-side-mount-specifications-0813.pdf',
            dimensions: {
                waterDepth: {
                    min: 48,
                    max: -1
                },
                deckToWaterHeight: {
                    min: 0,
                    max: 12
                },
                heightAboveWater: {
                    min: 18,
                    max: 29.5
                },
                heightOfBlockAboveDeck: {
                    min: 17,
                    max: 30
                },
                setback: {
                    min: 16,
                    max: 26
                }
            },
            anchor: {
                rockSolidSinglePost: false,
                rockSolidDualPost: true,
                dualPostAnchor: false,
                flushAnchors: false
            },
            backstrokeHandle: {
                hHandle: true,
                uHandle: true,
                horizontalHandle: true,
                angledHandle: true,
                standardCrossbar: false
            },
            frameColors: {
                stainlessSteel: false,
                pearlWhite: true,
                taupe: true,
                rockGray: true,
                silverGray: true,
                royalBlue: true,
                customPC: true
            },
            customization: {
                footboardLogo: false,
                coloredTread: true
            },
            accessories: {
                cover: false,
                sideHandles: false
            }
        },
        {
            name: 'Legacy II',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/block/legacy-ii.jpg',
            pdfUrl: 'http://www.srsmith.com/media/126992/legacy-ii-specifications-0813.pdf',
            dimensions: {
                waterDepth: {
                    min: 48,
                    max: -1
                },
                deckToWaterHeight: {
                    min: 0,
                    max: 12
                },
                heightAboveWater: {
                    min: 18,
                    max: 29.5
                },
                heightOfBlockAboveDeck: {
                    min: 17,
                    max: 30
                },
                setback: {
                    min: 18,
                    max: 18
                }
            },
            anchor: {
                rockSolidSinglePost: false,
                rockSolidDualPost: true,
                dualPostAnchor: true,
                flushAnchors: false
            },
            backstrokeHandle: {
                hHandle: false,
                uHandle: false,
                horizontalHandle: false,
                angledHandle: false,
                standardCrossbar: true
            },
            frameColors: {
                stainlessSteel: true,
                pearlWhite: false,
                taupe: false,
                rockGray: false,
                silverGray: false,
                royalBlue: false,
                customPC: false
            },
            customization: {
                footboardLogo: false,
                coloredTread: true
            },
            accessories: {
                cover: false,
                sideHandles: false
            }
        },
        {
            name: 'Varsity Deluxe (18")',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/block/varsity-deluxe.jpg',
            pdfUrl: 'http://www.srsmith.com/media/126998/low-profile-specifications-0813.pdf',
            dimensions: {
                waterDepth: {
                    min: 48,
                    max: -1
                },
                deckToWaterHeight: {
                    min: 0,
                    max: 6
                },
                heightAboveWater: {
                    min: 18,
                    max: 18
                },
                heightOfBlockAboveDeck: {
                    min: 12,
                    max: 18
                },
                setback: {
                    min: 26.5,
                    max: 26.5
                }
            },
            anchor: {
                rockSolidSinglePost: false,
                rockSolidDualPost: false,
                dualPostAnchor: false,
                flushAnchors: true
            },
            backstrokeHandle: {
                hHandle: false,
                uHandle: false,
                horizontalHandle: false,
                angledHandle: false,
                standardCrossbar: true
            },
            frameColors: {
                stainlessSteel: true,
                pearlWhite: false,
                taupe: false,
                rockGray: false,
                silverGray: false,
                royalBlue: false,
                customPC: false
            },
            customization: {
                footboardLogo: false,
                coloredTread: true
            },
            accessories: {
                cover: false,
                sideHandles: false
            }
        },
        {
            name: 'Varsity Deluxe (30")',
            imageUrl: '/wp-content/themes/genesis/conf/css/images/config/block/varsity-deluxe.jpg',
            pdfUrl: 'http://www.srsmith.com/media/126994/deluxe-specifications-0813.pdf',
            dimensions: {
                waterDepth: {
                    min: 48,
                    max: -1
                },
                deckToWaterHeight: {
                    min: 0,
                    max: 12
                },
                heightAboveWater: {
                    min: 18,
                    max: 29.5
                },
                heightOfBlockAboveDeck: {
                    min: 18,
                    max: 30
                },
                setback: {
                    min: 26.5,
                    max: 26.5
                }
            },
            anchor: {
                rockSolidSinglePost: false,
                rockSolidDualPost: false,
                dualPostAnchor: false,
                flushAnchors: true
            },
            backstrokeHandle: {
                hHandle: false,
                uHandle: false,
                horizontalHandle: false,
                angledHandle: false,
                standardCrossbar: true
            },
            frameColors: {
                stainlessSteel: true,
                pearlWhite: false,
                taupe: false,
                rockGray: false,
                silverGray: false,
                royalBlue: false,
                customPC: false
            },
            customization: {
                footboardLogo: false,
                coloredTread: true
            },
            accessories: {
                cover: false,
                sideHandles: false
            }
        }
    ],
    rails: [
        {
            type: "Fitness Bars",
            description: 'Fitness Bars, available with or without flanges, can be configured to any length for your facility.',
            imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/fitness.jpg",
            pdfUrl: "/media/76807/srs-rails-ladders-6pg-mar2013web.pdf",
            endLoopOption: false,
            quotedBasedOnDrawing: false,
            styles: [
                {
                    name: "Exercise Bar with Flanges",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/fitness/exercise with flanges.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: false,
                        /*C*/c1: false,
                        c2: false,
                        c3: false,
                        c4: true,
                        /*D*/d: false,
                        /*E*/e: false,
                        /*F*/f: false,

                        /*G*/g: false,
                        /*H*/h: false,
                        /*I*/i: true,
                        /*J*/j: false,
                        /*K*/k: false
                    }
                },
                {
                    name: "Exercise Bar",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/fitness/exercise.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: false,
                        /*C*/c1: false,
                        c2: false,
                        c3: false,
                        c4: true,
                        /*D*/d: false,
                        /*E*/e: false,
                        /*F*/f: false,

                        /*G*/g: false,
                        /*H*/h: false,
                        /*I*/i: true,
                        /*J*/j: false,
                        /*K*/k: false
                    }
                },
                {
                    name: "Therapy Bar",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/fitness/therapy.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: false,
                        /*C*/c1: false,
                        c2: false,
                        c3: false,
                        c4: true,
                        /*D*/d: false,
                        /*E*/e: false,
                        /*F*/f: false,

                        /*G*/g: false,
                        /*H*/h: false,
                        /*I*/i: true,
                        /*J*/j: false,
                        /*K*/k: false
                    }
                },
                {
                    name: "Therapy Bar with Flanges",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/fitness/therapy with flanges.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: false,
                        /*C*/c1: false,
                        c2: false,
                        c3: false,
                        c4: true,
                        /*D*/d: false,
                        /*E*/e: false,
                        /*F*/f: false,

                        /*G*/g: false,
                        /*H*/h: false,
                        /*I*/i: true,
                        /*J*/j: false,
                        /*K*/k: false
                    }
                },
                {
                    name: "Ballet Bar",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/fitness/ballet.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: false,
                        /*C*/c1: false,
                        c2: false,
                        c3: false,
                        c4: false,
                        /*D*/d: false,
                        /*E*/e: false,
                        /*F*/f: false,

                        /*G*/g: false,
                        /*H*/h: false,
                        /*I*/i: false,
                        /*J*/j: false,
                        /*K*/k: false
                    }
                }
            ]
        },
        {
            type: "4-Bend",
            description: "4-Bend Stair Rails are ideal for sloped entries and staircases. End loops, cross braces and additional legs can be added.",
            imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/4-bend.jpg",
            pdfUrl: "/",
            endLoopOption: true,
            quotedBasedOnDrawing: false,
            styles: [
                {
                    name: "Single Piece",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/4-bends/4-bend single piece.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: false,
                        /*C*/c1: true,
                        c2: false,
                        c3: false,
                        c4: false,
                        /*D*/d: false,
                        /*E*/e: true,
                        /*F*/f: true,

                        /*G*/g: false,
                        /*H*/h: false,
                        /*I*/i: false,
                        /*J*/j: true,
                        /*K*/k: false
                    }
                },
                {
                    name: "Cross Brace",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/4-bends/4-bend cross brace.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: false,
                        /*C*/c1: true,
                        c2: false,
                        c3: false,
                        c4: false,
                        /*D*/d: false,
                        /*E*/e: true,
                        /*F*/f: true,

                        /*G*/g: false,
                        /*H*/h: false,
                        /*I*/i: false,
                        /*J*/j: true,
                        /*K*/k: false
                    }
                },
                {
                    name: "3rd Leg",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/4-bends/4-bend 3rd leg.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: true,
                        /*C*/c1: true,
                        c2: false,
                        c3: false,
                        c4: false,
                        /*D*/d: true,
                        /*E*/e: true,
                        /*F*/f: false,

                        /*G*/g: true,
                        /*H*/h: true,
                        /*I*/i: false,
                        /*J*/j: true,
                        /*K*/k: false
                    }
                },
                {
                    name: "3rd Leg Cross Brace",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/4-bends/4-bend 3rd leg cross brace.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: true,
                        /*C*/c1: true,
                        c2: false,
                        c3: false,
                        c4: false,
                        /*D*/d: true,
                        /*E*/e: true,
                        /*F*/f: false,

                        /*G*/g: true,
                        /*H*/h: true,
                        /*I*/i: false,
                        /*J*/j: true,
                        /*K*/k: false
                    }
                },
                {
                    name: "3rd Leg Lower End Cross Brace",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/4-bends/4-bend 3rd leg lower end cross brace.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: true,
                        /*C*/c1: true,
                        c2: false,
                        c3: false,
                        c4: false,
                        /*D*/d: true,
                        /*E*/e: true,
                        /*F*/f: false,

                        /*G*/g: true,
                        /*H*/h: true,
                        /*I*/i: false,
                        /*J*/j: true,
                        /*K*/k: false
                    }
                },
                {
                    name: "3rd Leg Upper End Cross Brace",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/4-bends/4-bend 3rd leg upper end cross brace.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: true,
                        /*C*/c1: true,
                        c2: false,
                        c3: false,
                        c4: false,
                        /*D*/d: true,
                        /*E*/e: true,
                        /*F*/f: false,

                        /*G*/g: true,
                        /*H*/h: true,
                        /*I*/i: false,
                        /*J*/j: true,
                        /*K*/k: false
                    }
                }
            ]
        },
        {
            type: "3-Bend",
            description: "3-Bend Stair Rails are ideal for sloped entries and staircases. End loops, cross braces and additional legs can be added.",
            imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/3-bend.jpg",
            pdfUrl: "/media/47481/3-bend0312.pdf",
            endLoopOption: true,
            quotedBasedOnDrawing: false,
            styles: [
                {
                    name: "Single Piece",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/3-bend/3-bend single piece.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: false,
                        /*C*/c1: false,
                        c2: true,
                        c3: false,
                        c4: false,
                        /*D*/d: false,
                        /*E*/e: true,
                        /*F*/f: true,

                        /*G*/g: false,
                        /*H*/h: false,
                        /*I*/i: false,
                        /*J*/j: true,
                        /*K*/k: false
                    }
                },
                {
                    name: "Cross Brace",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/3-bend/3-bend cross brace.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: false,
                        /*C*/c1: false,
                        c2: true,
                        c3: false,
                        c4: false,
                        /*D*/d: false,
                        /*E*/e: true,
                        /*F*/f: true,

                        /*G*/g: false,
                        /*H*/h: false,
                        /*I*/i: false,
                        /*J*/j: true,
                        /*K*/k: false
                    }
                },
                {
                    name: "3rd Leg",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/3-bend/3-bend 3rd leg.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: true,
                        /*C*/c1: false,
                        c2: true,
                        c3: false,
                        c4: false,
                        /*D*/d: true,
                        /*E*/e: true,
                        /*F*/f: false,

                        /*G*/g: true,
                        /*H*/h: true,
                        /*I*/i: false,
                        /*J*/j: true,
                        /*K*/k: false
                    }
                },
                {
                    name: "3rd Leg cross brace",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/3-bend/3-bend 3rd leg cross brace.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: true,
                        /*C*/c1: false,
                        c2: true,
                        c3: false,
                        c4: false,
                        /*D*/d: true,
                        /*E*/e: true,
                        /*F*/f: false,

                        /*G*/g: true,
                        /*H*/h: true,
                        /*I*/i: false,
                        /*J*/j: true,
                        /*K*/k: false
                    }
                },
                {
                    name: "3rd Leg lower cross brace",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/3-bend/3-bend 3rd leg lower end cross brace.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: true,
                        /*C*/c1: false,
                        c2: true,
                        c3: false,
                        c4: false,
                        /*D*/d: true,
                        /*E*/e: true,
                        /*F*/f: false,
                        /*G*/g: true,
                        /*H*/h: true,
                        /*I*/i: false,
                        /*J*/j: true,
                        /*K*/k: false
                    }
                },
                {
                    name: "3rd Leg upper cross brace",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/3-bend/3-bend 3rd leg upper end cross brace.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: true,
                        /*C*/c1: false,
                        c2: true,
                        c3: false,
                        c4: false,
                        /*D*/d: true,
                        /*E*/e: true,
                        /*F*/f: false,
                        /*G*/g: true,
                        /*H*/h: true,
                        /*I*/i: false,
                        /*J*/j: true,
                        /*K*/k: false
                    }
                }
            ]
        },
        {
            type: "2-Bend",
            description: "2-Bend Stair Rails are ideal for sloped entries and staircases. End loops, cross braces and additional legs can be added.",
            imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/2-bend.jpg",
            pdfUrl: "/media/47256/2-bend0312.pdf",
            endLoopOption: true,
            quotedBasedOnDrawing: false,
            styles: [
                {
                    name: "Single Piece",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/2-bend/2-bend single piece.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: false,
                        /*C*/c1: true,
                        c2: false,
                        c3: false,
                        c4: false,
                        /*D*/d: false,
                        /*E*/e: true,
                        /*F*/f: true,
                        /*G*/g: false,
                        /*H*/h: false,
                        /*I*/i: false,
                        /*J*/j: false,
                        /*K*/k: false
                    }
                },
                {
                    name: "Cross Brace",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/2-bend/2-bend cross brace.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: false,
                        /*C*/c1: true,
                        c2: false,
                        c3: false,
                        c4: false,
                        /*D*/d: false,
                        /*E*/e: true,
                        /*F*/f: true,
                        /*G*/g: false,
                        /*H*/h: false,
                        /*I*/i: false,
                        /*J*/j: false,
                        /*K*/k: false
                    }
                },
                {
                    name: "3rd Leg",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/2-bend/2-bend 3rd leg.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: true,
                        /*C*/c1: true,
                        c2: false,
                        c3: false,
                        c4: false,
                        /*D*/d: true,
                        /*E*/e: true,
                        /*F*/f: false,
                        /*G*/g: true,
                        /*H*/h: true,
                        /*I*/i: false,
                        /*J*/j: false,
                        /*K*/k: false
                    }
                },
                {
                    name: "3rd Leg cross brace",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/2-bend/2-bend 3rd leg cross brace.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: true,
                        /*C*/c1: true,
                        c2: false,
                        c3: false,
                        c4: false,
                        /*D*/d: true,
                        /*E*/e: true,
                        /*F*/f: false,
                        /*G*/g: true,
                        /*H*/h: true,
                        /*I*/i: false,
                        /*J*/j: false,
                        /*K*/k: false
                    }
                },
                {
                    name: "3rd Leg lower cross brace",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/2-bend/2-bend 3rd leg lower end cross brace.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: true,
                        /*C*/c1: true,
                        c2: false,
                        c3: false,
                        c4: false,
                        /*D*/d: true,
                        /*E*/e: true,
                        /*F*/f: false,
                        /*G*/g: true,
                        /*H*/h: true,
                        /*I*/i: false,
                        /*J*/j: false,
                        /*K*/k: false
                    }
                },
                {
                    name: "3rd Leg upper cross brace",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/2-bend/2-bend 3rd leg upper end cross brace.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: true,
                        /*C*/c1: true,
                        c2: false,
                        c3: false,
                        c4: false,
                        /*D*/d: true,
                        /*E*/e: true,
                        /*F*/f: false,
                        /*G*/g: true,
                        /*H*/h: true,
                        /*I*/i: false,
                        /*J*/j: false,
                        /*K*/k: false
                    }
                }
            ]
        },
        {
            type: "Ramp/Barrier",
            description: "Ramp rails can be made in any length for your sloped entry, with a variety of options such as cross braces and end loops.",
            imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/ramp.jpg",
            pdfUrl: "/",
            endLoopOption: true,
            quotedBasedOnDrawing: false,
            styles: [
                {
                    name: "Ramp Rail",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/ramp/ramp.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: false,
                        /*C*/c1: true,
                        c2: false,
                        c3: false,
                        c4: false,
                        /*D*/d: false,
                        /*E*/e: false,
                        /*F*/f: true,
                        /*G*/g: false,
                        /*H*/h: false,
                        /*I*/i: false,
                        /*J*/j: false,
                        /*K*/k: false
                    }
                },
                {
                    name: "Ramp Rail with Crossbrace",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/ramp/ramp with cross brace.jpg",
                    dimensionsRequired: {
                        /*A*/a1: true,
                        a2: false,
                        /*B*/b: false,
                        /*C*/c1: true,
                        c2: false,
                        c3: false,
                        c4: false,
                        /*D*/d: false,
                        /*E*/e: false,
                        /*F*/f: true,
                        /*G*/g: false,
                        /*H*/h: false,
                        /*I*/i: false,
                        /*J*/j: false,
                        /*K*/k: false
                    }
                }
            ]
        },
        {
            type: "Figure 4",
            description: "Figure 4 rails can be used with recessed ladder treads.",
            imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/figure-4.jpg",
            pdfUrl: "/media/47487/figure4-0312.pdf",
            endLoopOption: false,
            quotedBasedOnDrawing: false,
            styles: [
                {
                    name: "Single Piece",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/figure 4/figure 4 single piece.jpg",
                    dimensionsRequired: {
                        /*A*/a1: false,
                        a2: true,
                        /*B*/b: false,
                        /*C*/c1: false,
                        c2: true,
                        c3: false,
                        c4: false,
                        /*D*/d: false,
                        /*E*/e: false,
                        /*F*/f: false,
                        /*G*/g: false,
                        /*H*/h: false,
                        /*I*/i: false,
                        /*J*/j: false,
                        /*K*/k: true
                    }
                },
                {
                    name: "Cross Brace",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/figure 4/figure 4 with cross brace.jpg",
                    dimensionsRequired: {
                        /*A*/a1: false,
                        a2: true,
                        /*B*/b: false,
                        /*C*/c1: false,
                        c2: true,
                        c3: false,
                        c4: false,
                        /*D*/d: false,
                        /*E*/e: false,
                        /*F*/f: false,
                        /*G*/g: false,
                        /*H*/h: false,
                        /*I*/i: false,
                        /*J*/j: false,
                        /*K*/k: true
                    }
                }
            ]
        },
        {
            type: "DMS",
            description: "These 3-bend rail styles are suitable for use on pool stairs and sloped entries.",
            imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/dms.jpg",
            pdfUrl: "/media/47328/dms-100-0312.pdf",
            endLoopOption: false,
            quotedBasedOnDrawing: false,
            styles: [
                {
                    name: "3-Bend Single Piece",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/dms/single dms style 1.jpg",
                    dimensionsRequired: {
                        /*A*/a1: false,
                        a2: true,
                        /*B*/b: false,
                        /*C*/c1: false,
                        c2: true,
                        c3: false,
                        c4: false,
                        /*D*/d: false,
                        /*E*/e: false,
                        /*F*/f: false,
                        /*G*/g: false,
                        /*H*/h: false,
                        /*I*/i: false,
                        /*J*/j: false,
                        /*K*/k: true
                    }
                },
                {
                    name: "4-Bend Single Piece",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/dms/dms single piece style 2.jpg",
                    dimensionsRequired: {
                        /*A*/a1: false,
                        a2: true,
                        /*B*/b: false,
                        /*C*/c1: false,
                        c2: true,
                        c3: false,
                        c4: false,
                        /*D*/d: false,
                        /*E*/e: false,
                        /*F*/f: false,
                        /*G*/g: false,
                        /*H*/h: false,
                        /*I*/i: false,
                        /*J*/j: true,
                        /*K*/k: true
                    }
                },
                {
                    name: "3-Bend Angled Cross Brace",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/dms/dms angled cross brace.jpg",
                    dimensionsRequired: {
                        /*A*/a1: false,
                        a2: true,
                        /*B*/b: false,
                        /*C*/c1: false,
                        c2: true,
                        c3: false,
                        c4: false,
                        /*D*/d: false,
                        /*E*/e: false,
                        /*F*/f: false,
                        /*G*/g: false,
                        /*H*/h: false,
                        /*I*/i: false,
                        /*J*/j: false,
                        /*K*/k: true
                    }
                },
                {
                    name: "3-Bend Cross Brace",
                    imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/dms/dms straight cross brace.jpg",
                    dimensionsRequired: {
                        /*A*/a1: false,
                        a2: true,
                        /*B*/b: false,
                        /*C*/c1: false,
                        c2: true,
                        c3: false,
                        c4: false,
                        /*D*/d: false,
                        /*E*/e: false,
                        /*F*/f: false,
                        /*G*/g: false,
                        /*H*/h: false,
                        /*I*/i: false,
                        /*J*/j: false,
                        /*K*/k: true
                    }
                }
            ]
        },
        {
            type: "Specialty & Roll Bends",
            description: " Upload a drawing and we’ll make something just for you. Please include all relevant dimensions on your drawing.",
            imageUrl: "/wp-content/themes/genesis/conf/css/images/config/rails/specialty.jpg",
            pdfUrl: "/media/47322/customrails0312.pdf",
            endLoopOption: false,
            quotedBasedOnDrawing: true,
            styles: []
        }
    ]
};
