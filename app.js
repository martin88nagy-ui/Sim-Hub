import { db } from "./firebase.js";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

async function loadLeaderboard() {
  const q = query(
    collection(db, "users"),
    orderBy("xp", "desc"),
    limit(10)
  );

  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    console.log(doc.data().name, doc.data().xp);
  });
}

loadLeaderboard();
