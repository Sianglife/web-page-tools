"use client";
import { useState } from 'react';

function getAllFactors(n: number) {
    let result = [];
    for (let i = 1; i <= n; i++) {
        if (Number.isInteger(n / n)) {
            result.push(n);
        }
    }
    return result;
};

function isPrime(i: number) {
    if (getAllFactors(i)[1] == i) {
        return true;
    } else {
        return false;
    }
}

function getAllPrime(n: number) {
    let result = [];
    for (let i = 1; i <= n; i++) {
        if (isPrime(i)) {
            result.push(i);
        }
    }
    return result;
}

function arrToString(arr: number[]) {
    let str = '';
    for (let item of arr) {
        str = `${str}, ` + item;
    }
    return str.substring(2, str.length);
}

export default function MathFactor() {
    const [alert, setAlert] = useState<[string, string]>(['', '']);
    const [inputnum, setInputnum] = useState<number | ''>('');
    const [output_factor, setOutputFactor] = useState<string>('');
    const [output_prime, setOutputPrime] = useState<string>('');
    const [output_prime_factor, setOutputPrimeFactor] = useState<string>('');


    // Methods  
    function clearAlert() {
        setAlert(['', '']);
    }

    function update(input: number) {
        console.log('update', input);
        setOutputFactor('');
        setOutputPrime('');
        setOutputPrimeFactor('');
        clearAlert();
        if (input < 0) {
            setAlert(['輸入錯誤', '請輸入一個正數']);
            return;
        }

        let r = [];
        let Factors = getAllFactors(input);
        let Primes = getAllPrime(input);
        setOutputFactor(arrToString(Factors));
        setOutputPrimeFactor(arrToString(Primes));


        for (let i of Factors) {
            for (let k of Primes) {
                if (i == k) {
                    r.push(k);
                }
            }
        }
        setOutputPrime(arrToString(r));
    }

    // Components
    function Alert() {
        if (!alert[1]) {
            return null;
        }
        return (
            <div className="alert alert-warning text-muted" role="alert">
                <span>
                    <strong>{alert[0] ?? ''} </strong>
                    {alert[1]}
                </span>
            </div>
        );
    }

    return (<>
        <Alert />
        <div className="row text-start d-xxl-flex justify-content-xxl-start" style={{ borderBottomStyle: 'dotted' }}>
            <div className="col" style={{ width: '100%', textAlign: 'center', margin: '1em' }}>
                <span style={{ fontSize: '2em', width: '25%' }}>輸入一個數字: </span>
                <input
                    type="number"
                    style={{ fontSize: '1.5em', height: '2em', width: '75%' }}
                    min="0"
                    value={inputnum}
                    onChange={(e) => {
                        setInputnum(e.target.value ? Number(e.currentTarget.value) : '');
                        clearAlert();
                        if (e.target.value === '') {
                            setAlert(['輸入錯誤', '請輸入一個數字']);
                            return;
                        }
                        update(Number(e.target.value));
                    }}
                />
            </div>
        </div>
        {(output_factor && output_prime && output_prime_factor) &&
            <div className="row text-start d-xxl-flex justify-content-xxl-start" style={{ borderBottomStyle: 'dotted' }}>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ fontSize: '1.5em', fontWeight: 'bold', width: '10em' }}>{inputnum}的因數</td>
                                <td style={{ fontSize: '2em' }}>{output_factor !== '' ? output_factor : <h5>載入中...</h5>}</td>
                            </tr>
                            <tr>
                                <td style={{ fontSize: '1.5em', fontWeight: 'bold', width: '10em' }}>{inputnum}的質因數</td>
                                <td style={{ fontSize: '2em' }}>{output_prime_factor !== '' ? output_prime_factor : <h5>載入中...</h5>}</td>
                            </tr>
                            <tr>
                                <td style={{ fontSize: '1.5em', fontWeight: 'bold', width: '10em' }}>{inputnum}以下的質數</td>
                                <td style={{ fontSize: '2em' }}>{output_prime !== '' ? output_prime : <h5>載入中...</h5>}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        }
    </>);
};