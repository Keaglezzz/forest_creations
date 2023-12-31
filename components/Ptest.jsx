import React from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import chemical from '../assets/chemical.png';


export default function Ptest() {
    const particlesInit = async (main) => {
      console.log(main);
  
      // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      await loadFull(main);
    };


    return (
        <div className="app">
        
        <Particles
      id="tsparticles"
      init={particlesInit}

      options={{
    "fullScreen": {
        "enable": true,
        "zIndex": -1
    },
    "detectRetina": true,
    "fpsLimit": 120,
    "interactivity": {
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": ["bubble"],
                },
                "onclick": {
                    "enable": false,
                    "mode": "repulse",
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 30,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
    "particles": {
        "color": {
            "value": "#ffffff"
        },
        "lineLinked": {
            "enable": true,
                "distance": 600,
                "color": "#1f4da1",
                "opacity": 0.4,
                "width": 2
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "outMode": "out",
            "bounce": false,
            "attract": {
                "enable": true,
                "rotateX": 600,
                "rotateY": 1200
            }
        },
        "number": {
            "density": {
                "enable": false,
                "area": 800
            },
            "limit": 0,
            "value": 10
        },
        "opacity": {
            "animation": {
                "enable": true,
                "minimumValue": 0.2,
                "speed": 1,
                "sync": false
            },
            "random": true,
            "value": 1
        },
        "rotate": {
            "animation": {
                "enable": true,
                "speed": 5,
                "sync": false
            },
            "direction": "random",
            "random": true,
            "value": 0
        },
        "shape": {
            "character": {
                "fill": false,
                "font": "Verdana",
                "style": "",
                "value": "*",
                "weight": "400",
                "options": {
                    "side": 6,
            },
            },
            "image": [
                {
                    "src": "https://cdn.discordapp.com/attachments/940219338055614514/1036261574366724116/chemical.png",
                    "width": 32,
                    "height": 32
                },
            ],
            "polygon": {
                "sides": 5
            },
            "stroke": {
                "color": "#000000",
                "width": 0
            },
            "type": "image"
        },
        "size": {
            "animation": {
                "enable": false,
                "minimumValue": 0.1,
                "speed": 40,
                "sync": false
            },
            "random": false,
            "value": 10
        }
    },
    "polygon": {
        "draw": {
            "enable": false,
            "lineColor": "#1f4da1",
            "lineWidth": 0.5
        },
        "move": {
            "radius": 10
        },
        "scale": 1,
        "type": "none",
        "url": ""
    },
    "background": {
        "color": "#fff",
        "image": "",
        "position": "50% 50%",
        "repeat": "no-repeat",
        "size": "cover"
    }
}
      }
    />
        </div>
      );
    }