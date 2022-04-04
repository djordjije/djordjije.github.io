let cross = class {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }

    build(xOff, yOff, zOff) {
        // var centerBox = BABYLON.Mesh.CreateBox("centerBox", {height: 1, width: 0.75, depth: 0.25}, scene);
        // centerBox.position.y = 2;
        // var centerBox = BABYLON.Mesh.CreateBox("centerBox", 1, scene);
        // centerBox.position.y = 1.5;
        let startHeight = 2;

        var centerSphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: this.width*1.3}, scene);
        centerSphere.position.x = xOff;
        centerSphere.position.y = startHeight + yOff;
        centerSphere.position.z = zOff;

        var left = BABYLON.MeshBuilder.CreateBox("left", {height: this.width, width: this.length, depth: this.width}, scene);
        left.position.y = startHeight + yOff;
        left.position.x = -this.width*2 + xOff;
        left.position.z = zOff;

        var right = BABYLON.MeshBuilder.CreateBox("right", {height: this.width, width: this.length, depth: this.width}, scene);
        right.position.y = startHeight + yOff;
        right.position.x = this.width*2 + xOff;
        right.position.z = zOff;

        var top = BABYLON.MeshBuilder.CreateBox("top", {height: this.length, width: this.width, depth: this.width}, scene);
        top.position.x = xOff;
        top.position.y = startHeight + yOff + this.length;
        top.position.z = zOff;

        var bottom = BABYLON.MeshBuilder.CreateBox("top", {height: this.length, width: this.width, depth: this.width}, scene);
        bottom.position.x = xOff;
        bottom.position.y = startHeight + yOff - this.length;
        bottom.position.z = zOff;
    }
}


var paul = new cross(1, 0.5);
console.log(paul);

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

    // put MY OWN OBJECT HERE 
    paul.build(1, 0, 0);
    paul.build(-1, 0, 2);
    paul.build(-1, -1, -1);

    // Our built-in 'sphere' shape.
    //var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);

    // Move the sphere upward 1/2 its height
    //sphere.position.y = 1;

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