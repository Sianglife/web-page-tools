"use client";
import { useEffect, useState } from 'react';

export default function MathRandom() {
    const [max, setMax] = useState(5);
    const [min, setMin] = useState(1);
    const [count, setCount] = useState(1);
    const [alert, setAlert] = useState<[string, string]>(['', '']);
    const [allowRepeat, setAllowRepeat] = useState(false);
    const [result, setResult] = useState([]);
    const [candidate, SetCandidate] = useState<[number, boolean][] | []>([]);

    function clearAlert() {
        setAlert(['', '']);
    }

    function listUpdate() {
        clearAlert();
        let new_candidate: [number, boolean][] = [];
        for (let i = min; i <= max; i++) {
            new_candidate.push([i, true]);
        }
        SetCandidate(new_candidate);
    }

    function Alert() {
        if (!alert[1]) {
            return null;
        }
        return (
            <div className="alert alert-warning text-muted" role="alert">
                <span><strong>{alert[0] ?? ''}</strong>{alert[1]}</span>
            </div>
        );
    }

    useEffect(() => {
        listUpdate();
    }, [min, max]);

    return (<>
        <Alert />
        <div className="row mx-3">
            <div className="col-md-6">
                {/* max */}
                <div className="row">
                    <div className="col-md-3 px-3 m-0">
                        <strong className="align-middle h4">最小值</strong>
                    </div>
                    <div className="col-md-9 p-0 m-0">
                        <input className="form-control" onChange={(e) => setMin(Number(e.target.value))} value={min} type="number" style={{ fontSize: '1.5em', height: '2em', width: '75%' }} max={min} />
                    </div>
                </div>

                {/* max */}
                <div className="row my-1">
                    <div className="col-md-3 px-3 m-0">
                        <span className="align-middle h4">最大值</span>
                    </div>
                    <div className="col-md-9 p-0 m-0">
                        <input className="form-control" onChange={(e) => setMax(Number(e.target.value))} value={max} type="number" style={{ fontSize: '1.5em', height: '2em', width: '75%' }} min={max} />
                    </div>
                </div>

                {/* count */}
                <div className="row my-1">
                    <div className="col-md-3 px-3 m-0">
                        <span className="align-middle h4">抽出數</span>
                    </div>
                    <div className="col-md-9 p-0 m-0">
                        <input className="form-control" onChange={(e) => setCount(Number(e.target.value))} value={count} type="number" style={{ fontSize: '1.5em', height: '2em', width: '75%' }} max={max} />
                    </div>
                </div>

                <div className="row my-1 px-3">
                    {/* allow repeat */}
                    <div className="col-md-3 text-center d-xxl-flex align-items-xxl-center">
                        <label className="col-form-label">
                            <input className="form-check-input" checked={allowRepeat} onChange={() => setAllowRepeat(!allowRepeat)} type="checkbox" />
                            <span>允許重複</span>
                        </label>
                    </div>

                    {/* submit */}
                    <div className="col-md-9" style={{ alignItems: 'center' }}>
                        <button className="btn btn-secondary w-75" type="button">抽！</button>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="vr h-100"></div>
            </div>

            <div className="col overflow-auto" style={{ height: '15.5em' }}>
                <ul className="list-group" style={{ display: candidate.length ? 'block' : 'none' }}>
                    {candidate.map((item, index) => (
                        <li className="list-group-item d-xxl-flex align-items-xxl-center" key={index}>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" checked={item[1]} id="flexCheckDefault" />
                                <label className="form-label form-check-label">{item[0]}</label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div >
    </>);
};