var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'sphere' shape.
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    var leftBox = BABYLON.MeshBuilder.CreateBox("left", {height: 2, width: 1, depth: 1}, scene);
    leftBox.position.x = -2;

    var rightBox = BABYLON.MeshBuilder.CreateBox("left", {height: 2, width: 1, depth: 1}, scene);
    rightBox.position.x = 2;

    var frontBox = BABYLON.MeshBuilder.CreateBox("left", {height: 2, width: 1, depth: 1}, scene);
    frontBox.position.z = -2;
        

    var move_sphere = {obj: sphere, prop: 'position', val: new BABYLON.Vector3(0, 4, 0), dims: ['x', 'y', 'z']};

    var move_leftBox = {obj: leftBox, prop: 'position', val: new BABYLON.Vector3(0, 0, 2), dims: ['x', 'y', 'z']};
    var move_rightBox = {obj: rightBox, prop: 'position', val: new BABYLON.Vector3(0, 0, -2), dims: ['x', 'y', 'z']};
    var move_frontBox = {obj: frontBox, prop: 'position', val: new BABYLON.Vector3(0, 4, 0), dims: ['x', 'y', 'z']};

    var dim_light = {obj: light, prop: 'intensity', val: 0, dims: false};
    var animations = [];

    // add sphere and light animations to array
    animations.push(move_sphere);
    animations.push(dim_light);
    animations.push(move_leftBox);
    animations.push(move_rightBox);
    animations.push(move_frontBox);

    // execute animations
    document.getElementById('renderCanvas').addEventListener('click', () => {
        animate(animations, scene, 4);
    });
    



    // Our built-in 'ground' shape.
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    return scene;
};
        window.initFunction = async function() {
            
            
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
startRenderLoop(engine, canvas);
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene                    
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});