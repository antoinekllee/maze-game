import React, { useState } from 'react';
import styles from './Quiz.module.css';

const Quiz = ({ question, correctAnswer, onSubmit }) => {
    const [answer, setAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);

    const handleChange = (event) => {
        setAnswer(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isAnswerCorrect = answer.toLowerCase() === correctAnswer.toLowerCase();
        setIsCorrect(isAnswerCorrect);
        onSubmit(isAnswerCorrect);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>{question}</h2>
            <input 
                type="text" 
                value={answer} 
                onChange={handleChange} 
                className={styles.input} 
            />
            <input 
                type="submit" 
                value="Submit" 
                className={styles.submit} 
            />
            {isCorrect !== null && (
                <p>{isCorrect ? 'Correct!' : 'Sorry, that is incorrect.'}</p>
            )}
        </form>
    );
};

export default Quiz;
