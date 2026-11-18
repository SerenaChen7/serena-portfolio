window.onload = function() {
	// Vertex shader program
	var VSHADER_SOURCE =
		'attribute vec4 a_Position;\n' +
		'attribute vec4 a_Color;\n' +
		'uniform mat4 u_ModelViewMatrix;\n' +
		'varying vec4 v_Color;\n' +
		'void main() {\n' +
		'  gl_Position = u_ModelViewMatrix * a_Position;\n' +
		'  v_Color = a_Color;\n' +
		'}\n';

	// Fragment shader program
	var FSHADER_SOURCE =
		'#ifdef GL_ES\n' +
		'precision mediump float;\n' +
		'#endif\n' +
		'varying vec4 v_Color;\n' +
		'void main() {\n' +
		'  gl_FragColor = v_Color;\n' +
		'}\n';

	let sphere_length = 38016 * 16;
	let sphere_slice_length = 1188;

	var background_sphere = [];
	let background_sphere_length = 38016;

	let preset_background_sphere_slices = 32;
	let preset_background_sphere_stacks = 32;
	let preset_background_sphere_radius = 0.69;
	let preset_background_sphere_color = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0];

	let preset_sphere_slices = 200;
	let preset_sphere_stacks = 32;
	let preset_sphere_radius = 0.7;

	var spheres_amount = 18;
	var spheres = [];
	var spheres_step = [];
	var spheres_color = [];

	var R = 0.7;
	var vertexColorBuffer;
	var current_selected_color;

	var score = 0;
	var health = 2;
	var goal_score = 20;

	function main() {
		var canvas = document.getElementById('webgl');

		var gl = getWebGLContext(canvas);
		// Initialize shaders
		initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)
		// Set the vertex coordinates and color (the blue triangle is in the front)
		var n = initVertexBuffers(gl);
		// Specify the color for clearing <canvas>
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		// Get the storage location of u_ModelViewMatrix and u_ModelMatrix
		var u_ModelViewMatrix = gl.getUniformLocation(gl.program, 'u_ModelViewMatrix');
		var viewMatrix = new Matrix4();
		var modelMatrix = new Matrix4();
		viewMatrix.setLookAt(0, 0, 1, 0, 0, 0, 0, 1, 0);
		var scoreElement = document.querySelector("#score");
		var scoreNode = document.createTextNode("");
		scoreElement.appendChild(scoreNode);

		var healthElement = document.querySelector("#health");
		var healthNode = document.createTextNode("");
		healthElement.appendChild(healthNode);

		var statElement = document.querySelector("#stat");
		var statNode = document.createTextNode("");
		statElement.appendChild(statNode);

		var tick = function() {
			// Multiply model matrix to view matrix
			var modelViewMatrix = viewMatrix.multiply(modelMatrix);
			// Pass the model view projection matrix
			gl.uniformMatrix4fv(u_ModelViewMatrix, false, modelViewMatrix.elements);
			// Clear <canvas>
			gl.clear(gl.COLOR_BUFFER_BIT);
			updateFrame(gl);
			// Draw the rectangle
			gl.drawArrays(gl.TRIANGLES, 0, n);
			current_selected_color = selectedColor(gl, canvas);
			scoreNode.nodeValue = score + "/" + goal_score;
			healthNode.nodeValue = health;
			if (health > 0 && score < goal_score) {
				requestAnimationFrame(tick, canvas);
			} else {
				if (score == goal_score) {
					statNode.nodeValue = "Congratulations! You win! ";
				} else {
					statNode.nodeValue = "You lose!";
				}
			}
		};
		tick();

		document.onmousedown = function(ev) {
			MouseDown(ev, canvas);
		}
		document.onmousemove = function(ev) {
			MouseMove(ev, viewMatrix);
		}
		document.onmouseup = function(ev) {
			MouseUp(ev);
		}
	}

	function getSphereVertices(origin, coordinates, slices, stacks, radius, color, stop_slices) {
		var vertice = new Vector4();
		var vertices = [];
		var current_slice_vertices = [];
		var previous_slice_vertices = [];

		var m1 = new Matrix4();
		m1.elements[0] = coordinates[0];
		m1.elements[1] = coordinates[1];
		m1.elements[2] = coordinates[2];
		m1.elements[3] = 0;
		m1.elements[4] = coordinates[4];
		m1.elements[5] = coordinates[5];
		m1.elements[6] = coordinates[6];
		m1.elements[7] = 0;
		m1.elements[8] = coordinates[8];
		m1.elements[9] = coordinates[9];
		m1.elements[10] = coordinates[10];
		m1.elements[11] = 0;
		m1.elements[12] = 0;
		m1.elements[13] = 0;
		m1.elements[14] = 0;
		m1.elements[15] = 1;

		var M = new Matrix4();
		m1.invert();

		var O = new Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0);
		m1.elements[15] = 0;


		M = O.multiply(m1);
		M.transpose();
		M.elements[15] = 1;
		M.invert();
		M.elements[15] = 0;


		for (var i = 0; i <= slices; i++) {
			if (i > stop_slices) {
				break;
			}
			var radians = i * (Math.PI / slices);
			var z = Math.cos(radians) * radius;
			for (var j = 0; j <= stacks; j++) {
				var slice_radians = j * (2 * Math.PI / stacks);
				var x = radius * Math.sin(radians) * Math.cos(slice_radians);
				var y = radius * Math.sin(radians) * Math.sin(slice_radians);

				vertice = new Vector4();
				vertice.elements[0] = x;
				vertice.elements[1] = y;
				vertice.elements[2] = z;

				var T = new Matrix4();
				T.set(M);
				vertice = T.multiply(vertice);

				current_slice_vertices.push(origin[0] + vertice.elements[0]);
				current_slice_vertices.push(origin[1] + vertice.elements[1]);
				current_slice_vertices.push(origin[2] + vertice.elements[2]);

				if (previous_slice_vertices.length != 0 && current_slice_vertices.length > 1) {
					vertices.push(previous_slice_vertices[(j - 1) * 3 + 0]);
					vertices.push(previous_slice_vertices[(j - 1) * 3 + 1]);
					vertices.push(previous_slice_vertices[(j - 1) * 3 + 2]);
					vertices.push(color[0]);
					vertices.push(color[1]);
					vertices.push(color[2]);
					vertices.push(previous_slice_vertices[j * 3 + 0]);
					vertices.push(previous_slice_vertices[j * 3 + 1]);
					vertices.push(previous_slice_vertices[j * 3 + 2]);
					vertices.push(color[0]);
					vertices.push(color[1]);
					vertices.push(color[2]);
					vertices.push(current_slice_vertices[(j - 1) * 3 + 0]);
					vertices.push(current_slice_vertices[(j - 1) * 3 + 1]);
					vertices.push(current_slice_vertices[(j - 1) * 3 + 2]);
					vertices.push(color[0]);
					vertices.push(color[1]);
					vertices.push(color[2]);

					vertices.push(previous_slice_vertices[j * 3 + 0]);
					vertices.push(previous_slice_vertices[j * 3 + 1]);
					vertices.push(previous_slice_vertices[j * 3 + 2]);
					vertices.push(color[3]);
					vertices.push(color[4]);
					vertices.push(color[5]);
					vertices.push(current_slice_vertices[(j - 1) * 3 + 0]);
					vertices.push(current_slice_vertices[(j - 1) * 3 + 1]);
					vertices.push(current_slice_vertices[(j - 1) * 3 + 2]);
					vertices.push(color[3]);
					vertices.push(color[4]);
					vertices.push(color[5]);
					vertices.push(current_slice_vertices[j * 3 + 0]);
					vertices.push(current_slice_vertices[j * 3 + 1]);
					vertices.push(current_slice_vertices[j * 3 + 2]);
					vertices.push(color[3]);
					vertices.push(color[4]);
					vertices.push(color[5]);
				}
			}
			previous_slice_vertices = current_slice_vertices;
			current_slice_vertices = [];
		}
		return vertices;
	}

	function initVertexBuffers(gl) {
		background_sphere = new Float32Array(getSphereVertices([0, 0, 0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
			preset_background_sphere_slices, preset_background_sphere_stacks, preset_background_sphere_radius,
			preset_background_sphere_color, preset_background_sphere_slices));

		for (var i = 0; i < spheres_amount; i++) {
			spheres_color[i] = getRandomColor();
			spheres[i] = new Float32Array(getSphereVertices([0, 0, 0], getRandomBasis().elements, preset_sphere_slices,
				preset_sphere_stacks, preset_sphere_radius, spheres_color[i], preset_sphere_slices));
			spheres_step[i] = 0;
		}
		vertices = new Float32Array(background_sphere_length + spheres_amount * spheres[0].length);
		vertices.set(background_sphere);

		var n = vertices.length / 6;

		// Create a buffer object
		vertexColorBuffer = gl.createBuffer();
		if (!vertexColorBuffer) {
			console.log('Failed to create the buffer object');
			return -1;
		}
		// Write the vertex coordinates and color to the buffer object
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

		var FSIZE = vertices.BYTES_PER_ELEMENT;
		// Assign the buffer object to a_Position and enable the assignment
		var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
		if (a_Position < 0) {
			console.log('Failed to get the storage location of a_Position');
			return -1;
		}
		gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
		gl.enableVertexAttribArray(a_Position);
		// Assign the buffer object to a_Color and enable the assignment
		var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
		if (a_Color < 0) {
			console.log('Failed to get the storage location of a_Color');
			return -1;
		}
		gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
		gl.enableVertexAttribArray(a_Color);

		// Unbind the buffer object
		gl.bindBuffer(gl.ARRAY_BUFFER, null);

		return n;
	}

	var lastX = -1,
		lastY = -1;
	var x = -1,
		y = -1;
	var mouseUp = true;

	var motionAxis = new Vector4(0, 0, 0, 0);
	var rotationAxis = new Vector4(0, 0, 0, 0);

	var V = new Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

	var click_down_X;
	var click_down_Y;
	var click_up_X;
	var click_up_Y;

	function MouseDown(event, canvas) {
		var rect = event.target.getBoundingClientRect();
		click_down_X = event.clientX - rect.left;
		click_down_Y = event.clientY - rect.top;

		if (click_down_X >= 0 && click_down_X <= canvas.width && click_down_Y >= 0 && click_down_Y <= canvas.height) {
			mouseUp = false;
		}
	}

	function MouseMove(event, viewMatrix) {
		x = event.clientX;
		y = event.clientY;

		if (!mouseUp) {
			motionAxis.elements[0] = x - lastX
			motionAxis.elements[1] = -(y - lastY);

			if (motionAxis.elements[0] != 0 || motionAxis.elements[1] != 0) {
				rotationAxis.elements[0] = -motionAxis.elements[1];
				rotationAxis.elements[1] = motionAxis.elements[0];

				var rotationAngle = Math.sqrt(rotationAxis.elements[0] * rotationAxis.elements[0] + rotationAxis.elements[1] *
					rotationAxis.elements[1]) / 4;
				var magnitude = Math.sqrt(rotationAxis.elements[0] * rotationAxis.elements[0] + rotationAxis.elements[1] *
					rotationAxis.elements[1]);
				rotationAxis.elements[0] /= magnitude;
				rotationAxis.elements[1] /= magnitude;



				V.elements[0] = viewMatrix.elements[0];
				V.elements[1] = viewMatrix.elements[1];
				V.elements[2] = viewMatrix.elements[2];
				V.elements[3] = 0;
				V.elements[4] = viewMatrix.elements[4];
				V.elements[5] = viewMatrix.elements[5];
				V.elements[6] = viewMatrix.elements[6];
				V.elements[7] = 0;
				V.elements[8] = viewMatrix.elements[8];
				V.elements[9] = viewMatrix.elements[9];
				V.elements[10] = viewMatrix.elements[10];
				V.elements[11] = 0;
				V.elements[12] = 0;
				V.elements[13] = 0;
				V.elements[14] = 0;
				V.elements[15] = 0;

				//console.log("V",V.elements);

				var M = new Matrix4();
				V.invert()

				var O = new Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0);
				M = O.multiply(V);
				M.transpose();
				var rotationAxis_converted = new Vector4();
				rotationAxis_converted = M.multiply(rotationAxis);

				//console.log("R",rotationAxis_converted.elements);

				viewMatrix.rotate(rotationAngle, rotationAxis_converted.elements[0], rotationAxis_converted.elements[1],
					rotationAxis_converted.elements[2]);
			}
		}
		lastX = event.clientX;
		lastY = event.clientY;
	}

	function MouseUp(event) {
		mouseUp = true;
		var rect = event.target.getBoundingClientRect();
		click_up_X = event.clientX - rect.left;
		click_up_Y = event.clientY - rect.top;

		if (Math.abs(click_down_X - click_up_X) < 4 && Math.abs(click_down_Y - click_up_Y) < 4) {
			for (var i = 0; i < spheres_amount; i++) {
				if (Math.abs(current_selected_color[0] - spheres_color[i][0] * 255) < 1 && Math.abs(current_selected_color[1] -
						spheres_color[i][1] * 255) < 1 && Math.abs(current_selected_color[2] - spheres_color[i][2] * 255) < 1) {
					spheres_color[i] = getRandomColor();
					spheres[i] = new Float32Array(getSphereVertices([0, 0, 0], getRandomBasis().elements, preset_sphere_slices,
						preset_sphere_stacks, preset_sphere_radius, spheres_color[i], preset_sphere_slices));
					spheres_step[i] = 0;
					score += 1;
					break;
				}
			}
		}
	}

	function getRandomBasis() {
		var x = Math.random() * 2 - 1;
		var y = Math.random() * 2 - 1;
		var z = Math.random() * 2 - 1;

		var magnitude = Math.sqrt(x * x + y * y + z * z);

		x /= magnitude;
		y /= magnitude;
		z /= magnitude;

		var angle = Math.random() * 180;

		var axis = new Vector4();

		axis.elements[0] = x;
		axis.elements[1] = y;
		axis.elements[2] = z;

		var basis = new Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
		basis.setRotate(angle, axis.elements[0], axis.elements[1], axis.elements[2]);
		//basis.setRotate(90, 0, 0, 1);
		//console.log(basis.elements); 

		return basis;
	}

	function getRandomColor() {
		var RandomColor = [];

		var R = Math.floor(Math.random() * 101) / 100;
		var G = Math.floor(Math.random() * 101) / 100;
		var B = Math.floor(Math.random() * 101) / 100;

		RandomColor.push(R);
		RandomColor.push(G);
		RandomColor.push(B);
		RandomColor.push(R);
		RandomColor.push(G);
		RandomColor.push(B);

		return RandomColor;
	}

	var g_last = Date.now();
	var counter = 0;

	function updateFrame(gl) {
		var now = Date.now();
		var elapsed = now - g_last;
		g_last = now;

		counter += elapsed;
		if (counter > 64) {
			var vertices = new Float32Array(background_sphere_length + spheres_amount * spheres[0].length);
			vertices.set(background_sphere, 0);
			for (var i = 0; i < spheres_amount; i++) {
				if (spheres_step[i] <= preset_sphere_slices) {
					vertices.set(spheres[i].subarray(0, (spheres_step[i] + 1) * sphere_slice_length), background_sphere_length + i *
						spheres[0].length);
					spheres_step[i] = spheres_step[i] + 1;
				} else {
					health = Math.max(0, health - 1);
					spheres_color[i] = getRandomColor();
					spheres[i] = new Float32Array(getSphereVertices([0, 0, 0], getRandomBasis().elements, preset_sphere_slices,
						preset_sphere_stacks, preset_sphere_radius, spheres_color[i], preset_sphere_slices));
					spheres_step[i] = 0;
				}
			}
			updateBuffer(gl, vertices);
			counter = 0;
		}
	}

	function updateBuffer(gl, vertices) {
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

		var FSIZE = vertices.BYTES_PER_ELEMENT;
		// Assign the buffer object to a_Position and enable the assignment
		var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
		if (a_Position < 0) {
			console.log('Failed to get the storage location of a_Position');
			return -1;
		}
		gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
		gl.enableVertexAttribArray(a_Position);
		// Assign the buffer object to a_Color and enable the assignment
		var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
		if (a_Color < 0) {
			console.log('Failed to get the storage location of a_Color');
			return -1;
		}
		gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
		gl.enableVertexAttribArray(a_Color);

		// Unbind the buffer object
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}

	function selectedColor(gl, canvas) {
		const rect = gl.canvas.getBoundingClientRect();
		const mouseX = x - rect.left;
		const mouseY = y - rect.top;
		const pickX = mouseX * canvas.width / rect.width;
		const pickY = (rect.height - mouseY - 1) * canvas.height / rect.height;

		var ctx = canvas.getContext('webgl', {
			preserveDrawingBuffer: true
		});
		pixels = new Uint8Array(1 * 1 * 4);

		ctx.readPixels(pickX, pickY, 1, 1, ctx.RGBA, ctx.UNSIGNED_BYTE, pixels);

		return pixels;
	}
	main();
}
