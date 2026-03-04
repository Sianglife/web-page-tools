"use client";
import { genArrayByRange } from "@/lib/random";
import { useEffect, useState } from "react";

export interface Item {
	id: string;
	name: string;
	disabled: boolean;
	selected: boolean;
}

export default function MathRandom() {
	const [max, setMax] = useState<number | "">(5);
	const [min, setMin] = useState<number | "">(1);
	const [count, setCount] = useState<number | "">(1);
	const [alert, setAlert] = useState<{ title: string; text: string } | null>(null);
	const [allowRepeat, setAllowRepeat] = useState(false);
	const [candidate, setCandidate] = useState<Item[]>([]);

	// Generate candidate list from min to max
	function genCandidateByRange() {
		setAlert(null);
		if (max === "" || min === "") {
			setAlert({ title: "輸入錯誤", text: "請輸入最大值和最小值" });
			return;
		}
		if (max < min) {
			setAlert({ title: "輸入錯誤", text: "最大值不能小於最小值" });
			return;
		}
		setCandidate(
			genArrayByRange(min, max).map(item => {
				return { id: crypto.randomUUID?.() ?? Math.random().toString(36).substring(2), name: item.toString(), disabled: false, selected: false };
			})
		);
	}

	// Random selection
	function random() {
		let finalCandidate: string[] = candidate.filter(item => !item.disabled).map(item => item.id); // ids of candidate without disabled items

		// handle count is undefined
		if (!count) {
			setAlert({ title: "輸入錯誤", text: "請輸入抽出數" });
			return;
		}

		if (allowRepeat) {
			for (let cnt = 0; cnt < Number(count); cnt++) {
				let randomIndex = Math.floor(Math.random() * finalCandidate.length);
				setCandidate(candidate.map(item => (item.id === finalCandidate[randomIndex] ? { ...item, selected: true } : item)));
			}
		} else {
			// Not Allow Repeat

			// check if count is larger than candidate length
			if (finalCandidate.length < Number(count) && !allowRepeat) {
				setAlert({ title: "數量錯誤", text: "不允許重複時，無法抽出比待抽清單總數多的數量" });
				return;
			}

			for (let cnt = 0; cnt < Number(count); cnt++) {
				let randomIndex = Math.floor(Math.random() * finalCandidate.length);
				setCandidate(candidate.map(item => (item.id === finalCandidate[randomIndex] ? { ...item, selected: true } : item)));
				finalCandidate.splice(randomIndex, 1);
			}
		}

		// TODO: update result sec
	}

	function removeListItem(item: Item) {
		// remove item from item
		let tmpCandidcaate = candidate.map(c => (c.id === item.id ? { ...c, disabled: true } : c));

		// VAILD: count>candidate.length
		if (tmpCandidcaate.length < Number(count) && !allowRepeat) {
			setAlert({ title: "數量錯誤", text: "不允許重複時，無法抽出比待抽清單總數多的數量" });
			return;
		}

		setCandidate(tmpCandidcaate);
	}

	// Alert Component
	function Alert() {
		if (!alert) {
			return null;
		}
		return (
			<div className="alert alert-warning text-muted" role="alert">
				<span>
					<strong className="me-1">{alert.title ?? ""}</strong>
					{alert.text}
				</span>
			</div>
		);
	}

	useEffect(() => {
		genCandidateByRange();
	}, [min, max]);

	return (
		<>
			<Alert />
			<div className="row mx-3 py-1">
				<div className="col-md-6">
					{/* max */}
					<div className="row my-1">
						<div className="col-md-3 px-3 m-0">
							<strong className="align-middle h4">最小值</strong>
						</div>
						<div className="col-md-9 p-0 m-0">
							<input
								className="form-control"
								onChange={e => setMin(e.target.value ? Number(e.target.value) : "")}
								value={min}
								type="number"
								style={{ fontSize: "1.5em", height: "2em", width: "75%" }}
								max={max}
							/>
						</div>
					</div>

					{/* max */}
					<div className="row my-1">
						<div className="col-md-3 px-3 m-0">
							<span className="align-middle h4">最大值</span>
						</div>
						<div className="col-md-9 p-0 m-0">
							<input
								className="form-control"
								onChange={e => setMax(e.target.value ? Number(e.target.value) : "")}
								value={max}
								type="number"
								style={{ fontSize: "1.5em", height: "2em", width: "75%" }}
								min={min}
							/>
						</div>
					</div>

					{/* count */}
					<div className="row my-1">
						<div className="col-md-3 px-3 m-0">
							<span className="align-middle h4">抽出數</span>
						</div>
						<div className="col-md-9 p-0 m-0">
							<input
								className="form-control"
								onChange={e => setCount(e.target.value ? Number(e.target.value) : "")}
								value={count}
								type="number"
								style={{ fontSize: "1.5em", height: "2em", width: "75%" }}
								min={0}
								max={max != "" && min != "" ? max - min + 1 : undefined}
							/>
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
						<div className="col-md-9" style={{ alignItems: "center" }}>
							<button className="btn btn-secondary w-75" type="button" onClick={random}>
								抽！
							</button>
						</div>
					</div>
				</div>

				<div className="col-md-1">
					<div className="vr h-100"></div>
				</div>

				<div className="col overflow-auto" style={{ height: "15.5em" }}>
					<ul className="list-group w-100" style={{ display: candidate.length ? "block" : "none" }}>
						{candidate.map((item, index) => (
							<li className="list-group-item d-xxl-flex align-items-xxl-center" key={index}>
								<div className="form-check d-flex align-items-center w-100 mb-0">
									<input
										className="form-check-input mt-0 me-2"
										type="checkbox"
										checked={!item.disabled}
										id={`flexCheckDefault${index}`}
										onChange={() =>
											setCandidate(prev => {
												let new_candidate = [...prev];
												new_candidate[index] = { ...new_candidate[index], disabled: !new_candidate[index].disabled };
												return new_candidate;
											})
										}
									/>
									<input
										type="text"
										className={`form-control form-control-sm p-0 m-0 ${item.disabled ? "text-decoration-line-through text-muted" : ""}`}
										value={item.name}
										onChange={e =>
											setCandidate(prev => {
												let new_candidate = [...prev];
												new_candidate[index] = { ...new_candidate[index], name: e.target.value };
												return new_candidate;
											})
										}
										style={{ border: "none", backgroundColor: "transparent", boxShadow: "none", fontSize: "inherit" }}
									/>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="row mx-3 py-1">
				<ul className="list-group" style={{ display: candidate.some(c => c.selected) ? "block" : "none" }}>
					{candidate
						.filter(c => c.selected)
						.map((item, index) => (
							<li className="list-group-item" key={index}>
								<div className="row">
									<div className="col">
										<span style={{ fontSize: "1.5em" }}>{item.name}</span>
									</div>
									<div className="col" style={{ textAlign: "right" }}>
										<button className={`btn btn-primary ${!item.disabled ? "" : "disabled"}`} type="button" id={`btnRemove${item.id}`} onClick={() => removeListItem(item)}>
											從待選名單移除
										</button>
									</div>
								</div>
							</li>
						))}
				</ul>
			</div>
		</>
	);
}
