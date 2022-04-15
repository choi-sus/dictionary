import React, {useRef} from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { loadWordFB, updateWordFB } from "./redux/modules/word";
import { useHistory } from "react-router-dom";
import {useLocation } from 'react-router-dom';

const Update = ()=> {
    const location = useLocation();
    const name = location.state.name;
    const text = location.state.text;
    const ex = location.state.ex;
    const phone = location.state.phone;

    const {id} = useParams();
    const my_word = useSelector((state)=> state.word.list)
    const dispatch = useDispatch();
    const wordInput = useRef();
    const textInput = useRef();
    const exInput = useRef();
    const phoneInput = useRef();
    const history = useHistory();

    const onClick = () => {
        if (wordInput.current.value === ''){
            alert('단어를 입력하세요.');
        }else if(textInput.current.value === ''){
            alert('설명을 입력하세요.')
        }else if(exInput.current.value === ''){
            alert('예시를 입력하세요.')
        }else if(phoneInput.current.value === ''){
            alert('발음을 입력하세요.')
        }else{
            dispatch(updateWordFB({
                name: wordInput.current.value,
                text: textInput.current.value,
                ex: exInput.current.value,
                phone: phoneInput.current.value,
            }, my_word[id].id));
        }

        if (wordInput.current.value !== '' && textInput.current.value !== '' && exInput.current.value !== '' && phoneInput.current.value !== ''){
            history.goBack();
        }

    };

    return(
        <Containers>
            <div className="content">
                <h2>단어 추가하기</h2>
                <form>
                    <div>
                        <label >단어</label>
                        <input type="text" ref={wordInput} defaultValue={name}></input>
                    </div>
                    <div>
                        <label >설명</label>
                        <input type="text" ref={textInput} defaultValue={text}></input>
                    </div>
                    <div>
                        <label >예문</label>
                        <input type="text" ref={exInput} defaultValue={ex}></input>
                    </div>
                    <div>
                        <label >발음</label>
                        <input type="text" ref={phoneInput} defaultValue={phone}></input>
                    </div>
                    <button type="button" onClick={()=> {onClick()}}>수정하기</button>
                </form>
            </div> 
        </Containers>
    )
}

const Containers = styled.div`
width: 100vw; height: 100vh; display: flex; justify-content: center; align-items: center;
    .content {
        width: 400px;  border-radius: 20px; overflow: hidden; text-align: center; margin-top: 30px;
    }
    h2{
        background-color: #194350; color: #9DBEB9; line-height: 75px; margin: 0;
    }
    form{
        padding: 40px; background-color: #fbccc1;
    }
    form div{
        margin-bottom: 35px;
    }
    form div label {
        margin-right: 15px; font-size: 17px;
    }
    form div input{
        border: none; font-family: 'Noto Serif KR', serif; width: 200px; background-color: transparent; border-bottom: 2px solid #FF8882; outline: none;
    }
    form button {
        cursor: pointer; margin-top: 25px; border: 2px solid #FF8882; line-height: 35px; width: 180px; font-family: 'Noto Serif KR',serif; font-size: 16px; transition: all 0.4s ease-in-out;
    }
    form button:hover {
        background-color: #FF8882; color: #fff; 
    }
`;

export default Update