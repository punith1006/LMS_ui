// components/Quiz.js
import React, { useState } from 'react';

const Quiz = ({ questions ,submit}:{questions:any,submit:any}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<any>({});

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerChange = (questionId:any, answer:any) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answer
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };
    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    return (
        <div className="w-full h-full flex flex-col p-14">
            <div className='flex-1 flex-col'>
                <h3 className='mb-6 text-white'>Question {currentQuestionIndex + 1}</h3>

                <h4 className='mb-6 text-white'>{currentQuestion.quizQuestionText}</h4>
                <ul>
                    {currentQuestion.quizAnswers.map((answer:any, index:any) => (
                        <li key={index} className='mb-4'>
                            <label className='flex gap-4 text-white cursor-pointer'>
                                <input
                                    type="checkbox"
                                    checked={selectedAnswers[currentQuestion.quizQuestionId] === answer}
                                    onChange={() => handleAnswerChange(currentQuestion.quizQuestionId, answer)}
                                />
                                <p> {answer}</p>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='w-full'>
                {currentQuestionIndex < questions.length - 1 && (
                    <div className='flex justify-between text-white'>
                        <button className={currentQuestionIndex > 0 ? "text-white font-semibold" : "text-grey"} onClick={handlePreviousQuestion}>
                            {"<< Previous"}
                        </button>
                        <button className='font-semibold' onClick={handleNextQuestion}>
                            {"Next >>"}
                        </button>
                    </div>
                )}
                <div className='flex justify-end text-white'>
                    {currentQuestionIndex === questions.length - 1 && (
                        <button className='font-semibold' onClick={() => {
                           submit(selectedAnswers)
                        }}>
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Quiz;
