// create a variable to hold our world object
let world;

// create a variable to hold our marker
let markerHiro;

function setup() {
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');

  // grab a reference to the marker that we set up on the HTML side (connect to it using its 'id')
  markerHiro = world.getMarker('hiro');

  // create some geometry to add to our marker
  // the marker is 1 meter x 1 meter, with the origin at the center
  // the x-axis runs left to right, z-xaxis runs top to bottom, y-axis runs up/down (through the marker)

  // add in a demo of a few different 3D geometry type


  // add a Wavefront (OBJ) model
  // you need to make sure to reference both the OBJ and MTL file here (geometry & material are stored separately)
  // refer to the 'index.html' file to see how these were pre-loaded into the scene
  model = new OBJ({
	asset: 'model_obj',
	mtl: 'model_mtl',
	x: 0,
	y: 0,
	z: 0,
	rotationX:0,
	rotationY:180,
	scaleX: 0.15,
	scaleY: 0.15,
	scaleZ: 0.15,
  });
  markerHiro.add(model);

}


function draw() {



}
