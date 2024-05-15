import { extendContext, dbRef } from '../helpers.js'
import { getDocs } from "../firebase-config.js"

export function homePage(context) { // Get Sammy functions is used to render views; Post and others not 
    getDocs(dbRef)
        .then(res => {

            // getDocs() method from Firebase's Firestore returns a QuerySnapshot object that contains zero or more QueryDocumentSnapshot objects. 
            // Each of these objects represents a document in the Firestore database.
            // Attach shoes array to context, use it in the template 
            context.offers = res.docs.map(offer => ({ id: offer.id, ...offer.data() }));

            // Rendering
            extendContext(context)
                .then(function () {
                    this.partial('./templates/home.hbs'); // Sammy out of the box function for loading views, templates
                });
        })
        .catch(err => {
            console.log(err);
        });
}