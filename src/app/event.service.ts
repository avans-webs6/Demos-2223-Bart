import { Injectable } from '@angular/core';
import { Observable, Subscriber, mergeMap } from 'rxjs';
import { initializeApp } from "firebase/app";
import { Firestore , getFirestore, onSnapshot, collection, addDoc, deleteDoc, doc, getDoc, updateDoc, DocumentReference, Unsubscribe } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATK7HrO9iF5q8eJ8VLJ_v_jeMhVMvcnd4",
  authDomain: "adweb-demos.firebaseapp.com",
  projectId: "adweb-demos",
  storageBucket: "adweb-demos.appspot.com",
  messagingSenderId: "922213293995",
  appId: "1:922213293995:web:b3058c8215848a07093cee"
};

@Injectable({
  providedIn: 'root'
})
export class EventService {

  firestore: Firestore;

  constructor() {
    const app = initializeApp(firebaseConfig);

    this.firestore = getFirestore(app);

    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, 'bfm.luijten@avans.nl', 'MijnGeheimeWachtwoord').then((response) => {
      console.log(response);
    });
  }

  getEvents(): Observable<any[]> {
    return new Observable((subscriber: Subscriber<any[]>) => {
      onSnapshot(collection(this.firestore, 'events'), (snapshot) => {
        let events: any[] = [];
        snapshot.forEach((doc) => {
          let event = doc.data();
          event['id'] = doc.id;
          events.push(event);
        });
        subscriber.next(events);
      });
    });
  }

  eventUnsubscribe: any;

  getEvent(id: any): Observable<any> {
    return new Observable((subscriber: Subscriber<any>) => {
      if (this.eventUnsubscribe) this.eventUnsubscribe();
      this.eventUnsubscribe = onSnapshot(doc(this.firestore, "events", id), (doc) => {
        let event = doc.data() ?? {};
        event['id'] = doc.id;

        subscriber.next(event);
      });
    })
  }

  organiserUnsubscribe: any;

  getOrganiser(event: any): Observable<any> {
    return new Observable((subscriber: Subscriber<any>) => {
      if (this.organiserUnsubscribe) this.organiserUnsubscribe();
      if (event.organiser) {
        this.organiserUnsubscribe = onSnapshot(event.organiser, (doc: any) => {
          subscriber.next(doc.data() ? doc.data()["name"] : "Error");
        });
      } else {
        subscriber.next("Unknown");
      }
    });
  }

  addEvent(event: any) {
    addDoc(collection(this.firestore, "events"), event);
  }

  deleteEvent(event: any) {
    deleteDoc(doc(this.firestore, "events", event.id));
  }

  updateEvent(id: any, event: any) {
    updateDoc(doc(this.firestore, "events", id), event)
  }

  //Down the Rabbit Hole: Mojo Concerts
  //Best Kept Secret: Friendly Fire
  //Lowlands: Mojo Concerts
  //Pinkpop: Buro Pinkpop
  //Into the Great Wide Open: Stichting Into the Great Wide Open
  //North Sea Jazz: Mojo Concerts
  //Mysteryland: ID&T
  //Zwarte Cross: Feestfabriek Alles Komt Goed BV
}
