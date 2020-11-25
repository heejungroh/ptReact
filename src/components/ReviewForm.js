import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import InputText from './InputText';


function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const ReviewForm = (props) => {

    const user = props.user;

    const [review, setReview] = useState({
        user_no: '',
        title : '',
        content : '',
        img : ''
    });

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

    const submitRev = (e) => {
      e.preventDefault();
      fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": localStorage.getItem("Authorization")
        },
        body: JSON.stringify(review)
      }).then(res => {
        return res.text();
      }).then(res => {
        if (res === "ok") {
          props.history.push("/");
        } else {
          alert('글등록 실패');
        }
      });
    }
  
    const changeValue = (e) => {
      setReview({
        ...review,
        [e.target.name]: e.target.value
      });
    }




    const body = (
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">리뷰 작성</h2>
        <form>
          <p id="simple-modal-description">
              <input type="hidden" name="user_no" />
              <input type="text" name="title" placeholder="제목을 입력하세요" onChange={changeValue}/>
              
              <InputText content={review.content}/>
              <input type="file" name="img"/> 
          </p>
          <button type="submit" onClick={submitRev}>
                리뷰 작성
          </button>
        </form>
        
      </div>
    );
   
    return (
        <div>
            <button type="button" onClick={handleOpen}>
                리뷰 작성
            </button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
            
        </div>
    );
};

export default ReviewForm;