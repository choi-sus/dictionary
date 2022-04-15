import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteWord, deleteWordFB } from "./redux/modules/word";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Home = ()=> {
    const my_word = useSelector((state)=> state.word.list)
    const dispatch =useDispatch()
    const history = useHistory()
    const [modal, setModal] = useState(false)
    const [modalIdx, setModalIdx] = useState(0)

    return(
        <div className="container">
            {
                my_word.map((a, i)=> {

                    return(
                        <div className="card" key={i} onClick={()=> {setModal(true); setModalIdx(i);}}>
                            <h3>{a.name}</h3>
                            <div className="content">
                                <span><span className="color">뜻:</span>{a.text}</span>
                                <p><span className="color">예문:</span>{a.ex}</p>
                                <span><span className="color">발음:</span>{a.phone}</span>
                            </div>
                        </div>
                    )
                })
            }
            {
                modal === true ? <Modal setModal={setModal} modalIdx={modalIdx} my_word={my_word} dispatch={dispatch} history={history}></Modal> : null
            }
        </div>
    )
}

const Modal = (props)=> {
    const delOnClick = ()=> {
        let del = prompt("삭제를 원하시면 네를 입력해 주세요.");

        if(del === "네"){
            props.dispatch(deleteWordFB(props.my_word[props.modalIdx].id))
            // props.dispatch(deleteWord(props.modalIdx));
            alert("삭제가 완료됐습니다."); 
            props.setModal(false)
        }else {
            alert("삭제가 취소됐습니다.")
            props.setModal(false)
            window.location.reload();
        }
    }

    return(
        <div className="modal_content">
            <div className="modal_card">
                <h3>{props.my_word[props.modalIdx].name}</h3>
                <div className="content">
                    <span>
                        <span className="color">뜻:</span>
                        {props.my_word[props.modalIdx].text}
                    </span>
                    <p><span className="color">예문:</span>{props.my_word[props.modalIdx].ex}</p>
                    <span>
                        <span className="color">발음:</span>
                        {props.my_word[props.modalIdx].phone}
                    </span>
                    <div className="card_btn">
                        <div>
                            <Link to={{
                                pathname: "/update/" + props.modalIdx,
                                state: {name: props.my_word[props.modalIdx].name, text: props.my_word[props.modalIdx].text, ex: props.my_word[props.modalIdx].ex, phone: props.my_word[props.modalIdx].phone}
                            }}><FontAwesomeIcon icon={faEdit} className="btn"/></Link>
                            <FontAwesomeIcon icon={faTrashAlt} className="btn min" onClick={()=> {delOnClick()}}/>
                        </div>
                        <button onClick={()=> {props.setModal(false)}}>닫기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Home;