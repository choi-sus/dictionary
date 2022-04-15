// word.js
import {db} from "../../firebase";
import { collection, doc, getDoc, getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";
// Actions
const LOAD = 'word/LOAD';
const CREATE = 'word/CREATE';
const UPDATE = 'word/UPDATE';
const DELETE = 'word/DELETE';

const initialState = { list: [
    // {name: 'petit à petit', text: '조금씩', ex: 'On a avancé petit à petit.', phone: '쁘띠 따 쁘띠'}, {name: 'éternellement jeunes', text: '영원히 젊은', ex: 'Que ce bonheur dure éternellement jeunes!', phone: '이떼흐넬멍 젼ㅇ'}, {name: 'Tous les jours', text: '매일 매일', ex: 'Tous les jours je', phone: '뚤레쥬흐'}
]}

// Action Creators
export function loadWord(word_list){
    return {type: LOAD, word_list};
}

export function createWord(word) {
  return { type: CREATE, word};
}

export function updateWord(word, word_id){
  return {type: UPDATE, word, word_id};
}

export function deleteWord(word_index){
  return {type: DELETE, word_index};
}

// middlewares
export const loadWordFB = () => {
    return async function (dispatch) {

      const word_data = await getDocs(collection(db, "word"));
      
      let word_list  = [];
  
      word_data.forEach((word) => {
        word_list.push({ id: word.id, ...word.data() });
      });
  
      dispatch(loadWord(word_list));
    };
  };

export const addWordFB = (word) => {
    return async function (dispatch) {
        const docRef = await addDoc(collection(db, "word"), word);
        const _word = await getDoc(docRef);
        const word_data = {id: _word.id, ..._word.data()};

        dispatch(createWord(word_data));
    }
}

export const updateWordFB = (word, word_id) => {
  return async function (dispatch){
    const docRef = doc(db, "word", word_id);
    word = {id: word_id, ...word};
    await updateDoc(docRef, word);

    dispatch(updateWord(word, word_id));
  }
}

export const deleteWordFB = (word_id) => {
  return async function(dispatch, getstate){
    if(!word_id){
      alert("아이디가 없네요!");
      return;
    }
    const docRef = doc(db, "word", word_id);
    await deleteDoc(docRef);

    const _word_list = getstate().word.list;
    const word_index = _word_list.findIndex((word)=> {
      return word.id === word_id;
    })

    dispatch(deleteWord(word_index));
  }
}

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "word/LOAD": {
            return {list: action.word_list}
          }
        case "word/CREATE": {
            const new_word = [...state.list, action.word]
            return {list: new_word};
        }
        case "word/UPDATE": {
          const new_word_list = state.list.map((e, i)=> {
            return action.word_id === e.id ? action.word : e
          })
          return {list: new_word_list};
        }
        case "word/DELETE": {
          console.log(state, action);
          const new_word_list = state.list.filter((a, idx)=> {
            return parseInt(action.word_index) !== idx;
          })
          return {list: new_word_list};
        }
    // do reducer stuff
    default: return state;
    }
  }