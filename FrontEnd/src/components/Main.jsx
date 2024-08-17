import { useEffect, useState } from "react";
import axios from 'axios'

export const Calculator = () => {

    const [num, setNum] = useState('');
    const [res, setRes] = useState('');
    const [mode, setMode] = useState(false)
    const [history, setHistory] = useState([]);

    const serverUrl = import.meta.env.VITE_API_URL;


    useEffect(() => {
        FetchHistory();
    }, []);

    useEffect(() => {
        if (res && num !== '') {
            AddCalculations();
        }
    }, [res, num]);

    async function AddCalculations() {
        try {
            const response = await axios.post(`${serverUrl}/addCalc`, {
                Data: num,
                Result: res,
            });

            if (response.data.success) {
                console.log(response.data.msg)
            } else {
                console.log(response.data.msg)
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function FetchHistory() {
        try {
            const response = await axios.get(`${serverUrl}/fetchCalc`);

            if (response.data.success) {
                setHistory(response.data.Tasks);
            } else {
                console.log(response.data.msg);
            }
        } catch (err) {
            console.log(err);
        }
    }
    console.log('history fetched', history);

    function handleHistory() {
        setMode(!mode)
        FetchHistory()
    }

    function handleChange(value) {
        setNum(num + value);
    }

    function handleRes() {
        try {
            if (num.includes('%')) {
                const index = num.indexOf('%');
                const num1 = parseFloat(num.slice(0, index));
                const num2 = parseFloat(num.slice(index + 1));

                setRes(num1 * (num2 / 100));

            } else {
                setRes(eval(num));

            }
        } catch (err) {
            setRes('NaN');
        }
    }

    function handleClear() {
        setNum(num.slice(0, -1))
    }

    async function handleAllClear() {

        if (mode === true) {
            try {
                const response = await axios.delete(`${serverUrl}/delete`)

                if (response.data.success) {
                    console.log(response.data.msg)
                    setHistory('')
                }
            }
            catch (err) {
                console.log('delete error', err);

            }
        }

        setNum('')
        setRes('')
    }


    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-200">
            <div className="w-64 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4 h-24 bg-gradient-to-r from-rose-600 to-red-400 text-white text-right text-3xl overflow-y-auto relative">
                    {
                        mode ? (
                            <div className="">
                                <h4 className="absolute top-4 left-4 text-xl font-semibold mb-2">History Mode</h4>
                                {history.length > 0 ? (
                                    <div >
                                        {history.map((data, index) => (
                                            <div key={index} className="mb-2 shadow-lg pr-4">
                                                <div>{data.Data}</div>
                                                <div>{data.Result}</div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className=" p-10 text-sm">No history available.</p>
                                )}
                            </div>
                        ) : (
                            <div>
                                <div>{res}</div>
                                <div >{num}</div>
                            </div>
                        )
                    }
                </div>



                <div className="">
                    <div className="flex flex-wrap">
                        <button onClick={handleAllClear} className="w-1/4 bg-gray-200 p-4 text-rose-500 text-xl">AC</button>
                        <button onClick={handleHistory} className="w-1/4 bg-gray-200 p-4  text-xl"> 📖 </button>
                        <button onClick={() => handleChange('%')} className="w-1/4 bg-gray-200 p-4  text-xl">%</button>
                        <button onClick={() => handleChange('/')} className="w-1/4 bg-gray-200 p-4  text-xl">÷</button>
                    </div>

                    <div className="flex flex-wrap ">
                        <button onClick={() => handleChange('7')} className="w-1/4 p-4  text-xl">7</button>
                        <button onClick={() => handleChange('8')} className="w-1/4 p-4  text-xl">8</button>
                        <button onClick={() => handleChange('9')} className="w-1/4 p-4  text-xl">9</button>
                        <button onClick={() => handleChange('*')} className="w-1/4 bg-gray-200 p-4  text-xl">×</button>
                    </div>

                    <div className="flex flex-wrap ">
                        <button onClick={() => handleChange('4')} className="w-1/4 p-4  text-xl">4</button>
                        <button onClick={() => handleChange('5')} className="w-1/4 p-4  text-xl">5</button>
                        <button onClick={() => handleChange('6')} className="w-1/4 p-4  text-xl">6</button>
                        <button onClick={() => handleChange('-')} className="w-1/4 bg-gray-200 p-4  text-xl">-</button>
                    </div>

                    <div className="flex flex-wrap ">
                        <button onClick={() => handleChange('1')} className="w-1/4 p-4  text-xl">1</button>
                        <button onClick={() => handleChange('2')} className="w-1/4 p-4  text-xl">2</button>
                        <button onClick={() => handleChange('3')} className="w-1/4 p-4  text-xl">3</button>
                        <button onClick={() => handleChange('+')} className="w-1/4 bg-gray-200 p-4  text-xl">+</button>
                    </div>

                    <div className="flex flex-wrap ">
                        <button onClick={() => handleChange('0')} className="w-1/4 p-4  text-xl">0</button>
                        <button onClick={() => handleChange('.')} className="w-1/4 p-4  text-xl">.</button>
                        <button onClick={handleClear} className="w-1/4 p-4  text-xl">&#9003;</button>
                        <button onClick={handleRes} className="w-1/4 bg-gradient-to-r from-rose-600 to-red-500 p-4  text-xl">=</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
