export default function Footer() {
	return (
		<footer className="text-center py-4" style={{ background: "rgb(89,154,143)", height: "7em" }}>
			<div className="container">
				<div className="row row-cols-1 row-cols-lg-3">
					<div className="col">
						<p className="my-2" style={{ color: "#f8f9fa" }}>
							Copyright&nbsp;© 2026 Sianglife
						</p>
					</div>
					<div className="col-lg-4 offset-lg-4">
						<ul className="list-inline my-2">
							<li className="list-inline-item me-4">
								<a className="bs-icon-circle bs-icon-primary bs-icon" href="https://github.com/Sianglife" title="飛翔Github">
									<i className="bi bi-github" />
								</a>
							</li>
							<li className="list-inline-item me-4">
								<a className="bs-icon-circle bs-icon-primary bs-icon" href="https://sianglife.github.io/blog/" title="飛翔部落格">
									<i className="bi bi-pencil" />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}
