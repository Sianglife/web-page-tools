"use client";
import { useEffect, useState } from 'react';
import { randomArray } from '@/lib/utils';

export default function MathRandom() {
    const [max, setMax] = useState<number | ''>(5);
    const [min, setMin] = useState<number | ''>(1);
    const [count, setCount] = useState<number | ''>(1);;
    const [alert, setAlert] = useState<[string, string]>(['', '']);
    const [allowRepeat, setAllowRepeat] = useState(false);
    const [result, setResult] = useState<any[]>([]);
    const [candidate, setCandidate] = useState<[number, boolean][] | []>([]);

    // Methods
    function clearAlert() {
        setAlert(['', '']);
    }

    function updateCandidate() {
        clearAlert();
        if (max === '' || min === '') {
            setAlert(['輸入錯誤', '請輸入最大值和最小值']);
            return;
        }
        if (max < min) {
            setAlert(['輸入錯誤', '最大值不能小於最小值']);
            return;
        }
        let new_candidate: [number, boolean][] = [];
        for (let i = min; i <= max; i++) {
            new_candidate.push([i, true]);
        }
        setCandidate(new_candidate);
    }

    function random() {
        let tmpCandidate = [];
        let tmpResult = [];
        // exclude disabled items
        for (let item of candidate) {
            if (item[1]) {
                tmpCandidate.push(item[0]);
            }
        }

        // VAILD: count undefined
        if (!count) {
            setAlert(['輸入錯誤', '請輸入抽出數']);
            return;
        }

        if (allowRepeat) {

        } else {
            // VAILD: count > candidate.length
            if (tmpCandidate.length < (Number(count)) && !allowRepeat) {
                setAlert(['數量錯誤', '不允許重複時，無法抽出比待抽清單總數多的數量']);
                return;
            }

            // random
            tmpResult = randomArray(tmpCandidate);

            // update result
            setResult(tmpResult);
        }
    }

    function removeListItem(item: number) {
        // remove item from item
        let tmpCandidcaate = [...candidate];
        for (let i of tmpCandidcaate) {
            if (item == i[0]) {
                i[1] = false;
            }
        }

        // VAILD: count > candidate.length
        if (tmpCandidcaate.length < (Number(count)) && !allowRepeat) {
            setAlert(['數量錯誤', '不允許重複時，無法抽出比待抽清單總數多的數量']);
            return;
        }

        setCandidate(tmpCandidcaate);
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

    useEffect(() => {
        updateCandidate();
    }, [min, max]);

    return (<>
        <Alert />
        < div className="row mx-3 py-1" >
            <div className="col-md-6" >
                {/* max */}
                < div className="row my-1" >
                    <div className="col-md-3 px-3 m-0" >
                        <strong className="align-middle h4" > 最小值 </strong>
                    </div>
                    < div className="col-md-9 p-0 m-0" >
                        <input className="form-control" onChange={(e) => setMin((e.target.value) ? Number(e.target.value) : '')} value={min} type="number" style={{ fontSize: '1.5em', height: '2em', width: '75%' }} max={max} />
                    </div>
                </div>

                {/* max */}
                <div className="row my-1" >
                    <div className="col-md-3 px-3 m-0" >
                        <span className="align-middle h4" > 最大值 </span>
                    </div>
                    < div className="col-md-9 p-0 m-0" >
                        <input className="form-control" onChange={(e) => setMax((e.target.value) ? Number(e.target.value) : '')} value={max} type="number" style={{ fontSize: '1.5em', height: '2em', width: '75%' }} min={min} />
                    </div>
                </div>

                {/* count */}
                <div className="row my-1" >
                    <div className="col-md-3 px-3 m-0" >
                        <span className="align-middle h4" > 抽出數 </span>
                    </div>
                    < div className="col-md-9 p-0 m-0" >
                        <input className="form-control" onChange={(e) => setCount((e.target.value) ? Number(e.target.value) : '')} value={count} type="number" style={{ fontSize: '1.5em', height: '2em', width: '75%' }} min={0} max={(max != '' && min != '') ? max - min + 1 : undefined} />
                    </div>
                </div>

                < div className="row my-1 px-3" >
                    {/* allow repeat */}
                    < div className="col-md-3 text-center d-xxl-flex align-items-xxl-center" >
                        <label className="col-form-label" >
                            <input className="form-check-input" checked={allowRepeat} onChange={() => setAllowRepeat(!allowRepeat)} type="checkbox" />
                            <span>允許重複 </span>
                        </label>
                    </div>

                    {/* submit */}
                    <div className="col-md-9" style={{ alignItems: 'center' }}>
                        <button className="btn btn-secondary w-75" type="button" onClick={random} > 抽！</button>
                    </div>
                </div>
            </div>

            < div className="col" >
                <div className="vr h-100" > </div>
            </div>

            < div className="col overflow-auto" style={{ height: '15.5em' }}>
                <ul className="list-group w-100" style={{ display: candidate.length ? 'block' : 'none' }}>
                    {
                        candidate.map((item, index) => (
                            <li className="list-group-item d-xxl-flex align-items-xxl-center" key={index} >
                                <div className="form-check" >
                                    <input className="form-check-input" type="checkbox" checked={item[1]} id="flexCheckDefault" onChange={() => setCandidate((prev) => {
                                        let new_candidate = [...prev];
                                        new_candidate[index][1] = !new_candidate[index][1];
                                        console.log(index, new_candidate)
                                        return new_candidate;
                                    })} />
                                    <label className="form-label form-check-label" > {item[0]} </label>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </div >

        < div className="row mx-3 py-1" >
            <ul className="list-group" style={{ display: result.length ? 'block' : 'none' }}>
                {
                    result.map((item, index) => (
                        <li className="list-group-item" key={index} >
                            <div className="row" >
                                <div className="col" >
                                    <span style={{ fontSize: '1.5em' }}>{item}</span>
                                </div>
                                < div className="col" style={{ textAlign: 'right' }}>
                                    <button
                                        className={`btn btn-primary ${candidate.find((e) => e[0] == item && e[1]) ? '' : 'disabled'}`}
                                        type="button"
                                        id={`btnRemove${item[0]}`}
                                        onClick={() => removeListItem(item)}
                                    >
                                        從待選名單移除
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    </>);
};;