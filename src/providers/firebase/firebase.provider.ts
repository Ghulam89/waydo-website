import { FacebookAuthProvider, GoogleAuthProvider, OAuthCredential, OAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from "../../firebaseConfig";

const firebaseProvider = { 
    auth: {
        social: {
            signInWithPopup: (provider: GoogleAuthProvider | FacebookAuthProvider | OAuthProvider): Promise<OAuthCredential> => {
                return new Promise<OAuthCredential>((resolve, reject) => {
                    signInWithPopup(auth, provider).then(async (result) => {
                        const credential = GoogleAuthProvider.credential(await result.user.getIdToken())
                        return resolve(credential)
                    }).catch((error) => {
                        return reject(new Error(error.message))
                    });
                    
                })
            },

            google: async function(): Promise<OAuthCredential> {
                const provider = new GoogleAuthProvider();
                return this.signInWithPopup(provider);
            },
    
            facebook: async function(): Promise<OAuthCredential> {
                const provider = new FacebookAuthProvider();
                return this.signInWithPopup(provider);
            },

            apple: async function(): Promise<OAuthCredential> {
                const provider = new OAuthProvider('apple.com');
                return this.signInWithPopup(provider);
            }
        }
    }
}

export default firebaseProvider;