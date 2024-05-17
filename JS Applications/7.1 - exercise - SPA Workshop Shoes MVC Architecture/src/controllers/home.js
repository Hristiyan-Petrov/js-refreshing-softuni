import { extendContext, dbRef } from '../helpers.js'
import { getDocs } from "../firebase-config.js"

export async function homePage(context) { // Get Sammy functions is used to render views; Post and others not 
    let offers;

    try {
        let res = await getDocs(dbRef);
        // getDocs() method from Firebase's Firestore returns a QuerySnapshot object that contains zero or more QueryDocumentSnapshot objects. 
        // Each of these objects represents a document in the Firestore database.
        // Attach shoes array to context, use it in the template 
        offers = res.docs.map(offer => ({ id: offer.id, ...offer.data() }));

    } catch (error) {
        console.log(error);
    }

    // Rendering

    // Old method
    // extendContext(context)
    // .then(function () {
    //     this.partial('./templates/home.hbs'); // Sammy out of the box function for loading views, templates
    // });

    await extendContext(context);
    this.partial('./templates/home.hbs', { offers, ...this.app.userData });
    // Sammy out of the box function for loading views, templates
    // Pass template params as object as second arg
}