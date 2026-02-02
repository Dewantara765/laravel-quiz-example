import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export default function CategoryQuestions(){
    const { id } = useParams();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [options, setOptions] = useState<Option[]>([]);
    const [index, setIndex] = useState<number>(0);
    const question  = questions[index];
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const navigate = useNavigate();

    

    interface Question {
        id_question: number,
        question: string
    }

    interface Option {
        id_option: number,
        option_text: string,
        is_correct: boolean
    }
    useEffect(() => {
        document.title = "Category Questions"
        const getCategoryQuestions = async () => {
            try {
                const response = await api.get(`/api/categories/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setQuestions(response.data.questions)
                
            } catch (error) {
                console.log(error)
            }
        }

        // const getQuestionOptions = async () => {
        
        // }
        getCategoryQuestions()
        // getQuestionOptions()
    },[id])

    const showOptions = async (question_id: number) => {
       
            try {
                const response = await api.get(`/api/questions/${question_id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setOptions(response.data.options)
                
            }catch (error) {
                console.log(error)
            }
        
    }

    const prev = () => {
        setOptions([]);
        setIndex(index - 1)
    }

    const next = () => {
        setOptions([]);
        setIndex(index + 1)
    }

    const handleSelectOption = (questionId: number, optionId: number) => {
    setAnswers(prev => ({
        ...prev,
        [questionId]: optionId
    }));
    };

    const handleSubmit = async () => {
    const payload = {
        category_id: Number(id),
        answers: Object.entries(answers).map(
        ([question_id, option_id]) => ({
            question_id: Number(question_id),
            option_id
        })
        ),
        user_id: Number(localStorage.getItem("user_id"))
    };

    await api.post("/api/quiz/submit", payload, {
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        
    });
    navigate(`/category/${id}/finished`);
    };

    return (
        <div>
            
            <p className="text-2xl font-bold">Category Questions</p>
            {question && 
            <>
                <p className="mb-3"><b>{index + 1}.</b> {question.question}</p>
                <form className="flex flex-col">
                    {options && options.map((option) => (             
                        <label key={option.id_option} htmlFor={option.option_text}>

                            <input type="radio" name={`question-${question.id_question}`} 
                            onChange={() => handleSelectOption(question.id_question, option.id_option)}
                            checked={answers[question.id_question] === option.id_option}/>

                            {option.option_text}
                        </label>
                    ))}
                </form>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4"
                onClick={() => showOptions(question.id_question)}>Show Options</button>
                
                
                <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4`}
                onClick={prev} disabled={index === 0}>Previous</button>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
                onClick={next} disabled={index === questions.length - 1}>Next</button>

                {index === questions.length -1 && (
                    <button className="bg-yellow-500 hover:bg-yellow-700 p-2 rounded"
                    onClick={handleSubmit}>Submit</button>
                )}
            </>
              
            }
            
             {/* {questions.map((question, index) => (
                 <div key={index}>
                    <p className="mb-3"><b>{index +1}.</b> {questions[1].question}</p>
                       
                 </div>
             ))} */}
        </div>
        
    )
}