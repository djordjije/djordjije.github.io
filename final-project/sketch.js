/*
This is where I got the height map and terrain material from.
https://www.motionforgepictures.com/height-maps/

Example code for setting up ground from height map.
https://doc.babylonjs.com/divingDeeper/mesh/creation/set/height_map
*/

// Class to build multiple trees
// let tree = class {
//     constructor(root, filename) {
//         this.root = root;
//         this.filename = filename;
//     }

//     build(xOff, yOff, zOff) {
//         let treeObj = placeObject(root, filename, new BABYLON.Vector3(xOff, yOff, zOff), scene, 0.1, new BABYLON.Vector3(0, Math.PI, 0));
//     }
// }

// function buildTree(xOff, yOff, zOff) {
//     var treeObj = placeObject('./', 'tree_obj.obj', new BABYLON.Vector3(xOff, yOff, zOff), scene, 0.1, new BABYLON.Vector3(0, Math.PI, 0));
//     return treeObj;
// }


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

    // Our built-in 'ground' shape.
    //var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    // Create a material with our land texture.
     let groundMaterial = new BABYLON.StandardMaterial("ground", scene);
     groundMaterial.diffuseTexture = new BABYLON.Texture("Diffuse.png", scene);

    var ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("gdhm", "./Height-Map.png", {
        width: 20, height: 1.5, subdivisions: 250, maxHeight: 10, minHeight: 0
    }, scene);
    ground.material = groundMaterial;

    

    // Object from TurboSquid
    var tree = placeObject('./', 'tree_obj.obj', new BABYLON.Vector3(0, 3.5, -2), scene, 0.1, new BABYLON.Vector3(0, Math.PI, 0));
    var tree2 = placeObject('./', 'tree_obj.obj', new BABYLON.Vector3(2, 3.5, 0), scene, 0.1, new BABYLON.Vector3(0, Math.PI, 0));
    var tree3 = placeObject('./', 'tree_obj.obj', new BABYLON.Vector3(-2, 3.5, -1), scene, 0.1, new BABYLON.Vector3(0, Math.PI, 0));

    //var trees = new tree('./', 'tree_obj.obj');
    //trees.build(2, 4, 0);
    

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