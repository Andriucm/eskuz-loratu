// firebase.js
import {
//   createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
//   sendPasswordResetEmail, 
  onAuthStateChanged,
  signOut
} from 'firebase/auth'
import { auth } from "@/config/firebase";



export function useAuth() {

  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

//   function signUp(email, password) {
//     return createUserWithEmailAndPassword(auth, email, password)
//   }

  function signOutUser() {
    return signOut(auth)
  }

//   function resetPassword(email) {
//     return sendPasswordResetEmail(auth, email)
//   }

  function observeAuthState(callback) {
    return onAuthStateChanged(auth, callback)
  }

    const errorCodes = {
		"auth/user-not-found": "Usuario no encontrado",
		"auth/invalid-email": "Correo electrónico inválido",
		"auth/invalid-credential": "Credencial inválida",
		"auth/missing-password": "La contraseña es obligatoria",
		"auth/wrong-password": "Contraseña incorrecta",
		"auth/weak-password": "La contraseña es débil. Debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.",
		"auth/email-already-in-use": "El correo electrónico ya está en uso",
		"auth/requires-recent-login": "Necesitas iniciar sesión de nuevo para realizar esta acción",
		"auth/user-disabled": "La cuenta de usuario ha sido deshabilitada",
		"auth/operation-not-allowed": "Operación no permitida",
		// Puedes añadir más códigos de error y mensajes aquí según lo necesites
	};


  return {
		signIn,
		// signUp,
		signOutUser,
		// resetPassword,
		observeAuthState,
		errorCodes,
  };
}
