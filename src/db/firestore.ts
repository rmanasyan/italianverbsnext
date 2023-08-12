import { cache } from 'react'
import { DocumentData, QuerySnapshot } from 'firebase-admin/firestore'
import { Conjugation, Verb } from '@/types/verbs'
import { firebase } from '@/db/firebase'

const firestore = firebase.firestore()

const collectionData = async <T extends DocumentData>(
  collectionRef: FirebaseFirestore.Query<DocumentData>
): Promise<T[]> => {
  try {
    const snapshot: QuerySnapshot<DocumentData> = await collectionRef.get()

    const documents: DocumentData[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return documents as T[]
  } catch (error) {
    console.error('Error listing collection data: ', error)
    return []
  }
}

export const getFeaturedVerbs = cache((): Promise<Verb[]> => {
  const collectionRef: FirebaseFirestore.Query<DocumentData> = firestore
    .collection('verbs')
    .where('featured', '==', true)
    .orderBy('verb')
    .limit(Number(process.env.FEATURED_VERBS_LIMIT || 10))

  return collectionData<Verb>(collectionRef)
})

export const getVerbs = cache((): Promise<Verb[]> => {
  const collectionRef: FirebaseFirestore.Query<DocumentData> = firestore
    .collection('verbs')
    .orderBy('verb')
    .limit(Number(process.env.VERBS_LIMIT || 10))

  return collectionData<Verb>(collectionRef)
})

export const getFilteredVerbs = cache(
  (searchQuery: string): Promise<Verb[]> => {
    const collectionRef: FirebaseFirestore.Query<DocumentData> = firestore
      .collection('verbs')
      .where('verb', '>=', searchQuery)
      .where('verb', '<=', searchQuery + '\uf8ff')
      .orderBy('verb')
      .limit(20)

    return collectionData<Verb>(collectionRef)
  }
)

export const getConjugation = cache(
  async (verb: string): Promise<Conjugation | null> => {
    const verbsRef: FirebaseFirestore.Query<DocumentData> = firestore
      .collection('verbs')
      .where('forms', 'array-contains', decodeURI(verb))
      .orderBy('verb')
      .limit(2)

    console.time('getConjugation')

    const [verbData] = await collectionData<Verb>(verbsRef)

    if (!verbData) {
      return null
    }

    try {
      const conjugationData = (
        await firestore
          .collection(`conjugations`)
          .doc(verbData.conjugationId)
          .get()
      ).data()

      console.timeEnd('getConjugation')

      return {
        ...conjugationData,
        verb: verbData.verb,
      } as Conjugation
    } catch (error) {
      console.error('Error getting document data: ', error)
      return null
    }
  }
)

// update firestore collection with featured field
const makeFeaturedVerbs = () => {
  const verbs = ['amare']

  const collectionRef = firestore.collection('verbs')
  const batchSize = 30
  const batches = []

  for (let i = 0; i < verbs.length; i += batchSize) {
    const batch = verbs.slice(i, i + batchSize)
    batches.push(batch)
  }

  const updatePromises = batches.map((batch) => {
    return collectionRef
      .where('verb', 'in', batch)
      .get()
      .then((querySnapshot) => {
        const batchUpdate = firestore.batch()

        querySnapshot.forEach((doc) => {
          const docRef = collectionRef.doc(doc.id)
          batchUpdate.update(docRef, { featured: true })
        })

        return batchUpdate.commit()
      })
  })

  Promise.all(updatePromises)
    .then(() => {
      console.log('Documents updated successfully.')
    })
    .catch((error) => {
      console.error('Error updating documents:', error)
    })
}
