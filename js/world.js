// Author: Abhinav


function World(scene){
    this.scene = scene;

    this.water = {};

    this.cities = [];
    this.missileBatteries = [];
    this.offenseMissiles = [];
    this.defenseMissiles = []

    this.offenseMissileLocations = [];
    this.cityLocations = [];
    this.missileBatteryLocations = [];

    this.defenseMissileExplosionsToBeRemoved = [];
    this.missilesToBeRemoved = [];
    this.citiesToBeRemoved =[];
    this.missileBatteriesToBeRemoved = [];

    // object used to raycast for getting mouse pointer
    this.objects = [];

    // Sound
    this.bgMusic = [];
    this.sounds = [];
    this.randomPraiseSounds = [];
    this.stageCompleteSounds = [];
    this.winGameSounds = [];
    this.looseGameSounds = [];

    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------

    this.initWorld = function(){

        // Add the Point lights
        this.createPointLights();

        this.setupCityLocations();
        this.setupOffenseMissileLocations(OFFENSE_MISSILE_FALL_HEIGHT,DISTANCE_BETWEEN_OFFENSE_MISSILE_LOCATIONS);
        this.setupMissileBatteryLocations();

        // Create invisible plane to check for mouse intersection
        this.createVerticalGamePlane()

        // Add the terrain
        this.createTerrain(0,TERRAIN_Y,0);

        // add water
        this.createWater(0,-800,0);

        // Add Cities
        for(var i=0;i<this.cityLocations.length;i++){
            this.cities.push(this.createCity(this.cityLocations[i]));
        }

        // Add MissileBatteries
        for(var i=0;i<this.missileBatteryLocations.length;i++){
            this.missileBatteries.push(this.createMissileBattery(this.missileBatteryLocations[i]));
        }
        // SETUP GAME PARAMS

    };

    //AUDIO

    this.initAudio = function(){

        this.bgMusic.push(new Audio('./sounds/stageBg.mp3'));

        this.sounds.push(new Audio('./sounds/base_destroy.wav'));
        this.sounds.push(new Audio('./sounds/missile_fire.wav'));
        this.sounds.push(new Audio('./sounds/missile_destroy.wav'));
        this.sounds.push(new Audio('./sounds/explosion.wav'));
        this.sounds.push(new Audio('./sounds/haha.mp3'));
        this.sounds.push(new Audio('./sounds/haha2.mp3'));

        this.sounds.push(new Audio());

        this.randomPraiseSounds.push(new Audio('./sounds/praise/sickdude.wav'));
        this.randomPraiseSounds.push(new Audio('./sounds/praise/sweet.wav'));
        this.randomPraiseSounds.push(new Audio('./sounds/praise/whoa_dude.wav'));
        this.randomPraiseSounds.push(new Audio('./sounds/praise/wow_cool.wav'));

        this.stageCompleteSounds.push(new Audio('./sounds/stageComplete/impressive.wav'));
        this.stageCompleteSounds.push(new Audio('./sounds/stageComplete/excellent.wav'));
        this.stageCompleteSounds.push(new Audio('./sounds/stageComplete/perfect.wav'));

        this.winGameSounds.push(new Audio('./sounds/winGame/win_opium_war.mp3'));
        this.winGameSounds.push(new Audio('./sounds/winGame/burns_excellent.wav'));

        this.looseGameSounds.push(new Audio('./sounds/looseGame/release_the_hounds.mp3'));
        this.looseGameSounds.push(new Audio('./sounds/looseGame/burns_fired.wav'));
    };

    this.playAudio = function(name){
        switch(name){
            case 'bgMusic':
                this.bgMusic[0].volume = .1;
                this.bgMusic[0].loop = true;
                this.bgMusic[0].play();
                break;
            case 'base_destroy':
                this.sounds[0].volume = .1;
                this.sounds[0].play();
                break;
            case 'missile_fire':
                this.sounds[1].volume = .1;
                this.sounds[1].play();
                break;
            case 'missile_destroy':
                this.sounds[2].volume = .1;
                this.sounds[2].play();
                break;
            case 'explosion':
                this.sounds[3].volume = .1;
                this.sounds[3].play();
                break;
            case 'haha':
                this.sounds[4].play();
                break;
            case 'haha2':
                this.sounds[5].play();
                break;
            case 'win':
                //this.winGameSounds[Math.floor(Math.random()*this.winGameSounds.length)].play();
                this.winGameSounds[0].play();
                break;
            case 'loose':
                //this.looseGameSounds[Math.floor(Math.random()*this.looseGameSounds.length)].play();
                this.looseGameSounds[0].play();
                break;
            case 'praise':
                this.randomPraiseSounds[Math.floor(Math.random()*this.randomPraiseSounds.length)].play();
                break;
            case 'stage_complete':
                this.stageCompleteSounds[Math.floor(Math.random()*this.stageCompleteSounds.length)].play();
                break;

        }
    };

    this.stopAudio = function(name){
        switch (name){
            case 'bgMusic':
                this.bgMusic[0].pause();
                break;
        }
    };

    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    // SETUP FUNCTIONS

    // Provide City Locations for the game
    this.setupCityLocations = function(){
        this.cityLocations.push(new THREE.Vector3(-1*DISTANCE_BETWEEN_CITY,1,0));
        this.cityLocations.push(new THREE.Vector3(0,1,0));
        this.cityLocations.push(new THREE.Vector3(DISTANCE_BETWEEN_CITY,1,0));
    };
    // Provide Missile Batteries Locations for the game
    this.setupMissileBatteryLocations = function () {
        this.missileBatteryLocations.push(new THREE.Vector3(-1*DISTANCE_BETWEEN_MISSILE_BATTERY,1,0));
        this.missileBatteryLocations.push(new THREE.Vector3(DISTANCE_BETWEEN_MISSILE_BATTERY,1,0));
    };
    // Provide Offense Missile Launch Locations for the game
    this.setupOffenseMissileLocations = function (fromHeight, gapBetween) {
        this.offenseMissileLocations.push(new THREE.Vector3(-4*gapBetween,fromHeight,0));
        this.offenseMissileLocations.push(new THREE.Vector3(-3*gapBetween,fromHeight,0));
        this.offenseMissileLocations.push(new THREE.Vector3(-2*gapBetween,fromHeight,0));
        this.offenseMissileLocations.push(new THREE.Vector3(-1*gapBetween,fromHeight,0));
        this.offenseMissileLocations.push(new THREE.Vector3(0,fromHeight,0));
        this.offenseMissileLocations.push(new THREE.Vector3(gapBetween,fromHeight,0));
        this.offenseMissileLocations.push(new THREE.Vector3(2*gapBetween,fromHeight,0));
        this.offenseMissileLocations.push(new THREE.Vector3(3*gapBetween,fromHeight,0));
        this.offenseMissileLocations.push(new THREE.Vector3(4*gapBetween,fromHeight,0));
    };

    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    //CREATE FUNCTIONS

    // create invisible plane for catching mouse position
    this.createVerticalGamePlane = function(){
        var geometry = new THREE.PlaneBufferGeometry( 5000, 5000 );
        var plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
        this.scene.add( plane );
        this.objects.push( plane);

    };

    // create and the terrain to the scene
    this.createTerrain = function(x,y,z){
        // Add Floor Material
        var TerrainMat = new THREE.MeshStandardMaterial( {
            roughness: 0.8,
            color: 0x00ff00,
            metalness: 0.2,
            bumpScale: 0.0005
        });
        //var terrainGeometry = new THREE.PlaneBufferGeometry( TERRAIN_LENGTH, TERRAIN_WIDTH );
        var terrainGeometry = new THREE.BoxBufferGeometry( TERRAIN_LENGTH, TERRAIN_WIDTH,30 );
        var terrain = new THREE.Mesh( terrainGeometry, TerrainMat );
        terrain.receiveShadow = true;
        terrain.rotation.x = -Math.PI / 2.0;
        terrain.position.set(x,y,z);
        this.scene.add( terrain );
        return terrain;
    };

    // create the water terrain
    this.createWater = function(x,y,z){
        var parameters = {
            oceanSide: 2000,
            size: 0.5,
            distortionScale: 5.0,
            alpha: 1.0
        };
        /*
        var waterMat = new THREE.MeshStandardMaterial( {
            roughness: 0.8,
            color: 0x0000ff,
            metalness: 0.8,
            bumpScale: 0.0005
        });

        var waterGeometry = new THREE.PlaneGeometry(WATER_LENGTH, WATER_WIDTH,64,64);


        this.water = new THREE.Mesh(waterGeometry, waterMat);
        this.water.receiveShadow = true;
        this.water.rotation.x = -Math.PI / 2.0;
        this.water.position.set(x,y,z);
        this.scene.add( this.water );
        return this.water;
        */
        this.water = new THREE.Water(
            WATER_WIDTH,
            WATER_LENGTH,
            {

                textureWidth: 512,
                textureHeight: 512,

                waterNormals: new THREE.TextureLoader().load( waterTextureImage.src, function ( texture ) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                }),

                alpha: 	parameters.alpha,
                sunDirection: this.starLight.position.clone().normalize(),//new THREE.Vector3(-30,200,0).normalize(),
                sunColor: 0xffffff,
                waterColor: 0x001188,
                distortionScale: parameters.distortionScale,
                fog: scene.fog != undefined
            }
        );
        this.water.rotation.x = - Math.PI / 2;
        //this.water.receiveShadow = true;
        this.scene.add( this.water );

    };
    // crate the world lights
    this.createPointLights = function(){
        // Add HemisphereLight
        this.hemiLight = new THREE.HemisphereLight( 0xffffff, 0xff0000, 1 );
        this.scene.add( this.hemiLight );

        // Add WorldPointLights
        var starMaterial = new THREE.MeshStandardMaterial( {
            emissive: STARLIGHT_COLORS[CURRENT_STAGE],
            emissiveIntensity: 1,
            color: STARLIGHT_COLORS[CURRENT_STAGE]
        });
        var starGeometry = new THREE.SphereGeometry( STARTLIGHT_RADIUS*(CURRENT_STAGE+1), 16, 16 );

        this.starLight = new THREE.PointLight( STARLIGHT_COLORS[CURRENT_STAGE], STARLIGHT_INTENSITY*(CURRENT_STAGE+1), STARTLIGHT_DISTNACE_TO_ZERO, 2 );
        this.starLight.add( new THREE.Mesh( starGeometry, starMaterial ) );
        this.starLight.position.set( 0, STARLIGHT_Y, STARTLIGHT_MOVEMENT_RADIUS );
        this.starLight.castShadow = true;
        this.starLight.shadow.mapSize.width = 512;
        this.starLight.shadow.mapSize.height = 512;
        this.starLight.shadow.camera.far = 5000;
        this.scene.add( this.starLight );

        /*
        var moonGeometry = new THREE.SphereGeometry( (STARTLIGHT_RADIUS*(CURRENT_STAGE+1))/3, 16, 16 );
        this.moon = new THREE.Mesh(moonGeometry, starMaterial);
        this.moon.castShadow = true;
        this.scene.add(this.moon);
        */


    };

    // Create and add a city to the scene
    this.createCity = function(location){
        var cityMaterial = new THREE.MeshStandardMaterial( {
            roughness: 0.7,
            color: 0xffffff,
            bumpScale: 0.002,
            metalness: 0.2
        });
        var cityGeometry = new THREE.SphereGeometry( CITY_SIZE, 32, 32 );
        var city = new THREE.Mesh( cityGeometry, cityMaterial );
        city.position.set( location.x, location.y, location.z );
        city.castShadow = true;
        city.id= CITY_ID;
        CITY_ID++;
        this.scene.add( city );

        // add default game params and return
        city.isDestoryed = false;
        return city;
    };

    // Create and add a missile battery to the scene
    this.createMissileBattery = function(location){
        var missileBatteryMaterial = new THREE.MeshStandardMaterial( {
            color: 0x0000ff,
            roughness: 0.7,
            bumpScale: 0.002,
            metalness: 0.5
        });
        var missileBatteryGeometry = new THREE.SphereGeometry( MISSILE_BATTERY_SIZE, 32, 32 );

        var missileBattery = new THREE.Mesh(missileBatteryGeometry , missileBatteryMaterial );
        missileBattery.position.set( location.x, location.y, location.z );
        missileBattery.castShadow = true;
        missileBattery.id = MISSILE_BATTERY_ID;
        MISSILE_BATTERY_ID++;
        this.scene.add( missileBattery );

        // Add default game params and return
        missileBattery.isDestoryed = false;
        return missileBattery;
    };



    // Create Missile
    this.createMissile = function(origin, destination, type){
        var missileMaterial = new THREE.MeshStandardMaterial( {
            //color: 0xff0000,
            roughness: 0.7,
            bumpScale: 0.002,
            metalness: 0.5
        });
        var missileGeometry = new THREE.SphereGeometry( MISSILE_SIZE, 32, 32 );

        var missile = new THREE.Mesh(missileGeometry , missileMaterial );
        missile.position.set( origin.x,origin.y, origin.z );
        missile.castShadow = false;
        // Add default game params and return
        missile.id = MISSILE_ID;
        MISSILE_ID++;
        missile.isDestoryed = false;
        missile.origin = origin;
        missile.destination = destination;
        missile.direction = new THREE.Vector3().subVectors(destination, origin).normalize();
        missile.type = type;
        if(type=='defense'){
            missileMaterial.color = new THREE.Color(0x00ff00);
            missile.speed = MISSILE_DEFENSE_SPEED;
            this.playAudio('missile_fire');
        }else{
            missileMaterial.color = new THREE.Color(0xff0000);
            missile.speed = MISSILE_OFFENSE_SPEED;
        }
        this.scene.add( missile );
        // If its a defense missile, increase speed and make it green

        return missile;
    };

    // create defense Explosion
    this.createDefenseExplosion = function (center) {
        var defenseExplosionMaterial = new THREE.MeshStandardMaterial( {
            color: 0xffa500,
            roughness: 0.7,
            bumpScale: 0.002,
            metalness: 0.5
        });
        var defenseExplosionGeometry = new THREE.SphereGeometry( DEFENSE_EXPLOSION_SIZE, 32, 32 );

        var defenseExplosion = new THREE.Mesh(defenseExplosionGeometry , defenseExplosionMaterial );
        defenseExplosion.position.set( center.x, center.y, center.z );
        defenseExplosion.castShadow = true;
        // duration till which that the explosions should exist
        defenseExplosion.removeAtTime = CURRENT_TIME + DEFENSE_EXPLOSION_DURATION_MILISECONDS;
        this.scene.add( defenseExplosion );
        this.playAudio('explosion');

        // Add default game params and return
        return defenseExplosion;
    };

    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------

    // Fire Missiles
    this.fireOffenseMissiles = function (missileCounts) {

        for(var i=1; i<=missileCounts; i++){
            var origin = this.offenseMissileLocations[Math.floor(Math.random()*this.offenseMissileLocations.length)];
            var destination = this.missileBatteryLocations[Math.floor(Math.random()*this.missileBatteryLocations.length)];
            // A random chance for missiles to target either batteries or cities.
            var coin = Math.random();
            if(coin<.5){
                destination = this.cityLocations[Math.floor(Math.random()*this.cityLocations.length)];
            }
            var currentMissile = this.createMissile(origin, destination,'offense');
            this.offenseMissiles.push(currentMissile);
        }
    };

    this.fireDefenseMissile = function(origin, destination) {
        var currentMissile = this.createMissile(origin, destination, 'defense');
        this.defenseMissiles.push(currentMissile);
    };

}