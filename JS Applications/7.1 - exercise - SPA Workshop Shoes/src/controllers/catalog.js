import { extendContext, getUserData, dbRef } from '../helpers.js';
import {
    // Firestore
    db,
    addDoc,
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    updateDoc,
    arrayUnion,
    deleteDoc
} from "../firebase-config.js"


// Rendering functions

export function createOfferPage(context) {
    extendContext(context)
        .then(function () {
            this.partial('./templates/createOffer.hbs');
        });

}

export function editOfferPage(context) {
    const { id } = context.params; // id comes from the URL parameter
    const docRef = doc(db, 'offers', id); // Reference the document

    getDoc(docRef)
        .then(res => {

            // Attach context data for template
            context.offer = { id: res.id, ...res.data() };
            console.log(context.offer);

            // Rendering
            extendContext(context)
                .then(function () {
                    this.partial('./templates/editOffer.hbs');
                });
        });
}

export function detailsPage(context) {

    const { id } = context.params; // id comes from the URL parameter
    const offerRef = doc(db, 'offers', id); // Reference the document

    getDoc(offerRef)
        .then(res => {

            let { creatorId, peopleBoughtIt } = res.data();
            // Attach context data for template
            context.offer = { id: res.id, ...res.data() };
            context.isCreator = Boolean(isCreator(creatorId));
            context.isBought = Boolean(peopleBoughtIt.includes(getUserData().email));
            context.buys = peopleBoughtIt.length;

            // Rendering
            extendContext(context)
                .then(function () {
                    this.partial('./templates/details.hbs');
                });
        });
}

// User Interaction functions

export function createOffer(context) {
    let { productName, price, brand, description, imageUrl } = context.params;

    addDoc(dbRef, {
        productName,
        price,
        imageUrl,
        description,
        brand,
        creatorId: getUserData().uid,
        peopleBoughtIt: []
    })
        .then(res => {
            console.log(res);
            this.redirect('/home');
        })
        .catch(err => {
            console.log(err);
        })
}

export function editOffer(context) {
    let { productName, price, brand, description, imageUrl } = context.params;
    const { id } = context.params; // id comes from the URL parameter
    const offerRef = doc(db, 'offers', id); // Reference the document

    setDoc(offerRef, {
        productName,
        price,
        imageUrl,
        description,
        brand,
        // creatorId: getUserData().uid
    }, { merge: true }) // Using merge: true to prevent deletion of fields not included in this setDoc call
        .then(() => {
            this.redirect(`/details/${id}`);
        })
        .catch(err => {
            console.log(err);
        })
}

export function buyOffer(context) {
    const { id } = context.params; // id comes from the URL parameter
    const offerRef = doc(db, 'offers', id); // Reference the document

    updateDoc(offerRef, {
        peopleBoughtIt: arrayUnion(getUserData().email)
    })
        .then(() => {
            console.log("Document successfully updated!");
            this.redirect(`#/details/${id}`);
        })
        .catch((error) => {
            console.error(error);
        });

}

export function deleteOffer(context) {
    const { id } = context.params;
    const offerRef = doc(db, 'offers', id); // Reference the document

    deleteDoc(offerRef)
        .then(() => {
            console.log("Document successfully deleted!");
            this.redirect('#/home');
        })
        .catch((error) => {
            console.log(error);
        });
}