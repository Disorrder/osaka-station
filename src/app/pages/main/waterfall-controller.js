import ParticleSystem from 'app/extensions/three/GPUParticleSystem';
var textureLoader = new THREE.TextureLoader();

AFRAME.registerComponent('waterfall-controller', {
    init() {
        this.particleOptions = {
            position: new THREE.Vector3(),
            positionSpread: new THREE.Vector3(),
            velocity: new THREE.Vector3(0, -0, 0),
            velocitySpread: new THREE.Vector3(),
            acceleration: new THREE.Vector3(0, -9.8, 0),
            accelerationSpread: new THREE.Vector3(),
            color: new THREE.Color('#bbb'),
            colorSpread: 0.2,
            opacity: 1,
            lifetime: 1,
            size: 1,
            sizeSpread: 0
        };

        this.particleSystem = new ParticleSystem({
            maxParticles: 10000,
            particleSpriteTex: textureLoader.load( require('assets/textures/particle.png') ),
        }, this.particleOptions);

        this._particleCursor = 0;
        this._spawnDt = 0;
        this._spawnLastTime = 0;
        this.timeScale = 1; // not implemented

        // fountain options
        this.waterfall = {
            width: 5,
            spawners: 50,
        }

        // generate raws
        this.imageData = [];
        // for (let i = )

        this.el.setObject3D('particle-system', this.particleSystem);
    },

    tick(time, dt) { // flow
        time /= 1000; dt /= 1000;
        if (!this._spawnLastTime) return this._spawnLastTime = time;

        // this._spawnDt = time - this._spawnLastTime;

        this.particleOptions.position.x = _.random(-5/2, 5/2, true);
        this.particleSystem.spawnParticle(this.particleOptions);
        // for ( this._spawnLastTime; this._spawnLastTime <= time-this._spawnTimeInterval; this._spawnLastTime += this._spawnTimeInterval ) {
        //     console.log(this.particleOptions);
        // }

        this.particleSystem.update(time);
    }
});
