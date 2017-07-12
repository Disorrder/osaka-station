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
            size: 0.3,
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
        let rows = 60;
        let cols = this.waterfall.spawners;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col ++) {
                let i = row * cols + col;
                this.imageData[i] = ((i / 10) % 2 < 1) ? 0.8 : 0;
                // if (row / 20 % 2 > 1) this.imageData[i] = 0;
            }
        }

        this.spawnRate = 90;
        this.spawnTime = 1 / this.spawnRate;
        this.imgReadingSpeed = 20; // vertical pixels per sec
        this.imgCurrentRow = rows;

        this.debugArr = [];

        // console.log(this.imageData);
        this.el.setObject3D('particle-system', this.particleSystem);
    },

    tick(time, dt) { // flow
        time /= 1000; dt /= 1000;
        if (time > 2 && time < 2.2) console.log(this.debugArr)
        if (time > 2) return;
        if (!this._spawnLastTime) return this._spawnLastTime = time;
        this._spawnDt = time - this._spawnLastTime;

        for (this._spawnDt -= this.spawnTime; this._spawnDt >= 0; this._spawnDt -= this.spawnTime) {
            // this.particleOptions.position.x = _.random(-5/2, 5/2, true);
            this.particleOptions.time = time - this._spawnDt;
            this.particleSystem.spawnParticle(this.particleOptions);
            this._spawnLastTime = this.particleOptions.time;
            // console.log(time, this.particleOptions.time);
            this.debugArr.push({time, spawnAt: this.particleOptions.time})
        }

        this.particleSystem.update(time);
    }
});
