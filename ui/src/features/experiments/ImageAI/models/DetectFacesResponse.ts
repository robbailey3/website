export interface DetectFacesResponse {
	bounding_poly: BoundingPoly;
	fd_bounding_poly: BoundingPoly;
	landmarks: Landmark[];
	roll_angle: number;
	pan_angle: number;
	tilt_angle: number;
	detection_confidence: number;
	landmarking_confidence: number;
	joy_likelihood: number;
	sorrow_likelihood: number;
	anger_likelihood: number;
	surprise_likelihood: number;
	under_exposed_likelihood: number;
	blurred_likelihood: number;
	headwear_likelihood: number;
}

export interface BoundingPoly {
	vertices: Vertex[];
}

export interface Vertex {
	x: number;
	y: number;
}

export interface Landmark {
	type: number;
	position: Position;
}

export interface Position {
	x: number;
	y: number;
	z: number;
}
