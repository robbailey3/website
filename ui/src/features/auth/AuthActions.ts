import axios from 'axios';

export enum AuthAction {
	LOGIN = 'LOGIN'
}

async function GetFirebaseConfig() {
	const result = await axios.get('http://localhost:80/api/config/firebase');
	const config = result.data;
}

export async function InitialiseFirebase() {}
